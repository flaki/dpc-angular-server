var
  express = require('express'),
  path = require('path'),
  nedb = require('nedb'),
  databaseUrl = path.join(__dirname, 'db/items.db');

var WWW = path.resolve(process.argv[2]) || path.join(__dirname, 'www');
var PORT = process.argv[3] || 3000;

var db = {
  items: new nedb({ filename: databaseUrl, autoload: true })
};

var app = express();

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {} // dev mode

app.set('port', process.env.PORT || PORT);
  app.use(require('morgan')('combined'));
  app.use(require('body-parser').urlencoded({ extended:true }));
  app.use(require('body-parser').json());
  app.use(express.static(WWW));

app.get('/api', function (req, res) {
  res.send('API is running');
});

app.get('/api/items', function (req, res) {
  db.items.find({}, function(err, result) {
    res.send(result);
  });
});

app.get('/api/items/:id', function (req, res) {
  var id = req.params.id;
  db.items.find({_id: id}, function(err, result) {
    res.send(result[0]||'');
  });
});

app.post('/api/items', function (req, res) {
  var item = req.body;
  db.items.insert(item, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      console.log('Created: ' + JSON.stringify(result));
      res.send(result);
    }
  });
});

app.put('/api/items/:id', function (req, res) {
  var id = req.params.id;
  var item = req.body;
  console.log(item);
  db.items.update({_id: id}, item, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred'});
    } else {
      console.log('Updated: ' + JSON.stringify(result));

      db.items.find({_id: id}, function(err, result) {
        console.log('Updated: ' + JSON.stringify(result));
        res.send(result[0]);
      });
    }
  });
});

app.delete('/api/items/:id', function (req, res) {
  var id = req.params.id;
  db.items.remove({_id: id}, {}, function (err, result) {
    if (err) {
      res.send({'error':'An error has occurred - ' + err});
    } else {
      console.log('' + result + ' document(s) deleted');

      res.send({ deleted: result });
    }
  });
});

app.use('*', function (req, res) {
  var fallbackUrl = path.join(WWW, 'index.html');
  console.log('Serving fallback URL: '+fallbackUrl);
  res.sendFile(fallbackUrl);
})

app.listen(app.get('port'));
console.log('Server listening on port ' + app.get('port'));
console.log('Serving static files from ' + WWW);

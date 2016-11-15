DPC Angular Server
==================

AngularJS test backend

```
  git clone https://github.com/flaki/dpc-angular-server.git
  cd dpc-angular-server
  npm run start {/path/to/www} {optional_port}
```

Usage as project dependency:
```
  npm install flaki/dpc-angular-server --save-dev
  node node_modules/dpc-angular-server/server.js ./www
```

API
---

```
  GET /api
  GET /api/items
  PUT /api/items
  POST /api/items/:id
  DELETE /api/items/:id
```

Requests fall back to `{www}/index.html`.

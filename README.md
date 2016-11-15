DPC Angular Server
==================

AngularJS test backend

```
  git clone https://github.com/flaki/dpc-angular-server.git
  cd dpc-angular-server
  npm run start {/path/to/www} {optional_port}
```

API
---

```
  GET /api
  GET /api/items
  POST /api/items/:id
  DELETE /api/items/:id
```

Requests fall back to `{www}/index.html`.

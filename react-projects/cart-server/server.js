const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
const port = 8000;

server.use(middlewares);
server.use(router);

server.listen(port);
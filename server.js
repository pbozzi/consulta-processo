'use strict';

require('dotenv').config();
const http = require('http');
const debug = require('debug')('processo:api');
const app = require('./src/app.js');
const port = normalizePort(process.env.APP_PORT || 3000);
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log();
console.log('NODE_ENV=' + process.env.NODE_ENV);
console.log(`${process.env.APP_NAME} v${process.env.APP_VERSION} rodando na porta ${process.env.APP_PORT}`);

function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) return val;
    if (port >= 0) return port;

    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') throw error;

    let bind = typeof port === 'string ' ? 'Pipe ' + port : 'Port' + port;

    switch (error.code) {
        case 'EACCES':
            console.error(bind + 'requires elevated privilegies');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
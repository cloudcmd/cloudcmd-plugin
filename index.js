const http = require('http');
const cloudcmd = require('cloudcmd');
const io = require('socket.io');
const app = require('express')();

const port = 1337;
const prefix = '/cloudcmd';

const server = http.createServer(app);
const socket = io.listen(server, {
    path: `${prefix}/socket.io`
});

const config = {
    prefix /* base URL or function which returns base URL (optional)   */
};

app.use(cloudcmd({
    socket, /* used by Config, Edit (optional) and Console (required)   */
    config, /* config data (optional)                                   */
    plugins: [
        __dirname + '/' + 'plugin.js'
    ]
}));

/* eslint no-console: 0 */
server.listen(port, () => {
    console.log(`http://localhost:${port}`);
});


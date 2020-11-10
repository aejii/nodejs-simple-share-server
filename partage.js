const express = require('express');

const app = express();
const http = require('http').Server(app);

const port = 80;

app.use(function (req, res, next) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    if (ip.substr(0, 7) == '::ffff:') {
        ip = ip.substr(7);
    }
    
    console.log("" + req.url + " (ip:" + ip + ")");
    next();
    })
.use(express.static('public'));


http.listen(port, () => console.log(`Serveur start on ${port}!`));
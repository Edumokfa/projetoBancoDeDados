require('dotenv').config();

const express = require('express');
const session = require('express-session');
const routes = require('./src/routes');
const migrate = require('./database/migrate.js');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

app.use(express.json());

app.use(session({
    secret: 'sM0n1fW6yHg4aL9zCv2bQp8nRj5uXe3r',
    resave: false,
    saveUninitialized: true
}));
  
app.use('/', routes);
app.listen(PORT, HOST);

console.log("Server running! :)");

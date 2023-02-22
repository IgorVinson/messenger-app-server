const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
app.use('/', routes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
})
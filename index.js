const express = require('express');
const bodyParser = require('body-parser');

const router = require('./backEnd/routes/index');

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(router);


app.listen(port, () => console.log(`App listening on port ${port}!`));
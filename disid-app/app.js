const express = require('express');
const config = require('./config/config');
const db = require('./config/database/connection');
db.connect();
const app = express();
var cors = require('cors');

app.use(cors())
app.use(express.json());

require('./app/routes/empleado')(app);
require('./app/routes/departamento')(app);
app.listen(config.port, () => {
  console.log('Escuchando en el puerto 3000');
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const reqOnly = require('amenov.req.onlyjs');
const reqValidation = require('amenov.req.validationjs');
const router = require('amenov.routerjs');
const wherebuilder = require('amenov.req.wherebuilderjs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage', express.static(__dirname + process.env.STORAGE_PATH));
app.use(reqOnly());
app.use(reqValidation(require('./database/models/index').sequelize));
app.use(wherebuilder());
app.use(
  '/',
  router(require('./routes'), {
    middleware: __dirname + '/middleware/',
    controllers: __dirname + '/controllers/',
  })
);

const PORT = process.env.PORT ?? 5000;

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

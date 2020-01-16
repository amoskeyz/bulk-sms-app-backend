import express from 'express';
import bodyParser from 'body-parser';
import db from './db/models';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const dbconnection = db.sequelize;
dbconnection
  .authenticate()
  .then(() => {
    console.log('connection to database successful');
    app.listen(port, () => {
      console.log(`server start at port ${port}`);
    });
  })
  .catch((e) => {
  /* istanbul ignore next */
    console.log(e);
    throw e.message;
  });

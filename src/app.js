import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import db from './db/models';
import Routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true }));

Routes(app);

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to Bulk Sms App' }));

app.use((req, res) => res.status(404).json({
  status: 404,
  error: `Route '${req.url}' Not found`
}));

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
    throw e.message;
  });

export default app;

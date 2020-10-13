import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes/index';
import cors from 'cors';
import dbConnection from './config/dbConfig';

dotenv.config();
dbConnection();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(routes);

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Well connected api' });
});
// finally, let's start our server...
const server = app.listen(PORT, () => {
  console.log(`Listening at port ${server.address().port}`);
});
export default app;

import express from 'express';
import bodyParser, { urlencoded } from 'body-parser';

const app = express();
const PORT = process.env.PORT || DEV_PORT;

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
  res.send({ nice: 'job' });
});
app.listen();
export default app;

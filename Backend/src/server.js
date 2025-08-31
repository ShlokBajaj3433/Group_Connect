import express from 'express';
import { ENV } from './config/env.js';


const app = express();
const port = ENV.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});
console.log(`Environment: ${ENV.NODE_ENV} And MongoDB URI: ${ENV.MONGO_URI}`);


app.listen(ENV.PORT, () => {
  console.log(`Server is running at http://localhost:${ENV.PORT}`);
});

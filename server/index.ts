import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { recordRouter } from './routes';

export const runAppMain = () => {
  dotenv.config();

  const app: Express = express();

  const port = process.env.PORT;

  app.get('/', (req, res) => {
    console.log('request hit');
    res.send('<h1>hello, world!</h1>');
  });

  app.use('/record', recordRouter);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

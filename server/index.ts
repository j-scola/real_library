import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { addCollectionRoutes } from './routes';

export const runAppMain = () => {
  dotenv.config();

  const app: Express = express();

  const port = process.env.PORT;

  app.use(express.json());
  app.use(express.urlencoded());

  app.get('/', (req: Request, res: Response) => {
    console.log('request hit');
    res.send('<h1>hello, world!</h1>');
  });

  addCollectionRoutes(app);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

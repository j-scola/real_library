import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {
  addCollectionRoutes,
  addMembersRoutes,
  addCheckoutsRoutes,
} from './routes';
import { ModelsService } from './models';

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

  const dbModel = new ModelsService();

  addCollectionRoutes(app, dbModel);
  addMembersRoutes(app, dbModel);
  addCheckoutsRoutes(app, dbModel);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

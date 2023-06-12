import { Express, Request, Response } from 'express';
import { CheckoutsController } from '../controllers';
import { ModelsService } from '../models';
import { routerCallbackAll, routerCallbackRun } from './globalCallbacks';

export const addCheckoutsRoutes = (app: Express, dbModel: ModelsService) => {
  const checkoutsController = new CheckoutsController(dbModel);

  app.get('/checkout', (req: Request, res: Response) => {
    // checkoutsController.
  });

  app.post('/checkout', (req: Request, res: Response) => {
    checkoutsController.newCheckout(req.body, routerCallbackRun(res));
  });
};

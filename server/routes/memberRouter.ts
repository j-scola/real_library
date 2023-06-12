import { Express, Request, Response } from 'express';
import { MembersController } from '../controllers';
import { ModelsService } from '../models';
import { routerCallbackAll, routerCallbackRun } from './globalCallbacks';

export const addMembersRoutes = (app: Express, dbModel: ModelsService) => {
  //   app.get('/members', (req: Request, res: Response) => {});
  const membersController = new MembersController(dbModel);

  app.post('/member', (req: Request, res: Response) => {
    membersController.registerNewMember(req.body, routerCallbackRun(res));
  });

  app.get('/member', (req: Request, res: Response) => {
    console.log(req.query);
    membersController.getMember(req.query, routerCallbackAll(res));
  });

  app.patch('/member', (req: Request, res: Response) => {
    membersController.getMember(req.query, routerCallbackAll(res));
  });
};

import { Express, Request, Response } from 'express';
import { LibraryCollectionController } from '../controllers';
import { ModelsService } from '../models/modelsService';
import { routerCallbackAll, routerCallbackRun } from './globalCallbacks';

export const addCollectionRoutes = (
  app: Express,
  dbModelService: ModelsService
) => {
  const libraryController = new LibraryCollectionController(dbModelService);

  app.get('/collection', async (req: Request, res: Response) => {
    const cb = routerCallbackAll(res);
    libraryController.getCollection(cb);
  });

  app.get('/collection/search', (req: Request, res: Response) => {
    libraryController.searchFromCollection(req.query, routerCallbackAll(res));
  });

  app.post('/collection', (req: Request, res: Response) => {
    libraryController.addToCollection(req.body, routerCallbackRun(res));
  });

  app.put('/collection/:collection_id', (req: Request, res: Response) => {
    res
      .status(500)
      .send({ success: false, errorMessage: 'route service not available' });
  });

  app.delete('/collection/:collection_id', (req: Request, res: Response) => {
    console.log(req.params);
    res
      .status(500)
      .send({ success: false, errorMessage: 'route service not available' });
  });
};

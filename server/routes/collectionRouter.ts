import { Express, Request, Response } from 'express';
import {
  CollectionItem,
  RequestCallbackAll,
  RequestCallbackRun,
  ResponseBody,
} from '../types';
import { LibraryController } from '../db_service';

const libraryController = new LibraryController();

const dbCallbackRun: (res: Response) => RequestCallbackRun = res => err => {
  if (err) {
    res.status(500).send({
      success: false,
      errorMessage: err.message,
    });
  } else {
    res.send({ success: true });
  }
};

const dbCallbackAll: (
  res: Response
) => RequestCallbackAll<CollectionItem> = res => {
  return (err, rows) => {
    if (err) {
      res.status(500).send({
        success: false,
        errorMessage: err.message,
      });
    } else {
      const responseBody = { success: true, searchResult: rows };
      res.send(responseBody);
    }
  };
};

export const addCollectionRoutes = (app: Express) => {
  app.get('/collection', async (req: Request, res: Response) => {
    const cb = dbCallbackAll(res);
    libraryController.getCollection(cb);
  });

  app.get('/collection/search', (req: Request, res: Response) => {
    libraryController.searchFromCollection(req.query, dbCallbackAll(res));
  });

  app.post('/collection', (req: Request, res: Response) => {
    libraryController.addToCollection(req.body, dbCallbackRun(res));
  });

  app.put('/collection/:collection_id', (req: Request, res: Response) => {
    console.log(req.params);
    libraryController.updateCollection(dbCallbackRun(res));
  });

  app.delete('/collection/:collection_id', (req: Request, res: Response) => {
    console.log(req.params);
    const responseBody: ResponseBody = { success: true };
    res.send(responseBody);
  });
};

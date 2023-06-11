import express, { Request, Response } from 'express';
import { ResponseBody } from '../types';
import { LibraryController } from '../db_service';
const router = express.Router();

const library = new LibraryController();

router.get('/:collection_id', (req: Request, res: Response) => {
  console.log(req.params);
  library.searchFromCollection();
  const responseBody: ResponseBody = { success: true };
  res.send(responseBody);
});
router.post('/', (req: Request, res: Response) => {
  console.log(req.params);
  library.addToCollection();
  const responseBody: ResponseBody = { success: true };
  res.send(responseBody);
});

router.put('/:collection_id', (req: Request, res: Response) => {
  console.log(req.params);
  library.updateCollection();
  const responseBody: ResponseBody = { success: true };
  res.send(responseBody);
});
router.delete('/:collection_id', (req: Request, res: Response) => {
  console.log(req.params);
  const responseBody: ResponseBody = { success: true };
  res.send(responseBody);
});

export const recordRouter = router;

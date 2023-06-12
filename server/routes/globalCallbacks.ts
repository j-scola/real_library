import { Response } from 'express';
import { RequestCallbackAll, RequestCallbackRun } from '../types';

export const routerCallbackRun: (res: Response) => RequestCallbackRun =
  res => err => {
    if (err) {
      res.status(500).send({
        success: false,
        errorMessage: err.message,
      });
    } else {
      res.send({ success: true });
    }
  };

export const routerCallbackAll: (
  res: Response
) => RequestCallbackAll<any> = res => {
  return (err, rows) => {
    if (err) {
      res.status(500).send({
        success: false,
        errorMessage: err.message,
      });
    } else {
      res.send({ success: true, searchResult: rows });
    }
  };
};

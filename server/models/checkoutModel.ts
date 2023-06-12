import sqlite3 from 'sqlite3';
import { CreateNewCheckout, RequestCallbackRun } from '../types';

export class CheckoutModel {
  db: sqlite3.Database;
  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  add(checkout: CreateNewCheckout, cb: RequestCallbackRun) {
    this.db.run(
      `
        INSERT INTO 
        checkouts (member_id, collection_id, created_at, due_date)
        VALUES (?, ?, ?, ?);
      `,
      [
        checkout.user_id,
        checkout.collection_id,
        checkout.created_at,
        checkout.due_date,
      ],
      cb
    );
  }
}

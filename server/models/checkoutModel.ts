import sqlite3 from 'sqlite3';
import {
  CreateNewCheckout,
  ExistingCheckout,
  MemberId,
  RequestCallbackAll,
  RequestCallbackRun,
} from '../types';

export class CheckoutModel {
  db: sqlite3.Database;
  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  add(checkout: CreateNewCheckout, cb: RequestCallbackRun) {
    this.db.run(
      `
        INSERT INTO 
        checkouts (member_id, collection_id, created_at, due_date, returned)
        VALUES (?, ?, ?, ?, ?);
      `,
      [
        checkout.user_id,
        checkout.collection_id,
        checkout.created_at,
        checkout.due_date,
        0,
      ],
      cb
    );
  }

  getCheckoutsByMemberId(
    member_id: MemberId,
    cb: RequestCallbackAll<ExistingCheckout>
  ) {
    this.db.all(
      `
        SELECT checkouts.id AS checkout_id, checkouts.collection_id, collection.title, checkouts.returned, checkouts.due_date 
        FROM checkouts 
        INNER JOIN collection
        ON checkouts.collection_id = collection.id
        WHERE checkouts.member_id = 1;
      `,
      // member_id,
      cb
      // (err, checkouts) => {
      //   if (err) {
      //     cb(err, []);
      //   } else {
      //     this.db.all(
      //       `
      //         SELECT name from members
      //         WHERE id = ?
      //       `,
      //       member_id,
      //       (err, members) => {
      //         if (err) {
      //           cb(err, []);
      //         } else {
      //           this.db.all(`
      //             SELECT * FROM collection
      //             WHERE id IN (SELECT collection_id FROM checkouts)
      //           `)
      //         }
      //       }
      //     );
      //   }
      // }
    );
  }
}

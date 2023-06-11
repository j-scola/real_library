import {
  CollectionItem,
  CreateCollectionItem,
  RequestCallbackAll,
  RequestCallbackRun,
} from '../types';
import { initializeDb } from './db_init';
import sqlite3 from 'sqlite3';

export class LibraryCollectionModel {
  db: sqlite3.Database;
  constructor() {
    this.db = initializeDb();
  }

  add(item: CreateCollectionItem, cb: RequestCallbackRun) {
    this.db.run(
      `
        INSERT INTO 
        collection (title, author, genre, height, publisher) 
        VALUES(?, ?, ?, ?, ?);`,
      [item.title, item.author, item.genre, item.height, item.publisher],
      cb
    );
  }

  partialSearch(
    searchParams: Partial<CollectionItem>,
    cb: RequestCallbackAll<CollectionItem>
  ) {
    let hasParams = false;
    const searchConditions = [];
    const searchValues = [];
    if (searchParams.id && searchParams.id >= 0) {
      hasParams = true;
      searchConditions.push(' id = ? ');
      searchValues.push(`${searchParams.id}`);
    }
    if (searchParams.title) {
      hasParams = true;
      searchConditions.push(' title LIKE ? ');
      searchValues.push(`%${searchParams.title}%`);
    }
    if (searchParams.author) {
      hasParams = true;
      searchConditions.push(' author LIKE ? ');
      searchValues.push(`%${searchParams.author}%`);
    }
    if (searchParams.genre) {
      hasParams = true;
      searchConditions.push(' genre LIKE ? ');
      searchValues.push(`%${searchParams.genre}%`);
    }
    if (searchParams.height && searchParams.height >= 0) {
      hasParams = true;
      searchConditions.push(' height = ? ');
      searchValues.push(`${searchParams.height}`);
    }
    if (searchParams.publisher) {
      hasParams = true;
      searchConditions.push(' publisher LIKE ? ');
      searchValues.push(`%${searchParams.publisher}%`);
    }
    if (hasParams) {
      this.db.all(
        `
        SELECT * FROM collection
        WHERE ${searchConditions.join(' AND ')};      
      `,
        searchValues,
        cb
      );
    } else {
      cb(new Error('Request Error - no search params found'), []);
    }
  }

  getCollection(cb: RequestCallbackAll<CollectionItem>) {
    this.db.all('SELECT * FROM collection;', cb);
  }
}

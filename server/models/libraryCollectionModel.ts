import {
  CollectionItem,
  CreateCollectionItem,
  RequestCallbackAll,
  RequestCallbackRun,
} from '../types';
import sqlite3 from 'sqlite3';

export class LibraryCollectionModel {
  db: sqlite3.Database;
  constructor(db: sqlite3.Database) {
    this.db = db;
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

  updateById(item: CollectionItem, cb: RequestCallbackRun) {
    let hasParams = false;
    const updateColumns = [];
    const updateValues = [];

    if (item.title) {
      hasParams = true;
      updateColumns.push(' title = ? ');
      updateValues.push(`%${item.title}%`);
    }
    if (item.author) {
      hasParams = true;
      updateColumns.push(' author = ? ');
      updateValues.push(`%${item.author}%`);
    }
    if (item.genre) {
      hasParams = true;
      updateColumns.push(' genre = ? ');
      updateValues.push(`%${item.genre}%`);
    }
    if (item.height && item.height >= 0) {
      hasParams = true;
      updateColumns.push(' height = ? ');
      updateValues.push(`${item.height}`);
    }
    if (item.publisher) {
      hasParams = true;
      updateColumns.push(' publisher = ? ');
      updateValues.push(`%${item.publisher}%`);
    }

    updateValues.push(item.id);

    if (hasParams) {
      this.db.run(
        `
      UPDATE collection
      SET ${updateColumns}
      WHERE id = ?;
    `,
        updateValues
      );
    } else {
      cb(new Error('Request Error - no properties provided for update'));
    }
  }
}

import { initializeDb } from '../db_service/db_init';
import sqlite3 from 'sqlite3';
import { LibraryCollectionModel } from './libraryCollectionModel';
import { MembersModel } from './membersModel';
import { CheckoutModel } from './checkoutModel';

export class ModelsService {
  db: sqlite3.Database;

  library: LibraryCollectionModel;

  members: MembersModel;

  checkouts: CheckoutModel;

  constructor() {
    this.db = initializeDb();
    this.library = new LibraryCollectionModel(this.db);
    this.members = new MembersModel(this.db);
    this.checkouts = new CheckoutModel(this.db);
  }
}

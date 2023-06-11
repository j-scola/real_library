import { initializeDb } from './db_init';
import sqlite3 from 'sqlite3';

export class LibraryController {
  db: sqlite3.Database;
  constructor() {
    this.db = initializeDb();
  }

  async addToCollection() {
    console.log('lib controller - add to collection');
  }

  async getCollection() {
    console.log('lib controller - get collection');
  }

  async searchFromCollection() {
    console.log('lib controller - search');
  }

  async updateCollection() {
    console.log('lib controller - update collection');
  }

  async checkoutBook() {
    console.log('lib controller - log checkout');
  }

  async renewCheckout() {
    console.log('lib controller - checkout renewal');
  }
}

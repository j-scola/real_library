import { LibraryCollectionModel } from './db_model';
import {
  CollectionItem,
  CreateCollectionItem,
  RequestCallbackAll,
  RequestCallbackRun,
} from '../types';

export class LibraryController {
  model: LibraryCollectionModel;
  constructor() {
    this.model = new LibraryCollectionModel();
  }

  async addToCollection(item: CreateCollectionItem, cb: RequestCallbackRun) {
    if (
      !item.title ||
      !item.author ||
      !item.genre ||
      !item.height ||
      !item.publisher
    ) {
      cb(
        new Error(
          'Error - incomplete collection item data, ensure that title, author, genre, height, and publisher are present'
        )
      );
    } else {
      this.model.add(item, cb);
    }
  }

  async getCollection(cb: RequestCallbackAll<CollectionItem>) {
    this.model.getCollection(cb);
  }

  searchFromCollection(
    item: Partial<CollectionItem>,
    callback: RequestCallbackAll<CollectionItem>
  ) {
    this.model.partialSearch(item, callback);
  }

  async updateCollection(cb: RequestCallbackRun) {
    console.log('lib controller - update collection');
    cb(new Error('Error - update collection item not available'));
  }

  async checkoutBook() {
    console.log('lib controller - log checkout');
  }

  async renewCheckout() {
    console.log('lib controller - checkout renewal');
  }
}

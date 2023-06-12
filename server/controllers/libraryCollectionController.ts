import { LibraryCollectionModel } from '../models';
import { ModelsService } from '../models/modelsService';
import {
  CollectionItem,
  CreateCollectionItem,
  RequestCallbackAll,
  RequestCallbackRun,
} from '../types';

export class LibraryCollectionController {
  model: LibraryCollectionModel;
  constructor(modelsService: ModelsService) {
    this.model = modelsService.library;
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

  async updateCollection(item: CollectionItem, cb: RequestCallbackRun) {
    this.model.updateById(item, cb);
  }

  async checkoutBook() {
    console.log('lib controller - log checkout');
  }

  async renewCheckout() {
    console.log('lib controller - checkout renewal');
  }
}

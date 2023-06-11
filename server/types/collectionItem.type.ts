interface CollectionItemBase {
  title: string;
  author: string;
  genre: string;
  height: number;
  publisher: string;
}

export type CreateCollectionItem = CollectionItemBase;

export interface CollectionItem extends CollectionItemBase {
  id: number;
}

export interface BaseCheckout {
  user_id: number;
  collection_id: number;
}

export interface ExistingCheckout extends BaseCheckout {
  id: number;
}

export interface CreateNewCheckout extends BaseCheckout {
  created_at: string;
  due_date: string;
}

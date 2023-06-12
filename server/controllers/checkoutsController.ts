import { CheckoutModel, ModelsService } from '../models';
import {
  BaseCheckout,
  CreateNewCheckout,
  ExistingCheckout,
  MemberId,
  RequestCallbackAll,
  RequestCallbackRun,
} from '../types';

export class CheckoutsController {
  model: CheckoutModel;
  constructor(model: ModelsService) {
    this.model = model.checkouts;
  }

  newCheckout(checkoutInfo: BaseCheckout, cb: RequestCallbackRun) {
    const current_time = new Date(Date.now());
    const due_date = new Date(
      current_time.getFullYear(),
      current_time.getMonth(),
      current_time.getDate() + 7
    );
    console.log(current_time.toISOString());
    console.log(due_date.toISOString());
    const checkout: CreateNewCheckout = {
      ...checkoutInfo,
      created_at: current_time.toISOString(),
      due_date: due_date.toISOString(),
    };
    this.model.add(checkout, cb);
  }

  getCheckoutsByMemberId(
    member_id: MemberId,
    cb: RequestCallbackAll<ExistingCheckout>
  ) {
    this.model.getCheckoutsByMemberId(member_id, cb);
  }
}

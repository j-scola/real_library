import { MembersModel, ModelsService } from '../models';
import {
  ExistingMember,
  MemberBase,
  RequestCallbackAll,
  RequestCallbackRun,
} from '../types';

export class MembersController {
  model: MembersModel;
  constructor(model: ModelsService) {
    this.model = model.members;
  }

  getMember(memberData: Partial<ExistingMember>, cb: RequestCallbackAll<any>) {
    this.model.partialSearchMember(memberData, cb);
  }

  updateMember(memberData: ExistingMember, cb: RequestCallbackRun) {
    this.model.updateMember(
      [memberData.name, memberData.email, memberData.phone, memberData.id],
      cb
    );
  }

  registerNewMember(memberData: MemberBase, cb: RequestCallbackRun) {
    console.log(memberData);
    if (!memberData.name || !memberData.email || !memberData.phone) {
      cb(
        new Error(
          'Error - incomplete collection member data, ensure that name, email, and phone are present'
        )
      );
    } else {
      this.model.registerNewMember(
        [memberData.name, memberData.email, memberData.phone],
        cb
      );
    }
  }
}

export type MemberEmail = string;
export type MemberName = string;
export type MemberPhone = string;
export type MemberId = number;

export interface MemberBase {
  name: MemberName;
  email: MemberEmail;
  phone: MemberPhone;
}

export interface ExistingMember extends MemberBase {
  created_at: string;
  id: MemberId;
}

export type CreateNewMemberInfo = [MemberName, MemberEmail, MemberPhone];
export type UpdateMemberInfo = [MemberName, MemberEmail, MemberPhone, MemberId];

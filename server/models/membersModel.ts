import sqlite3 from 'sqlite3';
import {
  CreateNewMemberInfo,
  RequestCallbackAll,
  RequestCallbackRun,
  ExistingMember,
  UpdateMemberInfo,
} from '../types';

export class MembersModel {
  db: sqlite3.Database;

  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  partialSearchMember(
    memberData: Partial<ExistingMember>,
    cb: RequestCallbackAll<any>
  ) {
    let hasParams = false;
    const searchConditions = [];
    const searchValues = [];
    if (memberData.id && memberData.id >= 0) {
      hasParams = true;
      searchConditions.push(' id = ? ');
      searchValues.push(`${memberData.id}`);
    }
    if (memberData.name) {
      hasParams = true;
      searchConditions.push(' name LIKE ? ');
      searchValues.push(`%${memberData.name}%`);
    }
    if (memberData.email) {
      hasParams = true;
      searchConditions.push(' email LIKE ? ');
      searchValues.push(`%${memberData.email}%`);
    }
    if (memberData.phone) {
      hasParams = true;
      searchConditions.push(' phone LIKE ? ');
      searchValues.push(`%${memberData.phone}%`);
    }
    if (memberData.created_at) {
      hasParams = true;
      searchConditions.push(' created_at LIKE ? ');
      searchValues.push(`%${memberData.created_at}%`);
    }
    console.log(hasParams);
    if (hasParams) {
      this.db.all(
        `
        SELECT * FROM members
        WHERE ${searchConditions.join(' AND ')}
      `,
        searchValues,
        (err, rows) => {
          console.log(err);
          console.log(rows);
          cb(err, rows);
        }
      );
    } else {
      cb(new Error('Error - member search params not provided'), []);
    }
  }

  updateMember(memberData: UpdateMemberInfo, cb: RequestCallbackRun) {
    this.db.run(
      `
      UPDATE members
      SET name = ?, email = ?, phone = ? 
      WHERE id = ?;
    `,
      memberData,
      cb
    );
  }

  registerNewMember(memberData: CreateNewMemberInfo, cb: RequestCallbackRun) {
    this.db.run(
      `
      INSERT INTO members (name, email, phone) 
      VALUES ( ?, ?, ? );
    `,
      memberData,
      cb
    );
  }
}

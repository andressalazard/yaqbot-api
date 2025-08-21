import dbpool from '../database/postgresql.database';

export class UserService {
  static async getAllUsers() {
    const result = await dbpool.query(`SELECT * FROM "YQBOT_VIEW"."V_Users"`);
    return result.rows;
  }
}

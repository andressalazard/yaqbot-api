import dbpool from '../database/postgresql.database';

export class UserService {
  static async getAllUsers() {
    const result = await dbpool.query(`SELECT * FROM "YQBOT_VIEW"."V_Users"`);
    return result.rows;
  }

  static async getUserById(id: string) {
    const result = await dbpool.query(`SELECT * FROM "YQBOT_VIEW"."V_Users" WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }
}

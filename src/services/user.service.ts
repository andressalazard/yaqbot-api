import dbpool from '../database/postgresql.database';
import { UpdatedUserData } from '../types';

export class UserService {
  static async getAllUsers() {
    const result = await dbpool.query(`SELECT * FROM "YQBOT_VIEW"."V_Users"`);
    return result.rows;
  }

  static async getUserById(id: string) {
    const result = await dbpool.query(`SELECT * FROM "YQBOT_DATA"."Users" WHERE username = $1`, [id]);
    return result.rows[0] || null;
  }

  static async updateUser(id: string, data: UpdatedUserData) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error('No hay datos para actualizar');
    }

    const setValues = keys.map((key, index) => `${key} = $${index + 1}`).join(', ');

    await dbpool.query(`UPDATE "YQBOT_DATA"."Users" SET ${setValues} WHERE id = $${keys.length + 1};`, [...values, id]);
    const result = await dbpool.query(`SELECT * FROM "YQBOT_DATA"."Users" WHERE id = $1`, [id]);
    return result.rows[0] || null;
  }
}

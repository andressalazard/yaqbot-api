import bcrypt from 'bcrypt';
import dbpool from '../database/postgresql.database';

import { generateToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
}

export class AuthService {
  static async register(data: RegisterData) {
    const { username, email, password, role } = data;

    const hash = await bcrypt.hash(password, 10);
    const statement = `INSERT INTO "YQBOT_DATA"."Users" (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [username, email, hash, role];

    const result = await dbpool.query(statement, values);

    return generateToken({ username, role });
  }

  static async login(email: string, password: string) {
    const result = await dbpool.query(`SELECT * FROM "YQBOT_DATA"."Users" WHERE email = $1`, [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) throw new AppError('Error de login', 401);
    return { token: generateToken({ username: user.username, role: user.role }), username: user.username, email: user.email, role: user.role };
  }
}

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { generateToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { Role } from '@prisma/client';
import { sendPasswordResetEmail } from '../config/email';
import { success } from 'zod';

interface RegisterData {
  username: string;
  email: string;
  password: string;
  role?: Role;
}

export class AuthService {
  static async register(data: RegisterData) {
    const { username, email, password, role = Role.USER } = data;

    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
        role,
      },
    });

    return {
      token: generateToken({ id: user.id, role: user.role }),
      userid: user.id,
    };
  }

  static async login(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      //console.log(user);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          success: false,
          message: 'Credenciales incorrectas',
        };
      }
      //if (!user) throw new AppError('Usuario No encontrado', 401);

      /*      if (!(await bcrypt.compare(password, user.password))) {
        throw new AppError('Contraseña Incorrecta', 401);
      }
*/

      return {
        token: generateToken({ username: user.username, role: user.role }),
        userid: user.id,
        role: user.role,
      };
    } catch (error) {
      throw new AppError('Credenciales incorrectas', 401);
    }
  }

  static async loginAdmin(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      //console.log(user);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          success: false,
          message: 'Credenciales incorrectas',
        };
      }

      if (user.role !== Role.ADMIN) {
        return {
          success: false,
          message: 'Credenciales incorrectas',
        };
      }

      return {
        token: generateToken({ username: user.username, role: user.role }),
        userid: user.id,
        role: user.role,
      };
    } catch (error) {
      throw new AppError('Credenciales incorrectas', 401);
    }
  }

  // 🔐 RECUPERACIÓN DE CONTRASEÑA

  /**
   * Solicita recuperación de contraseña
   * Genera un token aleatorio, lo hashea y lo guarda en BD
   * Envía email con el token sin hashear
   */
  static async forgotPassword(email: string) {
    // 1. Verificar que el usuario existe
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('Usuario para recuperación:', user);
    if (!user) {
      // Por seguridad, no revelamos si el email existe o no
      return {
        success: true,
        message:
          'Si el correo existe, recibirás un email con instrucciones para recuperar tu contraseña',
      };
    }

    // 2. Generar token aleatorio seguro (64 caracteres hexadecimales)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 3. Hashear el token para guardarlo en la BD
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // 4. Calcular fecha de expiración (5 minutos)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 5. Invalidar tokens antiguos del usuario (opcional pero recomendado)
    await prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    });

    // 6. Guardar nuevo token hasheado en la BD
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt,
      },
    });

    // 7. Enviar email con el token SIN hashear
    try {
      await sendPasswordResetEmail(email, resetToken);
    } catch (error) {
      console.error('Error al enviar email:', error);
      throw new AppError('No se pudo enviar el correo de recuperación', 500);
    }

    return {
      success: true,
      message:
        'Si el correo existe, recibirás un email con instrucciones para recuperar tu contraseña',
    };
  }

  /**
   * Verifica el token de recuperación
   * Si es válido, retorna un JWT temporal de 15 minutos
   */
  static async verifyResetToken(token: string) {
    // 1. Hashear el token recibido para compararlo con la BD
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // 2. Buscar el token en la BD
    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token: hashedToken },
      include: { user: true },
    });

    // 3. Validaciones
    if (!passwordReset) {
      throw new AppError('Token inválido o expirado', 400);
    }

    if (passwordReset.used) {
      throw new AppError('Este token ya fue utilizado', 400);
    }

    if (passwordReset.expiresAt < new Date()) {
      throw new AppError('Este token ha expirado', 400);
    }

    // 4. Generar JWT temporal (15 minutos) para cambiar la contraseña
    const resetJWT = generateToken(
      {
        userId: passwordReset.userId,
        type: 'password-reset',
        tokenId: passwordReset.id,
      },
      '15m'
    );

    return {
      success: true,
      resetToken: resetJWT,
      expiresIn: '15m',
    };
  }

  /**
   * Cambia la contraseña usando el JWT temporal
   */
  static async resetPassword(userId: string, tokenId: string, newPassword: string) {
    // 1. Verificar que el token de recuperación existe y no ha sido usado
    const passwordReset = await prisma.passwordReset.findUnique({
      where: { id: tokenId },
    });

    if (!passwordReset || passwordReset.used) {
      throw new AppError('Token de recuperación inválido o ya utilizado', 400);
    }

    if (passwordReset.expiresAt < new Date()) {
      throw new AppError('El token ha expirado', 400);
    }

    if (passwordReset.userId !== userId) {
      throw new AppError('Token no corresponde al usuario', 403);
    }

    // 2. Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Actualizar contraseña y marcar token como usado (transacción)
    await prisma.$transaction([
      // Actualizar contraseña
      prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      }),
      // Marcar token como usado
      prisma.passwordReset.update({
        where: { id: tokenId },
        data: { used: true },
      }),
    ]);

    return {
      success: true,
      message: 'Contraseña actualizada exitosamente',
    };
  }
}

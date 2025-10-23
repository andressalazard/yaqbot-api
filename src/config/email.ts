import nodemailer from 'nodemailer';

// Configuración del transportador de email para Gmail
export const transporter = nodemailer.createTransport({
  service: 'gmail', // Usa el servicio de Gmail directamente
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verificar conexión al iniciar (opcional pero recomendado)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error en configuración de email:', error);
  } else {
    console.log('✅ Servidor de email listo para enviar mensajes');
  }
});

// Template HTML para el email de recuperación
export const getPasswordResetEmailTemplate = (email: string, resetToken: string): string => {
  console.log('Generando template de email para:', email);
  const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperación de Contraseña</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: #ffffff;
      border-radius: 10px;
      padding: 40px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #2c5f2d;
      margin: 0;
      font-size: 28px;
    }
    .header p {
      color: #666;
      margin: 5px 0 0 0;
      font-size: 14px;
    }
    .content {
      margin: 30px 0;
    }
    .button-container {
      text-align: center;
      margin: 40px 0;
    }
    .button {
      background-color: #4CAF50;
      color: white !important;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 5px;
      display: inline-block;
      font-weight: bold;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #45a049;
    }
    .warning {
      background-color: #fff3cd;
      border-left: 4px solid #ffc107;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .warning strong {
      color: #856404;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
      text-align: center;
      color: #888;
      font-size: 12px;
    }
    .footer a {
      color: #4CAF50;
      text-decoration: none;
    }
    .token-link {
      word-break: break-all;
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      font-size: 12px;
      color: #666;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🌿 YaqBot</h1>
      <p>Recuperación de Contraseña</p>
    </div>

    <div class="content">
      <p>Hola,</p>
      
      <p>
        Recibimos una solicitud para restablecer la contraseña de tu cuenta en YaqBot.
      </p>

      <p>
        Para continuar con el proceso de recuperación, haz clic en el siguiente botón:
      </p>

      <div class="button-container">
        <a href="${resetLink}" class="button">
          🔐 Restablecer Contraseña
        </a>
      </div>

      <div class="warning">
        <strong>⏰ Importante:</strong> Este enlace expirará en <strong>5 minutos</strong>.
      </div>

      <p>
        Si no solicitaste este cambio, puedes ignorar este correo de forma segura. 
        Tu contraseña no será modificada.
      </p>

      <p>
        Por tu seguridad, nunca compartas este enlace con nadie.
      </p>
    </div>

    <div class="footer">
      <p>
        <strong>¿No funciona el botón?</strong><br>
        Copia y pega este enlace en tu navegador:
      </p>
      <div class="token-link">
        ${resetLink}
      </div>
      <p style="margin-top: 20px;">
        Este es un correo automático, por favor no respondas.<br>
        © ${new Date().getFullYear()} YaqBot - Tu asistente de jardinería 🌱
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

// Función para enviar el email de recuperación
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<void> => {
  const htmlContent = getPasswordResetEmailTemplate(email, resetToken);
  //console.log(htmlContent);
  const mailOptions = {
    from: `"YaqBot 🌿" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: '🔐 Recuperación de Contraseña - YaqBot',
    html: htmlContent,
    // Versión en texto plano (fallback)
    text: `
Hola,

Recibimos una solicitud para restablecer la contraseña de tu cuenta (${email}).

Para continuar, visita el siguiente enlace:
${process.env.FRONTEND_URL}/reset-password?token=${resetToken}

⏰ Este enlace expira en 5 minutos.

Si no solicitaste este cambio, ignora este correo.

Saludos,
Equipo YaqBot 🌱
    `.trim(),
  };

  try {
    console.log('Enviando email a:', email);
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', info.messageId);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    throw new Error('No se pudo enviar el correo de recuperación');
  }
};

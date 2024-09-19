export const APP_NAME = 'cooperative';

export function configuration() {
  const env = process.env.NODE_ENV || 'development';
  let isProduction = false;

  if (['production', 'prod'].includes(env.toLowerCase())) {
    isProduction = true;
  }

  const port = parseInt(process.env.PORT || '3006');

  return {
    env: {
      value: env,
      isProduction,
    },
    port,
    localhost: `http://127.0.0.1:${port}`,
    db: {
        uri: process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${APP_NAME}`,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'insecure',
        issuer: APP_NAME,
        expiresIn: '7d',
    },
    websiteUrl : process.env.WEBSITE_URL,
    email: {
        smtpHost: process.env.EMAIL_SMTP_HOST,
        smtpPort: parseInt(process.env.EMAIL_SMTP_PORT) || 587,
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        secure: process.env.EMAIL_SECURE === 'true',
    }
  };
}

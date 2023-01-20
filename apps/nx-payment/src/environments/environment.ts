export const environment = {
  production: false,
  baseUrl: process.env.BASE_URL || 'localhost:3001',
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY
  },
  database: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  paths: {
    templates: process.env.EMAIL_TEMPLATES_PATH || '/assets/templates',
    i18n: process.env.I18N_PATH || '/assets/i18n',
    static: process.env.STATIC_PATH || '/static',
  },
  jwt: {
    user: {
      issuer: process.env.ISSUER || 'http://chnirt.github.io',
      accessToken: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET || 'accesssecret',
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '1h',
      },
      refreshToken: {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshsecret',
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '1d',
      },
    },
  },
};

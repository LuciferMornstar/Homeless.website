// Configuration settings for the application
// Loads from environment variables with fallbacks

export const config = {
  database: {
    host: process.env.DB_HOST || 'db5017676906.hosting-data.io',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'dbu5385048',
    password: process.env.DB_PASSWORD || 'Z9EYceyh28Up9kH',
    name: process.env.DB_NAME || 'dbs14137291',
  },
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  },
  contactEmails: {
    general: 'info@homeless.website',
    help: 'helpme@homeless.website',
    volunteer: 'volunteer@homeless.website',
    dogs: 'dogs@homeless.website',
  },
  contactPhone: '+447853811172',
  socialMedia: {
    facebook: 'www.facebook.com/homelesshelpuk',
  }
};
require('dotenv-safe').config({
  allowEmptyValues: true,
  example: './.env.example',
});

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 6000,
  db_url_config: process.env.DB_URL_CONFIG,
};

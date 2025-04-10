import "dotenv-safe/config";

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 6000,
};

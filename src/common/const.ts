import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV ?? 'local';
export const SALT_ROUND = parseInt(process.env.SALT_ROUND);

export const JWT_SECRET = process.env.JWT_SECRET ?? 's%$&54s(00jhg$#@6';

export const ROOT_PATH = path.join(__dirname, '../..');

export const DB_TYPE = process.env.DB_TYPE ?? 'url';
export const DB_URL =
  process.env.DB_URL ?? `mongodb://localhost/primus_${NODE_ENV}`;
export const DB_CERT = process.env.DB_CERT;

export const PORT = process.env.PORT ?? 8000;

export const SMTP_HOST =
  process.env.SMTP_HOST ?? 'email-smtp.us-east-1.amazonaws.com';
export const SMTP_USER = process.env.SMTP_USER ?? 'AKIAWEMNWRZUZCNM3NRQ';
export const SMTP_PASSWORD =
  process.env.SMTP_PASSWORD ?? 'BDTas98gd7Gs1V69qFiijoyAIUvjQSvlzRbIUlTpQASK';
export const SMTP_PORT = parseInt(process.env.SMTP_PORT) ?? 465;

export const APP_URL = process.env.APP_URL ?? 'http://localhost';

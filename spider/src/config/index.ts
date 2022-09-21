import * as dotenv from "dotenv";

export const config = dotenv.config();

export const organiztion: string = 'learningOS';
export const assignments = ['lab0-0-setup-env-run-os1', 'lab1-os3'];
export const AUTH_TOKEN = process.env['TOKEN'];
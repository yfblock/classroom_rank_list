import * as dotenv from "dotenv";

export const config = dotenv.config();

export const organiztion: string = 'os-autograding';
export const assignment = 'oskernel';
export const AUTH_TOKEN = process.env['TOKEN'];
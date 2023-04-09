import mongoose from "mongoose";
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || '27017'
const MONGO_URL = `mongodb://admin:secret@${DB_HOST }:${DB_PORT}/ecomm-account?authSource=admin`

mongoose.connect(MONGO_URL)

let dbAccount = mongoose.connection;
export default dbAccount;
import { config } from 'dotenv'
import { connect } from './config/database.js'
import express from 'express'

config();

const app = express();

app.use(express.json());

await connect();

export default app;
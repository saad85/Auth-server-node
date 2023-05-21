import { config } from 'dotenv'
import { connect } from './config/database.js'
import express from 'express'
import {login, registerUser} from "./src/users/user-service.js";

config();

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
    const user = await registerUser(req, res)
    if(user) res.status(201).json(user);
});

// Login
app.post("/login", async (req, res) => {
    await login(req, res);
});

await connect();

export default app;
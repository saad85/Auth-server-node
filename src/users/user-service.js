
import {UsersCollection} from "./users-model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

export const registerUser = async (req, res) => {
    try {
        console.log(" Request received for register", req.body);

        const { first_name, last_name, email, password } = req.body;
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
            return false;
        }
        const oldUser = await UsersCollection.findOne({ email });

        if (oldUser) {
            res.status(409).send("User Already Exist. Please Login");
            return false;
        }

       const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await UsersCollection.create({
            firstName: first_name,
            lastName: last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        user.token = token;

        return user;
    } catch (err) {
        console.log(err);
    }
}

export const login = async (req, res) => {
    try {
        console.log("requesting for login ==> ", req.body)
        const { email, password } = req.body;

        if (!(email && password)) {
            res.status(400).send("All input is required");
            return false
        }
        const user = await UsersCollection.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            user.token = token;
            res.status(200).json(user);
        } else {
            res.status(400).send("Invalid Credentials");
        }

    } catch (err) {
        console.log(err);
    }
}
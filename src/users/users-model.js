import mongoose from "mongoose";
import {usersSchema} from './users-schema.js'
export const UsersCollection = mongoose.model("users", usersSchema)
import mongoose from "mongoose";

export const connect = async () => {
    console.log('MONGO URI ', process.env.MONGO_URI)
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        })
    console.log('CONNECTED TO ', process.env.MONGO_URI)
}
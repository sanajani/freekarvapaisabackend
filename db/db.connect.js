import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const USERNAME = process.env.USERNAME2;
const PASSWORD = process.env.PASSWORD

const DB_CONNECTION = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@freekarvapaisa.hrps9og.mongodb.net/?retryWrites=true&w=majority`)

        console.log('connected successfully');
    } catch (error) {
        console.log(error, "Error field is that one");
    }
}

export default DB_CONNECTION
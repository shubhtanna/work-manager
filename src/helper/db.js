import mongoose from "mongoose";
import { User } from "@/models/user";

export const connectDb = async () => {
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName: "work_manager",
        });
        console.log("db connected");

        // const user = new User({
        //     name: "test name",
        //     email: "test@gmail.com",
        //     password: "testpassword",
        //     about: "this is testing",
        // });

        // await user.save();

        console.log(connection);
    } catch (error) {
        console.log("failed to connect the database");
        console.log(error);
    }
};
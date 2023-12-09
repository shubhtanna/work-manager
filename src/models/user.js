import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        "uniqueItems": true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email Required !"],
    },
    password: {
        type: String,
        required: [true, "Email Required !"],
    },
    about: String,
});

export const User = mongoose.models.users || mongoose.model("users", UserSchema);
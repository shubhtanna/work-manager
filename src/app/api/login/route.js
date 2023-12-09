import { NextResponse } from "next/server";
import { User } from "../../../models/user";
import { connectDb } from "@/helper/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();

export async function POST(request) {
   console.log("login api");
   const { email, password } = await request.json();

   try {
    const user = await User.findOne({
        email: email,
    });

    if (user==null) {
        throw new Error("useer not found");
    }

    const matched = bcrypt.compareSync(password,user.password);
    if(!matched) {
        throw new Error("Password not matched");
    }

    const token = jwt.sign(
        {
            _id: user._id,
            name: user.name,
        },
        process.env.JWT_KEY
    );

    const response = NextResponse.json({
        message: "Login Success",
        success: true,
        user:user,
    });

    response.cookies.set("authToken", token, {
        expiresIn: "1d",
        httpOnly: true,
    });

    // console.log(token);

    return response;

   } catch (error) {
    console.log(error);
    return NextResponse.json(
        {
        messagea: error.message,
        success: false,
    },
    {
        status: 500,
    }
    );
   };
};
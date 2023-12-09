import { connectDb } from "@/helper/db";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDb();

export async function GET(request) {
    try{
      const tasks = await Task.find();
      
      return NextResponse.json(tasks);
    } catch (error){
        console.log(error)
        return NextResponse.json({
            message: "failed to get users",
            success: false,
        });
    }
}


export async function POST(request) {
    const {title,content,userId,status} = await request.json();

    const authToken = request.cookies.get("authToken")?.value;
//   console.log(authToken);
  const data = jwt.verify(authToken, process.env.JWT_KEY);
//   console.log(data);
console.log(data._id);

    try{
        const task = new Task({
            title,content,userId: data._id,status,
        });

        const createdTask = await task.save();

        const response = NextResponse.json(createdTask, {
            status:201,
        });

        return response;
    } catch (error) {
        return NextResponse.json({
            message: "failed to coonect",
            status: false,
        });
    }
}
import { getResponseMessage } from "@/helper/responseMessage";
import { Task } from "@/models/task";
import { NextResponse } from "next/server";

export async function GET(request,{params}){
    const {taskId} = params;

    try{
        const task = await Task.findById(taskId);
        return NextResponse.json(task);
    } catch (error) {
        console.log(error)
        return getResponseMessage("error" , 404, false);
    }
}
 
export async function PUT(request, {params}) {
    try{
        const {taskId} = params;
        const{title,content,status} = await request.json();
        let task = await Task.findById(taskId);
        task.title=title,
        task.content=content,
        task.status=status;

       const updatedTask = await task.save(); 
       return NextResponse.json(updatedTask);
    } catch (error) {
        console.log(error);
        return getResponseMessage("failed to update",500,false);
    }
}

export async function DELETE(request,{params}){
    try{
        const {taskId} = params;
        await Task.deleteOne({
            _id: taskId,
        });
        return getResponseMessage("task deleted",201,true);
    } catch (error) {
        console.log(error)
        return getResponseMessage("task can't delete",500,false);
    }
}
import mongoose from "mongoose";

export interface IUser{
    _id?: mongoose.Schema.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    role: "admin" | "customer";
    isBlocked: boolean;
}
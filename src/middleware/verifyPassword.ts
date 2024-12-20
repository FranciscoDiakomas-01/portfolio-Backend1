import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'

dotenv.config()

export default function VerifyPassWord( req : Request , res : Response , next : NextFunction) {
    try {
         const password = String(req.headers["authorization"]);
         if (password == String(process.env.PASSWORD)) {
           next();
           return;
         } else {
           res.status(400).json({
             error: "wrong password",
           });
         }
    } catch (error) {
        console.log(error)
    }
   
}
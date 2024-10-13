"use strict";
// // import { Request, Response, NextFunction } from "express";
// // import { ResponseStructure } from "../types/response";
// // export const errorHandler = (
// //   err: any,
// //   req: Request,
// //   res: Response,
// //   next: NextFunction
// // ) => {
// //   if(process.env.NODE_ENVIORMENT === "dev"){
// //     console.error(err.stack);
// //   }
// //   const response = new ResponseStructure(false,{},err.message || err)
// //   res.status(500).json(response);
// // };
// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// // import { IUser } from "../models/userModel.js"; 
// // import userModel from "../models/userModel.js";
// dotenv.config();
// export interface UserRequest extends Request {
//   user?: IUser; 
// }
// const authenticateToken = async (
//   req: UserRequest,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   const token = req.cookies.token;
//   if (!token) {
//     res.sendStatus(401);
//     return;
//   }
//   jwt.verify(token, process.env.JWT_SECRET!, async (err: any, decoded: any) => {
//     if (err) return res.sendStatus(403);
//     const foundUser = await userModel.findById(decoded.id);
//     if (!foundUser) {
//       res.sendStatus(404);
//       return;
//     }
//     req.user = foundUser; 
//     next();
//   });
// };
// export default authenticateToken;

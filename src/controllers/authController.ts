
import jwt from "jsonwebtoken"; 
import { Request, Response } from 'express';
import { Teacher } from '../models/teacherModel';
import { Student } from '../models/studentModel';
import { Classroom } from '../models/classRoomModel';
import { Types } from 'mongoose';


export const createTeacher = async (req: Request, res: Response) => {
    const teacherData = req.body;
    try {
        let classroom = await Classroom.findOne({ name: teacherData.classroom });

        if (!classroom) {
            classroom = await Classroom.create({ name: teacherData.classroom });
        }
        const newTeacher = await Teacher.create({
            ...teacherData,
            classroom: classroom._id as Types.ObjectId
        });
        classroom.teacher = newTeacher._id as Types.ObjectId;
        await classroom.save();

        res.status(201).json({ classID: classroom._id});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createStudent = async (req: Request, res: Response) => {
    const student = req.body;
    try {
        const classroom = await Classroom.findOne({ name: student.classroom });
        if (classroom) {
            student.classroom = classroom._id;
            const newStudent = await Student.create(student);
            res.status(201).json(newStudent);
        } else {
            res.status(404).json({ message: "Classroom not found" });
        }
    } catch (error) {
        const err = error as Error;
        console.error(err.message);
        res.status(500).json({ message: "An error occurred while creating the student." });
    }
}

// export const login = async (req: Request, res: Response): Promise<void> => {
//     const { passportId, password } = req.body;

//     try {
//         const user = await userModel.findOne({ passportId });

//         if (!user || user.password !== password) {
//             res.status(401).json({ message: 'Invalid credentials' });
//             return; 
//         }

//         const token = jwt.sign(
//             { id: user._id, role: user.role },
//             process.env.JWT_SECRET!,
//             { expiresIn: '1h' }
//         );

//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production', 
//             maxAge: 3600000, 
//         });

//         res.status(200).json({ message: 'Login successful' });
//     } catch (error) {
//         res.status(500).json({ message: "Error logging in" });
//     }
// }

// [14:32, 13.10.2024] משה צלניקר: import mongoose, { Types } from "mongoose";
// import { Request, Response, NextFunction } from "express";
// import { Teacher } from "../models/TeacherModel.js";
// import { Classroom } from "../models/ClassroomModel.js";

// export const registerTeacher = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { name, email, password, className } = req.body;
//       const existingTeacher = await Teacher.findOne({ email });
//       if (existingTeacher) {
//         res.status(400).json({ error: "Teacher already has a classroom assigned" });
//         return;
//       }
//       const existingClassroom = await Classroom.findOne({ name: className });
//       if (existingClassroom) {
//         res.status(400).json({ error: "Classroom with this name already exists" });
//  …
// [14:32, 13.10.2024] משה צלניקר: import mongoose, { Schema, Document, Types } from "mongoose";
// import validator from "validator";

// interface ITeacher extends Document {
//   name: string;
//   email: string;
//   password: string;
//   classroom: mongoose.Types.ObjectId; 
// }

// const teacherSchema = new Schema<ITeacher>({
//   name: { type: String, required: true },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true, 
//     validate: {
//       validator: (value: string) => validator.isEmail(value), 
//       message: "Invalid email format", 
//     },
//   },
//   password: { type: String, required: true,  match: [/^[0-9]{9}$/, "password must be 9 digits"],
//   },
//   classroom: { type: Schema.Types.ObjectId, ref: 'Classroom', required: true },
// });

// export const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);
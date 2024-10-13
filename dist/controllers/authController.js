"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudent = exports.createTeacher = void 0;
const teacherModel_1 = require("../models/teacherModel");
const studentModel_1 = require("../models/studentModel");
const classRoomModel_1 = require("../models/classRoomModel");
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teacherData = req.body;
    try {
        let classroom = yield classRoomModel_1.Classroom.findOne({ name: teacherData.classroom });
        if (!classroom) {
            classroom = yield classRoomModel_1.Classroom.create({ name: teacherData.classroom });
        }
        const newTeacher = yield teacherModel_1.Teacher.create(Object.assign(Object.assign({}, teacherData), { classroom: classroom._id }));
        classroom.teacher = newTeacher._id;
        yield classroom.save();
        res.status(201).json({ classID: classroom._id });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createTeacher = createTeacher;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = req.body;
    try {
        const classroom = yield classRoomModel_1.Classroom.findOne({ name: student.classroom });
        if (classroom) {
            student.classroom = classroom._id;
            const newStudent = yield studentModel_1.Student.create(student);
            res.status(201).json(newStudent);
        }
        else {
            res.status(404).json({ message: "Classroom not found" });
        }
    }
    catch (error) {
        const err = error;
        console.error(err.message);
        res.status(500).json({ message: "An error occurred while creating the student." });
    }
});
exports.createStudent = createStudent;
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

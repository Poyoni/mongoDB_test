
import jwt from "jsonwebtoken"; 
import { Request, Response } from 'express';
import { Teacher } from '../models/teacherModel';
import { Student } from '../models/studentModel';
import { Classroom } from '../models/classRoomModel';
import { Types } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


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

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const teacher = await Teacher.findOne({ email });
        const student = await Student.findOne({ email });

        let user;
        let role;
        let classroomId;

        if (teacher) {
            if (teacher.password !== password) {
               res.status(401).json({ message: "Invalid password" });
            }
            user = teacher;
            role = "teacher";
            classroomId = teacher.classroom; 
        } else if (student) {
            if (student.password !== password) {
               res.status(401).json({ message: "Invalid password" });
            }
            user = student;
            role = "student";
        } else {
            res.status(404).json({ message: "User not found" });
        }

  
        const token = jwt.sign({ id: user?._id, role, classroomId }, process.env.JWT_SECRET!, {
            expiresIn: "1h", 
        });
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during login." });
    }
};


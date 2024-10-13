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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createStudent = exports.createTeacher = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const teacherModel_1 = require("../models/teacherModel");
const studentModel_1 = require("../models/studentModel");
const classRoomModel_1 = require("../models/classRoomModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const teacher = yield teacherModel_1.Teacher.findOne({ email });
        const student = yield studentModel_1.Student.findOne({ email });
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
        }
        else if (student) {
            if (student.password !== password) {
                res.status(401).json({ message: "Invalid password" });
            }
            user = student;
            role = "student";
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id, role, classroomId }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred during login." });
    }
});
exports.login = login;

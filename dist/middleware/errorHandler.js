"use strict";
// 
// export const login = async (req: Request, res: Response) => {
//     const { email, password } = req.body;
//     try {
//         const teacher = await Teacher.findOne({ email });
//         const student = await Student.findOne({ email });
//         let user;
//         let role;
//         let classroomId: string | undefined;
//         if (teacher) {
//             if (teacher.password !== password) {
//                  res.status(401).json({ message: "Invalid password" });
//             }
//             user = teacher;
//             role = "teacher";
//             classroomId = teacher.classroom.toString(); 
//         } else if (student) {
//             if (student.password !== password) {
//                  res.status(401).json({ message: "Invalid password" });
//             }
//             user = student;
//             role = "student";
//         } else {
//              res.status(404).json({ message: "User not found" });
//         }
//         if (!process.env.JWT_SECRET) {
//              res.status(500).json({ message: "JWT_SECRET is not defined" });
//         }
//         const token = jwt.sign({ id: user?._id, role, classroomId }, process.env.JWT_SECRET!, {
//             expiresIn: "1h", 
//         });
//         res.status(200).json({ token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "An error occurred during login." });
//     }
// };

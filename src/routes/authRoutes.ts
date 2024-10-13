
import { createTeacher, createStudent } from "../controllers/authController";
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /api/register/teacherRegister:
 *  post:
 *      summary: register user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          className:
 *                              type: string
 * 
 * 
 *      responses:
 *          201:
 *              description: register user
 * 
 */
router.route("/teacherRegister").post(createTeacher);

/**
 * @swagger
 * /api/register/studentRegister:
 *  post:
 *      summary: register user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                             type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          className:
 *                              type: string
 * 
 * 
 *      responses:
 *          201:
 *              description: register user
 * 
 */
router.route("/studentRegister").post(createStudent);

export default router;

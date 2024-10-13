
import { createTeacher, createStudent, login } from "../controllers/authController";
import express from 'express';
const router = express.Router();

/**
 * @swagger
 * /api/auth/teacherRegister:
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
 * /api/auth/studentRegister:
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

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: register Teacher
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                        
 * 
 * 
 *      responses:
 *          201:
 *              description: register Teacher
 * 
 */

router.route("/login").post(login);

export default router;

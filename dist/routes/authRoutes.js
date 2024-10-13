"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = require("../controllers/authController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
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
router.route("/teacherRegister").post(authController_1.createTeacher);
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
router.route("/studentRegister").post(authController_1.createStudent);
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
router.route("/login").post(authController_1.login);
exports.default = router;

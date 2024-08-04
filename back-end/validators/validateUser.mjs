
import Project from '../models/m_project.mjs';
import Task from '../models/m_task.mjs';
import User from '../models/m_user.mjs';
import { body, validationResult } from 'express-validators';
import mongoose from 'mongoose';

const validateUser = [
    body('username').trim().escape().isLength({ min: 3 }).withMessage('Username is required'),
    body('email').isEmail().withMessage("Valid email is required"),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('projects').optional().isArray().custom(async (projectIds) => {
        const projects = await Project.find({ _id: { $in: projectIds } });
        if (projects.length !== projectIds.legth) {
            throw new Error('One or more project does not exist');
        }
        return true;
    })
];

export default validateUser;
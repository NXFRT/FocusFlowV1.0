
import Project from '../models/m_project.mjs';
import Task from '../models/m_task.mjs';
import User from '../models/m_user.mjs';
import { body, validationResult } from 'express-validator';
 
const validateTask = [
    body('title').trim().escape().isLength({ min: 1 }).withMessage('Title is required'),
    body('description').trim().escape().optional(),
    body('completed').isBoolean().withMessage('Completed must be a boolean value'),
    body('dueDate').isISO8601().toDate().optional(),
    body('priority').trim().escape().optional(),
    body('projectId').trim().escape().isLength({ min: 1 }).withMessage('Project ID is required')
        .custom(async (projectId) => {
            const projectExists = await Project.exists({ _id: projectId });
            if (!projectExists) {
                throw new Error('Project does not exist');
            }
            return true;
        }),
    body('assignedTo').isArray().withMessage('AssignedTo should be an array').optional()
        .custom(async (assignedTo, { req }) => {
            if (assignedTo) {
                const validUsers = await User.find({ _id: { $in: assignedTo }, projects: req.body.projectId });
                if (validUsers.length !== assignedTo.legth) {
                    throw new Error('Some users are not valid for this project');
                }
            }
            return true;
        })
];

export default validateTask;
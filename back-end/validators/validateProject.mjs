import { body, validationResult } from 'express-validator';
import Project from '../models/m_project.mjs';
import User from '../models/m_user.mjs';
import mongoose from 'mongoose';

const validateProject = [
    body('name').trim().escape().isLength({ min: 1 }).withMessage('Name is required'),
    body('description').trim().escape().optional(),
    body('status').trim().escape().isLength({ min: 1 }).withMessage('Status is required'),
    body('startDate').isISO8601().withMessage('Start date must be a valid date').optional(),
    body('endDate')
        .isISO8601().withMessage('End date must be a valid date').optional()
        .custom((endDate, { req }) => {
            if (req.body.startDate && new Date(endDate) < new Date(req.body.startDate)) {
                throw new Error('End date must be after start date');
            }
            return true;
        }),
    body('createdBy')
        .custom(async (createdBy) => {
            if (!mongoose.Types.ObjectId.isValid(createdBy)) {
                throw new Error('Invalid User ID for createdBy');
            }
            const userExists = await User.exists({ _id: createdBy });
            if (!userExists) {
                throw new Error('User does not exist');
            }
            return true;
        }).withMessage('Valid User ID is required for createdBy'),
    body('team')
        .isArray().withMessage('Team should be an array of user IDs')
        .custom(async (team) => {
            if (team.length > 0) {
                // Vérification des doublons
                const uniqueTeamMembers = new Set(team);
                if (uniqueTeamMembers.size !== team.length) {
                    throw new Error('Team contains duplicate user IDs');
                }
                // Vérification des IDs utilisateurs valides
                const validUsers = await User.find({ _id: { $in: team } });
                if (validUsers.length !== team.length) {
                    throw new Error('One or more team members do not exist');
                }
            }
            return true;
        }).withMessage('Valid user IDs are required for the team')
];

export default validateProject;
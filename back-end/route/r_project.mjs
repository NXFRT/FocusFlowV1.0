
import express from 'express';
const projectRoute = express.Router();
import { body, validationResult } from 'express-validator';
import Project from '../models/m_project.mjs';
import User from '../models/m_user.mjs';
import xss from 'xss';


projectRoute.get('/', async (req, res) => {
    try{
        const projects = await Project.find().populate('tasks');
        if(!projects) return res.status(404).json({ message: 'Aucun projets trouvés' });
        res.json(projects);
    }catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherches des projets', error: err.message });
    }
});

projectRoute.get('/:id', async(req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('tasks');
        if (!project) return res.status(404).json({ message: "Le projet n'existe pas" });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherche du projet', error: err.message });
    }
});

projectRoute.post('/', validateProject, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, description, status, startDate, endDate, createdBy, team } = req.body;

        const projectData = {
            name: xss(name),
            description: xss(description),
            status: xss(status),
            startDate: startDate,
            endDate: endDate,
            createdBy: xss(createdBy),
            team: team.map(userId => xss(userId))
        };

        const newProject = new Project(projectData);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création du projet', error: err.message });
    }
});

projectRoute.put('/:id', validateProject, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, description, status, startDate, endDate, createdBy, team } = req.body;

        const updatedProjectData = {
            ...(name && { name: xss(name) }),
            ...(description && { description: xss(description) }),
            ...(status && { status: xss(status) }),
            ...(startDate && { startDate }),
            ...(endDate && { endDate }),
            ...(createdBy && { createdBy: xss(createdBy) }),
            ...(team && { team: team.map(userId => xss(userId)) })
        };

        const updatedProject = await Project.findByIdAndUpdate(req.params.id, updatedProjectData, { new: true });
        if (!updatedProject) return res.status(404).json({ message: 'Aucun projet trouvé' });
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du projet', error: err.message });
    }
});

projectRoute.delete('/:id', async(req, res) => {
    try {
        const deletedproject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedproject) return res.status(404).json({ message: 'Aucun projet à supprimer'});
        res.json({ message: 'Project supprimé avec succes'});
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression du projet', error: err.message});
    }
});

export default projectRoute;
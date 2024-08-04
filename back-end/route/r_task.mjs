
import express from 'express';
const taskRoute = express.Router();
import { body, validationResult } from 'express-validator'
import Task from '../models/m_task.mjs';
import Project from '../models/m_project.mjs';
import User from '../models/m_user.mjs'; 
import validateTask from '../validators/validateTask.mjs';
import xss from 'xss';



// Route pour obtenir toutes les tasks
taskRoute.get('/', async (req, res) => {
    try{
        const tasks = await Task.find();
        if(!tasks) return res.json({ message: 'Aucune tâche trouvées'});
        res.json(tasks);
    }catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherche des tâches', error: err.message });
    }
});

//Route pour obtenir une task specifique
taskRoute.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if(!task) return res.status(404).json({message: 'Tâche non trouvée'});
        res.json(task);
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Route pour ajoûter une task
taskRoute.post('/', validateTask, async (req, res) => {
    // Récupérer les résultats de validation des middlewares
    const errors = validationResult(req);
    // Si des erreurs de validation sont trouvées, envoyer une réponse 400 avec les détails des erreurs
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, completed, dueDate, priority, projectId, assignedTo } = req.body;

        // Sanitisation des données avec xss
        const task = new Task ({
            title: xss(title),
            description: xss(description),
            completed: completed || false,
            dueDate: dueDate,
            priority: xss(priority),
            projectId: xss(projectId),
            assignedTo: assignedTo.map(userId => xss(userId))
        });

        // Sauvegarder la tâche dans la base de données
        await task.save();
        res.status (201).json(task);
    } catch (err) {
        res.status(500).send('Erreur lors de la creation de la tâche');
    }
});

// Route pour modifier une task
taskRoute.put('/:id', validateTask, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed, dueDate, priority, projectId, assignedTo } = req.body;

    const updatedTaskData = {
        ...(title && { title: xss(title) }),
        ...(description && { description: xss(description) }),
        ...(completed !== undefined && { completed }),
        ...(dueDate && { dueDate }),
        ...(priority && { priority: xss(priority) }),
        ...(projectId && { projectId: xss(projectId) }),
        ...(assignedTo && { assignedTo: assignedTo.map(userId => xss(userId)) })
    };

    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, updatedTaskData, { new: true });
        if (!updatedTask) return res.status(404).send('Tâche non trouvée');
        res.json(updatedTask);
    } catch (err) {
        res.status(500).send('Erreur lors de la mise à jour de la tâche');
    }
});

// Route pour suprimer une task
taskRoute.delete('/:id', async (req, res) => {
    try {
        const deletedtask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedtask) return res.status(404).send('Tâche non trouver');
        res.json({ message: 'Tâche supprimée avec succès'});
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error: err.message });
    }
});

export default taskRoute;
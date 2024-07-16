
import express from 'express';
const tacheroute = express.Router();
import { body, validationResult } from 'express-validator'
import Tache from '../models/m_tache.mjs';

// Route pour obtenir toutes les taches
tacheroute.get('/', async (req, res) => {
    try{
        const taches = await Tache.find();
        if(!taches) return res.json({ message: 'Aucune tâche trouvées'});
        res.json(taches);
    }catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherche des tâches', error: err.message });
    }
});

//Route pour obtenir une tache specifique
tacheroute.get('/:id', async (req, res) => {
    try {
        const tache = await Tache.findById(req.params.id);
        if(!tache) return res.status(404).json({message: 'Tâche non trouvée'});
        res.json(tache);
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Route pour ajoûter une tache
tacheroute.post('/', 

    [ body('title').notEmpty().withMessage('Le titre est requis') ],
    async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.statut(400).json({ errors: errors.array() });
    }

    const tache = new Tache({
        title : req.body.title,
        description : req.body.description,
        completed : req.body.completed || false,
        dueDate: req.body.dueDate,
        priority: req.body.priority,
        projectId: req.body.projectId,
        assignedTo: req.body.assignedTo,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    try {
        const newTache = await tache.save();
        console.log('Nouvelle tâche crée :', newTache)
        res.status (201).json(newTache);
    } catch (err) {
        res.status(400).send('Erreur lors de la creation de la tâche');
    }
});

// Route pour modifier une tache
tacheroute.put('/:id', async (req, res) => {
    try {
        const updatedtache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedtache) return res.status (404).send('Tâche non trouver');
        res.json(updatedtache);
    } catch (err) {
        res.status(404).send('Erreur lors de la mise à jour de la tâche');
    }
});

// Route pour suprimer une tache
tacheroute.delete('/:id', async (req, res) => {
    try {
        const deletedtache = await Tache.findByIdAndDelete(req.params.id);
        if (!deletedtache) return res.status(404).send('Tâche non trouver');
        res.json({ message: 'Tâche supprimée avec succès'});
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', error: err.message });
    }
});

export default tacheroute;
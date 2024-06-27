
const express = require('express');
const router = express.Router();
const tache = require('../models/tache');

// Route pour obtenir toutes les taches
router.get('/', async (req, res) => {
    try{
        const tache = await tache.find();
        req.json(tache);
    }catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Route pour ajoûter une tache
router.post('/', async (req, res) => {
    const tache = new tache({
        title : req.body.title,
        description : req.body.description
    });

    try {
        const newtache = await tache.save();
        res.status (201).json(newtache);
    } catch (err) {
        res.status(400).send('Erreur lors de la creation de la tâche');
    }
});

// Route pour modifier une tache
router.put('/:id', async (req, res) => {
    try {
        const tache = await tache.findbyid(req.params.id);
        if (!tache) return res.status (404).send('Tâche non trouver');

        tache.title = req.body.title;
        tache.description = req.body.description;
        tache.completed = req.body.completed;

        const modifiertache = await tach .save();
        res.json(modifiertache);
    } catch (err) {
        res.status(404).send('Erreur lors de la mise à jour de la tâche');
    }
});

// Route pour suprimer une tache
router.delete('/:id', async (req, res) => {
    try {
        const tache = await tache.findbyid(req.params.id);
        if (!tache) return res.status(404).send('Tâche non trouver')

        await tache.remove();
        res.send('Tâche supprimée');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
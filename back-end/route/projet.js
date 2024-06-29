
const express = require('express');
const router = express.Router();
const projet = require('../models/projet');

// Route pour obtenir toutes les projets
router.get('/', async (req, res) => {
    try{
        const projet = await projet.find();
        req.json(projet);
    }catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Route pour ajoûter une projet
router.post('/', async (req, res) => {
    const projet = new projet({
        title : req.body.title,
        description : req.body.description
    });

    try {
        const newprojet = await projet.save();
        res.status (201).json(newprojet);
    } catch (err) {
        res.status(400).send('Erreur lors de la creation de la projet');
    }
});

// Route pour modifier une projet
router.put('/:id', async (req, res) => {
    try {
        const projet = await projet.findbyid(req.params.id);
        if (!projet) return res.status (404).send('projet non trouver');

        projet.title = req.body.title;
        projet.description = req.body.description;
        projet.completed = req.body.completed;

        const modifierprojet = await projet.save();
        res.json(modifierprojet);
    } catch (err) {
        res.status(404).send('Erreur lors de la mise à jour de la projet');
    }
});

// Route pour suprimer une projet
router.delete('/:id', async (req, res) => {
    try {
        const projet = await projet.findbyid(req.params.id);
        if (!projet) return res.status(404).send('projet non trouver')

        await projet.remove();
        res.send('projet supprimée');
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;
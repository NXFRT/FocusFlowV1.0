
import express from 'express';
const projetroute = express.Router();
import Projet from '../models/m_projet.mjs';


projetroute.get('/', async (req, res) => {
    try{
        const projets = await Projet.find();
        if(!projets) return res.status(404).json({message: 'Aucun projets trouvés'});
        res.json(projets);
    }catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherches des projets', error: err.message});
    }
});

projetroute.get('/:id', async(req, res) => {
    try {
        const projet = await Projet.findById(req.params.id);
        if (!projet) return res.status(404).json({ message: "Le projet n'existe pas"});
        res.json(projet);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherche du projet', error: err.message});
    }
});

projetroute.post('/', async(req, res) => {
    const projet = new Projet({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false
    })

    try {
        const newProjet = await projet.save();
        console.log('Nouveau projet crée', newProjet);
        res.status(201).json(newProjet);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création du projet', error: err.message});
    }
});

projetroute.put('/:id', async(req , res) => {
    try {
        const updatedprojet = await Projet.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedprojet) return res.status(404).json({ message: 'Aucun Projets à modifier'});
        res.json(updatedprojet);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la modification du projet', error: err.message});
    }
});

projetroute.delete('/:id', async(req, res) => {
    try {
        const deletedprojet = await Projet.findByIdAndDelete(req.params.id);
        if (!deletedprojet) return res.status(404).json({ message: 'Aucun projet à supprimer'});
        res.json({ message: 'Projet supprimé avec succes'});
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression du projet', error: err.message});
    }
});

export default projetroute;
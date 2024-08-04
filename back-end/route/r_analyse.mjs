
import express from 'express'
const analyseRoute = express.Router();
import Analyse from '../models/m_analyse.mjs';
import Joi from 'joi'
import xss from 'xss'

analyseRoute.get('/', async(req, res) => {
    try {
        const analysis = await Analyse.find();
        if(!analysis) return res.status(404).json({ message: 'Aucune analyses trouvée' });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la recherche d'analyses", errors: err.message });
    }
});

analyseRoute.get('/:id', async(req, res) => {
    try {
        const analyse = await Analyse.findById();
        if(!analyse) return res.status(404).json({ message: "L'analyse n'existe pas" })
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la recherche de l'analyse", errors: err.message })
    }
});

analyseRoute.post('/', async(req, res) => {

    try{
        if (!req.body.userId || !req.body.projectId || typeof req.body.tasksCompleted !== 'number' || typeof req.body.timeSpent !== 'number');
            return res.status(400).json({ message:'Données manquante ou incorrecte'});
    

    const analyse = new Analyse({
        userId: req.body.userId,
        projectId: req.body.projectId,
        tasksCompleted: req.body.tasksCompleted || 0,
        timeSpent: req.body.timeSpent || 0,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    
        const newAnalyse = await analyse.save();
        console.log('Nouvelle analyse crée');
        res.status(201).json(newAnalyse);
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la créeation de l'analyse", errors: err.message });
    }
});

analyseRoute.put('/:id', async(req, res) => {
    try {
        const updatedanalyse = await Analyse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!updatedanalyse) return res.status(404).json({ message: 'Aucune analyse à modifier' });
        res.json(updatedanalyse);
    } catch (err) {
        res.status(5005).json({ message: "Erreur le de la modification de l'analyse", errors: err.message });
    }
});

analyseRoute.delete('/:id', async(req, res) => {
    try {
        const deletedanalyse = await Analyse.findByIdAndDelete(req.params.id);
        if(!deletedanalyse) return res.status(404).json({ message: 'Aucune analyse à modifier' });
        res.json({ message: 'Analyse supprimer avec succes' });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'analyse", errors: err.message });
    }
});

export default analyseRoute;

import express from 'express'
const notifRoute = express.Router();
import { body, validationResult } from 'express-validator'
import Notif from '../models/m_notification.mjs';

notifRoute.get('/', async(req, res) => {
    try {
        const notifs = await Notif.find();
        if(!notifs) return res.status(404).json({ message : "Aucune nouvelle notification"});
    } catch (err) {
        res.status(500).json({ message : "Erreur lors du chargement des notifications", errors: err.message });
    }
});

notifRoute.get('/:id', async(req, res) => {
    try {
        const notif = await Notif.findById();
        if(!notif) return res.status(404).json({ message : "La notification n'éxiste pas"});
    } catch (err) {
        res.status(500).json({ message : "Erreur lors de chargement de la notification", errors : err.message })
    }
});

notifRoute.post('/', async(req, res) => {
    try {
        
    } catch (err) {
        
    }
});

notifRoute.put('/:id', async(req, res) => {
    try {
        
    } catch (err) {
        
    }
});

notifRoute.delete('/:id', async(req, res) => {
    try {
        
    } catch (err) {
        
    }
});

export default notifRoute;
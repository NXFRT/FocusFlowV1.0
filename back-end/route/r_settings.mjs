
import express from 'express'
const settingsroute = express.Router();
import { body, validationResult } from 'express-validator'
import Settings from '../models/m_settings.mjs';


settingsroute.get('/', async(req, res) => {
    try {
        
    } catch (err) {
        
    }
});

settingsroute.get('/:id', async(req, res) => {
    try {
        
    } catch (err) {
        
    }
});

settingsroute.post('/',
    [

    ], async(req, res) => {
    try {
    
    } catch (err) {
        
    }
});

settingsroute.put('/:id', async(req, res) => {
    try {
        
    } catch (err) {
        
    }
});

settingsroute.delete('/:id', async(req, res) => {
    try {
        
    } catch (err) {
        
    }
});

export default settingsroute;
import express from 'express';
const userRoute = express.Router();
import { body, validationResult } from 'express-validator';
import User from '../models/m_user.mjs';
import xss from 'xss';
import jwt from 'jsonwebtoken';
import validateUser from '../validators/validateUser.mjs';



// Route pour obtenir tous les utilisateurs
userRoute.get('/', async (req, res) => {
    try {
        const users = await User.find().populate('projects');
        if (!users) return res.json({ message: 'Aucun utilisateur trouvé' });
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la recherche des utilisateurs', error: err.message });
    }
});

// Route pour obtenir un utilisateur spécifique
userRoute.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('projects');
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        res.json(user);
    } catch (err) {
        res.status(500).send('Erreur serveur');
    }
});

// Route pour les inscriptions
userRoute.post('/register', validateUser, async (req, res) => {
    console.log('Received a register request');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const signupSchema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    
    const { error } = signupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }

    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email déjà utilisé' });
        }

        const userData = new User({
            username: xss(username),
            email: xss(email),
            password: (password)
        });

        await userData.save();
        res.status(201).json({ message: 'Nouvelle utilisateur crée' });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur", error: err.message });
    }
});

// Route pour la connexion
userRoute.post('/login', async (req, res) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
    });

    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe invalide' });
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(400).json({ message: 'Email ou mot de passe invalide' });
        }

        const token = jwt.sign({ userId: user._id }, 'votre_clé_secrète', { expiresIn: '1h' });
        res.json({ token, user: { username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la connexion de l'utilisateur", error: err.message });
    }
});

// Route pour mettre à jour un utilisateur
userRoute.put('/:id', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const updateSchema = Joi.object({
        username: Joi.string().min(3).optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).optional()
    });

    const { error } = updateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ errors: error.details });
    }

    const { username, email, password } = req.body;

    const updatedUserData = {
        ...(username && { username: xss(username) }),
        ...(email && { email: xss(email) }),
        ...(password && { password: xss(password) })
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedUserData, { new: true });
        if (!updatedUser) return res.status(404).send('Utilisateur non trouvé');
        res.json(updatedUser);
    } catch (err) {
        res.status(404).send("Erreur lors de la mise à jour de l'utilisateur");
    }
});

// Route pour supprimer un utilisateur
userRoute.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Utilisateur non trouvé à supprimer' });
        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: err.message });
    }
});

export default userRoute;

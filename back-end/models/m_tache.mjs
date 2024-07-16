
//Creation de modele de donnée
import mongoose from 'mongoose';

const tacheschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
    dueDate: { type: Date },
    priority: { type: String, enum: ['Faible', 'Moyen', 'Haut'], default: 'Moyen' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projet' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Tache = mongoose.model('Tache', tacheschema);

export default Tache;


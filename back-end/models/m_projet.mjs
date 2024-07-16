
//Creation de modele de donnée
import mongoose from 'mongoose';

const projetschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['À faire', 'En cours', 'Completé'], default: 'À faire' },
    startDate: { type: Date },
    endDate: { type: Date },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tache' }],
    createdBy: { type: mongoose.Schema.Types.ObjectId? ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Projet = mongoose.model('Projet', projetschema);

export default Projet;
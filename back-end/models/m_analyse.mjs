
//Creation de modele de donnée
import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema ({
    userId: { type: mongoose.Shema.Types.ObjectId, ref: 'User', requiered: true },
    projectId: { type: mongoose.Shema.Types.ObjectId, ref: 'Projet', requiered: true },
    taskscompleted: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 }, //temps passé en heures
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

export default Analytics;
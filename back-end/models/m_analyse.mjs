
//Creation de modele de donnée
import mongoose from 'mongoose';

const analyseSchema = new mongoose.Schema ({
    userId: { type: mongoose.Shema.Types.ObjectId, ref: 'User', requiered: true },
    projectId: { type: mongoose.Shema.Types.ObjectId, ref: 'Project', requiered: true },
    taskscompleted: { type: Number, default: 0 },
    timeSpent: { type: Number, default: 0 }, //temps passé en heures
}, {
    timestamps: true
});

export default mongoose.model('Analyse', analyseSchema);
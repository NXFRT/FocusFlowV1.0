
//Creation de modele de donnée
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
    startDate: { type: Date },
    endDate: { type: Date },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref : 'User' }]
}, {
    timestamps: true
});

export default mongoose.model('Project', projectSchema);
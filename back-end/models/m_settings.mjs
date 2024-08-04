
//Creation de modele de donnée
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema ({
    userId: { type: mongoose.Schema.Types.ObjectId },
    darkMode: { type: Boolean, default: false },
    notifsEnabled: { type: Boolean, default: true },
    language: { type: String, default: 'en' },
}, {
    timestamps: true
});

export default mongoose.model('Settings', settingsSchema);
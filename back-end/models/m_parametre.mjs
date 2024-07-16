
//Creation de modele de donnée
import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema ({
    userId: { type: mongoose.Shema.Types.ObjectId },
    darkMode: { type: Boolean, default: false },
    notifsEnabled: { type: Boolean, default: true },
    language: { type: String, default: 'fr' },
    createdAt: { type: Date, default: Date.now},
    upadatedAt: { type: Date, default: Date.now}
});

const Settings = mongoose.model('Settings', settingsSchema);

export default Settings;
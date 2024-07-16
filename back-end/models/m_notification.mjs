
//Creation de modele de donnée
import mongoose from 'mongoose';

const notifSchema = new mongoose.Schema ({
    userId: { type: mongoose.Shema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Notif = mongoose.model('Notif', notifSchema);

export default Notif;
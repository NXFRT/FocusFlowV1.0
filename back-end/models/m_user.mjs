
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    username: { type: String, requiered: true, unique: true, trim: true },
    email: { type: String, requiered: true, unique: true, trim: true },
    password: { type: String, requiered: true },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]
}, {
    timestamps: true
});

// Middleware pour hasher le mdp avant de save un user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(20);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.pre('findOneAndUpdate', async function (next) {
    if (!this.getUpdate().password) return next();

    try {
        const salt = await bcrypt.genSalt(20);
        this.getUpdate().password = await bcrypt.hash(this.getUpdate().password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Methode pour comparer les mdp
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);

//Creation de modele de donnée
const mongoose = require('mongoose');

const tacheshema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    createdAt: { type: Date, Default: Date.now}
});

const tache = mongoose.model('tache', tacheshema);

module.exports = tache;
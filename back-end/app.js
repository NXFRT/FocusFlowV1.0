
require('./route/tache')


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());


// Route de base
app.get('/', (req, res) => {
    res.send('Bienvenue sur FocusFlow API');
});


// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur en cours d'éxecution sur le port ${port}`);
});


//Connection a MongoDB
const mongoose = require('mongoose')

mongoose.connect ('mongodb://localhost/focusflow', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('connecté à MongoDB'))
    .catch(err => console.error('erreur de connection à MongoDB', err));


//Utilisation des routes
//app.use('/api/tache', tacheRoutes)



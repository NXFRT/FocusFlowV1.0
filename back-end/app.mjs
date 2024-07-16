
import express from 'express';
import mongoose from 'mongoose';
import tacheroute from './route/r_tache.mjs';
import projetroute from './route/r_projet.mjs';


const app = express();



// Middleware pour parser les requêtes JSON
app.use(express.json());


// Route de base
app.get('/', (req, res) => { res.send('Bienvenue sur FocusFlow API'); });


// Démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Serveur en cours d'exécution sur le port ${port}`));


//Connection a MongoDB

mongoose.connect ('mongodb://localhost:27017/focusflow')
    .then(() => console.log('connecté à MongoDB sur le serveur : http://localhost:3000'))
    .catch(err => console.error('erreur de connection à MongoDB', err));


//Utilisation des routes
app.use(express.json());
app.use('/api/tache', tacheroute);
app.use('/api/projet', projetroute);

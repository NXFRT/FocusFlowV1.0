
import express from 'express';
import mongoose from 'mongoose';
import analyseRoute from './route/r_project.mjs';
import notifRoute from './route/r_project.mjs';
import projectRoute from './route/r_project.mjs';
import settingsRoute from './route/r_settings.mjs';
import taskRoute from './route/r_task.mjs';
import userRoute from './route/r_user.mjs';
import bodyParser from 'body-parser';


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

app.use(bodyParser.json());
//Utilisation des routes
app.use(express.json());
app.use('/api/analyse', analyseRoute);
app.use('/api/task', notifRoute);
app.use('/api/project', projectRoute);
app.use('/api/users', settingsRoute);
app.use('/api/task', taskRoute);
app.use('/api/users', userRoute);


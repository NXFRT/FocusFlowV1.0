
-- Etapes pour installer la BDD de FocusFlow
    -- Lancer MySql
    -- Ouvrir un cmd et allez dans le dossier contenant les fichier sql de FocusFlow avec la commande "cd" (ex : "cd path\to\your\sql\directory")
    -- executer la commande suivante pour l'utilisateur par default root : "mysql -u root -p < main.sql"  (remplacer root si utilisation d'un autre utilisateur mysql)
    -- entrer le mdp pour l'utilisateur mysql (laisser vide pour l'utilisateur root)

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- Créer et utiliser la base de données
    SOURCE create_database.sql


-- Chargement des indexes
    SOURCE Indexes/some_index.sql


-- Chargement des procedures
    SOURCE Procedures/some_procedure.sql


-- Chargement des seeds
    SOURCE Seeds/initial_data.sql


-- Chargement des tables
    SOURCE Tables/adresse.sql
    SOURCE Tables/attachement.sql
    SOURCE Tables/commentaire.sql
    SOURCE Tables/projet.sql
    SOURCE Tables/role.sql
    SOURCE Tables/tache.sql
    SOURCE Tables/tag.sql
    SOURCE Tables/user.sql


-- Chargement des triggers
    SOURCE Triggers/user_triggers.sql


-- Chargement des views
    SOURCE Views/some_view.sql

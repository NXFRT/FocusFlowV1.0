CREATE TABLE IF NOT EXISTS user (
    iduser INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nom VARCHAR (100) NOT NULL,
    prenom VARCHAR (100)NOT NULL,
    email VARCHAR (255)NOT NULL,
    mdp CHAR (95) NOT NULL,
    idadresse INT,
    FOREIGN KEY (idadresse) REFERENCES adresse (idadresse)
);

CREATE TABLE IF NOT EXISTS roleuser (
    iduser INT,
    idrole INT,
    PRIMARY KEY (iduser, idrole),
    FOREIGN KEY (iduser) REFERENCES user (iduser),
    FOREIGN KEY (idrole) REFERENCES role (idrole)
);
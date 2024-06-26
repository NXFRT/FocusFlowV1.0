
CREATE TABLE IF NOT EXISTS tache (
    idtache INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nom Varchar (100),
    description TEXT,
    statut ENUM("à faire", "en cours", "terminer") NOT NULL,
    datedebut DATE,
    datefin DATE,
    datecreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datemodification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    iduser INT,
    idprojet INT,
    FOREIGN KEY (iduser) REFERENCES user (iduser),
    FOREIGN KEY (idprojet) REFERENCES projet (idprojet)
);

CREATE TABLE IF NOT EXISTS tachetag (
    idtache INT,
    idtag INT,
    PRIMARY KEY (idtache, idtag),
    FOREIGN KEY (idtache) REFERENCES tache (idtache),
    FOREIGN KEY (idtag) REFERENCES tag (idtag)
);
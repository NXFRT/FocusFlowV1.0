
CREATE TABLE IF NOT EXISTS commentaire (
    idcommentaire INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    contenu TEXT NOT NULL,
    datecreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datemodification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    iduser INT,
    idtache INT,
    FOREIGN KEY (iduser) REFERENCES user (iduser),
    FOREIGN KEY (idtache) REFERENCES tache (idtache)
);
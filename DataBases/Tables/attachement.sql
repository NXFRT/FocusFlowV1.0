
CREATE TABLE IF NOT EXISTS attachement(
    idattachement INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    cheminfichier VARCHAR (255),
    datecreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datemodification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    idtache INT,
    idprojet INT,
    FOREIGN KEY (idtache) REFERENCES tache (idtache),
    FOREIGN KEY (idprojet) REFERENCES projet (idprojet)
);
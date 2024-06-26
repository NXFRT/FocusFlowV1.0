
CREATE TABLE IF NOT EXISTS projet (
    idprojet INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    titre VARCHAR (100) NOT NULL,
    description TEXT,
    datedebut DATE,
    datefin DATE,
    datecreation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    datemodification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    iduser INT,
    FOREIGN KEY (iduser) REFERENCES user (iduser)
);
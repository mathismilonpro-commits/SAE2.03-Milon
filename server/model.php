<?php
/**
 * Ce fichier contient toutes les fonctions qui réalisent des opérations
 * sur la base de données, telles que les requêtes SQL pour insérer, 
 * mettre à jour, supprimer ou récupérer des données.
 */

/**
 * Définition des constantes de connexion à la base de données.
 *
 * HOST : Nom d'hôte du serveur de base de données, ici "localhost".
 * DBNAME : Nom de la base de données
 * DBLOGIN : Nom d'utilisateur pour se connecter à la base de données.
 * DBPWD : Mot de passe pour se connecter à la base de données.
 */
define("HOST", "localhost");
define("DBNAME", "milon3");
define("DBLOGIN", "milon3");
define("DBPWD", "milon3");


function getAllMovies(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "select id, name, year, length, director, image, description from SAE203_Movie";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getAllProfiles(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer le menu avec des paramètres
    $sql = "select id, nom, image, restriction_age from SAE203_User";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function addProfile($name, $image, $min_age){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour insérer un nouveau profil avec des paramètres
    $sql = "INSERT INTO SAE203_User (nom, image, restriction_age) VALUES (:name, :image, :min_age)";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie les paramètres à la requête SQL
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':min_age', $min_age);
    // Exécute la requête SQL
    $result = $stmt->execute();
    return $result; // Retourne true si l'insertion a réussi, sinon false
}

function addMovie($name, $image, $year, $description, $director, $categorie, $trailer, $min_age, $length){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour insérer un nouveau film avec des paramètres
    $sql = "INSERT INTO SAE203_Movie (name, image, year, description, director, id_category, trailer, min_age, length) VALUES (:name, :image, :year, :description, :director, (SELECT id FROM SAE203_Category WHERE name = :categorie), :trailer, :min_age, :length)";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Lie les paramètres à la requête SQL
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':year', $year);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':director', $director);
    $stmt->bindParam(':categorie', $categorie);
    $stmt->bindParam(':trailer', $trailer);
    $stmt->bindParam(':min_age', $min_age);
    $stmt->bindParam(':length', $length);
    // Exécute la requête SQL
    $result = $stmt->execute();
    // Récupère le nombre de lignes affectées par l'insertion
    $affectedRows = $stmt->rowCount();
    return $result; // Retourne true si l'insertion a réussi, sinon false
}

function getAllCategories(){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    // Requête SQL pour récupérer toutes les catégories
    $sql = "select id, name from SAE203_Category ORDER BY name";
    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);
    // Exécute la requête SQL
    $stmt->execute();
    // Récupère les résultats de la requête sous forme d'objets
    $res = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $res; // Retourne les résultats
}

function getMovieDetails($id){
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    
    $sql = "SELECT m.id, m.name, m.year, m.length, m.director, m.image, 
                   m.description, m.trailer, m.min_age, c.name AS category
            FROM SAE203_Movie m
            JOIN SAE203_Category c ON m.id_category = c.id
            WHERE m.id = :id";
    
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $res = $stmt->fetch(PDO::FETCH_OBJ);
    return $res;
}

function getMoviesGroupedByCategory($age){
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

    // On récupère chaque film avec le nom de sa catégorie
    $sql = "SELECT m.id, m.name, m.image, c.name AS category_name 
            FROM SAE203_Movie m
            JOIN SAE203_Category c ON m.id_category = c.id
            WHERE m.min_age <= :age
            ORDER BY c.name, m.name";
    
    // Préparation puis exécution de la requête SQL
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':age', $age);
    $stmt->execute();

    // Résultat sous forme d'objets PHP (un objet par ligne)
    $movies = $stmt->fetchAll(PDO::FETCH_OBJ);

    // Tableau final : ["NomCategorie" => [film1, film2, ...]]
    $grouped = [];

    // On parcourt tous les films pour les ranger par catégorie
    $i = 0;
    $moviesCount = count($movies);
    while ($i < $moviesCount) {
        $movie = $movies[$i];
        // Nom de la catégorie du film courant
        $cat = $movie->category_name;

        // Si la catégorie n'existe pas encore, on l'initialise avec un tableau vide
        if (!isset($grouped[$cat])) {
            $grouped[$cat] = [];
        }

        // On ajoute le film dans le tableau de sa catégorie
        $grouped[$cat][] = [
            'id'    => $movie->id,
            'name'  => $movie->name,
            'image' => $movie->image
        ];

        $i++;
    }

    // On renvoie la structure regroupée par catégorie
    return $grouped;
}

function updateProfile($id, $name, $image, $restriction_age) {
    // Connexion à la base de données
    $cnx = new PDO("mysql:host=" . HOST . ";dbname=" . DBNAME, DBLOGIN, DBPWD);

    // Requête SQL pour mettre à jour un profil
    $sql = "REPLACE INTO SAE203_User SET id = :id, nom = :name, image = :image, restriction_age = :restriction_age";

    // Prépare la requête SQL
    $stmt = $cnx->prepare($sql);

    // Lie les paramètres à la requête SQL
    $stmt->bindParam(':id', $id);
    $stmt->bindParam(':name', $name);
    $stmt->bindParam(':image', $image);
    $stmt->bindParam(':restriction_age', $restriction_age);

    // Exécute la requête SQL
    $result = $stmt->execute();

    // Récupère le nombre de lignes affectées par la mise à jour
    $affectedRows = $stmt->rowCount();

    return $result; // Retourne true si la mise à jour a réussi, sinon false
}
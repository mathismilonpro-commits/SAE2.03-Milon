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
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);

    // Catégorie fictive : films mis en avant
    $sqlFeatured = "SELECT id, name, image
                    FROM SAE203_Movie
                    WHERE mis_en_avant = 1 AND min_age <= :age
                    ORDER BY name";
    $stmtF = $cnx->prepare($sqlFeatured);
    $stmtF->bindParam(':age', $age);
    $stmtF->execute();
    $featured = $stmtF->fetchAll(PDO::FETCH_OBJ);

    $grouped = [];

    $grouped["À la une"] = [];
    $i = 0;
    while ($i < count($featured)) {
        $grouped["À la une"][] = [
            'id'    => $featured[$i]->id,
            'name'  => $featured[$i]->name,
            'image' => $featured[$i]->image
        ];
        $i++;
    }

    // Films groupés par catégorie
    $sql = "SELECT m.id, m.name, m.image, c.name AS category_name
            FROM SAE203_Movie m
            JOIN SAE203_Category c ON m.id_category = c.id
            WHERE m.min_age <= :age
            ORDER BY c.name, m.name";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':age', $age);
    $stmt->execute();
    $movies = $stmt->fetchAll(PDO::FETCH_OBJ);

    $i = 0;
    $moviesCount = count($movies);
    while ($i < $moviesCount) {
        $movie = $movies[$i];
        $cat = $movie->category_name;
        if (!isset($grouped[$cat])) {
            $grouped[$cat] = [];
        }
        $grouped[$cat][] = [
            'id'    => $movie->id,
            'name'  => $movie->name,
            'image' => $movie->image
        ];
        $i++;
    }

    return $grouped;
}

function getTotalProfiles() {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $stmt = $cnx->prepare("SELECT COUNT(*) AS value FROM SAE203_User");
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
}

function getTotalMovies() {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $stmt = $cnx->prepare("SELECT COUNT(*) AS value FROM SAE203_Movie");
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
}

function getAvgFavoritesPerProfile() {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $stmt = $cnx->prepare(
        "SELECT ROUND(COALESCE(AVG(cnt), 0), 1) AS value
         FROM (SELECT COUNT(*) AS cnt FROM SAE203_Favorite GROUP BY id_user) AS sub"
    );
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
}

function getMostFavoritedMovie() {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $stmt = $cnx->prepare(
        "SELECT m.name AS value, COUNT(*) AS count
         FROM SAE203_Favorite f
         JOIN SAE203_Movie m ON f.id_movie = m.id
         GROUP BY f.id_movie
         ORDER BY count DESC
         LIMIT 1"
    );
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
}

function getMostPopularCategory() {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $stmt = $cnx->prepare(
        "SELECT c.name AS value, COUNT(*) AS count
         FROM SAE203_Favorite f
         JOIN SAE203_Movie m ON f.id_movie = m.id
         JOIN SAE203_Category c ON m.id_category = c.id
         GROUP BY c.id
         ORDER BY count DESC
         LIMIT 1"
    );
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_OBJ);
}

function addFavorite($user_id, $movie_id) {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "INSERT INTO SAE203_Favorite (id_user, id_movie) VALUES (:user_id, :movie_id) ON DUPLICATE KEY UPDATE id_user = id_user";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':movie_id', $movie_id);
    $result = $stmt->execute();
    return $result;
}

function getFavorites($user_id) {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "SELECT m.id, m.name, m.image
            FROM SAE203_Favorite f
            JOIN SAE203_Movie m ON f.id_movie = m.id
            WHERE f.id_user = :user_id
            ORDER BY m.name";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_OBJ);
}

function removeFavorite($user_id, $movie_id) {
    $cnx = new PDO("mysql:host=".HOST.";dbname=".DBNAME, DBLOGIN, DBPWD);
    $sql = "DELETE FROM SAE203_Favorite WHERE id_user = :user_id AND id_movie = :movie_id";
    $stmt = $cnx->prepare($sql);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':movie_id', $movie_id);
    $result = $stmt->execute();
    return $result;
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
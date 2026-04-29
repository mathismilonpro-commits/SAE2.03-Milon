<?php

/** ARCHITECTURE PHP SERVEUR  : Rôle du fichier controller.php
 * 
 *  Dans ce fichier, on va définir les fonctions de contrôle qui vont traiter les requêtes HTTP.
 *  Les requêtes HTTP sont interprétées selon la valeur du paramètre 'todo' de la requête (voir script.php)
 *  Pour chaque valeur différente, on déclarera une fonction de contrôle différente.
 * 
 *  Les fonctions de contrôle vont éventuellement lire les paramètres additionnels de la requête, 
 *  les vérifier, puis appeler les fonctions du modèle (model.php) pour effectuer les opérations
 *  nécessaires sur la base de données.
 *  
 *  Si la fonction échoue à traiter la requête, elle retourne false (mauvais paramètres, erreur de connexion à la BDD, etc.)
 *  Sinon elle retourne le résultat de l'opération (des données ou un message) à includre dans la réponse HTTP.
 */

/** Inclusion du fichier model.php
 *  Pour pouvoir utiliser les fonctions qui y sont déclarées et qui permettent
 *  de faire des opérations sur les données stockées en base de données.
 */
require("model.php");


function readMoviesController(){
    $movies = getAllMovies();
    return $movies;
}

function addMovieController(){
    if (!isset($_REQUEST['name']) || !isset($_REQUEST['image']) || !isset($_REQUEST['year']) || !isset($_REQUEST['description']) || !isset($_REQUEST['director']) || !isset($_REQUEST['trailer']) || !isset($_REQUEST['min_age']) || !isset($_REQUEST['length']) || !isset($_REQUEST['categorie'])) {
        return false; // Indique que des paramètres requis sont manquants
    }

    $name = $_REQUEST['name'];
    $image = $_REQUEST['image'];
    $year = $_REQUEST['year'];
    $description = $_REQUEST['description'];
    $director = $_REQUEST['director'];
    $trailer = $_REQUEST['trailer'];
    $min_age = $_REQUEST['min_age'];
    $length = $_REQUEST['length'];
    $categorie = $_REQUEST['categorie'];

    $ok = addMovie($name, $image, $year, $description, $director, $categorie, $trailer, $min_age, $length);

    if ($ok !=0){
        return "Le film $name a été ajouté avec succès !";
    } else {
        return false; // Indique une erreur lors de l'ajout du film
    }
}

function readCategoriesController(){
    $categories = getAllCategories();
    return $categories;
}

function addProfileController(){
    if (!isset($_REQUEST['name']) || !isset($_REQUEST['restriction_age'])) {
        return false; // Indique que des paramètres requis sont manquants
    }

    $name = $_REQUEST['name'];
    $image = $_REQUEST['image'] ?? '';
    $min_age = $_REQUEST['restriction_age'];

    $ok = addProfile($name, $image, $min_age);

    if ($ok !=0){
        return "Le profil $name a été ajouté avec succès !";
    } else {
        return false; // Indique une erreur lors de l'ajout du profil
    }
}

function readProfileController(){
    $profiles = getAllProfiles();

    if ($profiles === false || $profiles === null) {
        return false; // Indique une erreur dans le traitement de la requête
    }
    
    return $profiles;
}

function readMovieDetailsController(){
    if (!isset($_REQUEST['id'])) {
        return false; // Indique que le paramètre requis est manquant
    }

    $id = $_REQUEST['id'];
    $movie = getMovieDetails($id);

    if ($movie === false || $movie === null){
        return false; // Indique qu'aucun film n'a été trouvé
    } else {
        return $movie;
    }
}

function readMoviesGroupedByCategoryController(){
    $age = isset($_REQUEST['age']) ? (int)$_REQUEST['age'] : 0;

    $movies = getMoviesGroupedByCategory($age);

    if ($movies === false || $movies === null) {
        return false; // Indique une erreur dans le traitement de la requête
    }
    return $movies;
}

function addFavoriteController(){
    if (!isset($_REQUEST['user_id']) || !isset($_REQUEST['movie_id'])) {
        return false;
    }
    $user_id  = $_REQUEST['user_id'];
    $movie_id = $_REQUEST['movie_id'];
    $ok = addFavorite($user_id, $movie_id);
    if ($ok) {
        return "Film ajouté aux favoris.";
    } else {
        return false;
    }
}

function readFavoritesController(){
    if (!isset($_REQUEST['user_id'])) {
        return false;
    }
    $user_id = $_REQUEST['user_id'];
    $favorites = getFavorites($user_id);
    if ($favorites === false) {
        return false;
    }
    return $favorites;
}

function removeFavoriteController(){
    if (!isset($_REQUEST['user_id']) || !isset($_REQUEST['movie_id'])) {
        return false;
    }
    $user_id  = $_REQUEST['user_id'];
    $movie_id = $_REQUEST['movie_id'];
    $ok = removeFavorite($user_id, $movie_id);
    if ($ok) {
        return "Film retiré des favoris.";
    } else {
        return false;
    }
}

function updateProfileController(){
    if (!isset($_REQUEST['id']) || !isset($_REQUEST['name']) || !isset($_REQUEST['image']) || !isset($_REQUEST['restriction_age'])) {
        return false; // Indique que des paramètres requis sont manquants
    }

    $id = $_REQUEST['id'];
    $name = $_REQUEST['name'];
    $image = $_REQUEST['image'];
    $restriction_age = $_REQUEST['restriction_age'];

    $ok = updateProfile($id, $name, $image, $restriction_age);

    if ($ok !=0){
        return "Le profil $name a été mis à jour avec succès !";
    } else {
        return false; // Indique une erreur lors de la mise à jour du profil
    }
}
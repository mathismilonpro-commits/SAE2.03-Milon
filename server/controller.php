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
    if (!isset($_REQUEST['name']) || !isset($_REQUEST['image']) || !isset($_REQUEST['age'])) {
        return false; // Indique que des paramètres requis sont manquants
    }

    $name = $_REQUEST['name'];
    $image = $_REQUEST['image'];
    $min_age = $_REQUEST['age'];

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
    $movies = getMoviesGroupedByCategory();

    if ($movies === false || $movies === null) {
        return false; // Indique une erreur dans le traitement de la requête
    }
    return $movies;
}
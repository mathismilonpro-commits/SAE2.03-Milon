# Base de données — Documentation

## Schéma des tables

### `SAE203_Category`
| Colonne | Type | Contraintes | Justification |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant unique généré automatiquement |
| `name` | VARCHAR(255) | NOT NULL | Nom de la catégorie, longueur suffisante pour tout libellé |

### `SAE203_Movie`
| Colonne | Type | Contraintes | Justification |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant unique généré automatiquement |
| `name` | VARCHAR(255) | NOT NULL | Titre du film |
| `year` | INT | — | Année de sortie, entier suffisant |
| `length` | INT | — | Durée en minutes, entier |
| `description` | TEXT | — | TEXT car le résumé peut dépasser 255 caractères |
| `director` | VARCHAR(255) | — | Nom du réalisateur |
| `id_category` | INT | FK → SAE203_Category(id) | Clé étrangère vers la catégorie du film |
| `image` | VARCHAR(255) | — | Nom de fichier image stocké dans `server/images/` |
| `trailer` | VARCHAR(255) | — | URL d'embed YouTube (format fixe court) |
| `min_age` | INT | — | Âge minimum recommandé (0, 6, 10, 12, 14, 16, 18) |
| `mis_en_avant` | TINYINT(1) | DEFAULT 0 | Booléen : 1 = film mis en avant, 0 = non. TINYINT(1) est la convention MySQL pour les booléens |

### `SAE203_User`
| Colonne | Type | Contraintes | Justification |
|---|---|---|---|
| `id` | INT | PK, AUTO_INCREMENT | Identifiant unique généré automatiquement |
| `nom` | VARCHAR(255) | NOT NULL | Nom du profil utilisateur |
| `image` | VARCHAR(255) | — | Nom de fichier avatar (optionnel) |
| `restriction_age` | INT | — | Âge maximum des films accessibles au profil |

### `SAE203_Favorite`
| Colonne | Type | Contraintes | Justification |
|---|---|---|---|
| `id_user` | INT | PK partielle, FK → SAE203_User(id) | Référence vers le profil |
| `id_movie` | INT | PK partielle, FK → SAE203_Movie(id) | Référence vers le film |

La clé primaire composite `(id_user, id_movie)` garantit qu'un profil ne peut pas ajouter deux fois le même film en favori. Pas besoin d'un `id` auto-incrémenté supplémentaire.

---

## Cardinalités

```
SAE203_Category ──(1,1)──< SAE203_Movie
```
- Un film appartient à **exactement une** catégorie `(1,1)`.
- Une catégorie contient **zéro ou plusieurs** films `(0,n)`.

```
SAE203_User ──(0,n)──< SAE203_Favorite >──(0,n)──> SAE203_Movie
```
- Un utilisateur peut avoir **zéro ou plusieurs** favoris `(0,n)`.
- Un film peut être en favori chez **zéro ou plusieurs** utilisateurs `(0,n)`.
- La table `SAE203_Favorite` matérialise cette association many-to-many.

---

## Vue Looping

> *(Insérer ici une capture d'écran de la vue Looping et joindre le fichier `.loo` au dépôt)*

---

## Requêtes SQL par itération

### Itération 1 — Affichage de la liste des films

```sql
SELECT id, name, year, length, director, image, description
FROM SAE203_Movie
```

Sélectionne tous les films avec les colonnes nécessaires à l'affichage en liste. Pas de filtre : on affiche tout.

---

### Itération 2 — Détail d'un film

```sql
SELECT m.id, m.name, m.year, m.length, m.director, m.image,
       m.description, m.trailer, m.min_age, c.name AS category
FROM SAE203_Movie m
JOIN SAE203_Category c ON m.id_category = c.id
WHERE m.id = :id
```

`JOIN` sur `SAE203_Category` pour récupérer le nom de la catégorie en une seule requête plutôt que deux. Filtre sur l'`id` passé en paramètre (requête préparée pour éviter les injections SQL).

---

### Itération 3 — Liste des catégories (admin)

```sql
SELECT id, name FROM SAE203_Category ORDER BY name
```

Récupère toutes les catégories triées alphabétiquement pour le `<select>` du formulaire d'ajout de film.

---

### Itération 4 — Ajout d'un film (admin)

```sql
INSERT INTO SAE203_Movie (name, image, year, description, director, id_category, trailer, min_age, length)
VALUES (:name, :image, :year, :description, :director,
        (SELECT id FROM SAE203_Category WHERE name = :categorie),
        :trailer, :min_age, :length)
```

Sous-requête `SELECT` imbriquée pour résoudre le nom de catégorie en `id` directement dans l'INSERT, sans requête préalable côté PHP.

---

### Itération 6 — Sélection d'un profil

**Création de la table `SAE203_User`** (modification BDD) :
```sql
CREATE TABLE SAE203_User (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  image VARCHAR(255),
  restriction_age INT
)
```

Lecture des profils :
```sql
SELECT id, nom, image, restriction_age FROM SAE203_User
```

Ajout d'un profil :
```sql
INSERT INTO SAE203_User (nom, image, restriction_age)
VALUES (:name, :image, :min_age)
```

---

### Itération 7 — Films groupés par catégorie

```sql
SELECT m.id, m.name, m.image, c.name AS category_name
FROM SAE203_Movie m
JOIN SAE203_Category c ON m.id_category = c.id
WHERE m.min_age <= :age
ORDER BY c.name, m.name
```

`JOIN` pour obtenir le nom de catégorie. Filtre `min_age <= :age` pour n'afficher que les films accessibles au profil sélectionné. `ORDER BY c.name, m.name` permet de grouper côté PHP sans traitement supplémentaire.

---

### Itération 8 — Mise à jour d'un profil (admin)

```sql
REPLACE INTO SAE203_User
SET id = :id, nom = :name, image = :image, restriction_age = :restriction_age
```

`REPLACE INTO` : si un profil avec cet `id` existe, il est remplacé ; sinon il est créé. Simplifie la logique d'upsert sans nécessiter un `INSERT ... ON DUPLICATE KEY UPDATE`.

---

### Itération 9 — Favoris

**Création de la table `SAE203_Favorite`** (modification BDD) :
```sql
CREATE TABLE SAE203_Favorite (
  id_user INT NOT NULL,
  id_movie INT NOT NULL,
  PRIMARY KEY (id_user, id_movie),
  FOREIGN KEY (id_user) REFERENCES SAE203_User(id),
  FOREIGN KEY (id_movie) REFERENCES SAE203_Movie(id)
)
```

Ajout d'un favori :
```sql
INSERT INTO SAE203_Favorite (id_user, id_movie)
VALUES (:user_id, :movie_id)
ON DUPLICATE KEY UPDATE id_user = id_user
```

`ON DUPLICATE KEY UPDATE` évite une erreur si le favori existe déjà (clé primaire composite), sans avoir à vérifier au préalable. L'update fictif `id_user = id_user` ne change rien mais satisfait la syntaxe.

Lecture des favoris d'un profil :
```sql
SELECT m.id, m.name, m.image
FROM SAE203_Favorite f
JOIN SAE203_Movie m ON f.id_movie = m.id
WHERE f.id_user = :user_id
ORDER BY m.name
```

Suppression d'un favori :
```sql
DELETE FROM SAE203_Favorite
WHERE id_user = :user_id AND id_movie = :movie_id
```

---

### Itération 11 — Films mis en avant

**Modification de `SAE203_Movie`** : ajout de la colonne `mis_en_avant` :
```sql
ALTER TABLE SAE203_Movie ADD COLUMN mis_en_avant TINYINT(1) DEFAULT 0
```

Requête pour récupérer les films mis en avant (catégorie "À la une") :
```sql
SELECT id, name, image
FROM SAE203_Movie
WHERE mis_en_avant = 1 AND min_age <= :age
ORDER BY name
```

---

### Itération 12 — Statistiques

Total des profils :
```sql
SELECT COUNT(*) AS value FROM SAE203_User
```

Total des films :
```sql
SELECT COUNT(*) AS value FROM SAE203_Movie
```

Moyenne de favoris par profil :
```sql
SELECT ROUND(COALESCE(AVG(cnt), 0), 1) AS value
FROM (SELECT COUNT(*) AS cnt FROM SAE203_Favorite GROUP BY id_user) AS sub
```

`COALESCE(AVG(...), 0)` gère le cas où `SAE203_Favorite` est vide (AVG retournerait NULL). Sous-requête pour calculer le COUNT par utilisateur avant la moyenne.

Film le plus mis en favoris :
```sql
SELECT m.name AS value, COUNT(*) AS count
FROM SAE203_Favorite f
JOIN SAE203_Movie m ON f.id_movie = m.id
GROUP BY f.id_movie
ORDER BY count DESC
LIMIT 1
```

Catégorie la plus mise en favoris :
```sql
SELECT c.name AS value, COUNT(*) AS count
FROM SAE203_Favorite f
JOIN SAE203_Movie m ON f.id_movie = m.id
JOIN SAE203_Category c ON m.id_category = c.id
GROUP BY c.id
ORDER BY count DESC
LIMIT 1
```

Double `JOIN` pour remonter de `SAE203_Favorite` → `SAE203_Movie` → `SAE203_Category`. `GROUP BY c.id` plutôt que `c.name` pour éviter des collisions si deux catégories avaient le même nom.

---

### Itération 13 — Recherche de films (app)

```sql
SELECT m.id, m.name, m.image, m.mis_en_avant, c.name AS category
FROM SAE203_Movie m
JOIN SAE203_Category c ON m.id_category = c.id
WHERE m.name LIKE :keyword
  [AND m.min_age <= :age]
ORDER BY m.name
```

`LIKE '%motclé%'` permet une recherche partielle dans le titre (contient). Le paramètre `:keyword` reçoit la valeur `'%' . $keyword . '%'` construite côté PHP. Le filtre `min_age` est appliqué uniquement si un âge de profil est fourni (absent = contexte admin, tous les films sont visibles).

---

### Itération 14 — Mise en avant depuis l'admin

```sql
UPDATE SAE203_Movie
SET mis_en_avant = :status
WHERE id = :id
```

Mise à jour ciblée d'une seule colonne sur un film identifié par son `id`. `:status` vaut 0 ou 1, validé côté contrôleur PHP avant d'atteindre le modèle.

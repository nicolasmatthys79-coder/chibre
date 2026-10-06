# Chibre Suisse — Version trois

Cette version ajoute une croix × en haut à droite de chaque résumé dans l’historique. La suppression ouvre « Supprimer cette partie ? » avec les boutons Oui et Non, puis enregistre la liste mise à jour. Les noms des équipes sont affichés comme du texte dans l’historique.

## Mise à jour sur GitHub

1. Décompressez l’archive `chibre-version-trois.zip`.
2. Ouvrez votre dépôt GitHub et le dossier qui contient actuellement `index.html`.
3. Remplacez les fichiers du même nom par les fichiers de cette version : `index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png` et `icon-512.png`. Le README est facultatif.
4. Enregistrez le commit avec le message « Version trois — suppression individuelle dans l’historique ».
5. Attendez le déploiement GitHub Pages, puis rechargez l’application. Si l’ancienne version apparaît encore, fermez puis rouvrez l’application et rechargez la page avec une connexion Internet.

Copiez les fichiers directement dans le dossier actuel de l’application, sans ajouter un dossier `version-trois` dans l’adresse du site. Conservez la même adresse GitHub Pages : les parties sont enregistrées dans le navigateur de chaque appareil sous les clés existantes `chibre_clean_v1` et `chibre_history`. Évitez d’effacer les données du site pour garder ces parties.

## Fichiers

- `index.html` : application complète, version trois.
- `manifest.webmanifest` : configuration de l’application installable.
- `sw.js` : cache hors connexion, version trois.
- `icon-192.png` et `icon-512.png` : nouvelles icônes simples, croix claire sur fond vert.

Le manifeste, le service worker et les icônes ont été recréés, car seul le fichier HTML d’origine était fourni. L’installation et le mode hors connexion nécessitent HTTPS (GitHub Pages convient), ou localhost pour les essais.

## Présentation du code

Le HTML, le CSS et le JavaScript sont regroupés dans index.html, avec la même présentation que le fichier d’origine. La croix ouvre une fenêtre « Supprimer cette partie ? » : Oui supprime le résumé sélectionné, Non le conserve. Aucun fichier style.css ou ui.js n’est nécessaire pour cette version.

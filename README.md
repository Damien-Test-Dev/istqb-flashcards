# ISTQB Flashcards (FR) — Offline (PWA)

Application web de révision **ISTQB Foundation Level (FR)** sous forme de **flashcards**.  
Optimisée pour **iPad (iOS 12.5.7)** et utilisable sur **PC**.

---

## 🎯 Objectif

Réviser les notions ISTQB en français grâce à des cartes courtes, lisibles et illustrées, utilisables **n’importe où** :  
✅ **1ère visite en ligne** (mise en cache)  
✅ ensuite **100% hors ligne** (offline)

---

## ✅ Fonctionnalités

### Home
- Affiche **8 decks** sous forme de grille **2 × 4**
- Chaque deck a un **titre** et affiche le **nombre de cartes**

### Flashcards (dans un deck)
- **Tap/clic sur la carte = carte suivante**
  - iPad : tactile (doigt)
  - PC : souris
- **Pas** de carte précédente
- **Pas** de flip (pas de recto/verso)
- **Pas** de swipe
- **Pas** de quiz
- **Pas** de marquage “je sais / à revoir”

### Aléatoire
- À chaque ouverture d’un deck :
  - ordre **aléatoire**
  - **sans répétition** pendant la session
- Aucune sauvegarde de progression

### Fin de deck
- La dernière carte s’affiche normalement
- **Tap/clic suivant → retour direct à la Home**

### Contenu des cartes
Chaque carte contient :
1. **Titre / résumé** (court)
2. **Illustration légère** (SVG)
3. **Notion + définition + explication + mini exemple** (texte court, zéro scroll)

> Si une notion est trop longue, elle doit être découpée en plusieurs cartes.

---

## 🧱 Stack technique

- **HTML** (structure)
- **CSS** (mise en page responsive iPad/PC)
- **JavaScript ES5** (compatibilité Safari iOS 12)
- **Service Worker** (`sw.js`) pour le **cache offline**
- **PWA manifest** (`manifest.json`) pour ajout à l’écran d’accueil

✅ Aucun framework, aucune dépendance, aucun CDN  
✅ Tout est embarqué → idéal pour usage offline

---

## 📁 Structure du projet

istqb-flashcards/
index.html
styles.css
app.js
sw.js
manifest.json



---

## ✍️ Modifier / enrichir le contenu

Le contenu (decks + cartes) est dans :

✅ `app.js`

Chercher le bloc :

```js
var DECKS = [
  { id: 'd1', title: '...', cards: [ ... ] },
  ...
];

Format d’une carte :

["Titre", "iconKey", "Notion", "Définition", "Explication", "Exemple"]


Clés d’icônes disponibles (iconKey) :

target

bug

checklist

docs

flow

shield

gears

graph

eye

layers

clock

🌐 Déploiement via GitHub Pages (résumé)

Créer un repo GitHub (recommandé : Public)

Uploader les fichiers

Settings → Pages → Deploy from branch → main + /(root)

Ouvrir l’URL GitHub Pages

📱 Offline sur iPad (utilisation conseillée)

Ouvrir l’app une première fois en ligne

Recharger une fois

(Optionnel) Ajouter à l’écran d’accueil : Partager → Sur l’écran d’accueil

Ensuite : utilisation hors ligne OK

📌 Notes

Objectif : révision rapide, lecture confortable, zéro scroll

Les textes sont volontairement simples et pédagogiques + mini exemple

Les illustrations sont en SVG léger (offline-friendly)

🔖 Licence

À définir (ex : MIT) selon tes besoins.


::contentReference[oaicite:0]{index=0}





sw.js est le Service Worker de ton app.

En pratique, c’est un petit script que le navigateur installe “à part” et qui agit comme un proxy local entre ton app et le réseau.

À quoi il sert dans ton projet ?
1) Rendre l’app offline

Lors de la 1re visite en ligne, sw.js met en cache les fichiers essentiels :

index.html, styles.css, app.js, manifest.json, etc.

Ensuite, même sans internet, le navigateur peut relire ces fichiers depuis le cache → l’app s’ouvre et fonctionne.

2) Accélérer le chargement

Au lieu de re-télécharger à chaque fois, il sert les fichiers depuis le cache (souvent plus rapide).

3) Gérer une stratégie de cache

Dans notre sw.js, on fait une stratégie simple :

cache-first : on cherche d’abord dans le cache

si absent → on fetch sur internet

si fetch OK → on met en cache pour la prochaine fois

si offline et navigation → on retombe sur index.html

Que se passe-t-il si tu supprimes sw.js ?

L’app reste utilisable en ligne (comme un site normal)

mais tu perds le mode offline (plus de PWA offline)

Quand tu dois le modifier ?

Surtout quand tu veux forcer une mise à jour du cache après modifications.

Typiquement : tu changes CACHE_NAME (ex: istqb-flashcards-v2)

ou tu ajustes la liste ASSETS

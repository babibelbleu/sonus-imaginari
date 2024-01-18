# Sonus Imaginari
M2 Arts Numériques X BUT3 Info



![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
[![forthebadge](https://forthebadge.com/images/badges/uses-html.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-css.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)


## Introduction

Sonus Imaginari est une application web innovante qui transforme les couleurs en musique. En utilisant la technologie de détection de couleur et de synthèse audio, cette application offre une expérience unique où les couleurs capturées par la caméra sont converties en fréquences sonores, créant ainsi une symphonie visuelle.
## Caractéristiques Principales

- Détection de Couleur : Utilisation de la caméra pour détecter les couleurs en temps réel.
- Conversion Couleur-Fréquence : Chaque couleur détectée est convertie en une fréquence sonore spécifique, offrant une expérience auditive correspondant à l'expérience visuelle.
- Synthèse Audio : Utilisation de la bibliothèque Tone.js pour générer des sons à partir des fréquences calculées.
- Interface Utilisateur Intuitive : Facile à naviguer, permettant aux utilisateurs d'interagir facilement avec l'application.
## Utilisation

- Activez votre caméra lorsque vous êtes invité par l'application.
- Pointez la caméra vers différents objets pour capturer leur couleur.
- Écoutez les sons générés en fonction des couleurs détectées.

## Tests
Pour effectuer des tests, changer la variable suivante dans `global_variables.js`
```javascript
const ENVIRONMENT = "test" // Changer en test pour passer dans l'environnement de test
```

Une fois cela fait, lancer le programme en local et cliquer sur le bouton "commencer". Les couleurs seront affichées à l'écran et différentes informations sur la couleur détectée et le son joué seront disponibles dans la console.

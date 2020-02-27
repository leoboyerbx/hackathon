# La petite semaine - *site de présentation*

Ce dépot contient le code source du site proposé par notre équipe pour la petite semaine 2020 des MMI

Composition de l'équipe:

- BOYER Léo

- CRETON Vincent

- MONIER Pierre

- PICCARRETA Mateo

# Utiliser ce dépôt

## Consulter un exemple en ligne

Le site est visible à l'adresse [hackathon.dev-leoboyer.cf](https://hackathon.dev-leoboyer.cf)

Le dossier à publier sur le serveur correspond au dossier "site", rendu sur Moodle, et disponible en [release](https://github.com/leoboyerbx/hackathon/releases/tag/v1.0) (plus précisément [ce fichier](https://github.com/leoboyerbx/hackathon/releases/download/v1.0/Site_hackathon.zip)). Si vous avez besoin de modifier le site, il vous faut modifier le code source, puis compiler le tout, comme expliqué ci-dessous.

## Modifier le code source du site

Si vous avez besoin de modifier le code source du site, il faudra re-compiler. Pour cela:

- Récupérer le code du site et se placer dans le dossier

```bash
git clone https://github.com/leoboyerbx/hackathon
cd hackathon
```

Ici, vous pouvez faire les modifications dans le dossier `src/`. Le fichier HTML est `index.html`, la feuille de style est `assets/scss/app.scss` et le script est `assets/js/app.js`.

Une fois que vous avez modifié le code, il faut compiler pour obtenir des fichiers publiables.

## Compiler

Pour compiler, il est nécessaire d'avoir NodeJS et NPM installé sur son ordinateur: [https://nodejs.org/](https://nodejs.org/)

Les étapes pour compiler:

- Se placer dans le dossier du code

- Installer les dépendances:

```bash
npm install
```

- Construire le dossier à publier:

```bash
npm run build
```

Un dossier `public/` est alors créé. Il contient les fichiers nécessaires à la publication du site et se suffit à lui-même pour faire tourner le site.

### Autres commandes utiles

- Compiler en mode "dev": le programme recompile une version allégée à chaque changement de fichier:

```bash
npm run dev
```

- Lancer le serveur de développement: sert les fichiers compilés en local sur le port 9000: le site est alors accessible à l'adresse [localhost:9000]([http://localhost:9000](http://localhost:9000)

```bash
npm start
```

---



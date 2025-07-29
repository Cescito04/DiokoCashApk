# DiokoCashApk (Frontend)

Application mobile Ionic/Angular pour Dioko.

## Prérequis
- Node.js >= 14.x
- npm >= 6.x
- Ionic CLI (optionnel, recommandé)
- Accès à l'API backend (koppar)

## Installation

1. Clone le dépôt et place-toi dans le dossier `DiokoCashApk` :
   ```bash
   cd DiokoCashApk
   ```
2. Installe les dépendances :
   ```bash
   npm install
   ```

## Lancement en développement

```bash
npm start
```
Ou, si tu utilises Ionic CLI :
```bash
ionic serve
```

L'application sera accessible sur [http://localhost:4200](http://localhost:4200)

## Build pour production

```bash
npm run build
```

## Plateformes mobiles (Android/iOS)

Les dossiers `android/` et `ios/` **ne sont pas versionnés** (voir `.gitignore`).
Pour générer ces plateformes sur ta machine :

```bash
npx cap add android
npx cap add ios
npx cap sync
```

Tu pourras ensuite ouvrir le projet dans Android Studio ou Xcode pour le build natif.

## Fonctionnalités principales
- Authentification utilisateur
- Soumission de vérification d'identité (CNI + selfie)
- Transactions, conversions, factures, historique, etc.

## Vérification d'identité (KYC)
- Après connexion, si l'utilisateur n'est pas vérifié, une modale s'affiche pour soumettre la CNI et un selfie.
- Les fichiers sont envoyés au backend via `/api/submit-id-verification`.
- L'utilisateur peut ignorer la modale et la soumettre plus tard.

## Configuration de l'API
- L'URL de l'API backend est configurée dans les services Angular (ex : `auth.service.ts`, `id-verification.service.ts`).
- Par défaut : `http://localhost:8000/api`

## Dépendances principales
- Angular 13
- Ionic 6
- Capacitor

## Bonnes pratiques
- Ne pas versionner les fichiers sensibles (voir `.gitignore`)
- Toujours tester la soumission de fichiers avec des images valides

---

Pour toute question, contacte l'équipe technique Dioko. 
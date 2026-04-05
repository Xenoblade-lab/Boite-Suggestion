# Plan de réalisation — étapes par étapes (projet complet)

Guide opérationnel pour construire la **boîte à suggestions FASI** de bout en bout, aligné sur `Documentation.md`, `Plan-detaille.md` et `Structure-et-arborescence.md`. La **sécurisation** est traitée **en dernier** : d’abord faire fonctionner l’application, puis durcir et valider.

---

## Partie A — Préparation et base

### Étape A1 — Environnement et dépôt

- Installer / vérifier **Laragon** (PHP, MySQL, Apache) ou équivalent.
- Créer le **virtual host** avec document root sur le dossier `public/` (voir `Structure-et-arborescence.md`).
- Initialiser l’**arborescence MVC** : `public/`, `controllers/`, `models/`, `views/`, `router/`, `routes/`, `service/`, `includes/`, `config/`, `database/`, `storage/logs/`.
- Optionnel : `composer init` + autoload PSR-4 pour les classes.

### Étape A2 — Base de données

- Écrire `database/schema.sql` : table `suggestions` avec les champs prévus dans la documentation (`id`, `nom`, `promotion`, `type`, `message`, `date` / `created_at`) **et** champs du plan détaillé (`statut`, `updated_at`, `note_admin`, optionnel `ip_hash`).
- Prévoir une table ou un mécanisme **admin** si vous gérez plusieurs comptes (ex. `admin_users` avec mot de passe hashé) — ou un seul hash en variable d’environnement pour un MVP.
- Importer le schéma dans MySQL ; ajouter `database/seeds.sql` pour les tests.

### Étape A3 — Configuration

- Créer `config/config.php` (nom du site, environnement `local` / `production`).
- Créer `config/database.php` (ou lecture depuis `.env`) : host, base, utilisateur, mot de passe.
- Copier `.env.example` vers `.env` (hors Git) ; renseigner les identifiants BDD.
- `includes/db.php` : instance **PDO** ; `includes/bootstrap.php` : chargement config, session, autoload.

---

## Partie B — Noyau technique (sans auth admin au début si besoin)

### Étape B1 — Routeur et front controller

- Implémenter `router/Router.php` : associer **méthode HTTP + URI** à `Contrôleur@action`.
- `routes/web.php` : déclarer au minimum `GET /` → page d’accueil, `POST /soumettre` (ou équivalent) → enregistrement.
- `public/index.php` : inclure bootstrap, enregistrer les routes, dispatcher.
- `public/.htaccess` : réécriture vers `index.php` (sauf fichiers statiques `css`, `js`, `images`).

### Étape B2 — Modèle suggestion

- `models/SuggestionModel.php` : `create()`, `findAll()` avec filtres optionnels (type, dates, statut), `findById()`, `updateStatus()`, `updateNote()` — **requêtes préparées** dès le départ.

### Étape B3 — Layouts et vues publiques

- `views/layouts/header.php` et `footer.php` (titres, meta, liens CSS/JS).
- `views/public/home.php` : message PREFAC, lien charte (placeholder ou vraie page), **formulaire** (type, message, promotion, nom/contact optionnels).
- `public/css/app.css`, `public/js/app.js` : mise en page **responsive**, validation **côté client** (UX uniquement).

### Étape B4 — Contrôleur public et soumission

- `controllers/PublicController.php` : action `home` (affichage formulaire), action `store` (validation **serveur**, appel `SuggestionModel::create`, redirection vers page de **confirmation** ou message flash).
- Gérer les erreurs de validation (réaffichage du formulaire avec messages clairs).

---

## Partie C — Espace administrateur (PREFAC)

### Étape C1 — Authentification

- `service/AuthService.php` : vérification login / mot de passe, ouverture de **session**, `logout`.
- `controllers/AuthController.php` : `showLogin`, `login`, `logout`.
- `views/auth/login.php` : formulaire admin.
- **Middleware ou helper** : fonction `requireAdmin()` appelée en début de chaque action admin.

### Étape C2 — Tableau de bord et filtres

- `controllers/AdminController.php` : `index` — liste paginée ou complète des suggestions avec **filtres** (type, période, statut).
- `views/admin/dashboard.php` : tableau, liens vers le détail, formulaires de filtre (GET).

### Étape C3 — Fiche suggestion et statuts

- `AdminController` : `show` (détail par `id`), `update` (changement de **statut** : nouveau, en cours, traité, etc.).
- `views/admin/suggestion-show.php` : affichage du message, **note interne** `note_admin`, boutons / formulaire de mise à jour.
- Routes : ex. `GET /admin`, `GET /admin/suggestion/{id}`, `POST /admin/suggestion/{id}`.

### Étape C4 — Export CSV

- Action dédiée ou paramètre sur le dashboard : génération **CSV** (en-têtes, échappement des champs) pour réunion / rapport.

---

## Partie D — Finitions produit

### Étape D1 — Charte et pages annexes

- Page ou section **charte d’utilisation** (contenu validé avec le PREFAC) ; lien depuis l’accueil.
- Page **confirmation** après envoi (message rassurant, pas de fuite de données sensibles dans l’URL).

### Étape D2 — Cohérence UI

- Harmoniser couleurs / typo avec l’identité FASI si disponible ; vérifier **mobile** et contrastes de base.

### Étape D3 — Journalisation légère (optionnel avant sécurisation)

- Écriture d’erreurs applicatives dans `storage/logs/app.log` (sans y mettre de mots de passe).

### Étape D4 — Déploiement « fonctionnel »

- Transfert sur environnement de **préproduction** ou production : vhost → `public/`, BDD importée, `.env` de prod.
- Vérifier que seuls les fichiers publics sont servis et que l’admin est accessible uniquement après login.

---

## Partie E — Sécurisation du site (à faire en dernier)

Une fois les fonctionnalités stables, appliquer et **vérifier** les mesures suivantes (réf. `Plan-detaille.md` §4.2).

### E1 — Données et injection

- Passer en revue **toutes** les requêtes SQL : uniquement des **requêtes préparées** (PDO), aucune concaténation de variables utilisateur dans le SQL.
- Validation stricte des **types** (enum pour `type`, longueur max pour `message`, etc.) côté serveur.

### E2 — XSS et affichage

- **Échapper** toute donnée utilisateur affichée en HTML (`htmlspecialchars` avec encodage UTF-8) dans les vues admin et toute page affichant du contenu dynamique.
- Vérifier les en-têtes de téléchargement CSV (nom de fichier, pas d’injection dans les en-têtes HTTP).

### E3 — CSRF

- Implémenter `service/CsrfService.php` : génération de token en session, champ caché sur **formulaire public** et **tous les formulaires admin** (POST).
- Vérifier le token avant tout traitement POST sensible.

### E4 — Authentification et sessions

- Mots de passe admin stockés avec **`password_hash`** / **`password_verify`** (jamais en clair).
- Session : `session.cookie_httponly`, `session.cookie_secure` en HTTPS, régénération d’ID après login ; durée de session raisonnable.
- Limiter les tentatives de connexion (optionnel : délai ou compteur par IP/session).

### E5 — Accès et configuration

- Fichiers `.env`, `config/` non accessibles via le web (structure + `.htaccess` si besoin).
- En production : **`display_errors = Off`**, logs dans fichier ou serveur, pas de dump d’erreurs vers le navigateur.

### E6 — Transport et en-têtes

- Forcer **HTTPS** (certificat valide, redirection HTTP → HTTPS).
- En-têtes de sécurité utiles si possible : `X-Content-Type-Options`, `X-Frame-Options` ou `Content-Security-Policy` adaptée (ajustement progressif pour ne pas casser le CSS/JS).

### E7 — Anti-spam et abus

- Activer `service/RateLimiter.php` (ou équivalent) sur le **formulaire public** et éventuellement sur le **login** admin.
- Honeypot ou captcha si le spam persiste.

### E8 — Contrôle final

- Passage manuel : formulaires vides, XSS de base dans les champs texte, accès direct aux URL `/admin` sans session, anciennes sessions.
- Sauvegarde BDD avant mise en prod finale ; documenter les comptes admin et procédure de rotation des mots de passe.

---

## Ordre récapitulatif (une ligne par phase)

1. **A** — Environnement, arborescence, BDD, config.  
2. **B** — Routeur, modèle, vues publiques, soumission étudiant.  
3. **C** — Auth admin, dashboard, détail, statuts, export CSV.  
4. **D** — Charte, UI, logs optionnels, déploiement fonctionnel.  
5. **E** — **Sécurisation complète** (SQLi, XSS, CSRF, sessions, HTTPS, headers, rate limit, audit final).

---

*À cocher au fil de l’eau ; ajuster les noms de routes et de contrôleurs selon l’implémentation réelle.*

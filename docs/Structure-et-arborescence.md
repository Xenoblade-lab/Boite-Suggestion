# Structure et arborescence du projet — Boîte à suggestions FASI

Ce document décrit une **organisation de fichiers recommandée** pour une application PHP / MySQL en **architecture MVC maison** (sur le même principe que le projet de référence `docs/modele.md`) : front controller, routeur, contrôleurs, modèles, vues. À adapter si vous adoptez un framework complet (Laravel, etc.) ou un hébergeur imposant une racine `public_html`.

---

## 1. Principes

| Principe | Détail |
|----------|--------|
| **MVC** | **Modèle** = accès BDD ; **Vue** = templates PHP dans `views/` ; **Contrôleur** = orchestration HTTP dans `controllers/`. |
| **Front controller** | Une seule entrée web visible : `public/index.php` ; les URLs sont réécrites vers ce fichier (`.htaccess`). |
| **Routage** | `routes/web.php` déclare les chemins ; `router/Router.php` les résout vers un contrôleur et une action. |
| **Racine web** | Seul `public/` est exposé par Apache/Nginx ; `controllers/`, `models/`, `config/`, etc. restent hors URL directe. |
| **Configuration** | Fichiers sensibles (`config/`, `.env`) **en dehors** de la racine des vues publiques exécutables isolément. |
| **Versionnement** | Scripts SQL dans `database/` (et optionnellement `migrations/`) ; documentation dans `docs/`. |

### Rôle des couches (rappel MVC)

- **Contrôleur** : reçoit la requête, appelle le **modèle**, prépare des données, charge une **vue**.
- **Modèle** : requêtes préparées PDO, règles liées aux données (suggestion, statuts).
- **Vue** : HTML/PHP dans `views/` sans logique métier lourde.
- **Service** (`service/`) : transversal (auth, CSRF, limitation de débit) — réutilisé par plusieurs contrôleurs.

---

## 2. Arborescence complète (recommandée — MVC)

```
Boite-a-suggestion/
│
├── docs/                              # Documentation (hors exécution)
│   ├── Documentation.md
│   ├── Plan-detaille.md
│   ├── Structure-et-arborescence.md   # ce fichier
│   └── modele.md                      # Référence d’architecture (projet UPC / théologie)
│
├── config/                            # Configuration application
│   ├── config.php                     # Nom du site, environnement, constantes globales
│   └── database.php                   # Paramètres BDD (ou lecture .env)
│
├── controllers/                       # Logique métier / orchestration HTTP (C du MVC)
│   ├── PublicController.php           # Accueil, affichage formulaire, traitement envoi suggestion
│   ├── AdminController.php            # Liste, détail, mise à jour statut, export (protégé)
│   └── AuthController.php             # Connexion admin, déconnexion
│
├── models/                            # Accès base de données (M du MVC)
│   └── SuggestionModel.php            # insert, findAll, findById, updateStatus, etc.
│
├── views/                             # Templates PHP (V du MVC)
│   ├── layouts/
│   │   ├── header.php
│   │   └── footer.php
│   ├── public/
│   │   └── home.php                   # Page d’accueil + formulaire étudiant
│   ├── auth/
│   │   └── login.php                  # Formulaire connexion admin
│   └── admin/
│       ├── dashboard.php              # Tableau des suggestions (filtres)
│       └── suggestion-show.php        # Détail, statut, note interne
│
├── public/                            # DOCUMENT ROOT du serveur (seule entrée HTTP)
│   ├── index.php                      # Front controller : charge bootstrap, routeur, dispatch
│   ├── .htaccess                      # Rewrite vers index.php (sauf fichiers statiques)
│   ├── css/
│   │   └── app.css
│   ├── js/
│   │   └── app.js                     # Validation client, UX
│   └── images/                        # Logo FASI, favicon, etc.
│
├── router/                            # Système de routage
│   └── Router.php                     # Correspondance méthode + URI → contrôleur@action
│
├── routes/
│   └── web.php                        # Déclaration des routes (GET/POST)
│
├── service/                           # Services transverses (hors MVC strict)
│   ├── AuthService.php                # Session admin, vérification mot de passe
│   ├── CsrfService.php
│   └── RateLimiter.php                # Optionnel : anti-spam
│
├── includes/                          # Bootstrap, helpers, connexion PDO partagée
│   ├── bootstrap.php                  # Autoload, session, chargement config
│   ├── db.php                         # Instance PDO (équivalent pratique au modèle de référence)
│   └── helpers.php                    # Redirections, échappement HTML, flash messages
│
├── database/
│   ├── schema.sql                     # CREATE TABLE suggestions (+ utilisateurs admin si besoin)
│   └── seeds.sql                      # Données de test (dev uniquement)
│
├── migrations/                        # Optionnel : scripts SQL d’évolution (comme le modèle)
│   └── (fichiers numérotés ou datés)
│
├── storage/                           # Données applicatives hors BDD (souvent gitignore)
│   └── logs/
│       └── app.log
│
├── vendor/                            # Si Composer : dépendances (gitignore)
├── .env                               # Variables sensibles (gitignore)
├── .env.example                       # Modèle sans secrets (versionné)
├── .gitignore
└── composer.json                      # Optionnel : autoload PSR-4 (controllers, models, …)
```

---

## 3. Description détaillée par dossier

### 3.1 `public/`

- **Rôle** : point d’entrée unique (`index.php` = **front controller**), assets statiques (`css/`, `js/`, `images/`).
- **Flux** : `index.php` inclut `includes/bootstrap.php`, enregistre les routes depuis `routes/web.php`, le **Router** instancie le bon **contrôleur**.
- **Sécurité** : aucun mot de passe ni dump SQL ici.

### 3.2 `controllers/`

- **Rôle** : une classe (ou groupe de méthodes) par zone fonctionnelle — public, admin, auth.
- **Exemple** : `PublicController@home` affiche `views/public/home.php` ; `PublicController@store` valide le POST et appelle `SuggestionModel`.

### 3.3 `models/`

- **Rôle** : uniquement l’accès et la persistance des données (PDO, requêtes préparées).
- **Pas de HTML** dans les modèles.

### 3.4 `views/`

- **Rôle** : présentation ; layouts communs dans `views/layouts/`.
- **Sous-dossiers** : `public/` (étudiants), `auth/` (login), `admin/` (back-office), comme dans le modèle de référence.

### 3.5 `router/` et `routes/`

- **Rôle** : centraliser les URL (`/`, `/soumettre`, `/admin`, `/admin/suggestion/3`, etc.) et éviter des fichiers PHP multiples exposés à la racine.

### 3.6 `service/`

- **Rôle** : logique réutilisable (authentification, jetons CSRF, limitation de débit) appelée depuis les contrôleurs.

### 3.7 `includes/`

- **Rôle** : amorçage de l’application (`bootstrap.php`), connexion BDD (`db.php`), fonctions utilitaires (`helpers.php`) — aligné sur l’idée `includes/` du modèle.

### 3.8 `config/`

- **Rôle** : paramètres par environnement (Laragon vs production). Préférer variables d’environnement en prod.

### 3.9 `database/` et `migrations/`

- **Rôle** : `schema.sql` / `seeds.sql` pour l’état initial ; `migrations/` pour les évolutions incrémentales (optionnel).

### 3.10 `storage/logs/`

- **Rôle** : journaux applicatifs si besoin. Ajouter `storage/logs/*.log` au `.gitignore`.

### 3.11 `docs/`

- **Rôle** : documentation PREFAC, plan, structure ; pas d’exécution requise.

---

## 4. Fichiers racine utiles

| Fichier | Usage |
|---------|--------|
| `.gitignore` | Ignorer `.env`, `vendor/`, `storage/logs/*.log`. |
| `.env.example` | Documenter `DB_HOST`, `DB_NAME`, `DB_USER`, clés sans valeurs secrètes. |
| `composer.json` | Autoload PSR-4 pour `controllers/`, `models/`, `service/`, `router/` (namespaces cohérents). |

---

## 5. Variante « hébergement mutualisé »

Si tout doit vivre sous `public_html/` :

- Garder **`public/` comme seul sous-dossier servi** si possible (vhost → `public_html/public`).
- Sinon : placer `index.php` front controller à la racine exposée, mais déplacer **`controllers/`, `models/`, `views/`, `config/`, `includes/`** au niveau parent si l’hébergeur le permet ; à défaut, protéger ces dossiers avec `.htaccess` (`Require all denied` / équivalent Apache 2.4).

---

## 6. Correspondance Laragon (Windows)

- Racine projet : `c:\laragon\www\Boite a suggestion\`.
- Virtual host : document root = `...\Boite a suggestion\public`.
- MySQL : BDD dédiée ; identifiants dans `config/database.php` ou `.env`.

---

## 7. État actuel du dépôt (référence)

Le dépôt peut ne contenir au départ que la documentation :

```
Boite a suggestion/
└── docs/
    ├── Documentation.md
    ├── Plan-detaille.md
    ├── Structure-et-arborescence.md
    └── modele.md
```

Les dossiers `public/`, `controllers/`, `models/`, `views/`, `router/`, `routes/`, `service/`, `includes/`, `config/`, etc. sont à créer au développement selon l’arborescence ci-dessus.

---

## 8. Écart par rapport à l’ancienne proposition « src/ + templates/ »

L’ancienne structure (`src/Models`, `src/Services`, `templates/`) est **équivalente fonctionnellement** ; cette version **repousse les dossiers à la racine** (`controllers/`, `models/`, `views/`, `service/`, `includes/`) pour **coller au modèle MVC** du fichier `modele.md` et faciliter la reprise d’habitudes du projet « revue-théologie-upc ».

---

*Document à mettre à jour si vous adoptez un framework ou une arborescence imposée par l’hébergeur.*

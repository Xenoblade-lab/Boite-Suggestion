# Structure et arborescence du projet — Boîte à suggestions FASI

Ce document décrit une **organisation de fichiers recommandée** pour une application PHP / MySQL (frontend HTML/CSS/JS, espace admin, configuration hors web). À adapter si vous utilisez un framework (Laravel, etc.) ou un hébergeur imposant une racine `public_html`.

---

## 1. Principes

| Principe | Détail |
|----------|--------|
| **Racine web** | Seul un dossier `public/` (ou `www/`) est exposé par Apache/Nginx ; le reste est hors URL directe. |
| **Configuration** | Fichiers sensibles (`config/database.php`, `.env`) **en dehors** de `public/`. |
| **Séparation** | Logique PHP réutilisable dans `src/` ; vues HTML dans `public/` ou `templates/`. |
| **Versionnement** | Scripts SQL dans `database/` ; documentation dans `docs/`. |

---

## 2. Arborescence complète (recommandée)

```
Boite-a-suggestion/
│
├── docs/                              # Documentation (hors exécution)
│   ├── Documentation.md
│   ├── Plan-detaille.md
│   └── Structure-et-arborescence.md   # ce fichier
│
├── public/                            # DOCUMENT ROOT du serveur (point d’entrée HTTP)
│   ├── index.php                      # Page d’accueil + formulaire étudiant
│   ├── admin/
│   │   ├── index.php                  # Liste / tableau de bord (après auth)
│   │   ├── login.php                  # Connexion admin
│   │   ├── logout.php
│   │   └── suggestion.php             # Détail + statut + note (optionnel)
│   ├── assets/
│   │   ├── css/
│   │   │   └── app.css
│   │   ├── js/
│   │   │   └── app.js                 # Validation client, UX
│   │   └── img/                       # Logo FASI, favicon, etc.
│   └── .htaccess                      # (Apache) rewrite, deny accès fichiers sensibles si besoin
│
├── src/                               # Code PHP métier (non servi directement)
│   ├── bootstrap.php                  # Autoload simple, constantes, session
│   ├── Config/
│   │   └── Database.php               # Connexion PDO (singleton ou factory)
│   ├── Models/
│   │   └── Suggestion.php             # Accès données : insert, find, update statut
│   ├── Services/
│   │   ├── CsrfService.php
│   │   ├── RateLimiter.php            # Optionnel : anti-spam
│   │   └── AuthService.php            # Session admin, vérification mot de passe
│   └── Helpers/
│       ├── sanitize.php               # échappement HTML, etc.
│       └── response.php               # redirections, JSON si API
│
├── templates/                         # (Optionnel) fragments HTML réutilisables
│   ├── layout-header.php
│   ├── layout-footer.php
│   └── form-suggestion.php
│
├── config/                            # Configuration (gitignore si secrets)
│   ├── app.php                        # nom du site, environnement
│   └── database.php                   # host, dbname, user, pass — ou lecture .env
│
├── database/
│   ├── schema.sql                     # CREATE TABLE suggestions (+ admin si table users)
│   └── seeds.sql                      # Données de test (dev uniquement)
│
├── storage/                           # Données applicatives hors BDD (gitignore souvent)
│   └── logs/
│       └── app.log                    # Erreurs applicatives (si logger fichier)
│
├── vendor/                            # Si Composer : dépendances (gitignore)
├── .env                               # Variables sensibles (gitignore)
├── .env.example                       # Modèle sans secrets (versionné)
├── .gitignore
└── composer.json                      # Optionnel : autoload PSR-4, dépendances
```

---

## 3. Description détaillée par dossier

### 3.1 `public/`

- **Rôle** : tout ce qui est accessible via `https://votre-domaine/...`.
- **Fichiers clés** : `index.php` (formulaire public), sous-dossier `admin/` pour le back-office.
- **Sécurité** : ne pas y placer de mots de passe ; pas de dump SQL.

### 3.2 `src/`

- **Rôle** : logique métier, accès base, authentification, CSRF.
- **Avantage** : si `public/` est la racine Apache, `src/` n’est pas dans l’URL (à condition que le serveur ne mappe pas la racine au dossier parent par erreur).

### 3.3 `config/`

- **Rôle** : paramètres par environnement (local Laragon vs production).
- **Bonnes pratiques** : en production, charger depuis variables d’environnement ou fichier hors web.

### 3.4 `database/`

- **Rôle** : historique et reproductibilité du schéma (`schema.sql`), jeux de test (`seeds.sql`).
- **Usage** : import manuel ou script de déploiement.

### 3.5 `templates/` (optionnel)

- **Rôle** : éviter la duplication de `<head>`, menus, pieds de page entre `index.php` et pages admin.
- **Alternative** : inclure des partials depuis `src/` ou directement depuis `public/` selon votre convention.

### 3.6 `storage/logs/`

- **Rôle** : traces d’erreur si vous ne passez pas uniquement par les logs PHP du serveur.
- **Git** : ajouter `storage/logs/*.log` au `.gitignore`.

### 3.7 `docs/`

- **Rôle** : documentation projet (présentation PREFAC, plan, structure). Aucune exécution PHP requise ici.

---

## 4. Fichiers racine utiles

| Fichier | Usage |
|---------|--------|
| `.gitignore` | Ignorer `.env`, `vendor/`, logs, caches. |
| `.env.example` | Documenter les clés nécessaires (`DB_HOST`, `DB_NAME`, etc.) sans valeurs secrètes. |
| `composer.json` | Autoload `src/` en PSR-4 ; packages (ex. phpdotenv) si besoin. |

---

## 5. Variante « tout dans public » (non recommandée mais courante en TP)

Sur certains hébergements mutualisés, seul `public_html/` existe. Dans ce cas :

- Placer `index.php`, `admin/`, `assets/` à la racine exposée.
- Déplacer `src/`, `config/`, `database/` **au-dessus** de `public_html` si l’hébergeur le permet (structure parente), sinon protéger par `.htaccess` (`Deny from all`) sur `config/` et `src/` si ces dossiers doivent rester sous la racine web.

---

## 6. Correspondance Laragon (Windows)

- Racine projet : `c:\laragon\www\Boite a suggestion\`.
- Virtual host : pointer le **document root** vers `...\Boite a suggestion\public` (recommandé) ou renommer `public` en alias du vhost.
- Base MySQL : créer une BDD dédiée ; paramètres dans `config/database.php` ou `.env`.

---

## 7. État actuel du dépôt (référence)

Au moment de la rédaction, le projet peut ne contenir que la documentation :

```
Boite a suggestion/
└── docs/
    ├── Documentation.md
    ├── Plan-detaille.md
    └── Structure-et-arborescence.md
```

Les dossiers `public/`, `src/`, `config/`, etc. sont à créer lors du développement selon l’arborescence ci-dessus.

---

*Document à mettre à jour si vous adoptez un framework ou une arborescence imposée par l’hébergeur.*

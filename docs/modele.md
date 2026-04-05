evue-theologie-upc-html/
├── config/                 # Configuration
│   └── config.php
├── controllers/            # Logique métier
│   ├── AdminController.php
│   ├── AuthorController.php
│   ├── ReviewerController.php
│   ├── RevueController.php
│   ├── ArticleController.php
│   ├── UserController.php
│   └── ...
├── models/                 # Accès base de données
│   ├── ArticleModel.php
│   ├── UserModel.php
│   ├── ReviewModel.php
│   ├── RevueModel.php
│   ├── VolumeModel.php
│   ├── AbonnementModel.php
│   ├── PaiementModel.php
│   ├── NotificationModel.php
│   └── ...
├── views/                  # Templates PHP (design du frontend actuel)
│   ├── layouts/            # En-tête, pied de page, sidebar
│   │   ├── header.php
│   │   ├── footer.php
│   │   ├── _header.html    # Base du design actuel
│   │   └── mobile.php
│   ├── public/             # Pages publiques
│   │   ├── index.php       # Accueil (design index.html)
│   │   ├── publications.php
│   │   ├── archives.php
│   │   ├── article-details.php
│   │   ├── presentation.php
│   │   ├── comite.php
│   │   ├── contact.php
│   │   ├── faq.php
│   │   ├── politique-editoriale.php
│   │   ├── instructions-auteurs.php
│   │   ├── actualites.php
│   │   └── mentions-legales.php
│   ├── auth/               # Auth
│   │   ├── login.php
│   │   ├── register.php
│   │   └── forgot-password.php
│   ├── author/             # Espace auteur
│   │   ├── index.php
│   │   ├── abonnement.php
│   │   ├── notifications.php
│   │   └── ...
│   ├── reviewer/           # Espace évaluateur
│   │   ├── index.php
│   │   ├── evaluation.php
│   │   ├── historique.php
│   │   └── terminees.php
│   ├── admin/              # Administration
│   │   └── index.php
│   └── numero/             # Pages numéros (dynamiques)
│       └── details.php
├── public/                 # Point d'entrée web
│   ├── index.php           # Front controller
│   ├── .htaccess
│   ├── css/
│   │   └── styles.css      # Depuis frontend/css/styles.css
│   ├── js/
│   │   └── main.js         # Depuis frontend/js/main.js
│   ├── images/
│   ├── uploads/
│   └── assets/
├── router/                 # Système de routage
│   └── Router.php
├── routes/
│   ├── web.php
│   └── api.php
├── service/                # Services métier
│   ├── AuthService.php
│   └── Abonnement.php
├── includes/               # Helpers, config
│   ├── db.php
│   └── auth.php
├── frontend/               # Maquettes HTML de référence (conservées)
│   ├── index.html
│   ├── css/styles.css
│   ├── js/main.js
│   └── revue_theologie_2.sql
└── migrations/             # Scripts SQL si ajustements
```
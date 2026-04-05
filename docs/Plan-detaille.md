# Plan détaillé — Boîte à suggestions PREFAC / FASI

Document de cadrage et de mise en œuvre pour une boîte à suggestions **hybride** (physique et numérique) au service du gouvernement du PREFAC et des étudiants de la Faculté des Sciences Informatiques.

---

## 1. Vision et périmètre

**Objectif** : offrir un canal clair pour que les étudiants transmettent préoccupations, suggestions et idées d’amélioration, avec un suivi côté PREFAC.

**Parties prenantes**

- Étudiants (utilisateurs du formulaire / boîte physique)
- Bureau PREFAC (consultation, traitement, communication des suites)
- Éventuellement secrétariat ou direction pour la synthèse institutionnelle

**Livrables principaux**

- Formulaire public (site web)
- Espace de consultation et de traitement des messages
- Base de données structurée
- Dispositif physique (localisation, procédure d’ouverture)
- Campagne de communication et charte d’usage

---

## 2. Phase 0 — Cadrage (1 à 2 semaines)

| Activité | Détail |
|----------|--------|
| Atelier PREFAC | Valider les **types** de messages (ex. suggestion, problème, idée), les règles d’**anonymat** (champs optionnels), et ce qui est **hors périmètre** (ex. plaintes devant aller vers d’autres canaux officiels). |
| Charte d’utilisation | Page courte : à quoi sert la boîte, comment les messages sont traités, délais indicatifs de réponse ou de synthèse. |
| Boîte physique | Choisir **emplacement(s)**, **fréquence d’ouverture**, **responsable**, modèle de fiche papier si besoin. |
| Indicateurs | Ex. nombre de soumissions par mois, % traitées sous X jours, mini-enquête de satisfaction après quelques semaines. |

---

## 3. Phase 1 — Conception fonctionnelle

### 3.1 Côté étudiant

- Page d’accueil avec message du PREFAC et lien vers la charte.
- Formulaire : type de message, texte, promotion (optionnel), nom / contact (optionnels si anonymat souhaité).
- Message de **confirmation** après envoi (écran ; email optionnel si contact fourni).
- Interface **responsive** et accessibilité de base (libellés explicites, contrastes lisibles).

### 3.2 Côté PREFAC (administration)

- Liste des suggestions avec **filtres** (type, période, statut).
- **Statuts** proposés : nouveau, en cours, traité ; éventuellement « hors périmètre » ou archivé.
- Fiche détail avec **notes internes** (non publiées, visibles seulement côté admin).
- **Export** des données (CSV) pour réunions et rapports.

### 3.3 Modèle de données (évolution du schéma minimal)

En complément des champs `id`, `nom`, `promotion`, `type`, `message`, `date` :

| Champ (exemple) | Rôle |
|-----------------|------|
| `statut` | État du traitement (enum / valeurs contrôlées). |
| `created_at` / `updated_at` | Traçabilité temporelle. |
| `note_admin` | Commentaires internes (TEXT, nullable). |
| `ip_hash` ou clé de limitation | Optionnel : limiter le spam sans conserver l’IP en clair si la politique le demande. |

---

## 4. Phase 2 — Conception technique

### 4.1 Stack (référence documentation projet)

| Couche | Technologie | Points à décider |
|--------|-------------|------------------|
| Frontend | HTML, CSS, JavaScript | Pages séparées (public / admin) ou routage léger côté PHP. |
| Backend | PHP | Organisation MVC : `public/` (front), `controllers/`, `models/`, `views/`, `router/`, `routes/`, `service/`, `includes/`, `config/` (voir `Structure-et-arborescence.md`). |
| Base de données | MySQL | Script SQL versionné ; éventuellement migrations simples. |

### 4.2 Sécurité (prioritaire)

- **Requêtes préparées** (PDO) pour toutes les interactions SQL.
- **Validation et assainissement côté serveur** (le JavaScript client ne suffit pas).
- **Authentification** pour l’espace admin (session, mot de passe fort ; compte PREFAC unique acceptable en MVP).
- Protection **CSRF** sur le formulaire public et les actions d’administration.
- **Limitation de débit** (par IP ou session) ; honeypot ou captcha si le spam apparaît.
- **HTTPS** en production.

### 4.3 Hébergement

- Même environnement que les autres services étudiants si possible.
- Sauvegardes régulières de la base et configuration des secrets hors du dépôt public.

---

## 5. Phase 3 — Développement (ordre recommandé)

1. Schéma SQL et données de test.
2. Logique PHP : création d’une suggestion ; côté admin : liste, filtrage, mise à jour de statut, notes.
3. Page publique : formulaire, messages d’erreur clairs, confirmation.
4. Espace admin : connexion, tableau de bord, filtres, export CSV.
5. Tests manuels : champs vides, texte très long, tentatives XSS/SQLi basiques, affichage mobile.
6. Préparation production : désactiver l’affichage des erreurs PHP, vérifier droits fichiers et mots de passe.

**Durée indicative** : 2 à 4 semaines pour un MVP solide (selon disponibilité d’une personne à mi-temps).

---

## 6. Phase 4 — Déploiement et exploitation

- Check-list : HTTPS, `display_errors` désactivé, identifiants BDD robustes, permissions minimales sur les fichiers.
- **Rituels PREFAC** : qui consulte les nouvelles entrées, à quelle fréquence, comment les réponses sont communiquées (AG, affichage, réseaux).
- **Synthèse thématique** : regrouper les sujets récurrents sans violer l’anonymat lorsque promis.
- **Revue** après environ un mois : ajuster types, champs ou communication selon l’usage réel.

---

## 7. Phase 5 — Communication (en parallèle du développement)

- Affiches, annonces en cours, groupes étudiants, réseaux sociaux.
- **Message clé** : « Votre voix compte, exprimez-vous ! »
- Rappel des **délais** et de la **transparence** sur l’utilisation des contributions (sans sur-promettre).

---

## 8. Améliorations post-MVP

- Tableau de bord avec statistiques (par type, par mois).
- Page publique des « actions menées » (anonymisée / agrégée).
- Notifications email au PREFAC pour chaque nouvelle soumission.
- Modération ou signalement de contenus inappropriés si le volume ou les risques l’exigent.

---

## 9. Risques et mesures

| Risque | Mesure |
|--------|--------|
| Spam ou flood | Rate limiting, captcha ou honeypot si nécessaire |
| Contenus sensibles | Charte + orientation vers canaux officiels (harcèlement, discipline) |
| Faible participation | Campagne ciblée + preuve que les messages sont lus (retours publics) |
| Failles de sécurité | PDO préparé, auth admin, HTTPS, mises à jour |

---

## 10. Checklist synthétique

- [ ] Valider périmètre, anonymat et charte avec le PREFAC.
- [ ] Finaliser le modèle de données et les statuts.
- [ ] Implémenter le formulaire public et l’insertion sécurisée.
- [ ] Implémenter l’admin (authentification, liste, filtres, statuts, export).
- [ ] Tester sécurité, accessibilité de base et mobile.
- [ ] Déployer en HTTPS avec sauvegardes BDD.
- [ ] Lancer la communication et planifier une revue après 4 semaines.

---

## 11. Conclusion

Ce plan relie les **objectifs** du PREFAC (participation, transparence, amélioration continue) à des **jalons** concrets : cadrage, fonctionnel, technique, déploiement et communication. Il peut servir de base au rapport ou à la présentation institutionnelle, puis être mis à jour après la première période d’exploitation.

---

*Document généré pour le projet Boîte à suggestions FASI — à adapter aux dates et contraintes réelles du mandat PREFAC.*

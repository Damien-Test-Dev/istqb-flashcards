/* ISTQB Flashcards — Offline — ES5 (iOS 12 compatible) */
(function () {
  'use strict';

  var APP_VERSION = '1.0.0';

  /* ----------- Illustrations légères (SVG inline) ----------- */
  var ICONS = {
    target: svg('<circle cx="64" cy="64" r="44" fill="#EAF0FF"/><circle cx="64" cy="64" r="30" fill="#D6E2FF"/><circle cx="64" cy="64" r="16" fill="#4F7CFF"/><path d="M90 38l-9 26-10-10 19-16z" fill="#0B1220" opacity=".9"/>'),
    bug: svg('<path d="M44 44c0-12 9-22 20-22s20 10 20 22v8c0 18-10 32-20 32S44 70 44 52v-8z" fill="#4F7CFF"/><path d="M48 38l-10-10" stroke="#0B1220" stroke-width="6" stroke-linecap="round"/><path d="M80 38l10-10" stroke="#0B1220" stroke-width="6" stroke-linecap="round"/><path d="M34 58h20M74 58h20M36 74h20M72 74h20" stroke="#0B1220" stroke-width="6" stroke-linecap="round" opacity=".85"/>'),
    checklist: svg('<rect x="26" y="22" width="76" height="88" rx="14" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M40 46l6 6 12-14" stroke="#4F7CFF" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M40 66h46M40 84h46" stroke="#0B1220" stroke-width="6" stroke-linecap="round" opacity=".85"/>'),
    docs: svg('<path d="M34 24h56l16 16v74c0 6-5 10-10 10H34c-6 0-10-4-10-10V34c0-6 4-10 10-10z" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M90 24v18h18" fill="none" stroke="#4F7CFF" stroke-width="6" stroke-linejoin="round"/><path d="M38 58h52M38 76h52M38 94h38" stroke="#0B1220" stroke-width="6" stroke-linecap="round" opacity=".85"/>'),
    flow: svg('<path d="M26 46h44v34H26z" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M78 46h24v14H78z" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M78 66h24v14H78z" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M70 63h8" stroke="#4F7CFF" stroke-width="6" stroke-linecap="round"/><path d="M54 80v18h46" stroke="#0B1220" stroke-width="6" stroke-linecap="round" opacity=".85"/>'),
    shield: svg('<path d="M64 18l38 14v28c0 26-16 46-38 52C42 106 26 86 26 60V32l38-14z" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M46 62l12 12 26-30" stroke="#4F7CFF" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'),
    gears: svg('<path d="M64 38a26 26 0 1026 26A26 26 0 0064 38z" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M64 50a14 14 0 1014 14 14 14 0 00-14-14z" fill="#4F7CFF"/><path d="M64 20v14M64 94v14M20 64h14M94 64h14" stroke="#0B1220" stroke-width="6" stroke-linecap="round" opacity=".85"/>'),
    graph: svg('<path d="M28 100V28" stroke="#0B1220" stroke-width="6" stroke-linecap="round" opacity=".85"/><path d="M28 100h84" stroke="#0B1220" stroke-width="6" stroke-linecap="round" opacity=".85"/><path d="M38 86l18-22 18 10 26-34" fill="none" stroke="#4F7CFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>'),
    eye: svg('<path d="M20 64s16-28 44-28 44 28 44 28-16 28-44 28-44-28-44-28z" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><circle cx="64" cy="64" r="14" fill="#4F7CFF"/><circle cx="64" cy="64" r="6" fill="#0B1220" opacity=".85"/>'),
    layers: svg('<path d="M64 26l44 20-44 20-44-20 44-20z" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M20 70l44 20 44-20" fill="none" stroke="#4F7CFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 86l44 20 44-20" fill="none" stroke="#0B1220" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>'),
    clock: svg('<circle cx="64" cy="64" r="44" fill="#EAF0FF" stroke="#D6E2FF" stroke-width="4"/><path d="M64 64V40" stroke="#4F7CFF" stroke-width="8" stroke-linecap="round"/><path d="M64 64h20" stroke="#0B1220" stroke-width="8" stroke-linecap="round" opacity=".85"/><path d="M64 18v10M64 100v10" stroke="#0B1220" stroke-width="6" stroke-linecap="round" opacity=".45"/>')
  };

  function svg(inner) {
    return '<svg width="160" height="160" viewBox="0 0 128 128" role="img" aria-hidden="true">' + inner + '</svg>';
  }

  /* ----------- Données (8 decks — 40 cartes chacun, texte simple + mini exemple) ----------- */
  /* Format carte:
     [Titre, iconKey, Notion, Définition, Explication, Exemple] */
  var DECKS = [
    {
      id: 'd1',
      title: 'Essentiels du test',
      cards: [
        ["Pourquoi tester ?", "target", "Réduire le risque", "Tester aide à détecter des problèmes", "On limite les surprises en production", "Ex: bug critique trouvé avant release"],
        ["Test vs débogage", "flow", "Deux activités", "Tester = trouver ; Déboguer = corriger", "Souvent fait par des rôles différents", "Ex: test échoue → dev debug"],
        ["Erreur / Défaut / Défaillance", "bug", "3 niveaux", "Erreur humaine → défaut dans le code → défaillance visible", "Ça relie cause et effet", "Ex: mauvaise formule → crash"],
        ["Cause racine", "eye", "Origine du problème", "La cause profonde d’un défaut", "Utile pour éviter que ça se reproduise", "Ex: exigence floue → défauts répétés"],
        ["Qualité : QA vs QC", "shield", "Assurer vs contrôler", "QA améliore le processus ; QC vérifie le produit", "Les tests sont surtout du QC", "Ex: check process + exécuter tests"],
        ["Vérification vs validation", "checklist", "Construire juste vs bon", "Vérif: conforme specs ; Valid: répond au besoin", "On veut les deux", "Ex: conforme UI, mais pas utilisable"],
        ["Objectif : trouver des défauts", "bug", "Détecter", "Un test cherche des écarts", "Plus tôt = moins cher", "Ex: défaut détecté au sprint"],
        ["Objectif : donner confiance", "shield", "Réassurer", "Résultats de test aident la décision", "Pas une garantie totale", "Ex: OK smoke → go démo"],
        ["Objectif : prévenir", "docs", "Éviter", "Tests + revues réduisent l’introduction de défauts", "Feedback rapide", "Ex: review story avant dev"],
        ["Principe 1", "eye", "Présence ≠ absence", "Tester montre des défauts possibles", "Ne prouve pas zéro défaut", "Ex: tout vert ≠ parfait"],
        ["Principe 2", "clock", "Exhaustif impossible", "On ne peut pas tout tester", "On choisit selon risque/priorités", "Ex: 1000 combos → on priorise"],
        ["Principe 3", "clock", "Tester tôt", "Démarrer tôt améliore la qualité", "Corriger tôt coûte moins", "Ex: review exigences dès le début"],
        ["Principe 4", "graph", "Regroupement des défauts", "Beaucoup de défauts dans peu de zones", "On cible les zones “chaudes”", "Ex: module paiement très instable"],
        ["Principe 5", "layers", "Paradoxe du pesticide", "Même tests = moins de nouveaux défauts trouvés", "Il faut renouveler les tests", "Ex: ajouter nouveaux cas"],
        ["Principe 6", "docs", "Dépend du contexte", "La stratégie dépend du produit", "Ex: médical ≠ jeu mobile", "Ex: plus de tests sécurité"],
        ["Principe 7", "target", "Absence de défauts ≠ succès", "Un produit peut être “sans bug” mais inutile", "Le besoin utilisateur prime", "Ex: feature inutile, mais stable"],
        ["Niveaux d’indépendance", "layers", "Qui teste ?", "Plus indépendant = regard plus neutre", "Mais coût/communication à gérer", "Ex: dev teste puis QA valide"],
        ["Niveau : composant", "layers", "Unité", "Tester une fonction/module isolé", "Souvent automatisé", "Ex: test unitaire calcul TVA"],
        ["Niveau : intégration", "flow", "Interfaces", "Tester échanges entre composants", "On vise l’intégration correcte", "Ex: API + DB ensemble"],
        ["Niveau : système", "target", "Produit complet", "Tester le système en bout en bout", "Inclut aspects non-fonctionnels", "Ex: parcours achat complet"],
        ["Niveau : acceptation", "shield", "Valider le besoin", "Tester selon critères d’acceptation", "Décision de mise en prod", "Ex: UAT avec métier"],
        ["Type : fonctionnel", "checklist", "Comportement", "Vérifie ce que le système fait", "Basé sur exigences", "Ex: calcul remise correcte"],
        ["Type : non-fonctionnel", "graph", "Qualités", "Perf, sécu, fiabilité, UX…", "Souvent critique en prod", "Ex: réponse < 2s"],
        ["Type : structurel", "layers", "Interne", "Couvre le code/chemins", "Ex: couverture instructions", "Ex: couvrir les branches if"],
        ["Type : lié au changement", "clock", "Après modification", "On reteste ce qui a bougé", "Et ce que ça peut impacter", "Ex: patch paiement → régression"],
        ["Re-test (confirmation)", "checklist", "Vérifier la correction", "On reteste le défaut corrigé", "Même scénario, même attendu", "Ex: bug login corrigé → retest"],
        ["Test de régression", "layers", "Éviter les retours en arrière", "Vérifie que l’existant marche encore", "Souvent automatisé", "Ex: suite smoke quotidienne"],
        ["Base de test", "docs", "Source", "Exigences, stories, règles, modèles…", "On s’y réfère pour tester", "Ex: user story + AC"],
        ["Condition de test", "target", "Ce qu’on veut vérifier", "Élément testable tiré de la base", "On la transforme en cas de test", "Ex: “mot de passe invalide”"],
        ["Cas de test", "checklist", "Recette de test", "Précond + actions + attendu", "Permet d’exécuter et comparer", "Ex: login OK → accueil"],
        ["Jeu de tests", "layers", "Regroupement", "Collection de cas de test", "Par feature, risque, niveau…", "Ex: suite paiement"],
        ["Oracle de test", "eye", "Référence du “bon”", "Moyen de savoir si c’est correct", "Specs, règles, expert, calcul…", "Ex: règle TVA officielle"],
        ["Couverture", "graph", "Mesure", "Part de la base/structure couverte", "Aide à piloter la qualité", "Ex: 80% exigences couvertes"],
        ["Traçabilité", "docs", "Lien exigences ↔ tests", "Associe base, tests, défauts", "Utile en audit et suivi", "Ex: AC#3 ↔ TC-12"],
        ["Sévérité vs priorité", "bug", "Deux axes", "Sévérité = impact ; Priorité = urgence", "Décision souvent collective", "Ex: crash rare (sev haut, prio moyenne)"],
        ["Rapport de défaut", "docs", "Décrire un problème", "Contexte + étapes + attendu + obtenu", "Plus clair = plus vite corrigé", "Ex: vidéo + logs"],
        ["Processus de test", "flow", "Étapes", "Planifier → concevoir → exécuter → clôturer", "Adaptable au contexte", "Ex: sprint: plan léger + exécution"],
        ["Test exploratoire", "eye", "Apprendre en testant", "Conception et exécution en même temps", "Bon pour explorer vite", "Ex: session 30 min sur feature"],
        ["Test scripté", "checklist", "Suivre un script", "Cas détaillés et reproductibles", "Bon pour régression", "Ex: check list smoke"],
        ["Critères de sortie", "target", "Quand arrêter", "Conditions de fin (qualité/temps/risque)", "Évite “on teste sans fin”", "Ex: 0 défaut critique ouvert"]
      ]
    },

    {
      id: 'd2',
      title: 'Test & dev au quotidien',
      cards: [
        ["Cycle de dev et tests", "flow", "Adapter", "Le modèle de dev influence la stratégie", "On place les tests au bon moment", "Ex: agile → tests par sprint"],
        ["Séquentiel vs itératif", "layers", "Deux approches", "Séquentiel = phases ; Itératif = boucles", "Itératif donne feedback plus tôt", "Ex: MVP puis améliorations"],
        ["Agile : l’idée", "target", "Livrer souvent", "Petits incréments + feedback", "Tests intégrés au sprint", "Ex: story testée avant clôture"],
        ["DevOps : l’idée", "flow", "Livrer en continu", "Dev + Ops + automatisation", "Objectif: cycle rapide et fiable", "Ex: pipeline CI/CD"],
        ["CI (intégration continue)", "gears", "Assembler souvent", "Build + tests à chaque changement", "Détecte tôt les cassures", "Ex: PR → tests auto"],
        ["CD (déploiement continu)", "gears", "Déployer souvent", "Automatiser release (avec garde-fous)", "Réduit le risque par petits lots", "Ex: déploiement quotidien"],
        ["Shift-left", "clock", "Tester plus tôt", "Mettre des activités test en amont", "Revues, tests unitaires, static…", "Ex: review AC avant dev"],
        ["Shift-right", "eye", "Observer en prod", "Mesurer/monitorer après release", "Complète les tests pré-prod", "Ex: logs + alerting"],
        ["Pyramide de tests", "layers", "Répartition", "Beaucoup d’unitaires, moins d’E2E", "Plus rapide et stable", "Ex: 70% unit, 20% API, 10% UI"],
        ["Responsabilités (whole-team)", "shield", "Tout le monde aide", "Qualité = équipe entière", "Testers apportent méthode/outils", "Ex: dev + QA pair"],
        ["Testabilité", "eye", "Facilité de tester", "Logs, IDs, API, données contrôlables", "Réduit le coût des tests", "Ex: endpoint healthcheck"],
        ["Qualité des exigences", "docs", "Base solide", "Claires, testables, non ambiguës", "Sinon tests et dev souffrent", "Ex: AC concrets"],
        ["Tests statiques dans le flux", "docs", "Avant exécuter", "Revue story, revue code, lint", "Moins cher qu’un bug tardif", "Ex: PR review + linter"],
        ["Tests unitaires", "layers", "Code isolé", "Teste fonctions/méthodes", "Rapide, automatisable", "Ex: calcul frais de port"],
        ["Tests d’intégration", "flow", "Composants ensemble", "Teste interfaces et échanges", "Cible les contrats entre systèmes", "Ex: API ↔ DB"],
        ["Intégration : stratégie incrémentale", "flow", "Petit à petit", "On intègre progressivement", "Plus simple à diagnostiquer", "Ex: module A puis B"],
        ["Tests système", "target", "Système complet", "Teste le produit bout en bout", "Inclut parcours clés", "Ex: achat complet"],
        ["Tests d’acceptation (UAT)", "shield", "Côté métier", "Valide que ça répond au besoin", "Souvent basé sur critères métier", "Ex: commande conforme process"],
        ["Acceptation opérationnelle (OAT)", "shield", "Côté exploitation", "Sauvegarde, monitoring, perf…", "Vise la “prod-ready”", "Ex: test restauration backup"],
        ["Acceptation contractuelle", "docs", "Engagement", "Valide clauses contrat/SLA", "Important B2B", "Ex: dispo 99.9%"],
        ["Acceptation réglementaire", "docs", "Conformité", "Valide normes / lois", "Souvent auditée", "Ex: contraintes données perso"],
        ["Alpha / Beta", "eye", "Tests terrain", "Alpha interne, Beta avec utilisateurs", "Remonte retours réels", "Ex: beta fermée"],
        ["Maintenance : pourquoi tester", "clock", "Après mise en prod", "Changement, correction, migration…", "Risque de régression", "Ex: upgrade framework"],
        ["Analyse d’impact", "graph", "Cibler", "Identifier zones touchées", "Aide à choisir tests pertinents", "Ex: change API → tests clients"],
        ["Régression en maintenance", "layers", "Sécuriser", "Suite régression sur zones critiques", "Priorité au risque", "Ex: smoke paiement après patch"],
        ["Backlog + critères d’acceptation", "docs", "Base agile", "AC servent de mini-oracle", "Aident à écrire les tests", "Ex: AC: “message d’erreur clair”"],
        ["Definition of Done", "checklist", "Règle d’équipe", "Définit quand une story est finie", "Inclut tests + qualité", "Ex: tests pass + review OK"],
        ["Tests dans un sprint", "clock", "Continu", "Concevoir tôt, exécuter au fil", "Évite le “test à la fin”", "Ex: tester dès que dev livré"],
        ["Exploratoire en agile", "eye", "Découvrir vite", "Sessions courtes sur nouvelles features", "Bon pour feedback rapide", "Ex: 20 min exploration"],
        ["Automatisation en agile", "gears", "Stabiliser", "Régression automatisée = gain", "Mais coût de maintenance", "Ex: tests API nightly"],
        ["Environnement de test", "layers", "Plateforme", "Proche de prod si possible", "Sinon risques de faux signaux", "Ex: config similaire"],
        ["Données de test", "docs", "Carburant", "Données représentatives et contrôlées", "Inclut anonymisation si besoin", "Ex: jeu clients fictifs"],
        ["Stubs / mocks", "flow", "Simuler", "Remplacer dépendances instables", "Permet tests plus rapides", "Ex: mock service paiement"],
        ["Observabilité", "eye", "Voir ce qui se passe", "Logs, métriques, traces", "Aide debug et tests", "Ex: log correlationId"],
        ["Feedback rapide", "clock", "Boucle courte", "Plus vite on sait, mieux on corrige", "Réduit le coût global", "Ex: tests CI en 5 min"],
        ["Risque comme guide", "graph", "Prioriser", "Tester d’abord ce qui compte", "Impact + probabilité", "Ex: paiement avant thème couleur"],
        ["Niveaux dans l’agile", "layers", "Toujours là", "Unit, intégration, système, acceptation", "Mais souvent plus “en continu”", "Ex: unit daily, acceptation fin sprint"],
        ["Base de test en agile", "docs", "Plusieurs sources", "Story, AC, maquettes, règles métier", "On combine", "Ex: story + spec API"],
        ["Quand c’est offline ?", "shield", "Après 1re visite", "Le navigateur met les fichiers en cache", "Ensuite, ça marche sans réseau", "Ex: ouvrir une fois en Wi-Fi puis avion"]
      ]
    },

    {
      id: 'd3',
      title: 'Revue & test statique',
      cards: [
        ["Test statique", "docs", "Sans exécuter", "On examine des artefacts (docs, code)", "But: détecter tôt", "Ex: review story"],
        ["Pourquoi faire du statique ?", "clock", "Moins cher", "Trouver un défaut avant dev/test", "Évite rework tardif", "Ex: exigence ambiguë corrigée"],
        ["Revue : principe", "eye", "Lecture ciblée", "Des personnes examinent un livrable", "On cherche défauts/améliorations", "Ex: PR review"],
        ["Revue formelle vs informelle", "docs", "Niveau de cadre", "Informel = léger ; Formel = règles/roles", "Selon risque/contexte", "Ex: inspection pour critique"],
        ["Revue informelle", "docs", "Simple", "Pas de procédure lourde", "Rapide et fréquent", "Ex: commentaire sur doc"],
        ["Walkthrough", "flow", "Guidé par l’auteur", "L’auteur présente, l’équipe questionne", "Bon pour partager compréhension", "Ex: walkthrough use case"],
        ["Revue technique", "target", "Centrée technique", "Experts évaluent la solution", "But: solidité/risques", "Ex: archi review"],
        ["Inspection", "checklist", "Très formel", "Process défini + critères entrée/sortie", "Très efficace si bien fait", "Ex: inspection spec critique"],
        ["Rôles en revue", "layers", "Organisation", "Auteur, relecteurs, modérateur, scribe", "Rôles évitent le chaos", "Ex: un modérateur anime"],
        ["Préparation individuelle", "clock", "Étape clé", "Chaque reviewer prépare avant réunion", "Meilleure détection", "Ex: lire 30 min avec checklist"],
        ["Réunion de revue", "flow", "Synchroniser", "Partager défauts et décisions", "Pas une séance de “debug live”", "Ex: lister points et actions"],
        ["Rework", "gears", "Corriger", "L’auteur corrige les défauts trouvés", "Puis on vérifie", "Ex: mettre à jour la spec"],
        ["Suivi (follow-up)", "checklist", "Fermer la boucle", "Vérifier corrections et clôturer", "Assure que rien n’est oublié", "Ex: check issues fermées"],
        ["Critères d’entrée", "target", "Prêt à relire", "Doc stable, objectifs clairs", "Sinon revue inefficace", "Ex: version 0.1 trop mouvante"],
        ["Critères de sortie", "target", "Quand finir", "Défauts traités/acceptés", "Qualité suffisante", "Ex: 0 critique restant"],
        ["Checklist de revue", "checklist", "Aide mémoire", "Liste de points à vérifier", "Rend la revue plus régulière", "Ex: vérifier AC testables"],
        ["Défauts typiques en exigences", "bug", "Souvent", "Ambigu, incomplet, contradictoire", "Casse dev et tests", "Ex: “rapide” sans mesure"],
        ["Revue des cas de test", "checklist", "Qualité des tests", "Clairs, reproductibles, attendus précis", "Réduit faux défauts", "Ex: étapes numérotées"],
        ["Revue du code", "docs", "Fiabilité", "Détecte bugs, style, dette", "Améliore partage de connaissances", "Ex: pair review PR"],
        ["Pair programming", "layers", "Revue continue", "Deux personnes sur le même poste", "Défauts repérés tôt", "Ex: driver/navigator"],
        ["Audit (conformité)", "docs", "Vérifier conformité", "Contrôle par rapport à une norme/process", "Souvent externe ou formel", "Ex: audit livrables"],
        ["Analyse statique", "gears", "Outil", "Analyse du code sans exécuter", "Détecte patterns risqués", "Ex: variable non initialisée"],
        ["Bénéfices analyse statique", "graph", "Mesurer et prévenir", "Trouve défauts tôt + standardise", "Aide qualité globale", "Ex: réduire complexité"],
        ["Standards de code", "docs", "Règles", "Conventions pour lisibilité/sûreté", "Facile à relire", "Ex: nommage clair"],
        ["Complexité", "graph", "Indicateur", "Plus complexe = plus risqué", "Aide à cibler tests/reviews", "Ex: fonction trop longue"],
        ["Duplications", "layers", "Code copié", "Dupliqué = bug répété", "Refactor réduit risque", "Ex: même logique copiée 4 fois"],
        ["Avertissement vs erreur", "gears", "Niveaux", "Warning = suspect ; Error = problème certain", "On décide règles", "Ex: warning ignoré → bug"],
        ["Faux positifs", "eye", "Bruit", "Outil signale un souci non réel", "Il faut ajuster règles", "Ex: règle trop stricte"],
        ["Configurer des règles", "gears", "Adapter", "Choisir seuils selon le projet", "Évite l’overload", "Ex: ignorer fichier généré"],
        ["Analyse statique dans CI", "flow", "Automatiser", "Exécuter à chaque PR", "Empêche régressions de qualité", "Ex: pipeline bloque si critique"],
        ["Limite du statique", "target", "Pas tout", "Ne trouve pas tout (logique métier)", "Complément du dynamique", "Ex: bug de règle métier"],
        ["Test dynamique", "target", "Avec exécution", "On lance le code et on observe", "Complète le statique", "Ex: test E2E"],
        ["Revues “light” en agile", "clock", "Fréquentes", "Petites revues rapides", "Mieux que rare et lourd", "Ex: review AC en 5 min"],
        ["Revue sans réunion", "docs", "Asynchrone", "Commentaires outillés (PR, docs)", "Gain de temps", "Ex: reviewers commentent"],
        ["Modération : bon réflexe", "shield", "Climat sain", "Critiquer l’artefact, pas la personne", "Meilleure collaboration", "Ex: “je propose…”"],
        ["RCA après revue/test", "graph", "Apprendre", "Chercher cause racine d’un défaut", "Améliore process", "Ex: manque de checklist"],
        ["Mesures utiles", "graph", "Piloter", "Défauts trouvés, taux de rework, temps", "Aide amélioration continue", "Ex: moins de défauts en prod"],
        ["Combiner revue + analyse", "layers", "Synergie", "Outils + humain = meilleur résultat", "Plus robuste", "Ex: linter + PR review"]
      ]
    },

    {
      id: 'd4a',
      title: 'Concevoir des tests (A)',
      cards: [
        ["Technique de test", "target", "Méthode", "Approche pour choisir des tests", "But: efficacité avec effort limité", "Ex: EP pour champs formulaire"],
        ["Analyse de test", "docs", "Comprendre", "Identifier ce qu’il faut tester", "Produit des conditions de test", "Ex: “paiement refusé”"],
        ["Conception de test", "checklist", "Transformer", "Convertir conditions en cas de test", "Avec attendus et données", "Ex: TC-12: CB expirée"],
        ["Implémentation", "gears", "Préparer", "Rendre les tests exécutables", "Scripts, données, environnements", "Ex: script API + dataset"],
        ["Résultats attendus", "eye", "Oracle concret", "Décrire précisément le résultat attendu", "Réduit les faux défauts", "Ex: message exact + code 400"],
        ["Tests négatifs", "bug", "Valider les refus", "Tester entrées invalides et erreurs", "Souvent très révélateur", "Ex: champ vide → erreur claire"],
        ["Boîte noire (spécification)", "docs", "Vue externe", "On teste selon exigences, sans voir le code", "Utile pour comportement", "Ex: règles de remise"],
        ["Partition d’équivalence", "layers", "Regrouper", "Découper en classes “semblables”", "Un test par classe peut suffire", "Ex: âge 0-17, 18-64, 65+"],
        ["EP : classes valides", "layers", "Cas attendus", "Valeurs acceptées par la règle", "On couvre toutes les classes", "Ex: code postal 5 chiffres"],
        ["EP : classes invalides", "bug", "Erreurs attendues", "Valeurs rejetées", "Teste messages et robustesse", "Ex: code postal 4 chiffres"],
        ["EP : exemple simple", "checklist", "Champ quantité", "Quantité 1..99", "Classes: 1..99 / <=0 / >=100", "Ex: 0 → erreur"],
        ["Valeurs limites", "target", "Bords", "Tester juste aux limites", "Beaucoup de défauts se cachent là", "Ex: min, min+1, max-1, max"],
        ["Limites inclusives/exclusives", "target", "Règle précise", "Selon “>=” ou “>”", "Change les tests à choisir", "Ex: âge >=18"],
        ["BVA : exemple", "checklist", "Mot de passe 8..20", "Tester 7, 8, 9, 19, 20, 21", "Cible erreurs off-by-one", "Ex: 7 refusé, 8 accepté"],
        ["Table de décision", "flow", "Combinaisons", "Tester règles dépendant de conditions", "Chaque colonne = un scénario", "Ex: remise selon statut + panier"],
        ["Table : conditions / actions", "docs", "Structurer", "Lister conditions puis actions", "Clarifie la logique", "Ex: si premium alors remise"],
        ["Table : réduire les règles", "graph", "Simplifier", "Regrouper colonnes équivalentes", "Évite explosion de tests", "Ex: conditions “peu importe”"],
        ["Table : mini exemple", "flow", "Connexion", "Cond: identifiant OK ? mdp OK ?", "Actions: login / message erreur", "Ex: OK/KO → erreur"],
        ["Transition d’état", "layers", "États", "Tester selon états et transitions", "Utile si comportement dépend de l’état", "Ex: commande: brouillon → payée"],
        ["États & événements", "flow", "Déclencheurs", "Événement provoque transition", "On vérifie règles et refus", "Ex: annuler après expédition interdit"],
        ["Couverture de transitions", "graph", "Couvrir", "Tester chaque transition au moins une fois", "Réduit trous de parcours", "Ex: A→B, B→C, etc."],
        ["Transitions invalides", "bug", "Refus", "Tester ce qui ne doit pas arriver", "Souvent source de bugs", "Ex: “payer” sans panier"],
        ["Exemple état", "layers", "Compte utilisateur", "Nouveau → Actif → Suspendu", "Tester re-activation", "Ex: Suspendu + login → refus"],
        ["Cas d’usage", "docs", "Parcours utilisateur", "Tester scénarios issus des use cases", "Bon pour E2E métier", "Ex: “Passer commande”"],
        ["Flux principal", "flow", "Chemin normal", "Scénario standard sans erreur", "Couvre le cœur métier", "Ex: ajout panier → paiement → confirmation"],
        ["Flux alternatifs", "bug", "Variantes", "Chemins avec options/erreurs", "Très riches en défauts", "Ex: paiement refusé → retry"],
        ["Préconditions d’un use case", "checklist", "Contexte", "Ce qui doit être vrai avant", "Évite tests incohérents", "Ex: utilisateur connecté"],
        ["Données d’un use case", "docs", "Paramètres", "Choisir données représentatives", "Sinon test peu fiable", "Ex: panier vide vs plein"],
        ["Pairwise (tests par paires)", "layers", "Réduire combinaisons", "Couvrir toutes les paires de valeurs", "Bon pour configs multiples", "Ex: OS x navigateur x langue"],
        ["Quand utiliser pairwise", "target", "Beaucoup de paramètres", "Si interactions à 2 dominent", "Attention aux risques 3+ paramètres", "Ex: compat multi-navigateurs"],
        ["Pairwise : mini exemple", "layers", "3 paramètres", "Langue(2) x Paiement(2) x Livraison(2)", "On teste un sous-ensemble intelligent", "Ex: 6 tests au lieu de 8"],
        ["Choisir une technique", "graph", "Selon l’objectif", "Risque, type de défaut, temps", "On peut combiner", "Ex: EP + BVA sur champ"],
        ["Combiner EP + BVA", "target", "Très courant", "EP couvre classes, BVA couvre bords", "Complémentaire", "Ex: quantité + bords 1 et 99"],
        ["Traçabilité en conception", "docs", "Relier", "Associer tests aux exigences", "Facilite couverture et audit", "Ex: AC#2 ↔ TC-05"],
        ["Couverture de spécification", "graph", "Mesurer", "Part des exigences/AC couvertes", "Aide à décider la fin", "Ex: 90% AC testés"],
        ["Attendu “observable”", "eye", "Vérifiable", "Formuler un attendu qu’on peut voir/mesurer", "Sinon test flou", "Ex: “<2s” plutôt que “rapide”"],
        ["Éviter le test “fourre-tout”", "checklist", "Un objectif", "Un test = une idée principale", "Plus simple à diagnostiquer", "Ex: séparer “login KO” et “reset mdp”"],
        ["Bon format de carte", "docs", "Synthétique", "Texte court et clair", "Si trop long → une nouvelle carte", "Ex: une règle = une carte"]
      ]
    },

    {
      id: 'd4b',
      title: 'Concevoir des tests (B)',
      cards: [
        ["Boîte blanche (structure)", "layers", "Vue interne", "Tester selon la structure du code", "Utile surtout au niveau composant", "Ex: couvrir branches if"],
        ["Couverture instructions", "graph", "Mesure code", "Pourcentage d’instructions exécutées", "Indique zones non testées", "Ex: 80% statements"],
        ["Exemple instructions", "graph", "Si/else", "Un chemin peut exécuter peu de lignes", "Il faut varier entrées", "Ex: entrée invalide couvre else"],
        ["Couverture branches", "graph", "Décisions", "Chaque issue (vrai/faux) d’une décision", "Plus forte que statements", "Ex: if: true et false"],
        ["Statements vs branches", "layers", "Différence", "100% statements n’implique pas 100% branches", "Branches détecte plus de cas", "Ex: if court-circuité"],
        ["Instrumentation", "gears", "Mesurer couverture", "Outils ajoutent des compteurs", "Donne un rapport de couverture", "Ex: rapport CI"],
        ["Couverture ≠ qualité", "eye", "Attention", "Bonne couverture ne prouve pas bons tests", "On peut couvrir sans vérifier", "Ex: assertions manquantes"],
        ["Tester les exceptions", "bug", "Robustesse", "Couvrir cas d’erreur/exception", "Souvent oubliés", "Ex: division par zéro"],
        ["Technique basée expérience", "eye", "Savoir-faire", "S’appuie sur intuition et vécu", "Complète les techniques formelles", "Ex: tester zones “fragiles”"],
        ["Error guessing", "bug", "Deviner les défauts", "Liste de pièges courants", "Très efficace si bien ciblé", "Ex: champs vides, null, 0"],
        ["Heuristique : null / vide", "bug", "Cas classiques", "Tester null, vide, espaces", "Souvent crash/validation", "Ex: nom = ''"],
        ["Heuristique : formats", "bug", "Variantes", "Tester formats inattendus", "Date, email, séparateurs…", "Ex: 31/02, email sans @"],
        ["Test exploratoire", "eye", "Explorer", "Apprendre et tester en même temps", "Bon pour découverte rapide", "Ex: session 25 min"],
        ["Charter (mission)", "docs", "Cadre léger", "Objectif de la session exploratoire", "Garde focus", "Ex: “Explorer le checkout”"],
        ["Timeboxing", "clock", "Limiter", "Sessions courtes avec durée fixée", "Favorise rythme et synthèse", "Ex: 30 minutes"],
        ["Prise de notes", "docs", "Tracer", "Noter chemins, données, constats", "Facilite repro", "Ex: capture étapes + screen"],
        ["Checklist-based testing", "checklist", "Guider", "Tester avec une checklist", "Bien pour conformité/régression", "Ex: checklist smoke"],
        ["Construire une checklist", "docs", "Capitaliser", "Créer à partir retours et risques", "Évolue avec le produit", "Ex: ajouter point “cache”"],
        ["Ad hoc testing", "eye", "Sans structure", "Tester “au feeling”", "Utile parfois, mais moins traçable", "Ex: clics rapides sans notes"],
        ["Choisir technique : info dispo", "graph", "Entrées", "Selon specs, code, expérience", "On adapte", "Ex: pas de spec → exploratoire"],
        ["Choisir technique : niveau", "layers", "Où on teste", "Unit → structure ; Système → boîte noire", "Mix possible", "Ex: branch coverage en unit"],
        ["Choisir technique : risque", "graph", "Priorité", "Plus de tests là où impact est fort", "Règle pratique", "Ex: paiement avant thème"],
        ["Test data design", "docs", "Données", "Choisir données qui déclenchent cas", "Fait partie du design", "Ex: utilisateur premium"],
        ["Fixtures", "layers", "État de départ", "Préparer état/objets nécessaires", "Rend tests fiables", "Ex: seed DB avant test"],
        ["Mock / stub", "flow", "Simuler dépendances", "Remplacer services externes", "Réduit instabilité", "Ex: stub email sender"],
        ["Qualité d’un cas de test", "checklist", "Clarté", "Reproductible, attendu précis", "Facile à diagnostiquer", "Ex: étapes numérotées"],
        ["Nommer les tests", "docs", "Lisibilité", "Nom = intention du test", "Aide maintenance", "Ex: 'refuse_mdp_trop_court'"],
        ["Tests atomiques", "layers", "Un objectif", "Éviter de tester 5 choses en 1 test", "Sinon diagnostic dur", "Ex: séparer login et profil"],
        ["Ordre d’exécution", "flow", "Stratégie", "Commencer par smoke, puis plus profond", "Réduit temps perdu", "Ex: smoke avant régression"],
        ["Smoke testing", "checklist", "Vérif rapide", "Fonctions vitales OK ?", "Décide si on va plus loin", "Ex: login + page accueil"],
        ["Sanity testing", "checklist", "Vérif ciblée", "Après un petit changement", "Confirme que ça tient", "Ex: patch sur filtre recherche"],
        ["Flaky tests", "bug", "Instables", "Tests parfois rouges sans bug", "À corriger vite", "Ex: timing UI aléatoire"],
        ["Anti-pattern : assertions faibles", "eye", "Peu de valeur", "Test qui ne vérifie presque rien", "Donne faux sentiment", "Ex: juste “page chargée”"],
        ["Mesurer et ajuster", "graph", "Boucle", "Regarder résultats et améliorer la suite", "Qualité augmente", "Ex: ajouter tests sur défauts réels"],
        ["Revue des tests", "docs", "Contrôle qualité", "Faire relire cas/scripts", "Réduit erreurs de test", "Ex: review suite régression"],
        ["Couper une notion en 2 cartes", "docs", "Synthèse", "Si texte long → 2 cartes", "Zéro scroll", "Ex: technique + exemple séparés"],
        ["Image légère", "gears", "SVG", "Pictos/schémas simples", "Rapide et offline", "Ex: icône bug pour défaut"],
        ["Rester simple", "target", "Efficace", "Pas de fonctions bonus", "Juste réviser vite", "Ex: 1 tap = 1 carte"]
      ]
    },

    {
      id: 'd5a',
      title: 'Gérer les tests (A)',
      cards: [
        ["Stratégie de test", "target", "Direction", "Approche globale de test", "Alignée sur risques et contexte", "Ex: focus sécurité + perf"],
        ["Plan de test", "docs", "Organisation", "Décrit quoi/qui/quand/comment", "Support de suivi", "Ex: plan sprint + env"],
        ["Périmètre", "layers", "Ce qu’on teste", "Ce qui est inclus/exclu", "Évite malentendus", "Ex: exclure module legacy"],
        ["Objectifs", "target", "Pourquoi", "Ce que le test doit apporter", "Guide les choix", "Ex: valider paiement"],
        ["Approche", "flow", "Comment", "Niveaux, types, techniques", "Selon ressources", "Ex: EP + smoke auto"],
        ["Rôles", "layers", "Qui fait quoi", "Dev, QA, métier, ops…", "Clarifie responsabilités", "Ex: métier valide UAT"],
        ["Planning", "clock", "Quand", "Dates, jalons, dépendances", "Réduit surprises", "Ex: env prêt J-3"],
        ["Ressources", "shield", "Capacité", "Temps, outils, environnements", "Conditionne la couverture", "Ex: 1 QA pour 3 squads"],
        ["Critères d’entrée", "target", "Démarrer", "Conditions avant tester", "Réduit pertes de temps", "Ex: build stable disponible"],
        ["Critères de sortie", "target", "Finir", "Conditions de fin", "Support décision release", "Ex: 0 critique, 95% pass"],
        ["Estimation : pourquoi", "graph", "Prévoir effort", "Estimer temps/cout du test", "Aide planification", "Ex: prévoir 2 jours régression"],
        ["Estimation par expertise", "eye", "Jugement", "Basé sur expérience de l’équipe", "Rapide, mais subjectif", "Ex: “ça ressemble à feature X”"],
        ["Estimation par analogie", "layers", "Comparer", "Comparer à un projet similaire", "Plus fiable si bon historique", "Ex: feature similaire = 3j"],
        ["Estimation par métriques", "graph", "Données", "Basée sur chiffres (tests, défauts…)", "Demande historique", "Ex: 1j / 10 cas"],
        ["Facteurs d’effort", "graph", "Ce qui change tout", "Risque, complexité, qualité specs, outils", "Plus de facteurs = plus d’effort", "Ex: specs floues → plus d’exploration"],
        ["Environnement", "layers", "Pré-requis", "Préparer env et versions", "Sinon tests bloqués", "Ex: config proche prod"],
        ["Données de test", "docs", "Préparer", "Créer/masquer/charger données", "Rend tests réalistes", "Ex: dataset anonymisé"],
        ["Configuration management", "docs", "Maîtriser versions", "Suivre versions code/env/tests", "Évite incohérences", "Ex: tag release + suite tests"],
        ["Test basé sur le risque", "graph", "Prioriser", "Tester d’abord ce qui risque gros", "Impact + probabilité", "Ex: paiement avant thème"],
        ["Risque produit", "graph", "Côté produit", "Risque de défaut impactant utilisateur", "Guide priorités", "Ex: bug facturation"],
        ["Risque projet", "graph", "Côté projet", "Risque de planning/budget/ressources", "Aide gestion", "Ex: env livré en retard"],
        ["Identifier les risques", "eye", "Lister", "Brainstorming, historique, experts", "Inclure parties prenantes", "Ex: RCA défauts anciens"],
        ["Analyser les risques", "graph", "Noter", "Évaluer impact et probabilité", "Donne un classement", "Ex: matrice 1..5"],
        ["Mitiger par tests", "shield", "Réduire risque", "Plus de tests sur zones critiques", "Choix de techniques", "Ex: perf sur endpoint clé"],
        ["Prioriser les tests", "target", "Faire le tri", "Choisir tests essentiels d’abord", "Utile si temps manque", "Ex: smoke + régression critique"],
        ["Livrables de test", "docs", "Ce qu’on produit", "Plan, cas, scripts, rapports", "Trace et communication", "Ex: rapport sprint"],
        ["Documentation légère", "docs", "Pas surcharger", "Juste assez pour être utile", "Surtout en agile", "Ex: checklist + notes"],
        ["Outils : planifier", "gears", "Prévoir", "Choisir outils utiles", "Former et intégrer", "Ex: outil bugs + CI"],
        ["Automatisation : stratégie", "gears", "Cibler", "Automatiser ce qui se rejoue souvent", "Attention maintenance", "Ex: smoke nightly"],
        ["Definition of Done (qualité)", "checklist", "Règle", "Inclure tests dans DoD", "Évite dette qualité", "Ex: tests pass + review"],
        ["Mesures à prévoir", "graph", "Piloter", "Choisir métriques utiles", "Pas de vanity metrics", "Ex: tendance défauts"],
        ["Budget", "shield", "Réalité", "Coût outils + temps équipe", "Influe sur couverture", "Ex: pas de device lab → risque"],
        ["Communication", "docs", "Transparence", "Informer sur risques et avancement", "Réduit surprises", "Ex: point hebdo"],
        ["Parties prenantes", "layers", "Qui décide", "Métier, dev, ops, sécurité…", "Chacun a des attentes", "Ex: sécurité exige tests dédiés"],
        ["Préparer la sortie", "target", "Release ready", "Aligner critères sortie + risques restants", "Décision explicite", "Ex: go/no-go"],
        ["Adapter le plan", "flow", "Vivant", "Le plan change selon retours", "Normal en agile", "Ex: ajouter tests après incident"],
        ["Zéro scroll = micro-cards", "docs", "Format", "Si trop long → découper", "Meilleure mémorisation", "Ex: 1 technique = 2 cartes"],
        ["Retour Home", "target", "Fin de deck", "Dernière carte → tap suivant = Home", "Simple et direct", "Ex: fin session → accueil"]
      ]
    },

    {
      id: 'd5b',
      title: 'Gérer les tests (B)',
      cards: [
        ["Suivi (monitoring)", "graph", "Observer", "Mesurer avancement vs plan", "Détecter dérives tôt", "Ex: retard sur régression"],
        ["Pilotage (control)", "target", "Agir", "Décider ajustements", "Prioriser, re-planifier, escalader", "Ex: réduire périmètre tests"],
        ["Indicateurs simples", "graph", "Pratiques", "Tests exécutés, pass/fail, bloqués", "Lisible par tous", "Ex: 120/200 exécutés"],
        ["Tendance des défauts", "graph", "Signal", "Courbe défauts ouverts/fermés", "Aide décision release", "Ex: critiques stables = bon signe"],
        ["Bloquants", "bug", "Stop", "Problèmes empêchant tester", "À traiter en priorité", "Ex: env KO"],
        ["Rapport de test", "docs", "Communiquer", "Résultats, risques restants, recommandation", "Support go/no-go", "Ex: rapport fin sprint"],
        ["Rapport de synthèse", "docs", "Vue globale", "Bilan final d’une campagne", "Inclut couverture et incidents", "Ex: test summary report"],
        ["Gestion des incidents/défauts", "bug", "Process", "Créer, qualifier, suivre", "Évite pertes et doublons", "Ex: ticket avec étapes"],
        ["Contenu d’un ticket", "docs", "Clarté", "Étapes, attendu/obtenu, env, preuves", "Accélère correction", "Ex: screenshot + logs"],
        ["Cycle de vie défaut", "flow", "États", "Nouveau → assigné → corrigé → retest → clos", "Peut varier selon l’outil", "Ex: reopen si encore présent"],
        ["Triage", "layers", "Décider", "Priorité, sévérité, responsable", "Alignement équipe", "Ex: triage quotidien"],
        ["Sévérité", "bug", "Impact", "Effet sur le système/utilisateur", "Mesure la gravité", "Ex: crash = sévère"],
        ["Priorité", "target", "Urgence", "Ordre de traitement", "Dépend du timing business", "Ex: bug mineur mais avant démo"],
        ["Re-test", "checklist", "Vérifier fix", "Retester le défaut corrigé", "Même scénario", "Ex: bug login corrigé"],
        ["Régression après fix", "layers", "Sécuriser", "Vérifier effets de bord", "Cible zones proches", "Ex: fix auth → tests profil"],
        ["Dette de test", "docs", "Ce qui manque", "Tests non faits/à automatiser", "À suivre comme une dette", "Ex: pas de tests perf"],
        ["Gestion du changement", "clock", "Impact", "Nouvelles exigences = nouveaux tests", "Risque de dérive", "Ex: story modifiée"],
        ["Analyse d’impact (tests)", "graph", "Cibler", "Quels tests ré-exécuter ?", "Gagner du temps", "Ex: change API → tests clients"],
        ["Traçabilité en suivi", "docs", "Relier", "Exigences ↔ tests ↔ défauts", "Facilite audits", "Ex: matrice traceability"],
        ["Configuration des tests", "docs", "Maîtriser", "Versionner scripts, données, env", "Évite “ça marche chez moi”", "Ex: tag suite tests"],
        ["Environnement instable", "bug", "Faux signaux", "Instabilité = tests non fiables", "À traiter rapidement", "Ex: DB reset aléatoire"],
        ["Données sales", "bug", "Piège", "Mauvaises données → mauvais résultats", "Données doivent être contrôlées", "Ex: compte déjà existant"],
        ["Stop criteria", "target", "Arrêter", "Quand les risques sont trop élevés", "Ou blocage majeur", "Ex: trop de critiques ouverts"],
        ["Clôture des tests", "checklist", "Finir proprement", "Bilan, archivage, leçons apprises", "Amélioration continue", "Ex: rétro QA"],
        ["Leçons apprises", "graph", "Améliorer", "Ce qui a marché/pas marché", "Actionnable", "Ex: ajouter checklist review"],
        ["Archivage", "docs", "Garder", "Conserver plans, scripts, rapports", "Utile pour audits et futur", "Ex: release 1.2 dossier"],
        ["Métriques : prudence", "eye", "Interpréter", "Un chiffre seul peut tromper", "Toujours contexte", "Ex: moins de défauts ≠ mieux"],
        ["Défaut “aging”", "clock", "Vieillissement", "Tickets ouverts trop longtemps", "Signale un problème de flux", "Ex: bug critique 30 jours"],
        ["Défaut “leakage”", "bug", "Fuite en prod", "Défauts trouvés après release", "Alimente RCA", "Ex: incident client"],
        ["Tableau de bord", "graph", "Visibilité", "Vue simple pour stakeholders", "Support décisions", "Ex: 3 KPI clés"],
        ["Communication des risques", "shield", "Clair", "Dire ce qui reste risqué", "Pas juste “tout vert”", "Ex: perf non testée"],
        ["Externalisation", "layers", "Coordination", "Aligner attentes et livrables", "Risque communication", "Ex: specs + format défauts"],
        ["Multi-sites", "layers", "Collaboration", "Décalage horaire = besoin d’écrit", "Standardiser", "Ex: template ticket"],
        ["Amélioration continue", "graph", "Boucle", "On adapte process et tests", "Petit à petit", "Ex: automatiser smoke"],
        ["Dernière carte", "target", "Comportement", "La dernière s’affiche normalement", "Tap suivant → retour Home", "Ex: fin deck"],
        ["Pas de sauvegarde de progrès", "shield", "Choix", "On ne reprend pas où on s’est arrêté", "Chaque session est neuve", "Ex: ordre aléatoire à chaque fois"],
        ["Aléatoire sans répétition", "layers", "Session", "Mélange + chaque carte une fois", "Simple pour révision", "Ex: toutes les cartes vues 1x"],
        ["Simple et rapide", "target", "Focus", "Pas d’options bonus", "Réviser sans friction", "Ex: choisir deck, tap, fini"]
      ]
    },

    {
      id: 'd6',
      title: 'Outils & automatisation',
      cards: [
        ["Pourquoi des outils ?", "gears", "Accélérer", "Automatiser et structurer", "Gagner temps et fiabilité", "Ex: tests CI"],
        ["Bénéfices des outils", "graph", "Valeur", "Vitesse, répétabilité, reporting", "Moins d’erreurs humaines", "Ex: suite régression auto"],
        ["Risques des outils", "bug", "Pièges", "Coût, maintenance, faux positifs", "Sans discipline → dette", "Ex: scripts UI cassants"],
        ["Catégories d’outils", "layers", "Panorama", "Gestion, suivi défauts, CI, autom, statique…", "Choisir selon besoin", "Ex: outil de tickets"],
        ["Gestion de tests", "docs", "Organiser", "Plan, exécution, résultats", "Centralise la campagne", "Ex: run + reporting"],
        ["Suivi des défauts", "bug", "Tracer", "Créer et suivre tickets", "Workflow et priorisation", "Ex: triage via board"],
        ["CI/CD", "flow", "Pipeline", "Automatise build + tests", "Feedback rapide", "Ex: push → tests"],
        ["Frameworks unitaires", "layers", "Base", "Exécuter tests unitaires", "Rapides et nombreux", "Ex: tests fonctions"],
        ["Automatisation API", "gears", "Stable", "Tester services via HTTP", "Souvent plus stable que UI", "Ex: test endpoint /login"],
        ["Automatisation UI", "eye", "E2E", "Tester parcours utilisateur", "Plus fragile et lent", "Ex: checkout via navigateur"],
        ["Tests de performance", "graph", "Mesurer", "Charge, latence, stabilité", "Important en prod", "Ex: 200 req/s"],
        ["Tests de sécurité", "shield", "Réduire risques", "Vulnérabilités et mauvaises configs", "Souvent outillés", "Ex: scan dépendances"],
        ["Analyse statique", "gears", "Sans exécuter", "Détecter problèmes de code", "Style, bugs, sécu", "Ex: SAST"],
        ["Couverture via outils", "graph", "Mesurer", "Rapports statements/branches", "Aide à cibler tests", "Ex: module à 20%"],
        ["Outils de données de test", "docs", "Données", "Générer, masquer, charger", "Rend tests réalistes", "Ex: anonymiser"],
        ["Virtualisation / mocks", "flow", "Simuler", "Remplacer systèmes externes", "Réduit dépendances", "Ex: sandbox paiement"],
        ["Monitoring prod", "eye", "Observer", "Logs, métriques, alertes", "Complète les tests", "Ex: alerte 500 spikes"],
        ["Choisir un outil", "target", "Critères", "Besoins, compatibilité, coût, support", "Ne pas choisir “au hasard”", "Ex: outil intégré à CI"],
        ["Évaluation (POC)", "eye", "Tester avant d’acheter", "Essai court sur un cas réel", "Évite mauvais choix", "Ex: POC 2 semaines"],
        ["Pilote", "flow", "Déployer progressivement", "Commencer petit", "Apprendre puis étendre", "Ex: 1 équipe pilote"],
        ["Coût total (TCO)", "graph", "Au-delà du prix", "Licence + maintenance + formation", "Souvent sous-estimé", "Ex: 1j/sem de maintenance"],
        ["ROI", "graph", "Retour", "Temps gagné vs coût", "Mesurer sur la durée", "Ex: régression auto économise 2j"],
        ["Formation", "docs", "Adoption", "Sans formation → outil mal utilisé", "Prévoir onboarding", "Ex: atelier 2h"],
        ["Intégration", "flow", "Chaîne", "Connecter outils (CI, tickets, reporting)", "Fluidifie le flux", "Ex: ticket auto créé"],
        ["Maintenance des scripts", "gears", "Inévitable", "Scripts doivent évoluer", "Sinon ils meurent", "Ex: UI change → update tests"],
        ["Tests instables (flaky)", "bug", "À éviter", "Instabilité ruine la confiance", "À traiter en priorité", "Ex: waits non maîtrisés"],
        ["Bonne cible d’automatisation", "target", "Rejouable", "Régression fréquente, stable, critique", "Pas tout automatiser", "Ex: smoke quotidien"],
        ["Mauvaise cible", "eye", "Fragile", "Fonctionnalité volatile ou exploratoire", "Mieux en manuel", "Ex: protos UI changeants"],
        ["Rapports automatiques", "docs", "Visibilité", "Dashboards et historiques", "Aide décision", "Ex: tendances CI"],
        ["Gouvernance des outils", "shield", "Règles", "Qui administre ? quelles règles ?", "Évite chaos", "Ex: règles SAST"],
        ["Sécurité des accès", "shield", "Contrôler", "Droits et secrets", "Éviter fuite de données", "Ex: tokens CI"],
        ["Open source vs commercial", "layers", "Choix", "Coût vs support/feature", "Selon contexte", "Ex: OSS ok si équipe solide"],
        ["Compatibilité", "layers", "Écosystème", "L’outil doit marcher avec ton stack", "Sinon friction", "Ex: support navigateur"],
        ["Mises à jour", "clock", "Évoluer", "Mettre à jour sans casser", "Gérer versions", "Ex: pin version puis upgrade"],
        ["Checklist de sélection", "checklist", "Simple", "Besoins, essais, coûts, support", "Décision rationnelle", "Ex: grille comparatif"],
        ["Automatisation ≠ remplacer le test", "eye", "Complément", "Automatise répétable", "Humain garde exploration/risque", "Ex: exploratoire + CI"],
        ["Offline et outils", "shield", "Contrainte", "Ici: app offline après 1re visite", "Pas de dépendances externes", "Ex: tout embarqué"],
        ["Focus révision", "target", "But", "Rester simple et rapide", "Une carte = une idée", "Ex: réviser n’importe où"]
      ]
    }
  ];

  /* ----------- DOM ----------- */
  var $ = function (id) { return document.getElementById(id); };

  var screenHome = $('screenHome');
  var screenDeck = $('screenDeck');
  var deckGrid = $('deckGrid');
  var btnHome = $('btnHome');
  var deckTitle = $('deckTitle');
  var progress = $('progress');
  var card = $('card');
  var cardTitle = $('cardTitle');
  var cardImage = $('cardImage');
  var cardBody = $('cardBody');
  var netStatus = $('netStatus');
  var ver = $('ver');
  ver.textContent = APP_VERSION;

  /* ----------- État ----------- */
  var state = {
    mode: 'home',
    deck: null,
    order: null,
    idx: 0
  };

  /* ----------- Utils ----------- */
  function shuffle(array) {
    // Fisher-Yates
    var i = array.length - 1;
    while (i > 0) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
      i--;
    }
    return array;
  }

  function setScreen(mode) {
    state.mode = mode;
    if (mode === 'home') {
      screenHome.className = 'screen screen--active';
      screenDeck.className = 'screen';
      document.body.className = ''; // remove compact classes
    } else {
      screenHome.className = 'screen';
      screenDeck.className = 'screen screen--active';
    }
  }

  function formatCardBody(c) {
    // c: [title, icon, notion, definition, explanation, example]
    var lines = [];
    lines.push('Notion : ' + c[2]);
    lines.push('Définition : ' + c[3]);
    lines.push('Explication : ' + c[4]);
    lines.push('Exemple : ' + c[5]);
    return lines.join('\n');
  }

  function applyNoScrollSafety() {
    // Si ça déborde, on compacte (sans scroll)
    document.body.className = '';
    // 2 passes max
    var tries = 0;
    while (tries < 2) {
      var overflow = (cardBody.scrollHeight > cardBody.clientHeight + 2);
      if (!overflow) { return; }
      if (tries === 0) document.body.className = 'compact';
      if (tries === 1) document.body.className = 'ultra';
      tries++;
    }
  }

  /* ----------- Rendering ----------- */
  function renderHome() {
    var html = '';
    for (var i = 0; i < DECKS.length; i++) {
      var d = DECKS[i];
      html += '<div class="deckTile" role="listitem" tabindex="0" data-deck="' + d.id + '">';
      html += '  <div class="deckTile__title">' + escapeHtml(d.title) + '</div>';
      html += '  <div class="deckTile__meta">';
      html += '    <span class="badge">' + d.cards.length + ' cartes</span>';
      html += '    <span aria-hidden="true">▶</span>';
      html += '  </div>';
      html += '</div>';
    }
    deckGrid.innerHTML = html;
  }

  function renderCard() {
    var d = state.deck;
    var total = d.cards.length;

    // idx points into order
    if (state.idx >= total) {
      // Fin: la dernière a déjà été vue, donc retour Home
      goHome();
      return;
    }

    var cardIndex = state.order[state.idx];
    var c = d.cards[cardIndex];

    deckTitle.textContent = d.title;
    progress.textContent = (state.idx + 1) + ' / ' + total;

    cardTitle.textContent = c[0];
    cardImage.innerHTML = ICONS[c[1]] || ICONS.docs;
    cardBody.textContent = formatCardBody(c);

    // Safety no-scroll
    setTimeout(applyNoScrollSafety, 0);
  }

  /* ----------- Navigation ----------- */
  function startDeck(deckId) {
    var d = null;
    for (var i = 0; i < DECKS.length; i++) {
      if (DECKS[i].id === deckId) { d = DECKS[i]; break; }
    }
    if (!d) return;

    state.deck = d;
    state.idx = 0;

    // ordre aléatoire sans répétition
    var order = [];
    for (var k = 0; k < d.cards.length; k++) order.push(k);
    state.order = shuffle(order);

    setScreen('deck');
    renderCard();
  }

  function nextCard() {
    if (state.mode !== 'deck') return;
    state.idx++;
    renderCard();
  }

  function goHome() {
    state.deck = null;
    state.order = null;
    state.idx = 0;
    setScreen('home');
  }

  /* ----------- Tap/clic propre iPad/PC (évite double trigger) ----------- */
  var lastTouch = 0;

  function onCardTap(e) {
    // si touch récent, ignorer click suivant
    if (e && e.type === 'click') {
      var now = Date.now();
      if (now - lastTouch < 650) return;
    }
    nextCard();
  }

  function onCardTouchEnd(e) {
    lastTouch = Date.now();
    if (e && e.preventDefault) e.preventDefault();
    onCardTap(e);
  }

  function onDeckTileActivate(el) {
    var id = el.getAttribute('data-deck');
    startDeck(id);
  }

  /* ----------- Sécurité HTML (pour titres deck) ----------- */
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ----------- Online/offline status ----------- */
  function updateNetStatus() {
    var online = navigator.onLine;
    netStatus.textContent = online ? 'En ligne (cache en cours si 1re visite)' : 'Hors ligne (offline)';
  }

  /* ----------- Events ----------- */
  function bindEvents() {
    // Home tiles
    deckGrid.addEventListener('click', function (e) {
      var t = e.target;
      while (t && t !== deckGrid && !t.getAttribute('data-deck')) t = t.parentNode;
      if (t && t.getAttribute && t.getAttribute('data-deck')) onDeckTileActivate(t);
    });

    deckGrid.addEventListener('keydown', function (e) {
      if (e.keyCode !== 13 && e.keyCode !== 32) return;
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute('data-deck')) {
        e.preventDefault();
        onDeckTileActivate(t);
      }
    });

    // Deck: Home button
    btnHome.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      goHome();
    });
    btnHome.addEventListener('touchend', function (e) {
      lastTouch = Date.now();
      e.preventDefault();
      e.stopPropagation();
      goHome();
    });

    // Deck: card tap/clic
    card.addEventListener('click', onCardTap);
    card.addEventListener('touchend', onCardTouchEnd);

    // clavier (PC)
    card.addEventListener('keydown', function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        nextCard();
      }
    });

    window.addEventListener('online', updateNetStatus);
    window.addEventListener('offline', updateNetStatus);
  }

  /* ----------- Service Worker (offline) ----------- */
  function registerSW() {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('./sw.js').catch(function () {
      // silencieux
    });
  }

  /* ----------- Init ----------- */
  function init() {
    renderHome();
    bindEvents();
    updateNetStatus();
    registerSW();
    setScreen('home');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

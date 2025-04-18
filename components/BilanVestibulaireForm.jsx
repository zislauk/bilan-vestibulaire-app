
'use client';

import { useState } from "react";

function Field({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <input className="border rounded p-2 w-full" name={name} value={value} onChange={onChange} />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>
      <textarea className="border rounded p-2 w-full" rows="3" name={name} value={value} onChange={onChange}></textarea>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="border rounded p-4 mb-6 shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function BilanVestibulaireForm() {
  const [form, setForm] = useState({
    nom: "", prenom: "", dateNaissance: "", profession: "", medecin: "", antecedents: "",
    motif: "", dhi: "", posturo: "", conclusion: "", migraine: "", cephalees: "",
    symptomesAssocies: "", facteurDeclenchant: "", dureeVertige: "", troublesAuditifs: "",
    poursuite: "", saccade: "", convergence: "", skew: "", gazeNystagmus: "",
    nystagmusSpontane: "", sensNystagmus: "", classification: "", vibrationOsseuse: "", headShaking: "",
    headImpulse: "", fixation: "", stabilisationDroite: "", stabilisationGauche: "",
    vectionDroite: "", vectionGauche: "", vppbLatD: "", vppbLatG: "", vppbPostD: "", vppbPostG: "",
    fukuda: "", romberg: "", vvs: "", irm: "", peo: "", vhit: "", calorique: "", audiogramme: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generateChatGPTPrompt = () => {
    const summary = Object.entries(form)
      .map(([key, value]) => value ? `- ${key} : ${value}` : "")
      .filter(Boolean)
      .join("\n");

    const prompt = `Ce document contient les données brutes d’un bilan vestibulaire.
Je souhaite que tu les reformules sous forme d’un compte rendu clinique détaillé, structuré, professionnel, adapté à la lecture par un médecin prescripteur (généraliste, ORL, neurologue ou autre spécialiste).

Merci de structurer le document selon les sections suivantes, si les données le permettent :
  • Motif de consultation
  • Anamnèse (contexte, antécédents, signes fonctionnels, évolutivité, facteurs déclenchants)
  • Évaluation clinique (bilan neurologique, oculomoteur, postural, locomoteur…)
  • Explorations vestibulaires (Dix-Hallpike, Head Impulse Test, VHIT, Fukuda, Romberg, etc.)
  • Analyse clinique / hypothèse diagnostique fonctionnelle
  • Orientations thérapeutiques proposées / prise en charge envisagée
  • Compte rendu de bilan (synthèse finale, style lettre de liaison)

Si une analyse posturographique ou un test réalisé en réalité virtuelle est mentionné, merci d’en intégrer les résultats et leur interprétation clinique dans la section appropriée.

Adopte un ton neutre, clinique et rigoureux, sans simplification excessive. Utilise un vocabulaire médical adapté, si les données le permettent.

Termine toujours le document par la signature suivante :
Loïc Taureau – Masseur-Kinésithérapeute
Diplômé d'etat, DU de rééducation vestibulaire

Enfin, renvoie-moi ce texte sous forme d’un fichier Word (.docx) bien formaté, prêt à être ouvert directement dans Apple Pages.

Le fichier Word (.docx) doit être directement exploitable dans Apple Pages, avec une mise en page propre et cohérente.

Pour information, voici la signification des abréviations utilisées dans le texte :
  • AVD : Acuité Visuelle Dynamique
  • RVO : Réflexe Vestibulo-Oculaire
  • VVS : Verticale Visuelle Subjective
  • HVZ : Horizontale Visuelle Subjective
  • VPPB : Vertige Positionnel Paroxystique Bénin
  • HIT : Head Impulse Test
  • VHIT : Vidéo Head Impulse Test
  • DHI : Dizziness handicap inventory

Consignes de présentation du document :
  • Le document doit être aéré, avec des espaces suffisants entre les sections.
  • Les titres de chaque section doivent être mis en valeur en bleu/gris sobre, pour une meilleure lisibilité.
  • Ne pas répéter l’en-tête sur chaque page.
  • Ajouter un encadré discret en haut de la première page contenant les coordonnées professionnelles suivantes :
Loïc Taureau – Masseur-Kinésithérapeute
Diplômé d’État, DU de rééducation vestibulaire (Paris Sorbonne)
11 place Charles Moulin, 28300 Saint-Prest
Tél : 02 37 99 16 96 | Port : 06 32 44 16 95
Mail : loic.taureaumk@gmail.com
N° Adeli : 287008627 | N° RPPS : 10005974372

Voici les données du bilan à intégrer :
${summary}`;

    navigator.clipboard.writeText(prompt);
    alert("Prompt copié dans le presse-papiers !");
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <div className="text-center">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={generateChatGPTPrompt}
        >
          📋 Copier le prompt pour ChatGPT
        </button>
      </div>

      <Section title="Informations Patient">
        <Field label="Nom" name="nom" value={form.nom} onChange={handleChange} />
        <Field label="Prénom" name="prenom" value={form.prenom} onChange={handleChange} />
        <Field label="Date de naissance" name="dateNaissance" value={form.dateNaissance} onChange={handleChange} />
        <Field label="Profession / Loisir" name="profession" value={form.profession} onChange={handleChange} />
        <Field label="Médecin traitant" name="medecin" value={form.medecin} onChange={handleChange} />
        <TextAreaField label="Antécédents médicaux" name="antecedents" value={form.antecedents} onChange={handleChange} />
      </Section>

      <Section title="Motif de consultation">
        <TextAreaField label="Motif" name="motif" value={form.motif} onChange={handleChange} />
      </Section>

      <Section title="Symptômes">
        <Field label="Migraineux connu / Diagnostiqué" name="migraine" value={form.migraine} onChange={handleChange} />
        <Field label="Céphalées associées" name="cephalees" value={form.cephalees} onChange={handleChange} />
        <Field label="Symptômes associés" name="symptomesAssocies" value={form.symptomesAssocies} onChange={handleChange} />
        <Field label="Facteur déclenchant le vertige" name="facteurDeclenchant" value={form.facteurDeclenchant} onChange={handleChange} />
        <Field label="Durée du vertige" name="dureeVertige" value={form.dureeVertige} onChange={handleChange} />
        <Field label="Troubles auditifs" name="troublesAuditifs" value={form.troublesAuditifs} onChange={handleChange} />
      </Section>

      <Section title="Examen neurologique oculomoteur">
        <Field label="Poursuite" name="poursuite" value={form.poursuite} onChange={handleChange} />
        <Field label="Saccade" name="saccade" value={form.saccade} onChange={handleChange} />
        <Field label="Convergence" name="convergence" value={form.convergence} onChange={handleChange} />
        <Field label="Skew deviation" name="skew" value={form.skew} onChange={handleChange} />
        <Field label="Gaze Nystagmus" name="gazeNystagmus" value={form.gazeNystagmus} onChange={handleChange} />
      </Section>

      <Section title="Examen labyrinthique">
        <Field label="Nystagmus spontané" name="nystagmusSpontane" value={form.nystagmusSpontane} onChange={handleChange} />
        <Field label="Sens du nystagmus" name="sensNystagmus" value={form.sensNystagmus} onChange={handleChange} />
        <Field label="Classification" name="classification" value={form.classification} onChange={handleChange} />
        <Field label="Test de vibration osseux (100 Hz)" name="vibrationOsseuse" value={form.vibrationOsseuse} onChange={handleChange} />
        <Field label="Head Shaking Test" name="headShaking" value={form.headShaking} onChange={handleChange} />
        <Field label="Head Impulse Test" name="headImpulse" value={form.headImpulse} onChange={handleChange} />
        <Field label="Indice de fixation" name="fixation" value={form.fixation} onChange={handleChange} />
        <Field label="Temps stabilisation post rotation droite" name="stabilisationDroite" value={form.stabilisationDroite} onChange={handleChange} />
        <Field label="Temps stabilisation post rotation gauche" name="stabilisationGauche" value={form.stabilisationGauche} onChange={handleChange} />
        <Field label="Temps vection post rotation droite" name="vectionDroite" value={form.vectionDroite} onChange={handleChange} />
        <Field label="Temps vection post rotation gauche" name="vectionGauche" value={form.vectionGauche} onChange={handleChange} />
      </Section>

      <Section title="Tests de VPPB">
        <Field label="Latéral D" name="vppbLatD" value={form.vppbLatD} onChange={handleChange} />
        <Field label="Latéral G" name="vppbLatG" value={form.vppbLatG} onChange={handleChange} />
        <Field label="Post D" name="vppbPostD" value={form.vppbPostD} onChange={handleChange} />
        <Field label="Post G" name="vppbPostG" value={form.vppbPostG} onChange={handleChange} />
      </Section>

      <Section title="Tests posturaux">
        <Field label="Fukuda" name="fukuda" value={form.fukuda} onChange={handleChange} />
        <Field label="Romberg" name="romberg" value={form.romberg} onChange={handleChange} />
        <Field label="VVS" name="vvs" value={form.vvs} onChange={handleChange} />
      </Section>

      <Section title="Examens Complémentaires">
        <Field label="IRM" name="irm" value={form.irm} onChange={handleChange} />
        <Field label="PEO" name="peo" value={form.peo} onChange={handleChange} />
        <Field label="VHIT" name="vhit" value={form.vhit} onChange={handleChange} />
        <Field label="Calorique" name="calorique" value={form.calorique} onChange={handleChange} />
        <Field label="Audiogramme" name="audiogramme" value={form.audiogramme} onChange={handleChange} />
      </Section>

      <Section title="Score DHI">
        <Field label="Score total / 100" name="dhi" value={form.dhi} onChange={handleChange} />
      </Section>

      <Section title="Posturographie VR">
        <TextAreaField label="Observations posturographie" name="posturo" value={form.posturo} onChange={handleChange} />
      </Section>

      <Section title="Conclusion">
        <TextAreaField label="Conclusion clinique" name="conclusion" value={form.conclusion} onChange={handleChange} />
      </Section>
    </div>
  );
}

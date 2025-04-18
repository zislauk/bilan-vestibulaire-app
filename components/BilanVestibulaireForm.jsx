
"use client";

import { useState } from "react";

export default function BilanVestibulaireForm() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    naissance: "",
    profession: "",
    medecin: "",
    antecedents: "",
    motif: "",
    contexte: "",
    duree: "",
    facteurs: "",
    evolution: "",
    signes: "",
    neuro: "",
    oculomoteur: "",
    romberg: "",
    fukuda: "",
    hit: "",
    vhit: "",
    dht: "",
    vvs: "",
    avd: "",
    dhi: "",
    posturo: "",
    interpretation: "",
    conclusion: "",
  });

  const prompt = `Ce document contient les données brutes d’un bilan vestibulaire.
Je souhaite que tu les reformules sous forme d’un compte rendu clinique détaillé, structuré, professionnel, adapté à la lecture par un médecin prescripteur.

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

Voici les données :\n\n${JSON.stringify(form, null, 2)}`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    alert("Prompt copié dans le presse-papier !");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderInput = (label, name, textarea = false) => (
    <div>
      <label><strong>{label}</strong></label>
      {textarea ? (
        <textarea
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="border w-full p-2 mb-4"
        />
      ) : (
        <input
          type="text"
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="border w-full p-2 mb-4"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-xl font-bold">Informations Patient</h2>
      {renderInput("Nom", "nom")}
      {renderInput("Prénom", "prenom")}
      {renderInput("Date de naissance", "naissance")}
      {renderInput("Profession / Loisir", "profession")}
      {renderInput("Médecin traitant", "medecin")}
      {renderInput("Antécédents médicaux", "antecedents", true)}

      <h2 className="text-xl font-bold">Motif de consultation</h2>
      {renderInput("Motif", "motif", true)}

      <h2 className="text-xl font-bold">Anamnèse</h2>
      {renderInput("Contexte", "contexte", true)}
      {renderInput("Durée du vertige", "duree")}
      {renderInput("Facteur déclenchant le vertige", "facteurs")}
      {renderInput("Évolutivité", "evolution")}
      {renderInput("Signes associés", "signes", true)}

      <h2 className="text-xl font-bold">Examen neurologique oculomoteur</h2>
      {renderInput("Examen neurologique", "neuro", true)}
      {renderInput("Examen oculomoteur", "oculomoteur", true)}

      <h2 className="text-xl font-bold">Explorations vestibulaires</h2>
      {renderInput("Romberg", "romberg")}
      {renderInput("Fukuda", "fukuda")}
      {renderInput("Head Impulse Test (HIT)", "hit")}
      {renderInput("Vidéo HIT (VHIT)", "vhit")}
      {renderInput("Dix-Hallpike Test", "dht")}
      {renderInput("VVS / HVZ", "vvs")}
      {renderInput("AVD", "avd")}
      {renderInput("Score DHI", "dhi")}
      {renderInput("Posturographie / VR", "posturo", true)}
      {renderInput("Interprétation clinique", "interpretation", true)}

      <h2 className="text-xl font-bold">Conclusion</h2>
      {renderInput("Synthèse finale", "conclusion", true)}

      <button
        onClick={copyPrompt}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
      >
        📋 Copier le prompt pour ChatGPT
      </button>
    </div>
  );
}

"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Chantiers() {

  // Liste des chantiers
  const [chantiers, setChantiers] = useState([])
  // Afficher ou cacher le formulaire
  const [showForm, setShowForm] = useState(false)
  // Les valeurs du formulaire
  const [nom, setNom] = useState("")
  const [adresse, setAdresse] = useState("")
  const [statut, setStatut] = useState("En cours")
  const [client, setClient] = useState("")
  const [responsable, setResponsable] = useState("")
  // La raison optionnelle
  const [raison, setRaison] = useState("")

  // Charger les chantiers depuis Supabase
  async function chargerChantiers() {
    const { data } = await supabase.from("chantiers").select("*")
    setChantiers(data)
  }

  // Ajouter un nouveau chantier
  async function ajouterChantier() {
    const { error } = await supabase
      .from("chantiers")
      .insert({ nom, adresse, statut, client, responsable, raison })
    if (!error) {
      // On vide le formulaire
      setNom("")
      setAdresse("")
      setStatut("En cours")
      setClient("")
      setResponsable("")
      setRaison("")
      // On cache le formulaire
      setShowForm(false)
      // On recharge la liste
      chargerChantiers()
    }
  }

  // Supprimer un chantier
  async function supprimerChantier(id) {
    const { error } = await supabase
      .from("chantiers")
      .delete()
      .eq("id", id)
    if (!error) {
      chargerChantiers()
    }
  }

  // Changer le statut d'un chantier
  async function changerStatut(id, nouveauStatut) {
    const { error } = await supabase
      .from("chantiers")
      .update({ statut: nouveauStatut })
      .eq("id", id)
    if (!error) {
      chargerChantiers()
    }
  }

  // Modifier la raison d'un chantier
  async function modifierRaison(id, nouvelleRaison) {
    const { error } = await supabase
      .from("chantiers")
      .update({ raison: nouvelleRaison })
      .eq("id", id)
    if (!error) {
      chargerChantiers()
    }
  }

  // Au chargement de la page on récupère les chantiers
  useEffect(() => {
    chargerChantiers()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
        <Link href="/dashboard">
          <button className="text-gray-500 text-sm">← Retour</button>
        </Link>
      </div>

      <div className="p-6">

        {/* Titre et bouton ajouter */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Chantiers</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            + Ajouter un chantier
          </button>
        </div>

        {/* Formulaire visible seulement si showForm est true */}
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="font-bold text-gray-800 mb-4">Nouveau chantier</h3>
            <div className="flex flex-col gap-3">

              {/* Champ nom */}
              <input
                placeholder="Nom du chantier"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              {/* Champ adresse */}
              <input
                placeholder="Adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              {/* Champ client */}
              <input
                placeholder="Client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              {/* Champ responsable */}
              <input
                placeholder="Responsable"
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              {/* Champ raison optionnel */}
              <input
                placeholder="Raison (optionnel)"
                value={raison}
                onChange={(e) => setRaison(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              {/* Menu statut */}
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="p-3 border rounded-lg text-gray-700">
                <option>En cours</option>
                <option>En pause</option>
                <option>Terminé</option>
              </select>

              {/* Boutons ajouter et annuler */}
              <div className="flex gap-3">
                <button
                  onClick={ajouterChantier}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold">
                  Ajouter
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold">
                  Annuler
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Liste des chantiers */}
        <div className="flex flex-col gap-3">
          {chantiers.map((chantier) => (
            <div key={chantier.id} className="bg-white p-4 rounded-xl shadow">
              <div className="flex justify-between items-start">

                {/* Infos du chantier */}
                <div>
                  <p className="font-bold text-gray-800">{chantier.nom}</p>
                  <p className="text-gray-500 text-sm">{chantier.adresse}</p>
                  <p className="text-gray-500 text-sm mt-1">Client : {chantier.client}</p>
                  <p className="text-gray-500 text-sm">Responsable : {chantier.responsable}</p>

                  {/* Champ raison modifiable directement */}
                  <input
                    placeholder="Ajouter une raison..."
                    defaultValue={chantier.raison || ""}
                    onBlur={(e) => modifierRaison(chantier.id, e.target.value)}
                    className="text-sm text-orange-500 border-b border-gray-200 mt-2 w-64 bg-transparent outline-none"
                  />
                </div>

                {/* Statut et actions */}
                <div className="flex flex-col items-end gap-2">

                  {/* Menu déroulant pour changer le statut */}
                  <select
                    value={chantier.statut}
                    onChange={(e) => changerStatut(chantier.id, e.target.value)}
                    className={`text-sm px-3 py-1 rounded-full font-bold border-0 cursor-pointer
                      ${chantier.statut === "En cours" ? "bg-green-100 text-green-700" :
                      chantier.statut === "En pause" ? "bg-yellow-100 text-yellow-700" :
                      "bg-gray-100 text-gray-700"}`}>
                    <option>En cours</option>
                    <option>En pause</option>
                    <option>Terminé</option>
                  </select>

                  {/* Bouton supprimer */}
                  <button
                    onClick={() => supprimerChantier(chantier.id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-bold">
                    Supprimer
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
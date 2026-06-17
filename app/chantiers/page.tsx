"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Chantiers() {

  // Liste des chantiers
  const [chantiers, setChantiers] = useState([])
  // Photos
  const [photos, setPhotos] = useState({})
  const [chantierPhotoActif, setChantierPhotoActif] = useState(null)
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
      setNom("")
      setAdresse("")
      setStatut("En cours")
      setClient("")
      setResponsable("")
      setRaison("")
      setShowForm(false)
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

  // Charger les photos d'un chantier
  async function chargerPhotos(chantierId) {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .eq("chantier_id", chantierId)
    setPhotos(prev => ({ ...prev, [chantierId]: data }))
  }

  // Uploader une photo
  async function uploaderPhoto(chantierId, fichier) {
    const nomFichier = `${chantierId}-${Date.now()}-${fichier.name}`

    const { error: uploadError } = await supabase.storage
      .from("photos-chantier")
      .upload(nomFichier, fichier)

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from("photos-chantier")
        .getPublicUrl(nomFichier)

      await supabase
        .from("photos")
        .insert({ chantier_id: chantierId, url: urlData.publicUrl })

      chargerPhotos(chantierId)
      alert("Photo ajoutée avec succès !")
    } else {
      alert("Erreur lors de l'ajout de la photo")
    }
  }

  // Supprimer une photo
  async function supprimerPhoto(photoId, chantierId) {
    const { error } = await supabase
      .from("photos")
      .delete()
      .eq("id", photoId)
    if (!error) {
      chargerPhotos(chantierId)
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

              <input
                placeholder="Nom du chantier"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              <input
                placeholder="Adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              <input
                placeholder="Client"
                value={client}
                onChange={(e) => setClient(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              <input
                placeholder="Responsable"
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              <input
                placeholder="Raison (optionnel)"
                value={raison}
                onChange={(e) => setRaison(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value)}
                className="p-3 border rounded-lg text-gray-700">
                <option>En cours</option>
                <option>En pause</option>
                <option>Terminé</option>
              </select>

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

                  <button
                    onClick={() => supprimerChantier(chantier.id)}
                    className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-bold">
                    Supprimer
                  </button>

                </div>
              </div>

              {/* Section photos */}
              <div className="mt-3 pt-3 border-t">
                <button
                  onClick={() => {
                    if (chantierPhotoActif === chantier.id) {
                      setChantierPhotoActif(null)
                    } else {
                      setChantierPhotoActif(chantier.id)
                      chargerPhotos(chantier.id)
                    }
                  }}
                  className="text-green-600 text-sm font-bold">
                  📷 Photos {chantierPhotoActif === chantier.id ? "▲" : "▼"}
                </button>

                {chantierPhotoActif === chantier.id && (
                  <div className="mt-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => uploaderPhoto(chantier.id, e.target.files[0])}
                      className="text-sm mb-3"
                    />
                    <div className="flex gap-2 flex-wrap">
                      {photos[chantier.id] && photos[chantier.id].map((photo) => (
                        <div key={photo.id} className="relative">
                          <img
                            src={photo.url}
                            alt="Photo chantier"
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => supprimerPhoto(photo.id, chantier.id)}
                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
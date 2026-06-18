"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import BarreNavigation from "../components/BarreNavigation"
import { useLangue } from "../LangueContext"

export default function Photos() {

  const { t, langue } = useLangue()

  const [photos, setPhotos] = useState([])
  const [chantiers, setChantiers] = useState([])
  const [chantierChoisi, setChantierChoisi] = useState("")
  const [monNom, setMonNom] = useState("")

  useEffect(() => {
    const nom = localStorage.getItem("employeNom")
    setMonNom(nom || "")
  }, [])

  async function chargerPhotos() {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false })
    setPhotos(data)

    const { data: chantiersData } = await supabase
      .from("chantiers")
      .select("*")
    setChantiers(chantiersData)
  }

  function nomChantier(id) {
    const chantier = chantiers.find(c => c.id === id)
    return chantier ? chantier.nom : ""
  }

  // Uploader une photo en choisissant le chantier
  async function uploaderPhoto(fichier) {
    if (!chantierChoisi) {
      alert("Choisis d'abord un chantier")
      return
    }

    const nomFichier = `${chantierChoisi}-${Date.now()}-${fichier.name}`

    const { error: uploadError } = await supabase.storage
      .from("photos-chantier")
      .upload(nomFichier, fichier)

    if (!uploadError) {
      const { data: urlData } = supabase.storage
        .from("photos-chantier")
        .getPublicUrl(nomFichier)

      await supabase
        .from("photos")
        .insert({
          chantier_id: chantierChoisi,
          url: urlData.publicUrl,
          prise_par: monNom
        })

      chargerPhotos()
      alert("Photo ajoutée avec succès !")
    } else {
      alert("Erreur lors de l'ajout de la photo")
    }
  }

  useEffect(() => {
    chargerPhotos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <div className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold text-green-600">{t("chantpro")}</h1>
        <p className="text-gray-500 text-sm">{t("toutesLesPhotos")}</p>
      </div>

      <div className="p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-4">{t("galeriePhotos")}</h2>

        {/* Zone d'ajout de photo */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <p className="font-bold text-gray-800 mb-3">{t("ajouter")} une photo</p>

          <select
            value={chantierChoisi}
            onChange={(e) => setChantierChoisi(e.target.value)}
            className="w-full p-3 border rounded-lg text-gray-700 mb-3">
            <option value="">{t("choisirChantier")}</option>
            {chantiers.map(c => (
              <option key={c.id} value={c.id}>{c.nom}</option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploaderPhoto(e.target.files[0])}
            className="text-sm"
          />
        </div>

        {/* Grille de photos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-xl shadow overflow-hidden">
              <img
                src={photo.url}
                alt="Photo chantier"
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <p className="font-bold text-gray-800 text-sm">{nomChantier(photo.chantier_id)}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(photo.created_at).toLocaleDateString(langue)}
                </p>
                {photo.prise_par && (
                  <p className="text-gray-500 text-xs">{t("par")} {photo.prise_par}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="text-gray-500 text-center mt-10">{t("aucunePhoto")}</p>
        )}

      </div>

      <BarreNavigation />

    </div>
  )
}
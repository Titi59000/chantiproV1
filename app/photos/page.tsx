"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import BarreNavigation from "../components/BarreNavigation"

export default function Photos() {

  const [photos, setPhotos] = useState([])
  const [chantiers, setChantiers] = useState([])

  // Charger toutes les photos de tous les chantiers
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

  // Trouver le nom d'un chantier
  function nomChantier(id) {
    const chantier = chantiers.find(c => c.id === id)
    return chantier ? chantier.nom : "Chantier inconnu"
  }

  useEffect(() => {
    chargerPhotos()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
        <p className="text-gray-500 text-sm">Toutes les photos</p>
      </div>

      <div className="p-6">

        <h2 className="text-xl font-bold text-gray-800 mb-6">📷 Galerie photos</h2>

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
                  {new Date(photo.created_at).toLocaleDateString("fr-FR")}
                </p>
                {photo.prise_par && (
                  <p className="text-gray-500 text-xs">Par {photo.prise_par}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {photos.length === 0 && (
          <p className="text-gray-500 text-center mt-10">Aucune photo pour le moment</p>
        )}

      </div>

      <BarreNavigation />

    </div>
  )
}
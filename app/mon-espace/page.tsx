"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import { Calendar, Building2, MessageCircle, Camera } from "lucide-react"

export default function MonEspace() {

  // Identité de la personne connectée
  const [employeActuelId, setEmployeActuelId] = useState(null)
  const [nomEmploye, setNomEmploye] = useState("")

  const [planning, setPlanning] = useState([])
  const [chantiers, setChantiers] = useState([])

  // Récupérer l'identité depuis le localStorage au chargement
  useEffect(() => {
    const id = localStorage.getItem("employeId")
    const nom = localStorage.getItem("employeNom")
    setEmployeActuelId(id)
    setNomEmploye(nom)
  }, [])

  // Charger le planning de cet employé seulement
  async function chargerPlanning() {
    if (!employeActuelId) return

    const { data } = await supabase
      .from("planning")
      .select("*")
      .eq("employe_id", employeActuelId)
      .order("date", { ascending: true })
    setPlanning(data)

    const { data: chantiersData } = await supabase
      .from("chantiers")
      .select("*")
    setChantiers(chantiersData)
  }

  // Trouver le nom d'un chantier
  function nomChantier(id) {
    const chantier = chantiers.find(c => c.id === id)
    return chantier ? chantier.nom : ""
  }

  // On charge le planning seulement une fois qu'on connaît l'id de l'employé
  useEffect(() => {
    if (employeActuelId) {
      chargerPlanning()
    }
  }, [employeActuelId])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
        <p className="text-gray-500 text-sm">Bonjour {nomEmploye} 👷</p>
      </div>

      {/* Mon planning */}
      <div className="p-4">
        <h2 className="font-bold text-gray-800 mb-3">Mon planning</h2>

        <div className="flex flex-col gap-3">
          {planning.map((entree) => (
            <div key={entree.id} className="bg-white p-4 rounded-xl shadow">
              <p className="font-bold text-gray-800">{nomChantier(entree.chantier_id)}</p>
              <p className="text-gray-500 text-sm">{entree.date}</p>
              <p className="text-gray-500 text-sm">{entree.heure_debut} - {entree.heure_fin}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold inline-block mt-1 ${entree.statut === "Réalisé" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"}`}>
                {entree.statut || "Prévu"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Barre de navigation en bas */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">

        <button className="flex flex-col items-center text-green-600">
          <Calendar size={24} />
          <span className="text-xs mt-1">Planning</span>
        </button>

        <Link href="/chantiers" className="flex flex-col items-center text-gray-500">
          <Building2 size={24} />
          <span className="text-xs mt-1">Chantiers</span>
        </Link>

        <Link href="/messagerie" className="flex flex-col items-center text-gray-500">
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Messages</span>
        </Link>

        <button className="flex flex-col items-center text-gray-500">
          <Camera size={24} />
          <span className="text-xs mt-1">Photos</span>
        </button>

      </div>

    </div>
  )
}
"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import BarreNavigation from "../components/BarreNavigation"
import { useLangue } from "../LangueContext"

export default function MonEspace() {

  const { t } = useLangue()

  const [employeActuelId, setEmployeActuelId] = useState(null)
  const [nomEmploye, setNomEmploye] = useState("")

  const [planning, setPlanning] = useState([])
  const [chantiers, setChantiers] = useState([])

  useEffect(() => {
    const id = localStorage.getItem("employeId")
    const nom = localStorage.getItem("employeNom")
    setEmployeActuelId(id)
    setNomEmploye(nom)
  }, [])

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

  function nomChantier(id) {
    const chantier = chantiers.find(c => c.id === id)
    return chantier ? chantier.nom : ""
  }

  // Enregistrer les heures travaillées pour une entrée
  async function enregistrerHeures(id, heures) {
    const { error } = await supabase
      .from("planning")
      .update({ heures_travaillees: heures })
      .eq("id", id)
    if (!error) {
      chargerPlanning()
    }
  }

  // Calculer le total d'heures de la semaine en cours
  function totalHeuresSemaine() {
    const aujourd = new Date()
    const lundi = new Date(aujourd)
    lundi.setDate(aujourd.getDate() - aujourd.getDay() + 1)
    lundi.setHours(0, 0, 0, 0)

    const dimanche = new Date(lundi)
    dimanche.setDate(lundi.getDate() + 6)
    dimanche.setHours(23, 59, 59, 999)

    const total = planning
      .filter(entree => {
        const dateEntree = new Date(entree.date)
        return dateEntree >= lundi && dateEntree <= dimanche
      })
      .reduce((somme, entree) => somme + (parseFloat(entree.heures_travaillees) || 0), 0)

    return total
  }

  useEffect(() => {
    if (employeActuelId) {
      chargerPlanning()
    }
  }, [employeActuelId])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4">
        <h1 className="text-xl font-bold text-green-600">{t("chantpro")}</h1>
        <p className="text-gray-500 text-sm">{t("bonjour")} {nomEmploye} 👷</p>
      </div>

      {/* Résumé heures de la semaine */}
      <div className="p-4">
        <div className="bg-green-600 text-white p-4 rounded-xl shadow text-center">
          <p className="text-sm opacity-90">Cette semaine</p>
          <p className="text-3xl font-bold mt-1">{totalHeuresSemaine()}h</p>
        </div>
      </div>

      {/* Mon planning */}
      <div className="p-4 pt-0">
        <h2 className="font-bold text-gray-800 mb-3">{t("planning")}</h2>

        <div className="flex flex-col gap-3">
          {planning.map((entree) => (
            <div key={entree.id} className="bg-white p-4 rounded-xl shadow">
              <p className="font-bold text-gray-800">{nomChantier(entree.chantier_id)}</p>
              <p className="text-gray-500 text-sm">
                {new Date(entree.date).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm">{entree.heure_debut} - {entree.heure_fin}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold inline-block mt-1 ${entree.statut === "Réalisé" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"}`}>
                {entree.statut === "Réalisé" ? t("realise") : t("prevu")}
              </span>

              {/* Saisie des heures réellement travaillées */}
              <div className="mt-3 pt-3 border-t flex items-center gap-3">
                <label className="text-sm text-gray-600">Heures travaillées :</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  placeholder="0"
                  defaultValue={entree.heures_travaillees || ""}
                  onBlur={(e) => enregistrerHeures(entree.id, e.target.value)}
                  className="w-20 p-2 border rounded-lg text-gray-700 text-center"
                />
                <span className="text-sm text-gray-500">h</span>
              </div>
            </div>
          ))}

          {planning.length === 0 && (
            <p className="text-gray-500 text-center mt-6">{t("aucuneEntreeJour")}</p>
          )}
        </div>
      </div>

      <BarreNavigation />

    </div>
  )
}
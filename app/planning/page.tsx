"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import BarreNavigation from "../components/BarreNavigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useLangue } from "../LangueContext"

export default function Planning() {

  const { t } = useLangue()

  const [planning, setPlanning] = useState([])
  const [employes, setEmployes] = useState([])
  const [chantiers, setChantiers] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [employeId, setEmployeId] = useState("")
  const [chantierId, setChantierId] = useState("")
  const [date, setDate] = useState("")
  const [heureDebut, setHeureDebut] = useState("")
  const [heureFin, setHeureFin] = useState("")
  const [decalageSemaine, setDecalageSemaine] = useState(0)
  const [jourMobileIndex, setJourMobileIndex] = useState(0)

  // Permission de modifier le planning
  const [peutModifier, setPeutModifier] = useState(false)

  useEffect(() => {
    const id = localStorage.getItem("employeId")
    const permission = localStorage.getItem("peutModifierPlanning")
    setPeutModifier(id === "0" || permission === "oui")
  }, [])

  const couleurs = [
    { background: "#93C5FD", border: "#3B82F6" },
    { background: "#BFDBFE", border: "#60A5FA" },
    { background: "#C4B5FD", border: "#7C3AED" },
    { background: "#DDD6FE", border: "#8B5CF6" },
    { background: "#FCA5A5", border: "#EF4444" },
    { background: "#FECACA", border: "#F87171" },
    { background: "#86EFAC", border: "#22C55E" },
    { background: "#BBF7D0", border: "#4ADE80" },
    { background: "#FCD34D", border: "#F59E0B" },
    { background: "#FDE68A", border: "#FCD34D" },
    { background: "#F9A8D4", border: "#EC4899" },
    { background: "#FBCFE8", border: "#F472B6" },
    { background: "#67E8F9", border: "#06B6D4" },
    { background: "#A5F3FC", border: "#22D3EE" },
    { background: "#FDB58A", border: "#F97316" },
    { background: "#FED7AA", border: "#FB923C" },
    { background: "#A5B4FC", border: "#6366F1" },
    { background: "#C7D2FE", border: "#818CF8" },
    { background: "#6EE7B7", border: "#10B981" },
    { background: "#A7F3D0", border: "#34D399" },
    { background: "#FCA5A5", border: "#DC2626" },
    { background: "#F87171", border: "#B91C1C" },
    { background: "#60A5FA", border: "#1D4ED8" },
    { background: "#3B82F6", border: "#1E40AF" },
    { background: "#A78BFA", border: "#5B21B6" },
    { background: "#7C3AED", border: "#4C1D95" },
    { background: "#34D399", border: "#065F46" },
    { background: "#10B981", border: "#064E3B" },
    { background: "#FBBF24", border: "#92400E" },
    { background: "#F59E0B", border: "#78350F" },
    { background: "#F472B6", border: "#9D174D" },
    { background: "#EC4899", border: "#831843" },
    { background: "#22D3EE", border: "#164E63" },
    { background: "#06B6D4", border: "#0C4A6E" },
    { background: "#FB923C", border: "#7C2D12" },
    { background: "#F97316", border: "#431407" },
    { background: "#818CF8", border: "#312E81" },
    { background: "#6366F1", border: "#1E1B4B" },
    { background: "#4ADE80", border: "#14532D" },
    { background: "#86EFAC", border: "#166534" },
  ]

  function couleurEmploye(employeId) {
    if (!employes || employes.length === 0) return { background: "#E5E7EB", border: "#9CA3AF" }
    const index = employes.findIndex(e => e.id === employeId)
    if (index === -1) return { background: "#E5E7EB", border: "#9CA3AF" }
    return couleurs[index % couleurs.length]
  }

  function getSemaine() {
    const aujourd = new Date()
    const lundi = new Date(aujourd)
    lundi.setDate(aujourd.getDate() - aujourd.getDay() + 1 + (decalageSemaine * 7))
    return Array.from({ length: 7 }, (_, i) => {
      const jour = new Date(lundi)
      jour.setDate(lundi.getDate() + i)
      return jour
    })
  }

  const semaine = getSemaine()
  const nomsJours = [t("lundi").slice(0, 3), t("mardi").slice(0, 3), t("mercredi").slice(0, 3), t("jeudi").slice(0, 3), t("vendredi").slice(0, 3), t("samedi").slice(0, 3), t("dimanche").slice(0, 3)]
  const nomsJoursLongs = [t("lundi"), t("mardi"), t("mercredi"), t("jeudi"), t("vendredi"), t("samedi"), t("dimanche")]

  async function chargerDonnees() {
    const { data: planningData } = await supabase
      .from("planning")
      .select("*")
      .order("date", { ascending: true })
    setPlanning(planningData)

    const { data: employesData } = await supabase
      .from("employes")
      .select("*")
    setEmployes(employesData)

    const { data: chantiersData } = await supabase
      .from("chantiers")
      .select("*")
    setChantiers(chantiersData)
  }

  async function ajouterPlanning() {
    const { error } = await supabase
      .from("planning")
      .insert({
        employe_id: employeId,
        chantier_id: chantierId,
        date,
        heure_debut: heureDebut,
        heure_fin: heureFin
      })
    if (!error) {
      setEmployeId("")
      setChantierId("")
      setDate("")
      setHeureDebut("")
      setHeureFin("")
      setShowForm(false)
      chargerDonnees()
    }
  }

  async function supprimerPlanning(id) {
    const { error } = await supabase
      .from("planning")
      .delete()
      .eq("id", id)
    if (!error) {
      chargerDonnees()
    }
  }

  async function changerStatutPlanning(id, statutActuel) {
    const nouveauStatut = statutActuel === "Réalisé" ? "Prévu" : "Réalisé"
    const { error } = await supabase
      .from("planning")
      .update({ statut: nouveauStatut })
      .eq("id", id)
    if (!error) {
      chargerDonnees()
    }
  }

  function nomEmploye(id) {
    const employe = employes.find(e => e.id === id)
    return employe ? `${employe.prenom} ${employe.nom}` : ""
  }

  function nomChantier(id) {
    const chantier = chantiers.find(c => c.id === id)
    return chantier ? chantier.nom : ""
  }

  function planningDuJour(jour) {
    const dateStr = jour.toISOString().split("T")[0]
    return planning.filter(p => p.date === dateStr)
  }

  function jourPrecedent() {
    if (jourMobileIndex === 0) {
      setDecalageSemaine(decalageSemaine - 1)
      setJourMobileIndex(6)
    } else {
      setJourMobileIndex(jourMobileIndex - 1)
    }
  }

  function jourSuivant() {
    if (jourMobileIndex === 6) {
      setDecalageSemaine(decalageSemaine + 1)
      setJourMobileIndex(0)
    } else {
      setJourMobileIndex(jourMobileIndex + 1)
    }
  }

  useEffect(() => {
    chargerDonnees()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">{t("chantpro")}</h1>
        <Link href="/dashboard">
          <button className="text-gray-500 text-sm">{t("retour")}</button>
        </Link>
      </div>

      <div className="p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">{t("planningSemaine")}</h2>
          {peutModifier && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
              + {t("ajouter")}
            </button>
          )}
        </div>

        {showForm && peutModifier && (
          <div className="bg-white p-6 rounded-xl shadow mb-6">
            <h3 className="font-bold text-gray-800 mb-4">{t("nouvelleEntree")}</h3>
            <div className="flex flex-col gap-3">

              <select
                value={employeId}
                onChange={(e) => setEmployeId(e.target.value)}
                className="p-3 border rounded-lg text-gray-700">
                <option value="">{t("choisirEmploye")}</option>
                {employes.map(e => (
                  <option key={e.id} value={e.id}>{e.prenom} {e.nom}</option>
                ))}
              </select>

              <select
                value={chantierId}
                onChange={(e) => setChantierId(e.target.value)}
                className="p-3 border rounded-lg text-gray-700">
                <option value="">{t("choisirChantier")}</option>
                {chantiers.map(c => (
                  <option key={c.id} value={c.id}>{c.nom}</option>
                ))}
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              <input
                type="time"
                value={heureDebut}
                onChange={(e) => setHeureDebut(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              <input
                type="time"
                value={heureFin}
                onChange={(e) => setHeureFin(e.target.value)}
                className="p-3 border rounded-lg text-gray-700"
              />

              <div className="flex gap-3">
                <button
                  onClick={ajouterPlanning}
                  className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold">
                  {t("ajouter")}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold">
                  {t("annuler")}
                </button>
              </div>

            </div>
          </div>
        )}

        <div className="hidden md:flex justify-between items-center mb-4">

          <button
            onClick={() => setDecalageSemaine(decalageSemaine - 1)}
            className="bg-white shadow px-4 py-2 rounded-lg font-bold text-gray-700">
            {t("semainePrecedente")}
          </button>

          <button
            onClick={() => setDecalageSemaine(0)}
            className="text-green-600 font-bold text-sm">
            {t("revenirAujourdhui")}
          </button>

          <button
            onClick={() => setDecalageSemaine(decalageSemaine + 1)}
            className="bg-white shadow px-4 py-2 rounded-lg font-bold text-gray-700">
            {t("semaineSuivante")}
          </button>

        </div>

        <div className="hidden md:grid grid-cols-7 gap-2">
          {semaine.map((jour, index) => (
            <div key={index} className="bg-white rounded-xl shadow overflow-hidden">

              <div className="bg-green-600 text-white text-center py-2">
                <p className="font-bold text-sm">{nomsJours[index]}</p>
                <p className="text-xs">{jour.getDate()}/{jour.getMonth() + 1}</p>
              </div>

              <div className="p-2 min-h-24 flex flex-col gap-1">
                {planningDuJour(jour).map((entree) => (
                  <div
                    key={entree.id}
                    style={{
                      backgroundColor: couleurEmploye(entree.employe_id).background,
                      borderColor: couleurEmploye(entree.employe_id).border,
                      borderWidth: "1px",
                      borderStyle: "solid"
                    }}
                    className="rounded p-1 text-xs">

                    <p className="font-bold text-gray-800">{nomEmploye(entree.employe_id)}</p>
                    <p className="text-gray-600">{nomChantier(entree.chantier_id)}</p>
                    <p className="text-gray-400">{entree.heure_debut} - {entree.heure_fin}</p>

                    <div className="flex items-center justify-between mt-1">
                      <span
                        onClick={() => peutModifier && changerStatutPlanning(entree.id, entree.statut)}
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${peutModifier ? "cursor-pointer" : ""} ${entree.statut === "Réalisé" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"}`}>
                        {entree.statut === "Réalisé" ? t("realise") : t("prevu")}
                      </span>

                      {peutModifier && (
                        <button
                          onClick={() => supprimerPlanning(entree.id)}
                          className="text-red-500 font-bold text-xs">
                          ✕
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden">

          <div className="flex items-center justify-between mb-4 bg-white rounded-xl shadow p-3">
            <button onClick={jourPrecedent} className="text-green-600">
              <ChevronLeft size={28} />
            </button>

            <div className="text-center">
              <p className="font-bold text-gray-800">{nomsJoursLongs[jourMobileIndex]}</p>
              <p className="text-gray-500 text-sm">
                {semaine[jourMobileIndex].getDate()}/{semaine[jourMobileIndex].getMonth() + 1}
              </p>
            </div>

            <button onClick={jourSuivant} className="text-green-600">
              <ChevronRight size={28} />
            </button>
          </div>

          <button
            onClick={() => {
              setDecalageSemaine(0)
              const aujourd = new Date()
              setJourMobileIndex((aujourd.getDay() + 6) % 7)
            }}
            className="w-full text-green-600 font-bold text-sm mb-4">
            {t("revenirAujourdhui")}
          </button>

          <div className="flex flex-col gap-3">
            {planningDuJour(semaine[jourMobileIndex]).map((entree) => (
              <div
                key={entree.id}
                style={{
                  backgroundColor: couleurEmploye(entree.employe_id).background,
                  borderColor: couleurEmploye(entree.employe_id).border,
                  borderWidth: "1px",
                  borderStyle: "solid"
                }}
                className="rounded-xl p-4">

                <p className="font-bold text-gray-800">{nomEmploye(entree.employe_id)}</p>
                <p className="text-gray-600">{nomChantier(entree.chantier_id)}</p>
                <p className="text-gray-500 text-sm">{entree.heure_debut} - {entree.heure_fin}</p>

                <div className="flex items-center justify-between mt-2">
                  <span
                    onClick={() => peutModifier && changerStatutPlanning(entree.id, entree.statut)}
                    className={`text-sm px-3 py-1 rounded-full font-bold ${peutModifier ? "cursor-pointer" : ""} ${entree.statut === "Réalisé" ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"}`}>
                    {entree.statut === "Réalisé" ? t("realise") : t("prevu")}
                  </span>

                  {peutModifier && (
                    <button
                      onClick={() => supprimerPlanning(entree.id)}
                      className="text-red-500 font-bold text-sm">
                      {t("supprimer")}
                    </button>
                  )}
                </div>

              </div>
            ))}

            {planningDuJour(semaine[jourMobileIndex]).length === 0 && (
              <p className="text-gray-500 text-center mt-6">{t("aucuneEntreeJour")}</p>
            )}
          </div>

        </div>

      </div>

      <BarreNavigation />

    </div>
  )
}
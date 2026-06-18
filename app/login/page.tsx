"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../supabase"
import { useLangue } from "../LangueContext"

export default function Login() {

  const router = useRouter()
  const { t, langue, changerLangue } = useLangue()

  const [identifiant, setIdentifiant] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [nomAffiche, setNomAffiche] = useState("")
  const [erreur, setErreur] = useState("")

  const estEmail = identifiant.includes("@")

  async function seConnecter() {
    setErreur("")

    if (estEmail) {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: identifiant,
        password: motDePasse
      })

      if (data.user) {
        const nomFinal = nomAffiche.trim() || identifiant.split("@")[0]
        localStorage.setItem("employeId", "0")
        localStorage.setItem("employeNom", nomFinal)
        // Le patron a tous les droits
        localStorage.setItem("peutModifierPlanning", "oui")
        localStorage.setItem("peutSupprimerEmployes", "oui")
        localStorage.setItem("peutGererChantiers", "oui")
        router.push("/dashboard")
      } else {
        setErreur(t("erreurConnexion"))
      }
    } else {
      const { data } = await supabase
        .from("employes")
        .select("*")
        .eq("telephone", identifiant)
        .eq("pin", motDePasse)
        .single()

      if (data) {
        localStorage.setItem("employeId", data.id)
        localStorage.setItem("employeNom", data.prenom + " " + data.nom)
        // On sauvegarde les permissions de l'employé
        localStorage.setItem("peutModifierPlanning", data.peut_modifier_planning ? "oui" : "non")
        localStorage.setItem("peutSupprimerEmployes", data.peut_supprimer_employes ? "oui" : "non")
        localStorage.setItem("peutGererChantiers", data.peut_gerer_chantiers ? "oui" : "non")
        router.push("/mon-espace")
      } else {
        setErreur(t("erreurConnexion"))
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <div className="flex justify-end mb-2">
          <select
            value={langue}
            onChange={(e) => changerLangue(e.target.value)}
            className="p-1 border rounded text-xs text-gray-700 bg-white">
            <option value="fr">🇫🇷 FR</option>
            <option value="en">🇬🇧 EN</option>
            <option value="it">🇮🇹 IT</option>
            <option value="ru">🇷🇺 RU</option>
            <option value="pt">🇵🇹 PT</option>
          </select>
        </div>

        <h1 className="text-2xl font-bold text-green-600 text-center">
          {t("chantpro")}
        </h1>
        <p className="text-gray-500 text-center mt-2">
          {t("connexion")}
        </p>

        {erreur && (
          <p className="text-red-500 text-sm text-center mt-4">{erreur}</p>
        )}

        <div className="mt-6">
          <label className="text-sm font-bold text-gray-700">
            {t("emailOuTelephone")}
          </label>
          <input
            type="text"
            placeholder="votre@email.com ou 0612345678"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
            className="w-full mt-1 p-3 border rounded-lg text-gray-700"
          />
        </div>

        {estEmail && (
          <div className="mt-4">
            <label className="text-sm font-bold text-gray-700">
              {t("commentAppeler")}
            </label>
            <input
              type="text"
              placeholder="Ex: Diego"
              value={nomAffiche}
              onChange={(e) => setNomAffiche(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg text-gray-700"
            />
          </div>
        )}

        <div className="mt-4">
          <label className="text-sm font-bold text-gray-700">
            {t("motDePasseOuPin")}
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            className="w-full mt-1 p-3 border rounded-lg text-gray-700"
          />
        </div>

        <button
          onClick={seConnecter}
          className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold">
          {t("seConnecter")}
        </button>

      </div>

    </div>
  )
}
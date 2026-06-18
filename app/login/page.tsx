"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../supabase"

export default function Login() {

  const router = useRouter()

  const [identifiant, setIdentifiant] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [nomAffiche, setNomAffiche] = useState("")
  const [erreur, setErreur] = useState("")

  // On détecte si c'est un email pour savoir si on montre le champ nom
  const estEmail = identifiant.includes("@")

  async function seConnecter() {
    setErreur("")

    if (estEmail) {
      // C'est le patron - connexion par email + mot de passe
      if (identifiant && motDePasse) {
        // On utilise le nom choisi, sinon on prend la partie avant le @ par défaut
        const nomFinal = nomAffiche.trim() || identifiant.split("@")[0]
        localStorage.setItem("employeId", "0")
        localStorage.setItem("employeNom", nomFinal)
        router.push("/dashboard")
      } else {
        setErreur("Email ou mot de passe incorrect")
      }
    } else {
      // C'est un employé - connexion par téléphone + PIN
      const { data } = await supabase
        .from("employes")
        .select("*")
        .eq("telephone", identifiant)
        .eq("pin", motDePasse)
        .single()

      if (data) {
        localStorage.setItem("employeId", data.id)
        localStorage.setItem("employeNom", data.prenom + " " + data.nom)
        router.push("/mon-espace")
      } else {
        setErreur("Téléphone ou code PIN incorrect")
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold text-green-600 text-center">
          ChantPro
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Connectez-vous à votre espace
        </p>

        {erreur && (
          <p className="text-red-500 text-sm text-center mt-4">{erreur}</p>
        )}

        <div className="mt-6">
          <label className="text-sm font-bold text-gray-700">
            Email (patron) ou Téléphone (employé)
          </label>
          <input
            type="text"
            placeholder="votre@email.com ou 0612345678"
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
            className="w-full mt-1 p-3 border rounded-lg text-gray-700"
          />
        </div>

        {/* Champ visible seulement si c'est un email (patron) */}
        {estEmail && (
          <div className="mt-4">
            <label className="text-sm font-bold text-gray-700">
              Comment voulez-vous être appelé ?
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
            Mot de passe ou Code PIN
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
          Se connecter
        </button>

      </div>

    </div>
  )
}
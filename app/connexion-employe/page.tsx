"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../supabase"

export default function ConnexionEmploye() {

  const router = useRouter()

  const [telephone, setTelephone] = useState("")
  const [pin, setPin] = useState("")
  const [erreur, setErreur] = useState("")

  // Vérifier la connexion
  async function seConnecter() {
    setErreur("")

    const { data, error } = await supabase
      .from("employes")
      .select("*")
      .eq("telephone", telephone)
      .eq("pin", pin)
      .single()

    if (data) {
      localStorage.setItem("employeId", data.id)
      localStorage.setItem("employeNom", data.prenom + " " + data.nom)
      router.push("/mon-espace")
    } else {
      setErreur("Téléphone ou code PIN incorrect")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold text-green-600 text-center">
          ChantPro
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Connexion employé
        </p>

        {erreur && (
          <p className="text-red-500 text-sm text-center mt-4">{erreur}</p>
        )}

        <div className="mt-6">
          <label className="text-sm font-bold text-gray-700">Téléphone</label>
          <input
            type="tel"
            placeholder="0612345678"
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            className="w-full mt-1 p-3 border rounded-lg text-gray-700"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm font-bold text-gray-700">Code PIN</label>
          <input
            type="password"
            placeholder="••••"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
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
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Employes() {

  // On crée une variable pour stocker les employés
  const [employes, setEmployes] = useState([])

  // Au chargement de la page on récupère les employés
  useEffect(() => {
    async function chargerEmployes() {
      // On demande à Supabase les données de la table "employes"
      const { data } = await supabase.from("employes").select("*")
      // On stocke les données dans la variable
      setEmployes(data)
    }
    chargerEmployes()
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

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Employés</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            + Ajouter un employé
          </button>
        </div>

        {/* Liste des employés depuis la base de données */}
        <div className="flex flex-col gap-3">
          {employes.map((employe) => (
            <div key={employe.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {employe.prenom[0]}{employe.nom[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{employe.prenom} {employe.nom}</p>
                  <p className="text-gray-500 text-sm">{employe.role}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="text-sm font-bold text-gray-800">{employe.telephone}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
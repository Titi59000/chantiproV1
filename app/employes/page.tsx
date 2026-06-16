"use client"

import Link from "next/link"

export default function Employes() {
  return (
    // Page entière fond gris
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
        <Link href="/dashboard">
          <button className="text-gray-500 text-sm">← Retour</button>
        </Link>
      </div>

      {/* Contenu */}
      <div className="p-6">

        {/* Titre et bouton ajouter */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Employés</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            + Ajouter un employé
          </button>
        </div>

        {/* Liste des employés */}
        <div className="flex flex-col gap-3">

          {/* Employé 1 */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Avatar avec initiales */}
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                AL
              </div>
              <div>
                <p className="font-bold text-gray-800">Lucas Albert</p>
                <p className="text-gray-500 text-sm">Ouvrier</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Chantier actuel</p>
              <p className="text-sm font-bold text-gray-800">Rénovation Dupont</p>
            </div>
          </div>

          {/* Employé 2 */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                MK
              </div>
              <div>
                <p className="font-bold text-gray-800">Karim Mansour</p>
                <p className="text-gray-500 text-sm">Conducteur de travaux</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Chantier actuel</p>
              <p className="text-sm font-bold text-gray-800">Toiture Martineau</p>
            </div>
          </div>

          {/* Employé 3 */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                SD
              </div>
              <div>
                <p className="font-bold text-gray-800">Sarah Dupuis</p>
                <p className="text-gray-500 text-sm">Secrétaire</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Chantier actuel</p>
              <p className="text-sm font-bold text-gray-800">Non assignée</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
"use client"

import Link from "next/link"

export default function Heures() {
  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
<div className="bg-white shadow px-6 py-4 flex justify-between items-center">
  <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
  <Link href="/dashboard">
    <button className="text-gray-500 text-sm">← Retour</button>
  </Link>
</div>{/* Contenu principal */}
<div className="p-6">

  {/* Titre */}
  <h2 className="text-xl font-bold text-gray-800 mb-6">
    Pointage des heures
  </h2>

  {/* Formulaire de pointage */}
  <div className="bg-white p-6 rounded-xl shadow mb-6">

    {/* Choisir un employé */}
    <div className="mb-4">
      <label className="text-sm font-bold text-gray-700">Employé</label>
      <select className="w-full mt-1 p-3 border rounded-lg text-gray-700">
        <option>Lucas Albert - Ouvrier</option>
        <option>Karim Mansour - Conducteur de travaux</option>
        <option>Sarah Dupuis - Secrétaire</option>
      </select>
    </div>

    {/* Choisir un chantier */}
    <div className="mb-4">
      <label className="text-sm font-bold text-gray-700">Chantier</label>
      <select className="w-full mt-1 p-3 border rounded-lg text-gray-700">
        <option>Rénovation Dupont</option>
        <option>Toiture Martineau</option>
        <option>Électricité Moreau</option>
      </select>
    </div>

    {/* Nombre d'heures */}
    <div className="mb-4">
      <label className="text-sm font-bold text-gray-700">Heures travaillées</label>
      <input
        type="number"
        placeholder="Ex: 8"
        className="w-full mt-1 p-3 border rounded-lg text-gray-700"
      />
    </div>

    {/* Bouton valider */}
    <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">
      Valider le pointage
    </button>

  </div>
{/* Tableau des heures récentes */}
<h3 className="text-lg font-bold text-gray-800 mb-3">
  Heures récentes
</h3>

<div className="flex flex-col gap-3">

  {/* Ligne 1 */}
  <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
    <div>
      <p className="font-bold text-gray-800">Lucas Albert</p>
      <p className="text-gray-500 text-sm">Rénovation Dupont</p>
    </div>
    <div className="text-right">
      <p className="text-2xl font-bold text-green-600">8h</p>
      <p className="text-gray-500 text-sm">Aujourd'hui</p>
    </div>
  </div>

  {/* Ligne 2 */}
  <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
    <div>
      <p className="font-bold text-gray-800">Karim Mansour</p>
      <p className="text-gray-500 text-sm">Toiture Martineau</p>
    </div>
    <div className="text-right">
      <p className="text-2xl font-bold text-green-600">7h</p>
      <p className="text-gray-500 text-sm">Aujourd'hui</p>
    </div>
  </div>

  {/* Ligne 3 */}
  <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
    <div>
      <p className="font-bold text-gray-800">Sarah Dupuis</p>
      <p className="text-gray-500 text-sm">Électricité Moreau</p>
    </div>
    <div className="text-right">
      <p className="text-2xl font-bold text-green-600">6h</p>
      <p className="text-gray-500 text-sm">Hier</p>
    </div>
  </div>

</div>
</div>
    </div>
  )
}
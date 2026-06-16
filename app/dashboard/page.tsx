"use client"
import Link from "next/link"
// ✅ Bon
export default function dashboard() {
  return (
    // La page entière avec fond gris
    <div className="min-h-screen bg-gray-50">

      {/* Le header en haut */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-green-600">
          ChantPro
        </h1>

        {/* Nom du patron */}
        <p className="text-gray-600">
          Bonjour, Diego 👷
        </p>

      </div>

      {/* Le contenu principal */}
      <div className="p-6">

        {/* Les 3 stats en haut */}
        <div className="flex gap-4 mb-6">

          {/* Stat 1 */}
          <div className="bg-white p-4 rounded-xl shadow flex-1 text-center">
            <p className="text-gray-500 text-sm">Chantiers actifs</p>
            <p className="text-3xl font-bold text-green-600 mt-1">8</p>
          </div>

          {/* Stat 2 */}
          <Link href="/employes">
          <div className="bg-white p-4 rounded-xl shadow flex-1 text-center">
            <p className="text-gray-500 text-sm">Employés</p>
            <p className="text-3xl font-bold text-green-600 mt-1">14</p>
          </div>
</Link>
          {/* Stat 3 */}
          <div className="bg-white p-4 rounded-xl shadow flex-1 text-center">
            <p className="text-gray-500 text-sm">Heures ce mois</p>
            <p className="text-3xl font-bold text-green-600 mt-1">312h</p>
          </div>

        </div>

        {/* Titre section */}
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Chantiers en cours
        </h2>

        {/* Liste des chantiers */}
        <div className="flex flex-col gap-3">

          {/* Chantier 1 */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">Rénovation Dupont</p>
              <p className="text-gray-500 text-sm">12 rue des Lilas, Nice</p>
            </div>
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
              En cours
            </span>
          </div>

          {/* Chantier 2 */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">Toiture Martineau</p>
              <p className="text-gray-500 text-sm">8 av. Pasteur, Cannes</p>
            </div>
            <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">
              En cours
            </span>
          </div>

          {/* Chantier 3 */}
          <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-800">Électricité Moreau</p>
              <p className="text-gray-500 text-sm">3 bd Victor Hugo, Nice</p>
            </div>
            <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
              En pause
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}
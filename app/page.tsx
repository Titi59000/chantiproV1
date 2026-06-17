"use client"
"use client"

// On importe Link depuis Next.js
import Link from "next/link"
import { Building2, Clock, MessageCircle, Calendar } from "lucide-react"
export default function Home() {
  return (
    // Div principale qui centre tout
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
      {/* Le titre principal */}
      <h1 className="text-4xl font-bold text-green-600">
        ChantPro
      </h1>
      
      {/* Le sous-titre */}
      <p className="text-gray-500 mt-4">
        Gérez vos chantiers simplement
      </p>

    {/* Le bouton redirige vers la page login */}
<Link href="/login">
  <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
    Commencer gratuitement
  </button>
</Link>
      {/* Section des fonctionnalités */}
      <div className="flex gap-6 mt-16">

        {/* Carte 1 */}
      {/* Carte Chantiers avec icône */}
<div className="bg-white p-6 rounded-xl shadow w-48">
  <Building2 className="text-green-600 mb-2" size={32} />
  <h2 className="font-bold text-gray-800">Chantiers</h2>
  <p className="text-gray-500 text-sm mt-2">Suivez tous vos chantiers en temps réel</p>
</div>

{/* Carte Heures avec icône */}
<div className="bg-white p-6 rounded-xl shadow w-48">
  <Clock className="text-green-600 mb-2" size={32} />
  <h2 className="font-bold text-gray-800">Heures</h2>
  <p className="text-gray-500 text-sm mt-2">Pointage simple pour chaque employé</p>
</div>

{/* Carte Messagerie avec icône */}
<div className="bg-white p-6 rounded-xl shadow w-48">
  <MessageCircle className="text-green-600 mb-2" size={32} />
  <h2 className="font-bold text-gray-800">Messagerie</h2>
  <p className="text-gray-500 text-sm mt-2">Communiquez avec toute votre équipe</p>
</div>

      
      </div>

    </div>
  )
}
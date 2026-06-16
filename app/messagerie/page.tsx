"use client"

import Link from "next/link"

export default function Messagerie() {
  return (
    <div className="min-h-screen bg-gray-50">
{/* Header */}
<div className="bg-white shadow px-6 py-4 flex justify-between items-center">
  <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
  <Link href="/dashboard">
    <button className="text-gray-500 text-sm">← Retour</button>
  </Link>
</div>{/* Contenu */}
<div className="flex h-screen">

  {/* Colonne gauche - liste des conversations */}
  <div className="w-64 bg-white border-r p-4">
    
    <h2 className="font-bold text-gray-800 mb-4">Messages</h2>

    {/* Conversation 1 */}
    <div className="p-3 rounded-lg bg-green-50 cursor-pointer mb-2">
      <div className="flex items-center gap-3">
        <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
          AL
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">Lucas Albert</p>
          <p className="text-gray-500 text-xs">On arrive à 8h</p>
        </div>
      </div>
    </div>

    {/* Conversation 2 */}
    <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer mb-2">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
          MK
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">Karim Mansour</p>
          <p className="text-gray-500 text-xs">Matériaux livrés</p>
        </div>
      </div>
    </div>

    {/* Conversation 3 */}
    <div className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer mb-2">
      <div className="flex items-center gap-3">
        <div className="bg-yellow-100 text-yellow-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
          SD
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">Sarah Dupuis</p>
          <p className="text-gray-500 text-xs">Facture envoyée</p>
        </div>
      </div>
    </div>

  </div>

  {/* Colonne droite - les messages */}
  <div className="flex-1 flex flex-col">

    {/* Nom du contact en haut */}
    <div className="bg-white border-b px-6 py-4">
      <p className="font-bold text-gray-800">Lucas Albert</p>
      <p className="text-gray-500 text-sm">Ouvrier</p>
    </div>

    {/* Les messages */}
    <div className="flex-1 p-6 flex flex-col gap-3">

      {/* Message reçu */}
      <div className="flex gap-3">
        <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">
          AL
        </div>
        <div className="bg-white p-3 rounded-xl shadow max-w-xs">
          <p className="text-gray-800 text-sm">Bonjour patron, on arrive à 8h sur le chantier Dupont</p>
          <p className="text-gray-400 text-xs mt-1">09:15</p>
        </div>
      </div>

      {/* Message envoyé */}
      <div className="flex gap-3 justify-end">
        <div className="bg-green-600 p-3 rounded-xl max-w-xs">
          <p className="text-white text-sm">Parfait merci Lucas !</p>
          <p className="text-green-200 text-xs mt-1">09:17</p>
        </div>
      </div>

      {/* Message reçu */}
      <div className="flex gap-3">
        <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm flex-shrink-0">
          AL
        </div>
        <div className="bg-white p-3 rounded-xl shadow max-w-xs">
          <p className="text-gray-800 text-sm">On a besoin de ciment supplémentaire</p>
          <p className="text-gray-400 text-xs mt-1">10:30</p>
        </div>
      </div>

    </div>

    {/* Zone de saisie en bas */}
    <div className="bg-white border-t p-4 flex gap-3">
      <input
        type="text"
        placeholder="Écrire un message..."
        className="flex-1 p-3 border rounded-lg text-gray-700"
      />
      <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
        Envoyer
      </button>
    </div>

  </div>

</div>
    </div>
  )
}
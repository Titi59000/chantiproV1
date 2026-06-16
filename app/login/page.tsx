"use client"

// On importe Link depuis Next.js
import Link from "next/link"

export default function Login() {
  return (
    // Centrer le formulaire à l'écran
    <div className="flex items-center justify-center min-h-screen bg-gray-50">

      {/* La carte de connexion */}
      <div className="bg-white p-8 rounded-xl shadow w-96">

        {/* Le titre */}
        <h1 className="text-2xl font-bold text-green-600 text-center">
          ChantPro
        </h1>

        {/* Le sous titre */}
        <p className="text-gray-500 text-center mt-2">
          Connectez-vous à votre espace
        </p>

        {/* Le champ email */}
        <div className="mt-6">
          <label className="text-sm font-bold text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="votre@email.com"
            className="w-full mt-1 p-3 border rounded-lg text-gray-700"
          />
        </div>

        {/* Le champ mot de passe */}
        <div className="mt-4">
          <label className="text-sm font-bold text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full mt-1 p-3 border rounded-lg text-gray-700"
          />
        </div>

    {/* Le bouton redirige vers la page login */}
<Link href="/login">
  <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
    Commencer gratuitement
  </button>
</Link>
      </div>

    </div>
  )
}
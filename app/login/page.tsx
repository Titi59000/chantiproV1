"use client"
"use client"

// Import de Link pour naviguer
import Link from "next/link"
export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h1 className="text-2xl font-bold text-green-600 text-center">
          ChantPro
        </h1>
        <p className="text-gray-500 text-center mt-2">
          Connectez-vous à votre espace
        </p>
        <div className="mt-6">
          <label className="text-sm font-bold text-gray-700">Email</label>
          <input type="email" placeholder="votre@email.com" className="w-full mt-1 p-3 border rounded-lg text-gray-700" />
        </div>
        <div className="mt-4">
          <label className="text-sm font-bold text-gray-700">Mot de passe</label>
          <input type="password" placeholder="••••••••" className="w-full mt-1 p-3 border rounded-lg text-gray-700" />
        </div>
      {/* Le bouton redirige vers le dashboard */}
<Link href="/dashboard">
  <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold">
    Se connecter
  </button>
</Link>
      </div>
    </div>
  )
}
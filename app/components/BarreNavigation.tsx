"use client"

import Link from "next/link"
import { Calendar, Building2, MessageCircle, Camera, LayoutDashboard } from "lucide-react"
import { usePathname } from "next/navigation"

export default function BarreNavigation() {

  // On récupère le chemin actuel pour savoir quel onglet est actif
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-40">

      <Link
        href="/dashboard"
        className={`flex flex-col items-center ${pathname === "/dashboard" ? "text-green-600" : "text-gray-500"}`}>
        <LayoutDashboard size={24} />
        <span className="text-xs mt-1">Accueil</span>
      </Link>

      <Link
        href="/planning"
        className={`flex flex-col items-center ${pathname === "/planning" ? "text-green-600" : "text-gray-500"}`}>
        <Calendar size={24} />
        <span className="text-xs mt-1">Planning</span>
      </Link>

      <Link
        href="/chantiers"
        className={`flex flex-col items-center ${pathname === "/chantiers" ? "text-green-600" : "text-gray-500"}`}>
        <Building2 size={24} />
        <span className="text-xs mt-1">Chantiers</span>
      </Link>

      <Link
        href="/messagerie"
        className={`flex flex-col items-center ${pathname === "/messagerie" ? "text-green-600" : "text-gray-500"}`}>
        <MessageCircle size={24} />
        <span className="text-xs mt-1">Messages</span>
      </Link>

      <button className="flex flex-col items-center text-gray-500">
        <Camera size={24} />
        <span className="text-xs mt-1">Photos</span>
      </button>

    </div>
  )
}
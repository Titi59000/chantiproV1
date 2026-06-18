"use client"

import Link from "next/link"
import { Calendar, Building2, MessageCircle, Camera, LayoutDashboard } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLangue } from "../LangueContext"

export default function BarreNavigation() {

  const pathname = usePathname()
  const { t } = useLangue()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3 z-40">

      <Link
        href="/dashboard"
        className={`flex flex-col items-center ${pathname === "/dashboard" ? "text-green-600" : "text-gray-500"}`}>
        <LayoutDashboard size={24} />
        <span className="text-xs mt-1">{t("accueil")}</span>
      </Link>

      <Link
        href="/planning"
        className={`flex flex-col items-center ${pathname === "/planning" ? "text-green-600" : "text-gray-500"}`}>
        <Calendar size={24} />
        <span className="text-xs mt-1">{t("planning")}</span>
      </Link>

      <Link
        href="/chantiers"
        className={`flex flex-col items-center ${pathname === "/chantiers" ? "text-green-600" : "text-gray-500"}`}>
        <Building2 size={24} />
        <span className="text-xs mt-1">{t("chantiers")}</span>
      </Link>

      <Link
        href="/messagerie"
        className={`flex flex-col items-center ${pathname === "/messagerie" ? "text-green-600" : "text-gray-500"}`}>
        <MessageCircle size={24} />
        <span className="text-xs mt-1">{t("messages")}</span>
      </Link>

      <Link
        href="/photos"
        className={`flex flex-col items-center ${pathname === "/photos" ? "text-green-600" : "text-gray-500"}`}>
        <Camera size={24} />
        <span className="text-xs mt-1">{t("photos")}</span>
      </Link>

    </div>
  )
}
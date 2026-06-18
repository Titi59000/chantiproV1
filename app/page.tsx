"use client"

import Link from "next/link"
import { Building2, Clock, MessageCircle } from "lucide-react"
import { useLangue } from "./LangueContext"

export default function Home() {

  const { t } = useLangue()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">

      <h1 className="text-4xl font-bold text-green-600 text-center">
        {t("chantpro")}
      </h1>

      <p className="text-gray-500 mt-4 text-center">
        {t("slogan")}
      </p>

      <Link href="/login">
        <button className="mt-8 bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
          {t("commencer")}
        </button>
      </Link>

      <div className="flex flex-col md:flex-row gap-6 mt-16 w-full max-w-3xl">

        <div className="bg-white p-6 rounded-xl shadow flex-1">
          <Building2 className="text-green-600 mb-2" size={32} />
          <h2 className="font-bold text-gray-800">{t("chantiers")}</h2>
          <p className="text-gray-500 text-sm mt-2">{t("chantiersDesc")}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex-1">
          <Clock className="text-green-600 mb-2" size={32} />
          <h2 className="font-bold text-gray-800">{t("heures")}</h2>
          <p className="text-gray-500 text-sm mt-2">{t("heuresDesc")}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex-1">
          <MessageCircle className="text-green-600 mb-2" size={32} />
          <h2 className="font-bold text-gray-800">{t("messagerie")}</h2>
          <p className="text-gray-500 text-sm mt-2">{t("messagerieDesc")}</p>
        </div>

      </div>

    </div>
  )
}
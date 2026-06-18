"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import BarreNavigation from "../components/BarreNavigation"
import { useLangue } from "../LangueContext"

export default function Dashboard() {

  const { t } = useLangue()

  const [nbChantiers, setNbChantiers] = useState(0)
  const [nbEmployes, setNbEmployes] = useState(0)

  useEffect(() => {
    async function chargerStats() {
      const { count: countChantiers } = await supabase
        .from("chantiers")
        .select("*", { count: "exact" })
      setNbChantiers(countChantiers)

      const { count: countEmployes } = await supabase
        .from("employes")
        .select("*", { count: "exact" })
      setNbEmployes(countEmployes)
    }
    chargerStats()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">{t("chantpro")}</h1>
        <p className="text-gray-600">{t("bonjour")}, Diego 👷</p>
      </div>

      <div className="p-6">

        <div className="flex gap-4 mb-6">

          <Link href="/chantiers" className="flex-1">
            <div className="bg-white p-4 rounded-xl shadow text-center cursor-pointer hover:shadow-md">
              <p className="text-gray-500 text-sm">{t("chantiersActifs")}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{nbChantiers}</p>
            </div>
          </Link>

          <Link href="/employes" className="flex-1">
            <div className="bg-white p-4 rounded-xl shadow text-center cursor-pointer hover:shadow-md">
              <p className="text-gray-500 text-sm">{t("employes")}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{nbEmployes}</p>
            </div>
          </Link>

          <Link href="/planning" className="flex-1">
            <div className="bg-white p-4 rounded-xl shadow text-center cursor-pointer hover:shadow-md">
              <p className="text-gray-500 text-sm">{t("heures")}</p>
              <p className="text-3xl font-bold text-green-600 mt-1">312h</p>
            </div>
          </Link>

        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-4">{t("chantiersEnCours")}</h2>

        <div className="flex flex-col gap-3">

          <Link href="/chantiers">
            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center cursor-pointer hover:shadow-md">
              <div>
                <p className="font-bold text-gray-800">Rénovation Dupont</p>
                <p className="text-gray-500 text-sm">12 rue des Lilas, Nice</p>
              </div>
              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">{t("enCours")}</span>
            </div>
          </Link>

          <Link href="/chantiers">
            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center cursor-pointer hover:shadow-md">
              <div>
                <p className="font-bold text-gray-800">Toiture Martineau</p>
                <p className="text-gray-500 text-sm">8 av. Pasteur, Cannes</p>
              </div>
              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full">{t("enCours")}</span>
            </div>
          </Link>

          <Link href="/chantiers">
            <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center cursor-pointer hover:shadow-md">
              <div>
                <p className="font-bold text-gray-800">Électricité Moreau</p>
                <p className="text-gray-500 text-sm">3 bd Victor Hugo, Nice</p>
              </div>
              <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">{t("enPause")}</span>
            </div>
          </Link>

        </div>
      </div>

      <BarreNavigation />

    </div>
  )
}
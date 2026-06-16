"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Employes() {

  const [employes, setEmployes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [role, setRole] = useState("")
  const [telephone, setTelephone] = useState("")

  // Fonction pour ajouter un employé
  async function ajouterEmploye() {
    const { error } = await supabase
      .from("employes")
      .insert({ nom, prenom, role, telephone })
    if (!error) {
      setNom("")
      setPrenom("")
      setRole("")
      setTelephone("")
      setShowForm(false)
      const { data } = await supabase.from("employes").select("*")
      setEmployes(data)
    }
  }

  // Fonction pour supprimer un employé
  async function supprimerEmploye(id) {
    const { error } = await supabase
      .from("employes")
      .delete()
      .eq("id", id)
    if (!error) {
      const { data } = await supabase.from("employes").select("*")
      setEmployes(data)
    }
  }

  useEffect(() => {
    async function chargerEmployes() {
      const { data } = await supabase.from("employes").select("*")
      setEmployes(data)
    }
    chargerEmployes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
        <Link href="/dashboard">
          <button className="text-gray-500 text-sm">← Retour</button>
        </Link>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Employés</h2>
          <button onClick={() => setShowForm(true)} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
            + Ajouter un employé
          </button>
        </div>
        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow mb-6 mt-4">
            <h3 className="font-bold text-gray-800 mb-4">Nouvel employé</h3>
            <div className="flex flex-col gap-3">
              <input placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="p-3 border rounded-lg text-gray-700" />
              <input placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} className="p-3 border rounded-lg text-gray-700" />
              <input placeholder="Rôle" value={role} onChange={(e) => setRole(e.target.value)} className="p-3 border rounded-lg text-gray-700" />
              <input placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} className="p-3 border rounded-lg text-gray-700" />
              <div className="flex gap-3">
                <button onClick={ajouterEmploye} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold">Ajouter</button>
                <button onClick={() => setShowForm(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold">Annuler</button>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">
          {employes.map((employe) => (
            <div key={employe.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {employe.prenom[0]}{employe.nom[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{employe.prenom} {employe.nom}</p>
                  <p className="text-gray-500 text-sm">{employe.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="text-sm font-bold text-gray-800">{employe.telephone}</p>
                </div>
                <button onClick={() => supprimerEmploye(employe.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-bold">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
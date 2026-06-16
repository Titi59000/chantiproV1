"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Employes() {

  // On crée une variable pour stocker les employés
  const [employes, setEmployes] = useState([])
// Est-ce que le formulaire est visible ?
const [showForm, setShowForm] = useState(false)

// Les valeurs tapées dans le formulaire
const [nom, setNom] = useState("")
const [prenom, setPrenom] = useState("")
const [role, setRole] = useState("")
const [telephone, setTelephone] = useState("")
// Fonction pour ajouter un employé
async function ajouterEmploye() {
  
  // On envoie les données à Supabase
  const { error } = await supabase
    .from("employes")
    .insert({ nom, prenom, role, telephone })

  // Si pas d'erreur on recharge la liste
  if (!error) {
    // On vide le formulaire
    setNom("")
    setPrenom("")
    setRole("")
    setTelephone("")
    // On cache le formulaire
    setShowForm(false)
    // On recharge les employés
    const { data } = await supabase.from("employes").select("*")
    setEmployes(data)
  }
}
  // Au chargement de la page on récupère les employés
  useEffect(() => {
    async function chargerEmployes() {
      // On demande à Supabase les données de la table "employes"
      const { data } = await supabase.from("employes").select("*")
      // On stocke les données dans la variable
      setEmployes(data)
    }
    chargerEmployes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
        <Link href="/dashboard">
          <button className="text-gray-500 text-sm">← Retour</button>
        </Link>
      </div>

      <div className="p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Employés</h2>
          <button 
  onClick={() => setShowForm(true)}
  className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">
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
        {/* Liste des employés depuis la base de données */}
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
              <div className="text-right">
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="text-sm font-bold text-gray-800">{employe.telephone}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
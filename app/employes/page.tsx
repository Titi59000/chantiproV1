"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import BarreNavigation from "../components/BarreNavigation"

export default function Employes() {

  const [employes, setEmployes] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [nom, setNom] = useState("")
  const [prenom, setPrenom] = useState("")
  const [role, setRole] = useState("")
  const [telephone, setTelephone] = useState("")
  const [pin, setPin] = useState("")

  // Stocke l'employé dont on modifie les permissions
  const [employePermissions, setEmployePermissions] = useState(null)

  async function chargerEmployes() {
    const { data } = await supabase.from("employes").select("*")
    setEmployes(data)
  }

  async function ajouterEmploye() {
    const { error } = await supabase
      .from("employes")
      .insert({ nom, prenom, role, telephone, pin })
    if (!error) {
      setNom("")
      setPrenom("")
      setRole("")
      setTelephone("")
      setPin("")
      setShowForm(false)
      chargerEmployes()
    }
  }

  async function supprimerEmploye(id) {
    const { error } = await supabase
      .from("employes")
      .delete()
      .eq("id", id)
    if (!error) {
      chargerEmployes()
    }
  }

  // Changer une permission précise d'un employé
  async function changerPermission(employeId, champ, valeur) {
    const { error } = await supabase
      .from("employes")
      .update({ [champ]: valeur })
      .eq("id", employeId)
    if (!error) {
      chargerEmployes()
      // On met aussi à jour l'employé affiché dans le popup
      const employeMisAJour = employes.find(e => e.id === employeId)
      if (employeMisAJour) {
        setEmployePermissions({ ...employeMisAJour, [champ]: valeur })
      }
    }
  }

  useEffect(() => {
    chargerEmployes()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

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
              <input
                placeholder="Code PIN (4 chiffres)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                className="p-3 border rounded-lg text-gray-700"
              />
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
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="text-sm font-bold text-gray-800">{employe.telephone}</p>
                </div>
                <button
                  onClick={() => setEmployePermissions(employe)}
                  className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg text-sm font-bold">
                  Permissions
                </button>
                <button onClick={() => supprimerEmploye(employe.id)} className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm font-bold">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Popup permissions */}
      {employePermissions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow w-96">
            <h3 className="font-bold text-gray-800 mb-2">
              Permissions de {employePermissions.prenom} {employePermissions.nom}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Choisissez ce que cette personne peut faire
            </p>

            <div className="flex flex-col gap-3">

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={employePermissions.peut_modifier_planning || false}
                  onChange={(e) => changerPermission(employePermissions.id, "peut_modifier_planning", e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">Peut modifier le planning</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={employePermissions.peut_supprimer_employes || false}
                  onChange={(e) => changerPermission(employePermissions.id, "peut_supprimer_employes", e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">Peut supprimer des employés</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={employePermissions.peut_gerer_chantiers || false}
                  onChange={(e) => changerPermission(employePermissions.id, "peut_gerer_chantiers", e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">Peut gérer les chantiers</span>
              </label>

            </div>

            <button
              onClick={() => setEmployePermissions(null)}
              className="w-full mt-6 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold">
              Fermer
            </button>
          </div>
        </div>
      )}

      <BarreNavigation />

    </div>
  )
}
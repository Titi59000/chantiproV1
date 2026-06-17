"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"

export default function Messagerie() {

  // Pour l'instant on simule que c'est le patron (id spécial 0) qui est connecté
  const monId = 0

  const [employes, setEmployes] = useState([])
  const [contactActif, setContactActif] = useState(null)
  const [messages, setMessages] = useState([])
  const [nouveauMessage, setNouveauMessage] = useState("")

  // Charger la liste des employés
  async function chargerEmployes() {
    const { data } = await supabase.from("employes").select("*")
    setEmployes(data)
    // On sélectionne le premier employé par défaut
    if (data && data.length > 0 && !contactActif) {
      setContactActif(data[0])
    }
  }

  // Charger les messages avec le contact actif
  async function chargerMessages(contactId) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(`and(expediteur_id.eq.${monId},destinataire_id.eq.${contactId}),and(expediteur_id.eq.${contactId},destinataire_id.eq.${monId})`)
      .order("created_at", { ascending: true })
    setMessages(data)
  }

  // Envoyer un message
  async function envoyerMessage() {
    if (!nouveauMessage.trim()) return

    const { error } = await supabase
      .from("messages")
      .insert({
        expediteur_id: monId,
        destinataire_id: contactActif.id,
        contenu: nouveauMessage
      })

    if (!error) {
      setNouveauMessage("")
      chargerMessages(contactActif.id)
    }
  }

  useEffect(() => {
    chargerEmployes()
  }, [])

  useEffect(() => {
    if (contactActif) {
      chargerMessages(contactActif.id)
    }
  }, [contactActif])

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
        <Link href="/dashboard">
          <button className="text-gray-500 text-sm">← Retour</button>
        </Link>
      </div>

      <div className="flex h-screen">

        {/* Colonne gauche - liste des conversations */}
        <div className="w-64 bg-white border-r p-4">
          <h2 className="font-bold text-gray-800 mb-4">Messages</h2>

          {employes.map((employe) => (
            <div
              key={employe.id}
              onClick={() => setContactActif(employe)}
              className={`p-3 rounded-lg cursor-pointer mb-2 ${contactActif && contactActif.id === employe.id ? "bg-green-50" : "hover:bg-gray-50"}`}>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  {employe.prenom[0]}{employe.nom[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{employe.prenom} {employe.nom}</p>
                  <p className="text-gray-500 text-xs">{employe.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Colonne droite - les messages */}
        <div className="flex-1 flex flex-col">

          {/* Nom du contact en haut */}
          {contactActif && (
            <div className="bg-white border-b px-6 py-4">
              <p className="font-bold text-gray-800">{contactActif.prenom} {contactActif.nom}</p>
              <p className="text-gray-500 text-sm">{contactActif.role}</p>
            </div>
          )}

          {/* Les messages */}
          <div className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.expediteur_id === monId ? "justify-end" : ""}`}>
                <div className={`p-3 rounded-xl max-w-xs ${message.expediteur_id === monId ? "bg-green-600 text-white" : "bg-white shadow"}`}>
                  <p className="text-sm">{message.contenu}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Zone de saisie en bas */}
          <div className="bg-white border-t p-4 flex gap-3">
            <input
              type="text"
              placeholder="Écrire un message..."
              value={nouveauMessage}
              onChange={(e) => setNouveauMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && envoyerMessage()}
              className="flex-1 p-3 border rounded-lg text-gray-700"
            />
            <button
              onClick={envoyerMessage}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold">
              Envoyer
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}
"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "../../supabase"
import BarreNavigation from "../components/BarreNavigation"

export default function Messagerie() {

  const [monId, setMonId] = useState(null)
  const [monNom, setMonNom] = useState("")

  const [employes, setEmployes] = useState([])
  const [contactActif, setContactActif] = useState(null)
  const [messages, setMessages] = useState([])
  const [nouveauMessage, setNouveauMessage] = useState("")
  const [showNouveauMessage, setShowNouveauMessage] = useState(false)

  useEffect(() => {
    const id = localStorage.getItem("employeId")
    const nom = localStorage.getItem("employeNom")
    setMonId(id)
    setMonNom(nom || "Patron")
  }, [])

  async function chargerEmployes() {
    const { data } = await supabase.from("employes").select("*")

    const autresPersonnes = data.filter(e => String(e.id) !== String(monId))

    const listeComplete = [
      { id: "0", prenom: monId === "0" ? monNom : "Patron", nom: "", role: "Patron" },
      ...autresPersonnes
    ].filter(p => String(p.id) !== String(monId))

    setEmployes(listeComplete)

    if (listeComplete.length > 0 && !contactActif) {
      setContactActif(listeComplete[0])
    }
  }

  async function chargerMessages(contactId) {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(`and(expediteur_id.eq.${monId},destinataire_id.eq.${contactId}),and(expediteur_id.eq.${contactId},destinataire_id.eq.${monId})`)
      .order("created_at", { ascending: true })
    setMessages(data)
  }

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

  function choisirDestinataire(personne) {
    setContactActif(personne)
    setShowNouveauMessage(false)
  }

  useEffect(() => {
    if (monId !== null) {
      chargerEmployes()
    }
  }, [monId])

  useEffect(() => {
    if (contactActif && monId !== null) {
      chargerMessages(contactActif.id)
    }
  }, [contactActif, monId])

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-600">ChantPro</h1>
        <p className="text-gray-500 text-sm">Connecté : {monNom}</p>
      </div>

      <div className="flex" style={{ height: "calc(100vh - 150px)" }}>

        <div className="w-64 bg-white border-r p-4 overflow-y-auto">
          <h2 className="font-bold text-gray-800 mb-4">Messages</h2>

          <button
            onClick={() => setShowNouveauMessage(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-bold mb-4">
            + Nouveau message
          </button>

          {employes.map((employe) => (
            <div
              key={employe.id}
              onClick={() => setContactActif(employe)}
              className={`p-3 rounded-lg cursor-pointer mb-2 ${contactActif && contactActif.id === employe.id ? "bg-green-50" : "hover:bg-gray-50"}`}>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
                  {employe.prenom[0]}{employe.nom ? employe.nom[0] : ""}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{employe.prenom} {employe.nom}</p>
                  <p className="text-gray-500 text-xs">{employe.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 flex flex-col">

          {contactActif && (
            <div className="bg-white border-b px-6 py-4">
              <p className="font-bold text-gray-800">{contactActif.prenom} {contactActif.nom}</p>
              <p className="text-gray-500 text-sm">{contactActif.role}</p>
            </div>
          )}

          <div className="flex-1 p-6 flex flex-col gap-3 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${String(message.expediteur_id) === String(monId) ? "justify-end" : ""}`}>
                <div className={`p-3 rounded-xl max-w-xs ${String(message.expediteur_id) === String(monId) ? "bg-green-600 text-white" : "bg-white shadow"}`}>
                  <p className="text-sm">{message.contenu}</p>
                </div>
              </div>
            ))}
          </div>

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

      {showNouveauMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow w-96">
            <h3 className="font-bold text-gray-800 mb-4">Nouveau message</h3>
            <p className="text-sm text-gray-500 mb-3">Choisir un destinataire :</p>

            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {employes.map((employe) => (
                <div
                  key={employe.id}
                  onClick={() => choisirDestinataire(employe)}
                  className="p-3 rounded-lg cursor-pointer hover:bg-gray-50 flex items-center gap-3">
                  <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    {employe.prenom[0]}{employe.nom ? employe.nom[0] : ""}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{employe.prenom} {employe.nom}</p>
                    <p className="text-gray-500 text-xs">{employe.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowNouveauMessage(false)}
              className="w-full mt-4 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold">
              Annuler
            </button>
          </div>
        </div>
      )}

      <BarreNavigation />

    </div>
  )
}
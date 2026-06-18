"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { traductions } from "./traductions"

// On crée le Context (la "boîte" qui va contenir la langue actuelle)
const LangueContext = createContext()

// Ce composant va envelopper toute l'application pour partager la langue
export function LangueProvider({ children }) {

  const [langue, setLangue] = useState("fr")

  // Au premier chargement, on détecte la langue du téléphone ou on récupère le choix sauvegardé
  useEffect(() => {
    const langueSauvegardee = localStorage.getItem("langue")

    if (langueSauvegardee) {
      // Si l'utilisateur avait déjà choisi une langue, on la reprend
      setLangue(langueSauvegardee)
    } else {
      // Sinon, on détecte la langue du navigateur/téléphone
      const langueNavigateur = navigator.language.slice(0, 2)
      const languesDisponibles = ["fr", "en", "it", "ru", "pt"]

      if (languesDisponibles.includes(langueNavigateur)) {
        setLangue(langueNavigateur)
      } else {
        setLangue("en") // Par défaut anglais si la langue n'est pas dans notre liste
      }
    }
  }, [])

  // Fonction pour changer de langue manuellement
  function changerLangue(nouvelleLangue) {
    setLangue(nouvelleLangue)
    localStorage.setItem("langue", nouvelleLangue)
  }

  // Fonction "t" (traduire) - va chercher le bon texte selon la langue actuelle
  function t(cle) {
    return traductions[langue][cle] || cle
  }

  return (
    <LangueContext.Provider value={{ langue, changerLangue, t }}>
      {children}
    </LangueContext.Provider>
  )
}

// Hook personnalisé pour utiliser facilement le Context dans n'importe quelle page
export function useLangue() {
  return useContext(LangueContext)
}
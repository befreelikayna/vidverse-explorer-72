
import { useState, useEffect } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Base translations
const translations: Translations = {
  en: {
    home: "Home",
    admin: "Admin",
    login: "Login",
    signup: "Sign Up",
    chat: "Chat",
    search: "Search videos...",
    business: "Business Inquiries",
    latestVideos: "Latest Videos",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    logout: "Logout",
    downloadApp: "Download App"
  },
  es: {
    home: "Inicio",
    admin: "Administrador",
    login: "Iniciar Sesión",
    signup: "Registrarse",
    chat: "Chat",
    search: "Buscar videos...",
    business: "Consultas de Negocios",
    latestVideos: "Últimos Videos",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    logout: "Cerrar Sesión",
    downloadApp: "Descargar App"
  },
  fr: {
    home: "Accueil",
    admin: "Admin",
    login: "Connexion",
    signup: "S'inscrire",
    chat: "Chat",
    search: "Rechercher des vidéos...",
    business: "Demandes Professionnelles",
    latestVideos: "Dernières Vidéos",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    logout: "Déconnexion",
    downloadApp: "Télécharger l'App"
  },
  // Add more languages as needed
};

export const useTranslation = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    // Auto-detect browser language
    const detectLanguage = () => {
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setLanguage(browserLang);
        localStorage.setItem('userLanguage', browserLang);
      }
    };

    detectLanguage();
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // We no longer expose changeLanguage as it's now automatic
  return { t, language };
};

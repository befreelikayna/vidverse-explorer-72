
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
    lightMode: "Light Mode"
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
    lightMode: "Modo Claro"
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
    lightMode: "Mode Clair"
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

    const savedLang = localStorage.getItem('userLanguage');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    } else {
      detectLanguage();
    }
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguage(lang);
      localStorage.setItem('userLanguage', lang);
    }
  };

  const getAvailableLanguages = () => {
    return Object.keys(translations);
  };

  return { t, language, changeLanguage, getAvailableLanguages };
};

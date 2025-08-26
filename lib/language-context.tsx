'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import default English messages statically
import enMessages from '../public/messages/en.json';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<any>(enMessages);

  useEffect(() => {
    // Load messages for the current language
    const loadMessages = async () => {
      try {
        const response = await fetch(`/messages/${language}.json`);
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Failed to load messages:', error);
        // Fallback to English messages
        setMessages(enMessages);
      }
    };

    if (language !== 'en') {
      loadMessages();
    }
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value = messages;
    
    // Debug logging for specific keys
    if (key.includes('homeProducts')) {
      console.log('Translation debug for key:', key);
      console.log('Messages object:', messages);
      console.log('Keys array:', keys);
    }
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
        if (key.includes('homeProducts')) {
          console.log(`After key "${k}":`, value);
        }
      } else {
        if (key.includes('homeProducts')) {
          console.log('Translation failed at key:', k, 'value was:', value);
        }
        return key; // Return key if translation not found
      }
    }
    
    const result = typeof value === 'string' ? value : key;
    if (key.includes('homeProducts')) {
      console.log('Final result:', result);
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
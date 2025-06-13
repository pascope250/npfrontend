'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
export interface Quotes {
 quote: string;
 category: string;
}


export interface QuoteContextType {
  Quotes: Quotes[];
  loading: boolean;
  error: string | null;
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [Quotes, setQuotes] = useState<Quotes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/quotes');
      if (!res.ok) throw new Error('Failed to fetch quotes');
      const data = await res.json();
      
      setQuotes(data.data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchQuotes();
}, []);


  return (
    <QuoteContext.Provider value={{ Quotes, loading, error }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuoteContext = () => {
  const context = useContext(QuoteContext);
  if (!context) throw new Error('useQuoteContext must be used within a MovieProvider');
  return context;
};

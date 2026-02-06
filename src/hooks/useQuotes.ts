import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { Quote, Person } from '../types';

const STORAGE_KEY = 'quotebook_quotes';
const COLLECTION_NAME = 'quotes';

export function useQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFirebase, setUsingFirebase] = useState(false);

  // Check if Firebase is properly configured
  useEffect(() => {
    if (isFirebaseConfigured()) {
      setUsingFirebase(true);
      // Subscribe to real-time updates from Firestore
      const q = query(collection(db, COLLECTION_NAME), orderBy('timestamp', 'desc'));
      
      const unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const quotesData: Quote[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            quotesData.push({
              id: doc.id,
              text: data.text,
              speaker: data.speaker,
              addedBy: data.addedBy,
              timestamp: data.timestamp instanceof Timestamp 
                ? data.timestamp.toMillis() 
                : data.timestamp || Date.now(),
            });
          });
          setQuotes(quotesData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error('Firestore error:', err);
          setError('Failed to connect to database. Check your Firebase config.');
          setLoading(false);
          // Fallback to localStorage
          loadFromLocalStorage();
        }
      );

      return () => unsubscribe();
    } else {
      // Use localStorage as fallback
      setUsingFirebase(false);
      loadFromLocalStorage();
      setLoading(false);
    }
  }, []);

  const loadFromLocalStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setQuotes(JSON.parse(stored));
      } catch {
        setQuotes([]);
      }
    }
  };

  const saveToLocalStorage = useCallback((newQuotes: Quote[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newQuotes));
    setQuotes(newQuotes);
  }, []);

  const addQuote = useCallback(async (text: string, speaker: string, addedBy: string) => {
    const newQuote = {
      text,
      speaker: speaker.trim(),
      addedBy: addedBy.trim(),
      timestamp: Date.now(),
    };

    if (usingFirebase && isFirebaseConfigured()) {
      try {
        await addDoc(collection(db, COLLECTION_NAME), {
          ...newQuote,
          timestamp: serverTimestamp(),
        });
      } catch (err) {
        console.error('Error adding quote:', err);
        setError('Failed to add quote. Please try again.');
      }
    } else {
      // Fallback to localStorage
      const quoteWithId: Quote = {
        ...newQuote,
        id: crypto.randomUUID(),
      };
      saveToLocalStorage([quoteWithId, ...quotes]);
    }
  }, [quotes, usingFirebase, saveToLocalStorage]);

  const deleteQuote = useCallback(async (id: string) => {
    if (usingFirebase && isFirebaseConfigured()) {
      try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
      } catch (err) {
        console.error('Error deleting quote:', err);
        setError('Failed to delete quote. Please try again.');
      }
    } else {
      saveToLocalStorage(quotes.filter(q => q.id !== id));
    }
  }, [quotes, usingFirebase, saveToLocalStorage]);

  const getPeople = useCallback((): Person[] => {
    const speakerMap = new Map<string, number>();
    quotes.forEach(q => {
      const count = speakerMap.get(q.speaker) || 0;
      speakerMap.set(q.speaker, count + 1);
    });
    return Array.from(speakerMap.entries())
      .map(([name, quoteCount]) => ({ name, quoteCount }))
      .sort((a, b) => b.quoteCount - a.quoteCount);
  }, [quotes]);

  const getQuotesBySpeaker = useCallback((speaker: string): Quote[] => {
    return quotes.filter(q => q.speaker === speaker);
  }, [quotes]);

  const exportData = useCallback(() => {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotebook_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [quotes]);

  const importData = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported)) {
          const validQuotes = imported.filter(q => 
            q.text && q.speaker && q.addedBy
          );
          
          if (usingFirebase && isFirebaseConfigured()) {
            // Add each quote to Firestore
            for (const quote of validQuotes) {
              await addDoc(collection(db, COLLECTION_NAME), {
                text: quote.text,
                speaker: quote.speaker,
                addedBy: quote.addedBy,
                timestamp: quote.timestamp || serverTimestamp(),
              });
            }
          } else {
            // Add to localStorage with new IDs
            const quotesWithIds = validQuotes.map(q => ({
              ...q,
              id: q.id || crypto.randomUUID(),
              timestamp: q.timestamp || Date.now(),
            }));
            saveToLocalStorage([...quotesWithIds, ...quotes]);
          }
        }
      } catch {
        alert('Invalid file format');
      }
    };
    reader.readAsText(file);
  }, [quotes, usingFirebase, saveToLocalStorage]);

  return {
    quotes,
    loading,
    error,
    usingFirebase,
    addQuote,
    deleteQuote,
    getPeople,
    getQuotesBySpeaker,
    exportData,
    importData,
  };
}

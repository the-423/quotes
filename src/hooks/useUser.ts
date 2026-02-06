import { useState, useEffect, useCallback } from 'react';
import { UserProfile } from '../types';

const STORAGE_KEY = 'quotebook_user';

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const saveUser = useCallback((profile: UserProfile) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
  }, []);

  const setUsername = useCallback((name: string) => {
    const profile: UserProfile = user ? {
      ...user,
      name,
    } : {
      name,
      gamesPlayed: 0,
      totalScore: 0,
      bestScore: 0,
    };
    saveUser(profile);
  }, [user, saveUser]);

  const recordGameScore = useCallback((score: number) => {
    if (!user) return;
    const updated: UserProfile = {
      ...user,
      gamesPlayed: user.gamesPlayed + 1,
      totalScore: user.totalScore + score,
      bestScore: Math.max(user.bestScore, score),
    };
    saveUser(updated);
  }, [user, saveUser]);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return {
    user,
    setUsername,
    recordGameScore,
    logout,
  };
}

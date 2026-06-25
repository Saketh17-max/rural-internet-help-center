'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, addDoc, getDocs, query, where, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type UserRole = 'citizen' | 'worker' | 'employer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  userId: string; // WRK000145, EMP000321, etc.
  verified: boolean;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  register: (data: Partial<User> & { password: string }) => Promise<{ success: boolean; userId: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function generateId(role: UserRole): string {
  const prefix = role === 'worker' ? 'WRK' : role === 'employer' ? 'EMP' : 'CTZ';
  const num = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}${num}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('rihc-user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'mock-project') {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data() as User;
          const loggedIn = { ...userData, id: snapshot.docs[0].id };
          setUser(loggedIn);
          localStorage.setItem('rihc-user', JSON.stringify(loggedIn));
          return true;
        }
      }

      // Fallback local login if Firebase not configured or user not found but demo pwd used
      if (password === 'demo123') {
        const loggedIn = {
          id: Date.now().toString(),
          name: 'Demo User',
          email,
          mobile: email,
          role,
          userId: generateId(role),
          verified: false,
        };
        setUser(loggedIn);
        localStorage.setItem('rihc-user', JSON.stringify(loggedIn));
        return true;
      }
      return false;
    } catch (e) {
      console.error("Login error:", e);
      return false;
    }
  };

  const register = async (data: Partial<User> & { password: string }): Promise<{ success: boolean; userId: string }> => {
    const userId = generateId(data.role || 'citizen');
    const newUser: any = {
      name: data.name || 'New User',
      email: data.email || '',
      mobile: data.mobile || '',
      role: data.role || 'citizen',
      userId,
      verified: false,
      createdAt: serverTimestamp()
    };

    try {
      if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'mock-project') {
        const docRef = await addDoc(collection(db, 'users'), newUser);
        newUser.id = docRef.id;
        
        // Also add to workers/employers specific collection if applicable
        if (data.role === 'worker') {
          await addDoc(collection(db, 'workers'), { ...newUser, skills: [], availability: 'Available Now' });
        } else if (data.role === 'employer') {
          await addDoc(collection(db, 'employers'), { ...newUser, companyName: '' });
        }
      } else {
        newUser.id = Date.now().toString();
      }

      setUser(newUser as User);
      localStorage.setItem('rihc-user', JSON.stringify(newUser));
      return { success: true, userId };
    } catch (e) {
      console.error("Register error:", e);
      return { success: false, userId: '' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rihc-user');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('rihc-user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { collection, onSnapshot, query, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

interface DatabaseContextType {
  users: any[];
  workers: any[];
  employers: any[];
  jobs: any[];
  surveys: any[];
  applications: any[];
  testimonials: any[];
  addDocument: (collectionName: string, data: any) => Promise<void>;
  updateDocument: (collectionName: string, id: string, data: any) => Promise<void>;
  deleteDocument: (collectionName: string, id: string) => Promise<void>;
  isLoading: boolean;
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<any[]>([]);
  const [workers, setWorkers] = useState<any[]>([]);
  const [employers, setEmployers] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [surveys, setSurveys] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only attempt to connect to Firestore if we have a real Project ID
    // Otherwise, we remain in an "empty" state until the user configures Firebase
    if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID !== 'mock-project') {
      const unsubUsers = onSnapshot(collection(db, 'users'), (snapshot) => setUsers(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubWorkers = onSnapshot(collection(db, 'workers'), (snapshot) => setWorkers(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubEmployers = onSnapshot(collection(db, 'employers'), (snapshot) => setEmployers(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubJobs = onSnapshot(collection(db, 'jobs'), (snapshot) => setJobs(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubSurveys = onSnapshot(collection(db, 'surveys'), (snapshot) => setSurveys(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubApps = onSnapshot(collection(db, 'applications'), (snapshot) => setApplications(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
      const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => setTestimonials(snapshot.docs.map(d => ({ id: d.id, ...d.data() }))));
      
      setIsLoading(false);

      return () => {
        unsubUsers();
        unsubWorkers();
        unsubEmployers();
        unsubJobs();
        unsubSurveys();
        unsubApps();
        unsubTestimonials();
      };
    } else {
      setIsLoading(false); // Stay empty if not configured
    }
  }, []);

  const addDocument = async (collectionName: string, data: any) => {
    try {
      if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID === 'mock-project') {
        toast.error('Firebase not configured. Check .env.local');
        return;
      }
      await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp()
      });
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to add document: ' + error.message);
    }
  };

  const updateDocument = async (collectionName: string, id: string, data: any) => {
    try {
      await updateDoc(doc(db, collectionName, id), {
        ...data,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to update document');
    }
  };

  const deleteDocument = async (collectionName: string, id: string) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
    } catch (error: any) {
      console.error(error);
      toast.error('Failed to delete document');
    }
  };

  return (
    <DatabaseContext.Provider value={{ users, workers, employers, jobs, surveys, applications, testimonials, addDocument, updateDocument, deleteDocument, isLoading }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const ctx = useContext(DatabaseContext);
  if (!ctx) throw new Error('useDatabase must be used within DatabaseProvider');
  return ctx;
}

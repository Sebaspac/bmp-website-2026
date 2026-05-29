import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ScrollToTop from '@/components/layout/ScrollToTop';
import Home from '@/pages/Home';
import Participation from '@/pages/Participation';
import About from '@/pages/About';
import Preistraeger from '@/pages/Preistraeger';
import PreistraegerDetail from '@/pages/PreistraegerDetail';
import Press from '@/pages/Press';
import EventDetail from './pages/EventDetail';
import BlogDetail from './pages/BlogDetail';
import Contact from '@/pages/Contact';
import FormularUpload from '@/pages/FormularUpload';
import Netzwerk from '@/pages/Netzwerk';
import MitgliedWerden from '@/pages/MitgliedWerden';
import Datenschutz from '@/pages/Datenschutz';
import Impressum from '@/pages/Impressum';
import LoginGate from '@/components/LoginGate';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Basic loading simulation for splash
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[1000] bg-primary flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-2 border-accent/20 border-t-accent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-accent font-display font-bold text-2xl">BMP</span>
          </div>
        </div>
        <div className="mt-8 text-white/40 uppercase tracking-[0.4em] text-[10px] font-bold animate-pulse">
          Exzellenz wird geladen...
        </div>
      </div>
    );
  }

  return (
    <LoginGate>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teilnahme" element={<Participation />} />
          <Route path="/preistraeger" element={<Preistraeger />} />
          <Route path="/preistraeger/:slug" element={<PreistraegerDetail />} />
          <Route path="/der-bmp" element={<About />} />
          <Route path="/netzwerk" element={<Netzwerk />} />
          <Route path="/presse" element={<Press />} />
          <Route path="/presse/events/:slug" element={<EventDetail />} />
          <Route path="/presse/blog/:slug" element={<BlogDetail />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/formular-hochladen" element={<FormularUpload />} />
          <Route path="/mitglied-werden" element={<MitgliedWerden />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/impressum" element={<Impressum />} />
          {/* Fallback to home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </LoginGate>
  );
};

export default App;

import React from 'react';
import MotionOrchestrator from './animations/MotionOrchestrator';
import Header from './components/Header';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import Products from './components/Products';
import Fabrication from './components/Fabrication';
import Projects from './components/Projects';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <main className="bg-graphite min-h-screen text-off-white selection:bg-safety-orange selection:text-white cursor-none">
      <MotionOrchestrator />
      <CustomCursor />
      <div className="film-grain"></div>
      
      <Header />
      
      <Hero />
      <Capabilities />
      <Products />
      <Fabrication />
      <Projects />
      <Trust />
      <Contact />
      <Footer />
    </main>
  );
}

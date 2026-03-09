import { useEffect } from 'react';
import { Cursor } from './components/Cursor';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { Expertise } from './components/Expertise';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'CruStudio.dev — Wine Industry Digital';
  }, []);

  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <About />
      <Services />
      <Work />
      <Expertise />
      <Contact />
      <Footer />
    </>
  );
}

export default App;

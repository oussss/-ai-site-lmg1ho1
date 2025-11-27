import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/react-lenis';
import { ArrowRight, Menu, X, ArrowUpRight, Zap, Layers, Cpu } from 'lucide-react';

// --- Custom Cursor ---
const CustomCursor = () => {
  const cursorDot = useRef(null);
  const cursorOutline = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      if (cursorDot.current) {
        cursorDot.current.style.left = `${clientX}px`;
        cursorDot.current.style.top = `${clientY}px`;
      }
      if (cursorOutline.current) {
        cursorOutline.current.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <div ref={cursorDot} className="cursor-dot fixed top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2 z-50 mix-blend-difference" />
      <div ref={cursorOutline} className="cursor-outline fixed top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2 z-40" />
    </div>
  );
};

// --- Navigation ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location]);

  return (
    <nav className="fixed w-full z-40 top-0 px-6 py-6 mix-blend-difference text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-display font-bold text-2xl tracking-tighter">
          PIXEL<span className="text-brand-yellow">&</span>CO
        </Link>
        
        <div className="hidden md:flex gap-12 font-medium tracking-wide text-sm">
          {['About', 'Services', 'Contact'].map((item) => (
            <Link key={item} to={`/${item.toLowerCase()}`} className="hover:text-brand-yellow transition-colors duration-300 uppercase">
              {item}
            </Link>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-gray-800 p-6 flex flex-col gap-4 md:hidden"
          >
            {['Home', 'About', 'Services', 'Contact'].map((item) => (
              <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-2xl font-display font-bold uppercase">
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Components ---
const AnimatedTitle = ({ children, className }) => (
  <motion.h1
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    className={`font-display font-bold ${className}`}
  >
    {children}
  </motion.h1>
);

const Button = ({ children, to }) => (
  <Link to={to} className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-wider overflow-hidden hover:bg-brand-yellow transition-colors duration-300">
    <span className="relative z-10">{children}</span>
    <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </Link>
);

// --- Pages ---
const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen pt-32">
      {/* Hero */}
      <section className="relative h-[80vh] flex flex-col justify-center px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow rounded-full blur-[120px] opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-900 rounded-full blur-[120px] opacity-20 animate-blob animation-delay-2000" />
        
        <motion.div style={{ y: y1 }} className="relative z-10">
          <p className="text-brand-yellow font-mono mb-4 tracking-widest">EST. 2024</p>
          <AnimatedTitle className="text-6xl md:text-9xl leading-[0.9] mb-8">
            DIGITAL <br />
            <span className="text-stroke">ALCHEMY</span>
          </AnimatedTitle>
          <p className="max-w-xl text-gray-400 text-lg md:text-xl mb-10">
            We blend bold strategy with pixel-perfect design to create unforgettable digital experiences for the next generation of brands.
          </p>
          <Button to="/contact">Start Project</Button>
        </motion.div>
      </section>

      {/* Selected Works Marquee-ish */}
      <section className="py-24 border-t border-gray-900">
        <div className="px-6 max-w-7xl mx-auto">
          <h2 className="text-xs font-mono text-gray-500 mb-12 uppercase">Selected Works</h2>
          <div className="grid gap-12 md:gap-32">
            {[1, 2, 3].map((item, index) => (
              <motion.div 
                key={item}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden h-[400px] md:h-[600px] bg-gray-900 mb-6">
                  <img 
                    src={`https://source.unsplash.com/random/1200x800?tech,minimal,${index}`} 
                    alt="Case Study" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-8 left-8">
                    <h3 className="text-4xl font-display font-bold">Project {item}</h3>
                    <p className="text-brand-yellow font-mono">Web Design • Branding</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Services = () => {
  const services = [
    { title: "Brand Identity", icon: <Zap />, desc: "Logos, typography, and visual systems that stick." },
    { title: "Web Design", icon: <Layers />, desc: "High-performance, award-winning web experiences." },
    { title: "Motion & 3D", icon: <Cpu />, desc: "Scroll-stopping animations and immersive environments." }
  ];

  return (
    <div className="min-h-screen pt-40 px-6 max-w-7xl mx-auto">
      <AnimatedTitle className="text-5xl md:text-8xl mb-24">OUR EXPERTISE</AnimatedTitle>
      <div className="grid gap-8">
        {services.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group border-t border-gray-800 py-12 hover:bg-gray-900/30 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <span className="text-brand-yellow">{s.icon}</span>
                <h3 className="text-3xl md:text-5xl font-display font-bold group-hover:translate-x-4 transition-transform duration-300">{s.title}</h3>
              </div>
              <p className="text-gray-400 max-w-sm">{s.desc}</p>
              <ArrowUpRight className="hidden md:block w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const About = () => (
  <div className="min-h-screen pt-40 px-6 max-w-7xl mx-auto">
    <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 aspect-square overflow-hidden relative"
      >
        <img src="https://source.unsplash.com/random/800x800?office,modern" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700" alt="Agency" />
      </motion.div>
      <div>
        <p className="text-brand-yellow font-mono mb-4">WHO WE ARE</p>
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
          WE DON'T JUST DESIGN.<br />WE DEFINE.
        </h2>
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Pixel & Co was born from a desire to break the mold. We are a collective of designers, developers, and strategists obsessed with quality. We work with ambitious startups to build digital products that look expensive and feel effortless.
        </p>
        <div className="grid grid-cols-2 gap-8 font-mono text-sm">
          <div>
            <span className="block text-3xl font-bold text-white mb-2">50+</span>
            <span className="text-gray-500">Projects Launched</span>
          </div>
          <div>
            <span className="block text-3xl font-bold text-white mb-2">12</span>
            <span className="text-gray-500">Design Awards</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="min-h-screen pt-40 px-6 max-w-7xl mx-auto flex flex-col justify-between">
    <div className="grid md:grid-cols-2 gap-16">
      <div>
        <AnimatedTitle className="text-5xl md:text-8xl mb-12">LET'S TALK</AnimatedTitle>
        <p className="text-xl text-gray-400 max-w-md mb-12">
          Ready to disrupt the market? Tell us about your project and let's build something loud.
        </p>
        <div className="space-y-4 font-mono text-gray-500">
          <p>hello@pixelandco.agency</p>
          <p>+1 (555) 000-0000</p>
          <p>San Francisco, CA</p>
        </div>
      </div>
      
      <form className="space-y-8">
        <div className="group">
          <label className="block text-xs font-mono text-brand-yellow mb-2">NAME</label>
          <input type="text" className="w-full bg-transparent border-b border-gray-700 py-4 text-xl focus:outline-none focus:border-brand-yellow transition-colors" placeholder="John Doe" />
        </div>
        <div className="group">
          <label className="block text-xs font-mono text-brand-yellow mb-2">EMAIL</label>
          <input type="email" className="w-full bg-transparent border-b border-gray-700 py-4 text-xl focus:outline-none focus:border-brand-yellow transition-colors" placeholder="john@startup.com" />
        </div>
        <div className="group">
          <label className="block text-xs font-mono text-brand-yellow mb-2">PROJECT DETAILS</label>
          <textarea rows="4" className="w-full bg-transparent border-b border-gray-700 py-4 text-xl focus:outline-none focus:border-brand-yellow transition-colors" placeholder="I need a killer website..." />
        </div>
        <button className="w-full py-6 bg-white text-black font-bold uppercase tracking-widest hover:bg-brand-yellow transition-colors duration-300">
          Send Request
        </button>
      </form>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-gray-900/50 py-12 px-6 border-t border-gray-800">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end">
      <h2 className="text-8xl md:text-[12rem] font-display font-bold leading-none text-gray-800 select-none">PIXEL</h2>
      <div className="flex gap-8 font-mono text-sm text-gray-400 mt-8 md:mt-0">
        <a href="#" className="hover:text-brand-yellow">INSTAGRAM</a>
        <a href="#" className="hover:text-brand-yellow">TWITTER</a>
        <a href="#" className="hover:text-brand-yellow">LINKEDIN</a>
      </div>
    </div>
  </footer>
);

// --- Main App --- //
function App() {
  return (
    <Lenis root>
      <div className="bg-black text-white min-h-screen selection:bg-brand-yellow selection:text-black overflow-hidden">
        <CustomCursor />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Lenis>
  );
}

export default App;
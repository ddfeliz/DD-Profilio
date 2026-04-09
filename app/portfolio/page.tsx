"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, animate, useInView, Variants, useScroll } from "framer-motion";
import { Sun, Moon, Terminal, Settings, MapPin, Mail, Activity, Users, Zap, Landmark, CheckCircle2, Loader2, Code2, Database, Layers, Server, Cpu, FolderGit2, ExternalLink, GraduationCap, Award, BookOpen, Globe2, Radio, User, MessageSquare, Send, Crosshair, Fingerprint, Scan, QrCode, FileDown } from "lucide-react";
import { translations, Language } from "./translations";
import "./portfolio.css";

function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(20px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedPercentage({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, target, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) ref.current.textContent = `${Math.round(value)}%`;
        }
      });
      return () => controls.stop();
    } else if (!isInView && ref.current) {
      ref.current.textContent = "0%";
    }
  }, [isInView, target]);

  return <span ref={ref} className="absolute font-headline font-bold text-xl">0%</span>;
}

function StaggerText({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: delay } }
  };
  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)", rotateX: -90 },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", rotateX: 0, transition: { duration: 0.6, type: "spring", bounce: 0.4 } }
  };
  return (
    <motion.span variants={containerVariants} initial="hidden" animate="visible" className={`inline-block ${className}`} style={{ perspective: 1000 }}>
      {text.split('').map((char, i) => (
        <motion.span key={i} variants={letterVariants} className="inline-block" style={{ transformOrigin: "bottom" }}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function PortfolioPage() {
  const [isDark, setIsDark] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState('theme-cyan');
  const [activeTab, setActiveTab] = useState('home');
  const [profileImg, setProfileImg] = useState('/profile.jpeg');
  
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  const [heroKey, setHeroKey] = useState(0);
  const settingsRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Close settings modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    };
    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [settingsOpen]);

  useEffect(() => {
    const interval = setInterval(() => setHeroKey(k => k + 1), 8000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollHeight) {
        const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
        if (isBottom) {
          setActiveTab('contact');
          return;
        }
      }
      const sections = ['home', 'education', 'experience', 'skills', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2.5) {
            setActiveTab(id === 'education' ? 'edu' : id === 'experience' ? 'exp' : id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: string) => {
    setActiveTab(item);
    const elementId = item === 'edu' ? 'education' : item === 'exp' ? 'experience' : item;
    document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`portfolio-wrapper min-h-screen selection:bg-port-primary-container selection:text-port-bg ${isDark ? "dark" : ""} ${theme}`}>
      
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full rounded-none bg-[var(--port-nav-bg)]/85 backdrop-blur-xl z-50 border-b border-[var(--port-primary-container)]/30 shadow-[0_5px_30px_rgba(0,0,0,0.5)] transition-all">
        {/* Subtle top decoration */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--port-primary-container)] to-transparent opacity-50"></div>
        
        <div className="flex justify-between items-center w-full px-8 py-4 max-w-full relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-widest text-port-on-surface font-headline flex items-center gap-3 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <span className="text-[var(--port-primary-container)] opacity-70 group-hover:opacity-100 transition-opacity font-mono">{"<"}</span>
            i-PORTFOLIO
            <span className="text-[var(--port-primary-container)] opacity-70 group-hover:opacity-100 animate-pulse transition-opacity font-mono">{"_"}</span>
          </motion.div>
          <div className="hidden md:flex gap-6 items-center bg-[var(--port-surface-low)]/50 px-8 py-2.5 rounded-full border border-port-outline-variant/20 shadow-inner">
            {['home', 'edu', 'exp', 'skills', 'contact'].map((item, i) => (
              <button 
                key={item}
                onClick={() => handleNavClick(item)}
                className={`font-mono tracking-[0.2em] text-[10px] uppercase transition-all duration-300 cursor-pointer relative group flex items-center gap-1 ${activeTab === item ? 'text-[var(--port-primary-container)] font-bold drop-shadow-[0_0_8px_var(--port-primary-container)]' : 'text-[var(--port-outline)] hover:text-[var(--port-on-surface)]'}`} 
              >
                <span className={`transition-all duration-300 ${activeTab === item ? 'opacity-100 text-[var(--port-primary-container)]' : 'opacity-0 group-hover:opacity-50 -translate-x-1 group-hover:translate-x-0'}`}>&gt;</span>
                <span>{t.nav[item as keyof typeof t.nav]}</span>
                
                {activeTab === item && (
                  <motion.div
                    layoutId="navigation-underline"
                    className="absolute -bottom-2 left-0 w-full h-[2px] bg-[var(--port-primary-container)] shadow-[0_0_8px_var(--port-primary-container)] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <motion.a
            href="/cv-sambatra.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hidden lg:flex items-center gap-2 px-4 py-2.5 border border-[var(--port-primary-container)]/60 bg-[var(--port-primary-container)]/10 text-[var(--port-primary-container)] font-mono text-[10px] tracking-[0.2em] uppercase cursor-pointer hover:bg-[var(--port-primary-container)]/20 hover:border-[var(--port-primary-container)] hover:shadow-[0_0_20px_var(--port-primary-container)] transition-all duration-300 group relative overflow-hidden"
          >
            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--port-primary-container)]/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none"></div>
            <FileDown size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            <span>{t.downloadCv}</span>
          </motion.a>
          <div ref={settingsRef} className="flex gap-4 items-center text-port-primary-container relative">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="cursor-pointer bg-[var(--port-primary-container)]/5 hover:bg-[var(--port-primary-container)]/20 p-2.5 rounded-lg border border-[var(--port-primary-container)]/20 hover:border-[var(--port-primary-container)]/50 transition-all duration-300 active:scale-95 group shadow-lg"
              title="Toggle Theme Mode"
            >
              {isDark ? <Sun size={18} className="group-hover:rotate-90 transition-transform duration-500" /> : <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-500" />}
            </button>
            <button className="cursor-pointer bg-[var(--port-primary-container)]/5 hover:bg-[var(--port-primary-container)]/20 p-2.5 rounded-lg border border-[var(--port-primary-container)]/20 hover:border-[var(--port-primary-container)]/50 transition-all duration-300 active:scale-95 group shadow-lg">
              <Terminal size={18} className="group-hover:scale-110 transition-transform" />
            </button>
            <button 
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="cursor-pointer bg-[var(--port-primary-container)]/5 hover:bg-[var(--port-primary-container)]/20 p-2.5 rounded-lg border border-[var(--port-primary-container)]/20 hover:border-[var(--port-primary-container)]/50 transition-all duration-300 active:scale-95 group shadow-lg"
            >
              <Settings size={18} className={settingsOpen ? 'animate-spin' : 'group-hover:rotate-45 transition-transform duration-300'} />
            </button>
            
            {/* Settings Modal */}
            {settingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.92, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                className="absolute top-16 right-0 w-80 glass-panel border border-[var(--port-primary-container)]/30 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_var(--port-primary-container)] flex flex-col text-port-on-surface overflow-hidden z-50"
              >
                {/* Header Bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--port-primary-container)]/20 bg-[var(--port-primary-container)]/5">
                  <div className="flex items-center gap-3">
                    <Settings size={14} className="text-[var(--port-primary-container)]" style={{ animation: 'spin 6s linear infinite' }} />
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[var(--port-primary-container)]">SYS_CONFIG</span>
                  </div>
                  <span className="text-[9px] font-mono text-port-outline-variant tracking-widest bg-[var(--port-primary-container)]/10 px-2 py-0.5 border border-[var(--port-primary-container)]/20">v1.0.4</span>
                </div>

                <div className="p-5 flex flex-col gap-6">
                  {/* Language Block */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px flex-1 bg-[var(--port-primary-container)]/20"></div>
                      <span className="text-[9px] font-mono tracking-[0.3em] text-port-outline uppercase">VOICE_LANG</span>
                      <div className="h-px flex-1 bg-[var(--port-primary-container)]/20"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'en', label: 'ENGLISH',  code: 'EN-UK', flag: '🇬🇧' },
                        { id: 'fr', label: 'FRANÇAIS', code: 'FR',    flag: '🇫🇷' },
                        { id: 'es', label: 'ESPAÑOL',  code: 'ES',    flag: '🇪🇸' },
                        { id: 'it', label: 'ITALIANO', code: 'IT',    flag: '🇮🇹' },
                      ].map(l => (
                        <motion.button
                          key={l.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setLang(l.id as Language)}
                          className={`relative flex items-center gap-3 px-3 py-2.5 border font-mono text-[10px] tracking-wider transition-all duration-300 overflow-hidden cursor-pointer ${lang === l.id
                            ? 'border-[var(--port-primary-container)] bg-[var(--port-primary-container)]/15 text-[var(--port-primary-container)] shadow-[0_0_10px_var(--port-primary-container)]'
                            : 'border-port-outline-variant/30 text-port-outline hover:border-[var(--port-primary-container)]/50 hover:text-port-on-surface'}`}
                        >
                          <span className="text-base leading-none">{l.flag}</span>
                          <div className="flex flex-col items-start">
                            <span className="text-[8px] opacity-60">{l.code}</span>
                            <span>{l.label}</span>
                          </div>
                          {lang === l.id && (
                            <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-[var(--port-primary-container)] shadow-[0_0_6px_var(--port-primary-container)] animate-pulse" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Theme Block */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-px flex-1 bg-[var(--port-primary-container)]/20"></div>
                      <span className="text-[9px] font-mono tracking-[0.3em] text-port-outline uppercase">CORE_THEME</span>
                      <div className="h-px flex-1 bg-[var(--port-primary-container)]/20"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'theme-cyan',    label: 'CYAN',    hex: '#0ea5e9', bg: 'bg-sky-500'     },
                        { id: 'theme-emerald', label: 'EMERALD', hex: '#10b981', bg: 'bg-emerald-500' },
                        { id: 'theme-purple',  label: 'PURPLE',  hex: '#a855f7', bg: 'bg-purple-500'  },
                        { id: 'theme-amber',   label: 'AMBER',   hex: '#f59e0b', bg: 'bg-amber-500'   },
                      ].map(th => (
                        <motion.button
                          key={th.id}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setTheme(th.id)}
                          className={`relative flex items-center gap-3 px-3 py-2.5 border font-mono text-[10px] tracking-wider transition-all duration-300 cursor-pointer ${theme === th.id
                            ? 'border-[var(--port-primary-container)] bg-[var(--port-primary-container)]/10 text-[var(--port-primary-container)]'
                            : 'border-port-outline-variant/30 text-port-outline hover:border-port-outline-variant/60 hover:text-port-on-surface'}`}
                        >
                          <div className={`w-4 h-4 rounded-full ${th.bg} flex-shrink-0 ${theme === th.id ? 'shadow-[0_0_10px_var(--port-primary-container)] ring-1 ring-[var(--port-primary-container)]/50' : ''}`}></div>
                          <div className="flex flex-col items-start">
                            <span className="text-[8px] opacity-60">{th.hex}</span>
                            <span>{th.label}</span>
                          </div>
                          {theme === th.id && (
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--port-primary-container)] shadow-[0_0_6px_var(--port-primary-container)] animate-pulse" />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-[var(--port-primary-container)]/20 bg-[var(--port-primary-container)]/5 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-port-outline-variant tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--port-primary-container)] animate-pulse shadow-[0_0_5px_var(--port-primary-container)]"></span>
                    SYSTEM_ONLINE
                  </span>
                  <span className="text-[9px] font-mono text-port-outline-variant tracking-widest">SAMBATRA_OS</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 px-8 overflow-hidden" id="home">
        {/* Deep ambient background elements */}
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-[var(--port-primary-container)] rounded-full mix-blend-screen opacity-[0.03] blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-[var(--port-primary-container)] rounded-full mix-blend-screen opacity-[0.03] blur-[120px] pointer-events-none"></div>
        
        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(var(--port-primary-container) 1px, transparent 1px), linear-gradient(90deg, var(--port-primary-container) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Floating crosshairs */}
        <Crosshair size={32} className="absolute top-32 left-10 text-[var(--port-primary-container)] opacity-20 pointer-events-none" />
        <Crosshair size={32} className="absolute bottom-32 right-10 text-[var(--port-primary-container)] opacity-20 pointer-events-none" />

        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 w-full">
          <div className="md:col-span-7 flex flex-col justify-center">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 bg-[var(--port-primary-container)]/10 border border-[var(--port-primary-container)]/50 text-[var(--port-primary-container)] font-label text-[10px] tracking-[0.25em] uppercase self-start relative overflow-hidden group">
                <div className="absolute inset-0 bg-[var(--port-primary-container)]/20 shadow-[0_0_15px_var(--port-primary-container)] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                <Scan size={14} className="animate-pulse" />
                {t.hero.sysInit}
              </div>
            </Reveal>
            
            <div className="mb-6" key={heroKey}>
              <h1 className="text-6xl md:text-[5rem] lg:text-[6rem] font-headline font-black text-port-primary mb-2 leading-[0.9] tracking-tight relative">
                {/* Glitch sub-layer */}
                <div className="absolute -inset-1 opacity-20 blur-[3px] text-[var(--port-primary-container)] animate-pulse-subtle pointer-events-none" aria-hidden="true">
                  SAMBATRA<br/>Tahirindrazana
                </div>
                
                <StaggerText text="SAMBATRA" delay={0.2} className="relative z-10" />
                <br/>
                <StaggerText text="Tahirindrazana" delay={0.5} className="text-[var(--port-primary-container)] drop-shadow-[0_0_20px_var(--port-primary-container)] relative z-10" />
              </h1>
              <motion.h2 
                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 1.0, type: "spring", bounce: 0.3 }}
                className="text-2xl md:text-3xl font-mono text-[var(--port-outline)] mt-8 tracking-widest flex items-center gap-4"
              >
                <div className="h-px w-12 bg-[var(--port-outline-variant)]"></div>
                <span>{t.hero.jobTitle}</span>
              </motion.h2>
            </div>
            
            <Reveal delay={1.4}>
              <div className="relative mb-12 pl-6 border-l-2 border-[var(--port-primary-container)]/30 group">
                {/* Decorative scanning line on paragraph text */}
                <div className="absolute left-[-2px] inset-y-0 w-[2px] bg-gradient-to-b from-transparent via-[var(--port-primary-container)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <p className="text-lg md:text-xl text-port-on-surface-variant max-w-xl leading-relaxed font-body">
                  {t.hero.bio}
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={1.6}>
              <div className="flex flex-wrap gap-6">
                {/* Location Chip */}
                <motion.div whileHover={{ y: -5, scale: 1.02 }} className="flex items-center gap-4 glass-panel bg-port-surface-low/80 backdrop-blur-md px-6 py-4 border border-port-outline-variant/30 hover:border-[var(--port-primary-container)]/50 relative cursor-default group overflow-hidden shadow-lg transition-all duration-300">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--port-primary-container)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="p-3 rounded-lg bg-[var(--port-primary-container)]/10 border border-[var(--port-primary-container)]/30 text-[var(--port-primary-container)] group-hover:bg-[var(--port-primary-container)] group-hover:text-[var(--port-bg)] transition-colors duration-300 group-hover:shadow-[0_0_15px_var(--port-primary-container)]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--port-outline)] uppercase font-mono tracking-[0.2em] mb-1">{t.hero.locTitle}</div>
                    <div className="text-port-on-surface font-headline font-bold tracking-wider group-hover:text-[var(--port-primary-container)] transition-colors">{t.hero.locValue}</div>
                  </div>
                </motion.div>
                
                {/* Mail Chip */}
                <motion.div whileHover={{ y: -5, scale: 1.02 }} className="flex items-center gap-4 glass-panel bg-port-surface-low/80 backdrop-blur-md px-6 py-4 border border-port-outline-variant/30 hover:border-[var(--port-primary-container)]/50 relative cursor-pointer group overflow-hidden shadow-lg transition-all duration-300" onClick={() => handleNavClick('contact')}>
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[var(--port-primary-container)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="p-3 rounded-lg bg-[var(--port-primary-container)]/10 border border-[var(--port-primary-container)]/30 text-[var(--port-primary-container)] group-hover:bg-[var(--port-primary-container)] group-hover:text-[var(--port-bg)] transition-colors duration-300 group-hover:shadow-[0_0_15px_var(--port-primary-container)]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-[9px] text-[var(--port-outline)] uppercase font-mono tracking-[0.2em] mb-1">{t.hero.uplink}</div>
                    <div className="text-port-on-surface font-headline font-bold tracking-wider group-hover:text-[var(--port-primary-container)] transition-colors">sambatratahirindrazana@gmail.com</div>
                  </div>
                </motion.div>
              </div>
            </Reveal>
          </div>
          
          {/* Portrait Container */}
          <div className="md:col-span-5 relative hidden md:flex items-center justify-center">
            <Reveal delay={1.2} className="h-full w-full">
              <TiltCard className="flex items-center justify-center h-[550px] w-full relative">
                {/* Orbital Rings around Portrait */}
                <div className="absolute rounded-full border border-[var(--port-primary-container)]/20 border-dashed w-[90%] h-[90%] animate-[spin_20s_linear_infinite] pointer-events-none"></div>
                
                <div className="relative w-4/5 h-[90%] rounded-2xl glass-panel border border-[var(--port-primary-container)]/30 hover:border-[var(--port-primary-container)]/80 transition-all duration-700 shadow-[0_0_30px_var(--port-primary-container)] hover:shadow-[0_0_50px_var(--port-primary-container)] overflow-hidden cursor-crosshair group flex justify-center mt-6">
                  
                  {/* Cyberpunk corner brackets */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[var(--port-primary-container)] opacity-50 group-hover:opacity-100 transition-opacity z-20"></div>
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[var(--port-primary-container)] opacity-50 group-hover:opacity-100 transition-opacity z-20"></div>
                  
                  {/* Glowing background gradient inside portrait */}
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[var(--port-primary-container)]/10 to-transparent z-0 opacity-80" />
                  
                  {/* Floating 3D Portrait */}
                  <motion.div 
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    className="relative w-full h-full z-10"
                  >
                    <Image 
                      fill 
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover object-top drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-700 filter group-hover:saturate-150 group-hover:contrast-125 ${isDark ? "brightness-90 contrast-125" : "brightness-100"}`} 
                      alt="Sambatra Profile" 
                      src={profileImg}
                      loading="eager"
                      onError={() => setProfileImg('https://lh3.googleusercontent.com/aida-public/AB6AXuCs85eW2zTUzixW2REbn1qqyvwhNTRnJ42ahu-vtRwBBdUqzF8zQ6fHm4Hli57Z-jmAA5agHAkKj65LnjE4uqEeGf5GagUXeDj1MnZrQAhyKfnejl5ZXsdZ4C290AjabQPsFXAwSCuos5Zw0SQ3rrEKINXqvL9i8KdSTMwLP15-vY-VDp7CzT92qXDquCZg-YIooQkYASraGxWbuvLDZfuC5bw6XZgg6Baqm98relbKRQlff22IKPzgeFXWjxvBZsl_hXWD2HZp')}
                    />
                  </motion.div>

                  {/* UI Overlay Information */}
                  <div className="absolute bottom-6 left-6 right-6 z-30 opacity-70 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <div className="h-px w-full bg-[var(--port-primary-container)]/50 mb-3 overflow-hidden">
                       <div className="h-full w-1/3 bg-[var(--port-primary-container)] animate-marquee shadow-[0_0_10px_var(--port-primary-container)]"></div>
                    </div>
                    <div className="flex justify-between font-mono text-[9px] text-[var(--port-primary-container)] tracking-[0.2em] bg-[var(--port-bg)]/80 px-4 py-2 border border-[var(--port-primary-container)]/40 shadow-[0_0_15px_rgba(0,0,0,0.8)] uppercase">
                      <div className="flex items-center gap-2"><Fingerprint size={12}/> {t.hero.scan1}</div>
                      <div className="text-right">{t.hero.scan2}</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-32 px-8 bg-port-surface-lowest relative overflow-hidden" id="education">
        {/* Background Grids and Accents */}
        <div className="absolute top-0 right-0 w-full h-[500px] opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(ellipse at top right, var(--port-primary-container), transparent 60%)' }}></div>

        <div className="container mx-auto relative z-10">
          <Reveal>
            <div className="mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-port-on-surface flex items-center gap-4 group/h">
                  <span className="text-port-primary-container font-black relative overflow-hidden">
                    01.
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12 blur-sm"
                    />
                  </span> 
                  {t.edu.title}
                </h2>
                <div className="relative h-1.5 w-64 mt-4 overflow-hidden">
                  <div className="absolute inset-0 bg-port-primary-container/20"></div>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="absolute inset-y-0 left-0 bg-[var(--port-primary-container)] shadow-[0_0_15px_var(--port-primary-container)]"
                  />
                  <motion.div 
                    animate={{ left: ['-10%', '110%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-8 bg-white/40 blur-md z-10"
                  />
                </div>
              </div>
              <div className="glass-panel px-4 py-2 flex items-center gap-3 border border-port-primary-container/30 text-port-primary-container font-label text-xs tracking-[0.2em] bg-port-primary-container/5">
                <GraduationCap size={18} />
                <span>{t.edu.databanks}</span>
              </div>
            </div>
          </Reveal>
          
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16 relative">
            {/* Connecting power line between cards (desktop only) */}
            <div className="hidden md:block absolute top-[120px] left-1/4 right-1/4 h-[2px] bg-port-primary-container/10 z-0">
              <motion.div 
                animate={{ 
                  left: ['-100%', '200%'],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-40 bg-gradient-to-r from-transparent via-port-primary-container to-transparent shadow-[0_0_15px_var(--port-primary-container)]"
              />
            </div>
            
            {/* MASTER'S DEGREE */}
            <div className="w-full md:w-1/2 relative z-10 mt-6 md:mt-0">
              <Reveal delay={0.1}>
                {/* Year Badge Floating */}
                <div className="absolute -top-6 left-8 bg-[var(--port-primary-container)]/10 border border-[var(--port-primary-container)] text-[var(--port-primary-container)] px-4 py-2 font-label text-sm tracking-widest backdrop-blur-md shadow-[0_0_15px_var(--port-primary-container)] z-20 flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--port-primary-container)] animate-pulse"></span>
                  2024 — 2026
                </div>
                
                <TiltCard>
                  <div className="glass-panel p-10 pt-16 border border-port-outline-variant/20 hover:border-[var(--port-primary-container)]/50 transition-all duration-500 cursor-default group relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--port-primary-container)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="bracket-tl border-[var(--port-primary-container)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="bracket-br border-[var(--port-primary-container)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex justify-between items-start mb-6 border-b border-port-outline-variant/10 pb-6 relative z-10">
                      <div>
                        <div className="text-[10px] font-label text-port-outline mb-2 tracking-[0.2em] uppercase">{t.edu.masterLevel}</div>
                        <h3 className="text-3xl font-headline font-bold text-port-on-surface group-hover:text-[var(--port-primary-container)] transition-colors group-hover:drop-shadow-[0_0_10px_var(--port-primary-container)]">
                          {t.edu.masterTitle}
                        </h3>
                      </div>
                      <div className="p-3 bg-port-bg border border-port-outline-variant/30 rounded-lg group-hover:border-[var(--port-primary-container)]/50 transition-colors hover:scale-110">
                        <Award size={32} className="text-port-outline-variant group-hover:text-[var(--port-primary-container)] group-hover:drop-shadow-[0_0_10px_var(--port-primary-container)] transition-all" />
                      </div>
                    </div>
                    
                    <p className="text-port-secondary font-medium mb-6 flex items-start gap-3 text-lg leading-snug">
                      <span className="text-[var(--port-primary-container)] font-black mt-1">&gt;</span> {t.edu.school}
                    </p>
                    <p className="text-port-on-surface-variant leading-relaxed relative z-10 flex-grow font-body">
                      {t.edu.mDesc}
                    </p>
                    
                    <div className="mt-8 flex flex-wrap gap-3 relative z-10">
                       <span className="text-[10px] font-mono border border-port-outline-variant/30 px-3 py-1.5 text-port-outline group-hover:border-[var(--port-primary-container)]/30 transition-colors">{t.edu.tagSysArch}</span>
                       <span className="text-[10px] font-mono border border-port-outline-variant/30 px-3 py-1.5 text-port-outline group-hover:border-[var(--port-primary-container)]/30 transition-colors">{t.edu.tagAi}</span>
                       <span className="text-[10px] font-mono border border-[var(--port-primary-container)] bg-[var(--port-primary-container)]/10 text-[var(--port-primary-container)] px-3 py-1.5 animate-pulse-subtle">{t.edu.activePhase}</span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>

            {/* LICENSE DEGREE */}
            <div className="w-full md:w-1/2 relative z-10 mt-16 md:mt-0">
              <Reveal delay={0.3}>
                <div className="absolute -top-6 left-8 bg-[var(--port-primary-container)]/10 border border-[var(--port-primary-container)] text-[var(--port-primary-container)] px-4 py-2 font-label text-sm tracking-widest backdrop-blur-md shadow-[0_0_15px_var(--port-primary-container)] z-20 flex items-center gap-3">
                  <span className="w-2 h-2 bg-[var(--port-primary-container)]"></span>
                  2021 — 2024
                </div>
                
                <TiltCard>
                  <div className="glass-panel p-10 pt-16 border border-port-outline-variant/20 hover:border-[var(--port-primary-container)]/50 transition-all duration-500 cursor-default group relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--port-primary-container)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    <div className="bracket-tl border-[var(--port-primary-container)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="bracket-br border-[var(--port-primary-container)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex justify-between items-start mb-6 border-b border-port-outline-variant/10 pb-6 relative z-10">
                      <div>
                        <div className="text-[10px] font-label text-port-outline mb-2 tracking-[0.2em] uppercase">{t.edu.licenseLevel}</div>
                        <h3 className="text-3xl font-headline font-bold text-port-on-surface group-hover:text-[var(--port-primary-container)] transition-colors group-hover:drop-shadow-[0_0_10px_var(--port-primary-container)]">
                          {t.edu.licenseTitle}
                        </h3>
                      </div>
                      <div className="p-3 bg-port-bg border border-port-outline-variant/30 rounded-lg group-hover:border-[var(--port-primary-container)]/50 transition-colors hover:scale-110">
                        <BookOpen size={32} className="text-port-outline-variant group-hover:text-[var(--port-primary-container)] group-hover:drop-shadow-[0_0_10px_var(--port-primary-container)] transition-all" />
                      </div>
                    </div>
                    
                    <p className="text-port-secondary font-medium mb-6 flex items-start gap-3 text-lg leading-snug">
                      <span className="text-[var(--port-primary-container)] font-black mt-1">&gt;</span> {t.edu.school}
                    </p>
                    <p className="text-port-on-surface-variant leading-relaxed relative z-10 flex-grow font-body">
                      {t.edu.lDesc}
                    </p>
                    
                    <div className="mt-8 flex flex-wrap gap-3 relative z-10">
                       <span className="text-[10px] font-mono border border-[var(--port-primary-container)] text-[var(--port-primary-container)] px-3 py-1.5 shadow-[0_0_10px_var(--port-primary-container)] bg-[var(--port-primary-container)]/5">{t.edu.tagAlgo}</span>
                       <span className="text-[10px] font-mono border border-port-outline-variant/30 px-3 py-1.5 text-port-outline group-hover:border-[var(--port-primary-container)]/30 transition-colors">{t.edu.tagNet}</span>
                       <span className="text-[10px] font-mono border border-port-outline-variant/30 px-3 py-1.5 text-port-outline group-hover:border-[var(--port-primary-container)]/30 transition-colors">{t.edu.tagDb}</span>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 px-8 bg-port-bg relative" id="experience">
        {/* Background ambient lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--port-primary-container)]/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto relative z-10">
          <Reveal>
            <div className="flex justify-between items-end mb-16">
              <div>
                <h2 className="text-4xl font-headline font-bold text-port-on-surface flex items-center gap-4 group/h">
                  <span className="text-port-primary-container font-black relative overflow-hidden">
                    02.
                    <motion.div 
                      animate={{ x: ['-100%', '100%'] }} 
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12 blur-sm"
                    />
                  </span> 
                  {t.exp.title}
                </h2>
                <div className="relative h-1.5 w-48 mt-4 overflow-hidden">
                  <div className="absolute inset-0 bg-port-primary-container/20"></div>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className="absolute inset-y-0 left-0 bg-[var(--port-primary-container)] shadow-[0_0_15px_var(--port-primary-container)]"
                  />
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3 font-label text-xs text-port-outline tracking-[0.3em]">
                <FolderGit2 size={16} /> {t.exp.totalEntries}
              </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ num: 1, title: t.exp.p1Title, type: 'ACTIVE_SYNC', icon: Activity, color: 'var(--port-primary-container)', desc: t.exp.p1Desc, tech: ['C++', 'Arduino', 'IoT'] },
              { num: 2, title: t.exp.p2Title, type: 'SYSTEM_CORE', icon: Users, color: 'var(--port-primary-container)', desc: t.exp.p2Desc, tech: ['React', 'NodeJS', 'MySQL'] },
              { num: 3, title: t.exp.p3Title, type: 'INTERN_01', icon: Zap, color: 'var(--port-primary-container)', desc: t.exp.p3Desc, tech: ['Network', 'SysAdmin', 'Security'] }
            ].map((proj, i) => {
              const Icon = proj.icon;
              return (
                <Reveal key={proj.num} delay={i * 0.1} className="h-full">
                  <TiltCard className="h-full">
                    <div className="glass-panel p-8 h-full border border-port-outline-variant/20 hover:border-port-outline-variant/40 group relative overflow-hidden transition-all duration-500 cursor-default flex flex-col justify-between">
                      {/* Hover ambient color */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-20 transition-all duration-700 blur-[40px] rounded-full pointer-events-none" style={{ backgroundColor: proj.color }}></div>
                      
                      {/* Top decorative line */}
                      <div className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-700 pointer-events-none" style={{ backgroundColor: proj.color, boxShadow: `0 0 10px ${proj.color}` }}></div>

                      <div>
                        <div className="flex justify-between items-start mb-6">
                          <span className="p-3 glass-panel border border-port-outline-variant/30 rounded-lg group-hover:-translate-y-1 transition-transform duration-300" style={{ color: proj.color, boxShadow: `0 0 15px ${proj.color}20` }}>
                            <Icon size={28} className="filter group-hover:drop-shadow-[0_0_8px_currentColor] transition-all" />
                          </span>
                          <div className="text-[10px] font-label px-2 py-1 border border-port-outline-variant/50 flex items-center gap-2 group-hover:border-opacity-100 transition-colors" style={{ color: proj.color, backgroundColor: `${proj.color}10` }}>
                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: proj.color }}></span>
                            {proj.type}
                          </div>
                        </div>
                        <h3 className="text-xl font-headline font-bold mb-4 text-port-on-surface transition-colors group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                          {proj.title}
                        </h3>
                        <p className="text-port-on-surface-variant text-sm mb-6 leading-relaxed relative z-10">
                          {proj.desc}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-port-outline-variant/10">
                        {proj.tech.map(t => (
                          <span key={t} className="text-[9px] font-label px-2 py-1 bg-port-surface border border-port-outline-variant/20 text-port-outline uppercase tracking-wider group-hover:border-port-outline-variant/50 transition-colors">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <button className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 cursor-pointer hover:scale-110" style={{ color: proj.color }}>
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
          
          <Reveal delay={0.4}>
            <div className="mt-8 relative overflow-hidden glass-panel p-1 border border-port-outline-variant/20 group hover:border-port-outline-variant/40 transition-colors">
              <div className="bg-port-surface p-10 lg:p-14 relative z-10 border border-port-bg/50 flex flex-col lg:flex-row items-center gap-12 group-hover:bg-port-surface-highest/20 transition-colors">
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-6">
                    <span className="p-4 glass-panel border border-port-outline-variant/30 rounded-xl" style={{ color: 'var(--port-primary-container)', boxShadow: '0 0 20px rgba(161, 140, 209, 0.1)' }}>
                      <Landmark size={40} className="filter group-hover:drop-shadow-[0_0_12px_currentColor] transition-all" />
                    </span>
                    <div className="text-[10px] font-label px-3 py-1.5 border border-[var(--port-primary-container)]/40 flex items-center gap-2 bg-[var(--port-primary-container)]/10 text-[var(--port-primary-container)]">
                      <span className="w-2 h-2 rounded-full animate-pulse bg-[var(--port-primary-container)]"></span>
                      {t.exp.internTag}
                    </div>
                  </div>
                  <h3 className="text-3xl font-headline font-bold mb-4 text-port-on-surface group-hover:text-[var(--port-primary-container)] transition-colors drop-shadow-[0_0_10px_var(--port-primary-container)] group-hover:drop-shadow-[0_0_15px_var(--port-primary-container)]">
                    {t.exp.p4Title}
                  </h3>
                  <p className="text-port-on-surface-variant leading-relaxed max-w-2xl mb-8 font-body">
                    {t.exp.p4Desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {[t.edu.tagNet, 'DevOps', 'Data Center', 'Maintenance'].map(tech => (
                      <span key={tech} className="text-[10px] font-label px-3 py-1 bg-port-bg border border-port-outline-variant/30 text-port-outline uppercase tracking-widest hover:border-[var(--port-primary-container)] hover:text-[var(--port-primary-container)] transition-colors cursor-pointer">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <TiltCard className="w-full lg:w-2/5">
                  <div className="aspect-video lg:aspect-square relative overflow-hidden glass-panel border border-[var(--port-primary-container)]/30 rounded-lg group-hover:border-[var(--port-primary-container)]/60 transition-colors shadow-[0_0_20px_var(--port-primary-container)] group-hover:shadow-[0_0_40px_var(--port-primary-container)]">
                    <div className="absolute inset-0 bg-[var(--port-primary-container)]/10 z-10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700"></div>
                    <Image 
                      fill 
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className={`object-cover transition-transform duration-1000 group-hover:scale-110 filter saturate-50 group-hover:saturate-100 p-2 lg:p-0 ${isDark ? "brightness-75 group-hover:brightness-100" : ""}`} 
                      alt="Digital representation of global data network" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVEYM8UT5MYmsSrVK1W1kQjwmJC6xeJ9JqQhD-8QJ3NXgcl5JSjtTjkfJ1bKo46HrgMZgHXCKpWS4gwQl1mxqS-TawYpFz73nVJEvbRkvKvEFwEGs_rbfqbvPsypedThoBB1T25bJ0_5AoiJz0lzBtzVLxKMCh97hIn2rhXaw-3B74JOIXYNjcjs2WXcaLAO7DIs4X-sGRbnCC-gp5IQHby2ls6ZgUQtWNXCOVLjgQ4FXASKIpTGSrmM_2gdnR50knq3LxeA3q"
                      priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                      <div className="text-[10px] font-label text-[var(--port-primary-container)] tracking-widest px-4 py-2 bg-[var(--port-bg)]/80 backdrop-blur-md border border-[var(--port-primary-container)]/40 shadow-[0_0_15px_var(--port-primary-container)] truncate max-w-[80%] uppercase">
                        {t.exp.dataStream}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-8 bg-port-surface-low relative overflow-hidden" id="skills">
        <div className="container mx-auto relative z-10">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-headline font-bold text-port-on-surface flex items-center gap-4 group/h">
                <span className="text-port-primary-container font-black relative overflow-hidden text-port-primary-container">
                  03.
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }} 
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12 blur-sm"
                  />
                </span> 
                {t.skills.title}
              </h2>
              <div className="relative h-1.5 w-48 mt-4 overflow-hidden">
                <div className="absolute inset-0 bg-port-primary-container/20"></div>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: false }}
                  transition={{ duration: 1.2, ease: "circOut" }}
                  className="absolute inset-y-0 left-0 bg-[var(--port-primary-container)] shadow-[0_0_15px_var(--port-primary-container)]"
                />
              </div>
            </div>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              { title: 'NEXTJS / REACT', pct: 90, color: 'var(--port-primary-container)', icon: Layers, label: 'FRONT_END' },
              { title: 'TYPESCRIPT', pct: 85, color: 'var(--port-primary-container)', icon: Code2, label: 'LANGUAGE' },
              { title: 'PYTHON', pct: 80, color: 'var(--port-primary-container)', icon: Terminal, label: 'BACK_END' },
              { title: 'DATABASE_SQL', pct: 75, color: 'var(--port-primary-container)', icon: Database, label: 'STORAGE' }
            ].map((skill, i) => {
              const dashoffset = 251.2 * (1 - skill.pct / 100);
              const Icon = skill.icon;
              return (
                <Reveal key={skill.title} delay={i * 0.1}>
                  <TiltCard>
                    <div 
                      className="glass-panel p-6 border border-port-outline-variant/20 flex flex-col items-center group cursor-default transition-all duration-500 overflow-hidden relative"
                    >
                      {/* Hover background effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" style={{ background: `radial-gradient(circle at center, ${skill.color} 0%, transparent 70%)` }}></div>
                      
                      <div className="w-full flex justify-between items-center mb-6 relative z-10">
                        <div className="font-label text-[10px] tracking-widest text-port-outline group-hover:text-port-on-surface transition-colors">{skill.label}</div>
                        <Icon size={16} className="text-port-outline-variant transition-all duration-500" style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color})` }} />
                      </div>

                      <div className="relative w-28 h-28 mb-6 flex items-center justify-center z-10">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
                          <circle className="text-port-outline-variant/10" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="3"></circle>
                          <motion.circle 
                            initial={{ strokeDashoffset: 251.2 }}
                            whileInView={{ strokeDashoffset: dashoffset }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.1 }}
                            cx="48" cy="48" fill="transparent" r="40" 
                            stroke="currentColor" 
                            strokeDasharray="251.2" 
                            strokeWidth="4"
                            style={{ color: skill.color, filter: `drop-shadow(0 0 8px ${skill.color})` }}
                          ></motion.circle>
                        </svg>
                        <AnimatedPercentage target={skill.pct} />
                      </div>

                      <div 
                        className="font-headline font-bold text-lg tracking-widest uppercase text-port-on-surface transition-all duration-500 z-10" 
                      >
                        {skill.title}
                      </div>
                      
                      {/* Decorative border bottom on hover */}
                      <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out" style={{ backgroundColor: skill.color, boxShadow: `0 -2px 10px ${skill.color}` }}></div>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
          
          <Reveal delay={0.4}>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'JAVA_CORE', level: 85, type: 'SYS', color: 'var(--port-primary-container)' },
                { name: 'PHP_MODERN', level: 78, type: 'NET', color: 'var(--port-primary-container)' },
                { name: 'MYSQL_ARCH', level: 82, type: 'DB', color: 'var(--port-primary-container)' },
                { name: 'REST_API', level: 95, type: 'API', color: 'var(--port-primary-container)' }
              ].map((s, i) => (
                <div key={s.name} className="relative p-5 glass-panel border border-port-outline-variant/10 hover:border-port-outline-variant/30 transition-colors cursor-default group overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 opacity-5 flex items-center justify-center transform translate-x-4 -translate-y-4 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
                     <Server size={64} style={{ color: s.color }} />
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <span className="font-label text-xs tracking-widest uppercase text-port-outline group-hover:text-port-on-surface transition-colors">{s.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 border border-port-outline-variant/30 text-port-outline-variant transition-colors" style={{ backgroundColor: `${s.color}15`, borderColor: `${s.color}40`, color: s.color }}>{s.type}</span>
                  </div>
                  
                  <div className="h-[2px] w-full bg-port-outline-variant/20 rounded-full overflow-hidden mt-4 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="absolute top-0 left-0 h-full"
                      style={{ backgroundColor: s.color, boxShadow: `0 0 8px ${s.color}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grid-pattern z-0"></div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-8 bg-port-bg" id="contact">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <Reveal>
              <div className="h-full flex flex-col justify-center">
                <div className="mb-12">
                  <h2 className="text-4xl font-headline font-bold text-port-on-surface flex items-center gap-4 group/h">
                    <span className="text-port-primary-container font-black relative overflow-hidden text-port-primary-container">
                      04.
                      <motion.div 
                        animate={{ x: ['-100%', '100%'] }} 
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-y-0 w-1/3 bg-white/20 skew-x-12 blur-sm"
                      />
                    </span> 
                    {t.contact.title}
                  </h2>
                  <div className="relative h-1.5 w-48 mt-4 overflow-hidden">
                    <div className="absolute inset-0 bg-port-primary-container/20"></div>
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.2, ease: "circOut" }}
                      className="absolute inset-y-0 left-0 bg-[var(--port-primary-container)] shadow-[0_0_15px_var(--port-primary-container)]"
                    />
                  </div>
                  <div className="mt-6 flex items-center gap-3 text-[10px] font-label text-port-primary-container uppercase tracking-[0.2em] bg-[var(--port-primary-container)]/10 border border-port-primary-container/30 px-4 py-2 inline-flex">
                    <Globe2 size={16} />
                    <span>VOICE_SYNTHESIS_MODULES</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { lang: 'MALAGASY', prof: t.contact.profNative, pct: 100, color: 'var(--port-primary-container)', code: 'MG_01' },
                    { lang: 'FRENCH', prof: t.contact.profProficient, pct: 85, color: 'var(--port-primary-container)', code: 'FR_02' },
                    { lang: 'ENGLISH', prof: t.contact.profInter, pct: 70, color: 'var(--port-primary-container)', code: 'EN_03' }
                  ].map((l, i) => (
                    <div key={l.lang} className="relative group p-6 glass-panel border border-port-outline-variant/20 hover:border-port-outline-variant/50 transition-all duration-300 overflow-hidden cursor-default">
                       {/* Ambient glow that fills from left */}
                       <div className="absolute left-0 top-0 bottom-0 w-1 group-hover:w-full transition-all duration-700 opacity-[0.03] pointer-events-none z-0" style={{ backgroundColor: l.color }}></div>
                       
                       {/* Abstract watermark */}
                       <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-[0.02] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none z-0">
                         <Globe2 size={120} style={{ color: l.color }} />
                       </div>
                       
                       <div className="relative z-10 flex flex-col gap-5">
                         <div className="flex justify-between items-end">
                           <div>
                             <div className="text-[10px] font-mono tracking-[0.25em] mb-1.5 transition-colors uppercase" style={{ color: l.color }}>{l.code} // {l.prof}</div>
                             <div className="text-2xl font-headline font-bold text-port-on-surface tracking-wider group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all">{l.lang}</div>
                           </div>
                           <Radio size={24} className="opacity-30 group-hover:opacity-100 transition-opacity" style={{ color: l.color }} />
                         </div>
                         
                         <div className="flex items-center gap-5">
                           <div className="flex-1 h-3.5 bg-[var(--port-bg)] border border-port-outline-variant/30 flex gap-[3px] p-[2px]">
                             {[...Array(10)].map((_, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0 }}
                                  whileInView={{ opacity: idx < (l.pct / 10) ? 1 : 0.15 }}
                                  transition={{ duration: 0.1, delay: i * 0.1 + idx * 0.05 }}
                                  className="h-full flex-1"
                                  style={{ 
                                    backgroundColor: idx < (l.pct / 10) ? l.color : 'currentColor', 
                                    boxShadow: idx < (l.pct / 10) ? `0 0 12px ${l.color}` : 'none',
                                    color: 'var(--port-outline-variant)'
                                  }}
                                />
                             ))}
                           </div>
                           <div className="text-sm font-mono font-bold w-12 text-right tracking-wider" style={{ color: l.color }}>{l.pct}%</div>
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2} className="h-full">
              <TiltCard className="h-full">
                <div className="glass-panel p-1 border border-port-primary-container/20 hover:border-port-primary-container/40 relative h-full flex flex-col group overflow-hidden transition-all duration-500">
                  {/* Subtle Background Elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--port-primary-container)]/5 to-transparent pointer-events-none"></div>
                  
                  {/* Animated Corner Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-port-primary-container/50 opacity-50 group-hover:opacity-100 group-hover:shadow-[-5px_-5px_15px_var(--port-primary-container)] transition-all pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-port-primary-container/50 opacity-50 group-hover:opacity-100 group-hover:shadow-[5px_5px_15px_var(--port-primary-container)] transition-all pointer-events-none"></div>
                  
                  <div className="bg-port-surface/40 p-8 sm:p-12 relative z-10 flex-grow backdrop-blur-sm border border-port-primary-container/10 border-t-0 border-r-0">
                    <div className="flex justify-between items-center mb-8">
                       <h2 className="text-3xl font-headline font-bold text-port-on-surface tracking-widest uppercase flex items-center gap-3">
                         {t.contact.connTitle}
                       </h2>
                       <div className="flex items-center gap-2">
                         <span className="relative flex h-3 w-3">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--port-primary-container)] opacity-80 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--port-primary-container)] shadow-[0_0_8px_var(--port-primary-container)]"></span>
                         </span>
                         <span className="text-[9px] font-mono text-[var(--port-primary-container)] tracking-widest border border-[var(--port-primary-container)]/30 px-2 py-0.5 bg-[var(--port-primary-container)]/10">READY</span>
                       </div>
                    </div>
                    
                    <form className="space-y-6" onSubmit={handleSend}>
                      <div className="relative group/input">
                        <label className="flex items-center gap-2 text-[10px] font-label text-port-outline uppercase tracking-widest mb-3 group-focus-within/input:text-port-primary-container transition-colors">
                           <User size={12} className="group-focus-within/input:drop-shadow-[0_0_5px_var(--port-primary-container)]" /> {t.contact.formName}
                        </label>
                        <div className="relative flex items-center">
                          <code className="absolute left-4 text-port-outline-variant font-mono pointer-events-none group-focus-within/input:text-port-primary-container transition-colors">&gt;</code>
                          <input required className="w-full bg-[var(--port-surface-highest)] border border-[var(--port-outline-variant)]/30 outline-none focus:ring-0 text-port-on-surface py-4 pl-10 pr-4 focus:border-[var(--port-primary-container)] focus:shadow-[0_0_15px_var(--port-primary-container)] focus:bg-[var(--port-primary-container)]/10 transition-all font-mono text-sm" type="text" placeholder="John Doe..."/>
                        </div>
                      </div>
                      
                      <div className="relative group/input">
                        <label className="flex items-center gap-2 text-[10px] font-label text-port-outline uppercase tracking-widest mb-3 group-focus-within/input:text-port-primary-container transition-colors">
                           <Mail size={12} className="group-focus-within/input:drop-shadow-[0_0_5px_var(--port-primary-container)]" /> {t.contact.formEmail}
                        </label>
                        <div className="relative flex items-center">
                          <code className="absolute left-4 text-port-outline-variant font-mono pointer-events-none group-focus-within/input:text-port-primary-container transition-colors">&gt;</code>
                          <input required className="w-full bg-[var(--port-surface-highest)] border border-[var(--port-outline-variant)]/30 outline-none focus:ring-0 text-port-on-surface py-4 pl-10 pr-4 focus:border-[var(--port-primary-container)] focus:shadow-[0_0_15px_var(--port-primary-container)] focus:bg-[var(--port-primary-container)]/10 transition-all font-mono text-sm" type="email" placeholder="john@domain.com"/>
                        </div>
                      </div>

                      <div className="relative group/input">
                        <label className="flex items-center gap-2 text-[10px] font-label text-port-outline uppercase tracking-widest mb-3 group-focus-within/input:text-port-primary-container transition-colors">
                           <MessageSquare size={12} className="group-focus-within/input:drop-shadow-[0_0_5px_var(--port-primary-container)]" /> {t.contact.formMsg}
                        </label>
                        <div className="relative">
                          <code className="absolute left-4 top-4 text-port-outline-variant font-mono pointer-events-none group-focus-within/input:text-port-primary-container transition-colors">&gt;</code>
                          <textarea required className="w-full bg-[var(--port-surface-highest)] border border-[var(--port-outline-variant)]/30 outline-none focus:ring-0 text-port-on-surface py-4 pl-10 pr-4 focus:border-[var(--port-primary-container)] focus:shadow-[0_0_15px_var(--port-primary-container)] focus:bg-[var(--port-primary-container)]/10 transition-all font-mono text-sm resize-none" rows={5} placeholder="Establishing uplink..."></textarea>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <motion.button 
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          disabled={isSending || isSent}
                          className={`w-full relative overflow-hidden text-[var(--port-bg)] font-headline font-bold py-5 uppercase tracking-[0.3em] transition-all duration-300 cursor-pointer flex justify-center items-center gap-3 group/btn hover:shadow-[0_0_20px_var(--port-primary-container)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-port-primary-container ${isSent ? 'bg-[var(--port-primary-container)] shadow-[0_0_20px_var(--port-primary-container)]' : 'bg-[var(--port-primary-container)]'}`}
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            {isSending ? (
                              <><Loader2 className="animate-spin" size={20} /> TRANSMITTING...</>
                            ) : isSent ? (
                              <><CheckCircle2 size={20} /> DELIVERED</>
                            ) : (
                              <><Send size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" /> {t.contact.formSend}</>
                            )}
                          </span>
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Data Ticker */}
      <div className="w-full bg-port-surface-lowest py-2.5 overflow-hidden border-y border-[var(--port-primary-container)]/30 relative">
        {/* Neon scanline across the ticker */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--port-bg)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--port-bg)] to-transparent z-10 pointer-events-none"></div>
        
        <div className="whitespace-nowrap font-mono text-[10px] text-[var(--port-primary-container)] tracking-[0.2em] animate-marquee inline-block drop-shadow-[0_0_5px_var(--port-primary-container)]">
          <span className="text-[var(--port-primary-container)] font-bold bg-[var(--port-primary-container)]/10 px-2 border border-[var(--port-primary-container)]/30 mr-2">[ENCRYPTED_CHANNEL]</span> SYSTEM_STATUS: {isDark ? "OPTIMAL" : "LIGHT_MODE_ACTIVE"} // ARCHIVE_VERSION: 1.0.4 // GEOLOCATION: 23.3516° S, 43.6673° E // NETWORK_SECURED: TRUE // LATEST_COMMIT: 0x8F2A90 // PROCESSING_CORES: 16 // MEMORY_LEAK: NONE // <span className="text-red-500 font-bold bg-red-500/10 px-2 border border-red-500/30 mx-2">[BREACH_ATTEMPT: 0]</span> //
          <span className="text-[var(--port-primary-container)] font-bold bg-[var(--port-primary-container)]/10 px-2 border border-[var(--port-primary-container)]/30 mx-2 ml-6">[ENCRYPTED_CHANNEL]</span> SYSTEM_STATUS: {isDark ? "OPTIMAL" : "LIGHT_MODE_ACTIVE"} // ARCHIVE_VERSION: 1.0.4 // GEOLOCATION: 23.3516° S, 43.6673° E // NETWORK_SECURED: TRUE // LATEST_COMMIT: 0x8F2A90 // PROCESSING_CORES: 16 // MEMORY_LEAK: NONE // <span className="text-red-500 font-bold bg-red-500/10 px-2 border border-red-500/30 mx-2">[BREACH_ATTEMPT: 0]</span> //
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-port-outline-variant/20 bg-[var(--port-nav-bg)] backdrop-blur-xl relative pb-[3px]">
        {/* Ambient background */}
        <div className="absolute bottom-0 right-1/4 w-96 h-32 bg-[var(--port-primary-container)] rounded-full mix-blend-screen opacity-[0.03] blur-[80px] pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center px-12 py-8 gap-8 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-2 border border-port-primary-container/20 bg-port-primary-container/5 rounded">
               <QrCode size={40} className="text-[var(--port-primary-container)] opacity-80" />
            </div>
            <div className="flex flex-col">
              <span className="font-headline text-xs font-bold tracking-[0.3em] uppercase text-port-on-surface">
                {t.footer}
              </span>
              <span className="font-mono text-[9px] text-port-outline-variant tracking-widest mt-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[var(--port-primary-container)] rounded-full animate-pulse shadow-[0_0_5px_var(--port-primary-container)]"></span>
                SYS_DATE: 2026_04_09 // ID_94029
              </span>
            </div>
          </div>

          {/* Download CV Button */}
          <motion.a
            href="/cv-sambatra.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-6 py-3 border border-[var(--port-primary-container)]/60 bg-[var(--port-primary-container)]/10 text-[var(--port-primary-container)] font-mono text-[11px] tracking-[0.25em] uppercase cursor-pointer hover:bg-[var(--port-primary-container)]/20 hover:border-[var(--port-primary-container)] hover:shadow-[0_0_25px_var(--port-primary-container)] transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--port-primary-container)]/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 pointer-events-none"></div>
            <div className="p-1.5 border border-[var(--port-primary-container)]/40 bg-[var(--port-primary-container)]/10 group-hover:bg-[var(--port-primary-container)] group-hover:text-[var(--port-bg)] transition-colors duration-300">
              <FileDown size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </div>
            <span>{t.downloadCv}</span>
          </motion.a>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {[
              { label: 'GITHUB', url: 'https://github.com/ddfeliz' },
              { label: 'LINKEDIN', url: 'https://www.linkedin.com/in/sambatra-tahirindrazana-95a1a3392' },
              { label: 'X_CORP', url: '#' },
              { label: 'CODEPEN', url: '#' }
            ].map(l => (
              <a 
                key={l.label} 
                className="font-mono text-[10px] tracking-[0.3em] uppercase text-port-outline hover:text-[var(--port-primary-container)] transition-all duration-300 hover:drop-shadow-[0_0_8px_var(--port-primary-container)] flex items-center gap-1.5 group" 
                href={l.url}
                target={l.url !== '#' ? "_blank" : "_self"}
                rel="noopener noreferrer"
              >
                <span className="opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-[var(--port-primary-container)]">{"["}</span>
                {l.label}
                <span className="opacity-0 translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 text-[var(--port-primary-container)]">{"]"}</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Progress bar at the very bottom tied to page scroll */}
        <div className="h-[3px] w-full bg-[var(--port-outline-variant)]/20 absolute bottom-0 left-0 z-50 overflow-hidden">
          <motion.div 
            className="h-full bg-[var(--port-primary-container)] shadow-[0_0_15px_var(--port-primary-container)] origin-left"
            style={{ scaleX }}
          />
        </div>
      </footer>
    </div>
  );
}

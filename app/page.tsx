'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Trophy, Globe, CheckCircle, GraduationCap, BookOpen, Mail, MonitorSmartphone, ArrowRight, Zap, Smartphone, Code2, FileCode, Database, Flame, Server, Palette, Sparkles, GitBranch, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import Lenis from 'lenis';

// --- Data & Translations ---

type Language = 'English' | 'Hindi' | 'Odia';

const translations: Record<Language, { p1: string; p2: string }> = {
  English: {
    p1: 'I am a developer driven by the desire to bridge technical rigor with artistic vision. My approach is "editorial-first," treating every project as a curated digital experience rather than just a functional application.',
    p2: 'From winning hackathons to developing civic accountability tools, I focus on creating momentum through intentional design and robust architecture.'
  },
  Hindi: {
    p1: 'मैं एक ऐसा डेवलपर हूँ जो तकनीकी कठोरता को कलात्मक दृष्टिकोण के साथ जोड़ने की इच्छा से प्रेरित है। मेरा दृष्टिकोण "संपादकीय-प्रथम" है, जो हर प्रोजेक्ट को सिर्फ एक कार्यात्मक एप्लिकेशन के बजाय एक क्यूरेटेड डिजिटल अनुभव मानता है।',
    p2: 'हैकाथॉन जीतने से लेकर नागरिक जवाबदेही उपकरण विकसित करने तक, मैं जानबूझकर डिजाइन और मजबूत वास्तुकला के माध्यम से गति बनाने पर ध्यान केंद्रित करता हूं।'
  },
  Odia: {
    p1: 'ମୁଁ ଜଣେ ଡେଭେଲପର ଯିଏ ବୈଷୟିକ କଠୋରତାକୁ କଳାତ୍ମକ ଦୃଷ୍ଟିକୋଣ ସହିତ ଯୋଡିବାକୁ ଇଚ୍ଛା କରେ | ମୋର ଦୃଷ୍ଟିକୋଣ ହେଉଛି "ସମ୍ପାଦକୀୟ-ପ୍ରଥମ", ପ୍ରତ୍ୟେକ ପ୍ରକଳ୍ପକୁ କେବଳ ଏକ କାର୍ଯ୍ୟକ୍ଷମ ପ୍ରୟୋଗ ପରିବର୍ତ୍ତେ ଏକ କ୍ୟୁରେଟେଡ୍ ଡିଜିଟାଲ୍ ଅଭିଜ୍ଞତା ଭାବରେ ବିବେଚନା କରେ |',
    p2: 'ହାକାଥନ୍ ଜିତିବା ଠାରୁ ଆରମ୍ଭ କରି ନାଗରିକ ଉତ୍ତରଦାୟିତ୍ୱ ଉପକରଣ ବିକାଶ ପର୍ଯ୍ୟନ୍ତ, ମୁଁ ଉଦ୍ଦେଶ୍ୟମୂଳକ ଡିଜାଇନ୍ ଏବଂ ଦୃଢ ସ୍ଥାପତ୍ୟ ମାଧ୍ୟମରେ ଗତି ସୃଷ୍ଟି କରିବା ଉପରେ ଧ୍ୟାନ ଦିଏ |'
  }
};

const initialProjects = [
  {
    id: 1,
    title: 'NagarSewa',
    status: 'ACTIVE',
    desc: 'Integrated AI image analysis and map tracking to bridge the gap between citizens and local governance.',
    tags: ['React Native', 'AI', 'Maps'],
    color: 'bg-teal-400',
    iconColor: 'text-teal-500',
    bgColor: 'bg-teal-50',
    iconBg: 'bg-teal-100'
  },
  {
    id: 2,
    title: 'FinDash',
    status: 'COMPLETED',
    desc: 'A comprehensive financial dashboard with real-time market data and predictive analytics.',
    tags: ['Next.js', 'Supabase', 'D3.js'],
    color: 'bg-blue-400',
    iconColor: 'text-blue-500',
    bgColor: 'bg-blue-50',
    iconBg: 'bg-blue-100'
  },
  {
    id: 3,
    title: 'EcoTrack',
    status: 'BETA',
    desc: 'Personal carbon footprint tracker with gamified community challenges and rewards.',
    tags: ['React', 'Firebase', 'Gamification'],
    color: 'bg-green-400',
    iconColor: 'text-green-500',
    bgColor: 'bg-green-50',
    iconBg: 'bg-green-100'
  }
];

const codeLines = [
  { id: 1, content: <><span className="text-purple-600">const</span> <span className="text-blue-600">developer</span> = {'{'}</> },
  { id: 2, content: <><span className="text-gray-500">name:</span> <span className="text-green-600">"Rajbir Majhi"</span>,</>, indent: true },
  { id: 3, content: <><span className="text-gray-500">focus:</span> [<span className="text-green-600">"React Native"</span>, <span className="text-green-600">"Supabase"</span>, <span className="text-green-600">"AI"</span>],</>, indent: true },
  { id: 4, content: <><span className="text-gray-500">goal:</span> <span className="text-green-600">"Creating seamless user experiences"</span>,</>, indent: true },
  { id: 5, content: <><span className="text-gray-500">loves:</span> [<span className="text-green-600">"Open Source"</span>, <span className="text-green-600">"Clean UI"</span>, <span className="text-green-600">"Hackathons"</span>]</>, indent: true },
  { id: 6, content: <>{'};'}</> },
];

const skillsData = [
  { name: 'React Native', icon: Smartphone },
  { name: 'React.js', icon: Code2 },
  { name: 'TypeScript', icon: FileCode },
  { name: 'Supabase', icon: Database },
  { name: 'Firebase', icon: Flame },
  { name: 'Next.js', icon: Globe },
  { name: 'Node.js', icon: Server },
  { name: 'Tailwind CSS', icon: Palette },
  { name: 'OpenAI API', icon: Sparkles },
  { name: 'PostgreSQL', icon: Database },
  { name: 'Git & GitHub', icon: GitBranch },
];

// --- Animation Variants ---

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const typewriterContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const typewriterChar = {
  hidden: { opacity: 0, display: 'none' },
  show: { opacity: 1, display: 'inline-block' }
};

const Heading = ({ title, subtitle, className = "" }: { title: string, subtitle?: string, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className={`space-y-4 ${className}`}
  >
    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
    {subtitle && <p className="text-gray-500">{subtitle}</p>}
  </motion.div>
);

const ZoomSection = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <motion.section ref={ref} style={{ scale, opacity }} className={className} id={id}>
      {children}
    </motion.section>
  );
};

const ScratchOverlay = ({ onReveal }: { onReveal: () => void }) => {
  const [scratched, setScratched] = useState<Set<number>>(new Set());
  const total = 100; // 10x10 grid
  
  useEffect(() => {
    if (scratched.size > total * 0.35) {
      onReveal();
    }
  }, [scratched.size, onReveal]);

  const handleHover = (i: number) => {
    setScratched(prev => {
      if (prev.has(i)) return prev;
      return new Set(prev).add(i);
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 grid grid-cols-10 grid-rows-10 rounded-[2.5rem] overflow-hidden"
      onClick={(e) => {
        e.stopPropagation();
        onReveal();
      }}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          onHoverStart={() => handleHover(i)}
          onPointerDown={() => handleHover(i)}
          animate={{ opacity: scratched.has(i) ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="bg-slate-200 border-[0.5px] border-slate-300/20 cursor-crosshair"
        />
      ))}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <span className="bg-white/90 text-slate-700 px-6 py-3 rounded-full font-bold shadow-lg backdrop-blur-sm">
          Hover or Click to Reveal
        </span>
      </div>
    </motion.div>
  );
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-shadow`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-shadow`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <input 
          type="text" 
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-shadow`}
          placeholder="Project Inquiry"
        />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
        <textarea 
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'} focus:outline-none focus:ring-2 transition-shadow resize-none`}
          placeholder="Tell me about your project..."
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
      </div>
      <button 
        type="submit" 
        disabled={status === 'loading' || status === 'success'}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center space-x-2"
      >
        {status === 'loading' ? (
          <><Loader2 size={20} className="animate-spin" /><span>Sending...</span></>
        ) : status === 'success' ? (
          <><CheckCircle size={20} /><span>Message Sent!</span></>
        ) : (
          <span>Send Message</span>
        )}
      </button>
    </form>
  );
};

export default function Portfolio() {
  const [lang, setLang] = useState<Language>('English');
  const [cards, setCards] = useState(initialProjects);
  const [revealedProjects, setRevealedProjects] = useState<Set<number>>(new Set());
  const [activeSection, setActiveSection] = useState('');

  // Smooth Scrolling Setup
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Scroll Zoom Effects
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Global background scale effect
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // Intersection Observer for Active Section
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const handleNextCard = () => {
    setCards((prev) => {
      const newCards = [...prev];
      const top = newCards.shift();
      if (top) newCards.push(top);
      return newCards;
    });
  };

  const handleCardClick = (index: number, projectId: number) => {
    if (index !== 0) {
      // Bring clicked card to the top
      setCards((prev) => {
        const newCards = [...prev];
        const clickedCard = newCards.splice(index, 1)[0];
        newCards.unshift(clickedCard);
        return newCards;
      });
    } else {
      // Top card
      if (!revealedProjects.has(projectId)) {
        // Reveal it
        setRevealedProjects(prev => new Set(prev).add(projectId));
      } else {
        // Already revealed, send to back
        handleNextCard();
      }
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-blue-200 pb-24 overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between sticky top-0 z-50 bg-[#F8F9FA]/80 backdrop-blur-md"
      >
        <div className="w-8"></div>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className={`transition-colors ${activeSection === 'about' ? 'text-blue-600 font-bold' : 'hover:text-gray-900'}`}>About</a>
          <a href="#skills" onClick={(e) => scrollToSection(e, 'skills')} className={`transition-colors ${activeSection === 'skills' ? 'text-blue-600 font-bold' : 'hover:text-gray-900'}`}>Skills</a>
          <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className={`transition-colors ${activeSection === 'projects' ? 'text-blue-600 font-bold' : 'hover:text-gray-900'}`}>Projects</a>
          <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className={`transition-colors ${activeSection === 'experience' ? 'text-blue-600 font-bold' : 'hover:text-gray-900'}`}>Experience</a>
        </nav>
        <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
          Contact Me
        </a>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-32">
        {/* Hero Section */}
        <ZoomSection className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex-1 space-y-8"
          >
            <motion.div variants={fadeUpItem} className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Open to New Opportunities</span>
            </motion.div>
            
            <motion.h1 
              variants={typewriterContainer} 
              initial="hidden" 
              animate="show" 
              className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900"
            >
              {"Hi, I'm Rajbir Majhi".split('').map((char, i) => (
                <motion.span key={i} variants={typewriterChar}>
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="text-xl text-gray-600 leading-relaxed max-w-2xl flex flex-wrap gap-x-1.5">
              {"I am a Cross-Platform Developer building impactful solutions with React Native, Supabase, and AI".split(' ').map((word, i) => (
                <motion.span key={i} variants={fadeUpItem} className={word === 'Cross-Platform' || word === 'Developer' ? 'font-semibold text-blue-600 italic' : ''}>
                  {word}
                </motion.span>
              ))}
            </motion.div>
            
            <motion.div variants={fadeUpItem} className="flex items-center space-x-4">
              <a href="#projects" onClick={(e) => scrollToSection(e, 'projects')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-medium transition-colors shadow-lg shadow-blue-600/20 inline-block">
                View My Work
              </a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-8 py-3.5 rounded-full font-medium transition-colors inline-block">
                Learn More
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex-1 relative"
          >
            {/* Background shape */}
            <motion.div style={{ scale: bgScale }} className="absolute top-4 -left-4 right-4 -bottom-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-[3rem] -z-10"></motion.div>
            
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/rajbir/800/800" 
                alt="Rajbir Majhi" 
                fill 
                className="object-cover mix-blend-overlay opacity-80"
                referrerPolicy="no-referrer"
              />
              <Image 
                src="https://picsum.photos/seed/portrait/800/800" 
                alt="Rajbir Majhi" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-4 border border-gray-100"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                <MonitorSmartphone size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Experience</p>
                <p className="font-bold text-gray-900">Building Digital Solutions</p>
              </div>
            </motion.div>
          </motion.div>
        </ZoomSection>

        {/* Professional Narrative */}
        <ZoomSection className="relative bg-[#F1F3F5] rounded-[3rem] p-8 lg:p-16 flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="absolute -top-6 -right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer"
          >
            <MessageSquare size={24} />
          </motion.div>

          <div className="flex-1 space-y-8">
            <Heading title="Professional Narrative" className="text-left" />
            
            <div className="flex items-center space-x-2 bg-gray-200/50 p-1 rounded-full w-fit">
              {(['English', 'Hindi', 'Odia'] as const).map((l) => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${lang === l ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            
            <div className="space-y-6 text-gray-600 leading-relaxed min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lang}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <p>{translations[lang].p1}</p>
                  <p>{translations[lang].p2}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ y: -5 }} className="bg-white px-8 py-6 rounded-3xl shadow-sm border border-gray-100 flex-1 min-w-[150px]">
                <p className="text-4xl font-extrabold text-blue-600 mb-1">3+</p>
                <p className="text-sm font-semibold text-gray-600">Years Coding</p>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="bg-white px-8 py-6 rounded-3xl shadow-sm border border-gray-100 flex-1 min-w-[150px]">
                <p className="text-4xl font-extrabold text-purple-600 mb-1">10+</p>
                <p className="text-sm font-semibold text-gray-600">Projects Built</p>
              </motion.div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <motion.div 
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 font-mono text-sm overflow-x-auto"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <div className="text-blue-600 mb-4 font-semibold">// AboutMe.ts</div>
              {codeLines.map((line) => (
                <motion.div 
                  key={line.id} 
                  variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                  className={line.indent ? "pl-4 mt-2" : "mt-2"}
                >
                  {line.content}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ZoomSection>

        {/* Core Competencies */}
        <ZoomSection id="skills" className="text-center space-y-12">
          <Heading title="Core Competencies" subtitle="Technical stack that powers my creative engine." />
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
          >
            {skillsData.map((skill) => (
              <motion.div 
                key={skill.name} 
                variants={fadeUpItem}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-purple-100 text-purple-700 px-6 py-3 rounded-full font-medium transition-colors cursor-default flex items-center space-x-2"
              >
                <skill.icon size={18} />
                <span>{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </ZoomSection>

        {/* Featured Projects (Stacked Scratch Cards) */}
        <ZoomSection id="projects" className="space-y-12">
          <Heading title="Featured Projects" subtitle="Click the top card to reveal the next piece of digital craftsmanship." />
          
          <div className="relative h-[700px] md:h-[450px] max-w-5xl mx-auto w-full perspective-1000">
            <AnimatePresence mode="popLayout">
              {cards.map((project, index) => {
                const isTop = index === 0;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    animate={{ 
                      opacity: 1 - index * 0.15, 
                      scale: 1 - index * 0.05, 
                      y: index * 24,
                      zIndex: cards.length - index
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: -100, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`absolute top-0 left-0 right-0 bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center origin-top cursor-pointer hover:shadow-3xl`}
                    onClick={() => handleCardClick(index, project.id)}
                  >
                    <div className={`w-full md:w-1/2 aspect-square max-w-sm relative ${project.bgColor} rounded-3xl flex items-center justify-center p-8 overflow-hidden`}>
                      {!revealedProjects.has(project.id) && isTop && (
                        <ScratchOverlay onReveal={() => setRevealedProjects(prev => new Set(prev).add(project.id))} />
                      )}
                      <div className={`w-full h-full ${project.color} rounded-3xl relative shadow-inner flex flex-col items-center justify-center`}>
                         <div className="absolute top-0 w-1/2 h-8 bg-black/10 rounded-t-xl -mt-8"></div>
                         <div className="w-24 h-32 bg-white rounded-xl flex items-center justify-center shadow-md">
                           <div className={`w-12 h-12 ${project.iconBg} rounded-full flex items-center justify-center`}>
                             <div className={`w-6 h-6 ${project.iconColor}`}>
                               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                             </div>
                           </div>
                         </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-3xl font-bold text-gray-900">{project.title}</h3>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{project.status}</span>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {project.desc}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="pt-4">
                        <button onClick={(e) => e.stopPropagation()} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center space-x-2">
                          <span>View Details</span>
                          <ArrowRight size={18} />
                        </button>
                        {isTop && (
                          <p className="text-center text-xs text-gray-400 mt-4 animate-pulse">
                            {!revealedProjects.has(project.id) ? "Click anywhere to reveal, or scratch the image" : "Click card to view next project"}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ZoomSection>

        {/* Milestones & Achievements */}
        <ZoomSection className="space-y-12">
          <Heading title="Milestones & Achievements" className="text-center" />
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Card 1 */}
            <motion.div 
              variants={fadeUpItem}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform">
                <Trophy size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hackathon Bronze</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Secured 3rd Place in a National Level Innovation Hackathon, architecting a Safety Tech solution under 48 hours.
              </p>
            </motion.div>
            
            {/* Card 2 */}
            <motion.div 
              variants={fadeUpItem}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform">
                <Globe size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Social Impact Award</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Recognized for "NagarSewa", a top civic tool addressing local governance gaps through AI and map tracking.
              </p>
            </motion.div>
            
            {/* Card 3 */}
            <motion.div 
              variants={fadeUpItem}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6 group-hover:rotate-0 transition-transform">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tech Leadership</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Led cross-functional development teams of 5+ members, ensuring agile delivery and successful project deployments.
              </p>
            </motion.div>
          </motion.div>
        </ZoomSection>

        {/* Academic Journey */}
        <ZoomSection id="experience" className="space-y-12">
          <Heading title="Academic Journey" />
          
          <div className="relative max-w-4xl">
            {/* Animated Vertical Line */}
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-[27px] top-4 w-0.5 bg-blue-600 origin-top"
            />
            
            <div className="space-y-12">
              {/* Item 1: BPUT Hackathon */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative pl-24"
              >
                <div className="absolute left-0 top-0 w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-4 border-[#F8F9FA]">
                  <Trophy size={24} />
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    Oct 2025 • 36 Hours
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">BPUT Hackathon 2025</h3>
                  <p className="text-gray-600 font-medium mb-4">Conducted by BPUT</p>
                  <div className="w-12 h-1 bg-yellow-500 rounded-full mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Developed "MEIL Safety", a workplace safety application. Built and integrated Supabase workflows for secure login, storage, and authorized data access. Delivered a working product within 36 hours, earning <strong className="text-gray-900">3rd place</strong> out of 50+ teams.
                  </p>
                </div>
              </motion.div>

              {/* Item 2: Smart India Hackathon */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative pl-24"
              >
                <div className="absolute left-0 top-0 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-4 border-[#F8F9FA]">
                  <Code2 size={24} />
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    Sept 2025 • 24 Hours
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Smart India Hackathon 2025</h3>
                  <p className="text-gray-600 font-medium mb-4">National-Level Competition</p>
                  <div className="w-12 h-1 bg-green-500 rounded-full mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    Built "Nagar Sewa", a civic issue reporting platform. Implemented data models, offline capture with auto-sync, and deployed the backend to Vercel within the 24-hour window. Participated as a finalist.
                  </p>
                </div>
              </motion.div>

              {/* Item 3: B.Tech */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative pl-24"
              >
                <div className="absolute left-0 top-0 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-4 border-[#F8F9FA]">
                  <GraduationCap size={24} />
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    2024 - 2028 (Expected)
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Bachelor of Technology (B.Tech)</h3>
                  <p className="text-gray-600 font-medium mb-4">Computer Science & Information Technology • Trident Academy of Technology</p>
                  <div className="w-12 h-1 bg-blue-600 rounded-full mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    My journey into deep tech began here. I didn't just attend lectures; I immersed myself in the ecosystem. From leading the university's coding club to building my first full-stack application, this phase was about transforming theoretical knowledge into tangible, impactful software.
                  </p>
                </div>
              </motion.div>
              
              {/* Item 4: High School */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative pl-24"
              >
                <div className="absolute left-0 top-0 w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg z-10 border-4 border-[#F8F9FA]">
                  <BookOpen size={24} />
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                    2021 - 2023
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Senior Secondary Education</h3>
                  <p className="text-gray-600 font-medium mb-4">Science (PCM) • Kendriya Vidyalaya</p>
                  <div className="w-12 h-1 bg-purple-600 rounded-full mb-4"></div>
                  <p className="text-gray-600 leading-relaxed">
                    The foundation of my analytical thinking. Physics and Mathematics taught me how to break down complex, real-world problems into solvable equations—a mindset that perfectly translates into how I architect software systems today.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </ZoomSection>

        {/* Contact Me */}
        <ZoomSection id="contact" className="space-y-12 max-w-3xl mx-auto w-full">
          <Heading title="Get in Touch" subtitle="Have a project in mind or just want to say hi? I'd love to hear from you." className="text-center" />
          <ContactForm />
        </ZoomSection>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 relative"
        >
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Rajbir Majhi</h2>
            <p className="text-gray-500 text-sm">© 2024 Rajbir Majhi. Built with Passion.</p>
          </div>
          
          <div className="flex items-center space-x-8 text-gray-600 font-medium">
            <a href="#" className="hover:text-blue-600 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Twitter</a>
          </div>
          
          <button className="bg-white border border-gray-200 shadow-sm hover:shadow-md text-gray-900 px-6 py-3 rounded-full font-medium flex items-center space-x-2 transition-all">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <Mail size={16} />
            </div>
            <span>Get in Touch</span>
          </button>
        </motion.div>
      </footer>
    </div>
  );
}

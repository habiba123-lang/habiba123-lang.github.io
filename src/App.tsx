import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  Cpu, 
  Sparkles, 
  ArrowUpRight, 
  Github, 
  Instagram, 
  ArrowRight,
  Plus,
  Moon,
  Hash,
  Menu,
  X,
  Eye,
  Clock,
  Zap,
  Heart,
  Globe,
  Monitor,
  Facebook,
  Linkedin,
  Share2,
  Check,
  Link as LinkIcon
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { POSTS, type Post } from './data/posts';

const images = {
  zaheer: "https://res.cloudinary.com/dkxgv1xnt/image/upload/v1767796843/zaheer_1_r4hvje.png",
  maliha: "https://res.cloudinary.com/dkxgv1xnt/image/upload/v1767796845/maliha_1_cbkiwk.jpg",
  creator: "https://res.cloudinary.com/dkxgv1xnt/image/upload/v1767796845/027A7509_ox5orq.jpg",
  hishma: "https://res.cloudinary.com/dkxgv1xnt/image/upload/v1767796845/hishma_1_tggtbd.jpg",
  logo: "https://res.cloudinary.com/dkxgv1xnt/image/upload/v1767796793/android-chrome-192x192_hor42u.png",
};

// --- Components ---

const MetaChip = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-bold uppercase tracking-widest text-stone-500 ${className}`}>
    {children}
  </span>
);

const CopyLinkButton = ({ postId }: { postId: number }) => {
  const [copied, setCopied] = useState(false);

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    textArea.style.top = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    const url = `${window.location.origin}/#post-${postId}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-3 px-5 py-2 rounded-full bg-stone-950 border border-white/10 text-stone-400 hover:text-amber-500 hover:border-amber-500/30 transition-all duration-500"
    >
      {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
      <span className="text-[9px] font-bold uppercase tracking-widest">{copied ? 'Copied' : 'Copy Link'}</span>
    </button>
  );
};

const TableOfContents = ({ content }: { content: string }) => {
  const headers = content.split('\n\n')
    .filter(block => block.startsWith('## ') || block.startsWith('### '))
    .map(block => {
      const level = block.startsWith('## ') ? 2 : 3;
      const text = block.replace(/^###?\s/, '');
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      return { level, text, id };
    });

  if (headers.length < 3) return null;

  return (
    <div className="hidden xl:block sticky top-32 h-fit w-64 space-y-8 pointer-events-auto shrink-0">
      <div className="space-y-6">
        <span className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-4 block">Navigation Map</span>
        <div className="space-y-5 border-l border-white/5 pl-6">
          {headers.map((header, i) => (
            <a
              key={i}
              href={`#${header.id}`}
              className={`block text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-500 hover:text-amber-500 ${
                header.level === 3 ? 'pl-4 text-stone-700 hover:pl-6' : 'text-stone-500'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(header.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {header.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const AuthorCard = ({ name }: { name?: string }) => {
  const authorKey = name?.toLowerCase().trim();
  const isMaliha = authorKey === 'maliha';
  const isHishma = authorKey === 'hishma';
  const isZaheer = authorKey === 'zaheer';
  
  const authorData = isMaliha ? {
    name: "Syeda Maliha Marium",
    role: "Network Security Researcher",
    image: images.maliha,
    location: "Tianjin",
    title: "Journalist & Researcher",
    bio: "I am Syeda Maliha Marium, a graduate student at Tianjin University, specializing in network security. As an individual, I embrace optimism and strive to maintain confidence in the face of challenges. Beyond my academic pursuits, I find joy in writing, observing life and people, and holding a steadfast belief in miracles. Additionally, my passions extend to the realms of traveling and cooking."
  } : isHishma ? {
    name: "Bourhani Hishma Vola-Justine",
    role: "Medical Student",
    image: images.hishma,
    location: "Haikou",
    title: "Medical Scholar",
    bio: "Ms. Bourhani Hishma Vola-Justine, a medical student in Haikou, China, is full of curiosity and does not shy away from learning new skills. Her personal experiences, combined with her years of study in medicine, have allowed her to develop more empathy and have deepened her desire to help people and find balance in life."
  } : isZaheer ? {
    name: "Zaheer Anwar",
    role: "HCI Researcher",
    image: images.zaheer,
    location: "Tianjin",
    title: "Researcher",
    bio: "Mr. Zaheer Anwar, a researcher in the field of human-computer interaction (HCI), brings over 4 years of experience to his work. His passion for designing technology that seamlessly integrates with human needs. This blend of academic expertise and real-world experience positions his perfectly to lead this exciting new project exploring the potential of virtual reality for language learning."
  } : {
    name: "Mroivili Faouzia",
    role: "The Creator",
    image: images.creator,
    location: "Tianjin",
    title: "Digital Artisan",
    bio: "Hi there, I’m Mroivili Faouzia, the creator of Tech & Wisdom. I’m passionate about technology and endlessly curious about life. I also have a special interest in Chinese culture. On this blog, I share honest insights on topics ranging from coding to personal growth."
  };

  return (
    <div className="mt-20 p-8 md:p-10 rounded-[2.5rem] bg-stone-950/40 border border-white/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[80px] rounded-full -mr-16 -mt-16" />
      
      <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        <div className="shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border border-white/10 p-1 bg-stone-900 group-hover:border-amber-500/30 transition-colors duration-700">
            <ImageWithFallback 
              src={authorData.image} 
              alt={authorData.name} 
              className="w-full h-full object-cover rounded-2xl grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
            />
          </div>
        </div>
        
        <div className="flex-1 space-y-4">
          <div>
            <span className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-1 block">{authorData.role}</span>
            <h4 className="text-2xl font-serif text-white">{authorData.name}</h4>
          </div>
          
          <p className="text-stone-400 text-sm md:text-base leading-relaxed font-light">
            {authorData.bio}
          </p>

          <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
              {authorData.title}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-500">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-700" />
              {authorData.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NoiseOverlay = () => (
  <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03] mix-blend-overlay">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const BackgroundDecoration = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, 500]);
  const y3 = useTransform(scrollY, [0, 2000], [0, -200]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-stone-950">
      {/* Dynamic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1917_1px,transparent_1px),linear-gradient(to_bottom,#1c1917_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      {/* Floating Cinematic Blobs */}
      <motion.div 
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.12, 0.08],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-15%] left-[-5%] w-[70%] h-[70%] bg-amber-900/10 blur-[250px] rounded-full mix-blend-screen" 
      />
      
      <motion.div 
        style={{ y: y2 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.2, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-15%] right-[-10%] w-[80%] h-[80%] bg-stone-800/20 blur-[200px] rounded-full mix-blend-screen" 
      />

      <motion.div 
        style={{ y: y3 }}
        animate={{
          x: [0, 100, 0],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[30%] right-[10%] w-[50%] h-[50%] bg-amber-600/5 blur-[180px] rounded-full mix-blend-overlay" 
      />

      {/* Radial Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,25,23,0.1)_0%,transparent_100%)]" />
      
      {/* Secondary Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('[data-magnetic]');
      setIsHovering(!!target.closest('a, button, .cursor-pointer'));
      setCursorText(magneticElement?.getAttribute('data-magnetic') || '');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-amber-500 rounded-full pointer-events-none z-[100] hidden lg:block"
        animate={{ x: mousePos.x - 6, y: mousePos.y - 6, scale: isHovering ? 0 : 1 }}
        transition={{ type: "spring", damping: 35, stiffness: 350, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 border border-amber-500/40 rounded-full pointer-events-none z-[100] hidden lg:block flex items-center justify-center backdrop-blur-[2px]"
        animate={{ 
          x: mousePos.x - 28, 
          y: mousePos.y - 28,
          scale: isHovering ? 1.4 : 0.8,
          opacity: isHovering ? 1 : 0.2
        }}
        transition={{ type: "spring", damping: 45, stiffness: 200, mass: 0.8 }}
      >
        {cursorText && (
          <span className="text-[9px] font-bold uppercase text-amber-500 tracking-widest whitespace-nowrap">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mood, setMood] = useState('Focus');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Vision', 'Archives', 'Essence', 'Connect'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled || isMobileMenuOpen ? 'py-4 bg-stone-950/80 backdrop-blur-3xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-amber-500 transition-all duration-500 group-hover:scale-110 group-hover:border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] overflow-hidden">
              <ImageWithFallback src={images.logo} alt="Digital Artisan Logo" className="w-6 h-6 object-contain brightness-110" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-white leading-none font-bold">M.Faouzia.</span>
              <span className="text-[8px] font-bold text-stone-500 uppercase tracking-[0.4em] mt-1">Tech & Wisdom Chronicles</span>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-3 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">
              Tianjin: <span className="text-white">{mood}</span>
            </span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((item) => (
            <a 
              key={item} 
              href={item === 'Essence' ? '#experience' : `#${item.toLowerCase()}`}
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-amber-500 transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex w-10 h-10 rounded-full border border-white/10 items-center justify-center text-stone-400 hover:bg-white/5 transition-all">
            <Moon size={18} />
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all z-50"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden absolute top-full left-0 right-0 bg-stone-950/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-12 flex flex-col gap-8">
              {navLinks.map((item, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item}
                  href={item === 'Essence' ? '#experience' : `#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-serif text-white hover:text-amber-500 transition-colors flex items-center justify-between group"
                >
                  <span>{item}</span>
                  <ArrowRight size={20} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
              
              <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Github size={18} className="text-stone-500" />
                  <Instagram size={18} className="text-stone-500" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500">Live in Tianjin</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.05]);

  return (
    <section id="vision" className="min-h-screen flex flex-col items-center justify-center px-6 relative pt-20 overflow-hidden bg-transparent">
      {/* Cinematic Lens Flare & Depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[150%] aspect-square bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.03)_0%,transparent_70%)] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
      
      {/* Coordinate Lines with Narrative markers */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 flex justify-between px-12 pointer-events-none z-0 text-stone-700">
        <div className="flex flex-col gap-1 -translate-y-full py-4">
          <span className="text-[7px] font-mono uppercase tracking-[0.4em]">39°08′N 117°11′E</span>
          <span className="text-[6px] text-amber-500/40 font-mono uppercase tracking-[0.2em]">Origin: Tianjin</span>
        </div>
        <div className="flex flex-col items-end gap-1 -translate-y-full py-4">
          <span className="text-[7px] font-mono uppercase tracking-[0.4em]">Ref. ARTISAN-01</span>
          <span className="text-[6px] text-amber-500/40 font-mono uppercase tracking-[0.2em]">Status: Stealth</span>
        </div>
      </div>

      <motion.div style={{ y: yText, opacity, scale }} className="max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="mb-16 inline-block relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "8rem" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
              className="h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mb-6"
            />
            <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-amber-500/60 block">
              Digital Artisan · Narrative Repository
            </span>
          </div>
          
          <h1 className="text-7xl md:text-[10rem] lg:text-[14rem] font-serif text-white tracking-tighter leading-[0.75] mb-20 select-none relative group">
            <span className="block overflow-hidden pb-4">
              <motion.span 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="block hover:text-stone-300 transition-colors cursor-default"
              >
                Silent
              </motion.span>
            </span>
            <span className="block overflow-hidden italic font-light text-stone-900 relative">
              <motion.span 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.8, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="block group-hover:text-stone-800 transition-colors cursor-default"
              >
                Move.
              </motion.span>
              <div className="absolute -right-12 top-1/2 w-48 h-px bg-gradient-to-r from-amber-500/20 to-transparent hidden lg:block" />
              <div className="absolute -left-12 top-1/2 w-48 h-px bg-gradient-to-l from-amber-500/20 to-transparent hidden lg:block" />
            </span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mt-32 border-t border-white/5 pt-16">
            {[
              { 
                label: "Architectural Stealth", 
                desc: "Mapping the invisible logic of AI and Knowledge Graphs.",
                icon: <Monitor size={14} className="text-amber-500/40" />
              },
              { 
                label: "The China Odyssey", 
                desc: "Traversing 20 cities where culture meets the digital edge.",
                icon: <Globe size={14} className="text-amber-500/40" />
              },
              { 
                label: "Deliberate Motion", 
                desc: "A personal manifesto on privacy, discipline, and deep work.",
                icon: <Zap size={14} className="text-amber-500/40" />
              }
            ].map((pillar, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + (i * 0.2) }}
                className="text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  {pillar.icon}
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 group-hover:text-amber-500 transition-colors">{pillar.label}</span>
                </div>
                <p className="text-xs text-stone-500 font-light leading-relaxed group-hover:text-stone-400 transition-colors">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 flex flex-col items-center gap-12">
            <p className="text-sm text-stone-400 font-light max-w-xl italic leading-relaxed">
              "Excellence isn't a headline. It's a guarantee written in the invisible layers of engineering and the deliberate choices of a private life."
            </p>
            
            <button 
              onClick={() => document.getElementById('archives')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-14 py-6 bg-transparent text-white border border-white/10 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-amber-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]" />
              <span className="relative z-10 group-hover:text-stone-950 transition-colors duration-500 flex items-center gap-4">
                Enter the Archive <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Atmospheric Visuals */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(120,53,15,0.05)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-stone-950 to-transparent" />
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1728289306599-399d47b9cb43" 
          alt="Cinematic Foggy Architecture"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover opacity-[0.15] mix-blend-lighten pointer-events-none grayscale"
        />
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-12 left-6 md:left-12 flex flex-col gap-10 opacity-30"
      >
        <div className="flex flex-col gap-6 text-stone-500">
          <Github size={14} className="hover:text-amber-500 cursor-pointer transition-colors" />
          <Instagram size={14} className="hover:text-amber-500 cursor-pointer transition-colors" />
        </div>
        <div className="h-32 w-px bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
      
      <div className="absolute bottom-12 right-6 md:right-12 flex flex-col items-end gap-2 opacity-20">
        <span className="text-[7px] font-mono uppercase tracking-[0.4em] text-stone-500 rotate-90 origin-right translate-y-20">Scroll to explore narrative</span>
      </div>
    </section>
  );
};

const TechStackMarquee = () => {
  const tech = [
    "React.js", "TypeScript", "Tailwind CSS", "Node.js", "Python", 
    "Mandarin HSK", "Cybersecurity", "Next.js", "Supabase", "Motion", 
    "UI/UX Design", "PostgreSQL", "Git", "Figma"
  ];

  return (
    <div className="py-24 border-y border-white/5 bg-stone-950/80 backdrop-blur-md overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-stone-950 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-stone-950 to-transparent z-10" />
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-24 items-center pr-24"
        >
          {tech.map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.5em] text-stone-600 hover:text-amber-500 transition-colors cursor-default">
                {item}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {tech.map((item, i) => (
            <div key={`dup-${i}`} className="flex items-center gap-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.5em] text-stone-600 hover:text-amber-500 transition-colors cursor-default">
                {item}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const NarrativeTimeline = () => {
  const milestones = [
    { year: "2017", title: "The Bridge", desc: "Crossing borders for the Chinese Bridge Competition a catalyst for a global perspective." },
    { year: "2019", title: "Dalian Arrival", desc: "Beginning the academic journey at Dalian University, immersing in a new digital ecosystem." },
    { year: "2022", title: "The Silent Seed", desc: "A chilly January evening where the vision for 'Tech & Wisdom' first took shape a commitment to share the self with the world." },
    { year: "2024", title: "Chronicles Launch", desc: "January 1st: The digital space is born. Overcoming the hurdles of domain and code to launch the initial blog." },
    { year: "2025", title: "Present Synthesis", desc: "Refining the 'Digital Artisan' philosophy in Tianjin, blending architectural logic with the spirit of the 'Silent Move'." }
  ];

  return (
    <section className="py-40 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">The Creed</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Core <br />
            <span className="italic text-stone-600 font-light">Principles.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            { id: "01", title: "Silence & Action", desc: "Let the results do the talking. Real progress happens in the quiet moments of deep focus and hard work." },
            { id: "02", title: "Built to Last", desc: "Quality is never an accident. Everything should be built with a strong foundation and clear, solid logic." },
            { id: "03", title: "Heart in Tech", desc: "Tools are made for people. Good technology should feel warm, helpful, and keep the human spirit at the center." },
            { id: "04", title: "Open Worlds", desc: "Wisdom has no borders. Connecting different cultures and ideas is the best way to find unique solutions." }
          ].map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="relative group"
            >
              <div className="text-7xl font-serif text-stone-900 group-hover:text-amber-500/30 transition-all duration-700 mb-10 leading-none tracking-tighter scale-95 group-hover:scale-100 origin-left">
                {pillar.id}
              </div>
              <div className="h-px w-full bg-white/5 mb-10 relative">
                <div className="absolute top-0 left-0 h-full w-0 bg-amber-500 group-hover:w-full transition-all duration-1000 ease-out" />
                <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-amber-500 opacity-0 group-hover:opacity-100 transition-all delay-500" />
              </div>
              <h4 className="text-2xl font-serif text-white mb-6 tracking-wide group-hover:text-amber-500 transition-colors">{pillar.title}</h4>
              <p className="text-stone-500 text-sm leading-relaxed font-light group-hover:text-stone-400 transition-colors">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Life', 'Technology', 'Security', 'Philosophy', 'Culture', 'Personal Development', 'Productivity', 'Tips'];

  const filteredPosts = [...POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).filter(post => {
    const matchesCategory = activeCategory === 'All' || 
      post.category.toLowerCase() === activeCategory.toLowerCase() ||
      (activeCategory === 'Personal Development' && post.category === 'Philosophy') ||
      (activeCategory === 'Culture' && (post.category === 'China' || post.category === 'Travel'));
    
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const renderContent = (content: string) => {
    const slugify = (text: string) => text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    
    return content.split('\n\n').map((block, idx) => {
      const cleanBlock = block.trim();
      if (!cleanBlock) return null;

      if (cleanBlock.startsWith('# ')) {
        const text = cleanBlock.replace('# ', '');
        return <h1 id={slugify(text)} key={idx} className="text-4xl md:text-5xl font-serif text-white mt-16 mb-8 border-l-4 border-amber-500 pl-6 leading-tight">{text}</h1>;
      }
      if (cleanBlock.startsWith('## ')) {
        const text = cleanBlock.replace('## ', '');
        return <h2 id={slugify(text)} key={idx} className="text-3xl md:text-4xl font-serif text-white mt-14 mb-6 leading-snug">{text}</h2>;
      }
      if (cleanBlock.startsWith('### ')) {
        const text = cleanBlock.replace('### ', '');
        return <h3 id={slugify(text)} key={idx} className="text-xl md:text-2xl font-serif text-white mt-10 mb-4">{text}</h3>;
      }
      if (cleanBlock.startsWith('- ') || cleanBlock.startsWith('* ')) {
        const items = cleanBlock.split('\n');
        return (
          <ul key={idx} className="space-y-4 mb-10 ml-6">
            {items.map((item, i) => (
              <li key={i} className="text-stone-400 font-light flex gap-4 leading-relaxed text-lg">
                <span className="text-amber-500 mt-2 shrink-0">•</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: item.replace(/^[-*]\s/, '')
                }} />
              </li>
            ))}
          </ul>
        );
      }
      if (cleanBlock.match(/^\d\.\s/)) {
        const items = cleanBlock.split('\n');
        return (
          <ol key={idx} className="space-y-4 mb-10 ml-6">
            {items.map((item, i) => (
              <li key={i} className="text-stone-400 font-light flex gap-4 leading-relaxed text-lg">
                <span className="text-amber-500 font-bold font-mono text-xs mt-1.5 shrink-0">{i + 1}.</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: item.replace(/^\d\.\s/, '')
                }} />
              </li>
            ))}
          </ol>
        );
      }
      if (cleanBlock.includes('<img')) {
        const srcMatch = cleanBlock.match(/src="([^"]+)"/);
        const altMatch = cleanBlock.match(/alt="([^"]+)"/);
        const widthMatch = cleanBlock.match(/width="([^"]+)"/);
        
        return srcMatch ? (
          <div key={idx} className="my-16 flex justify-center group">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-stone-900/40 p-2 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <img 
                src={srcMatch[1]} 
                alt={altMatch?.[1] || ""} 
                style={{ 
                  maxWidth: '100%',
                  height: 'auto',
                  width: widthMatch ? `${widthMatch[1]}px` : 'auto'
                }}
                className="rounded-[2rem] object-contain mx-auto transition-all duration-700 grayscale-[0.2] group-hover:grayscale-0" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 to-transparent pointer-events-none" />
            </div>
          </div>
        ) : null;
      }
      
      return (
        <p 
          key={idx} 
          className="text-stone-400 leading-[1.9] text-lg font-light mb-10 tracking-wide"
          dangerouslySetInnerHTML={{ __html: cleanBlock }}
        />
      );
    });
  };

  const categoryData = {
    'All': {
      title: 'The Full Archives',
      description: 'The complete narrative of my digital and physical odyssey.',
      image: 'https://images.unsplash.com/photo-1651342490124-c2042b78d41c?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Total Entries', value: POSTS.length },
        { label: 'Eras Covered', value: '4' },
        { label: 'Words Written', value: '18.6k' }
      ]
    },
    'Life': {
      title: 'Living Better',
      description: 'Navigating the complexities of existence, travel, and cultural adaptation.',
      image: 'https://images.unsplash.com/photo-1728289306599-399d47b9cb43?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Guides', value: '1' },
        { label: 'Focus', value: 'Living' },
        { label: 'Impact', value: 'High' }
      ]
    },
    'Technology': {
      title: 'Digital Craft',
      description: 'Exploring the elegant logic of code and the future of engineering.',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Systems', value: 'Distributed' },
        { label: 'Focus', value: 'Architecture' },
        { label: 'Logic', value: 'Pure' }
      ]
    },
    'Security': {
      title: 'Digital Fortitude',
      description: 'Protecting your online identity and navigating the digital landscape safely.',
      image: 'https://images.unsplash.com/photo-1639503547276-90230c4a4198?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Safety', value: 'Essential' },
        { label: 'Focus', value: 'Defense' },
        { label: 'Tools', value: '2FA' }
      ]
    },
    'Philosophy': {
      title: 'Silent Wisdom',
      description: 'Reflections on failure, mindset, and the quiet pursuit of excellence.',
      image: 'https://images.unsplash.com/photo-1760608456358-5cfc6fd39232?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Mindset', value: 'Growth' },
        { label: 'Focus', value: 'Perspective' },
        { label: 'Depth', value: 'Deep' }
      ]
    },
    'Culture': {
      title: 'Ancient Echoes',
      description: 'Discovering history and tradition through a modern lens.',
      image: 'https://images.unsplash.com/photo-1704265587155-284d028eaf02?auto=format&fit=crop&q=80',
      stats: [
        { label: 'History', value: 'Ancient' },
        { label: 'Focus', value: 'Heritage' },
        { label: 'Era', value: 'Shang' }
      ]
    },
    'Personal Development': {
      title: 'Internal Growth',
      description: 'The science of building habits and evolving into your best self.',
      image: 'https://images.unsplash.com/photo-1544654187-454deb2b423e?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Habits', value: 'Atomic' },
        { label: 'Focus', value: 'Consistency' },
        { label: 'Steps', value: 'Small' }
      ]
    },
    'Productivity': {
      title: 'System Mastery',
      description: 'Transforming chaos into clarity through disciplined time management.',
      image: 'https://images.unsplash.com/photo-1764933173563-9f2e62b3828e?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Efficiency', value: 'Max' },
        { label: 'Focus', value: 'Systems' },
        { label: 'Method', value: 'Micro' }
      ]
    },
    'Tips': {
      title: 'Practical Guidance',
      description: 'Essential advice for students and travelers navigating new environments.',
      image: 'https://images.unsplash.com/photo-1758471576777-f8c87bb3c067?auto=format&fit=crop&q=80',
      stats: [
        { label: 'Category', value: 'Education' },
        { label: 'Focus', value: 'Success' },
        { label: 'Author', value: 'Hishma' }
      ]
    }
  };

  const relatedPosts = activePost 
    ? [...POSTS]
        .filter(p => p.id !== activePost.id && (p.category === activePost.category || p.author === activePost.author))
        .slice(0, 2)
    : [];

  return (
    <section id="archives" className="py-40 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Search & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Archive Explorer</span>
            <h2 className="text-5xl font-serif text-white">Search the <span className="italic text-stone-500 font-light">Narrative</span></h2>
          </div>
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="SEARCH ENTRIES..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900/50 border border-white/5 rounded-full px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-white placeholder:text-stone-700 focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-700 pointer-events-none">
              <Compass size={16} />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between mb-32 gap-20">
          <div className="max-w-2xl relative">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
                {activeCategory === 'All' ? 'Archives' : activeCategory}
              </span>
              <h2 className="text-6xl md:text-8xl font-serif text-white leading-[0.9] mb-10">
                {categoryData[activeCategory]?.title.split(' ')[0]} <br />
                <span className="italic text-stone-600 font-light">{categoryData[activeCategory]?.title.split(' ').slice(1).join(' ')}</span>
              </h2>
              <p className="text-stone-400 text-xl font-light leading-relaxed max-w-lg mb-12">
                {categoryData[activeCategory]?.description || 'Exploring the nuances of digital craft and ancient wisdom.'}
              </p>

              <div className="flex gap-12 border-t border-white/5 pt-10">
                {(() => {
                  const filteredStatsPosts = activeCategory === 'All' 
                    ? POSTS 
                    : POSTS.filter(p => p.category === activeCategory);
                  
                  const totalEntriesCount = filteredStatsPosts.length;
                  const erasCoveredCount = new Set(filteredStatsPosts.map(p => {
                    const parts = p.date.split(',');
                    return parts.length > 1 ? parts[parts.length - 1].trim() : p.date;
                  })).size;
                  
                  const totalWordsCount = filteredStatsPosts.reduce((acc, p) => {
                    const words = (p.content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(w => w.length > 0).length;
                    return acc + words;
                  }, 0);
                  
                  const wordsWrittenDisplay = totalWordsCount >= 1000 
                    ? `${(totalWordsCount / 1000).toFixed(1)}k` 
                    : totalWordsCount;

                  const displayStats = activeCategory === 'All' ? [
                    { label: 'Total Entries', value: totalEntriesCount },
                    { label: 'Eras Covered', value: erasCoveredCount },
                    { label: 'Words Written', value: wordsWrittenDisplay }
                  ] : (categoryData[activeCategory]?.stats || []);

                  return displayStats.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-600 block">{stat.label}</span>
                      <span className="text-xl font-serif text-white">{stat.value}</span>
                    </div>
                  ));
                })()}
              </div>
            </motion.div>
          </div>
          
          <div className="w-full lg:w-1/3 space-y-12">
            <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/10 relative group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0"
                >
                  <ImageWithFallback
                    src={categoryData[activeCategory]?.image || categoryData['All'].image}
                    alt={activeCategory}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
              {categories.map((cat) => {
                const count = cat === 'All' ? POSTS.length : POSTS.filter(p => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] border transition-all duration-500 ${
                      activeCategory === cat 
                        ? 'bg-amber-500 border-amber-500 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.2)]' 
                        : 'bg-transparent border-white/10 text-stone-500 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {cat} <span className={`ml-2 ${activeCategory === cat ? 'opacity-50' : 'text-stone-700'}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Journal Table / Grid Hybrid */}
        <div className="relative">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px flex-1 bg-white/5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-stone-700">Entries for {activeCategory}</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {filteredPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.08, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
              className="group h-full"
            >
              <button
                onClick={() => setActivePost(post)}
                className="w-full h-full text-left rounded-[2.5rem] border border-white/5 bg-stone-900/20 hover:bg-stone-900/30 transition-colors overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[16/11] overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-[2200ms] group-hover:scale-110 grayscale-[0.35] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent" />

                  {/* Top right mini action */}
                  <div className="absolute top-5 right-5 flex items-center gap-2">
                    <span className="w-10 h-10 rounded-full border border-white/10 bg-stone-950/50 backdrop-blur-md flex items-center justify-center text-stone-300 group-hover:text-amber-500 transition-colors">
                      <ArrowUpRight size={16} />
                    </span>
                  </div>

                  {/* Bottom meta over image */}
                  <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                    <MetaChip>
                      <Hash size={12} className="text-amber-500" />
                      {post.category}
                    </MetaChip>
                    <MetaChip>
                      <Clock size={12} className="text-amber-500" />
                      {post.readTime}
                    </MetaChip>
                    <MetaChip>{post.date}</MetaChip>
                  </div>
                </div>

                {/* Body */}
                <div className="p-8 md:p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight tracking-tight group-hover:text-amber-500 transition-colors">
                    {post.title}
                  </h3>

                  <p className="mt-4 text-stone-400 leading-relaxed text-sm md:text-[15px] font-light line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Footer row */}
                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-stone-600">
                      <span className="inline-flex items-center gap-2">
                        <Eye size={14} className="text-amber-500/70" />
                        <span>Read</span>
                      </span>
                      <span className="text-stone-800">•</span>
                      <span className="inline-flex items-center gap-2">
                        <Zap size={14} className="text-amber-500/70" />
                        <span>Journal</span>
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500">
                      Open
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </button>
            </motion.article>
          ))}
          </div>
        </div>
      </div>

      {/* Reading Overlay */}
      {activePost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[100] bg-stone-950/85 backdrop-blur-2xl p-4 md:p-6"
          onClick={() => setActivePost(null)}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 220, mass: 0.9 }}
            className="mx-auto w-full max-w-5xl h-[92vh] bg-stone-900 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-20 bg-stone-900/70 backdrop-blur-xl border-b border-white/5">
              <div className="flex items-center justify-between px-6 md:px-10 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-950 border border-white/10 flex items-center justify-center text-amber-500">
                    <Sparkles size={16} />
                  </div>
                  <div className="leading-tight">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                      {activePost.category}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-stone-500">
                      {activePost.date} • {activePost.readTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <CopyLinkButton postId={activePost.id} />
                  <button
                    onClick={() => setActivePost(null)}
                    className="w-11 h-11 rounded-full bg-stone-950 border border-white/10 flex items-center justify-center text-stone-400 hover:text-white hover:border-amber-500/50 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-full overflow-y-auto custom-scrollbar">
              {/* Hero image */}
              <div className="relative aspect-[21/9] w-full">
                <ImageWithFallback
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-full object-cover grayscale-[0.45]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
              </div>

              {/* Article */}
              <div className="px-6 md:px-12 lg:px-20 py-10 md:py-16">
                <div className="flex flex-col xl:flex-row gap-20 items-start">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight tracking-tight">
                      {activePost.title}
                    </h2>

                    {/* author row */}
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <MetaChip>
                        <Heart size={12} className="text-amber-500" />
                        {`WRITTEN BY ${
                          activePost.author?.toLowerCase().trim() === 'maliha' ? 'SYEDA MALIHA MARIUM' : 
                          activePost.author?.toLowerCase().trim() === 'hishma' ? 'HISHMA' : 
                          activePost.author?.toLowerCase().trim() === 'zaheer' ? 'ZAHEER ANWAR' : 
                          'M. FAOUZIA'
                        }`}
                      </MetaChip>
                      <MetaChip>
                        <Globe size={12} className="text-amber-500" />
                        {
                          activePost.author?.toLowerCase().trim() === 'maliha' || activePost.author?.toLowerCase().trim() === 'zaheer' ? 'TIANJIN UNIVERSITY' : 
                          activePost.author?.toLowerCase().trim() === 'hishma' ? 'HAIKOU' :
                          'TIANJIN'
                        }
                      </MetaChip>
                      <MetaChip>
                        <Monitor size={12} className="text-amber-500" />
                        {
                          activePost.author?.toLowerCase().trim() === 'maliha' ? 'JOURNALIST & RESEARCHER' : 
                          activePost.author?.toLowerCase().trim() === 'hishma' ? 'MEDICAL SCHOLAR' : 
                          activePost.author?.toLowerCase().trim() === 'zaheer' ? 'HCI RESEARCHER' : 
                          'DIGITAL ARTISAN'
                        }
                      </MetaChip>
                    </div>

                    {/* body */}
                    <div className="mt-12 max-w-3xl">
                      <div className="custom-post-body">{renderContent(activePost.content || '')}</div>

                      <AuthorCard name={activePost.author} />

                      {/* Related Articles Section */}
                      {relatedPosts.length > 0 && (
                        <div className="mt-20 pt-16 border-t border-white/5">
                          <div className="flex items-center justify-between mb-10">
                            <div>
                              <span className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.4em] mb-3 block">Related Content</span>
                              <h3 className="text-3xl font-serif text-white">Continue the <span className="italic text-stone-500 font-light">Odyssey</span></h3>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {relatedPosts.map((related) => (
                              <button
                                key={related.id}
                                onClick={() => setActivePost(related)}
                                className="text-left group bg-stone-950/50 border border-white/5 rounded-[2.5rem] p-8 hover:bg-stone-900/50 transition-all duration-500"
                              >
                                <div className="flex items-center gap-4 mb-6">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500/60">{related.category}</span>
                                  <div className="h-px flex-1 bg-white/5" />
                                </div>
                                <h4 className="text-xl font-serif text-white mb-4 group-hover:text-amber-500 transition-colors">{related.title}</h4>
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-600">{related.date}</span>
                                  <ArrowRight size={14} className="text-stone-700 group-hover:text-amber-500 transition-all group-hover:translate-x-1" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-16 pt-10 border-t border-white/5 flex items-center justify-between">
                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-600">
                          End of Journal Entry
                        </div>
                        <button
                          onClick={() => setActivePost(null)}
                          className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-500 group"
                        >
                          Close Journal
                          <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <TableOfContents content={activePost.content || ''} />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

const ExperienceSection = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const manifestos = {
    stealth: {
      title: "Architectural Stealth",
      subtitle: "AI · Knowledge Graphs",
      icon: <Monitor size={22} />,
      image: "https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c",
      content: (
        <div className="space-y-12">
          <p className="text-2xl font-serif text-white leading-relaxed">I don’t build systems. I build understanding, quietly, precisely, and with the kind of discipline that only shows itself when things refuse to break.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-400 font-light leading-relaxed">
            <div className="space-y-6">
              <p>My work lives in the invisible layer of intelligence: knowledge graphs, ontologies, entity relationships, and the logic that lets information behave like it has a spine. I like problems that look simple to the user and terrifyingly complex behind the curtain, questions with ambiguous language, messy data, conflicting truths, and edge cases that don’t announce themselves until production is on fire.</p>
              <p>So I design for calm. I map meaning into structure. I turn scattered facts into navigable worlds where every connection has a reason to exist, and every query has to earn its answer.</p>
            </div>
            <div className="space-y-6 border-l border-white/5 pl-12">
              <p>I build logical paths that don’t depend on luck, constraints that hold, inference that stays honest, and query patterns that stay fast even when the world gets big. Most of it is invisible. That’s the point. Because in real AI work, excellence isn’t a headline. It’s a guarantee.</p>
              <p>The stealth is intentional: not secrecy, but restraint. I don’t want intelligence that performs. I want intelligence that serves, that makes the experience feel effortless without ever exposing the complexity that made it so. The finest engineering doesn’t scream to be noticed. It simply keeps its promises.</p>
            </div>
          </div>
          <p className="text-amber-500 font-serif italic text-xl">If it feels inevitable, it’s because the hard work stayed unseen.</p>
        </div>
      )
    },
    odyssey: {
      title: "The China Odyssey",
      subtitle: "Travel & Culture",
      icon: <Globe size={22} />,
      image: "https://images.unsplash.com/photo-1677071816328-edc04e7e059a",
      content: (
        <div className="space-y-12">
          <p className="text-2xl font-serif text-white leading-relaxed">China wasn’t a trip. It was a narrative I walked through, twenty cities, each one a different chapter, each one leaving a line inside me I still reread.</p>
          <div className="columns-1 md:columns-2 gap-12 space-y-8 text-stone-400 font-light leading-relaxed">
            <p>It began in Beijing, where history doesn’t sit behind glass. It stands in the air. The city feels like memory with modern muscle: ancient weight, present speed, and a quiet reminder that time can be both patient and strategic. From there the story kept unfolding, not as a straight line, but as a constellation.</p>
            <p>Guangzhou carried warmth and momentum, human energy moving fast, markets alive with purpose. Nantong felt like breath between scenes, a place where life doesn’t try to impress you, it simply continues. Dalian gave me the sea, an edge to the country where the horizon softens everything, even ambition.</p>
            <p>Jinan and Jining had their own texture, less spectacle, more reality. Xuzhou was grounded, sturdy, the kind of place that teaches you how endurance looks when it’s not romanticized. Tianjin felt like a conversation between eras, old corners whispering beside clean new geometry.</p>
            <p>Xi’an didn’t feel ancient in a museum way. It felt ancient in a confident way, like it knows who it is and doesn’t need to rush. Ya’an felt like nature speaking in lowercase, green, damp, quiet, a city that lowers your voice without asking. Anyang and Huaxian held a different kind of truth: daily life, raw culture, history without a spotlight.</p>
            <p>Lingzhou and Shijiazhuang gave me something more valuable than novelty: perspective. The kind that humbles you. The kind that reminds you that scale isn’t only skyscrapers. Sometimes it’s how many lives can fit into an ordinary morning.</p>
            <p>Then the cities that felt like forces of nature: Chongqing, vertical and endless, like the earth decided to build upward. Chengdu, balanced and fluent, spice and softness, speed and stillness, a place that teaches you the art of not rushing what deserves time. Yiwu was commerce as choreography, movement, exchange, supply and demand like a living machine. Shanghai felt like a future with perfect posture, sharp, ambitious, and almost too polished to be accidental. And Kunming felt like an exhale at the end of a long sentence, lighter air, softer edges, a closing chapter written in green.</p>
            <p>Across all of it, the contrast never stopped moving: ancient tradition living beside digital futures. In megacities, I watched friction disappear, routines flowing as if the city itself was an interface. In quieter places, I watched tradition function as infrastructure, rituals that still organize life, values that still shape behavior, a continuity technology can’t replace.</p>
            <p>That duality changed how I think about digital craftsmanship. It taught me that technology isn’t just innovation. It’s culture made interactive. And culture, if you listen closely, teaches something engineers often forget: Not everything should be optimized. Some things should be preserved.</p>
          </div>
          <p className="text-amber-500 font-serif italic text-xl">The most advanced future is the one that remembers what to keep.</p>
        </div>
      )
    },
    motion: {
      title: "Deliberate Motion",
      subtitle: "Philosophy",
      icon: <Zap size={22} />,
      image: "https://images.unsplash.com/photo-1595413717318-d7397fbdb69c",
      content: (
        <div className="space-y-12">
          <p className="text-2xl font-serif text-white leading-relaxed">I’m not hard to find. I’m friendly. I’m social. I laugh easily, and I can be very open. But I’m also private, with intention.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-400 font-light leading-relaxed">
            <div className="space-y-6">
              <p>There’s a difference between private and secret. A secret is hidden because it’s dangerous to be known. Privacy is protected because it’s valuable enough to remain untouched. I don’t live behind locked doors. I just curate the rooms people get to enter. And I learned that early, watching what envy can do inside a home.</p>
              <p>I grew up in an environment where siblings could destroy each other without ever raising their voices. Not because they were evil, because envy is quiet like that. It makes love feel like competition. It makes closeness feel like a scoreboard. It turns small comparisons into lifelong fractures.</p>
            </div>
            <div className="space-y-6 border-l border-white/5 pl-12">
              <p>That experience left me with a simple truth: people can’t destroy what they don’t know. And not everyone deserves full access to you. So I move differently. The Silent Move isn’t disappearance. It’s discipline. It’s deep work over loud announcements. It’s choosing progress that is real, even if it’s unseen. It’s building a life where attention is not the currency, and validation is not the fuel.</p>
              <p>I don’t perform growth. I practice it. I refine in private, then release when it’s ready, when it’s honest, when it’s strong. Projects and results speak for me because they are the only kind of noise I respect. This is deliberate motion: calm, focused, intentional living.</p>
            </div>
          </div>
          <p className="text-amber-500 font-serif italic text-xl">Privacy isn’t distance. It’s the space where mastery survives.</p>
        </div>
      )
    },
    alchemy: {
      title: "Inner Alchemy",
      subtitle: "Personal Development",
      icon: <Sparkles size={22} />,
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
      content: (
        <div className="space-y-12">
          <p className="text-2xl font-serif text-white leading-relaxed">I believe the most important piece of software we ever develop is ourselves. It’s the only code we never stop writing.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-400 font-light leading-relaxed">
            <div className="space-y-6">
              <p>My development is not one dimension. It’s emotional, spiritual, disciplined, and tied to identity, all at once. Not because I want to “cover everything,” but because I’ve learned that a human being can’t be edited into one category. Some people look peaceful while their inner world is a storm. Some carry calm inside and wear chaos on the outside. Balance is not a personality trait, it’s a practice. And I’m still practicing.</p>
              <p>Personal development, to me, isn’t a checklist or a set of productivity tricks. It’s alchemy: the slow, deliberate process of turning raw experiences into something valuable. I see curiosity as the base metal, plentiful but unrefined. Wisdom is the gold. And the heat that transforms one into the other is discipline.</p>
              <p>In my view, we are architectural projects. We need strong foundations, principles that don’t collapse under pressure. We need clear structures, routines that stabilize us without turning life into a prison. And we need beautiful interfaces, the way we treat others, the way we speak, the way we hold space without losing ourselves.</p>
            </div>
            <div className="space-y-6 border-l border-white/5 pl-12">
              <p className="text-amber-500/80 italic font-serif text-lg mb-8">“That’s why I spend as much time debugging my own reactions as I do debugging code.”</p>
              <p>For a long time, the hardest part wasn’t feeling things. It was naming them. Finding the right word, then deciding what to do after the word exists. Because once you name an emotion, it stops being fog. It becomes a shape. And a shape can be handled, held, redirected, sometimes even softened. I’m not an expert. I’m a student of my own inner weather, learning how to stay honest without being ruled by whatever passes through me.</p>
              <p>The spiritual layer is what keeps me steady when the emotional layer gets loud. There’s a sentence I carry like a compass, from Imam Shafi’i:</p>
              <blockquote className="pl-6 border-l-2 border-amber-500/30 py-2 my-6">
                <p className="text-white font-serif italic text-xl leading-relaxed">"My heart is at ease knowing that what was meant for me will never miss me, and that what misses me was never meant for me."</p>
              </blockquote>
              <p>That line teaches me a quiet kind of strength. I do my part, fully, then I let God, or the universe, decide what lands. If something doesn’t find me, I don’t call it a failure. I call it a lesson, a redirection, a message I wasn’t ready to understand before.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-400 font-light leading-relaxed pt-12 border-t border-white/5">
            <div className="space-y-6">
              <p>Discipline, for me, is also personal. It’s not always loud, and it’s not always labeled. Some people are disciplined without strict schedules, and that’s valid. For me, structure feels like safety. I like to plan. I like to program my days. Surprise can overwhelm me, especially when it’s urgent. So I build routines not as control, but as a stabilizer, a way to keep my mind clear enough to respond rather than spiral.</p>
              <p>My rituals are simple, and they repeat: journaling, prayer, reading, training, solitude, long walks, study. Not all at once, not perfectly, not as a performance. Just consistently enough to keep me aligned with myself.</p>
            </div>
            <div className="space-y-6 pl-0 md:pl-12">
              <p>The personal view of growth means accepting that mastery is a moving target. I don’t aim for perfection, I aim for honesty. Am I better than I was yesterday? Am I more patient? Have I learned to see a different angle on a hard truth? These are the real metrics of success that don’t show up on a resume.</p>
              <p>This is the inner layer of the Silent Move. While the world sees results, I focus on the internal shifts that made those results possible. Growth happens in the quiet moments between the big events, in the decisions we make when no one is watching.</p>
            </div>
          </div>

          <div className="relative p-12 bg-stone-950/40 rounded-[3rem] border border-white/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full" />
            <div className="relative z-10 space-y-8">
              <p className="text-xl font-serif text-white/90 leading-relaxed max-w-2xl">
                And if I had to choose one image for this pillar, it would be the night sky. Because it never explains itself. Some nights are clear, some are heavy with cloud, but the sky remains what it is. It teaches perspective, patience, and depth. It reminds me that not everything needs to be seen to be real, and not every process needs an audience to be true.
              </p>
              <div className="space-y-2">
                <p className="text-amber-500 font-serif italic text-2xl">Build the person, and the work will build itself.</p>
                <p className="text-stone-500 text-sm italic mt-4">Some transformations don’t announce themselves. They show up later, like constellations, when you finally learn how to look.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <section id="experience" className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto bg-stone-900/40 border border-white/5 rounded-[4rem] p-12 md:p-24 backdrop-blur-xl relative overflow-hidden min-h-[600px] transition-all duration-700">
        {/* Subtle decorative ring */}
        <div className="absolute -top-40 -right-40 w-80 h-80 border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 border border-white/5 rounded-full pointer-events-none" />
        
        {selectedTopic ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10"
          >
            <button 
              onClick={() => setSelectedTopic(null)}
              className="flex items-center gap-4 text-stone-500 hover:text-white transition-colors mb-16 group"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-all">
                <ArrowRight className="rotate-180" size={18} />
              </div>
              <span className="uppercase tracking-[0.2em] text-[10px] font-bold">Return to Manifesto</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24 items-center">
              <div>
                <span className="text-amber-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-4 block">{manifestos[selectedTopic].subtitle}</span>
                <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-tight">
                  {manifestos[selectedTopic].title.split(' ')[0]} <br />
                  <span className="italic text-stone-600 font-light">{manifestos[selectedTopic].title.split(' ').slice(1).join(' ')}</span>
                </h2>
              </div>
              <div className="aspect-[16/9] lg:aspect-square rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl relative">
                <ImageWithFallback 
                  src={manifestos[selectedTopic].image} 
                  alt={manifestos[selectedTopic].title}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 to-transparent" />
              </div>
            </div>

            <div className="max-w-5xl">
              {manifestos[selectedTopic].content}
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-16 leading-tight">
                The Silent <br />
                <span className="italic text-stone-600 font-light">Manifesto.</span>
              </h2>
              <div className="space-y-16">
                {[
                  { 
                    id: 'stealth',
                    icon: <Monitor size={22} />, 
                    title: "Architectural Stealth", 
                    text: "Developing high-integrity systems where complexity is hidden beneath a veneer of absolute simplicity." 
                  },
                  { 
                    id: 'odyssey',
                    icon: <Globe size={22} />, 
                    title: "The China Odyssey", 
                    text: "A silent traversal across 20 cities, capturing the spirit of a nation where history meets the digital future." 
                  },
                  { 
                    id: 'motion',
                    icon: <Zap size={22} />, 
                    title: "Deliberate Motion", 
                    text: "A commitment to the 'Silent Move'prioritizing deep work and meaningful progress over public noise." 
                  },
                  { 
                    id: 'alchemy',
                    icon: <Sparkles size={22} />, 
                    title: "Inner Alchemy", 
                    text: "Crafting the self through constant refinement, turning curiosity into character and knowledge into lived wisdom." 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    onClick={() => setSelectedTopic(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex gap-8 group cursor-pointer"
                  >
                    <div className="w-16 h-16 shrink-0 rounded-[2rem] bg-stone-950 border border-white/10 flex items-center justify-center text-stone-500 group-hover:text-amber-500 group-hover:border-amber-500/30 transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-serif text-white mb-3 tracking-wide flex items-center gap-3">
                        {item.title}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-amber-500 -translate-y-1" />
                      </h4>
                      <p className="text-stone-500 leading-relaxed text-sm max-w-sm font-light">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-white/5 relative z-10 shadow-2xl bg-stone-950 ring-1 ring-white/10 group-hover:ring-amber-500/30 transition-all duration-1000">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1710405152558-f13f4cecbf20" 
                  alt="Digital Artisan Workspace"
                  className="w-full h-full object-cover grayscale transition-all duration-[3000ms] group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-amber-500 text-stone-950 px-12 py-10 rounded-[3rem] z-20 shadow-[0_20px_50px_rgba(245,158,11,0.3)] transition-transform duration-700 group-hover:-translate-y-4 group-hover:-translate-x-4">
                <span className="text-6xl font-serif font-light block leading-none mb-4 tracking-tighter">01.</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] block italic">Deliberate <br />Execution</span>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const ContactCTA = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="connect" className="py-40 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <span className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-12 block">Stay Connected</span>
        <h2 className="text-6xl md:text-[10rem] font-serif text-white mb-16 leading-[0.8] tracking-tighter">
          Join the <br />
          <span className="italic text-stone-700 font-light">convo.</span>
        </h2>
        <p className="text-xl text-stone-500 mb-20 max-w-2xl mx-auto font-light leading-relaxed">
          Grab a virtual coffee and join the discussion on tech, life, and the journey of learning.
        </p>
        
        <div className="flex flex-col items-center gap-16">
          {!isFormOpen ? (
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <button 
                onClick={() => setIsFormOpen(true)}
                className="px-10 py-5 bg-amber-500 text-stone-950 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:scale-105 transition-transform shadow-[0_0_30px_rgba(245,158,11,0.3)]"
              >
                Message Me
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-xl mx-auto bg-stone-900/40 p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl mb-12"
            >
              <form
                action="https://formspree.io/f/mleykgke"
                method="POST"
                className="flex flex-col gap-8 text-left"
              >
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-4">Your Identity</label>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="email@example.com"
                    required
                    className="bg-stone-950/50 border border-white/10 rounded-full px-8 py-5 text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-stone-800"
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-500 ml-4">The Conversation</label>
                  <textarea 
                    name="message" 
                    placeholder="What's on your mind?"
                    required
                    rows={4}
                    className="bg-stone-950/50 border border-white/10 rounded-[2rem] px-8 py-6 text-white focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-stone-800 resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-4">
                  <button 
                    type="submit"
                    className="flex-1 px-10 py-5 bg-amber-500 text-stone-950 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-amber-400 transition-colors"
                  >
                    Send Message
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-10 py-5 border border-white/10 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all text-stone-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="flex gap-12">
            {[
              { icon: <Facebook size={20} />, label: "Facebook", href: "https://www.facebook.com/mroivili.faouzia.2" },
              { icon: <Github size={20} />, label: "Github", href: "https://github.com/Mfaouzia" },
              { icon: <Instagram size={20} />, label: "Instagram", href: "https://www.instagram.com/tech_and_wisdom" },
              { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/mroivili-faouzia-43ab56164" }
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-4 group">
                <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center text-stone-600 group-hover:bg-white group-hover:text-stone-950 group-hover:border-white transition-all duration-500">
                  {social.icon}
                </div>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-600 group-hover:text-stone-400 transition-colors">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-transparent">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-amber-500 overflow-hidden">
              <ImageWithFallback src={images.logo} alt="Logo" className="w-5 h-5 object-contain brightness-110" />
            </div>
            <span className="text-lg font-serif tracking-tight text-white font-bold">M. Faouzia</span>
          </div>
          <p className="text-[9px] text-stone-600 font-bold uppercase tracking-widest">A space for digital artisans & thoughtful explorers.</p>
        </div>
        
        <div className="flex flex-col items-center md:items-start gap-12">
          {/* Navigation Links */}
          <div className="flex gap-12">
            {['Vision', 'Archives', 'Essence', 'Connect'].map((link) => (
              <a 
                key={link} 
                href={link === 'Essence' ? '#experience' : `#${link.toLowerCase()}`} 
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social Media Links (From Image) */}
          <div className="flex gap-10 md:gap-14">
            {[
              { icon: <Facebook size={18} />, label: "Facebook", href: "#" },
              { icon: <Github size={18} />, label: "Github", href: "https://github.com/Mfaouzia" },
              { icon: <Instagram size={18} />, label: "Instagram", href: "https://instagram.com/tech_and_wisdom" },
              { icon: <Linkedin size={18} />, label: "Linkedin", href: "#" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex flex-col items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-full border border-white/5 flex items-center justify-center text-stone-700 group-hover:border-amber-500/30 group-hover:text-amber-500 transition-all duration-500">
                  {social.icon}
                </div>
                <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-stone-800 group-hover:text-stone-500 transition-colors">
                  {social.label}
                </span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-600 text-center md:text-right">
          © {new Date().getFullYear()} M. Faouzia. <br /> Crafted in Tianjin.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useEffect(() => {
    document.title = "Digital Artisan | M. Faouzia | Tech & Wisdom Chronicles";
    
    // Add meta description dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'A cinematic exploration of technology and philosophy by M. Faouzia. Chronicles of a digital artisan bridging the gap between systems engineering and silent move philosophy.');
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-amber-500 selection:text-stone-950">
      <NoiseOverlay />
      <BackgroundDecoration />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <TechStackMarquee />
        <NarrativeTimeline />
        <BlogSection />
        <ExperienceSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
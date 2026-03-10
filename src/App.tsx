import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Mail, ArrowUpRight, X, Linkedin, Twitter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

const generatedImagesCache: Record<string, string> = {};
let isGenerating = false;

const ProjectImage = ({ project, className }: { project: any, className?: string }) => {
  const [imgSrc, setImgSrc] = useState<string | null>(generatedImagesCache[project.id] || null);

  useEffect(() => {
    if (imgSrc) return;
    
    const interval = setInterval(() => {
      if (generatedImagesCache[project.id]) {
        setImgSrc(generatedImagesCache[project.id]);
        clearInterval(interval);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [project.id, imgSrc]);

  if (!imgSrc) {
    return (
      <div className={`flex flex-col items-center justify-center bg-surface/50 animate-pulse ${className}`}>
        <div className="w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin mb-4"></div>
        <span className="text-xs font-mono text-muted uppercase tracking-widest">Generating AI Illustration...</span>
      </div>
    );
  }

  return <img src={imgSrc} alt={project.title} className={className} />;
};

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animationFrameId: number;
    let time = 0;
    let isAssembled = false;

    setTimeout(() => {
      isAssembled = true;
    }, 2000);

    const mouse = { x: -1000, y: -1000, radius: 200 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      t: number; 
      offset: number; 
      vx: number;
      vy: number;
      size: number;
      color: string;
      friction: number;
      springFactor: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.t = Math.random() * Math.PI * 2;
        this.offset = (Math.random() - 0.5) * 50;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 1.5 + 0.5;
        const colors = ['#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.friction = Math.random() * 0.04 + 0.88;
        this.springFactor = Math.random() * 0.02 + 0.02;
      }

      update(centerX: number, centerY: number) {
        if (isAssembled) {
          const a = Math.min(width, height) * 0.35;
          this.t += 0.002;
          
          const sinT = Math.sin(this.t);
          const cosT = Math.cos(this.t);
          const denominator = sinT * sinT + 1;
          
          const shapeX = (a * Math.sqrt(2) * cosT) / denominator;
          const shapeY = (a * Math.sqrt(2) * cosT * sinT) / denominator;
          
          const angle = time * 0.001;
          const rotX = shapeX * Math.cos(angle) - shapeY * Math.sin(angle);
          const rotY = shapeX * Math.sin(angle) + shapeY * Math.cos(angle);

          const targetX = centerX + rotX + Math.cos(this.t * 5) * this.offset;
          const targetY = centerY + rotY + Math.sin(this.t * 5) * this.offset;

          const dx = targetX - this.x;
          const dy = targetY - this.y;
          this.vx += dx * this.springFactor;
          this.vy += dy * this.springFactor;
        } else {
          this.vx += (Math.random() - 0.5) * 0.1;
          this.vy += (Math.random() - 0.5) * 0.1;
        }

        const dxMouse = mouse.x - this.x;
        const dyMouse = mouse.y - this.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < mouse.radius) {
          const forceDirectionX = dxMouse / distMouse;
          const forceDirectionY = dyMouse / distMouse;
          const force = (mouse.radius - distMouse) / mouse.radius;
          const directionX = forceDirectionX * force * -2;
          const directionY = forceDirectionY * force * -2;
          this.vx += directionX;
          this.vy += directionY;
        }

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; 
      }
    }

    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      const numParticles = window.innerWidth < 768 ? 80 : 150;
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    initParticles();

    const animate = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(5, 5, 8, 0.3)';
      ctx.fillRect(0, 0, width, height);

      const centerX = width > 768 ? width * 0.75 : width / 2;
      const centerY = height / 2;

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(centerX, centerY);
        particles[i].draw();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 120;
          if (dist < maxDist) {
            ctx.beginPath();
            const pulse = (Math.sin(time * 0.05 + i) + 1) * 0.5 * 0.5 + 0.5;
            const opacity = (1 - dist / maxDist) * 0.3 * pulse;
            ctx.strokeStyle = `rgba(125, 211, 252, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 md:left-[75%] -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm bg-white/5">
          <span className="text-white/50 font-mono text-xs tracking-[0.3em] uppercase">System</span>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/60 to-bg"></div>
    </div>
  );
};

const Nav = () => (
  <motion.nav 
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 bg-bg/80 backdrop-blur-md border-b border-line"
  >
    <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
      <div className="text-sm font-medium tracking-tight flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        <span>SR Design</span>
      </div>
      <div className="flex gap-6 text-sm font-medium text-muted">
        <a href="#philosophy" className="hover:text-ink transition-colors">Philosophy</a>
        <a href="#work" className="hover:text-ink transition-colors">Work</a>
        <a href="#contact" className="hover:text-ink transition-colors">Contact</a>
      </div>
    </div>
  </motion.nav>
);

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 pb-12 relative overflow-hidden">
      <ParticleBackground />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05]"
          >
            Absorb complexity.<br />
            <span className="text-muted">Deliver clarity.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 text-lg md:text-xl text-muted max-w-2xl leading-relaxed font-light"
          >
            I am Surong Ruan, an Interaction & Service Designer orchestrating systems. 
            I design experience layers that unify fragmented services and scattered knowledge 
            into single, intent-driven journeys.
          </motion.p>
  
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-24"
          >
            <a href="#work" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted hover:text-accent transition-colors">
              <ArrowDown className="w-4 h-4" />
              Selected Works
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Abstract background element inspired by Blue Distortion */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 0.15, scale: 1, rotate: 0 }}
        transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
        className="absolute right-[-10%] top-[10%] w-[800px] h-[800px] rounded-full blur-[120px] bg-accent/20 pointer-events-none"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 1.2, rotate: 10 }}
        animate={{ opacity: 0.1, scale: 1, rotate: 0 }}
        transition={{ duration: 2.5, delay: 0.8, ease: "easeOut" }}
        className="absolute left-[-5%] bottom-[5%] w-[600px] h-[600px] rounded-full blur-[100px] bg-purple-500/10 pointer-events-none"
      />
    </section>
  );
};

const Philosophy = () => {
  return (
    <section id="philosophy" className="py-40 px-6 md:px-12 bg-surface">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted mb-6">01 / Philosophy</h2>
          <h3 className="text-2xl md:text-3xl font-medium tracking-tight">Fragmentation is friction.</h3>
        </div>
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <p className="text-base md:text-lg text-muted leading-relaxed font-light">
            Organizational boundaries may be necessary internally, but they should be irrelevant to the user. My work focuses on designing an experience layer that absorbs complexity: <span className="font-semibold text-ink">unifying cross-org services into a single journey</span>.
          </p>
          <p className="text-base md:text-lg text-muted leading-relaxed font-light">
            As AI raises expectations for coherence, design’s role shifts from crafting screens to <span className="font-semibold text-ink">orchestrating systems</span>. It is about aligning teams, defining trust, and delivering clarity at scale—ensuring that users never feel the seams of the organization.
          </p>
        </div>
      </div>
    </section>
  );
};

const projects = [
  {
    id: "01",
    badge: "01 - ULE",
    title: "Unified learning ecosystem",
    category: "Service Design & System Orchestration",
    description: "Unifying fragmented learning offerings into a cohesive, system-wide experience that eliminates friction and dissolves organizational boundaries.",
    tagline: "Unify learning offerings into cohesive experience and remove frictions.",
    challenge: "Fragmented learning technologies across departments created significant friction, forcing care team to navigate complex internal organizational silos.",
    impact: "Designed the north star experience layer that absorbed stakeholder complexity, orchestrating a single coherent ecosystem for all learner touch-points.",
    outcome: "Eliminated service fragmentation, resulting in support tickets reduction by 40% and long term product roadmap to enable learning ecosystem.",
    image: "https://picsum.photos/seed/learning-network/800/600",
    aspect: "aspect-[4/3]",
    colSpan: "md:col-span-4"
  },
  {
    id: "02",
    badge: "02 - OCO",
    title: "Orchestrated content offerings",
    category: "Information Architecture & AI Strategy",
    description: "Architecting high-trust systems that streamline knowledge access, ensuring authoritative information is discoverable and reliable at scale.",
    tagline: "Architect to design the trustworthy system to enable knowledge access.",
    challenge: "Knowledge was scattered across disparate learning programs and content offerings, making it laborious for users to find accurate answers and with limited tunnel vision.",
    impact: "Designed the UX architecture to streamline content organization, unify data schema and build the interaction layer to make AI generated syntheses explainable and UX benchmarked.",
    outcome: "Transformed information access and scattered content into personalized learning experience to meet where users is at.",
    image: "https://picsum.photos/seed/educational-tools/800/600",
    aspect: "aspect-[4/3]",
    colSpan: "md:col-span-4"
  },
  {
    id: "03",
    badge: "03 - IDL",
    title: "Insight driven learning",
    category: "Interaction Design & Recommendation",
    description: "Transforming raw data into actionable insights that serve as meaningful learning outcomes, motivating users toward continuous growth and improvement.",
    tagline: "Deliver insights as learning outcome to motivate users to continue improving.",
    challenge: "Users were overwhelmed by data metrics while having no performance feedback in the initial learning stage.",
    impact: "Define the learning loop to connect performance insights to user motivations that drive continuous learning across beginning and advanced stages.",
    outcome: "Delivered the learning outcome concept in a journey container where insights lead to clear recommendations to keep improving.",
    image: "https://picsum.photos/seed/student-reflection/800/600",
    aspect: "aspect-[4/3]",
    colSpan: "md:col-span-4"
  }
];

const Modal = ({ project, onClose }: { project: typeof projects[0] | null, onClose: () => void }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-bg/90 backdrop-blur-xl flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface border border-line w-full max-w-6xl rounded-[4px] overflow-hidden relative shadow-2xl flex flex-col max-h-[90vh] md:h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-[4px] bg-accent/10 hover:bg-accent/20 text-accent transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 md:p-12 flex flex-col h-full overflow-y-auto md:overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-8 flex-shrink-0">
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono text-accent">{project.id}</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted">{project.category}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 leading-[1.1]">{project.title}</h2>
                <p className="text-base md:text-lg text-muted leading-relaxed font-light max-w-2xl">
                  {project.description}
                </p>
              </div>

              {/* Right Column: Details List */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-ink mb-1">The Challenge</h3>
                    <p className="text-sm text-muted leading-relaxed">{project.challenge}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-ink mb-1">My Impact</h3>
                    <p className="text-sm text-muted leading-relaxed">{project.impact}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-ink mb-1">The Outcome</h3>
                    <p className="text-sm text-muted leading-relaxed">{project.outcome}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Section: Image */}
            <div className="rounded-[4px] overflow-hidden bg-line relative flex-1 min-h-[200px] md:min-h-0 mt-4">
               <ProjectImage project={project} className="absolute inset-0 w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const GlowingStar = ({ variant }: { variant: string }) => {
  return (
    <div className="relative flex items-center justify-center w-32 h-32 my-12 group-hover:scale-110 transition-transform duration-700 ease-out">
      <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full group-hover:bg-white/10 transition-colors duration-700"></div>
      <svg viewBox="0 0 100 100" className="w-full h-full text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        
        {/* Main 3 branches */}
        <path d="M50 50 L50 25 M50 50 L28 63 M50 50 L72 63" />
        
        {/* End nodes */}
        <circle cx="50" cy="25" r="2" fill="currentColor" />
        <circle cx="28" cy="63" r="2" fill="currentColor" />
        <circle cx="72" cy="63" r="2" fill="currentColor" />

        {/* Faint background branches */}
        <path d="M50 50 L50 75 M50 50 L28 37 M50 50 L72 37" strokeWidth="1" opacity="0.3" />
        <circle cx="50" cy="75" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="28" cy="37" r="1.5" fill="currentColor" opacity="0.3" />
        <circle cx="72" cy="37" r="1.5" fill="currentColor" opacity="0.3" />

        {variant === '02' && (
          <path d="M50 25 L72 37 L72 63 L50 75 L28 63 L28 37 Z" strokeWidth="1" opacity="0.4" />
        )}
        
        {variant === '03' && (
          <circle cx="50" cy="50" r="18" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
        )}
      </svg>
    </div>
  );
};

const Work = ({ onSelectProject }: { onSelectProject: (p: typeof projects[0]) => void }) => {
  useEffect(() => {
    const generateAll = async () => {
      if (isGenerating) return;
      isGenerating = true;
      
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        
        for (const project of projects) {
          if (generatedImagesCache[project.id]) continue;
          try {
            const prompt = `A futuristic, simple, systematic illustration of ${project.title}. ${project.tagline}. Deep navy background, glowing ice blue and cyan lines. Minimalist, clean, data visualization style.`;
            const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: prompt,
              config: {
                imageConfig: {
                  aspectRatio: "16:9",
                }
              }
            });
            
            for (const part of response.candidates?.[0]?.content?.parts || []) {
              if (part.inlineData) {
                generatedImagesCache[project.id] = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                break;
              }
            }
          } catch (e) {
            console.error("Failed to generate image for", project.id, e);
          }
        }
      } catch (e) {
        console.error("Failed to initialize Gemini API", e);
      }
    };
    
    generateAll();
  }, []);

  return (
    <section id="work" className="py-40 px-6 md:px-12 relative overflow-hidden">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=3500&auto=format&fit=crop" 
          alt="Starry Night Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/40 to-bg"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted mb-24 text-center md:text-left">02 / Selected Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer relative"
              onClick={() => onSelectProject(project)}
            >
              <div className="h-full bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col items-center justify-between text-center min-h-[480px] transition-colors duration-500 overflow-hidden relative">
                
                {/* Top Badge */}
                <div className="border border-white/20 rounded-full px-4 py-1.5 text-[10px] font-mono tracking-widest text-muted mb-8 group-hover:border-white/40 group-hover:text-ink transition-colors duration-500">
                  {project.badge}
                </div>
                
                {/* Title */}
                <h3 className="text-sm font-medium tracking-widest uppercase text-ink/90 group-hover:text-ink transition-colors duration-500 mb-auto">
                  {project.title}
                </h3>
                
                {/* Glowing Icon */}
                <GlowingStar variant={project.id} />
                
                {/* Tagline */}
                <p className="text-xs text-muted leading-relaxed max-w-[260px] mt-auto group-hover:text-muted/80 transition-colors duration-500">
                  {project.tagline}
                </p>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-40 px-6 md:px-12 bg-ink text-surface">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
        <div className="max-w-2xl">
          <h2 className="text-xs font-mono uppercase tracking-widest text-muted mb-8">03 / Contact</h2>
          <h3 className="text-3xl md:text-5xl font-medium tracking-tight leading-tight mb-16">
            Let's build systems<br />that care.
          </h3>
          
          <div className="flex flex-wrap gap-12">
            <a 
              href="mailto:surong731@gmail.com" 
              className="group flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-muted hover:text-surface transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-surface text-ink flex items-center justify-center group-hover:bg-muted transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              Email
            </a>

            <a 
              href="https://www.linkedin.com/in/surongruan/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-muted hover:text-surface transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-surface text-ink flex items-center justify-center group-hover:bg-muted transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </div>
              LinkedIn
            </a>

            <a 
              href="https://x.com/surong3d" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-muted hover:text-surface transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-surface text-ink flex items-center justify-center group-hover:bg-muted transition-colors duration-300">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </div>
              X.com
            </a>
          </div>
        </div>
        
        <div className="text-xs font-mono text-muted flex flex-col gap-2">
          <p>Surong Ruan crafted with AI studio</p>
          <p>&copy; {new Date().getFullYear()} — All Rights Reserved</p>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <div className="min-h-screen bg-bg text-ink font-sans selection:bg-accent selection:text-surface">
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Work onSelectProject={setSelectedProject} />
        <Contact />
      </main>
      <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

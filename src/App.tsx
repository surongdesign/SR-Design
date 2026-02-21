import { motion, AnimatePresence } from "motion/react";
import { ArrowDown, Mail, ArrowUpRight, X, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

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
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=3687&auto=format&fit=crop" 
          alt="Architectural Background" 
          className="w-full h-full object-cover opacity-30 grayscale rotate-90 scale-[2]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-bg/60 to-bg"></div>
      </div>

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
    title: "Unified learning ecosystem",
    category: "Service Design & System Orchestration",
    description: "Unifying fragmented learning offerings into a cohesive, system-wide experience that eliminates friction and dissolves organizational boundaries.",
    challenge: "Fragmented tools across departments created significant friction, forcing students to navigate complex internal organizational silos.",
    impact: "Designed an experience layer that absorbed cross-departmental complexity, orchestrating a single, coherent ecosystem for all student touchpoints.",
    outcome: "Eliminated service fragmentation, resulting in a 40% reduction in support queries and a more intuitive, intent-driven student experience.",
    image: "https://picsum.photos/seed/learning-network/800/600",
    aspect: "aspect-[4/3]",
    colSpan: "md:col-span-4"
  },
  {
    id: "02",
    title: "Orchestrated content offerings",
    category: "Information Architecture & AI Strategy",
    description: "Architecting high-trust systems that streamline knowledge access, ensuring authoritative information is discoverable and reliable at scale.",
    challenge: "Knowledge was scattered across disparate platforms, making it impossible for users to find authoritative answers without experiencing high cognitive load.",
    impact: "Orchestrated a system-wide content layer that unified fragmented data sources, aligning teams around a single source of truth and trust.",
    outcome: "Transformed scattered information into coherent, actionable insights, significantly raising the baseline for information accessibility and trust.",
    image: "https://picsum.photos/seed/educational-tools/800/600",
    aspect: "aspect-[4/3]",
    colSpan: "md:col-span-4"
  },
  {
    id: "03",
    title: "Insight driven learning",
    category: "Interaction Design & Predictive Systems",
    description: "Transforming raw data into actionable insights that serve as meaningful learning outcomes, motivating users toward continuous growth and improvement.",
    challenge: "Users were overwhelmed by information density, requiring a shift from traditional search to a more proactive, insight-driven model.",
    impact: "Defined the interaction patterns for an AI-augmented learning layer that prioritizes coherence and delivers intent-driven answers in real-time.",
    outcome: "Delivered a high-trust, low-friction interface that anticipates user needs, setting a new standard for system-wide clarity and user agency.",
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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface border border-line w-full max-w-3xl rounded-3xl overflow-hidden relative shadow-2xl"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-bg hover:bg-line transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-accent">{project.id}</span>
              <h2 className="text-3xl font-medium tracking-tight">{project.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-3">The Challenge</h3>
                  <p className="text-lg text-ink leading-relaxed font-light">{project.challenge}</p>
                </div>
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-3">My Impact</h3>
                  <p className="text-lg text-ink leading-relaxed font-light">{project.impact}</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-3">The Outcome</h3>
                  <p className="text-lg text-ink leading-relaxed font-light">{project.outcome}</p>
                </div>
                <div className="pt-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-muted mb-3">Category</h3>
                  <p className="text-sm font-mono text-accent uppercase tracking-wider">{project.category}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 rounded-2xl overflow-hidden aspect-video bg-line">
               <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Work = ({ onSelectProject }: { onSelectProject: (p: typeof projects[0]) => void }) => {
  return (
    <section id="work" className="py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xs font-mono uppercase tracking-widest text-muted mb-24">02 / Selected Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group cursor-pointer ${project.colSpan}`}
              onClick={() => onSelectProject(project)}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-surface mb-8 ${project.aspect}`}>
                <motion.img 
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-accent/5 transition-colors duration-500 z-10 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 bg-ink text-bg px-6 py-3 rounded-full font-medium text-sm flex items-center gap-2 shadow-sm">
                    View Case Study <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                {/* Braun accent line */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent group-hover:w-full transition-all duration-700 ease-out z-20"></div>
              </div>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-accent">{project.id}</span>
                  <h3 className="text-lg font-medium">{project.title}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed font-light">
                  {project.description}
                </p>
                <p className="text-[10px] font-mono text-muted uppercase tracking-widest mt-2">
                  {project.category}
                </p>
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
              href="mailto:hello@example.com" 
              className="group flex items-center gap-4 text-sm font-mono uppercase tracking-widest text-muted hover:text-surface transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-surface text-ink flex items-center justify-center group-hover:bg-muted transition-colors duration-300">
                <Mail className="w-5 h-5" />
              </div>
              Email
            </a>

            <a 
              href="https://linkedin.com" 
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
              href="https://x.com" 
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

import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  github: string;
}

const projects: Project[] = [
  {
    title: "DEVOPS PLATFORM",
    subtitle: "Self-Hosted · Docker · Dev/Test/Prod Pipelines",
    description: "Self-hosted server running dev/test/prod pipelines and serving all my hosted projects via Docker containers. Powers everything else on this page.",
    github: "https://github.com/Helmwill/DevOps-Platform"
  },
  {
    title: "CLAUDE CONFIG",
    subtitle: "Agent Team for the Software Delivery Lifecycle",
    description: "A drop-in Claude agent team that automates the full software delivery lifecycle from idea to production.",
    github: "https://github.com/Helmwill/ClaudeConfig"
  },
  {
    title: "CHASSIS",
    subtitle: "Python · FastAPI · PostgreSQL · Job Queues",
    description: "A Python job-queue system that scrapes business directories and event exhibitor lists to generate sales leads. Module A handles evergreen directory scrapes — polling reusable jobs to extract company listings from configurable URLs using CSS selectors or heuristic heading detection. Module B handles event-specific scrapes, tying each lead to a particular trade show or conference. Both modules write to PostgreSQL and CSV, with a FastAPI service handling job creation and status via HTTP.",
    github: "https://github.com/Helmwill/chassis"
  },
  {
    title: "TERRAFORM INFRA",
    subtitle: "Terraform · Multi-Env · Plan/Apply Pipelines",
    description: "A Terraform-managed infrastructure shell — drop-in directory structure with multiple environments and plan/apply pipelines.",
    github: "https://github.com/Helmwill/terraformInfra"
  },
  {
    title: "FITBOT",
    subtitle: "Telegram Bot · Python · Automation",
    description: "An automatic gym class booker. Text the Telegram bot with the time, date, and class type — it logs in and books the class for you.",
    github: "https://github.com/Helmwill/fitBot"
  },
  {
    title: "TRADING BOT",
    subtitle: "Python · Django · AWS RDS · CircleCI",
    description: "Production-ready automated crypto trading bot built during the Imperial College London / HyperionDev mentorship. Integrates Coinbase APIs, AWS RDS backend supporting 10,000+ trade records, and 100% test coverage via CircleCI.",
    github: "https://github.com/Helmwill/TradingBot"
  }
];

function ProjectTile({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.github}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative aspect-[4/3] bg-[#1a1a1a] rounded-sm overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] transition-all duration-500 group-hover:brightness-125" />

      <div className="relative h-full flex flex-col justify-end p-8 lg:p-10">
        <div className="mb-3">
          <h3
            className="tracking-tight mb-2 transition-transform duration-500 group-hover:translate-x-1"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.1, color: '#f0f0f0' }}
          >
            {project.title}
          </h3>
          <p className="tracking-wide" style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)', color: '#a0a0a0' }}>
            {project.subtitle}
          </p>
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2 text-[#6B9BD1]">
          <span style={{ fontSize: '0.9rem' }}>View on GitHub</span>
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>
    </motion.a>
  );
}

export function Work() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="px-5 py-2 rounded-full border border-[#E8A87C] text-[#E8A87C] hover:bg-[#E8A87C]/10 transition-colors uppercase tracking-wider"
            style={{ fontSize: '0.8rem' }}
          >
            Will / Harris
          </Link>

          <div className="flex gap-4">
            <Link
              to="/work"
              className="px-5 py-2 rounded-full border border-[#6B9BD1] text-[#6B9BD1] bg-[#6B9BD1]/10 transition-colors uppercase tracking-wider"
              style={{ fontSize: '0.8rem' }}
            >
              Projects
            </Link>
            <Link
              to="/experience"
              className="px-5 py-2 rounded-full border border-[#E8A87C] text-[#E8A87C] hover:bg-[#E8A87C]/10 transition-colors uppercase tracking-wider"
              style={{ fontSize: '0.8rem' }}
            >
              Experience
            </Link>
          </div>

          <a
            href="/#contact"
            className="px-5 py-2 rounded-full border border-[#6B9BD1] text-[#6B9BD1] hover:bg-[#6B9BD1]/10 transition-colors uppercase tracking-wider"
            style={{ fontSize: '0.8rem' }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Projects Grid */}
      <main className="relative pt-32 pb-20 px-6 lg:px-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          {/* Large diffused glow - top center-right */}
          <div
            className="absolute top-[8%] right-[10%]"
            style={{
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.07) 0%, rgba(0, 255, 65, 0) 60%)',
              filter: 'blur(80px)'
            }}
          />
          {/* Medium glow - center left */}
          <div
            className="absolute top-[40%] left-[8%]"
            style={{
              width: '42%',
              height: '42%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.06) 0%, rgba(0, 255, 65, 0) 65%)',
              filter: 'blur(75px)'
            }}
          />
          {/* Small concentrated glow - bottom right */}
          <div
            className="absolute bottom-[12%] right-[18%]"
            style={{
              width: '28%',
              height: '28%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.08) 0%, rgba(0, 255, 65, 0) 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectTile key={index} project={project} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

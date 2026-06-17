import { Link } from 'react-router';
import { motion } from 'motion/react';

export function WorkExperience() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

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
              className="px-5 py-2 rounded-full border border-[#6B9BD1] text-[#6B9BD1] hover:bg-[#6B9BD1]/10 transition-colors uppercase tracking-wider"
              style={{ fontSize: '0.8rem' }}
            >
              Projects
            </Link>
            <Link
              to="/experience"
              className="px-5 py-2 rounded-full border border-[#E8A87C] text-[#E8A87C] bg-[#E8A87C]/10 transition-colors uppercase tracking-wider"
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

      {/* Content */}
      <main className="relative pt-32 pb-20 px-6 lg:px-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          {/* Medium glow - top left */}
          <div
            className="absolute top-[15%] left-[12%]"
            style={{
              width: '45%',
              height: '45%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.08) 0%, rgba(0, 255, 65, 0) 65%)',
              filter: 'blur(70px)'
            }}
          />
          {/* Large diffused glow - center right */}
          <div
            className="absolute top-[45%] right-[5%]"
            style={{
              width: '55%',
              height: '55%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.06) 0%, rgba(0, 255, 65, 0) 60%)',
              filter: 'blur(80px)'
            }}
          />
          {/* Small glow - bottom left */}
          <div
            className="absolute bottom-[18%] left-[20%]"
            style={{
              width: '30%',
              height: '30%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.07) 0%, rgba(0, 255, 65, 0) 70%)',
              filter: 'blur(65px)'
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUpVariants}
            className="mb-20 tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#f0f0f0' }}
          >
            Work Experience
          </motion.h1>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerChildren}
            className="space-y-20"
          >
            {/* Placeholder content - will be added manually */}
            <motion.div variants={fadeInUpVariants} className="pb-20 border-b border-white/10">
              <div className="mb-6">
                <h2 className="mb-2 tracking-tight" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: '#f0f0f0' }}>
                  Associate IT Engineer
                </h2>
                <p className="mb-2" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: '#a0a0a0' }}>
                  Blackbox Network Services
                </p>
                <p style={{ color: '#666666' }}>Aug 2025 – Present</p>
              </div>
              <ul className="space-y-3 leading-relaxed" style={{ color: '#c8c8c8' }}>
                <li>• Build and maintain Azure CI/CD pipelines for production deployments</li>
                <li>• Develop Terraform pipelines for infrastructure-as-code provisioning</li>
                <li>• Create and configure virtual machines and self-hosted deployment agents</li>
                <li>• Collaborate on automation workflows that improve deployment reliability and repeatability</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="pb-20 border-b border-white/10">
              <div className="mb-6">
                <h2 className="mb-2 tracking-tight" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: '#f0f0f0' }}>
                  Backend Engineering Mentorship
                </h2>
                <p style={{ color: '#666666' }}>Jan 2024 – Oct 2024</p>
              </div>
              <p className="mb-4 leading-relaxed" style={{ color: '#c8c8c8' }}>
                Built a production-ready automated crypto trading bot using Python, Django, and AWS RDS,
                featuring real-time API integration and CI/CD pipelines via CircleCI. Developed under a
                professional-style mentorship with weekly code reviews, pull requests, and sprint-based feedback cycles.
              </p>
              <ul className="space-y-3 leading-relaxed" style={{ color: '#c8c8c8' }}>
                <li>• Integrated 2 real-time market APIs (Coinbase, Coinbase Sandbox) handling 1,000+ daily requests</li>
                <li>• Architected AWS RDS (MySQL) backend supporting 10,000+ trade records with optimised queries</li>
                <li>• Achieved 100% automated test coverage via CircleCI for every code commit</li>
              </ul>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <div className="mb-6">
                <h2 className="mb-2 tracking-tight" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 600, color: '#f0f0f0' }}>
                  Hospitality Leadership
                </h2>
                <p className="mb-2" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', color: '#a0a0a0' }}>
                  Kitchen Manager at Urban Greens, Sous Chef at Publiq
                </p>
                <p style={{ color: '#666666' }}>2021–2025</p>
              </div>
              <p className="leading-relaxed" style={{ color: '#c8c8c8' }}>
                Built foundations in team leadership, performance under pressure, and operational discipline.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

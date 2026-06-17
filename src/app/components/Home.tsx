import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Mail, Phone, MapPin, Github } from 'lucide-react';

export function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const heroY = useSpring(useTransform(scrollY, [0, 500], [0, -150]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="tracking-tight hover:opacity-60 transition-opacity"
          >
            Will / Harris
          </button>

          <div className="flex gap-4">
            <Link
              to="/work"
              className="px-5 py-2 rounded-full border border-[#6B9BD1] text-[#6B9BD1] hover:bg-[#6B9BD1]/10 transition-colors uppercase tracking-wider"
              style={{ fontSize: '0.8rem' }}
            >
              Work
            </Link>
            <Link
              to="/experience"
              className="px-5 py-2 rounded-full border border-[#E8A87C] text-[#E8A87C] hover:bg-[#E8A87C]/10 transition-colors uppercase tracking-wider"
              style={{ fontSize: '0.8rem' }}
            >
              Experience
            </Link>
            <button
              onClick={() => scrollToSection('about')}
              className={`px-5 py-2 rounded-full border transition-colors uppercase tracking-wider ${
                activeSection === 'about' ? 'border-[#6B9BD1] text-[#6B9BD1] bg-[#6B9BD1]/10' : 'border-[#6B9BD1] text-[#6B9BD1] hover:bg-[#6B9BD1]/10'
              }`}
              style={{ fontSize: '0.8rem' }}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-5 py-2 rounded-full border transition-colors uppercase tracking-wider ${
                activeSection === 'contact' ? 'border-[#E8A87C] text-[#E8A87C] bg-[#E8A87C]/10' : 'border-[#E8A87C] text-[#E8A87C] hover:bg-[#E8A87C]/10'
              }`}
              style={{ fontSize: '0.8rem' }}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          {/* Large diffused glow - top left */}
          <div
            className="absolute top-[10%] left-[5%]"
            style={{
              width: '60%',
              height: '60%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.08) 0%, rgba(0, 255, 65, 0) 60%)',
              filter: 'blur(80px)'
            }}
          />
          {/* Smaller concentrated glow - bottom right */}
          <div
            className="absolute bottom-[15%] right-[10%]"
            style={{
              width: '25%',
              height: '25%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.06) 0%, rgba(0, 255, 65, 0) 70%)',
              filter: 'blur(60px)'
            }}
          />
        </div>
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="text-center px-6 max-w-5xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6 tracking-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.1, fontWeight: 700, color: '#f0f0f0' }}
          >
            Will Harris
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-4 tracking-wide"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: '#a0a0a0' }}
          >
            Software Engineer · Cloud & DevOps
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: '#a0a0a0' }}
          >
            Building Azure CI/CD and Terraform pipelines at Blackbox Network Services.
            AZ-400, Terraform Associate, AWS Certified.
          </motion.p>
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUpVariants}
        className="relative py-32 px-6 lg:px-12"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          {/* Medium glow - center right */}
          <div
            className="absolute top-[40%] right-[8%]"
            style={{
              width: '40%',
              height: '40%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.07) 0%, rgba(0, 255, 65, 0) 65%)',
              filter: 'blur(70px)'
            }}
          />
          {/* Small glow - top left */}
          <div
            className="absolute top-[20%] left-[15%]"
            style={{
              width: '28%',
              height: '28%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.05) 0%, rgba(0, 255, 65, 0) 70%)',
              filter: 'blur(65px)'
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <h2 className="mb-12 tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: '#f0f0f0' }}>
            About
          </h2>
          <p className="leading-relaxed" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', color: '#c8c8c8' }}>
            Software engineer focused on cloud infrastructure, CI/CD, and platform engineering.
            Currently at Blackbox Network Services building Azure pipelines, Terraform automation,
            and infrastructure provisioning. AZ-400 DevOps Engineer Expert, HashiCorp Terraform Associate,
            and AWS Cloud Practitioner certified. Imperial College London bootcamp graduate (100% average, 3rd in class).
          </p>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="relative py-32 px-6 lg:px-12"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          {/* Large diffused glow - bottom left */}
          <div
            className="absolute bottom-[10%] left-[5%]"
            style={{
              width: '55%',
              height: '55%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.06) 0%, rgba(0, 255, 65, 0) 60%)',
              filter: 'blur(75px)'
            }}
          />
          {/* Medium glow - top right */}
          <div
            className="absolute top-[15%] right-[12%]"
            style={{
              width: '35%',
              height: '35%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.07) 0%, rgba(0, 255, 65, 0) 65%)',
              filter: 'blur(70px)'
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInUpVariants}
            className="mb-20 tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: '#f0f0f0' }}
          >
            Skills
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.div variants={fadeInUpVariants}>
              <h3 className="mb-6 tracking-tight" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', fontWeight: 600, color: '#f0f0f0' }}>
                Technical
              </h3>
              <p className="leading-relaxed" style={{ color: '#c8c8c8' }}>
                Azure, AWS, Terraform, Ansible, CI/CD (Azure Pipelines, CircleCI), Python, SQL, MySQL,
                Django, Virtual Machines & Agents, Git, GitHub, OOP, Agile
              </p>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <h3 className="mb-6 tracking-tight" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.5rem)', fontWeight: 600, color: '#f0f0f0' }}>
                Soft Skills
              </h3>
              <p className="leading-relaxed" style={{ color: '#c8c8c8' }}>
                Attention to Detail, Problem Solving, Collaboration, Adaptability,
                Time Management, Communication
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        id="education"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="relative py-32 px-6 lg:px-12"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          {/* Small concentrated glow - center left */}
          <div
            className="absolute top-[45%] left-[10%]"
            style={{
              width: '30%',
              height: '30%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.08) 0%, rgba(0, 255, 65, 0) 70%)',
              filter: 'blur(60px)'
            }}
          />
          {/* Large glow - bottom right */}
          <div
            className="absolute bottom-[5%] right-[8%]"
            style={{
              width: '50%',
              height: '50%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.05) 0%, rgba(0, 255, 65, 0) 65%)',
              filter: 'blur(80px)'
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto">
          <motion.h2
            variants={fadeInUpVariants}
            className="mb-20 tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: '#f0f0f0' }}
          >
            Certifications & Education
          </motion.h2>

          <div className="space-y-8">
            <motion.div variants={fadeInUpVariants} className="pb-8 border-b border-white/10">
              <h3 className="mb-2 tracking-tight" style={{ fontWeight: 600, color: '#f0f0f0' }}>Microsoft Certified: DevOps Engineer Expert (AZ-400)</h3>
              <p style={{ color: '#a0a0a0' }}>2025</p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="pb-8 border-b border-white/10">
              <h3 className="mb-2 tracking-tight" style={{ fontWeight: 600, color: '#f0f0f0' }}>HashiCorp Certified: Terraform Associate</h3>
              <p style={{ color: '#a0a0a0' }}>2025</p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="pb-8 border-b border-white/10">
              <h3 className="mb-2 tracking-tight" style={{ fontWeight: 600, color: '#f0f0f0' }}>AWS Certified Cloud Practitioner</h3>
              <p style={{ color: '#a0a0a0' }}>2025</p>
            </motion.div>

            <motion.div variants={fadeInUpVariants} className="pb-8 border-b border-white/10">
              <h3 className="mb-2 tracking-tight" style={{ fontWeight: 600, color: '#f0f0f0' }}>Software Engineering Bootcamp</h3>
              <p style={{ color: '#a0a0a0' }}>Imperial College London / HyperionDev — 2023–2024</p>
            </motion.div>

            <motion.div variants={fadeInUpVariants}>
              <h3 className="mb-2 tracking-tight" style={{ fontWeight: 600, color: '#f0f0f0' }}>A-levels (Economics, Media, Film)</h3>
              <p style={{ color: '#a0a0a0' }}>York College — 2015–2018</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="relative py-32 px-6 lg:px-12 min-h-screen flex items-center"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
          {/* Medium glow - top right */}
          <div
            className="absolute top-[20%] right-[15%]"
            style={{
              width: '38%',
              height: '38%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.07) 0%, rgba(0, 255, 65, 0) 65%)',
              filter: 'blur(70px)'
            }}
          />
          {/* Large diffused glow - center left */}
          <div
            className="absolute top-[50%] left-[5%]"
            style={{
              width: '58%',
              height: '58%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.06) 0%, rgba(0, 255, 65, 0) 60%)',
              filter: 'blur(75px)'
            }}
          />
          {/* Small glow - bottom right */}
          <div
            className="absolute bottom-[10%] right-[20%]"
            style={{
              width: '25%',
              height: '25%',
              background: 'radial-gradient(circle, rgba(0, 255, 65, 0.05) 0%, rgba(0, 255, 65, 0) 70%)',
              filter: 'blur(65px)'
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto w-full">
          <motion.h2
            variants={fadeInUpVariants}
            className="mb-20 tracking-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: '#f0f0f0' }}
          >
            Contact
          </motion.h2>

          <div className="space-y-8">
            <motion.a
              variants={fadeInUpVariants}
              href="mailto:williammartinh@gmail.com"
              className="flex items-center gap-4 transition-colors group"
              style={{ color: '#c8c8c8' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#c8c8c8'}
            >
              <Mail className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>williammartinh@gmail.com</span>
            </motion.a>

            <motion.a
              variants={fadeInUpVariants}
              href="tel:07805329536"
              className="flex items-center gap-4 transition-colors group"
              style={{ color: '#c8c8c8' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#c8c8c8'}
            >
              <Phone className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>07805 329536</span>
            </motion.a>

            <motion.a
              variants={fadeInUpVariants}
              href="https://github.com/Helmwill"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 transition-colors group"
              style={{ color: '#c8c8c8' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#c8c8c8'}
            >
              <Github className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>github.com/Helmwill</span>
            </motion.a>

            <motion.div
              variants={fadeInUpVariants}
              className="flex items-center gap-4"
              style={{ color: '#c8c8c8' }}
            >
              <MapPin className="w-6 h-6 opacity-50" />
              <span style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>Reading, UK</span>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

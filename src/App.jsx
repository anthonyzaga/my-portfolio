import React, { useState, useEffect, useRef } from 'react';
import {
  Code,
  Palette,
  Camera,
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  ChevronRight,
  Database,
  Layout,
  Server,
  Terminal,
  Cpu,
  GraduationCap,
  Music,
  Gamepad2,
  Award,
  Download,
} from 'lucide-react';
import Tonny from '../public/tonny.jpg'

// --- Custom CSS for Animations ---
const customStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
    100% { transform: translateY(0px); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.2); }
    50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.5); }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float 7s ease-in-out infinite 2s;
  }

  .glass-card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .text-gradient {
    background: linear-gradient(to right, #60a5fa, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

// --- Utility Components ---

const PageTransition = ({ children, className = '' }) => (
  <div className={`animate-fade-in ${className}`}>{children}</div>
);

const Typewriter = ({ text, speed = 100 }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span>{displayText}</span>;
};

// --- Main Components ---

const Navigation = ({
  activeTab,
  setActiveTab,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            <span className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
              <img src={Tonny} className="w-[30px] h-[30px] object-cover rounded-full" />              
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden group ${
                    activeTab === item.id
                      ? 'text-white bg-slate-800/50 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {activeTab === item.id && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-transform active:scale-95"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-3 rounded-md text-base font-medium transition-colors ${
                activeTab === item.id
                  ? 'text-white bg-slate-800 border-l-4 border-blue-500'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ setActiveTab }) => {
  return (
    <PageTransition className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-950/80 to-slate-950"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium tracking-wide animate-float">
          👋 HELLO WORLD
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
        Luyimbaazi <br className="md:hidden" />
          <span className="text-gradient">Tonny</span>
        </h1>

        <div className="h-8 md:h-12 mb-6 text-xl md:text-3xl text-slate-300 font-light">
          I am a{' '}
          <span className="text-blue-400 font-semibold">
            <Typewriter text="Software Developer" speed={100} />
          </span>
        </div>

        <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Blending the logic of{' '}
          <span className="text-white">Full-Stack Dev</span> with the artistry
          of <span className="text-white">Graphic Design</span>. Building robust
          systems in Masaka, Uganda.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setActiveTab('projects')}
            className="group px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            Explore Projects
            <ChevronRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className="px-8 py-3.5 rounded-full glass-card hover:bg-slate-800 text-slate-300 hover:text-white font-semibold transition-all duration-300 border border-slate-700 hover:border-slate-500"
          >
            Let's Talk
          </button>
        </div>

        {/* Floating Icons */}
        <div className="mt-20 flex justify-center gap-12 text-slate-600">
          <div className="flex flex-col items-center gap-2 hover:text-blue-400 transition-colors duration-300 animate-float cursor-pointer">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
              <Code size={28} />
            </div>
            <span className="text-xs font-medium tracking-wider">CODE</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:text-purple-400 transition-colors duration-300 animate-float-delayed cursor-pointer">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
              <Palette size={28} />
            </div>
            <span className="text-xs font-medium tracking-wider">DESIGN</span>
          </div>
          <div className="flex flex-col items-center gap-2 hover:text-pink-400 transition-colors duration-300 animate-float cursor-pointer">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 shadow-xl">
              <Camera size={28} />
            </div>
            <span className="text-xs font-medium tracking-wider">EDIT</span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const About = () => {
  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Column: Image & Personal Info */}
        <div className="space-y-8">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 relative z-10 border border-slate-800 shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-600">
                <div className=" mb-20 w-70 h-70 rounded-full mb-6 bg-slate-800  flex items-center justify-center text-4xl font-bold text-blue-500 shadow-inner">
                  <img  src={Tonny} className='rounded-full object-cover w-70 h-70'/>
                </div>
                <p className="text-sm font-medium px-8 text-center">
                  "I combine technical development skills with experience in
                  graphic design."
                </p>
              </div>
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-4">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Music size={18} className="text-purple-400" /> Interests &
              Hobbies
            </h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-300 flex items-center gap-2 border border-slate-700">
                <Gamepad2 size={14} className="text-green-400" /> Chess Strategy
              </span>
              <span className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-300 flex items-center gap-2 border border-slate-700">
                <Music size={14} className="text-pink-400" /> Music
              </span>
              <span className="px-3 py-1.5 bg-slate-800 rounded-lg text-sm text-slate-300 flex items-center gap-2 border border-slate-700">
                <Camera size={14} className="text-yellow-400" /> Photography
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Experience */}
        <div className="space-y-10">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              About <span className="text-blue-500">Me</span>
            </h2>
            <div className="prose prose-lg prose-invert text-slate-300">
              <p>
                Hello! I'm{' '}
                <strong className="text-white">Luyimbaazi Tonny</strong>, a
                driven Software Development student based in Masaka, Uganda.
              </p>
              <p>
                My journey is unique because I don't just write code; I design
                experiences. With a background in{' '}
                <span className="text-purple-400">Graphics Design</span> and{' '}
                <span className="text-pink-400">Photo Editing</span>, I ensure
                that every web application I build is not only functional but
                visually captivating.
              </p>
              <p>
                Currently, I am deep-diving into the{' '}
                <strong>Laravel Framework</strong> and enhancing my skills in
                backend architecture while leading development on real-world
                projects like <em>Learnova</em>.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Award size={24} className="text-yellow-500" /> Experience
            </h3>
            <div className="relative pl-8 border-l-2 border-slate-800 space-y-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-950"></div>
                <h4 className="text-xl font-bold text-white">
                  Graphics & Photo Editor
                </h4>
                <div className="text-blue-400 font-medium mb-2">
                  Muwan Shots Photography | 2025 - 2026
                </div>
                <p className="text-slate-400 text-sm">
                  Designed and edited digital graphics for clients, improving
                  visual branding and presentation quality. Gained hands-on
                  experience meeting strict client deadlines.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 bg-slate-700 rounded-full border-4 border-slate-950"></div>
                <h4 className="text-xl font-bold text-white">
                  Freelance Developer
                </h4>
                <div className="text-blue-400 font-medium mb-2">
                  Self-Employed | Ongoing
                </div>
                <p className="text-slate-400 text-sm">
                  Building websites and web applications for local businesses
                  and personal projects.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors border border-slate-700">
              <Download size={18} /> Download CV
            </button>
            <div className="flex flex-col justify-center px-4">
              <span className="text-xs text-slate-500 uppercase tracking-wide">
                Languages
              </span>
              <span className="text-slate-300 font-medium">
                English, Luganda
              </span>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

const EducationTimeline = () => {
  const education = [
    {
      school: 'Equator University of Science and Technology',
      period: '2025 - 2026 (Ongoing)',
      degree: 'Diploma in ICT',
      desc: 'Focusing on advanced software development concepts and system architecture.',
      color: 'border-blue-500',
    },
    {
      school: 'International School of Music, Languages & Polytechnic',
      period: '2023 - 2024',
      degree: 'National Certificate in IT',
      desc: 'Award: Second Class Upper. Built a strong foundation in computing basics.',
      color: 'border-purple-500',
    },
    {
      school: "St. Joseph's SS Nkoni",
      period: '2017 - 2021',
      degree: 'UCE Certificate',
      desc: 'Completed Uganda Certificate of Education.',
      color: 'border-slate-600',
    },
  ];

  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Academic <span className="text-gradient">Journey</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          The educational milestones that have shaped my technical expertise.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Center Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-800"></div>

        <div className="space-y-12">
          {education.map((edu, index) => (
            <div
              key={index}
              className={`relative flex items-center justify-between ${
                index % 2 === 0 ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Empty side for spacing */}
              <div className="w-5/12"></div>

              {/* Center Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center z-10 group-hover:border-blue-500 transition-colors">
                <div
                  className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-green-500 animate-pulse' : 'bg-slate-500'
                  }`}
                ></div>
              </div>

              {/* Content Card */}
              <div className={`w-5/12 group`}>
                <div
                  className={`glass-card p-6 rounded-xl border-l-4 ${edu.color} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex items-center gap-2 mb-2 text-blue-400 text-sm font-semibold">
                    <GraduationCap size={16} />
                    {edu.period}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {edu.school}
                  </h3>
                  <div className="text-slate-300 font-medium text-sm mb-3">
                    {edu.degree}
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {edu.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

const SkillBar = ({ name, level, color }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-slate-300 font-medium">{name}</span>
      <span className="text-slate-500 text-sm">{level}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
      <div
        className={`h-2.5 rounded-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

const Skills = () => {
  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Technical <span className="text-purple-500">Arsenal</span>
        </h2>
        <p className="text-slate-400">
          My proficiency across development and design.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Development Skills */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
              <Code size={24} />
            </div>
            Development
          </h3>
          <SkillBar name="HTML5 & CSS3" level={95} color="bg-blue-500" />
          <SkillBar name="JavaScript (ES6+)" level={85} color="bg-yellow-500" />
          <SkillBar
            name="React.js & React Native"
            level={80}
            color="bg-cyan-500"
          />
          <SkillBar name="PHP & Laravel" level={75} color="bg-indigo-500" />
          <SkillBar name="SQL / Database" level={70} color="bg-slate-400" />
        </div>

        {/* Design & Tools */}
        <div className="glass-card p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
              <Palette size={24} />
            </div>
            Creative & Tools
          </h3>
          <SkillBar name="Adobe Photoshop" level={90} color="bg-blue-600" />
          <SkillBar name="Adobe Illustrator" level={85} color="bg-orange-500" />
          <SkillBar name="Photo Editing" level={90} color="bg-purple-500" />
          <SkillBar name="UI/UX Design" level={80} color="bg-pink-500" />
          <SkillBar
            name="Git & Version Control"
            level={85}
            color="bg-red-500"
          />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          'Responsive Design',
          'Cross-Platform',
          'System Analysis',
          'Branding',
        ].map((skill, i) => (
          <div
            key={i}
            className="bg-slate-900 border border-slate-800 py-4 px-6 rounded-lg text-center text-slate-400 hover:text-white hover:border-blue-500 transition-colors"
          >
            {skill}
          </div>
        ))}
      </div>
    </PageTransition>
  );
};

const ProjectCard = ({ title, role, desc, tags, status, delay }) => (
  <div
    className="group relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/20"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Hover Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="p-8 relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-bold tracking-wider text-blue-400 uppercase mb-2 block">
            {role}
          </span>
          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
            {title}
          </h3>
        </div>
        {status === 'Ongoing' ? (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-500 text-xs font-bold rounded-full border border-yellow-500/20 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> In
            Progress
          </span>
        ) : (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded-full border border-green-500/20">
            Completed
          </span>
        )}
      </div>

      <p className="text-slate-400 mb-8 leading-relaxed text-sm">{desc}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag, idx) => (
          <span
            key={idx}
            className="text-xs font-medium text-slate-400 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800 group-hover:border-slate-700 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        <button className="flex-1 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 group/btn">
          <Github size={16} /> Code
        </button>
        <button className="flex-1 py-2.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 text-sm font-medium transition-all flex items-center justify-center gap-2 border border-blue-500/20 hover:border-blue-500/40">
          <ExternalLink size={16} /> Live Demo
        </button>
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured <span className="text-blue-500">Projects</span>
        </h2>
        <p className="text-slate-400 max-w-2xl">
          Real-world solutions built with modern tech stacks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProjectCard
          title="Learnova"
          role="Lead Developer"
          status="Ongoing"
          desc="A comprehensive cross-platform Student Institution Management System designed to streamline administrative tasks. Features include real-time dashboards, attendance tracking, and an online learning portal. I architected the database schema and am currently implementing the frontend-backend integration."
          tags={['PHP', 'JavaScript', 'React', 'MySQL', 'System Design']}
          delay={0}
        />

        <ProjectCard
          title="Mulan Tours & Travel"
          role="Project Leader"
          status="Completed"
          desc="A custom-built travel agency website focusing on user experience and visual storytelling. Implemented a custom CMS for the client to manage packages and bookings. This project honed my skills in structured data handling and responsive UI design."
          tags={['Web Development', 'Backend Logic', 'UI/UX', 'Database']}
          delay={200}
        />

        {/* Placeholder for future project */}
        <div className="bg-slate-900/30 border-2 border-slate-800 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center group hover:bg-slate-900/50 transition-colors min-h-[300px]">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Cpu
              className="text-slate-600 group-hover:text-blue-400 transition-colors"
              size={32}
            />
          </div>
          <h3 className="text-xl font-bold text-slate-500 mb-2">
            Next Big Thing
          </h3>
          <p className="text-slate-600 text-sm max-w-xs mb-6">
            Currently experimenting with React Native for mobile applications.
          </p>
          <button className="text-blue-500/50 hover:text-blue-400 text-sm font-medium flex items-center gap-1">
            View GitHub <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    const formData = new FormData(event.target);

    // INSERT YOUR ACCESS KEY HERE
    formData.append("access_key", "3a21b51d-9fe8-4b60-8744-611e7189f16e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message Sent Successfully! ✅");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <PageTransition className="min-h-screen pt-24 pb-12 px-6 max-w-4xl mx-auto flex flex-col justify-center">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Get In <span className="text-gradient">Touch</span></h2>
        <p className="text-slate-400 mt-4">Have a project in mind? Let's build it together.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400"><Mail size={24}/></div>
               <div>
                 <p className="text-slate-400 text-sm">Email Me</p>
                 <p className="text-white font-medium">tonnyluyimbaazi6@gmail.com</p>
               </div>
             </div>
          </div>
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400"><MapPin size={24}/></div>
               <div>
                 <p className="text-slate-400 text-sm">Location</p>
                 <p className="text-white font-medium">Masaka, Uganda</p>
               </div>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={onSubmit} className="glass-card p-8 rounded-3xl border border-slate-700 space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            required 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            required 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          />
          <textarea 
            name="message" 
            rows="4" 
            placeholder="Your Message" 
            required 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          ></textarea>
          
          <button 
            type="submit" 
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
          >
            Send Message
          </button>
          
          {result && <p className="text-center text-sm text-blue-400 animate-pulse mt-2">{result}</p>}
        </form>
      </div>
    </PageTransition>
  );
};

// --- Main App Component ---

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Inject Custom CSS */}
      <style>{customStyles}</style>

      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="relative z-0">
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <About />}
        {activeTab === 'education' && <EducationTimeline />}
        {activeTab === 'skills' && <Skills />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'contact' && <Contact />}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center relative z-10">
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="#"
            className="text-slate-500 hover:text-blue-500 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-blue-500 transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:tonnyluyimbaazi6@gmail.com"
            className="text-slate-500 hover:text-blue-500 transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
        <p className="text-slate-600 text-sm">
          &copy; {new Date().getFullYear()} Tonny Luyimbaazi.
        </p>
        <p className="text-slate-700 text-xs mt-2">
          Built with React, Tailwind & creativity.
        </p>
      </footer>
    </div>
  );
};

export default App;

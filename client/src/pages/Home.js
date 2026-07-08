import React, { useState, useEffect, useRef } from 'react';
import {
  FaReact, FaNodeJs, FaServer,
  FaPython, FaGithubAlt, FaGitAlt
} from 'react-icons/fa';
import { SiJavascript, SiMongodb, SiPhp, SiLaravel, SiHtml5, SiCss3, SiBootstrap, SiPytorch } from 'react-icons/si';
import './Home.css';

const roles = [
  'Full Stack Developer',
  'AI Enthusiast',
  'Problem Solver',
  'Creative Builder',
];

const skills = [
  { icon: <FaReact />, name: 'React', desc: 'UI Components & SPAs' },
  { icon: <FaNodeJs />, name: 'Node.js', desc: 'Backend & APIs' },
  { icon: <SiMongodb />, name: 'MongoDB', desc: 'Database Design' },
  { icon: <FaServer />, name: 'Express', desc: 'RESTful Services' },
  { icon: <FaPython />, name: 'Python', desc: 'AI & Scripting' },
  { icon: <SiJavascript />, name: 'JavaScript', desc: 'ES6+ Modern JS' },
  { icon: <SiPhp />, name: 'PHP', desc: 'Server-Side Development' },
  { icon: <SiLaravel />, name: 'Laravel', desc: 'PHP Framework' },
  { icon: <SiHtml5 />, name: 'HTML', desc: 'Semantic Markup' },
  { icon: <SiCss3 />, name: 'CSS', desc: 'Responsive Styling' },
  { icon: <SiBootstrap />, name: 'Bootstrap', desc: 'UI Components' },
  { icon: <FaGithubAlt />, name: 'Github', desc: 'Repository' },
  { icon: <FaGitAlt />, name: 'Git', desc: 'Version Control' },
  { icon: <SiPytorch />, name: 'PyTorch', desc: 'Deep Learning' },
];

function Home() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const skillsRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Scroll reveal for skills
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home">
      {/* HERO SECTION */}
      <div className="hero-section">
        {/* Floating shapes */}
        <div className="hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>

        {/* Gradient orbs */}
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>

        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm Glennmar Flores</p>
          <h1 className="hero-title">
            <span className="typed-text">{displayText}</span>
            <span className="cursor">|</span>
          </h1>
          <p className="hero-description">
            I love to build AI models and also web and mobile applications 
            that can lessen the burden on users.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'projects')}>
              <span>View My Work</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact" className="btn btn-secondary" onClick={(e) => scrollToSection(e, 'contact')}>
              Get In Touch
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator" onClick={(e) => scrollToSection(e, 'projects')}>
          <span className="scroll-text">Scroll</span>
          <div className="scroll-line">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </div>

      {/* SKILLS SECTION */}
      <div className="skills-section" ref={skillsRef}>
        <div className="skills-header reveal">
          <p className="section-label">What I Work With</p>
          <h2>My Tech Stack</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div
              className="skill-card reveal"
              key={index}
              style={{ transitionDelay: `${index * 0.08}s` }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.name}</h3>
              <p>{skill.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

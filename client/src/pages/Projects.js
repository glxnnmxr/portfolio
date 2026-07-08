import React, { useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    _id: '1',
    title: 'WIB Attendance System',
    description: 'Full-stack application for managing employee attendance with user authentication, reporting, and integration with payroll systems.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/mzxriano/wib-employee-fe.git',
  },
  {
    _id: '2',
    title: 'Tranquil Mind Mobile App',
    description: 'A mobile application for mental wellness, offering guided meditations, mood tracking, and personalized recommendations.',
    technologies: ['Firesbase', 'Flutter', 'Dart'],
    github: 'https://github.com/glxnnmxr/tranquil_mind_user_app.git',
  
  },
  {
    _id: '3',
    title: 'Tracktrace Library Management System',
    description: 'A library management system with book tracking, user management, and reporting features.',
    technologies: ['Xampp', 'Laravel', 'PHP'],
    github: 'https://github.com/glxnnmxr/Tracktrace.git',
   
  },
];

function Projects() {
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

    const elements = document.querySelectorAll('#projects .reveal');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="projects">
      <div className="projects-header reveal">
        <p className="section-label">Portfolio</p>
        <h2>Featured Projects</h2>
        <p className="projects-subtitle">A selection of recent work I'm proud of</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div
            key={project._id}
            className="project-card reveal"
            style={{ transitionDelay: `${index * 0.15}s` }}
          >
            <div className="project-number">0{index + 1}</div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="technologies">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>

              <div className={`project-links ${!project.live ? 'project-links--single' : ''}`}>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-btn" aria-label="View source on GitHub">
                  <FaGithub />
                  <span>Code</span>
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-btn link-btn--primary" aria-label="View live demo">
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

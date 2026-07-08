import React, { useEffect, useRef, useState } from 'react';
import './About.css';

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const increment = target / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function About() {
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

    const elements = document.querySelectorAll('#about .reveal, #about .reveal-left, #about .reveal-right');
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 5, suffix: '+', label: 'Projects Completed' },
    { value: 7, suffix: '+', label: 'Apps Built' },
  ];

  const expertise = [
    {
      title: 'Frontend Development',
      skills: ['React.js', 'HTML/CSS', 'JavaScript', 'Responsive Design'],
    },
    {
      title: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'Authentication'],
    },
    {
      title: 'Database',
      skills: ['MongoDB', 'Firesbase', 'Supabase', 'MySQL'],
    },
    {
      title: 'Tools',
      skills: ['Git', 'GitHub', 'Visual Studio Code', 'Copilot'],
    },
  ];

  return (
    <div className="about">
      <div className="about-container">
        <div className="about-header reveal">
          <p className="section-label">Get To Know Me</p>
          <h2>About Me</h2>
        </div>

        {/* STATS */}
        <div className="stats-row reveal">
          {stats.map((stat, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-value">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ABOUT CONTENT */}
        <div className="about-content">
          <div className="about-text reveal-left">
            <h3>Hello! I'm Glennmar Flores, a Full Stack Developer</h3>
            <p>
              I'm passionate about building beautiful and functional web applications. 
              With expertise in the MERN stack, I create scalable solutions that solve real-world problems.
            </p>
            <p>
              My journey in web development started with a curiosity about how things work on the internet. 
              Since then, I've worked on various projects ranging from simple websites to complex web applications.
            </p>
            <p>
              I believe in writing clean, maintainable code and following best practices in every project. 
              When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.
            </p>
          </div>

          <div className="about-visual reveal-right">
            <div className="code-block">
              <div className="code-header">
                <span className="code-dot code-dot--red"></span>
                <span className="code-dot code-dot--yellow"></span>
                <span className="code-dot code-dot--green"></span>
              </div>
              <pre className="code-body">
{`const developer = {
  name: "Glennmar Flores",
  skills: ["MERN", "AI/ML"],
  passion: "Building things",
  coffee: true,
  
  create() {
    return "Amazing apps!";
  }
};`}
              </pre>
            </div>
          </div>
        </div>

        {/* EXPERTISE */}
        <div className="expertise reveal">
          <h3>My Expertise</h3>
          <div className="expertise-grid">
            {expertise.map((item, i) => (
              <div className="expertise-item" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                <h4>{item.title}</h4>
                <ul>
                  {item.skills.map((skill, j) => (
                    <li key={j}>
                      <span className="expertise-bullet"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

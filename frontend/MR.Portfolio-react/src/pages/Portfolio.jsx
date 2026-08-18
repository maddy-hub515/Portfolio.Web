import { useState, useEffect, useRef } from 'react'
import { FaReact } from "react-icons/fa";


function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const progressBarsRef = useRef(null)
  const countersRef = useRef(null)

  useEffect(() => {
    const counters = countersRef.current?.querySelectorAll('.counter')
    if (counters) {
      counters.forEach(counter => {
        const updateCount = () => {
          const target = +counter.getAttribute('data-target')
          const count = +counter.innerText
          const speed = 100
          const increment = target / speed
          if (count < target) {
            counter.innerText = Math.ceil(count + increment)
            setTimeout(updateCount, 30)
          } else {
            counter.innerText = target
          }
        }
        updateCount()
      })
    }

    const progressBars = progressBarsRef.current?.querySelectorAll('.progress-bar')
    if (progressBars) {
      progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress')
        setTimeout(() => {
          bar.style.width = progress + '%'
        }, 500)
      })
    }
  }, [])

  const projects = [
    { id: 1, title: 'Portfolio', category: 'web', image: '/images/project-portfolio-img.jpg', description: 'Designed and developed a responsive personal portfolio website to showcase projects, technical skills, and professional achievements.', link: 'https://madeshram-portfolio.onrender.com', linkText: 'Live Demo' },
    { id: 2, title: 'SmartSolve AI', category: 'web', image: '/images/project-SmartSolveAI-img.jpg', description: 'Built a custom AI assistant capable of storing, retrieving, and summarizing solutions to organizational problems.', link: 'https://github.com/maddy-hub515/Smart-AI-Agent', linkText: 'GitHub' },
    { id: 3, title: 'E-Commerce Website', category: 'web', image: '/images/project-web-img.jpg', description: 'Full-stack e-commerce platform with product catalog, shopping cart, and secure checkout functionality.', link: '#', linkText: 'View Project' },
    { id: 4, title: 'Fitness Tracker App', category: 'mobile', image: '/images/project-mobile-app.jpg', description: 'Mobile application for tracking workouts, nutrition, and fitness goals with progress analytics.', link: '#', linkText: 'View Project' },
    { id: 5, title: 'CMS Platform', category: 'web', image: '/images/project-cms.jpg', description: 'Content management system for blog publishing with admin dashboard and user management.', link: '#', linkText: 'View Project' },
    { id: 6, title: 'Product Branding', category: 'branding', image: '/images/project-branding.jpg', description: 'Brand identity design for a tech startup including logo, color palette, and guidelines.', link: '#', linkText: 'View Project' },
    { id: 7, title: 'Admin Dashboard', category: 'web', image: '/images/project-dashboard.jpg', description: 'Admin panel for managing application data with charts, tables, and user roles.', link: '#', linkText: 'View Project' }
  ]

  const filteredProjects = projects.filter(project => activeFilter === 'all' || project.category === activeFilter)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      if (response.ok) {
        setAlert({ type: 'success', message: result.message || 'Message sent successfully!' })
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setAlert({ type: 'danger', message: result.message || 'Something went wrong.' })
      }
    } catch (error) {
      setAlert({ type: 'danger', message: 'Unable to connect to server. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* HOME SECTION */}
      <section id="home" className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="greeting-badge">
            <span>Hi, I'm</span>
            <span className="wave-emoji">👋</span>
          </div>
          <h1 className="hero-name">Madesh Ram</h1>
          <h2 className="hero-title">Software Engineer</h2>
          <h3 className="hero-subtitle">.NET Full-Stack Developer</h3>
          <p className="hero-description">
            I build scalable and secure web applications using C#, .NET Core, ASP.NET, React, SQL Server, and Azure. Turning ideas into real-world solutions.
          </p>
          <div className="hero-buttons">
            <a href="#projects" className="btn-primary-custom">
              <i className="bi bi-box-arrow-up-right"></i>
              <span>View My Work</span>
            </a>
            <a href="public/images/Madesh_Ram-Resume.pdf" className="btn-outline-custom" download>
              <i className="bi bi-download"></i>
              <span>Download Resume</span>
            </a>
          </div>
          <div className="tech-stack">
            <span className="tech-label">Tech I work with:</span>
            <div className="tech-badges">
              <span className="tech-badge"><i className="bi bi-gear"></i> .NET</span>
              <span className="tech-badge"><i className="bi bi-c-circle"></i> C#</span>
              <span className="tech-badge"><FaReact className="react-icon" /> React</span>
              <span className="tech-badge"><i className="bi bi-database"></i> SQL Server</span>
              <span className="tech-badge"><i className="bi bi-cloud"></i> Azure</span>
            </div>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-calendar-check"></i>
            </div>
            <div className="stat-content">
              <h4 className="stat-number">3+</h4>
              <p className="stat-label">Years Experience</p>
              <p className="stat-desc">Building enterprise solutions</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-people"></i>
            </div>
            <div className="stat-content">
              <h4 className="stat-number">10K+</h4>
              <p className="stat-label">Users Impacted</p>
              <p className="stat-desc">Applications used by thousands</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-globe"></i>
            </div>
            <div className="stat-content">
              <h4 className="stat-number">20+</h4>
              <p className="stat-label">Client Environments</p>
              <p className="stat-desc">Delivered solutions across industries</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>
            <div className="stat-content">
              <h4 className="stat-number">60%</h4>
              <p className="stat-label">Query Performance Improvement</p>
              <p className="stat-desc">Through optimization and best practices</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <span className="about-label">ABOUT ME</span>
            <h1 className="about-title">About Me</h1>
            <div className="about-underline"></div>
            
            <div className="about-description">
              <p>
                I'm a Software Engineer with 3+ years of experience in building enterprise
                applications using scalable solutions and modern technologies.
              </p>
              <p>
                I specialize in developing secure REST APIs, building responsive user
                interfaces, optimizing database queries, and deploying applications on
                cloud platforms. I am passionate about writing clean code and creating
                impactful digital experiences.
              </p>
              <p>
                I enjoy solving complex problems, learning new technologies, and
                collaborating with amazing teams to deliver products that matter.
              </p>
            </div>

            <div className="about-info-grid">
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-person"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Name</span>
                  <span className="info-value">Madesh Ram</span>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-briefcase"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Role</span>
                  <span className="info-value">Software Engineer</span>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Experience</span>
                  <span className="info-value">3+ Years</span>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-award"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Specialization</span>
                  <span className="info-value">.NET | React | SQL | Azure</span>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">Chennai, Tamil Nadu, India</span>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">
                  <i className="bi bi-code-slash"></i>
                </div>
                <div className="info-content">
                  <span className="info-label">Availability</span>
                  <span className="info-value">Open to Opportunities</span>
                </div>
              </div>
            </div>
          </div>

          <div className="about-image-section">
            <div className="about-image-wrapper">
              <img src="/images/Madesh_about_img.JPG" alt="Madesh Ram" className="about-profile-img" />
              <div className="about-image-overlay">
                <span className="signature-text">Madesh Ram</span>
                <span className="tagline-text">BUILD • LEARN • GROW</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-footer">
          <div className="footer-quote">
            <i className="bi bi-quote"></i>
            <span>Code with purpose. Build with passion.</span>
          </div>
          <div className="footer-cta">
            <span>Let's connect and build something amazing together!</span>
            <i className="bi bi-handshake"></i>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="skills-section">
        <div className="skills-header">
          <h2 className="skills-title">My Skills</h2>
          <div className="skills-underline"></div>
        </div>

        <div className="skills-grid">
          {/* Backend Development */}
          <div className="skill-category-card">
            <div className="skill-category-header">
              <div className="skill-icon backend">
                <i className="bi bi-code-slash"></i>
              </div>
              <h3 className="skill-category-title">Backend Development</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">C#</span>
              <span className="skill-tag">.NET Core</span>
              <span className="skill-tag">ASP.NET Core</span>
              <span className="skill-tag">Web API</span>
              <span className="skill-tag">REST APIs</span>
              <span className="skill-tag">Entity Framework Core</span>
              <span className="skill-tag">LINQ</span>
              <span className="skill-tag">ADO.NET</span>
            </div>
          </div>

          {/* Azure & DevOps */}
          <div className="skill-category-card">
            <div className="skill-category-header">
              <div className="skill-icon azure">
                <i className="bi bi-cloud"></i>
              </div>
              <h3 className="skill-category-title">Azure & DevOps</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">Azure DevOps</span>
              <span className="skill-tag">Azure Pipelines</span>
              <span className="skill-tag">App Service</span>
              <span className="skill-tag">Key Vault</span>
              <span className="skill-tag">Service Bus</span>
              <span className="skill-tag">Functions</span>
              <span className="skill-tag">Event Grid</span>
              <span className="skill-tag">AI Search</span>
              <span className="skill-tag">CI/CD</span>
            </div>
          </div>

          {/* Frontend Development */}
          <div className="skill-category-card">
            <div className="skill-category-header">
              <div className="skill-icon frontend">
                <FaReact className="react-icon" />
              </div>
              <h3 className="skill-category-title">Frontend Development</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">React.js</span>
              <span className="skill-tag">TypeScript</span>
              <span className="skill-tag">JavaScript (ES6+)</span>
              <span className="skill-tag">HTML5</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">Bootstrap</span>
              <span className="skill-tag">Tailwind CSS</span>
            </div>
          </div>

          {/* Architecture & Practices */}
          <div className="skill-category-card">
            <div className="skill-category-header">
              <div className="skill-icon architecture">
                <i className="bi bi-diagram-3"></i>
              </div>
              <h3 className="skill-category-title">Architecture & Practices</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">OOP</span>
              <span className="skill-tag">SOLID</span>
              <span className="skill-tag">Clean Architecture</span>
              <span className="skill-tag">MVC</span>
              <span className="skill-tag">JWT Authentication</span>
              <span className="skill-tag">REST Security</span>
              <span className="skill-tag">Agile Scrum</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">Postman</span>
              <span className="skill-tag">Unit Testing</span>
            </div>
          </div>

          {/* Database */}
          <div className="skill-category-card">
            <div className="skill-category-header">
              <div className="skill-icon database">
                <i className="bi bi-database"></i>
              </div>
              <h3 className="skill-category-title">Database</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">MS SQL Server</span>
              <span className="skill-tag">T-SQL</span>
              <span className="skill-tag">Stored Procedures</span>
              <span className="skill-tag">Triggers</span>
              <span className="skill-tag">Query Optimization</span>
              <span className="skill-tag">Indexing</span>
              <span className="skill-tag">Performance Tuning</span>
            </div>
          </div>

          {/* AI-Assisted Development */}
          <div className="skill-category-card">
            <div className="skill-category-header">
              <div className="skill-icon ai">
                <i className="bi bi-robot"></i>
              </div>
              <h3 className="skill-category-title">AI-Assisted Development</h3>
            </div>
            <div className="skill-tags">
              <span className="skill-tag">GitHub Copilot</span>
              <span className="skill-tag">ChatGPT</span>
              <span className="skill-tag">Claude</span>
              <span className="skill-tag">Prompt Engineering</span>
              <span className="skill-tag">Workflow Automation</span>
              <span className="skill-tag">OpenCode</span>
              <span className="skill-tag">OpenAI API (Learning)</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section">
        <div className="projects-header">
          <div className="projects-header-content">
            <h1 className="projects-title">Featured Projects</h1>
            <p className="projects-subtitle">Some of the projects I've worked on.</p>
          </div>
          <a href="https://github.com/maddy-hub515" className="github-btn" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
            <span>View All on GitHub</span>
          </a>
        </div>

        <div className="projects-grid">
          {/* Project 1 */}
          <div className="project-card-new">
            <div className="project-card-image">
              <img src="/images/project-portfolio-img.jpg" alt="Portfolio Website" />
              <span className="project-badge personal">Personal</span>
            </div>
            <div className="project-card-content">
              <h3 className="project-card-title">Portfolio Website</h3>
              <p className="project-card-desc">My personal portfolio built with React and .NET Core API with contact form and email integration.</p>
              <div className="project-card-tags">
                <span className="project-tag">React</span>
                <span className="project-tag">.NET Core</span>
                <span className="project-tag">SMTP</span>
                <span className="project-tag">Netlify</span>
              </div>
            </div>
          </div>
          {/* Project 2 */}
          <div className="project-card-new">
            <div className="project-card-image">
              <img src="/images/project-ToolDesign-img.png" alt="Tool Design" />
              <span className="project-badge personal">Business</span>
            </div>
            <div className="project-card-content">
              <h3 className="project-card-title">Alpha Tool Tech Engineering</h3>
              <p className="project-card-desc">A professional website for Alpha Tool Tech Engineering, showcasing precision tooling, injection mold solutions, and industry expertise. Built with responsive design to deliver a seamless experience.</p>
              <div className="project-card-tags">
                <span className="project-tag">React</span>
                <span className="project-tag">.NET Core</span>
                <span className="project-tag">SMTP</span>
                <span className="project-tag">Netlify</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="projects-pagination">
          <span className="pagination-dot active"></span>
          <span className="pagination-dot"></span>
          <span className="pagination-dot"></span>
        </div>
      </section>

      {/* RESUME SECTION */}
      <section id="resume" className="resume-section">
        <div className="resume-header">
          <div className="resume-header-content">
            <h1 className="resume-title-main">Resume</h1>
            <p className="resume-subtitle">My professional journey and educational background.</p>
          </div>
          <a href="public/images/Madesh_Ram-Resume.pdf" className="download-resume-btn-top" download>
            <i className="bi bi-download"></i>
            <span>Download Resume</span>
          </a>
        </div>

        <div className="resume-container">
          {/* Left Column */}
          <div className="resume-left-column">
            {/* Experience Section */}
            <div className="resume-block">
              <div className="resume-block-header">
                <div className="resume-block-icon experience">
                  <i className="bi bi-briefcase"></i>
                </div>
                <h2 className="resume-block-title">Experience</h2>
              </div>
              <div className="resume-block-content">
                <div className="experience-item">
                  <h3 className="experience-role">Software Engineer II</h3>
                  <p className="experience-company">Logic Valley | June 2023 – Present</p>
                  <ul className="experience-list">
                    <li>Building and maintaining enterprise applications for debt collection, supporting 20+ client environments using C#, .NET Core, ASP.NET MVC, React.js, and MS SQL Server.</li>
                    <li>Developing REST APIs, business modules, and integrating Azure services.</li>
                    <li>Optimizing SQL server performance and ensuring data integrity.</li>
                    <li>Managing CI/CD pipelines using Azure DevOps.</li>
                    <li>Supporting production environments across 20+ client environments.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="resume-block">
              <div className="resume-block-header">
                <div className="resume-block-icon education">
                  <i className="bi bi-mortarboard"></i>
                </div>
                <h2 className="resume-block-title">Education</h2>
              </div>
              <div className="resume-block-content">
                <div className="education-item">
                  <h3 className="education-degree">Bachelor of Commerce (B.Com)</h3>
                  <p className="education-college">Sri Vani Vidyalaya/Vidhyaa Arts and Science College</p>
                  <p className="education-period">2019 – 2022 | 84%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="resume-right-column">
            {/* Professional Summary */}
            <div className="resume-block">
              <div className="resume-block-header">
                <div className="resume-block-icon summary">
                  <i className="bi bi-person-badge"></i>
                </div>
                <h2 className="resume-block-title">Professional Summary</h2>
              </div>
              <div className="resume-block-content">
                <p className="summary-text">
                  Software Engineer with 3+ years of experience building enterprise applications. Skilled in scalable solutions using C#, .NET Core, ASP.NET MVC, React.js, and MS SQL Server. Experienced in designing secure REST APIs, optimizing SQL performance, and deploying cloud-based solutions on Azure. Passionate about leveraging AI coding assistants (GitHub Copilot, ChatGPT) to accelerate development without compromising quality.
                </p>
              </div>
            </div>

            {/* Core Strengths */}
            <div className="resume-block">
              <div className="resume-block-header">
                <div className="resume-block-icon strengths">
                  <i className="bi bi-star"></i>
                </div>
                <h2 className="resume-block-title">Core Strengths</h2>
              </div>
              <div className="resume-block-content">
                <ul className="strengths-list">
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Problem Solving & Analytical Thinking</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Clean Code & Readable Architecture</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Performance Optimization</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Team Collaboration & Communication</span>
                  </li>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Continuous Learning & Adaptability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section">
        <div className="contact-bg-overlay"></div>
        
        <div className="contact-container">
          {/* Left Column - Contact Info */}
          <div className="contact-info">
            <h2 className="contact-title">Let's Connect</h2>
            <div className="contact-title-underline"></div>
            <p className="contact-subtitle">
              I'm open to discussing new opportunities, interesting projects, or just having a friendly chat about technology.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-envelope"></i>
                </div>
                <div className="contact-item-content">
                  <span className="contact-item-label">Email</span>
                  <span className="contact-item-value">maddymaddy2679@gmail.com</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-telephone"></i>
                </div>
                <div className="contact-item-content">
                  <span className="contact-item-label">Phone</span>
                  <span className="contact-item-value">+91 6374407398</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-geo-alt"></i>
                </div>
                <div className="contact-item-content">
                  <span className="contact-item-label">Location</span>
                  <span className="contact-item-value">Chennai, Tamil Nadu, India</span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-linkedin"></i>
                </div>
                <div className="contact-item-content">
                  <span className="contact-item-label">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/madesh-ram-8b2b72218" target="_blank" rel="noopener noreferrer" className="contact-item-value contact-link">linkedin.com/in/madesh-ram</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <i className="bi bi-github"></i>
                </div>
                <div className="contact-item-content">
                  <span className="contact-item-label">GitHub</span>
                  <a href="https://github.com/maddy-hub515" target="_blank" rel="noopener noreferrer" className="contact-item-value contact-link">github.com/madeshram66</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="contact-form-wrapper">
            {alert.message && (
              <div className={`contact-alert ${alert.type}`} onClick={() => setAlert({ type: '', message: '' })}>
                <span>{alert.message}</span>
                <i className="bi bi-x"></i>
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Your Name" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Your Email" 
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="Subject" 
                  required 
                />
              </div>
              <div className="form-group">
                <textarea 
                  name="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Your Message" 
                  required
                ></textarea>
              </div>
              <button type="submit" className="send-btn" disabled={isSubmitting}>
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <i className="bi bi-send"></i>
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Portfolio

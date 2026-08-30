import { useState, useEffect, useCallback } from 'react'
import { FaReact } from "react-icons/fa";
import { useReducedMotion, useInView, useCountUp, RevealSection } from '../hooks/useAnimations'

const featuredProjects = [
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    category: 'Personal',
    image: '/images/project-portfolio-img.jpeg',
    description: 'My personal portfolio built with React and .NET Core API with contact form and email integration.',
    technologies: ['React', '.NET Core', 'SMTP', 'Netlify'],
    liveUrl: 'https://maddys-portfolio.netlify.app/',
    githubUrl: 'https://github.com/maddy-hub515/Portfolio.Web',
  },
  {
    id: 'alpha-tool',
    title: 'Alpha Tool Tech Engineering',
    category: 'Business',
    image: '/images/project-ToolDesign-img.jpeg',
    description: 'A professional website for Alpha Tool Tech Engineering, showcasing precision tooling, injection mold solutions, and industry expertise. Built with responsive design to deliver a seamless experience.',
    technologies: ['React', '.NET Core', 'SMTP', 'Netlify'],
    liveUrl: 'https://alphatooltech.netlify.app/',
    githubUrl: 'https://github.com/maddy-hub515/JR.ToolDesign.Web',
  },
  {
    id: 'Daily-Expense-Tracker',
    title: 'Daily Expense Tracker',
    category: 'PERSONAL',
    image: '/images/project-Daily-Expense-Tracker-img.jpeg',
    description: 'A Python automation tool that monitors Gmail for HDFC Bank transaction notifications, parses debit details, and sends a clean daily expense summary via email. Scheduled to run automatically using GitHub Actions.',
    technologies: ['Python', 'IMAP', 'SMTP', 'BeautifulSoup','GitHub Actions'],
    liveUrl: null,
    githubUrl: 'https://github.com/maddy-hub515/Daily-Expense-Tracker',
  }
]

const currentlyBuildingProjects = [
  {
    id: 'ai-sdlc',
    title: 'AI SDLC Agent',
    category: 'AI / Software Engineering',
    status: 'In Development',
    description: 'An AI-powered SDLC agent designed to automate software development workflows from requirement analysis through testing and deployment.',
    technologies: ['AI Agents', '.NET 8', 'C#', 'Azure DevOps', 'Git', 'LLM', 'CI/CD', 'Testing'],
    liveUrl: null,
    githubUrl: null,
    details: {
      capabilities: [
        'Requirement analysis',
        'Acceptance criteria generation',
        'Dependency identification',
        'Repository understanding',
        'Codebase analysis',
        'Implementation planning',
        'Git branch creation',
        'AI-assisted code generation',
        'Test generation',
        'Automated test execution',
        'Failure diagnosis',
        'Self-healing development loop',
        'Pull request generation',
        'CI/CD integration',
        'Deployment automation',
        'Deployment validation',
        'Human approval gates',
      ],
      architecture: [
        'Requirement',
        'AI Orchestrator',
        'Requirement Analyzer',
        'Azure DevOps',
        'Repository Analyzer',
        'Implementation Planner',
        'Code Agent',
        'Test Agent',
        'Test Execution',
        'Failure Analyzer',
        'Code Fix',
        'Retest',
        'Pull Request',
        'CI/CD',
        'Deployment',
      ],
      description: 'The agent is being designed to process software requirements, generate Azure DevOps user stories and tasks, analyze the existing repository, understand the relevant codebase, create development branches, generate an implementation plan, implement code changes, generate and execute tests, analyze failures, iteratively modify the code, and prepare the solution for CI/CD deployment.',
    },
  },
  {
    id: 'ai-knowledge',
    title: 'Private AI Knowledge Assistant',
    category: 'AI / RAG',
    status: 'In Development',
    description: 'A private AI knowledge assistant that allows users to upload their own documents and datasets and interact with their information through natural-language conversations.',
    technologies: ['LLM', 'RAG', 'Embeddings', '.NET', 'React', 'Vector Search', 'AI'],
    liveUrl: null,
    githubUrl: null,
    details: {
      capabilities: [
        'Document upload',
        'PDF processing',
        'TXT processing',
        'CSV / JSON data ingestion',
        'Text extraction',
        'Text chunking',
        'Embeddings',
        'Vector search',
        'Retrieval-Augmented Generation (RAG)',
        'Conversational chat',
        'Conversation history',
        'Source citations',
        'Multiple knowledge bases',
        'Document management',
        'Semantic search',
        'Context-aware answers',
        'Model selection',
        'Chat sessions',
        'Data isolation',
      ],
      architecture: [
        'Documents',
        'Ingestion',
        'Text Extraction',
        'Chunking',
        'Embeddings',
        'Vector Store',
        'Retriever',
        'Relevant Context',
        'LLM',
        'Answer + Sources',
      ],
      description: 'The system is being designed to process uploaded data, extract and chunk content, generate embeddings, store searchable representations, retrieve relevant context, and use an LLM to generate contextual responses based on the user\'s own knowledge base.',
    },
  },
  {
    id: 'youtube-agent',
    title: 'YouTube AI Content Agent',
    category: 'AI / Automation',
    status: 'In Development',
    description: 'An AI-powered content automation agent designed to streamline the end-to-end YouTube publishing workflow, from content preparation and metadata generation to video and Shorts publishing.',
    technologies: ['AI', 'LLM', 'YouTube API', 'Automation', 'React', '.NET'],
    liveUrl: null,
    githubUrl: null,
    details: {
      capabilities: [
        'Content planning',
        'Script generation / assistance',
        'Title generation',
        'Description generation',
        'Tags and metadata generation',
        'Thumbnail and asset management',
        'Video processing',
        'Shorts preparation',
        'YouTube upload automation',
        'Scheduled publishing',
        'Playlist management',
        'Publishing status tracking',
        'Upload failure and retry handling',
        'Content history',
        'Analytics integration',
      ],
      architecture: [
        'Content Idea',
        'AI Content Planning',
        'Script / Metadata',
        'Video / Short Processing',
        'Thumbnail / Assets',
        'YouTube API',
        'Upload',
        'Schedule / Publish',
        'Status Tracking',
        'Analytics',
      ],
      description: 'The system is being designed to assist with content planning, script preparation, title and description generation, thumbnail and asset management, video processing, YouTube uploads, scheduled publishing, publishing status tracking, and post-publishing workflows.',
    },
  },
  {
    id: 'careerflow-agent',
    title: 'AI CareerFlow Agent',
    category: 'AI / Automation',
    status: 'In Development',
    description: 'An AI-powered job discovery and career automation platform designed to streamline the job search workflow, from multi-portal job discovery and intelligent job matching to application tracking and personalized job recommendations.',
    technologies: [
      'AI',
      '.NET',
      'C#',
      'ASP.NET Core',
      'Worker Service',
      'Playwright',
      'SQL Server',
      'EF Core',
      'Automation',
      'Naukri',
      'LinkedIn',
      'Indeed',
    ],
    liveUrl: null,
    githubUrl: null,
    details: {
      capabilities: [
      'Multi-portal job discovery',
      'Job search and filtering',
      'Job deduplication',
      'Job description extraction',
      'Skill and keyword matching',
      'Job relevance scoring',
      'Personalized job recommendations',
      'Job application tracking',
      'Application status management',
      'Resume management',
      'Job search history',
      'Scheduled job discovery',
      'Email notifications',
      'Background job processing',
      'Portal integration architecture',
      ],
      architecture: [
        'Job Search Configuration',
        'Multi-Portal Job Discovery',
        'Job Data Extraction',
        'Job Filtering & Deduplication',
        'AI Skill & Relevance Matching',
        'Job Scoring & Recommendations',
        'Job Storage & Search History',
        'Application Tracking',
        'Scheduled Job Discovery',
        'Email Notifications',
      ],
      description: 'The system is designed to automate and streamline the job search process across multiple job portals, including job discovery, filtering, deduplication, skill matching, relevance scoring, personalized recommendations, application tracking, resume management, scheduled job searches, and email notifications.',
    },
  }
]

function ProjectStatusBadge({ status }) {
  return (
    <span className="project-status-badge">
      <span className="status-dot"></span>
      {status}
    </span>
  )
}

function ProjectActions({ liveUrl, githubUrl }) {
  const hasLive = !!liveUrl
  const hasGithub = !!githubUrl

  if (!hasLive && !hasGithub) return null

  return (
    <div className="project-card-actions">
      {hasLive && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-action-btn project-action-live"
          aria-label="View Live Demo"
        >
          <i className="bi bi-box-arrow-up-right"></i>
          <span>Live Demo</span>
        </a>
      )}
      {hasGithub && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-action-btn project-action-github"
          aria-label="View on GitHub"
        >
          <i className="bi bi-github"></i>
          <span>GitHub</span>
        </a>
      )}
    </div>
  )
}

function ImageOverlay({ liveUrl }) {
  if (!liveUrl) return null

  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="project-image-overlay"
      aria-label="View Live Site"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="overlay-content">
        <i className="bi bi-box-arrow-up-right"></i>
        <span>View Live Site</span>
      </div>
    </a>
  )
}

function ArchitectureFlow({ steps }) {
  return (
    <div className="architecture-flow">
      {steps.map((step, index) => (
        <div key={index} className="architecture-step-wrapper">
          <div className="architecture-step">
            <span className="step-number">{index + 1}</span>
            <span className="step-label">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="architecture-arrow">
              <i className="bi bi-arrow-down"></i>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ProjectDetailsModal({ project, onClose }) {
  const prefersReducedMotion = useReducedMotion()

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  if (!project) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="project-modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className={`project-modal ${prefersReducedMotion ? '' : 'modal-animate'}`}>
        <div className="modal-header">
          <div className="modal-header-info">
            <h2 className="modal-title">{project.title}</h2>
            <div className="modal-meta">
              <span className="modal-category">{project.category}</span>
              <ProjectStatusBadge status={project.status} />
            </div>
          </div>
          <button
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-section">
            <h3 className="modal-section-title">
              <i className="bi bi-info-circle"></i>
              Overview
            </h3>
            <p className="modal-description">{project.details.description}</p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">
              <i className="bi bi-diagram-3"></i>
              Architecture
            </h3>
            <ArchitectureFlow steps={project.details.architecture} />
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">
              <i className="bi bi-check2-square"></i>
              Key Capabilities
            </h3>
            <div className="capabilities-grid">
              {project.details.capabilities.map((cap, index) => (
                <div key={index} className="capability-item">
                  <i className="bi bi-check2"></i>
                  <span>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">
              <i className="bi bi-stack"></i>
              Technology Stack
            </h3>
            <div className="modal-tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="modal-tech-tag">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeaturedProjectCard({ project, prefersReducedMotion }) {
  return (
    <div className="project-card-new">
      <div className="project-card-image">
        <img src={project.image} alt={project.title} />
        <span className={`project-badge ${project.category.toLowerCase() === 'personal' ? 'personal' : 'internal'}`}>
          {project.category}
        </span>
        <ImageOverlay liveUrl={project.liveUrl} />
      </div>
      <div className="project-card-content">
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="project-tag">{tech}</span>
          ))}
        </div>
        <ProjectActions liveUrl={project.liveUrl} githubUrl={project.githubUrl} />
      </div>
    </div>
  )
}

function BuildingProjectCard({ project, prefersReducedMotion, onViewDetails }) {
  return (
    <div className={`project-card-new building-card ${project.id === 'ai-sdlc' ? 'building-card-featured' : ''}`}>
      <div className="project-card-image">
        <div className="building-card-visual">
          <div className="building-visual-icon">
            <i className="bi bi-robot"></i>
          </div>
          <div className="building-visual-pattern"></div>
        </div>
        <ProjectStatusBadge status={project.status} />
      </div>
      <div className="project-card-content">
        <span className="building-category-label">{project.category}</span>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>
        <div className="project-card-tags">
          {project.technologies.map((tech, index) => (
            <span key={index} className="project-tag">{tech}</span>
          ))}
        </div>
        <div className="project-card-actions">
          <button
            className="project-action-btn project-action-details"
            onClick={() => onViewDetails(project)}
            aria-label={`View ${project.title} architecture`}
          >
            <i className="bi bi-diagram-3"></i>
            <span>Architecture</span>
          </button>
          <span className="coming-soon-label">
            <i className="bi bi-github"></i>
            <span>Coming Soon</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, value, suffix, label, desc, animate, prefersReducedMotion }) {
  const count = useCountUp(value, 2000, animate && !prefersReducedMotion)

  return (
    <div className="stat-card">
      <div className="stat-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <div className="stat-content">
        <h4 className="stat-number">{prefersReducedMotion ? value : count}{suffix}</h4>
        <p className="stat-label">{label}</p>
        <p className="stat-desc">{desc}</p>
      </div>
    </div>
  )
}

function Portfolio() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [alert, setAlert] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true })
  const [selectedProject, setSelectedProject] = useState(null)
  const [buildingSectionRef, buildingInView] = useInView({ threshold: 0.1, triggerOnce: true })

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

        {/* Background Ambient Glow */}
        <div className="hero-ambient-glow glow-1"></div>
        <div className="hero-ambient-glow glow-2"></div>

        {/* Floating Code Lines */}
        <div className="hero-code-particles">
          {!prefersReducedMotion && (
            <>
              <div className="code-line" style={{ left: '8%', width: '60px', animationDuration: '18s', animationDelay: '0s' }}></div>
              <div className="code-line" style={{ left: '22%', width: '90px', animationDuration: '22s', animationDelay: '-3s' }}></div>
              <div className="code-line" style={{ left: '45%', width: '45px', animationDuration: '20s', animationDelay: '-7s' }}></div>
              <div className="code-line" style={{ left: '68%', width: '75px', animationDuration: '25s', animationDelay: '-5s' }}></div>
              <div className="code-line" style={{ left: '85%', width: '55px', animationDuration: '19s', animationDelay: '-10s' }}></div>
              <div className="code-line" style={{ left: '35%', width: '40px', animationDuration: '23s', animationDelay: '-12s' }}></div>
              <div className="code-line" style={{ left: '55%', width: '65px', animationDuration: '21s', animationDelay: '-8s' }}></div>
              <div className="code-line" style={{ left: '75%', width: '50px', animationDuration: '17s', animationDelay: '-2s' }}></div>
            </>
          )}
        </div>

        <div className="hero-content">
          <div className={`greeting-badge ${prefersReducedMotion ? '' : 'hero-animate hero-animate-1'}`}>
            <span>Hi, I'm</span>
            <span className="wave-emoji">👋</span>
          </div>
          <h1 className={`hero-name ${prefersReducedMotion ? '' : 'hero-animate hero-animate-2'}`}>Madesh Ram</h1>
          <h2 className={`hero-title ${prefersReducedMotion ? '' : 'hero-animate hero-animate-3'}`}>Software Engineer</h2>
          <h3 className={`hero-subtitle ${prefersReducedMotion ? '' : 'hero-animate hero-animate-4'}`}>.NET Full-Stack Developer</h3>
          <p className={`hero-description ${prefersReducedMotion ? '' : 'hero-animate hero-animate-5'}`}>
            I build scalable and secure web applications using C#, .NET Core, ASP.NET, React, SQL Server, and Azure. Turning ideas into real-world solutions.
          </p>
          <div className={`hero-buttons ${prefersReducedMotion ? '' : 'hero-animate hero-animate-6'}`}>
            <a href="#projects" className="btn-primary-custom">
              <i className="bi bi-box-arrow-up-right"></i>
              <span>View My Work</span>
            </a>
            <a href="public/images/Madesh_Ram-Resume.pdf" className="btn-outline-custom" download>
              <i className="bi bi-download"></i>
              <span>Download Resume</span>
            </a>
          </div>
          <div className={`tech-stack ${prefersReducedMotion ? '' : 'hero-animate hero-animate-7'}`}>
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
        <div className="hero-stats" ref={statsRef}>
          <StatCard
            icon="bi-calendar-check"
            value={3}
            suffix="+"
            label="Years Experience"
            desc="Building enterprise solutions"
            animate={statsInView}
            prefersReducedMotion={prefersReducedMotion}
          />
          <StatCard
            icon="bi-people"
            value={10}
            suffix="K+"
            label="Users Impacted"
            desc="Applications used by thousands"
            animate={statsInView}
            prefersReducedMotion={prefersReducedMotion}
          />
          <StatCard
            icon="bi-globe"
            value={20}
            suffix="+"
            label="Client Environments"
            desc="Delivered solutions across industries"
            animate={statsInView}
            prefersReducedMotion={prefersReducedMotion}
          />
          <StatCard
            icon="bi-graph-up-arrow"
            value={60}
            suffix="%"
            label="Query Performance Improvement"
            desc="Through optimization and best practices"
            animate={statsInView}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <RevealSection>
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
              <img src="/images/Madesh_about_img.jpg" alt="Madesh Ram" className="about-profile-img" />
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
      </RevealSection>

      {/* SKILLS SECTION */}
      <RevealSection>
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
      </RevealSection>

      {/* PROJECTS SECTION */}
      <RevealSection>
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
          {featuredProjects.map((project) => (
            <FeaturedProjectCard
              key={project.id}
              project={project}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </section>
      </RevealSection>

      {/* CURRENTLY BUILDING SECTION */}
      <RevealSection>
      <section id="building" className="building-section">
        <div className="building-header">
          <div className="building-header-content">
            <div className="building-title-row">
              <h1 className="building-title">Currently Building</h1>
              <span className="active-dev-badge">
                <span className="active-dev-dot"></span>
                Active Development
              </span>
            </div>
            <p className="building-subtitle">AI-powered systems I'm actively designing and developing.</p>
          </div>
        </div>

        <div
          className={`projects-grid building-grid ${buildingInView ? 'building-visible' : ''} ${prefersReducedMotion ? 'reduced-motion' : ''}`}
          ref={buildingSectionRef}
        >
          {currentlyBuildingProjects.map((project, index) => (
            <div
              key={project.id}
              className="building-card-wrapper"
              style={{ transitionDelay: prefersReducedMotion ? '0s' : `${index * 0.15}s` }}
            >
              <BuildingProjectCard
                project={project}
                prefersReducedMotion={prefersReducedMotion}
                onViewDetails={setSelectedProject}
              />
            </div>
          ))}
        </div>
      </section>
      </RevealSection>

      {/* RESUME SECTION */}
      <RevealSection>
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
      </RevealSection>

      {/* CONTACT SECTION */}
      <RevealSection>
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
      </RevealSection>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <ProjectDetailsModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}

export default Portfolio
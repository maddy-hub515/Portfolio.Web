import { useState, useEffect, useRef } from 'react'

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
      const response = await fetch('https://localhost:7059/api/contact', {
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
      <section id="home" className="hero-section text-white d-flex flex-column justify-content-center align-items-start">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="display-3 fw-bold">Madesh Ram</h1>
          <p className="fs-3">I'm a Full Stack Developer</p>
          <a href="#about" className="btn btn-primary btn-lg mt-3">Know More</a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section p-4">
        <h1 className="section-title mb-4">About</h1>
        <p className="lead mb-5">
          As a passionate Full Stack Developer, I thrive on solving complex problems and delivering high-quality software solutions.
          I believe that taking responsibility and facing challenges head-on is the foundation of growth — both personally and professionally.
          With a strong desire to innovate and lead, I take pride in building scalable, efficient, and user-friendly applications.
        </p>
        <div className="d-flex flex-wrap align-items-start gap-4 about-profile">
          <div className="profile-img">
            <img src="/images/Madesh_about_img.JPG" alt="Profile Image" className="rounded shadow" />
          </div>
          <div className="profile-details">
            <h2 className="mb-3">Full Stack Developer</h2>
            <div className="row">
              <div className="col-md-6">
                <p><strong>Birthday:</strong> 11 November 2000</p>
                <p><strong>Age:</strong> 24</p>
                <p><strong>Degree:</strong> Bachelor</p>
                <p><strong>City:</strong> Chennai, Tamil Nadu</p>
              </div>
              <div className="col-md-6">
                <p><strong>Website:</strong> <a href="https://madeshram-portfolio.onrender.com" className="text-decoration-none">www.example.com</a></p>
                <p><strong>Freelance:</strong> Available</p>
                <p><strong>Email:</strong> <a href="mailto:madeshram66@gmail.com" className="text-decoration-none">madeshram66@gmail.com</a></p>
                <p><strong>Phone:</strong> +91 6374407398</p>
              </div>
            </div>
            <p className="mt-3">
              I'm a Full Stack Developer from Chennai with 2+ years of experience in building responsive web applications using
              HTML, CSS, JavaScript, .NET Core, and ASP.NET MVC. I focus on clean code, scalable architecture, and continuous learning.
            </p>
          </div>
        </div>

        <div className="stats-section d-flex justify-content-between flex-wrap mt-5" ref={countersRef}>
          <div className="text-center">
            <h2><i className="bi bi-emoji-smile text-primary"></i> <span className="counter" data-target="01">0</span></h2>
            <p><strong>Happy Clients</strong><br />Satisfied Clients</p>
          </div>
          <div className="text-center">
            <h2><i className="bi bi-file-earmark-richtext text-primary"></i> <span className="counter" data-target="02">0</span></h2>
            <p><strong>Projects</strong><br />Completed Projects</p>
          </div>
          <div className="text-center">
            <h2><i className="bi bi-people text-primary"></i> <span className="counter" data-target="01">0</span></h2>
            <p><strong>Hard Workers</strong><br />Dedicated Team</p>
          </div>
          <div className="text-center">
            <h2><i className="bi bi-headset text-primary"></i> <span className="counter" data-target="70">0</span></h2>
            <p><strong>Hours Of Support</strong><br />Ongoing Support</p>
          </div>
        </div>

        <div className="skills-section mt-5" ref={progressBarsRef}>
          <h3 className="section-title mb-4">Skills</h3>
          <div className="row">
            <div className="col-md-6 mb-3"><p><strong>HTML</strong> <span className="float-end">50%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="50" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>JavaScript</strong> <span className="float-end">50%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="50" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>CSS</strong> <span className="float-end">50%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="50" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>C#</strong> <span className="float-end">50%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="50" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>.NET Core</strong> <span className="float-end">60%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="60" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>Web API</strong> <span className="float-end">70%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="70" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>ASP.NET MVC</strong> <span className="float-end">70%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="70" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>Entity Framework</strong> <span className="float-end">60%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="60" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>ADO.Net</strong> <span className="float-end">60%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="60" style={{ width: '0' }}></div></div></div>
            <div className="col-md-6 mb-3"><p><strong>MS-SQL Server</strong> <span className="float-end">70%</span></p><div className="progress"><div className="progress-bar bg-primary" data-progress="70" style={{ width: '0' }}></div></div></div>
          </div>
        </div>
      </section>

      {/* RESUME SECTION */}
      <section id="resume" className="resume-section p-4">
        <h1 className="section-title mb-4">Resume</h1>
        <p className="lead mb-5">
          Dedicated Software Engineer with a strong passion for building scalable and efficient applications.
          With expertise in .NET, SQL, and modern web technologies, I deliver high-quality solutions that drive business success.
        </p>
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="resume-item mb-4">
                <h3 className="resume-title">Summary</h3>
                <p><strong>MADESH RAM</strong></p>
                <p><em>Dedicated Software Engineer with 2+ years of experience in the debt collection sector. Skilled in ASP.NET, .NET Core, Web API, MS-SQL Server, and front-end technologies.</em></p>
                <ul className="resume-list">
                  <li>9/13 Bhavani Flats, Nanmangalam, Chennai - 600119</li>
                  <li>+91 6374407398</li>
                  <li>madeshram66@gmail.com</li>
                </ul>
              </div>
              <div className="resume-item">
                <h3 className="resume-title">Education</h3>
                <p><strong>Bachelor of Commerce</strong></p>
                <p className="text-muted">2019 - 2022</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="resume-item">
                <h3 className="resume-title">Professional Experience</h3>
                <p><strong>DOTNET DEVELOPER</strong></p>
                <p className="text-muted">Logic Valley | June 2023 – Present</p>
                <ul className="resume-list">
                  <li>Designed and developed user-friendly applications using ASP.NET, HTML, and JavaScript.</li>
                  <li>Implemented secure and scalable back-end services using .NET Core and Web API.</li>
                  <li>Managed and optimized MS-SQL Server databases for high performance and data integrity.</li>
                  <li>Automated manual processes through Windows Services, improving operational efficiency.</li>
                  <li>Collaborated in Agile teams to gather requirements and deliver business-driven solutions.</li>
                  <li>Utilized Azure DevOps for version control, sprint planning, and task management.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="projects-section p-4">
        <h1 className="section-title mb-4">Projects</h1>
        <p className="lead mb-5">
          A showcase of my recent work, featuring web applications, mobile apps, and product branding projects.
        </p>
        <div className="filter-menu mb-4 text-center">
          {['all', 'web', 'mobile', 'branding'].map(filter => (
            <button key={filter} className={`btn btn-outline-primary ${activeFilter === filter ? 'active' : ''}`} onClick={() => setActiveFilter(filter)}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <div className="container">
          <div className="row g-4">
            {filteredProjects.map(project => (
              <div key={project.id} className="col-md-6 col-lg-4 project-item fade-in">
                <div className="project-card shadow-sm">
                  <div className="project-img">
                    <img src={project.image} alt={project.title} className="img-fluid" />
                    <div className="project-overlay">
                      <button className="btn btn-light btn-sm" onClick={() => setSelectedProject(project.id)}>View Details</button>
                    </div>
                  </div>
                  <h4 className="mt-3">{project.title}</h4>
                  <p className="text-muted">{project.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedProject && (() => {
          const project = projects.find(p => p.id === selectedProject)
          if (!project) return null
          return (
            <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setSelectedProject(null)}>
              <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
                <div className="modal-content p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3>{project.title}</h3>
                    <button type="button" className="btn-close" onClick={() => setSelectedProject(null)}></button>
                  </div>
                  <img src={project.image} className="img-fluid rounded mb-3" alt={project.title} />
                  <p><strong>Project Description:</strong> {project.description}</p>
                  <p><strong>{project.linkText}:</strong> <a href={project.link} target="_blank" rel="noopener noreferrer">{project.linkText}</a></p>
                </div>
              </div>
            </div>
          )
        })()}
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="contact-section p-4">
        <div className="container py-3">
          <h1 className="text-center fw-bold mb-4 position-relative" style={{ paddingBottom: '10px' }}>
            Contact Me
            <span style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '60px', height: '3px', backgroundColor: '#007bff' }}></span>
          </h1>
          <p className="text-center text-muted mb-5" style={{ maxWidth: '700px', margin: '0 auto' }}>
            I'd love to hear from you! Whether you have a question, a project in mind, or just want to connect, feel free to reach out.
          </p>
          {alert.message && (
            <div className={`alert alert-${alert.type} alert-dismissible fade show text-center w-75 mx-auto mb-4`} role="alert">
              {alert.message}
              <button type="button" className="btn-close" onClick={() => setAlert({ type: '', message: '' })}></button>
            </div>
          )}
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt-fill text-primary fs-2 me-3"></i>
                  <div><h5 className="fw-bold mb-1">Address</h5><p className="mb-0 text-muted">9/13 Maniyammai Street, Chennai, 600117</p></div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-telephone-fill text-primary fs-2 me-3"></i>
                  <div><h5 className="fw-bold mb-1">Call Me</h5><p className="mb-0 text-muted">+91 63744 07398</p></div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope-fill text-primary fs-2 me-3"></i>
                  <div><h5 className="fw-bold mb-1">Email Me</h5><p className="mb-0 text-muted">madeshram66@gmail.com</p></div>
                </div>
                <div className="rounded shadow-sm overflow-hidden mt-4">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8434782316527!2d-74.01007368459199!3d40.71158227933151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a20b6c0b7df%3A0x1a0e0db2b6e6e8b8!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1616585637997!5m2!1sen!2sus" width="100%" height="250" style={{ border: 0 }} allowFullScreen loading="lazy" title="Google Map"></iframe>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="p-4 shadow-lg rounded bg-white">
                <h4 className="fw-bold mb-3">Send Me a Message</h4>
                <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Your Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Your Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Subject</label>
                    <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} placeholder="Enter subject" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Message</label>
                    <textarea className="form-control" rows="6" name="message" value={formData.message} onChange={handleChange} placeholder="Type your message" required></textarea>
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm" disabled={isSubmitting}>
                      <i className="bi bi-send-fill me-2"></i>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Portfolio

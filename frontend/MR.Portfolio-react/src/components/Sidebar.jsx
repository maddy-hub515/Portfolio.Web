function Sidebar({ activeSection, onNavigate }) {
  const navItems = [
    { id: 'home', icon: 'bi-house', label: 'Home' },
    { id: 'about', icon: 'bi-person', label: 'About' },
    { id: 'skills', icon: 'bi-code-slash', label: 'Skills' },
    { id: 'projects', icon: 'bi-briefcase', label: 'Projects' },
    { id: 'resume', icon: 'bi-file-earmark-text', label: 'Resume' },
    { id: 'contact', icon: 'bi-envelope', label: 'Contact' }
  ]

  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate(id)
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-inner">
        <div className="sidebar-profile">
          <div className="profile-img-wrapper">
            <img
              src="/images/Madesh_sidebar_img.JPG"
              className="profile-img"
              alt="Madesh Ram"
            />
            <span className="online-dot"></span>
          </div>
          <h2 className="profile-name">Madesh Ram</h2>
          <p className="profile-title">Software Engineer</p>
        </div>

        <div className="social-icons">
          <a href="https://x.com/AiMadesh7584" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="https://www.facebook.com/share/1AThUPUJue/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="https://www.instagram.com/madeshram5" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/in/madesh-ram-8b2b72218" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://github.com/maddy-hub515/" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
          </a>
        </div>

        <div className="sidebar-divider"></div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <a
                  href={`#${item.id}`}
                  className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={(e) => handleClick(e, item.id)}
                >
                  <i className={`bi ${item.icon}`}></i>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-divider"></div>

        <a href="/resume.pdf" className="download-resume-btn" download>
          <i className="bi bi-download"></i>
          <span>Download Resume</span>
        </a>
      </div>
    </aside>
  )
}

export default Sidebar

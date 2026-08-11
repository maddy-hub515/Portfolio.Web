function Sidebar({ activeSection, onNavigate }) {
  const navItems = [
    { id: 'home', icon: 'bi-house', label: 'Home' },
    { id: 'about', icon: 'bi-person', label: 'About' },
    { id: 'resume', icon: 'bi-file-earmark-text', label: 'Resume' },
    { id: 'projects', icon: 'bi-briefcase', label: 'Projects' },
    { id: 'contact', icon: 'bi-envelope', label: 'Contact' }
  ]

  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate(id)
  }

  return (
    <div className="sidebar bg-dark text-white d-flex flex-column align-items-center p-4">
      <div className="text-center mb-1">
        <img 
          src="/images/Madesh_sidebar_img.JPG" 
          className="rounded-circle mb-3" 
          alt="User Photo" 
          width="120" 
          height="120" 
          style={{ border: '5px solid #444' }}
        />
        <h4 className="fw-bold">Madesh Ram</h4>
        <p className="text-muted small">Full Stack Developer</p>
      </div>

      <div className="d-flex justify-content-center gap-2 mb-4">
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

      <ul className="nav flex-column w-100">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item mb-3">
            <a 
              href={`#${item.id}`} 
              className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => handleClick(e, item.id)}
            >
              <i className={`bi ${item.icon}`}></i><span> {item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar

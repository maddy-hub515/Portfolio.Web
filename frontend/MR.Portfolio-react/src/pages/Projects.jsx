/*
  Projects.jsx - Projects Page Component
  =======================================
  WHY: Converted from Project.cshtml + script.js.
  
  Key React concepts:
  1. useState - Manages data that changes (like filter state and modal state)
  2. Conditional rendering - Shows/hides elements based on state
  3. Array.map() - Renders lists of items (like foreach in C#)
  4. Array.filter() - Filters data before rendering
  
  In ASP.NET, you used jQuery for filtering:
    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        items.forEach(item => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "block";
          }
        });
      });
    })
  
  In React, we use state + conditional rendering.
  When state changes, React re-renders the component automatically.
*/
import { useState } from 'react'

function Projects() {
  /* 
    useState is React's way to manage data that changes.
    Syntax: const [value, setValue] = useState(initialValue)
    
    - activeFilter: stores which filter button is selected (like data-filter)
    - setActiveFilter: function to update the filter (triggers re-render)
    - selectedProject: stores which project modal is open (null = no modal)
    
    When you call setActiveFilter(), React re-renders the component
    with the new value, just like when TempData changes in ASP.NET.
  */
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)

  /* 
    Projects data - stored as array of objects.
    In ASP.NET, this was hardcoded HTML with different classes.
    In React, data-driven rendering is cleaner and easier to maintain.
    
    Each object has: id, title, category, image, description, link, linkText
    The "category" field matches your data-filter values (web, mobile, branding)
  */
  const projects = [
    {
      id: 1,
      title: 'Portfolio',
      category: 'web',
      image: '/images/project-portfolio-img.jpg',
      description: 'Designed and developed a responsive personal portfolio website to showcase projects, technical skills, and professional achievements. Implemented an interactive UI with smooth navigation and optimized loading performance.',
      link: 'https://madeshram-portfolio.onrender.com',
      linkText: 'Live Demo'
    },
    {
      id: 2,
      title: 'SmartSolve AI',
      category: 'web',
      image: '/images/project-SmartSolveAI-img.jpg',
      description: 'Built a custom AI assistant capable of storing, retrieving, and summarizing solutions to organizational problems using a partial-knowledge PDF knowledge base. The system works entirely offline without paid APIs.',
      link: 'https://github.com/maddy-hub515/Smart-AI-Agent',
      linkText: 'GitHub'
    },
    {
      id: 3,
      title: 'E-Commerce Website',
      category: 'web',
      image: '/images/project-web-img.jpg',
      description: 'Full-stack e-commerce platform with product catalog, shopping cart, and secure checkout functionality.',
      link: '#',
      linkText: 'View Project'
    },
    {
      id: 4,
      title: 'Fitness Tracker App',
      category: 'mobile',
      image: '/images/project-mobile-app.jpg',
      description: 'Mobile application for tracking workouts, nutrition, and fitness goals with progress analytics.',
      link: '#',
      linkText: 'View Project'
    },
    {
      id: 5,
      title: 'CMS Platform',
      category: 'web',
      image: '/images/project-cms.jpg',
      description: 'Content management system for blog publishing with admin dashboard and user management.',
      link: '#',
      linkText: 'View Project'
    },
    {
      id: 6,
      title: 'Product Branding',
      category: 'branding',
      image: '/images/project-branding.jpg',
      description: 'Brand identity design for a tech startup including logo, color palette, and guidelines.',
      link: '#',
      linkText: 'View Project'
    },
    {
      id: 7,
      title: 'Admin Dashboard',
      category: 'web',
      image: '/images/project-dashboard.jpg',
      description: 'Admin panel for managing application data with charts, tables, and user roles.',
      link: '#',
      linkText: 'View Project'
    }
  ]

  /* 
    filteredProjects - filters projects based on active filter.
    
    In jQuery (ASP.NET):
      items.forEach(item => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        }
      })
    
    In React:
      projects.filter(p => activeFilter === 'all' || p.category === activeFilter)
    
    The .filter() method creates a new array with only matching items.
    This is more efficient than hiding/showing DOM elements.
  */
  const filteredProjects = projects.filter(
    project => activeFilter === 'all' || project.category === activeFilter
  )

  return (
    <div className="projects-section p-4">
      <h1 className="section-title mb-4">Projects</h1>
      <p className="lead mb-5">
        A showcase of my recent work, featuring web applications, mobile apps, and product branding projects.
      </p>

      {/* Filter Menu - same as ASP.NET but with onClick handlers */}
      <div className="filter-menu mb-4 text-center">
        {/* 
          Array.map() renders a button for each filter option.
          In ASP.NET, you had 4 hardcoded buttons.
          In React, we generate them from an array.
          
          className uses ternary operator:
          - If activeFilter === filter: add "active" class
          - Otherwise: no "active" class
          
          onClick={() => setActiveFilter(filter)} runs when button is clicked
        */}
        {['all', 'web', 'mobile', 'branding'].map(filter => (
          <button
            key={filter}
            className={`btn btn-outline-primary ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="container">
        <div className="row g-4">
          {/* 
            filteredProjects.map() - renders only filtered projects.
            In ASP.NET, all projects were rendered and jQuery hid/showed them.
            In React, we only render what's needed (more efficient).
            
            key={project.id} - React needs a unique key for each list item.
            Think of it like a primary key in a database.
            It helps React update the list efficiently.
          */}
          {filteredProjects.map(project => (
            <div key={project.id} className="col-md-6 col-lg-4 project-item fade-in">
              <div className="project-card shadow-sm">
                <div className="project-img">
                  <img src={project.image} alt={project.title} className="img-fluid" />
                  <div className="project-overlay">
                    {/* 
                      onClick opens the modal by setting selectedProject.
                      In ASP.NET: data-bs-toggle="modal" href="#project1"
                      In React: onClick={() => setSelectedProject(project.id)}
                      
                      This is event handling in React - onClick is a prop
                      that takes a function to call when clicked.
                    */}
                    <button 
                      className="btn btn-light btn-sm"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <h4 className="mt-3">{project.title}</h4>
                <p className="text-muted">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        Modal - conditionally rendered based on selectedProject.
        In ASP.NET: multiple modals were always in DOM, toggled with data-bs-toggle.
        In React: modal only renders when selectedProject is not null.
        
        {selectedProject && (...)} - JSX conditional rendering
        If selectedProject is null, nothing renders.
        If selectedProject has a value, the modal renders.
        
        (() => { ... })() - IIFE (Immediately Invoked Function Expression)
        Used to run logic inside JSX curly braces.
      */}
      {selectedProject && (() => {
        /* Find the selected project from the projects array */
        const project = projects.find(p => p.id === selectedProject)
        if (!project) return null
        
        return (
          <div 
            className="modal fade show d-block" 
            tabIndex="-1" 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSelectedProject(null)}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered" onClick={e => e.stopPropagation()}>
              <div className="modal-content p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3>{project.title}</h3>
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setSelectedProject(null)}
                  ></button>
                </div>
                <img src={project.image} className="img-fluid rounded mb-3" alt={project.title} />
                <p><strong>Project Description:</strong> {project.description}</p>
                <p>
                  <strong>{project.linkText}:</strong>{' '}
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    {project.linkText}
                  </a>
                </p>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

export default Projects

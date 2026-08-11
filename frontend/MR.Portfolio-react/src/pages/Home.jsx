/*
  Home.jsx - Home/Hero Page Component
  ====================================
  WHY: Converted from Index.cshtml (your Home page).
  
  Key React concepts:
  1. Link component - Replaces <a href="@Url.Action("About", "Home")">
     - "to" prop tells React Router where to navigate
     - No page reload - React updates the URL and renders the new component
  
  2. className instead of class - "class" is a reserved word in JavaScript
     - In JSX, use className for HTML class attribute
  
  3. JSX allows inline styles as objects:
     - style={{ color: 'red' }} instead of style="color: red"
     - This is because JSX is JavaScript, not HTML
*/
import { Link } from 'react-router-dom'

function Home() {
  return (
    /* 
      className="content-wrapper" - same as ASP.NET's class="content-wrapper"
      In React, we use "className" instead of "class" because
      "class" is a reserved word in JavaScript.
    */
    <div className="content-wrapper">
      <div className="hero-section text-white d-flex flex-column justify-content-center align-items-start">
        {/* Dark overlay - same as ASP.NET */}
        <div className="overlay"></div>

        {/* Hero Content */}
        <div className="hero-content">
          <h1 className="display-3 fw-bold">Madesh Ram</h1>
          <p className="fs-3">I'm a Full Stack Developer</p>
          {/* 
            Link replaces <a href="@Url.Action("About", "Home")">
            "to" prop replaces href - React handles navigation without page reload
            This is client-side routing (faster than server-side)
          */}
          <Link to="/about" className="btn btn-primary btn-lg mt-3">
            Know More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home

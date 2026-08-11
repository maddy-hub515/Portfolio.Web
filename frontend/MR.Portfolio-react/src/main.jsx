/*
  main.jsx - React Entry Point
  ============================
  WHY: This file is like Program.cs in ASP.NET - it's where the app starts.
  
  ReactDOM.createRoot() - Creates a React root to render into.
  It finds the #root div in index.html and renders your App component inside it.
  
  StrictMode - Helps catch potential problems during development.
  It runs components twice to detect side effects.
  (Removes itself in production builds)
*/
/*
  main.jsx - React Entry Point
  ============================
  WHY: This file is like Program.cs in ASP.NET - it's where the app starts.
  
  ReactDOM.createRoot() - Creates a React root to render into.
  It finds the #root div in index.html and renders your App component inside it.
  
  StrictMode - Helps catch potential problems during development.
  It runs components twice to detect side effects.
  (Removes itself in production builds)
*/
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

/* 
  CSS Imports - Load stylesheets in order:
  1. index.css - Minimal global styles (box-sizing reset)
  2. style.css - Base styles, typography, layout utilities
  3. site.css - Component-specific styles (sidebar, hero, about, etc.)
  
  The order matters - later files can override earlier ones.
  This is the same as adding <link> tags in ASP.NET's _Layout.cshtml.
*/
import './index.css'
import './styles/style.css'
import './styles/site.css'

// Get the #root div from index.html and tell React to render inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Get the #root div from index.html and tell React to render inside it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

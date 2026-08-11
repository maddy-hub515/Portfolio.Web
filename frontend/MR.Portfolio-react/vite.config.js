/*
  vite.config.js - Vite Build Configuration
  ==========================================
  WHY: Vite is a modern build tool that provides:
  1. Fast Hot Module Replacement (HMR) - changes appear instantly in browser
  2. ES Module support - native browser imports
  3. Optimized builds - tree-shaking, code splitting
  
  The React plugin transforms JSX syntax (like <div>) into regular JavaScript
  that browsers can understand.
  
  Think of this like the .csproj file in ASP.NET - it configures how your
  project is built and served.
*/
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

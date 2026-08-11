import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'
import Portfolio from './pages/Portfolio'

function App() {
  return (
    <Router>
      <Layout>
        <Portfolio />
      </Layout>
    </Router>
  )
}

export default App

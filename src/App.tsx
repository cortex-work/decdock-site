import Nav from './components/Nav'
import Hero from './components/Hero'
import Problem from './components/Problem'
import HowItWorks from './components/HowItWorks'
import Scenarios from './components/Scenarios'
import Differentiation from './components/Differentiation'
import Trust from './components/Trust'
import PilotCTA from './components/PilotCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#1A1916]">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Scenarios />
        <Differentiation />
        <Trust />
        <PilotCTA />
      </main>
      <Footer />
    </div>
  )
}

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
    <div className="relative min-h-screen overflow-hidden bg-[var(--page)] text-[var(--text-strong)]">
      <div className="site-drape" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-[30rem] h-64 bg-[radial-gradient(circle_at_center,rgba(248,243,236,0.28),transparent_72%)]"
        aria-hidden="true"
      />

      <div className="relative">
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
    </div>
  )
}

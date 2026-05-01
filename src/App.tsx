import Nav from './components/Nav'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import Scenarios from './components/Scenarios'
import ExampleRecords from './components/ExampleRecords'
import Differentiation from './components/Differentiation'
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
          <Scenarios />
          <ExampleRecords />
          <HowItWorks />
          <Differentiation />
          <PilotCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}

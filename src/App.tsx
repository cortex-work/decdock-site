import Nav from './components/Nav'
import Hero from './components/Hero'
import TransformationBand from './components/TransformationBand'
import HowItWorks from './components/HowItWorks'
import Scenarios from './components/Scenarios'
import ExampleRecords from './components/ExampleRecords'
import DecisionChain from './components/DecisionChain'
import Differentiation from './components/Differentiation'
import TrustStrip from './components/TrustStrip'
import FAQ from './components/FAQ'
import PilotCTA from './components/PilotCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[var(--page)] text-[var(--text-strong)]">
      <div className="relative">
        <Nav />
        <main>
          <Hero />
          <TransformationBand />
          <Scenarios />
          <ExampleRecords />
          <DecisionChain />
          <HowItWorks />
          <Differentiation />
          <TrustStrip />
          <FAQ />
          <PilotCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}

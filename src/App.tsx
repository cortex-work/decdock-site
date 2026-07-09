import Nav from './components/Nav'
import Hero from './components/Hero'
import EnglishLanding from './components/EnglishLanding'
import TransformationBand from './components/TransformationBand'
import HowItWorks from './components/HowItWorks'
import Scenarios from './components/Scenarios'
import ExampleRecords from './components/ExampleRecords'
import DecisionChain from './components/DecisionChain'
import Differentiation from './components/Differentiation'
import BuyerQuestions from './components/BuyerQuestions'
import TrustStrip from './components/TrustStrip'
import FAQ from './components/FAQ'
import PilotCTA from './components/PilotCTA'
import Footer from './components/Footer'

interface AppProps {
  initialPath?: string
}

function getCurrentPath(initialPath?: string) {
  if (initialPath) return initialPath
  if (typeof window !== 'undefined') return window.location.pathname
  return '/'
}

function TurkishLanding() {
  return (
    <div className="relative min-h-screen bg-[var(--page)] text-[var(--text-strong)]">
      <div className="relative">
        <Nav homeHref="/tr/" />
        <main>
          <Hero />
          <TransformationBand />
          <Scenarios />
          <ExampleRecords />
          <DecisionChain />
          <HowItWorks />
          <Differentiation />
          <BuyerQuestions />
          <TrustStrip />
          <FAQ />
          <PilotCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App({ initialPath }: AppProps = {}) {
  const currentPath = getCurrentPath(initialPath)
  const isTurkishPath = currentPath === '/tr' || currentPath.startsWith('/tr/')

  if (isTurkishPath) {
    return <TurkishLanding />
  }

  return <EnglishLanding />
}

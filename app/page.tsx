import Hero from '@/components/Hero';
import InteractiveDemo from '@/components/InteractiveDemo';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Curriculum from '@/components/Curriculum';
import Comparison from '@/components/Comparison';
import ComingFeatures from '@/components/ComingFeatures';
import FounderStory from '@/components/FounderStory';
import FAQ from '@/components/FAQ';
import SignupForm from '@/components/SignupForm';
import Footer from '@/components/Footer';
import StickyMobileCta from '@/components/StickyMobileCta';
import { getPageCopy } from '@/lib/copy';

export default function Home() {
  const copy = getPageCopy();

  return (
    <main id="main-content" className="pb-24 md:pb-0">
      <Hero hero={copy.hero} />
      <Problem problem={copy.problem} />
      <Solution solution={copy.solution} />
      <InteractiveDemo demo={copy.demo} />
      <Curriculum curriculum={copy.curriculum} />
      <Comparison comparison={copy.comparison} />
      <ComingFeatures comingFeatures={copy.comingFeatures} />
      <FounderStory founder={copy.founder} />
      <FAQ faq={copy.faq} />
      <SignupForm signup={copy.signup} />
      <Footer footer={copy.footer} />
      <StickyMobileCta label={copy.signup.submitLabel} />
    </main>
  );
}

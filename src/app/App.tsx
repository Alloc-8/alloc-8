import { useState } from 'react';
import { MacScreen } from '@/app/components/mac-screen';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState<'initial' | 'feedback'>('initial');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [currentSystem, setCurrentSystem] = useState('');
  const [challenges, setChallenges] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    setStep('feedback');
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/join", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        emailAddress: email,
        featuresMatterMost: feedback,
        currentPlacementSystem: currentSystem,
        mainChallenges: challenges,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      throw new Error("Submission failed");
    }

    setSubmitted(true);

    setTimeout(() => {
      setStep("initial");
      setEmail("");
      setFeedback("");
      setCurrentSystem("");
      setChallenges("");
      setSubmitted(false);
    }, 4000);
  } catch {
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4 overflow-x-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">
            Alloc-8
          </h1>
          <div className="flex items-center justify-center gap-2 text-blue-300/60">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm uppercase tracking-wider">Innovation in Progress</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <MacScreen>
          {step === 'initial' ? (
            <div className="text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  New <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">healthcare</span> placement<br />
                  solutions for Universities<br />
                  <span className="text-blue-300/80">coming soon...</span>
                </h2>
                <p className="text-blue-200/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                  Revolutionary technology to transform how universities manage healthcare student placements, starting with the sector that needs it most
                </p>
              </div>

              <Button 
                onClick={handleNext}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/50 transition-all hover:shadow-xl hover:shadow-blue-900/70 group"
              >
                <span>Contribute to the build by providing feedback</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <div className="pt-4 flex items-center justify-center gap-2 text-blue-300/50 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span>We're building something extraordinary</span>
              </div>
            </div>
          ) : submitted ? (
            <div className="text-center space-y-6">
              <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto animate-in zoom-in duration-500" />
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-white">Thank You!</h3>
                <p className="text-blue-200/70 text-lg max-w-md mx-auto">
                  Your input is invaluable. We'll be in touch soon to keep you updated on our progress.
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-xl mx-auto space-y-6">
              <div className="text-center space-y-3 mb-8">
                <h3 className="text-3xl font-bold text-white">
                  Shape the Future
                </h3>
                <p className="text-blue-200/70">
                  We want to build this with <span className="text-blue-300 font-semibold">your</span> requirements in mind. Be part of something exciting.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-blue-200/90">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@university.ac.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-slate-900/50 border-blue-800/50 text-white placeholder:text-blue-300/30 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="feedback" className="text-sm text-blue-200/90">
                    What features would matter most to you?
                  </label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts, requirements, or challenges you face with current placement systems..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="bg-slate-900/50 border-blue-800/50 text-white placeholder:text-blue-300/30 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="currentSystem" className="text-sm text-blue-200/90">
                    What is your current placement system?
                  </label>
                  <Input
                    id="currentSystem"
                    type="text"
                    placeholder="e.g., manual spreadsheets, existing software..."
                    value={currentSystem}
                    onChange={(e) => setCurrentSystem(e.target.value)}
                    className="bg-slate-900/50 border-blue-800/50 text-white placeholder:text-blue-300/30 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="challenges" className="text-sm text-blue-200/90">
                    What are the main challenges with your current system?
                  </label>
                  <Textarea
                    id="challenges"
                    placeholder="e.g., inefficiency, lack of transparency, difficulty in tracking..."
                    value={challenges}
                    onChange={(e) => setChallenges(e.target.value)}
                    rows={4}
                    className="bg-slate-900/50 border-blue-800/50 text-white placeholder:text-blue-300/30 focus:border-blue-500 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('initial')}
                    className="border-blue-800/50 text-blue-200 hover:bg-blue-900/30"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white"
                  >
                    Join the Journey
                  </Button>
                </div>
              </form>

              <p className="text-xs text-blue-300/40 text-center">
                We respect your privacy. Your information will only be used to keep you informed about Alloc-8.
              </p>
            </div>
          )}
        </MacScreen>

                {/* Footer tagline */}
        <div className="text-center mt-12 text-blue-300/40 text-sm">
          <p>
            © 2026 Alloc-8 is a product by Cyber-Panda consulting, for further services please visit{" "}
            <a
              href="https://www.cyber-panda.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400"
            >
              www.cyber-panda.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

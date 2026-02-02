/**
 * PRESERVED SEND MAIL LOGIC
 * ===========================
 * This file preserves the original multi-step feedback form and send mail logic
 * from the vibe-coded version of the app. The serverless function at
 * functions/api/join.ts remains unchanged and still supports all these fields.
 *
 * If you need to bring back the multi-step form with all fields, reference this file.
 */

// --- State variables used ---
// const [step, setStep] = useState<'initial' | 'feedback'>('initial');
// const [email, setEmail] = useState('');
// const [feedback, setFeedback] = useState('');
// const [currentSystem, setCurrentSystem] = useState('');
// const [challenges, setChallenges] = useState('');
// const [submitted, setSubmitted] = useState(false);

// --- Send mail handler ---
export const preservedHandleSubmit = async (
  e: React.FormEvent,
  {
    email,
    feedback,
    currentSystem,
    challenges,
  }: {
    email: string;
    feedback: string;
    currentSystem: string;
    challenges: string;
  },
  onSuccess: () => void,
  onError: () => void
) => {
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

    onSuccess();
  } catch {
    onError();
  }
};

// --- Original multi-step form JSX (for reference) ---
/*
Step 1 - Landing:
  <div className="text-center space-y-6 sm:space-y-8 max-w-2xl mx-auto">
    <div className="space-y-4">
      <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
        New <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">healthcare</span> placement<br />
        solutions for Universities<br />
        <span className="text-blue-300/80">coming soon...</span>
      </h2>
      <p className="text-blue-200/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
        Revolutionary technology to transform how universities manage healthcare student placements.
      </p>
    </div>
    <Button onClick={handleNext} size="lg"
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/50 transition-all hover:shadow-xl hover:shadow-blue-900/70 group">
      <span>Contribute to the build by providing feedback</span>
      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Button>
    <div className="pt-4 flex items-center justify-center gap-2 text-blue-300/50 text-sm">
      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      <span>We're building something extraordinary</span>
    </div>
  </div>

Step 2 - Feedback form:
  <form onSubmit={handleSubmit} className="space-y-5">
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm text-blue-200/90">Email Address *</label>
      <Input id="email" type="email" placeholder="your.email@university.ac.uk"
        value={email} onChange={(e) => setEmail(e.target.value)} required
        className="bg-slate-900/50 border-blue-800/50 text-white placeholder:text-blue-300/30 focus:border-blue-500" />
    </div>
    <div className="space-y-2">
      <label htmlFor="feedback" className="text-sm text-blue-200/90">What features would matter most to you?</label>
      <Textarea id="feedback" placeholder="Share your thoughts..." value={feedback}
        onChange={(e) => setFeedback(e.target.value)} rows={4}
        className="bg-slate-900/50 border-blue-800/50 text-white placeholder:text-blue-300/30 focus:border-blue-500 resize-none" />
    </div>
    <div className="space-y-2">
      <label htmlFor="currentSystem" className="text-sm text-blue-200/90">What is your current placement system?</label>
      <Input id="currentSystem" type="text" placeholder="e.g., manual spreadsheets, existing software..."
        value={currentSystem} onChange={(e) => setCurrentSystem(e.target.value)}
        className="bg-slate-900/50 border-blue-800/50 text-white placeholder:text-blue-300/30 focus:border-blue-500" />
    </div>
    <div className="space-y-2">
      <label htmlFor="challenges" className="text-sm text-blue-200/90">What are the main challenges with your current system?</label>
      <Textarea id="challenges" placeholder="e.g., inefficiency, lack of transparency..."
        value={challenges} onChange={(e) => setChallenges(e.target.value)} rows={4}
        className="bg-slate-900/50 border-blue-800/50 text-white placeholder:text-blue-300/30 focus:border-blue-500 resize-none" />
    </div>
    <div className="flex gap-3">
      <Button type="button" variant="outline" onClick={() => setStep('initial')}
        className="border-blue-800/50 text-blue-200 hover:bg-blue-900/30">Back</Button>
      <Button type="submit"
        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white">
        Join the Journey
      </Button>
    </div>
  </form>

Step 3 - Success:
  <div className="text-center space-y-6">
    <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto animate-in zoom-in duration-500" />
    <h3 className="text-3xl font-bold text-white">Thank You!</h3>
    <p className="text-blue-200/70 text-lg max-w-md mx-auto">
      Your input is invaluable. We'll be in touch soon.
    </p>
  </div>

After success, the form reset after 4 seconds:
  setTimeout(() => {
    setStep("initial");
    setEmail("");
    setFeedback("");
    setCurrentSystem("");
    setChallenges("");
    setSubmitted(false);
  }, 4000);
*/

import { Link, useNavigate } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";

function HomePage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-br from-base-100 via-base-200 to-base-300">
      {/* NAVBAR */}
      <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                Talent IQ
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
            </div>
          </Link>

          {/* AUTH BTN */}
          <button
            onClick={handleGetStarted}
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <SparklesIcon className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">Real-Time Coding Platform</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black max-w-3xl mx-auto leading-tight mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Code Together
            </span>
            , Solve Problems,{" "}
            <span className="bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent">
              Ace Interviews
            </span>
          </h1>

          <p className="text-xl text-base-content/70 max-w-2xl mx-auto mb-10">
            Collaborate with peers in real-time, tackle coding challenges, and prepare for technical interviews with our
            interactive platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl transition-all duration-200 hover:opacity-90 shadow-lg"
            >
              <div className="flex items-center gap-3 text-white font-bold text-lg">
                <ZapIcon className="w-6 h-6" />
                Get Started
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Everything You Need to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Succeed</span>
            </h2>
            <p className="text-base-content/70">
              Powerful features designed to enhance your coding interview preparation experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Code2Icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-Time Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate with peers using our powerful Monaco editor with syntax highlighting and auto-completion.
              </p>
            </div>

            <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <VideoIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Video & Voice Calls</h3>
              <p className="text-base-content/70">
                Communicate face-to-face with crystal-clear video and audio during your coding sessions.
              </p>
            </div>

            <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <UsersIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community Collaboration</h3>
              <p className="text-base-content/70">
                Join public sessions, discover active coders, and learn from others in real-time.
              </p>
            </div>

            <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <CheckIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interview Problems</h3>
              <p className="text-base-content/70">
                Access a curated collection of coding problems commonly asked in technical interviews.
              </p>
            </div>

            <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <VideoIcon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Screen Sharing</h3>
              <p className="text-base-content/70">
                Share your screen or code editor with session participants for better collaboration.
              </p>
            </div>

            <div className="bg-base-200/50 p-6 rounded-2xl border border-base-300 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <SparklesIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Feedback</h3>
              <p className="text-base-content/70">
                Get real-time feedback on your code execution and test case results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Ready to <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Level Up</span> Your Skills?
          </h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto mb-10">
            Join thousands of developers preparing for technical interviews and improving their coding skills together.
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg text-lg"
          >
            Start Coding Now
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-base-300 border-t border-base-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-base-content/60">
            © {new Date().getFullYear()} Talent IQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
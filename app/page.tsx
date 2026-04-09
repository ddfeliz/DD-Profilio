import Image from "next/image";
import { 
  ArrowRight, 
  BarChart3, 
  Zap, 
  BrainCircuit, 
  CheckCircle2, 
  LineChart, 
  LayoutDashboard 
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-foreground">
              Pulse <span className="text-primary">Analytics</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer">Features</a>
            <a href="#testimonials" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer">Stories</a>
            <a href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors cursor-pointer">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium text-foreground/80 hover:text-foreground transition-colors cursor-pointer">
              Log in
            </button>
            <button className="px-5 py-2.5 rounded-full bg-cta text-white text-sm font-medium hover:bg-cta/90 transition-colors shadow-lg shadow-cta/20 cursor-pointer">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                v2.0 Analytics Engine is Live
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 leading-tight">
                Understand Your Users <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Without the Noise</span>
              </h1>
              <p className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto font-sans font-light leading-relaxed">
                Pulse Analytics uses AI to highlight the exact insights you need. Stop staring at dashboards and start making decisions today.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-white text-base font-medium hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 flex items-center justify-center gap-2 cursor-pointer">
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-transparent text-foreground border border-border hover:bg-background/50 hover:border-foreground/20 transition-all font-medium flex items-center justify-center gap-2 cursor-pointer">
                  View Live Demo
                </button>
              </div>
              <p className="mt-4 text-sm text-foreground/50">No credit card required. 14-day free trial.</p>
            </div>

            {/* Dashboard Mockup Presentation */}
            <div className="mt-20 relative z-20 mx-auto w-full max-w-5xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-[2rem] bg-card border border-border/80 shadow-2xl p-2 pb-0 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <div className="ml-4 text-xs text-foreground/40 font-medium">app.pulse-analytics.io</div>
                </div>
                <div className="relative bg-background rounded-t-xl overflow-hidden aspect-[16/9] w-full">
                  <Image 
                    src="/dashboard-mockup.png" 
                    alt="Pulse Analytics Dashboard Interface" 
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-card">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-4">Precision insights. Zero configuration.</h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">Everything you need to deeply understand behavior, predict intent, and drive growth seamlessly.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/30 transition-colors group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <BrainCircuit className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">AI Personalization</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">Automatically segment users and deliver dynamically personalized experiences based on behavioral data.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-background border border-border/50 hover:border-cta/30 transition-colors group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-cta/10 flex items-center justify-center mb-6 text-cta group-hover:bg-cta group-hover:text-white transition-colors">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Real-time Triggers</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">Deploy context-aware events milliseconds after a user takes an action, preventing churn automatically.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-background border border-border/50 hover:border-secondary/30 transition-colors group cursor-pointer">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                  <LineChart className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">Predictive Metrics</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">Move beyond historical data. View projected growth trajectories and automatically generated KPI forecasts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section id="testimonials" className="py-24 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-heading text-3xl font-bold text-center mb-16">Trusted by modern data teams</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Testimonial Card */}
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-cta mb-6">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-foreground/80 mb-6 italic text-sm leading-relaxed">"Pulse replaced three different tools in our stack. The AI-generated reports are exactly what our C-suite wants to see."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">SJ</div>
                  <div>
                    <div className="font-bold text-sm">Sarah Jenkins</div>
                    <div className="text-xs text-foreground/50">VP Product, TechFlow</div>
                  </div>
                </div>
              </div>

               {/* Testimonial Card */}
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1 text-cta mb-6">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-foreground/80 mb-6 italic text-sm leading-relaxed">"We saw a 24% increase in conversion within the first month by simply using the automated contextual triggers."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center font-bold text-secondary">MR</div>
                  <div>
                    <div className="font-bold text-sm">Michael Roa</div>
                    <div className="text-xs text-foreground/50">Growth Lead, Nova</div>
                  </div>
                </div>
              </div>

              {/* Testimonial Card */}
              <div className="p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-1">
                <div className="flex gap-1 text-cta mb-6">
                  {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                </div>
                <p className="text-foreground/80 mb-6 italic text-sm leading-relaxed">"The cleanest UI I've ever experienced in a data tool. The learning curve is practically non-existent."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-cta/20 flex items-center justify-center font-bold text-cta">EK</div>
                  <div>
                    <div className="font-bold text-sm">Elena K.</div>
                    <div className="text-xs text-foreground/50">Data Scientist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary pointer-events-none" />
          <div className="absolute top-0 right-0 p-32 opacity-10">
            <LayoutDashboard className="w-[500px] h-[500px] text-white" />
          </div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">Ready to see clear data?</h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto font-light">Join 10,000+ companies that use Pulse to build better products.</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 rounded-full bg-white text-primary font-bold hover:bg-background transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl">
                Get Started for Free
              </button>
              <button className="px-8 py-4 rounded-full bg-transparent text-white border border-white/30 hover:bg-white/10 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer">
                Talk to Sales
              </button>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 14-day trial</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Cancel anytime</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-80">
            <BarChart3 className="w-5 h-5 text-primary" />
            <span className="font-heading font-bold text-lg tracking-tight">Pulse Analytics</span>
          </div>
          
          <div className="flex gap-8 text-sm text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Product</a>
            <a href="#" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#" className="hover:text-primary transition-colors">Company</a>
            <a href="#" className="hover:text-primary transition-colors">Legal</a>
          </div>
          
          <div className="text-xs text-foreground/40">
            &copy; {new Date().getFullYear()} Pulse Analytics Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple internal component
function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.006z" clipRule="evenodd" />
    </svg>
  )
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link2, GripVertical, BarChart3, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 noise-bg">
      {/* Dot Pattern Background */}
      <div className="fixed inset-0 dot-pattern dark:dot-pattern-dark pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 size={20} className="sm:w-6 sm:h-6 text-neutral-900 dark:text-neutral-50" strokeWidth={2} />
            <span className="text-base sm:text-lg font-semibold tracking-precise">Zylink</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://github.com/Abhi1264/zylink"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} strokeWidth={1.5} />
            </a>
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="h-8 sm:h-9 text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="h-8 sm:h-9 text-sm bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200">
                Start
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16 sm:pb-20 md:pt-32 md:pb-28">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-xs sm:text-sm">
              <div className="status-dot bg-green-500" />
              <span className="font-medium">Built for creators</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold heading-tight text-neutral-900 dark:text-neutral-50 px-4">
              One Link.
              <br />
              Everything Connected.
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed px-4">
              A sophisticated link management platform designed for professionals 
              who value precision and clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-4 sm:pt-6 px-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-hover">
                  Create Your Profile
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-12 sm:pt-16 max-w-2xl mx-auto px-4">
              {[
                { label: 'Active Users', value: '10,000+', mono: false },
                { label: 'Total Clicks', value: '1.2M+', mono: true },
                { label: 'Uptime', value: '99.9%', mono: true }
              ].map((stat) => (
                <div key={stat.label} className="space-y-1 sm:space-y-2">
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.mono ? 'mono-meta' : ''}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 space-y-2 sm:space-y-3 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold heading-tight">
                Built for Scale
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                Enterprise-grade features in a simple, elegant interface
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {[
                {
                  icon: Link2,
                  title: 'Unlimited Links',
                  description: 'Add and manage unlimited links with complete control over visibility and ordering.',
                },
                {
                  icon: GripVertical,
                  title: 'Drag & Drop',
                  description: 'Precision reordering with haptic feedback. Intuitive interface for power users.',
                },
                {
                  icon: BarChart3,
                  title: 'Analytics',
                  description: 'Real-time click tracking and insights. Understand what resonates with your audience.',
                },
              ].map((feature) => (
                <Card 
                  key={feature.title} 
                  className="p-5 sm:p-6 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover-lift-subtle border-focus shadow-sm"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4 sm:mb-5">
                    <feature.icon size={20} className="sm:w-6 sm:h-6 text-neutral-900 dark:text-neutral-50" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-semibold mb-2 tracking-precise">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 mb-16 sm:mb-20">
          <Card className="max-w-4xl mx-auto p-8 sm:p-12 md:p-16 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm text-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-tight">
                Ready to Start?
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto px-4">
                Create your personalized link hub in under 60 seconds.
              </p>
              <Link href="/signup" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-8 sm:px-10 bg-neutral-900 dark:bg-neutral-50 text-neutral-50 dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-hover mt-4">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 py-8 bg-white dark:bg-black opacity-100">
        <div className="container mx-auto px-4 sm:px-6 flex justify-center">
          <div className="flex flex-row items-center gap-8">
            <div className="flex items-center gap-2">
              <Link2 size={18} className="sm:w-5 sm:h-5 text-neutral-900 dark:text-neutral-50" />
              <span className="text-sm sm:text-base font-semibold">Zylink</span>
            </div>
            <a
              href="https://github.com/Abhi1264/zylink"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors text-sm"
            >
              <Github size={18} strokeWidth={1.5} />
              <span>View on GitHub</span>
            </a>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-500">
              &copy; 2025 Zylink. Built with precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

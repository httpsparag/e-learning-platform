import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  Shield,
  Zap,
  Star,
  Users,
  Award,
  Globe,
  MonitorPlay,
  MessageCircle,
  BarChart,
  CheckCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";
import { MouseEvent } from "react";

export function Landing() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <>
      <FloatingNavbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-[rgb(var(--background))] overflow-x-hidden w-full"
      >
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 w-full overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-[-20%] sm:left-[-15%] lg:left-[-10%] top-[-10%] h-[300px] sm:h-[400px] lg:h-[500px] w-[300px] sm:w-[400px] lg:w-[500px] rounded-full bg-blue-500/30 blur-[100px] sm:blur-[120px] lg:blur-[150px]"></div>
            <div className="absolute right-[-20%] sm:right-[-10%] lg:right-[-5%] bottom-[-10%] h-[300px] sm:h-[400px] lg:h-[500px] w-[300px] sm:w-[400px] lg:w-[500px] rounded-full bg-purple-500/20 blur-[100px] sm:blur-[120px] lg:blur-[150px]"></div>
          </div>

          {/* Main Container */}
          <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90%] max-w-[2400px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 sm:gap-10 md:gap-12 lg:gap-14 xl:gap-20 items-center">
              
              {/* LEFT: TEXT CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 sm:mb-8">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-gray-300">New Curriculum Updated for 2026</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6">
                  Unlock your potential with <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                    Global Mentorship.
                  </span>
                </h1>

                <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 leading-relaxed max-w-lg">
                  Join an elite network of learners. Master complex skills through our AI-adaptive platform designed for modern professionals.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
                  <button
                    onClick={() => navigate("/courses")}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg hover:shadow-blue-600/30 text-white"
                    style={{
                      backgroundColor: '#2b7fff',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1f5fd9')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2b7fff')}
                  >
                    Start Learning Free
                    <ArrowRight size={18} />
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/10 dark:border-white/10 hover:bg-white/5 dark:hover:bg-white/5 text-white dark:text-gray-300 font-semibold text-base sm:text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2 w-full sm:w-auto">
                    <PlayCircle size={20} />
                    View Demo
                  </button>
                </div>

                {/* Static Trust Indicators */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 border-t border-white/5 pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-500 flex-shrink-0" />
                    <span>Certified Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-500 flex-shrink-0" />
                    <span>Secure Platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-yellow-500 flex-shrink-0" />
                    <span>Fast Tracking</span>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: PROFESSIONAL IMAGE COMPOSITION */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-end justify-center lg:justify-end"
              >
                {/* 1. The Aura/Glow (Grounds the image) */}
                <motion.div 
                  style={{ y: backgroundY }}
                  className="absolute bottom-0 w-[300px] sm:w-[400px] lg:w-[500px] h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-to-t from-blue-600/20 to-transparent rounded-full blur-2xl sm:blur-3xl" 
                />

                {/* 2. The Abstract Platform UI (Behind the user) */}
                <div className="absolute bottom-12 sm:bottom-16 lg:bottom-20 right-0 sm:right-5 lg:right-10 w-[280px] sm:w-[320px] lg:w-[350px] h-[320px] sm:h-[360px] lg:h-[400px] bg-gray-900/40 border border-white/10 rounded-2xl backdrop-blur-xl rotate-[-6deg] z-10 overflow-hidden shadow-2xl hidden sm:block">
                  {/* Fake UI Header */}
                  <div className="h-10 sm:h-12 border-b border-white/5 flex items-center px-3 sm:px-4 gap-2 sm:gap-3">
                    <div className="flex gap-1 sm:gap-1.5">
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-red-500/50" />
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500/50" />
                      <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  {/* Fake UI Body */}
                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <div className="h-2 w-1/3 bg-white/10 rounded-full" />
                    <div className="h-24 sm:h-32 w-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-white/5" />
                    <div className="space-y-2">
                      <div className="h-2 w-full bg-white/5 rounded-full" />
                      <div className="h-2 w-4/5 bg-white/5 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* 3. The Professional Student Image */}
                <div className="relative z-20 w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[500px]">
                  <img
                    src="/hero-student.png"
                    alt="Professional Learner"
                    className="w-full h-auto object-contain drop-shadow-2xl"
                    style={{
                      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))"
                    }}
                  />
                  
                  {/* 4. A single, high-value "Glass" badge floating on top of the image */}
                  <div className="absolute -left-2 sm:-left-4 bottom-16 sm:bottom-20 bg-white/10 backdrop-blur-md border border-white/20 p-3 sm:p-4 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4">
                    <div className="bg-green-500/20 p-2 rounded-full text-green-400 flex-shrink-0">
                      <Star size={20} className="sm:w-6 sm:h-6" fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-white font-bold text-base sm:text-lg">Top 1%</p>
                      <p className="text-gray-300 text-xs sm:text-xs">Global Ranking</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= TRUST STRIP (Full Width) ================= */}
        <div className="w-full border-y border-[rgb(var(--border))] bg-[rgb(var(--card))]/50 backdrop-blur-sm">
             <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-10 flex flex-col items-center justify-center gap-8 sm:gap-12 max-w-[2400px] mx-auto">
                 <p className="text-xs sm:text-sm font-bold text-[rgb(var(--muted))] uppercase tracking-widest whitespace-nowrap text-center">
                    Trusted by engineering teams at
                 </p>
                 <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 w-full">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold font-mono">NETFLIX</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold font-serif">Google</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold">Microsoft</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter">Uber</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold italic">Spotify</span>
                      <span className="text-lg sm:text-xl md:text-2xl font-bold font-mono">Amazon</span>
                 </div>
             </div>
        </div>

        {/* ================= FEATURES (Full Width Grid) ================= */}
        <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-[rgb(var(--background))] px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[2400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16 lg:mb-16 pl-2"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
                Why professionals choose us
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <FeatureCard
                icon={<Globe size={32} />}
                title="Global Community"
                desc="Connect with developers from 150+ countries in real-time."
                color="blue"
                delay={0}
              />
              <FeatureCard
                icon={<Zap size={32} />}
                title="Adaptive Learning"
                desc="AI-powered curriculum that adjusts to your pace automatically."
                color="purple"
                delay={0.1}
              />
              <FeatureCard
                icon={<Shield size={32} />}
                title="Enterprise Security"
                desc="Bank-grade encryption for all your data and payments."
                color="green"
                delay={0.2}
              />
              <FeatureCard
                icon={<Award size={32} />}
                title="Accredited"
                desc="Certificates recognized by top tech companies worldwide."
                color="orange"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* ================= FULL WIDTH CTA ================= */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10">
             <div className="w-full max-w-[2400px] mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl sm:rounded-3xl lg:rounded-[2rem] p-8 sm:p-12 md:p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                     <div className="absolute top-0 left-1/4 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] bg-white/10 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px] animate-pulse" />
                     <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-purple-500/30 rounded-full blur-[80px] sm:blur-[100px] lg:blur-[120px]" />
                 </div>
                 
                 <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 md:space-y-8">
                     <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">Ready to level up?</h2>
                     <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto px-2">Join the platform that is defining the future of online education.</p>
                     <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-6 bg-white text-blue-600 rounded-xl font-bold text-base sm:text-lg md:text-xl shadow-lg hover:shadow-white/20 transition-all mt-4"
                    >
                        Get Started Now
                     </motion.button>
                 </div>
             </div>
        </section>

      </motion.div>
    </>
  );
}

/* ================= HELPER COMPONENTS ================= */

function PremiumWidget({ icon, title, subtitle, className, delay }: { icon: any, title: string, subtitle: string, className?: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay, duration: 0.5, type: "spring" }}
            className={`flex items-center gap-4 p-4 pr-8 bg-[rgb(var(--card))] rounded-2xl border border-[rgb(var(--border))] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] backdrop-blur-md z-20 ${className}`}
        >
            <div className="w-12 h-12 rounded-xl bg-[rgb(var(--background))] flex items-center justify-center shadow-inner">
                {icon}
            </div>
            <div>
                <p className="text-base font-bold text-[rgb(var(--foreground))]">{title}</p>
                <p className="text-sm text-[rgb(var(--muted))]">{subtitle}</p>
            </div>
        </motion.div>
    )
}

function FeatureCard({
  icon,
  title,
  desc,
  color,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  delay: number;
}) {
  const colorMap: any = {
    blue: "bg-blue-500/10 text-blue-600",
    purple: "bg-purple-500/10 text-purple-600",
    green: "bg-green-500/10 text-green-600",
    orange: "bg-orange-500/10 text-orange-600",
  };

  return (
    <SpotlightCard delay={delay}>
      <div className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-2xl ${colorMap[color]} flex items-center justify-center mb-4 sm:mb-5 md:mb-6`}>
        {icon}
      </div>
      <h4 className="font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 text-[rgb(var(--foreground))]">{title}</h4>
      <p className="text-[rgb(var(--muted))] text-base sm:text-base md:text-lg leading-relaxed">{desc}</p>
    </SpotlightCard>
  );
}

function SpotlightCard({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="group relative border border-[rgb(var(--border))] bg-[rgb(var(--card))] rounded-3xl p-10 hover:border-[rgb(var(--foreground))]/20 transition-colors h-full"
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(59, 130, 246, 0.08),
                            transparent 80%
                        )
                    `,
                }}
            />
            <div className="relative h-full flex flex-col">{children}</div>
        </motion.div>
    );
}
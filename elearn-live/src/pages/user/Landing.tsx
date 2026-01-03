import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
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
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { FloatingNavbar } from "../../components/layout/FloatingNavbar";

export function Landing() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  return (
    <>
      <FloatingNavbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white overflow-x-hidden w-full"
      >
        {/* ================= HERO SECTION ================= */}
        <section className="relative min-h-screen flex items-center justify-center py-12 sm:py-16 md:py-20 w-full overflow-hidden bg-white">
          {/* Main Container */}
          <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90%] max-w-[1400px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
              {/* LEFT: TEXT CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6 sm:mb-8">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-blue-700">
                    New Curriculum Updated for 2026
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 text-gray-900">
                  Unlock your potential with <br className="hidden sm:block" />
                  <span className="text-blue-600">Global Mentorship.</span>
                </h1>

                <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg">
                  Join an elite network of learners. Master complex skills
                  through our AI-adaptive platform designed for modern
                  professionals.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
                  <button
                    onClick={() => navigate("/courses")}
                    className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold text-base sm:text-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-sm text-white"
                  >
                    Start Learning Free
                    <ArrowRight size={18} />
                  </button>
                  <button className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-semibold text-base sm:text-lg transition-all flex items-center justify-center gap-2 w-full sm:w-auto bg-white">
                    <PlayCircle size={20} />
                    View Demo
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500 border-t border-gray-200 pt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="text-blue-600 flex-shrink-0"
                    />
                    <span>Certified Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={16}
                      className="text-blue-600 flex-shrink-0"
                    />
                    <span>Secure Platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-blue-600 flex-shrink-0" />
                    <span>Fast Tracking</span>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: PROFESSIONAL IMAGE */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center lg:justify-end"
              >
                {/* Professional Image */}
                <div className="relative z-20 w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[500px]">
                  <img
                    src="/hero-student.png"
                    alt="Professional Learner"
                    className="w-full h-auto object-contain"
                  />

                  {/* Badge */}
                  <div className="absolute -left-2 sm:-left-4 bottom-16 sm:bottom-20 bg-white border-2 border-gray-200 p-3 sm:p-4 rounded-xl shadow-lg flex items-center gap-3 sm:gap-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600 flex-shrink-0">
                      <Star
                        size={20}
                        className="sm:w-6 sm:h-6"
                        fill="currentColor"
                      />
                    </div>
                    <div>
                      <p className="text-gray-900 font-bold text-base sm:text-lg">
                        Top 1%
                      </p>
                      <p className="text-gray-600 text-xs sm:text-xs">
                        Global Ranking
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= TRUST STRIP ================= */}
        <div className="w-full border-y border-gray-200 bg-gray-50">
          <div className="w-full px-4 sm:px-6 md:px-8 py-8 sm:py-10 flex flex-col items-center justify-center gap-8 sm:gap-12 max-w-[1400px] mx-auto">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-widest text-center">
              Trusted by engineering teams at
            </p>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 w-full">
              <span className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-gray-400 hover:text-gray-700 transition-colors">
                NETFLIX
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-gray-400 hover:text-gray-700 transition-colors">
                Google
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-400 hover:text-gray-700 transition-colors">
                Microsoft
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold tracking-tighter text-gray-400 hover:text-gray-700 transition-colors">
                Uber
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold italic text-gray-400 hover:text-gray-700 transition-colors">
                Spotify
              </span>
              <span className="text-lg sm:text-xl md:text-2xl font-bold font-mono text-gray-400 hover:text-gray-700 transition-colors">
                Amazon
              </span>
            </div>
          </div>
        </div>

        {/* ================= FEATURES ================= */}
        <section className="w-full py-16 sm:py-20 md:py-24 lg:py-32 bg-white px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 sm:mb-16 lg:mb-16"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight text-gray-900">
                Why professionals choose us
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Everything you need to accelerate your learning journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                color="blue"
                delay={0.1}
              />
              <FeatureCard
                icon={<Shield size={32} />}
                title="Enterprise Security"
                desc="Bank-grade encryption for all your data and payments."
                color="blue"
                delay={0.2}
              />
              <FeatureCard
                icon={<Award size={32} />}
                title="Accredited"
                desc="Certificates recognized by top tech companies worldwide."
                color="blue"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-gray-50">
          <div className="w-full max-w-[1400px] mx-auto bg-blue-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Ready to level up?
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-xl text-blue-50 max-w-2xl mx-auto px-2">
                Join the platform that is defining the future of online
                education.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 bg-white text-blue-600 rounded-lg font-semibold text-base sm:text-lg md:text-lg shadow-lg hover:shadow-xl transition-all mt-4"
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative border-2 border-gray-200 bg-white rounded-xl p-8 hover:border-blue-600 hover:shadow-lg transition-all h-full"
    >
      <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {icon}
      </div>
      <h4 className="font-bold text-xl mb-3 text-gray-900">{title}</h4>
      <p className="text-gray-600 text-base leading-relaxed">{desc}</p>
    </motion.div>
  );
}

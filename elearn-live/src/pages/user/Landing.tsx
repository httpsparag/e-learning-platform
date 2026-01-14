import {
  motion,
  useScroll,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  PlayCircle,
  BarChart3,
  Users,
  Zap,
  CheckCircle2,
  Calendar,
  BarChart,
  Award,
  Shield,
  Star,
  MessageSquare,
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
        className="w-full overflow-x-hidden bg-white"
      >
        {/* ================= HERO SECTION ================= */}
        <section className="relative flex items-center justify-center w-full min-h-screen py-12 overflow-hidden bg-white sm:py-16 md:py-20">
          <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[90%] max-w-[1400px] mx-auto relative z-10">
            <div className="grid items-center grid-cols-1 gap-8 lg:grid-cols-2 sm:gap-10 md:gap-12 lg:gap-16">
              {/* LEFT: TEXT CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl"
              >
                {/* Trust Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-blue-100 rounded-full bg-blue-50 sm:mb-8">
                  <span className="relative flex w-2 h-2">
                    <span className="absolute inline-flex w-full h-full bg-blue-400 rounded-full opacity-75 animate-ping"></span>
                    <span className="relative inline-flex w-2 h-2 bg-blue-500 rounded-full"></span>
                  </span>
                  <span className="text-xs font-medium text-blue-700 sm:text-sm">
                    Join 100+ institutes already teaching live
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 text-gray-900">
                  Run live classes.<br className="hidden sm:block" />
                  <span className="text-blue-600">Without the chaos.</span>
                </h1>

                <p className="max-w-lg mb-6 text-base leading-relaxed text-gray-600 sm:text-lg md:text-lg lg:text-xl sm:mb-8">
                  Live classes, student management, and learning analytics — all in one platform built for institutes.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mb-8 sm:flex-row sm:gap-4 sm:mb-10">
                  <button
                    onClick={() => navigate("/auth/organization/signup")}
                    className="flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-semibold text-white transition-all bg-blue-600 rounded-lg shadow-sm sm:px-8 sm:py-4 hover:bg-blue-700 sm:text-lg sm:w-auto"
                  >
                    Start Free Trial
                    <ArrowRight size={18} />
                  </button>
                  <button className="flex items-center justify-center w-full gap-2 px-6 py-3 text-base font-semibold text-gray-700 transition-all bg-white border-2 border-gray-300 rounded-lg sm:px-8 sm:py-4 hover:border-blue-600 hover:text-blue-600 sm:text-lg sm:w-auto">
                    <PlayCircle size={20} />
                    Book a Demo
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-col items-start gap-4 pt-6 text-xs text-gray-500 border-t border-gray-200 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 text-blue-600"
                    />
                    <span>Free for 14 days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 text-blue-600"
                    />
                    <span>No card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2
                      size={16}
                      className="flex-shrink-0 text-blue-600"
                    />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: APP UI MOCKUP */}
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
                {/* App UI Card */}
                <div className="relative z-20 w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  {/* Browser Tab */}
                  <div className="flex items-center gap-2 px-6 py-4 bg-gray-100 border-b border-gray-200">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="ml-auto text-xs text-gray-500">Instructor Dashboard</span>
                  </div>

                  {/* Dashboard Preview */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                      <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4">
                      <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="w-2/3 h-3 mb-2 bg-blue-300 rounded"></div>
                        <div className="h-2 bg-blue-200 rounded"></div>
                      </div>
                      <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                        <div className="w-2/3 h-3 mb-2 bg-green-300 rounded"></div>
                        <div className="h-2 bg-green-200 rounded"></div>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 rounded-lg bg-gray-50">
                      <div className="w-full h-3 bg-gray-300 rounded"></div>
                      <div className="w-full h-3 bg-gray-300 rounded"></div>
                      <div className="w-2/3 h-3 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM SECTION ================= */}
        <section className="w-full px-4 py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center sm:mb-16"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:mb-6">
                Running live classes shouldn't feel this hard.
              </h2>
              <p className="max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
                Most institutes juggle multiple tools. We simplify everything.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              <PainCard
                icon={<Users size={32} />}
                title="Too many tools"
                desc="Zoom + Excel + WhatsApp + Google Meet = chaos"
                delay={0}
              />
              <PainCard
                icon={<Calendar size={32} />}
                title="No attendance clarity"
                desc="Manual tracking wastes hours every week"
                delay={0.1}
              />
              <PainCard
                icon={<BarChart3 size={32} />}
                title="Students disengage"
                desc="One-way lectures make learning feel disconnected"
                delay={0.2}
              />
              <PainCard
                icon={<Award size={32} />}
                title="Hard to track progress"
                desc="No insights into who's struggling or excelling"
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* ================= SOLUTION SECTION ================= */}
        <section className="w-full px-4 py-16 bg-white sm:py-20 md:py-24 lg:py-32 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center sm:mb-16"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:mb-6">
                One platform for your entire classroom.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <SolutionCard
                icon={<Zap size={40} />}
                title="Live-First Learning"
                desc="Interactive live classes with real-time engagement tools"
                delay={0}
              />
              <SolutionCard
                icon={<BarChart size={40} />}
                title="Smart Insights"
                desc="AI-powered analytics show exactly how students learn"
                delay={0.1}
              />
              <SolutionCard
                icon={<Shield size={40} />}
                title="Built for Institutes"
                desc="Multi-instructor, multi-batch management in one place"
                delay={0.2}
              />
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="w-full px-4 py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center sm:mb-16"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:mb-6">
                Get started in 3 steps.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { num: 1, title: "Create your institute", desc: "Sign up and set up your organization" },
                { num: 2, title: "Add instructors & students", desc: "Invite team members and batch students" },
                { num: 3, title: "Start live classes", desc: "Launch your first interactive live session" },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex flex-col justify-between h-full p-8 text-center bg-white border-2 border-gray-200 rounded-xl">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-6 text-xl font-bold text-white bg-blue-600 rounded-full">
                      {step.num}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                  {idx < 2 && (
                    <div className="absolute hidden transform -translate-y-1/2 md:block top-1/2 -right-4">
                      <ArrowRight className="text-blue-600" size={32} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= WHO IT'S FOR ================= */}
        <section className="w-full px-4 py-16 bg-white sm:py-20 md:py-24 lg:py-32 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center sm:mb-16"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:mb-6">
                Made for teaching teams.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Coaching institutes",
                "Colleges & universities",
                "Corporate trainers",
                "EdTech startups",
              ].map((segment, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 text-center transition-all border border-gray-200 rounded-lg bg-gray-50 hover:border-blue-600 hover:shadow-md"
                >
                  <p className="text-lg font-semibold text-gray-900">{segment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRICING ================= */}
        <section className="w-full px-4 py-16 sm:py-20 md:py-24 lg:py-32 bg-gray-50 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center sm:mb-16"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:mb-6">
                Simple, honest pricing.
              </h2>
              <p className="text-lg text-gray-600">No surprises. No student charges.</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  name: "Starter",
                  price: "₹499",
                  period: "per month",
                  desc: "Perfect for small coaching centers",
                  features: ["Up to 10 instructors", "Up to 500 students", "Up to 20 courses", "Basic analytics"],
                  cta: "Start free trial",
                  featured: false,
                },
                {
                  name: "Pro",
                  price: "₹1,499",
                  period: "per month",
                  desc: "For growing institutes",
                  features: ["Up to 50 instructors", "Up to 5,000 students", "Up to 100 courses", "Advanced analytics", "Priority support"],
                  cta: "Start free trial",
                  featured: true,
                },
                {
                  name: "Institute",
                  price: "Custom",
                  period: "pricing",
                  desc: "For large-scale operations",
                  features: ["Unlimited everything", "Dedicated support", "Custom integrations", "White-label option"],
                  cta: "Book a demo",
                  featured: false,
                },
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`p-8 rounded-xl border-2 transition-all ${
                    plan.featured
                      ? "border-blue-600 bg-white shadow-xl"
                      : "border-gray-200 bg-white hover:border-blue-600"
                  }`}
                >
                  {plan.featured && (
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-bold text-white bg-blue-600 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="mb-6 text-sm text-gray-600">{plan.desc}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="ml-2 text-gray-600">/{plan.period}</span>
                  </div>
                  <button
                    onClick={() => navigate("/auth/instructor/signup")}
                    className={`w-full py-3 rounded-lg font-bold mb-6 transition-all ${
                      plan.featured
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {plan.cta}
                  </button>
                  <div className="space-y-3">
                    {plan.features.map((feature, fidx) => (
                      <div key={fidx} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SOCIAL PROOF ================= */}
        <section className="w-full px-4 py-16 bg-white sm:py-20 md:py-24 lg:py-32 sm:px-6 md:px-8 lg:px-10">
          <div className="w-full max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center sm:mb-16"
            >
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl sm:mb-6">
                Trusted by institutes worldwide.
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { metric: "100+", label: "Institutes active" },
                { metric: "5,000+", label: "Live sessions run" },
                { metric: "50K+", label: "Students learning" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 text-center border border-gray-200 rounded-lg bg-gray-50"
                >
                  <p className="mb-2 text-4xl font-bold text-blue-600">{stat.metric}</p>
                  <p className="text-lg text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="p-8 mt-12 border border-gray-200 bg-gray-50 rounded-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="mb-4 text-lg italic font-semibold text-gray-900">
                "We reduced our operational overhead by 60%. Our instructors love the simplicity, and students are more engaged than ever."
              </p>
              <p className="text-gray-600">
                <strong>Rajesh Kumar</strong> • Director, Tech Academy
              </p>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="w-full px-4 py-12 sm:py-16 md:py-20 lg:py-20 sm:px-6 md:px-8 lg:px-10 bg-gray-50">
          <div className="w-full max-w-[1400px] mx-auto bg-blue-600 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 lg:p-24 text-center text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Focus on teaching.
                <br />
                We handle the tech.
              </h2>
              <p className="max-w-2xl px-2 mx-auto text-base sm:text-lg md:text-xl text-blue-50">
                Join 100+ institutes running better live classes today.
              </p>
              <div className="flex flex-col gap-4 mt-8 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth/instructor/signup")}
                  className="px-8 py-3 text-base font-semibold text-blue-600 transition-all bg-white rounded-lg shadow-lg sm:px-10 md:px-12 sm:py-4 md:py-5 sm:text-lg md:text-lg hover:shadow-xl"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 text-base font-semibold text-white transition-all border-2 border-white rounded-lg sm:px-10 md:px-12 sm:py-4 md:py-5 sm:text-lg md:text-lg hover:bg-white hover:text-blue-600"
                >
                  Book a Demo
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
}

/* ================= HELPER COMPONENTS ================= */

function PainCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="p-6 transition-all bg-white border-2 border-gray-200 sm:p-8 rounded-xl hover:border-red-300 hover:bg-red-50"
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 text-red-600 rounded-xl bg-red-50">
        {icon}
      </div>
      <h4 className="mb-2 text-lg font-bold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{desc}</p>
    </motion.div>
  );
}

function SolutionCard({
  icon,
  title,
  desc,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="p-8 text-center transition-all bg-white border-2 border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg"
    >
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-blue-600 rounded-xl bg-blue-50">
        {icon}
      </div>
      <h4 className="mb-3 text-xl font-bold text-gray-900">{title}</h4>
      <p className="leading-relaxed text-gray-600">{desc}</p>
    </motion.div>
  );
}

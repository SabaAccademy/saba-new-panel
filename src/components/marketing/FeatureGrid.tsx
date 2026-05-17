"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: "🎯",
    title: "Smart Pipeline",
    desc: "Visualise every deal stage with drag-and-drop kanban boards and real-time probability scoring.",
    tag: "Popular",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🤖",
    title: "AI Co-pilot",
    desc: "Get instant deal summaries, next-best-action suggestions and auto-drafted emails from GPT-4.",
    tag: "AI",
    tagColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: "📊",
    title: "Revenue Analytics",
    desc: "Real-time MRR, ARR, churn and cohort analysis that finance and sales can both love.",
    tag: null,
    tagColor: "",
  },
  {
    icon: "⚡",
    title: "Workflow Automation",
    desc: "Build multi-step automations in minutes with a no-code visual editor. No engineers needed.",
    tag: "New",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: "📧",
    title: "Email Sequences",
    desc: "Schedule personalised follow-up sequences and track opens, clicks, and replies automatically.",
    tag: null,
    tagColor: "",
  },
  {
    icon: "🔗",
    title: "200+ Integrations",
    desc: "Connect Slack, HubSpot, Salesforce, Zapier, and hundreds more in a single click.",
    tag: "Popular",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🔒",
    title: "Enterprise Security",
    desc: "SOC 2 Type II certified, GDPR compliant, with SSO, role-based access control and audit logs.",
    tag: null,
    tagColor: "",
  },
  {
    icon: "📱",
    title: "Mobile First",
    desc: "Full-featured iOS and Android apps so your team can close deals anywhere, any time.",
    tag: "New",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
];

export default function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-28 bg-gray-50 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Everything your team needs
          </h2>
          <p className="text-lg text-gray-500">
            Built for modern revenue teams who want to move fast without breaking things.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              key={f.title}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow group cursor-pointer"
            >
              <div className="text-3xl mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3 origin-left">{f.icon}</div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-bold text-gray-900 text-base">{f.title}</h3>
                {f.tag && (
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${f.tagColor}`}>{f.tag}</span>
                )}
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

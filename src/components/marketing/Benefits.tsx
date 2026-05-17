"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const METRICS = [
  { value: "50%", label: "Faster sales cycles", sub: "Speed up your closing process" },
  { value: "3x", label: "Pipeline generation", sub: "Increase qualified leads automatically" },
  { value: "0 hrs", label: "Manual data entry", sub: "Let AI handle the admin work" },
  { value: "24/7", label: "AI Sales coaching", sub: "Continuous support and analysis" },
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Why NuroAI
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Why sales teams love our <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">AI-Powered</span> dashboard
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to scale your revenue engine without scaling your headcount.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((m, i) => (
            <motion.div 
              key={m.label} 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -5 }}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:shadow-lg hover:shadow-slate-200/50 transition-all"
            >
              <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-500 mb-3">{m.value}</div>
              <div className="text-sm font-bold text-slate-800 mb-2">{m.label}</div>
              <div className="text-sm text-slate-500">{m.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

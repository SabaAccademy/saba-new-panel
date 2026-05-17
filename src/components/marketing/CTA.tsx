"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" 
      />
      
      <div ref={ref} className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-black tracking-tight text-white mb-6"
        >
          Ready to supercharge your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">sales team?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Join forward-thinking teams using NuroAI to close more deals, eliminate busywork, and focus on what matters.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#demo"
            className="bg-white hover:bg-slate-100 text-slate-900 font-bold px-8 py-4 rounded-full text-base transition-all shadow-lg hover:-translate-y-0.5"
          >
            Request a Demo
          </a>
          <a
            href="#trial"
            className="border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full text-base transition-all hover:-translate-y-0.5"
          >
            Try for free
          </a>
        </motion.div>
      </div>
    </section>
  );
}

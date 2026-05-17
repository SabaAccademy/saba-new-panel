"use client";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white pt-32 pb-20">
      {/* Decorative blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-3xl" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-400/10 blur-3xl" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center bg-gradient-to-b from-[#Fdfbfb] to-[#F4edef] rounded-[40px] pt-24 pb-32 border border-white/50 shadow-sm overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl -z-10" />
        {/* Headline */}
        <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-800 mb-6 leading-[1.05] max-w-4xl mx-auto">
          AI-Driven sales teams with human-level precision
        </motion.h1>

        <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg text-slate-500 mb-10 leading-relaxed font-medium">
          Empower your business with AI-driven teams that execute tasks with human-level precision, efficiency, and reliability.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <a
            href="#trial"
            className="bg-slate-800 hover:bg-slate-900 text-white font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Try for free
          </a>
          <a
            href="#demo"
            className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold px-8 py-3.5 rounded-full text-sm transition-all shadow-sm hover:shadow-md hover:bg-slate-50 hover:-translate-y-0.5"
          >
            Request a Demo
          </a>
        </motion.div>

        {/* Mock dashboard preview replacing Stats*/}
        <motion.div 
          variants={itemVariants}
          className="relative max-w-4xl mx-auto h-[400px] flex items-center justify-center -mb-10"
        >
          {/* Center Chat floating card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute z-20 w-[460px] bg-white/80 backdrop-blur-xl border border-white rounded-[24px] shadow-2xl p-6 flex flex-col items-center"
          >
            <div className="w-full flex justify-between items-center mb-6 text-slate-400 text-sm">
                <span>✕</span>
                <span className="font-medium text-slate-600">New chat</span>
                <span>✨</span>
            </div>
            
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-100 to-orange-100 flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-400 to-orange-400 opacity-80" />
            </div>

            <p className="text-sm text-slate-600 text-center mb-8 px-4 font-medium">
                Provide a detailed summary of my company's latest investment including key metrics.
            </p>

            <div className="w-full bg-slate-50/50 border border-slate-100 rounded-full py-3 px-4 flex items-center justify-between shadow-inner">
                <span className="text-slate-400 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-400" />
                    Ask or search for anything
                </span>
                <span className="text-slate-300">↑</span>
            </div>
          </motion.div>

          {/* Top Left Card - Deals */}
          <motion.div 
            initial={{ x: -40, y: -20, opacity: 0, rotate: -5 }}
            animate={{ x: -180, y: -80, opacity: 1, rotate: -8 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring' }}
            className="absolute z-10 w-48 bg-white border border-white rounded-2xl shadow-xl p-4 flex flex-col gap-3 left-1/2 top-1/2"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border-[3px] border-orange-400 flex items-center justify-center text-xs font-bold text-slate-700">48%</div>
              <div className="text-[10px] text-slate-500 leading-tight">The best deals in this year</div>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-8 h-8 rounded-full border-[3px] border-indigo-400 flex items-center justify-center text-xs font-bold text-slate-700">68%</div>
              <div className="text-[10px] text-slate-500 leading-tight">In this year's net rate</div>
            </div>
          </motion.div>

          {/* Top Right Card - Sales Figures */}
          <motion.div 
            initial={{ x: 40, y: -20, opacity: 0, rotate: 5 }}
            animate={{ x: 180, y: -60, opacity: 1, rotate: 6 }}
            transition={{ duration: 1, delay: 0.6, type: 'spring' }}
            className="absolute z-10 w-52 bg-white/90 backdrop-blur-md border border-white rounded-2xl shadow-xl p-5 left-1/2 top-1/2"
          >
             <h4 className="text-xs font-bold text-slate-700 mb-1">Sales Figures</h4>
             <p className="text-[10px] text-slate-400 mb-3">Upcoming Sales</p>
             <p className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                $4,686.82
             </p>
             <div className="flex items-end gap-1.5 h-10 w-full justify-between">
                {[30, 50, 40, 70, 45, 80].map((h, i) => (
                   <div key={i} className={`w-full rounded-t-sm ${i === 3 ? 'bg-orange-300' : 'bg-slate-100'}`} style={{height: `${h}%`}} />
                ))}
             </div>
          </motion.div>

           {/* Bottom Right Card - Circular Progress */}
          <motion.div 
            initial={{ x: 40, y: 20, opacity: 0, rotate: -5 }}
            animate={{ x: 160, y: 100, opacity: 1, rotate: -4 }}
            transition={{ duration: 1, delay: 0.7, type: 'spring' }}
            className="absolute z-10 w-48 bg-white/90 backdrop-blur-md border border-white rounded-2xl shadow-xl p-4 left-1/2 top-1/2 text-center"
          >
             <p className="text-[10px] font-semibold text-slate-500 mb-3">Average Retail Sales</p>
             <div className="relative w-20 h-20 mx-auto mb-3">
                 <svg className="w-20 h-20 transform -rotate-90">
                     <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                     <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="45" className="text-indigo-400" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                     <span className="text-sm font-bold text-slate-800">88%</span>
                 </div>
             </div>
             <div className="flex justify-between w-full px-2">
                 <div className="text-left">
                     <p className="text-[8px] text-slate-400">Previous</p>
                     <p className="text-[10px] font-bold text-slate-700">$4,277.06</p>
                 </div>
                 <div className="text-right">
                     <p className="text-[8px] text-slate-400">Current</p>
                     <p className="text-[10px] font-bold text-slate-700">$2,572.75</p>
                 </div>
             </div>
          </motion.div>

          {/* Bottom Left Card - Sales Increment */}
           <motion.div 
            initial={{ x: -40, y: 20, opacity: 0, rotate: 5 }}
            animate={{ x: -200, y: 120, opacity: 1, rotate: 4 }}
            transition={{ duration: 1, delay: 0.8, type: 'spring' }}
            className="absolute z-20 w-48 bg-white border border-white rounded-2xl shadow-lg p-5 left-1/2 top-1/2"
          >
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                 <span className="w-3 h-3 bg-indigo-500 rounded-sm" />
             </div>
             <div className="flex items-center gap-2 mb-1">
                 <p className="text-xs font-bold text-slate-700">Sales</p>
                 <span className="bg-emerald-50 text-emerald-500 text-[8px] font-bold px-1.5 py-0.5 rounded">+9.9% ↑</span>
             </div>
             <p className="text-xl font-bold text-slate-800 mb-1">$7,854.21</p>
             <p className="text-[10px] text-slate-400">Previous year ($2,134.0)</p>
          </motion.div>
          
        </motion.div>
      </motion.div>
    </section>
  );
}

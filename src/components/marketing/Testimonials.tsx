"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    quote: "NuroAI completely transformed our sales process. We're closing 30% more deals without adding headcount.",
    name: "Sarah Kim",
    title: "VP of Sales, TechFlow",
    color: "from-indigo-500 to-indigo-700",
  },
  {
    quote: "The AI agent catches buying signals we routinely missed. It's like having a top-performing SDR working 24/7.",
    name: "Marcus Webb",
    title: "CRO, GlobalTech",
    color: "from-slate-500 to-slate-700",
  },
  {
    quote: "Data entry dropping to zero has saved our team countless hours. Morale is up and pipeline is full.",
    name: "Priya Nair",
    title: "Head of RevOps, BrightIdeas",
    color: "from-rose-500 to-rose-700",
  },
  {
    quote: "Our win rate jumped significantly in the first quarter. The automated drafting of cold emails is scarily good.",
    name: "Tom Harrington",
    title: "Sales Director, Pinnacle",
    color: "from-orange-500 to-orange-600",
  },
  {
    quote: "NuroAI gives us visibility we've never had before. As a manager, I can see exactly where coaching is needed.",
    name: "Lisa Chen",
    title: "VP Growth, Segment",
    color: "from-slate-500 to-slate-600",
  },
  {
    quote: "We ripped out three legacy tools and replaced them all with Nuro. Best tech decision we made all year.",
    name: "David Okonkwo",
    title: "IT Director, GrowthCo",
    color: "from-indigo-400 to-indigo-600",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 bg-[#Fdfbfb]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400"></span>
            Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            What sales teams are saying
          </h2>
          <p className="text-lg text-slate-500">
            See how forward-thinking teams are using NuroAI to hit quota faster.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              key={t.name}
              className="break-inside-avoid mb-6 bg-white border border-slate-100/60 shadow-sm rounded-3xl p-8 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <blockquote className="text-gray-700 text-sm leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

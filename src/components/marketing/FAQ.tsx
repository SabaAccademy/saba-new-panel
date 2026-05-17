"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes. Every plan comes with a 14-day free trial — no credit card required. You can get started in minutes and upgrade or cancel any time.",
  },
  {
    q: "How does pricing work for larger teams?",
    a: "Pricing is per seat, per month. For teams over 50 seats, we offer volume discounts. Reach out to our sales team for a custom quote.",
  },
  {
    q: "Can I migrate data from my current CRM?",
    a: "Absolutely. We have one-click importers for Salesforce, HubSpot, Pipedrive, and CSV. Our onboarding team will help you migrate at no extra cost.",
  },
  {
    q: "Does NuroAI integrate with the tools we already use?",
    a: "We support 200+ integrations including Slack, Gmail, Outlook, Zoom, Stripe, Zapier, Make, and many more. Our API is also fully open for custom builds.",
  },
  {
    q: "What does the AI co-pilot actually do?",
    a: "The AI co-pilot analyses your deal history to surface next-best actions, auto-drafts follow-up emails, scores lead quality in real time, and summarises long email threads instantly.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            FAQ
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Frequently asked questions
          </h2>
          <p className="text-lg text-slate-500">
            Still have questions? <a href="#demo" className="text-indigo-600 underline">Chat with our team.</a>
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={false}
              className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left bg-transparent hover:bg-slate-100/50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
                <motion.span 
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="shrink-0 text-slate-400"
                >
                  {open === i ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div 
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 }
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm text-slate-500 leading-relaxed pt-2 border-t border-slate-100/50">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

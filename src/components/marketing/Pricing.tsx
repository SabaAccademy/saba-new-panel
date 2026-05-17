"use client";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PLANS = [
  {
    name: "Starter",
    price: "$39",
    per: "/mo per seat",
    desc: "Perfect for small teams getting started with CRM.",
    cta: "Start free trial",
    popular: false,
    features: [
      "Up to 5 seats",
      "1,000 contacts",
      "Basic pipeline management",
      "Email integration",
      "Standard analytics",
      "Community support",
    ],
    missing: ["AI co-pilot", "Workflow automation", "Custom reporting", "SSO & SAML"],
  },
  {
    name: "Pro",
    price: "$99",
    per: "/mo per seat",
    desc: "For growing teams that need power and automation.",
    cta: "Start free trial",
    popular: true,
    features: [
      "Unlimited seats",
      "Unlimited contacts",
      "Advanced pipeline & forecasting",
      "Email sequences",
      "AI co-pilot",
      "Workflow automation",
      "Custom reporting",
      "Priority support",
    ],
    missing: ["SSO & SAML", "Custom SLA"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    per: "",
    desc: "For organisations that need security, scale and support.",
    cta: "Contact sales",
    popular: false,
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Custom SLA",
      "Dedicated success manager",
      "Advanced audit logs",
      "Custom integrations",
      "On-prem deployment option",
    ],
    missing: [],
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="py-28 bg-gray-50">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Pricing</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-500">
            No hidden fees. No surprise invoices. Cancel any time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              key={plan.name}
              className={`rounded-2xl p-8 border transition-colors ${
                plan.popular
                  ? "bg-gray-900 border-gray-700 shadow-2xl scale-100 lg:scale-105 z-10 text-white"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  ★ Most Popular
                </div>
              )}
              <h3 className={`text-xl font-bold mb-1 ${plan.popular ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>{plan.desc}</p>
              <div className="flex items-end gap-1 mb-6">
                <span className={`text-4xl font-black ${plan.popular ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                {plan.per && <span className={`text-sm pb-1 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>{plan.per}</span>}
              </div>

              <Link
                href={plan.name === "Enterprise" ? "#contact" : "/auth/register"}
                className={`block w-full text-center font-semibold py-3 rounded-xl text-sm transition-colors mb-8 ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
              >
                {plan.cta}
              </Link>

              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm">
                    <span className="text-emerald-500 font-bold shrink-0">✓</span>
                    <span className={plan.popular ? "text-gray-300" : "text-gray-700"}>{f}</span>
                  </li>
                ))}
                {plan.missing.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm opacity-40">
                    <span className="shrink-0">—</span>
                    <span className={plan.popular ? "text-gray-400" : "text-gray-400"}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

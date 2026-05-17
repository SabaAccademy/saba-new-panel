"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TabKey = "crm" | "analytics" | "automation";

interface Tab {
  id: TabKey;
  label: string;
  headline: string;
  body: string;
  ui: React.ReactNode;
}

function CRMPreview() {
  const rows = [
    { name: "Acme Corp",    stage: "Proposal",    value: "$48,000",  owner: "Sara K.",  dot: "bg-blue-500" },
    { name: "GlobalTech",   stage: "Negotiation", value: "$120,000", owner: "Mike R.",  dot: "bg-amber-500" },
    { name: "Bright Ideas", stage: "Closed",      value: "$24,500",  owner: "Jen L.",   dot: "bg-emerald-500" },
    { name: "Pinnacle Ltd", stage: "Prospect",    value: "$67,000",  owner: "Chris B.", dot: "bg-gray-400" },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">Deal Pipeline</span>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">4 active</span>
      </div>
      <table className="w-full text-sm">
        <thead className="text-xs text-gray-400 bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium">Company</th>
            <th className="px-4 py-2 text-left font-medium">Stage</th>
            <th className="px-4 py-2 text-left font-medium">Value</th>
            <th className="px-4 py-2 text-left font-medium">Owner</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="px-4 py-2.5 font-medium text-gray-800">{r.name}</td>
              <td className="px-4 py-2.5">
                <span className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${r.dot}`} />
                  <span className="text-gray-600">{r.stage}</span>
                </span>
              </td>
              <td className="px-4 py-2.5 font-semibold text-emerald-600">{r.value}</td>
              <td className="px-4 py-2.5 text-gray-500">{r.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnalyticsPreview() {
  const bars = [30, 48, 42, 65, 58, 72, 68, 84, 76, 90, 82, 95];
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-700">Monthly Revenue</p>
          <p className="text-2xl font-bold text-gray-900 mt-0.5">$284,512</p>
        </div>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+18.3%</span>
      </div>
      <div className="flex items-end gap-1.5 h-28">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end">
            <div
              className={`rounded-t-sm ${i === bars.length - 1 ? "bg-blue-600" : "bg-blue-200"} transition-all`}
              style={{ height: `${h}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-gray-300 mt-1.5 px-0.5">
        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
          <span key={m}>{m.slice(0, 1)}</span>
        ))}
      </div>
    </div>
  );
}

function AutomationPreview() {
  const steps = [
    { label: "Trigger: Deal moved to Proposal",  color: "border-blue-200 bg-blue-50",    dot: "bg-blue-500" },
    { label: "Action: Send proposal email",       color: "border-violet-200 bg-violet-50", dot: "bg-violet-500" },
    { label: "Wait: 3 days",                      color: "border-gray-200 bg-gray-50",     dot: "bg-gray-400" },
    { label: "Condition: No reply?",              color: "border-amber-200 bg-amber-50",   dot: "bg-amber-500" },
    { label: "Action: Notify account owner",      color: "border-emerald-200 bg-emerald-50", dot: "bg-emerald-500" },
  ];
  return (
    <div className="space-y-2">
      {steps.map((s, i) => (
        <div key={i} className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${s.color}`}>
          <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
          <span className="text-sm text-gray-700 font-medium">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function ProductShowcase() {
  const [active, setActive] = useState<TabKey>("crm");

  const TABS: Tab[] = [
    {
      id: "crm",
      label: "CRM",
      headline: "Close deals without the chaos",
      body: "Every lead, contact and deal in one place. Nexus gives your sales team the context they need to move fast and close confidently — without spreadsheets.",
      ui: <CRMPreview />,
    },
    {
      id: "analytics",
      label: "Analytics",
      headline: "Data that drives action",
      body: "Real-time charts and KPI cards built for operators — not just data analysts. Surface what matters and share insights with one click.",
      ui: <AnalyticsPreview />,
    },
    {
      id: "automation",
      label: "Automation",
      headline: "Let machines do the routine work",
      body: "Build powerful workflows with a visual editor. No code, no tickets. Automate follow-ups, notifications and handoffs across your whole revenue stack.",
      ui: <AutomationPreview />,
    },
  ];

  const current = TABS.find((t) => t.id === active)!;

  return (
    <section id="product" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3">Product</p>
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            One tool. Every workflow.
          </h2>
          <p className="text-lg text-gray-500">
            See how Nexus replaces the patchwork of tools your team is duct-taping together right now.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                active === tab.id
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${active}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-4">{current.headline}</h3>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">{current.body}</p>
              <ul className="space-y-3">
                {[
                  "Instant setup — no professional services needed",
                  "Works with your existing data and tools",
                  "Built-in permissions and audit trail",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-emerald-600 text-xs font-bold">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`ui-${active}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
              className="relative"
            >
              {current.ui}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const LOGOS = [
  { name: "hotjar", icon: "🔥" },
  { name: "loom", icon: "📹" },
  { name: "Lattice", icon: "🌱" },
  { name: "Evernote", icon: "🐘" },
  { name: "Linear", icon: "📈" },
];

export default function LogoCloud() {
  return (
    <section className="py-24 bg-[#Fdfbfb]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
          Our trusted partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          {LOGOS.map((logo) => (
            <div key={logo.name} className="flex items-center gap-2 text-gray-400 hover:text-gray-800 transition-colors grayscale hover:grayscale-0 duration-300 group cursor-pointer">
              <span className="text-xl">{logo.icon}</span>
              <span className="text-xl font-bold tracking-tight">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

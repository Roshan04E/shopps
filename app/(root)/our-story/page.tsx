export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#f5f7f2]">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center bg-gradient-to-b from-[#eef2ea] to-[#f5f7f2]">
        <span className="inline-flex items-center gap-2 bg-white border border-[#c8dbc0] text-[#5a8a4a] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
          🌿 Our Story
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-[#1a2e1a] max-w-3xl mx-auto leading-tight">
          From local farms to{" "}
          <span className="text-[#7fb069]">your doorstep</span>
        </h1>
        <p className="mt-6 text-[#5a6b5a] text-lg max-w-xl mx-auto leading-relaxed">
          We started Shopps because fresh food shouldn't be a luxury. It should
          be simple, honest, and available to everyone.
        </p>
      </section>

      {/* Story sections */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-20 h-20 rounded-2xl bg-[#e8f0e4] flex items-center justify-center text-4xl shrink-0">
            🌱
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-3">
              Where it began
            </h2>
            <p className="text-[#5a6b5a] leading-relaxed">
              We grew up watching local farmers sell their produce at weekly
              markets — fresh, honest, and full of flavor. But most people don't
              have time to visit a market every week. Supermarkets are
              convenient, but the produce travels hundreds of kilometers before
              it reaches your plate. We thought there had to be a better way.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c8dbc0] to-transparent" />

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-20 h-20 rounded-2xl bg-[#e8f0e4] flex items-center justify-center text-4xl shrink-0">
            🚚
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-3">
              What we do
            </h2>
            <p className="text-[#5a6b5a] leading-relaxed">
              Shopps connects you directly with local farms. We pick up produce
              the same morning it's harvested and deliver it to your door the
              same day. No warehouses, no cold storage for weeks, no middlemen.
              Just fresh vegetables and fruits, straight from the farm to your
              kitchen — harvested at dawn, delivered by evening.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c8dbc0] to-transparent" />

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-20 h-20 rounded-2xl bg-[#e8f0e4] flex items-center justify-center text-4xl shrink-0">
            ✅
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-3">
              Our promise
            </h2>
            <p className="text-[#5a6b5a] leading-relaxed">
              Every item on Shopps goes through a strict quality check before it
              leaves the farm. Zero chemicals, pure and safe. If you're not
              happy with what you receive, we'll make it right — no questions
              asked. We believe fresh food should be accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Values — matches homepage cards style */}
      <section className="bg-white border-t border-[#e0e8db] py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-[#eef2ea] text-[#5a8a4a] text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
              ⭐ What we stand for
            </span>
            <h2 className="text-3xl font-bold text-[#1a2e1a]">
              Built on three simple values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🌿",
                bg: "bg-[#e8f5e4]",
                title: "Farm → Table",
                desc: "Harvested at dawn, delivered the same day from farms within 5 km. No cold storage, no preservatives.",
              },
              {
                icon: "🚚",
                bg: "bg-[#e4eef5]",
                title: "Right on Time",
                desc: "Smart delivery slots that respect your schedule. Pick a time that works for you — we'll be there.",
              },
              {
                icon: "🛡️",
                bg: "bg-[#f5f0e4]",
                title: "Pure & Safe",
                desc: "Zero chemicals, strict quality checks, and freshness you can trust with every single order.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-8 rounded-2xl bg-[#f5f7f2] border border-[#e0e8db] hover:shadow-lg hover:shadow-[#7fb069]/10 transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center text-2xl mb-5`}
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#1a2e1a] text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-[#5a6b5a] text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-[#eef2ea] to-[#f5f7f2] py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-[#1a2e1a] mb-4">
          Ready to eat fresher?
        </h2>
        <p className="text-[#5a6b5a] mb-8 text-lg">
          Join hundreds of families who've switched to farm-fresh delivery.
        </p>
        <a
          href="/menu"
          className="inline-block bg-gradient-to-br from-[#7fb069] to-[#88b04b] hover:shadow-lg hover:shadow-[#7fb069]/30 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 active:scale-95"
        >
          Order Fresh Now →
        </a>
      </section>
    </main>
  );
}

export default function AboutPage() {
  return (
    <section className="pt-32 pb-20 container mx-auto px-6 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
        About Shopps
      </h1>

      <p className="text-slate-600 text-lg leading-relaxed mb-6">
        Shopps was built to bring fresh, local groceries directly from nearby
        farmers to your home. No warehouses. No long storage. Just honest food.
      </p>

      <div className="bg-white/80 backdrop-blur border border-orange-200 rounded-2xl p-6 shadow">
        <h2 className="font-bold text-xl mb-2">Our Mission</h2>
        <p className="text-slate-600">
          Support local farmers, reduce food waste, and deliver fresh groceries
          at fair prices — fast and transparently.
        </p>
      </div>
    </section>
  );
}

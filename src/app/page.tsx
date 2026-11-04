import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-rose-600 to-amber-500 text-white">
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28 text-center">
          <p className="mb-3 text-sm font-semibold tracking-widest uppercase opacity-90">
            12 – 15 January 2027 · Belagavi
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl font-bold tracking-tight">
            FESTORA
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-medium opacity-95">
            One Festival. Endless Experiences.
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg opacity-90 leading-relaxed">
            Four days of delicious food, vibrant shopping, live cooking demos,
            carnival games, music and entertainment under one roof.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-rose-700 shadow-lg hover:bg-orange-50 transition"
            >
              Register Now
            </Link>
            <Link
              href="/about"
              className="rounded-full border-2 border-white/80 px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Days", value: "4" },
            { label: "Food Stalls", value: "25" },
            { label: "Shopping Stalls", value: "25" },
            { label: "Venue", value: "CPAD Ground" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-stone-200 bg-white p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-orange-600">{item.value}</p>
              <p className="mt-1 text-sm font-medium text-stone-500 uppercase tracking-wide">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-stone-100 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-stone-900">
            The Grand Food & Carnival Festival
          </h2>
          <p className="mt-4 text-stone-600 leading-relaxed">
            Organised in Belagavi, FESTORA brings together food lovers, shopping
            enthusiasts, local entrepreneurs and families for an unforgettable
            celebration of flavours, culture and fun.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-block text-orange-600 font-semibold hover:underline"
          >
            Read full story →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-stone-900">
          Ready to be part of FESTORA 2027?
        </h2>
        <p className="mt-2 text-stone-600">
          Register as a visitor, stall owner, artist or volunteer.
        </p>
        <Link
          href="/register"
          className="mt-8 inline-block rounded-full bg-orange-600 px-10 py-4 text-white font-semibold shadow-md hover:bg-orange-700 transition"
        >
          Start Registration
        </Link>
      </section>

      <footer className="border-t border-stone-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-stone-500">
          <p>© 2027 FESTORA · Organised by Sanskruti Hongekar</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-orange-600">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-orange-600">
              Privacy
            </Link>
            <Link href="/admin" className="hover:text-orange-600">
              Admin
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  let session = null;
  try {
    session = await getSession();
  } catch {
    session = null;
  }

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-stone-900">FESTORA Admin</h1>
            <p className="text-xs text-stone-500">Signed in as {session.name}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-800 font-medium">
              {session.roles.join(", ")}
            </span>
            <Link href="/" className="text-stone-500 hover:text-orange-600">
              Public site
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold text-stone-900">Dashboard</h2>
        <p className="mt-2 text-stone-600">
          Foundation is ready. Full CRUD modules, registration engine, QR check-in,
          SPOC management and email campaigns will be added next.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Event Config", desc: "Name, dates, venue, branding" },
            { title: "Registrations", desc: "View & manage attendees" },
            { title: "Ticket Types", desc: "General, VIP, Stall, etc." },
            { title: "SPOCs", desc: "Single Point of Contact assignment" },
            { title: "QR Check-in", desc: "Scanner & attendance" },
            { title: "Email & Reminders", desc: "Resend campaigns" },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-stone-900">{card.title}</h3>
              <p className="mt-1 text-sm text-stone-500">{card.desc}</p>
              <p className="mt-4 text-xs font-medium text-orange-600">Coming next</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

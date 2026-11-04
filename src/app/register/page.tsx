import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-stone-900">Register for FESTORA 2027</h1>
          <p className="mt-2 text-stone-600">
            Registration engine (dynamic forms, ticket types, QR generation) is part of the next foundation iteration.
          </p>
          <p className="mt-4 text-sm text-stone-500">
            For now the database schema, seed data and authentication foundation are ready.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-orange-600 px-6 py-2.5 text-white font-medium hover:bg-orange-700"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

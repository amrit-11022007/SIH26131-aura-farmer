import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">
        Hello World From electron
      </h1>

      <Link href="/alerts">
        <Button
          type="button"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
        >
          Go to Alerts
        </Button>
      </Link>
    </main>
  );
}

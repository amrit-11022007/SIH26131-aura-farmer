import { Button } from "@/components/ui/button";
import Scanner from "../components/dashboard/Scanner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type ScanPageProps = {
  searchParams: Promise<{ redirect?: string | string[] }>;
};

export default async function ScanPage({ searchParams }: ScanPageProps) {
  const params = await searchParams;
  const redirectParam = params.redirect;
  const redirectPath =
    (Array.isArray(redirectParam) ? redirectParam[0] : redirectParam) ||
    "/dashboard";
  return (
    <main className="min-h-screen bg-(--alert-page-bg) px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href={redirectPath}>
          <Button
            size="icon-lg"
            aria-label="Submit"
            variant="outline"
            className="flex items-center justify-center text-lg text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2 text-black" />
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="mt-2 text-3xl font-bold text-emerald-950">AI Scan</h1>
          <p className="mt-2 text-slate-600">
            Capture an image of your crop to receive AI-based diagnosis and
            recommendations.
          </p>
        </div>
        <Scanner />
      </div>
    </main>
  );
}

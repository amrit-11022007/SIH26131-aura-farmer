import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import type { CardData } from "@/app/types/components";
import PercentageCircle from "@/app/dashboard/PercentageCircle";

function normalizeAlert(doc: Record<string, any>): CardData {
  const recommendation = Array.isArray(doc.recommendation)
    ? doc.recommendation.map((item) => String(item))
    : typeof doc.recommendation === "string"
      ? [doc.recommendation]
      : [];

  const triggerConditions = Array.isArray(doc.triggerConditions)
    ? doc.triggerConditions.map((item) => ({
        label: String(item?.label ?? "Condition"),
        value: String(item?.value ?? "N/A"),
      }))
    : [];

  return {
    id: String(doc._id ? doc._id.toString() : (doc.id ?? "alert")),
    type: String(doc.type ?? "General"),
    name: String(doc.name ?? "Alert"),
    timing: String(doc.timing ?? "N/A"),
    severity: String(doc.severity ?? "Medium"),
    percentage: Number(doc.percentage ?? 0),
    location: String(doc.location ?? "Unknown location"),
    description: String(doc.description ?? "No description available."),
    triggerConditions,
    recommendation,
  };
}

export default async function AlertDetailPage({
  params,
}: {
  params: Promise<{ alertid: string }>;
}) {
  const { alertid } = await params;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB ?? "sih131");

  let alertDoc: Record<string, any> | null = null;

  if (ObjectId.isValid(alertid)) {
    alertDoc = await db
      .collection("farmerData")
      .findOne({ _id: new ObjectId(alertid) });
  }

  if (!alertDoc) {
    alertDoc = await db.collection("farmerData").findOne({ id: alertid });
  }

  if (!alertDoc) {
    notFound();
  }

  const alert = normalizeAlert(alertDoc);

  return (
    <main className="min-h-screen bg-(--alert-page-bg) px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h1 className="mt-2 text-3xl font-bold text-emerald-950">
            {alert.name}
          </h1>
          <p className="mt-2 text-slate-600">{alert.description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center">
          <div className="w-full max-w-md min-h-45 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">
              Severity Level
            </p>
            <p className="mt-4 text-base font-semibold leading-7">
              {alert.severity}
            </p>
            <PercentageCircle value={alert.percentage} />
          </div>

          <div className="w-full max-w-md min-h-45 rounded-2xl border border-orange-200 bg-orange-50 p-5 text-orange-800 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">
              Affected Areas
            </p>
            <p className="mt-4 text-base font-semibold leading-7">
              {alert.location}
            </p>
          </div>

          <div className="w-full max-w-md min-h-45 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">
              Triggered Condition
            </p>
            <div className="mt-4 space-y-2 text-sm font-medium leading-6 text-amber-900">
              {alert.triggerConditions.map((condition) => (
                <div
                  key={condition.label}
                  className="flex items-center justify-between gap-3 rounded-lg bg-white/60 px-2 py-1.5"
                >
                  <span>{condition.label}</span>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
                    {condition.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md min-h-45 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-80">
              Recommended Actions
            </p>
            <div className="mt-4 space-y-3 text-sm font-medium leading-6 text-emerald-900">
              {alert.recommendation.map((step) => (
                <label key={step} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-emerald-700 accent-emerald-700"
                  />
                  <span>{step}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

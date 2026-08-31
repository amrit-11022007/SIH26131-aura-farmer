import AlertCard from "../dashboard/Card";
import clientPromise from "@/lib/mongodb";
import type { CardData } from "@/app/types/components";

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
    id: String(doc._id ?? doc.id ?? "alert"),
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

export default async function AlertPage() {
  let alertData: CardData[] = [];

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB ?? "sih131");
    const alerts = await db.collection("farmerData").find({}).toArray();

    alertData = alerts.map((alert) => normalizeAlert(alert));
  } catch (error) {
    console.error("Failed to fetch alerts from MongoDB:", error);
    return (
      <main className="min-h-screen bg-(--alert-page-bg) px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-emerald-950">Active Alerts</h1>
          <p className="mt-3 text-slate-600">
            Unable to load alerts from MongoDB right now.
          </p>
          <p className="mt-2 text-sm text-red-600">
            Check your Mongo connection string and database access.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-(--alert-page-bg) px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mt-2 text-3xl font-bold text-emerald-950">
            Active Alerts
          </h1>
          <p className="mt-2 text-slate-600">
            {alertData.length} proactive warnings for your monitored fields.
          </p>
        </div>

        {alertData.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600">No active alerts found in MongoDB.</p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {alertData.map((item) => (
              <AlertCard key={`${item.type}-${item.name}`} data={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

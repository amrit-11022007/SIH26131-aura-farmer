import AlertCard from "../components/Card";
import { alertData } from "../data/alerts";

export default function Alert() {
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

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {alertData.map((item) => (
            <AlertCard key={`${item.type}-${item.name}`} data={item} />
          ))}
        </div>
      </div>
    </main>
  );
}

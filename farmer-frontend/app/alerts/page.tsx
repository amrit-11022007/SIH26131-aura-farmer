import AlertCard, { type CardData } from "../components/Card";

const alertData: CardData[] = [
  {
    type: "Weather",
    name: "Heavy Rain Warning",
    timing: "2h",
    severity: "High",
    location: "North Farmland Block A",
    description:
      "Forecast indicates intense rainfall in the next 6 hours, increasing the risk of crop waterlogging and nutrient loss.",
    recommendation:
      "Drain excess water from low-lying fields and postpone irrigation for 24 hours.",
    link: "/alerts/report/heavy-rain",
  },
  {
    type: "Pest",
    name: "Brown Planthopper Alert",
    timing: "4d",
    severity: "Critical",
    location: "Rice Plot 12",
    description:
      "A sudden rise in pest pressure has been detected in the region, with visible feeding damage on the crop canopy.",
    recommendation:
      "Inspect affected rows immediately and apply recommended integrated pest management treatment.",
    link: "/alerts/report/planthopper",
  },
];

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

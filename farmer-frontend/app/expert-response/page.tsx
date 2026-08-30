import { ExpertCard } from "@/app/components/expert-response/ExpertCard";
import { expertResponses } from "@/app/data/expertResponse";

export default function ExpertResponsePage() {
  return (
    <main className="min-h-screen bg-[#f6f9f5] px-4 py-8 text-slate-900 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Crop advisory updates
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
            Recommendations from agronomists and crop specialists based on the
            latest field observations.
          </p>
        </div>

        <div className="grid gap-5">
          {expertResponses.map((expert) => (
            <ExpertCard
              key={expert.id}
              name={expert.name}
              location={expert.location}
              position={expert.position}
              timing={expert.timing}
              description={expert.description}
            />
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm md:p-6">
          <label
            htmlFor="question"
            className="mb-3 block text-sm font-semibold text-slate-700"
          >
            Ask a question
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <input
              id="question"
              type="text"
              placeholder="Type your question for the expert team..."
              className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
            />
            <button
              type="button"
              className="h-12 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white transition hover:bg-emerald-800"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

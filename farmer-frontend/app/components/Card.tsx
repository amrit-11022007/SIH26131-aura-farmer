import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface CardData {
  type: string;
  name: string;
  timing: string;
  severity: string;
  location: string;
  description: string;
  recommendation: string;
  link: string;
}

const cardBorderStyles: Record<string, string> = {
  low: "border-[#1F8A70] shadow-[0_0_0_1px_#1F8A70] shadow-sm",
  medium: "border-[#F2C94C] shadow-[0_0_0_1px_#F2C94C] shadow-sm",
  high: "border-[#FC8F34] shadow-[0_0_0_1px_#FC8F34] shadow-sm",
  critical: "border-[#BA1A1A] shadow-[0_0_0_1px_#BA1A1A] shadow-sm",
};

const badgeStyles: Record<string, string> = {
  low: "border border-[#1F8A70] bg-[#E8F7F3] text-[#1F8A70]",
  medium: "border border-[#E9B949] bg-[#FFF4D6] text-[#A66B00]",
  high: "border border-[#FC8F34] bg-[#FFF0E3] text-[#C86200]",
  critical: "border border-[#BA1A1A] bg-[#FDEAEA] text-[#BA1A1A]",
};

export function AlertCard({ data }: { data: CardData }) {
  const level = data.severity.toLowerCase();
  const cardStyle =
    cardBorderStyles[level] ??
    "border-[#64748B] shadow-[0_0_0_1px_#64748B] shadow-sm";
  const badgeStyle =
    badgeStyles[level] ?? "border border-[#64748B] bg-[#EEF2F7] text-[#475569]";

  return (
    <Card
      className={clsx(
        "w-full max-w-md border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        cardStyle,
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardAction className="mb-2 flex justify-start">
              <span
                className={clsx(
                  "inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold",
                  badgeStyle,
                )}
              >
                {data.severity}
              </span>
            </CardAction>

            <CardTitle className="text-lg font-semibold text-slate-900">
              {data.name}
            </CardTitle>
          </div>

          <CardDescription className="mt-1 text-right text-xs text-slate-500">
            <span>{data.timing}</span>
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        <p className="text-sm leading-6 text-slate-600">{data.description}</p>

        <span className="bg-[#FFE9E3] text-[#944A00] inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold mx-2">
          {data.location}
        </span>
        <span className="bg-[#FFE9E3] text-[#944A00] inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold mx-2">
          {data.type}
        </span>

        <div className="rounded-xl bg-amber-50 p-3 text-sm text-slate-700 ring-1 ring-amber-100">
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800">
            Recommendation
          </p>
          <p>{data.recommendation}</p>
        </div>
      </CardContent>

      <CardFooter className="border-t border-slate-100 bg-slate-50/80 px-4 py-3">
        <a href={data.link} className="mx-auto inline-flex">
          <Button
            type="button"
            size="lg"
            className="rounded-full bg-emerald-950 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900"
          >
            View Details
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}

export default AlertCard;

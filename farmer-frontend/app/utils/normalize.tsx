/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CardData } from "@/app/types/components";

export function normalizeAlert(doc: Record<string, any>): CardData {
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

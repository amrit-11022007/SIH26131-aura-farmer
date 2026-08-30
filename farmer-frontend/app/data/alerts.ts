import { type CardData } from "../types/components";

export const alertData: CardData[] = [
  {
    id: "heavy-rain",
    type: "Weather",
    name: "Heavy Rain Warning",
    timing: "2h",
    severity: "High",
    percentage: 82,
    location: "North Farmland Block A",
    description:
      "Forecast indicates intense rainfall in the next 6 hours, increasing the risk of crop waterlogging and nutrient loss.",
    triggerConditions: [
      { label: "Rainfall", value: "86 mm/hr" },
      { label: "Humidity", value: "92%" },
      { label: "Soil saturation", value: "High" },
    ],
    recommendation: [
      "Drain excess water from low-lying fields.",
      "Postpone irrigation for 24 hours.",
      "Inspect drainage channels before the next cycle.",
    ],
  },
  {
    id: "brown-planthopper",
    type: "Pest",
    name: "Brown Planthopper Alert",
    timing: "4d",
    severity: "Critical",
    percentage: 94,
    location: "Rice Plot 12",
    description:
      "A sudden rise in pest pressure has been detected in the region, with visible feeding damage on the crop canopy.",
    triggerConditions: [
      { label: "Humidity", value: "88%" },
      { label: "Pest density", value: "4.6 insects/plant" },
      { label: "Temperature", value: "31°C" },
    ],
    recommendation: [
      "Inspect affected rows immediately.",
      "Apply recommended integrated pest management treatment.",
      "Monitor the field every 12 hours for new hotspots.",
    ],
  },
];

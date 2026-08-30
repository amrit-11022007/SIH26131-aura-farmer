export type ExpertResponseItem = {
  id: string;
  requestId: string;
  name: string;
  location: string;
  position: string;
  timing: string;
  description: string;
};

export const expertResponses: ExpertResponseItem[] = [
  {
    id: "1",
    requestId: "blight",
    name: "Dr. Aditi Kale",
    location: "Nashik",
    position: "Plant Pathologist",
    timing: "Today, 4:30 PM",
    description:
      "Recommended reducing irrigation frequency and checking for early blight symptoms in the lower canopy. Soil moisture looks slightly elevated for this phase of the crop cycle.",
  },
  {
    id: "2",
    requestId: "blight",
    name: "Prasad Nair",
    location: "Pune",
    position: "Agronomy Advisor",
    timing: "Today, 2:15 PM",
    description:
      "Suggested a localized nutrient correction plan and advised field scouting around the western edge of the plot where leaf curling was first observed.",
  },
  {
    id: "3",
    requestId: "red root",
    name: "Dr. Meera Rao",
    location: "Aurangabad",
    position: "Crop Health Specialist",
    timing: "Yesterday, 7:40 PM",
    description:
      "Confirmed the risk pattern matches mild fungal stress under humid conditions. A preventive spray and drainage check are advisable before the next rainfall cycle.",
  },
];

import { Lang } from "./translation";

export type CaseKey = "healthy" | "medium" | "severe";

export const cases: Record<
  CaseKey,
  {
    severity: number;
    badge: "low" | "med" | "high";
    badgeText: string;
    checklist: Record<Lang, string[]>;
    safety: string | Record<Lang, string>;
    refer: boolean;
  }
> = {
  healthy: {
    severity: 4,
    badge: "low",
    badgeText: "badgeLow",
    checklist: {
      en: [
        "Continue weekly visual monitoring",
        "No treatment needed at this stage",
      ],
      hi: ["साप्ताहिक निगरानी जारी रखें", "इस चरण में उपचार की आवश्यकता नहीं"],
      mr: ["साप्ताहिक देखरेख सुरू ठेवा", "या टप्प्यावर उपचाराची गरज नाही"],
    },
    safety: "safety1",
    refer: false,
  },
  medium: {
    severity: 42,
    badge: "med",
    badgeText: "badgeMed",
    checklist: {
      en: [
        "Remove and destroy affected lower leaves",
        "Improve airflow — space plants, avoid overhead watering",
        "Apply neem-based spray every 5–7 days (IPM first)",
        "Rescan in 4 days to track spread",
      ],
      hi: [
        "प्रभावित निचली पत्तियों को हटाकर नष्ट करें",
        "हवा का बहाव बेहतर करें — पौधों में दूरी रखें",
        "हर 5–7 दिन में नीम आधारित स्प्रे करें (पहले IPM)",
        "फैलाव देखने के लिए 4 दिन में फिर स्कैन करें",
      ],
      mr: [
        "प्रभावित खालची पाने काढून नष्ट करा",
        "हवा खेळती ठेवा — रोपांमध्ये अंतर ठेवा",
        "दर 5–7 दिवसांनी निंबोळी आधारित फवारणी करा (आधी IPM)",
        "प्रसार तपासण्यासाठी 4 दिवसांनी पुन्हा स्कॅन करा",
      ],
    },
    safety: {
      en: "Chemical fungicide only if spread continues after 7 days. Wear gloves and mask when spraying.",
      hi: "7 दिनों बाद भी फैलाव जारी रहे तो ही रासायनिक फफूंदनाशक। छिड़काव करते समय दस्ताने और मास्क पहनें।",
      mr: "7 दिवसांनंतरही प्रसार सुरू राहिल्यास रासायनिक बुरशीनाशक. फवारणी करताना हातमोजे व मास्क वापरा.",
    },
    refer: false,
  },
  severe: {
    severity: 78,
    badge: "high",
    badgeText: "badgeHigh",
    checklist: {
      en: [
        "Isolate affected plants — do not compost infected material",
        "Do not spray until expert confirms species",
        "Photograph and keep for lab reference",
      ],
      hi: [
        "प्रभावित पौधों को अलग करें — संक्रमित सामग्री खाद न बनाएं",
        "विशेषज्ञ पुष्टि तक स्प्रे न करें",
        "फोटो लेकर लैब संदर्भ के लिए रखें",
      ],
      mr: [
        "प्रभावित रोपे वेगळी करा — संक्रमित सामग्रीचे खत करू नका",
        "तज्ज्ञांची खात्री होईपर्यंत फवारणी करू नका",
        "फोटो घेऊन प्रयोगशाळा संदर्भासाठी ठेवा",
      ],
    },
    safety: {
      en: "Low model confidence on this rare presentation.",
      hi: "इस दुर्लभ स्थिति पर मॉडल का भरोसा कम है।",
      mr: "या दुर्मिळ स्थितीवर मॉडेलचा विश्वास कमी आहे.",
    },
    refer: true,
  },
};

export const titles: Record<CaseKey, Record<Lang, [string, string]>> = {
  healthy: {
    en: [
      "Healthy — no disease detected",
      "Confidence 97% · Tomato, flowering stage",
    ],
    hi: ["स्वस्थ — कोई रोग नहीं मिला", "भरोसा 97% · टमाटर, फूल अवस्था"],
    mr: [
      "निरोगी — कोणताही रोग आढळला नाही",
      "विश्वासार्हता 97% · टोमॅटो, फुलोऱ्याची अवस्था",
    ],
  },
  medium: {
    en: [
      "Early blight (Alternaria solani)",
      "Confidence 89% · Tomato, vegetative stage",
    ],
    hi: [
      "अर्ली ब्लाइट (Alternaria solani)",
      "भरोसा 89% · टमाटर, वानस्पतिक अवस्था",
    ],
    mr: [
      "अर्ली ब्लाइट (Alternaria solani)",
      "विश्वासार्हता 89% · टोमॅटो, वाढीची अवस्था",
    ],
  },
  severe: {
    en: [
      "Late blight — likely (Phytophthora infestans)",
      "Confidence 54% · Potato, tuber initiation",
    ],
    hi: [
      "लेट ब्लाइट — संभावित (Phytophthora infestans)",
      "भरोसा 54% · आलू, कंद प्रारंभ अवस्था",
    ],
    mr: [
      "लेट ब्लाइट — संभाव्य (Phytophthora infestans)",
      "विश्वासार्हता 54% · बटाटा, कंद सुरुवात अवस्था",
    ],
  },
};

export const hotspotLevels: ("" | "l1" | "l2" | "l3")[] = [
  "",
  "l1",
  "l1",
  "l1",
  "l2",
  "l1",
  "l3",
  "l1",
  "l2",
  "l1",
  "l1",
  "l3",
  "l1",
  "l2",
  "l1",
  "l1",
  "l1",
  "l2",
  "l1",
  "l1",
  "l3",
  "l1",
  "l1",
  "l2",
  "l1",
  "l1",
  "l1",
  "l2",
  "l1",
  "l1",
  "l1",
  "l3",
  "l1",
  "l1",
  "l2",
  "l1",
];

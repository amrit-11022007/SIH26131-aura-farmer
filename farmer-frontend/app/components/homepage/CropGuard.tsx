'use client';
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Lang = "en" | "hi" | "mr";
type CaseKey = "healthy" | "medium" | "severe";

/* ---------------- i18n dictionary ---------------- */
const translations: Record<Lang, Record<string, string>> = {
  en: {
    nav1: "How it works", nav2: "Try a scan", nav3: "Officer view", nav4: "Alerts", navOfficer: "Officer login →",
    heroEyebrow: "Smart India Hackathon · Govt. of Maharashtra",
    heroTitle: "Catch crop disease <em>before</em> it spreads.",
    heroLede: "Point your phone at a leaf. CropGuard identifies the disease or pest, forecasts outbreak risk from weather and field data, and gives a safe, local-language plan — even offline.",
    heroCta1: "Try a diagnosis", heroCta2: "See officer dashboard",
    stat1: "languages, more on the way", stat2: "works without signal", stat3: "pesticide only as last step",
    phoneTop1: "Field · Nashik Tal.", phoneTop2: "Scanning…",
    phoneRingLabel: "Leaf damage detected", phoneRingSub: "Early blight · analysing", phoneCta: "View advisory",
    probEyebrow: "The problem", probTitle: "Damage is visible long before help arrives.",
    probBody: "Farmers spot disease only after it has spread. Extension staff cover huge areas, and weather, crop stage, soil and local pest history are never combined into one farm-level alert — so treatment is late, or the wrong pesticide is used.",
    solEyebrow: "What CropGuard does", solTitle: "One system, from symptom to safe action.",
    solBody: "Image-based detection, weather-driven risk forecasting, geospatial hotspot mapping, expert-validated multilingual advisories, and officer dashboards — learning from every field confirmation.",
    pillarsEyebrow: "Four pillars", pillarsTitle: "Detect, predict, advise, coordinate.",
    pillarsSub: "Each pillar maps directly to a gap in today's extension system.",
    p1Title: "Detect", p1Body: "On-device image classification of disease, pest species and growth stage — plus leaf-area segmentation to score severity, not just a yes/no.",
    p1L1: "Lightweight model, works offline", p1L2: "% damage, not a guess",
    p2Title: "Predict", p2Body: "Weather, crop stage, variety and local pest history feed a risk model that flags outbreaks before symptoms even show.",
    p2L1: "Proactive alerts, before damage", p2L2: "Hotspot clustering on the map",
    p3Title: "Advise", p3Body: "A grounded advisory engine turns raw results into safe, local-language steps — IPM first, pesticide only with dosage and PPE guidance.",
    p3L1: "Voice assistant, low-literacy friendly", p3L2: "Low confidence → routed to an expert",
    p4Title: "Coordinate", p4Body: "Officers get district-level dashboards, trend graphs and exportable reports — prioritising field visits where risk is highest.",
    p4L1: "Field confirmations retrain the model", p4L2: "Alert digest by taluka/district",
    demoEyebrow: "Try it", demoTitle: "Tap a sample leaf to see a diagnosis.", demoSub: "In the real app this comes from your camera. Here are three sample results.",
    case1Title: "Healthy leaf", case1Sub: "Tomato · no action needed",
    case2Title: "Early blight", case2Sub: "Tomato · moderate severity",
    case3Title: "Late blight", case3Sub: "Potato · severe, low confidence",
    badgeLow: "Low risk", badgeMed: "Moderate risk", badgeHigh: "High risk",
    ringSeverity: "Estimated damage", ringSub1: "Leaf area affected",
    advH4: "Recommended actions",
    referNote: "Confidence is low for this case — this scan has been routed to an agriculture expert for review. You'll be notified within 24 hours.",
    voiceEyebrow: "Voice assistant", voiceTitle: "Ask a question, get a spoken answer.",
    voiceBody: "Built for low-literacy users — speak in your language, hear the advisory read back, no typing required.",
    chat1: "I already sprayed once, what should I do now?", chat2: "Since you've already sprayed, wait 5 days before reapplying. Watch for new spots and rescan if damage grows.",
    chat3: "Is this safe near harvest?", chat4: "This product needs a 7-day pre-harvest interval. Based on your sowing date, you're clear to use it now.",
    micHint: "Tap to ask in Hindi, Marathi or English",
    dashEyebrow: "For extension officers", dashTitle: "District risk, at a glance.", dashSub: "Prioritise field visits by outbreak probability, not by which village called first.",
    stat4: "Fields scanned this week", stat5: "Active high-risk alerts", stat6: "Avg. detection confidence", stat7: "Cases referred to lab",
    panel1Title: "Confirmed cases, last 7 days", panel2Title: "Outbreak hotspots",
    hotspotLegend: "Green = low · Amber = watch · Red = priority visit",
    alertsEyebrow: "Proactive alerts", alertsTitle: "Warnings before symptoms appear.", alertsSub: "Triggered by forecasted humidity, temperature and rainfall conducive to known pests.",
    alert1Title: "Late blight risk rising — Nashik Tal.", alert1Body: "High humidity forecast for 3 days. Inspect potato fields today.", alert1Time: "2h ago",
    alert2Title: "Fruit borer conducive conditions — Sinnar", alert2Body: "Rising night temperatures. Check pheromone traps this week.", alert2Time: "6h ago",
    alert3Title: "Routine monitoring reminder — Igatpuri", alert3Body: "No elevated risk. Continue weekly scans as usual.", alert3Time: "1d ago",
    trust1Title: "Confidence-aware referral", trust1Body: "Uncertain or rare cases go to a human expert, never a guess.",
    trust2Title: "Learns from field confirmations", trust2Body: "Every verified diagnosis retrains the model for your region.",
    trust3Title: "Offline-first", trust3Body: "Runs on-device where signal is patchy; syncs when back online.",
    footerNote: "Built for farmers and extension officers",
    safety1: "Continue routine monitoring. No pesticide required.",
    res1Title: "Healthy — no disease detected", res1Sub: "Confidence 97% · Tomato, flowering stage"
  },
  hi: {
    nav1: "यह कैसे काम करता है", nav2: "स्कैन आज़माएं", nav3: "अधिकारी दृश्य", nav4: "अलर्ट", navOfficer: "अधिकारी लॉगिन →",
    heroEyebrow: "स्मार्ट इंडिया हैकाथॉन · महाराष्ट्र सरकार",
    heroTitle: "फसल रोग फैलने से <em>पहले</em> पकड़ें।",
    heroLede: "अपने फोन को पत्ती पर रखें। CropGuard रोग या कीट की पहचान करता है, मौसम और खेत के डेटा से खतरे का पूर्वानुमान लगाता है, और सुरक्षित, स्थानीय भाषा में सलाह देता है — ऑफ़लाइन भी।",
    heroCta1: "निदान आज़माएं", heroCta2: "अधिकारी डैशबोर्ड देखें",
    stat1: "भाषाएं, और जल्द आएंगी", stat2: "बिना नेटवर्क के काम करता है", stat3: "कीटनाशक अंतिम विकल्प",
    phoneTop1: "खेत · नासिक तालुका", phoneTop2: "स्कैन हो रहा है…",
    phoneRingLabel: "पत्ती को नुकसान मिला", phoneRingSub: "अर्ली ब्लाइट · विश्लेषण जारी", phoneCta: "सलाह देखें",
    probEyebrow: "समस्या", probTitle: "मदद पहुंचने से पहले ही नुकसान दिखने लगता है।",
    probBody: "किसान रोग को तभी पहचानते हैं जब वह फैल चुका होता है। विस्तार कर्मचारी बड़े क्षेत्र संभालते हैं, और मौसम, फसल अवस्था, मिट्टी व स्थानीय कीट इतिहास कभी एक साथ नहीं जुड़ते — जिससे इलाज देर से होता है या गलत कीटनाशक इस्तेमाल होता है।",
    solEyebrow: "CropGuard क्या करता है", solTitle: "लक्षण से सुरक्षित कार्रवाई तक, एक ही सिस्टम।",
    solBody: "छवि-आधारित पहचान, मौसम-आधारित जोखिम पूर्वानुमान, भौगोलिक हॉटस्पॉट मैपिंग, विशेषज्ञ-सत्यापित बहुभाषी सलाह, और अधिकारी डैशबोर्ड — हर खेत की पुष्टि से सीखते हुए।",
    pillarsEyebrow: "चार स्तंभ", pillarsTitle: "पहचानें, पूर्वानुमान करें, सलाह दें, समन्वय करें।",
    pillarsSub: "हर स्तंभ आज की विस्तार प्रणाली की एक कमी को दूर करता है।",
    p1Title: "पहचान", p1Body: "रोग, कीट प्रजाति और वृद्धि अवस्था की ऑन-डिवाइस पहचान — साथ ही गंभीरता आंकने के लिए पत्ती-क्षेत्र विश्लेषण।",
    p1L1: "हल्का मॉडल, ऑफ़लाइन काम करता है", p1L2: "अनुमान नहीं, % नुकसान",
    p2Title: "पूर्वानुमान", p2Body: "मौसम, फसल अवस्था, किस्म और स्थानीय कीट इतिहास से जोखिम मॉडल लक्षण दिखने से पहले ही चेतावनी देता है।",
    p2L1: "नुकसान से पहले सक्रिय अलर्ट", p2L2: "मानचित्र पर हॉटस्पॉट क्लस्टरिंग",
    p3Title: "सलाह", p3Body: "एक आधारित सलाह इंजन परिणामों को सुरक्षित, स्थानीय भाषा के कदमों में बदलता है — पहले IPM, कीटनाशक केवल खुराक व सुरक्षा मार्गदर्शन के साथ।",
    p3L1: "कम साक्षरता के लिए वॉयस असिस्टेंट", p3L2: "कम भरोसे पर विशेषज्ञ को भेजा जाता है",
    p4Title: "समन्वय", p4Body: "अधिकारियों को जिला-स्तरीय डैशबोर्ड, ट्रेंड ग्राफ और रिपोर्ट मिलती हैं — सबसे अधिक जोखिम वाले क्षेत्रों को प्राथमिकता।",
    p4L1: "खेत की पुष्टि से मॉडल फिर से सीखता है", p4L2: "तालुका/जिला अनुसार अलर्ट सारांश",
    demoEyebrow: "आज़माएं", demoTitle: "नमूना पत्ती पर टैप करें और निदान देखें।", demoSub: "असली ऐप में यह आपके कैमरे से आता है। यहां तीन नमूना परिणाम हैं।",
    case1Title: "स्वस्थ पत्ती", case1Sub: "टमाटर · कोई कार्रवाई नहीं",
    case2Title: "अर्ली ब्लाइट", case2Sub: "टमाटर · मध्यम गंभीरता",
    case3Title: "लेट ब्लाइट", case3Sub: "आलू · गंभीर, कम भरोसा",
    badgeLow: "कम जोखिम", badgeMed: "मध्यम जोखिम", badgeHigh: "उच्च जोखिम",
    ringSeverity: "अनुमानित नुकसान", ringSub1: "प्रभावित पत्ती क्षेत्र",
    advH4: "सुझाई गई कार्रवाई",
    referNote: "इस मामले में भरोसा कम है — इसे समीक्षा के लिए कृषि विशेषज्ञ के पास भेजा गया है। 24 घंटे में सूचना मिलेगी।",
    voiceEyebrow: "वॉयस असिस्टेंट", voiceTitle: "सवाल पूछें, बोलकर जवाब पाएं।",
    voiceBody: "कम साक्षरता वाले उपयोगकर्ताओं के लिए बनाया गया — अपनी भाषा में बोलें, सलाह सुनें, टाइप करने की ज़रूरत नहीं।",
    chat1: "मैंने पहले ही स्प्रे कर दिया है, अब क्या करूं?", chat2: "चूंकि आपने पहले ही स्प्रे कर दिया है, दोबारा लगाने से पहले 5 दिन रुकें। नए धब्बे दिखें तो फिर स्कैन करें।",
    chat3: "क्या यह कटाई के पास सुरक्षित है?", chat4: "इस उत्पाद के लिए 7 दिन का पूर्व-कटाई अंतराल चाहिए। आपकी बुवाई तारीख के अनुसार, अभी उपयोग सुरक्षित है।",
    micHint: "हिंदी, मराठी या अंग्रेज़ी में पूछने के लिए टैप करें",
    dashEyebrow: "विस्तार अधिकारियों के लिए", dashTitle: "एक नज़र में जिला जोखिम।", dashSub: "किस गांव ने पहले फोन किया इससे नहीं, बल्कि प्रकोप संभावना से दौरे तय करें।",
    stat4: "इस सप्ताह स्कैन किए गए खेत", stat5: "सक्रिय उच्च-जोखिम अलर्ट", stat6: "औसत पहचान भरोसा", stat7: "लैब को भेजे गए मामले",
    panel1Title: "पिछले 7 दिनों के पुष्ट मामले", panel2Title: "प्रकोप हॉटस्पॉट",
    hotspotLegend: "हरा = कम · पीला = नज़र रखें · लाल = प्राथमिकता दौरा",
    alertsEyebrow: "सक्रिय अलर्ट", alertsTitle: "लक्षण दिखने से पहले चेतावनी।", alertsSub: "पूर्वानुमानित नमी, तापमान और वर्षा से जो ज्ञात कीटों के अनुकूल हों।",
    alert1Title: "लेट ब्लाइट जोखिम बढ़ रहा है — नासिक तालुका", alert1Body: "3 दिनों तक उच्च नमी का पूर्वानुमान। आज आलू के खेत देखें।", alert1Time: "2 घंटे पहले",
    alert2Title: "फल छेदक अनुकूल स्थिति — सिन्नर", alert2Body: "रात का तापमान बढ़ रहा है। इस सप्ताह फेरोमोन ट्रैप जांचें।", alert2Time: "6 घंटे पहले",
    alert3Title: "नियमित निगरानी अनुस्मारक — इगतपुरी", alert3Body: "कोई बढ़ा जोखिम नहीं। सामान्य साप्ताहिक स्कैन जारी रखें।", alert3Time: "1 दिन पहले",
    trust1Title: "भरोसा-आधारित रेफरल", trust1Body: "अनिश्चित या दुर्लभ मामले हमेशा विशेषज्ञ के पास जाते हैं, अनुमान नहीं लगाया जाता।",
    trust2Title: "खेत की पुष्टि से सीखता है", trust2Body: "हर सत्यापित निदान आपके क्षेत्र के लिए मॉडल को फिर से प्रशिक्षित करता है।",
    trust3Title: "ऑफ़लाइन-फर्स्ट", trust3Body: "कमज़ोर नेटवर्क में डिवाइस पर चलता है; नेटवर्क आने पर सिंक होता है।",
    footerNote: "किसानों और विस्तार अधिकारियों के लिए बनाया गया",
    safety1: "नियमित निगरानी जारी रखें। कीटनाशक की आवश्यकता नहीं।",
    res1Title: "स्वस्थ — कोई रोग नहीं मिला", res1Sub: "भरोसा 97% · टमाटर, फूल अवस्था"
  },
  mr: {
    nav1: "हे कसे काम करते", nav2: "स्कॅन करून पहा", nav3: "अधिकारी दृश्य", nav4: "अलर्ट", navOfficer: "अधिकारी लॉगिन →",
    heroEyebrow: "स्मार्ट इंडिया हॅकाथॉन · महाराष्ट्र शासन",
    heroTitle: "पीक रोग पसरण्या<em>आधी</em> पकडा.",
    heroLede: "तुमचा फोन पानावर धरा. CropGuard रोग किंवा कीड ओळखतो, हवामान व शेतातील माहितीवरून धोक्याचा अंदाज देतो, आणि सुरक्षित, स्थानिक भाषेत सल्ला देतो — ऑफलाइन सुद्धा.",
    heroCta1: "निदान करून पहा", heroCta2: "अधिकारी डॅशबोर्ड पहा",
    stat1: "भाषा, अजून येत आहेत", stat2: "नेटवर्कशिवाय चालते", stat3: "कीटकनाशक शेवटचा पर्याय",
    phoneTop1: "शेत · नाशिक तालुका", phoneTop2: "स्कॅन सुरू आहे…",
    phoneRingLabel: "पानाचे नुकसान आढळले", phoneRingSub: "अर्ली ब्लाइट · विश्लेषण सुरू", phoneCta: "सल्ला पहा",
    probEyebrow: "समस्या", probTitle: "मदत पोहोचण्याआधीच नुकसान दिसू लागते.",
    probBody: "शेतकऱ्यांना रोग पसरल्यानंतरच लक्षात येतो. विस्तार कर्मचारी मोठे क्षेत्र सांभाळतात, आणि हवामान, पिकाची अवस्था, माती व स्थानिक कीड इतिहास कधीच एकत्र येत नाहीत — त्यामुळे उपचार उशिरा होतो किंवा चुकीचे कीटकनाशक वापरले जाते.",
    solEyebrow: "CropGuard काय करते", solTitle: "लक्षणापासून सुरक्षित कृतीपर्यंत, एकच प्रणाली.",
    solBody: "प्रतिमा-आधारित ओळख, हवामान-आधारित जोखीम अंदाज, भौगोलिक हॉटस्पॉट मॅपिंग, तज्ज्ञ-प्रमाणित बहुभाषिक सल्ला, आणि अधिकारी डॅशबोर्ड — प्रत्येक शेत पडताळणीतून शिकत.",
    pillarsEyebrow: "चार स्तंभ", pillarsTitle: "ओळखा, अंदाज करा, सल्ला द्या, समन्वय करा.",
    pillarsSub: "प्रत्येक स्तंभ आजच्या विस्तार प्रणालीतील एक त्रुटी भरून काढतो.",
    p1Title: "ओळख", p1Body: "रोग, कीड प्रजाती व वाढीच्या अवस्थेची डिव्हाइसवरच ओळख — तसेच तीव्रता मोजण्यासाठी पान-क्षेत्र विश्लेषण.",
    p1L1: "हलके मॉडेल, ऑफलाइन चालते", p1L2: "अंदाज नाही, % नुकसान",
    p2Title: "अंदाज", p2Body: "हवामान, पिकाची अवस्था, जात व स्थानिक कीड इतिहासावरून जोखीम मॉडेल लक्षणे दिसण्याआधीच इशारा देतो.",
    p2L1: "नुकसानाआधी सक्रिय अलर्ट", p2L2: "नकाशावर हॉटस्पॉट क्लस्टरिंग",
    p3Title: "सल्ला", p3Body: "आधारभूत सल्ला यंत्रणा निकालांना सुरक्षित, स्थानिक भाषेतील पावलांमध्ये बदलते — प्रथम IPM, कीटकनाशक फक्त मात्रा व सुरक्षा माहितीसह.",
    p3L1: "कमी साक्षरतेसाठी व्हॉइस असिस्टंट", p3L2: "कमी विश्वासार्हता → तज्ज्ञाकडे पाठवले जाते",
    p4Title: "समन्वय", p4Body: "अधिकाऱ्यांना जिल्हा-स्तरीय डॅशबोर्ड, ट्रेंड आलेख व अहवाल मिळतात — सर्वाधिक जोखमीच्या भागांना प्राधान्य.",
    p4L1: "शेत पडताळणीने मॉडेल पुन्हा शिकते", p4L2: "तालुका/जिल्ह्यानुसार अलर्ट सारांश",
    demoEyebrow: "करून पहा", demoTitle: "नमुना पानावर टॅप करून निदान पहा.", demoSub: "खऱ्या ॲपमध्ये हे तुमच्या कॅमेऱ्यातून येते. इथे तीन नमुना निकाल आहेत.",
    case1Title: "निरोगी पान", case1Sub: "टोमॅटो · कृतीची गरज नाही",
    case2Title: "अर्ली ब्लाइट", case2Sub: "टोमॅटो · मध्यम तीव्रता",
    case3Title: "लेट ब्लाइट", case3Sub: "बटाटा · गंभीर, कमी विश्वासार्हता",
    badgeLow: "कमी जोखीम", badgeMed: "मध्यम जोखीम", badgeHigh: "उच्च जोखीम",
    ringSeverity: "अंदाजे नुकसान", ringSub1: "प्रभावित पान क्षेत्र",
    advH4: "शिफारस केलेल्या कृती",
    referNote: "या प्रकरणात विश्वासार्हता कमी आहे — हे स्कॅन कृषी तज्ज्ञाकडे पुनरावलोकनासाठी पाठवले आहे. 24 तासांत सूचना मिळेल.",
    voiceEyebrow: "व्हॉइस असिस्टंट", voiceTitle: "प्रश्न विचारा, बोलून उत्तर मिळवा.",
    voiceBody: "कमी साक्षरता असलेल्या वापरकर्त्यांसाठी बनवलेले — तुमच्या भाषेत बोला, सल्ला ऐका, टाइप करण्याची गरज नाही.",
    chat1: "मी आधीच फवारणी केली आहे, आता काय करू?", chat2: "तुम्ही आधीच फवारणी केली असल्याने, पुन्हा फवारण्याआधी 5 दिवस थांबा. नवीन डाग दिसल्यास पुन्हा स्कॅन करा.",
    chat3: "काढणीच्या जवळ हे सुरक्षित आहे का?", chat4: "या उत्पादनासाठी 7 दिवसांचा काढणीपूर्व कालावधी आवश्यक आहे. तुमच्या पेरणी तारखेनुसार, आता वापर सुरक्षित आहे.",
    micHint: "हिंदी, मराठी किंवा इंग्रजीत विचारण्यासाठी टॅप करा",
    dashEyebrow: "विस्तार अधिकाऱ्यांसाठी", dashTitle: "एका दृष्टीक्षेपात जिल्हा जोखीम.", dashSub: "कोणत्या गावाने आधी फोन केला यावरून नाही, तर उद्रेक शक्यतेनुसार भेटींना प्राधान्य द्या.",
    stat4: "या आठवड्यात स्कॅन केलेली शेते", stat5: "सक्रिय उच्च-जोखीम अलर्ट", stat6: "सरासरी ओळख विश्वासार्हता", stat7: "प्रयोगशाळेकडे पाठवलेली प्रकरणे",
    panel1Title: "मागील 7 दिवसांतील पुष्ट प्रकरणे", panel2Title: "उद्रेक हॉटस्पॉट",
    hotspotLegend: "हिरवा = कमी · पिवळा = लक्ष ठेवा · लाल = प्राधान्य भेट",
    alertsEyebrow: "सक्रिय अलर्ट", alertsTitle: "लक्षणे दिसण्याआधी इशारे.", alertsSub: "ज्ञात किडींना अनुकूल असलेल्या अंदाजित आर्द्रता, तापमान व पावसामुळे सक्रिय.",
    alert1Title: "लेट ब्लाइट जोखीम वाढत आहे — नाशिक तालुका", alert1Body: "3 दिवस उच्च आर्द्रतेचा अंदाज. आज बटाट्याची शेते तपासा.", alert1Time: "2 तासांपूर्वी",
    alert2Title: "फळ पोखरणाऱ्या किडीसाठी अनुकूल स्थिती — सिन्नर", alert2Body: "रात्रीचे तापमान वाढत आहे. या आठवड्यात फेरोमोन सापळे तपासा.", alert2Time: "6 तासांपूर्वी",
    alert3Title: "नियमित देखरेख स्मरणपत्र — इगतपुरी", alert3Body: "वाढलेली जोखीम नाही. नेहमीप्रमाणे साप्ताहिक स्कॅन सुरू ठेवा.", alert3Time: "1 दिवसापूर्वी",
    trust1Title: "विश्वासार्हता-आधारित रेफरल", trust1Body: "अनिश्चित किंवा दुर्मिळ प्रकरणे नेहमी तज्ज्ञाकडे जातात, अंदाज लावला जात नाही.",
    trust2Title: "शेत पडताळणीतून शिकते", trust2Body: "प्रत्येक पडताळणी केलेले निदान तुमच्या भागासाठी मॉडेल पुन्हा प्रशिक्षित करते.",
    trust3Title: "ऑफलाइन-फर्स्ट", trust3Body: "कमकुवत नेटवर्कमध्ये डिव्हाइसवर चालते; नेटवर्क आल्यावर सिंक होते.",
    footerNote: "शेतकरी आणि विस्तार अधिकाऱ्यांसाठी बनवलेले",
    safety1: "नियमित देखरेख सुरू ठेवा. कीटकनाशकाची गरज नाही.",
    res1Title: "निरोगी — कोणताही रोग आढळला नाही", res1Sub: "विश्वासार्हता 97% · टोमॅटो, फुलोऱ्याची अवस्था"
  }
};

/* ---------------- demo case data ---------------- */
const cases: Record<CaseKey, {
  severity: number;
  badge: "low" | "med" | "high";
  badgeText: string;
  checklist: Record<Lang, string[]>;
  safety: string | Record<Lang, string>;
  refer: boolean;
}> = {
  healthy: {
    severity: 4, badge: "low", badgeText: "badgeLow",
    checklist: {
      en: ["Continue weekly visual monitoring", "No treatment needed at this stage"],
      hi: ["साप्ताहिक निगरानी जारी रखें", "इस चरण में उपचार की आवश्यकता नहीं"],
      mr: ["साप्ताहिक देखरेख सुरू ठेवा", "या टप्प्यावर उपचाराची गरज नाही"]
    },
    safety: "safety1", refer: false
  },
  medium: {
    severity: 42, badge: "med", badgeText: "badgeMed",
    checklist: {
      en: ["Remove and destroy affected lower leaves", "Improve airflow — space plants, avoid overhead watering", "Apply neem-based spray every 5–7 days (IPM first)", "Rescan in 4 days to track spread"],
      hi: ["प्रभावित निचली पत्तियों को हटाकर नष्ट करें", "हवा का बहाव बेहतर करें — पौधों में दूरी रखें", "हर 5–7 दिन में नीम आधारित स्प्रे करें (पहले IPM)", "फैलाव देखने के लिए 4 दिन में फिर स्कैन करें"],
      mr: ["प्रभावित खालची पाने काढून नष्ट करा", "हवा खेळती ठेवा — रोपांमध्ये अंतर ठेवा", "दर 5–7 दिवसांनी निंबोळी आधारित फवारणी करा (आधी IPM)", "प्रसार तपासण्यासाठी 4 दिवसांनी पुन्हा स्कॅन करा"]
    },
    safety: {
      en: "Chemical fungicide only if spread continues after 7 days. Wear gloves and mask when spraying.",
      hi: "7 दिनों बाद भी फैलाव जारी रहे तो ही रासायनिक फफूंदनाशक। छिड़काव करते समय दस्ताने और मास्क पहनें।",
      mr: "7 दिवसांनंतरही प्रसार सुरू राहिल्यास रासायनिक बुरशीनाशक. फवारणी करताना हातमोजे व मास्क वापरा."
    },
    refer: false
  },
  severe: {
    severity: 78, badge: "high", badgeText: "badgeHigh",
    checklist: {
      en: ["Isolate affected plants — do not compost infected material", "Do not spray until expert confirms species", "Photograph and keep for lab reference"],
      hi: ["प्रभावित पौधों को अलग करें — संक्रमित सामग्री खाद न बनाएं", "विशेषज्ञ पुष्टि तक स्प्रे न करें", "फोटो लेकर लैब संदर्भ के लिए रखें"],
      mr: ["प्रभावित रोपे वेगळी करा — संक्रमित सामग्रीचे खत करू नका", "तज्ज्ञांची खात्री होईपर्यंत फवारणी करू नका", "फोटो घेऊन प्रयोगशाळा संदर्भासाठी ठेवा"]
    },
    safety: {
      en: "Low model confidence on this rare presentation.",
      hi: "इस दुर्लभ स्थिति पर मॉडल का भरोसा कम है।",
      mr: "या दुर्मिळ स्थितीवर मॉडेलचा विश्वास कमी आहे."
    },
    refer: true
  }
};

const titles: Record<CaseKey, Record<Lang, [string, string]>> = {
  healthy: {
    en: ["Healthy — no disease detected", "Confidence 97% · Tomato, flowering stage"],
    hi: ["स्वस्थ — कोई रोग नहीं मिला", "भरोसा 97% · टमाटर, फूल अवस्था"],
    mr: ["निरोगी — कोणताही रोग आढळला नाही", "विश्वासार्हता 97% · टोमॅटो, फुलोऱ्याची अवस्था"]
  },
  medium: {
    en: ["Early blight (Alternaria solani)", "Confidence 89% · Tomato, vegetative stage"],
    hi: ["अर्ली ब्लाइट (Alternaria solani)", "भरोसा 89% · टमाटर, वानस्पतिक अवस्था"],
    mr: ["अर्ली ब्लाइट (Alternaria solani)", "विश्वासार्हता 89% · टोमॅटो, वाढीची अवस्था"]
  },
  severe: {
    en: ["Late blight — likely (Phytophthora infestans)", "Confidence 54% · Potato, tuber initiation"],
    hi: ["लेट ब्लाइट — संभावित (Phytophthora infestans)", "भरोसा 54% · आलू, कंद प्रारंभ अवस्था"],
    mr: ["लेट ब्लाइट — संभाव्य (Phytophthora infestans)", "विश्वासार्हता 54% · बटाटा, कंद सुरुवात अवस्था"]
  }
};

/* Fixed hotspot pattern (36 cells) — same as original */
const hotspotLevels: ("" | "l1" | "l2" | "l3")[] = [
  "", "l1", "l1", "l1", "l2", "l1", "l3", "l1", "l2",
  "l1", "l1", "l3", "l1", "l2", "l1", "l1", "l1", "l2",
  "l1", "l1", "l3", "l1", "l1", "l2", "l1", "l1", "l1",
  "l2", "l1", "l1", "l1", "l3", "l1", "l1", "l2", "l1"
];

const CIRC = 2 * Math.PI * 26;

function ringColor(percent: number): string {
  if (percent >= 66) return "var(--alert)";
  if (percent >= 30) return "var(--marigold)";
  return "var(--leaf)";
}

/* ---------------- component ---------------- */
export default function CropGuard() {
  const [lang, setLang] = useState<Lang>("en");
  const [currentCase, setCurrentCase] = useState<CaseKey>("healthy");
  const [heroVal, setHeroVal] = useState(0);
  const heroDir = useRef(1);

  // hero ring animation loop
  useEffect(() => {
    const id = setInterval(() => {
      setHeroVal(v => {
        let next = v + heroDir.current * 2;
        if (next >= 64) { heroDir.current = -1; next = 64; }
        if (next <= 0) { heroDir.current = 1; next = 0; }
        return next;
      });
    }, 60);
    return () => clearInterval(id);
  }, []);

  const t = (key: string) => translations[lang][key] ?? key;
  // helper for strings that may contain inline HTML (e.g. <em>)
  const html = (key: string) => ({ __html: translations[lang][key] ?? key });

  const c = cases[currentCase];
  const [titleMain, titleSub] = titles[currentCase][lang];
  const safetyText = typeof c.safety === "string" ? t(c.safety) : c.safety[lang];
  const demoOffset = CIRC * (1 - c.severity / 100);
  const heroOffset = CIRC * (1 - heroVal / 100);

  return (
    <div className="cg-root">
      <style>{css}</style>

      {/* ---------- NAV ---------- */}
      <header className="site">
        <div className="nav">
          <div className="brand">
            <svg className="leafmark" viewBox="0 0 32 32">
              <path d="M16 3C9 3 4 9 4 16c0 6 4 11 9 12.5C13.5 22 15 15 22 9c-5 3-8 7-9.5 12C21 19 27 12 27 5c-4 0-8 1-11-2z" fill="#3F7D4C" />
            </svg>
            CropGuard
          </div>
          <nav className="nav-links">
            <a href="#pillars">{t("nav1")}</a>
            <a href="#demo">{t("nav2")}</a>
            <a href="#dashboard">{t("nav3")}</a>
            <a href="#alerts">{t("nav4")}</a>
          </nav>
          <div className="nav-right">
            <div className="lang-switch">
              {(["en", "hi", "mr"] as Lang[]).map(l => (
                <button key={l} className={lang === l ? "active" : ""} onClick={() => setLang(l)}>
                  {l === "en" ? "EN" : l === "hi" ? "हिं" : "मरा"}
                </button>
              ))}
            </div>
            <a className="officer-link" href="#dashboard">{t("navOfficer")}</a>
          </div>
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">{t("heroEyebrow")}</p>
            <h1 dangerouslySetInnerHTML={html("heroTitle")} />
            <p className="lede">{t("heroLede")}</p>
            <div className="hero-ctas">
              <a href="#demo" className="btn btn-primary">{t("heroCta1")}</a>
              <Link href="/dashboard" className="btn btn-ghost">{t("heroCta2")}</Link>
            </div>
            <div className="hero-stats">
              <div><strong>3</strong><span>{t("stat1")}</span></div>
              <div><strong>Offline</strong><span>{t("stat2")}</span></div>
              <div><strong>IPM-first</strong><span>{t("stat3")}</span></div>
            </div>
          </div>

          <div className="phone">
            <div className="phone-screen">
              <div className="phone-topbar"><span>{t("phoneTop1")}</span><span>{t("phoneTop2")}</span></div>
              <div className="scan-frame">
                <div className="scan-line" />
                <svg viewBox="0 0 100 100">
                  <path d="M50 8C25 8 10 30 10 52c0 20 14 36 30 40C33 66 40 42 62 22c-15 10-24 24-28 40C58 58 82 38 82 15c-13 0-26 3-32-7z" fill="#3F7D4C" opacity={0.85} />
                </svg>
              </div>
              <div className="ring-wrap">
                <div className="ring">
                  <svg width="64" height="64">
                    <circle className="track" cx="32" cy="32" r="26" />
                    <circle
                      className="fill"
                      cx="32" cy="32" r="26"
                      style={{ strokeDasharray: CIRC, strokeDashoffset: heroOffset, stroke: ringColor(heroVal) }}
                    />
                  </svg>
                  <div className="pct">{heroVal}%</div>
                </div>
                <div className="ring-label">
                  <strong>{t("phoneRingLabel")}</strong>
                  <span>{t("phoneRingSub")}</span>
                </div>
              </div>
              <button className="phone-cta">{t("phoneCta")}</button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- PROBLEM STRIP ---------- */}
      <section className="problem-strip">
        <div className="wrap">
          <div>
            <p className="eyebrow">{t("probEyebrow")}</p>
            <h2>{t("probTitle")}</h2>
            <p>{t("probBody")}</p>
          </div>
          <div>
            <p className="eyebrow">{t("solEyebrow")}</p>
            <h2>{t("solTitle")}</h2>
            <p>{t("solBody")}</p>
          </div>
        </div>
      </section>

      {/* ---------- PILLARS ---------- */}
      <section id="pillars">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t("pillarsEyebrow")}</p>
            <h2>{t("pillarsTitle")}</h2>
            <p>{t("pillarsSub")}</p>
          </div>
          <div className="pillars">
            <div className="pillar">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M12 3v18M5 8l7-5 7 5M4 21h16" /></svg>
              <h3>{t("p1Title")}</h3>
              <p>{t("p1Body")}</p>
              <ul><li>{t("p1L1")}</li><li>{t("p1L2")}</li></ul>
            </div>
            <div className="pillar">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M3 12h4l3-8 4 16 3-8h4" /></svg>
              <h3>{t("p2Title")}</h3>
              <p>{t("p2Body")}</p>
              <ul><li>{t("p2L1")}</li><li>{t("p2L2")}</li></ul>
            </div>
            <div className="pillar">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              <h3>{t("p3Title")}</h3>
              <p>{t("p3Body")}</p>
              <ul><li>{t("p3L1")}</li><li>{t("p3L2")}</li></ul>
            </div>
            <div className="pillar">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M3 3v18h18M7 15l4-5 3 3 5-7" /></svg>
              <h3>{t("p4Title")}</h3>
              <p>{t("p4Body")}</p>
              <ul><li>{t("p4L1")}</li><li>{t("p4L2")}</li></ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DEMO ---------- */}
      <section className="demo" id="demo">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t("demoEyebrow")}</p>
            <h2>{t("demoTitle")}</h2>
            <p>{t("demoSub")}</p>
          </div>
          <div className="demo-grid">
            <div className="sample-cards">
              {([
                ["healthy", "healthy", "case1Title", "case1Sub"],
                ["medium", "medium", "case2Title", "case2Sub"],
                ["severe", "severe", "case3Title", "case3Sub"]
              ] as [CaseKey, string, string, string][]).map(([key, swatch, titleKey, subKey]) => (
                <button
                  key={key}
                  className={"sample-card" + (currentCase === key ? " active" : "")}
                  onClick={() => setCurrentCase(key)}
                >
                  <span className={"swatch " + swatch} />
                  <span><strong>{t(titleKey)}</strong><span>{t(subKey)}</span></span>
                </button>
              ))}
            </div>

            <div className="result-card">
              <div className="result-top">
                <div className="result-title">
                  <strong>{titleMain}</strong>
                  <span>{titleSub}</span>
                </div>
                <span className={"badge " + c.badge}>{t(c.badgeText)}</span>
              </div>
              <div className="ring-wrap">
                <div className="ring">
                  <svg width="64" height="64">
                    <circle className="track" cx="32" cy="32" r="26" />
                    <circle
                      className="fill"
                      cx="32" cy="32" r="26"
                      style={{ strokeDasharray: CIRC, strokeDashoffset: demoOffset, stroke: ringColor(c.severity) }}
                    />
                  </svg>
                  <div className="pct">{c.severity}%</div>
                </div>
                <div className="ring-label">
                  <strong>{t("ringSeverity")}</strong>
                  <span>{t("ringSub1")}</span>
                </div>
              </div>
              <div className="advisory">
                <h4>{t("advH4")}</h4>
                <ul className="checklist">
                  {c.checklist[lang].map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
              <div className="safety-note">{safetyText}</div>
              {c.refer && <div className="refer-note show">{t("referNote")}</div>}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- VOICE ASSISTANT ---------- */}
      <section className="voice-section">
        <div className="wrap">
          <div>
            <p className="eyebrow">{t("voiceEyebrow")}</p>
            <h2>{t("voiceTitle")}</h2>
            <p className="lede" style={{ marginTop: 12, color: "var(--soil-70)", fontSize: 15.5 }}>{t("voiceBody")}</p>
          </div>
          <div className="chat-mock">
            <div className="bubble user">{t("chat1")}</div>
            <div className="bubble bot">{t("chat2")}</div>
            <div className="bubble user">{t("chat3")}</div>
            <div className="bubble bot">{t("chat4")}</div>
            <div className="mic-row">
              <button className="mic" aria-label="Speak">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0M12 19v3" />
                </svg>
              </button>
              <span style={{ fontSize: 13, color: "var(--soil-70)" }}>{t("micHint")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- DASHBOARD ---------- */}
      <section className="dash" id="dashboard">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t("dashEyebrow")}</p>
            <h2>{t("dashTitle")}</h2>
            <p>{t("dashSub")}</p>
          </div>
          <div className="stat-row">
            <div className="stat-card"><strong>214</strong><span>{t("stat4")}</span></div>
            <div className="stat-card"><strong>18</strong><span>{t("stat5")}</span></div>
            <div className="stat-card"><strong>91%</strong><span>{t("stat6")}</span></div>
            <div className="stat-card"><strong>6</strong><span>{t("stat7")}</span></div>
          </div>
          <div className="dash-panels">
            <div className="panel">
              <h3>{t("panel1Title")}</h3>
              <div className="bars">
                {[
                  ["Mon", 30, false], ["Tue", 45, false], ["Wed", 70, true],
                  ["Thu", 38, false], ["Fri", 82, true], ["Sat", 55, false], ["Sun", 40, false]
                ].map(([day, h, risk], i) => (
                  <div key={i} className={risk ? "risk" : ""} style={{ height: `${h}%` }}>
                    <span>{day as string}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel">
              <h3>{t("panel2Title")}</h3>
              <div className="hotspot-grid">
                {hotspotLevels.map((lvl, i) => <i key={i} className={lvl} />)}
              </div>
              <p style={{ fontSize: 12, color: "#C8BFA9", marginTop: 10 }}>{t("hotspotLegend")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ALERTS ---------- */}
      <section id="alerts">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">{t("alertsEyebrow")}</p>
            <h2>{t("alertsTitle")}</h2>
            <p>{t("alertsSub")}</p>
          </div>
          <div className="alerts-list">
            <div className="alert-card high">
              <strong style={{ marginRight: 8 }}>{t("alert1Title")}</strong>
              <p>{t("alert1Body")}</p>
              <time>{t("alert1Time")}</time>
            </div>
            <div className="alert-card warn">
              <strong>{t("alert2Title")}</strong>
              <p>{t("alert2Body")}</p>
              <time>{t("alert2Time")}</time>
            </div>
            <div className="alert-card">
              <strong>{t("alert3Title")}</strong>
              <p>{t("alert3Body")}</p>
              <time>{t("alert3Time")}</time>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TRUST STRIP ---------- */}
      <section className="trust-section">
        <div className="wrap">
          <div className="trust">
            <div className="trust-item">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6z" /></svg>
              <div><strong>{t("trust1Title")}</strong><p>{t("trust1Body")}</p></div>
            </div>
            <div className="trust-item">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M3 12a9 9 0 1 0 9-9M3 12l3-3M3 12l3 3" /></svg>
              <div><strong>{t("trust2Title")}</strong><p>{t("trust2Body")}</p></div>
            </div>
            <div className="trust-item">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}><path d="M12 19V5M5 12l7-7 7 7" /></svg>
              <div><strong>{t("trust3Title")}</strong><p>{t("trust3Body")}</p></div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap">
          <span>CropGuard — SIH 2026 · Problem Statement 26131 · Govt. of Maharashtra</span>
          <span>{t("footerNote")}</span>
        </div>
      </footer>
    </div>
  );
}

/* ---------------- scoped CSS (same design system as the HTML version) ---------------- */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Noto+Sans:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');

.cg-root{
  --soil:#2E241D; --soil-70:#5A4A3E; --leaf:#3F7D4C; --leaf-dark:#2C5A38; --leaf-pale:#E7F0E1;
  --marigold:#E0900F; --marigold-pale:#FBEBCE; --alert:#C1443C; --alert-pale:#F7E2DF;
  --sky:#4C7A94; --sky-pale:#E3EDF1; --paper:#F4F0E4; --paper-raised:#FFFDF7; --line:#DCD5C3;
  --radius:14px; --font-display:'Fraunces', serif; --font-body:'Noto Sans','Noto Sans Devanagari', sans-serif;
  font-family:var(--font-body); background:var(--paper); color:var(--soil); line-height:1.5;
  -webkit-font-smoothing:antialiased;
}
.cg-root *{box-sizing:border-box;}
.cg-root img,.cg-root svg{display:block;max-width:100%;}
.cg-root a{color:inherit;text-decoration:none;}
.cg-root h1,.cg-root h2,.cg-root h3{font-family:var(--font-display);font-weight:600;margin:0;color:var(--soil);}
.cg-root p{margin:0;}
.cg-root button{font-family:inherit;cursor:pointer;}
.cg-root :focus-visible{outline:3px solid var(--sky);outline-offset:2px;}
@media (prefers-reduced-motion: reduce){
  .cg-root *{animation-duration:0.001ms !important; animation-iteration-count:1 !important; transition-duration:0.001ms !important;}
}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px;}
.eyebrow{font-size:12px;letter-spacing:.08em;text-transform:uppercase;font-weight:600;color:var(--leaf-dark);display:flex;align-items:center;gap:8px;}
.eyebrow::before{content:"";width:16px;height:2px;background:var(--marigold);display:inline-block;}
header.site{position:sticky;top:0;z-index:40;background:rgba(244,240,228,0.92);backdrop-filter:blur(6px);border-bottom:1px solid var(--line);}
.nav{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;max-width:1180px;margin:0 auto;gap:12px;}
.brand{display:flex;align-items:center;gap:10px;font-family:var(--font-display);font-weight:700;font-size:19px;}
.brand .leafmark{width:30px;height:30px;flex:none;}
.nav-links{display:none;gap:26px;font-size:14px;font-weight:500;color:var(--soil-70);}
.nav-links a{padding:6px 0;border-bottom:2px solid transparent;}
.nav-links a:hover{border-bottom-color:var(--marigold);color:var(--soil);}
.nav-right{display:flex;align-items:center;gap:10px;}
.lang-switch{display:flex;background:var(--paper-raised);border:1px solid var(--line);border-radius:999px;padding:3px;}
.lang-switch button{border:none;background:transparent;font-size:12px;font-weight:600;padding:6px 10px;border-radius:999px;color:var(--soil-70);}
.lang-switch button.active{background:var(--leaf);color:#fff;}
.officer-link{display:none;font-size:13px;font-weight:600;color:var(--sky);white-space:nowrap;}
@media(min-width:860px){ .nav-links{display:flex;} .officer-link{display:inline;} }
.hero{padding:56px 0 40px;}
.hero-grid{display:grid;gap:40px;align-items:center;}
@media(min-width:960px){ .hero-grid{grid-template-columns:1.05fr 0.95fr;gap:56px;} }
.hero h1{font-size:clamp(32px,5.4vw,54px);line-height:1.06;letter-spacing:-.01em;}
.hero h1 em{font-style:italic;color:var(--leaf-dark);}
.hero p.lede{margin-top:18px;font-size:17px;color:var(--soil-70);max-width:46ch;}
.hero-ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px;}
.btn{display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:999px;font-weight:600;font-size:15px;border:1px solid transparent;transition:transform .15s ease;}
.btn:hover{transform:translateY(-1px);}
.btn-primary{background:var(--leaf);color:#fff;}
.btn-primary:hover{background:var(--leaf-dark);}
.btn-ghost{background:transparent;border-color:var(--soil);color:var(--soil);}
.hero-stats{display:flex;gap:26px;margin-top:30px;flex-wrap:wrap;}
.hero-stats div{font-size:13px;color:var(--soil-70);}
.hero-stats strong{display:block;font-family:var(--font-display);font-size:22px;color:var(--soil);}
.phone{background:var(--soil);border-radius:34px;padding:14px;width:min(300px,84vw);margin-inline:auto;box-shadow:0 24px 50px -20px rgba(46,36,29,.45);}
.phone-screen{background:var(--paper-raised);border-radius:22px;overflow:hidden;padding:18px 16px 22px;min-height:420px;}
.phone-topbar{display:flex;justify-content:space-between;font-size:11px;color:var(--soil-70);margin-bottom:14px;font-weight:600;}
.scan-frame{position:relative;aspect-ratio:1/1;border-radius:16px;background:var(--leaf-pale);display:flex;align-items:center;justify-content:center;overflow:hidden;border:2px dashed var(--leaf);}
.scan-frame svg{width:58%;}
.scan-line{position:absolute;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--marigold),transparent);top:0;animation:scanmove 2.4s ease-in-out infinite;}
@keyframes scanmove{0%{top:6%;}50%{top:92%;}100%{top:6%;}}
.ring-wrap{display:flex;align-items:center;gap:12px;margin-top:16px;}
.ring-label{font-size:12px;color:var(--soil-70);}
.ring-label strong{display:block;font-size:14px;color:var(--soil);font-weight:700;}
.phone-cta{margin-top:16px;width:100%;background:var(--marigold);color:#fff;border:none;border-radius:12px;padding:12px;font-weight:700;font-size:14px;}
.ring{position:relative;width:64px;height:64px;flex:none;}
.ring svg{transform:rotate(-90deg);}
.ring circle{fill:none;stroke-width:7;}
.ring .track{stroke:var(--line);}
.ring .fill{stroke-linecap:round;transition:stroke-dashoffset .8s ease, stroke .8s ease;}
.ring .pct{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:var(--soil);}
.cg-root section{padding:64px 0;}
.section-head{max-width:640px;margin-bottom:36px;}
.section-head h2{font-size:clamp(24px,3.6vw,34px);margin-top:10px;}
.section-head p{color:var(--soil-70);margin-top:12px;font-size:15.5px;}
.problem-strip{background:var(--soil);color:var(--paper-raised);}
.problem-strip .wrap{display:grid;gap:26px;}
@media(min-width:800px){ .problem-strip .wrap{grid-template-columns:1fr 1fr;align-items:start;} }
.problem-strip h2{color:#fff;font-size:clamp(22px,3vw,30px);}
.problem-strip p{color:#D9D2C2;font-size:15px;margin-top:14px;}
.problem-strip .eyebrow{color:var(--marigold-pale);}
.problem-strip .eyebrow::before{background:var(--marigold);}
.pillars{display:grid;gap:18px;grid-template-columns:1fr;}
@media(min-width:700px){ .pillars{grid-template-columns:1fr 1fr;} }
@media(min-width:1080px){ .pillars{grid-template-columns:repeat(4,1fr);} }
.pillar{background:var(--paper-raised);border:1px solid var(--line);border-radius:var(--radius);padding:24px 20px;display:flex;flex-direction:column;gap:10px;}
.pillar .icon{width:38px;height:38px;color:var(--leaf-dark);}
.pillar h3{font-size:18px;}
.pillar p{font-size:14px;color:var(--soil-70);}
.pillar ul{margin:6px 0 0;padding-left:18px;font-size:13px;color:var(--soil-70);}
.pillar ul li{margin-bottom:4px;}
.demo{background:var(--leaf-pale);}
.demo-grid{display:grid;gap:28px;}
@media(min-width:960px){ .demo-grid{grid-template-columns:0.85fr 1.15fr;} }
.sample-cards{display:flex;flex-direction:column;gap:12px;}
.sample-card{display:flex;align-items:center;gap:14px;background:var(--paper-raised);border:2px solid var(--line);border-radius:12px;padding:14px;text-align:left;width:100%;}
.sample-card.active{border-color:var(--leaf);box-shadow:0 6px 18px -10px rgba(63,125,76,.5);}
.sample-card .swatch{width:46px;height:46px;border-radius:10px;flex:none;}
.sample-card .swatch.healthy{background:linear-gradient(135deg,#7ABF83,#3F7D4C);}
.sample-card .swatch.medium{background:linear-gradient(135deg,#F2C15A,#E0900F);}
.sample-card .swatch.severe{background:linear-gradient(135deg,#E3897F,#C1443C);}
.sample-card strong{display:block;font-size:14.5px;}
.sample-card span{font-size:12.5px;color:var(--soil-70);}
.result-card{background:var(--paper-raised);border-radius:var(--radius);padding:24px;border:1px solid var(--line);}
.result-top{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
.result-title strong{font-size:19px;display:block;}
.result-title span{font-size:13px;color:var(--soil-70);}
.badge{font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;}
.badge.low{background:var(--leaf-pale);color:var(--leaf-dark);}
.badge.med{background:var(--marigold-pale);color:#8A5A05;}
.badge.high{background:var(--alert-pale);color:var(--alert);}
.advisory{margin-top:20px;}
.advisory h4{font-size:13px;text-transform:uppercase;letter-spacing:.06em;color:var(--soil-70);margin-bottom:10px;}
.checklist{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px;}
.checklist li{display:flex;gap:10px;font-size:14.5px;align-items:flex-start;}
.checklist li::before{content:"✓";color:var(--leaf);font-weight:700;flex:none;}
.safety-note{margin-top:16px;background:var(--sky-pale);border-left:3px solid var(--sky);border-radius:8px;padding:12px 14px;font-size:13.5px;color:#2C4A59;}
.refer-note{margin-top:14px;background:var(--marigold-pale);border-left:3px solid var(--marigold);border-radius:8px;padding:12px 14px;font-size:13.5px;color:#7A5107;}
.voice-section .wrap{display:grid;gap:28px;}
@media(min-width:960px){ .voice-section .wrap{grid-template-columns:1fr 1fr;align-items:center;} }
.chat-mock{background:var(--paper-raised);border:1px solid var(--line);border-radius:var(--radius);padding:20px;}
.bubble{max-width:78%;padding:10px 14px;border-radius:14px;font-size:14px;margin-bottom:10px;}
.bubble.user{background:var(--leaf);color:#fff;margin-left:auto;border-bottom-right-radius:4px;}
.bubble.bot{background:var(--paper);border:1px solid var(--line);border-bottom-left-radius:4px;}
.mic-row{display:flex;align-items:center;gap:12px;margin-top:14px;}
.mic{width:46px;height:46px;border-radius:999px;background:var(--marigold);border:none;flex:none;display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:0 0 0 0 rgba(224,144,15,.5);animation:pulse 2.2s infinite;}
@keyframes pulse{0%{box-shadow:0 0 0 0 rgba(224,144,15,.45);}70%{box-shadow:0 0 0 14px rgba(224,144,15,0);}100%{box-shadow:0 0 0 0 rgba(224,144,15,0);}}
.dash{background:var(--soil);color:var(--paper-raised);}
.dash .section-head p{color:#C8BFA9;}
.dash .eyebrow{color:var(--marigold-pale);}
.dash .eyebrow::before{background:var(--marigold);}
.stat-row{display:grid;gap:14px;grid-template-columns:repeat(2,1fr);margin-bottom:22px;}
@media(min-width:700px){ .stat-row{grid-template-columns:repeat(4,1fr);} }
.stat-card{background:#3A2F26;border-radius:12px;padding:16px;border:1px solid #4A3D31;}
.stat-card strong{display:block;font-family:var(--font-display);font-size:26px;}
.stat-card span{font-size:12.5px;color:#C8BFA9;}
.dash-panels{display:grid;gap:18px;}
@media(min-width:960px){ .dash-panels{grid-template-columns:1.2fr 0.8fr;} }
.panel{background:#3A2F26;border-radius:var(--radius);padding:20px;border:1px solid #4A3D31;}
.panel h3{color:#fff;font-size:16px;margin-bottom:14px;}
.bars{display:flex;align-items:flex-end;gap:8px;height:120px;}
.bars > div{flex:1;background:var(--leaf);border-radius:4px 4px 0 0;position:relative;}
.bars > div.risk{background:var(--marigold);}
.bars span{position:absolute;bottom:-20px;left:0;right:0;text-align:center;font-size:10px;color:#C8BFA9;}
.hotspot-grid{display:grid;grid-template-columns:repeat(9,1fr);gap:4px;margin-top:6px;}
.hotspot-grid i{display:block;aspect-ratio:1;border-radius:3px;background:#4A3D31;}
.hotspot-grid i.l1{background:var(--leaf);}
.hotspot-grid i.l2{background:var(--marigold);}
.hotspot-grid i.l3{background:var(--alert);}
.alerts-list{display:flex;flex-direction:column;gap:12px;}
.alert-card{display:flex;gap:14px;align-items:flex-start;background:var(--paper-raised);border:1px solid var(--line);border-left:4px solid var(--sky);border-radius:10px;padding:16px 18px;flex-wrap:wrap;}
.alert-card.warn{border-left-color:var(--marigold);}
.alert-card.high{border-left-color:var(--alert);}
.alert-card strong{display:block;font-size:14.5px;}
.alert-card p{font-size:13.5px;color:var(--soil-70);margin-top:3px;width:100%;}
.alert-card time{font-size:12px;color:var(--soil-70);white-space:nowrap;margin-left:auto;}
.trust{display:grid;gap:16px;grid-template-columns:1fr;}
@media(min-width:700px){ .trust{grid-template-columns:repeat(3,1fr);} }
.trust-item{display:flex;gap:12px;align-items:flex-start;}
.trust-item .icon{width:24px;height:24px;color:var(--leaf-dark);flex:none;margin-top:2px;}
.trust-item strong{display:block;font-size:14.5px;}
.trust-item p{font-size:13px;color:var(--soil-70);margin-top:2px;}
.cg-root footer{border-top:1px solid var(--line);padding:26px 0;font-size:13px;color:var(--soil-70);}
.cg-root footer .wrap{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;}
`;

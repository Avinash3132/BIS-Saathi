/**
 * Static, hardcoded demo content for the BIS-Saathi SIH prototype.
 *
 * Everything the app used to fetch from the Express backend / FastAPI RAG
 * service / blockchain layer lives here as plain data, so the frontend runs
 * with no server, no database and no network access.
 *
 * All records are SYNTHETIC demo data. They are not real BIS certificates,
 * and the "ledger" values below are precomputed demo values — no blockchain
 * is contacted at runtime.
 */

// ─── Standards Assistant: demo knowledge base ─────────────────────────────────
// Source: shared/demoKnowledgeBase.json (same content the demo RAG fallback used)
export const STATIC_KNOWLEDGE_BASE = [
  {
    "id": "water",
    "isNumber": "IS 10500 : 2012",
    "title": {
      "en": "Drinking Water — Specification",
      "hi": "पेयजल — विशिष्टि"
    },
    "sourceFile": "is_10500_drinking_water.txt",
    "page": 14,
    "clause": "Cl. 5.2 — Permissible Limits",
    "keywords": [
      "water",
      "drinking water",
      "packaged water",
      "tap water",
      "pani",
      "पानी",
      "जल",
      "पेयजल"
    ],
    "answer": {
      "en": "For drinking water intended for human consumption, the applicable Indian Standard in the demo knowledge base is IS 10500 : 2012. It sets acceptable and permissible limits for physical, chemical and biological parameters such as turbidity, pH, total dissolved solids and microbial contamination.",
      "hi": "पीने योग्य पानी के लिए, डेमो नॉलेज बेस में लागू भारतीय मानक IS 10500 : 2012 है। यह टर्बिडिटी, pH, कुल घुलित ठोस पदार्थ और सूक्ष्मजीवीय संदूषण जैसे भौतिक, रासायनिक और जैविक मापदंडों की स्वीकार्य सीमाएँ तय करता है।"
    },
    "simple": {
      "en": "Think of it as a safety checklist for drinking water — it says how clean, clear and germ-free water needs to be before it's considered safe to drink.",
      "hi": "इसे पीने के पानी के लिए एक सुरक्षा चेकलिस्ट समझें — यह बताता है कि पानी को सुरक्षित माने जाने से पहले कितना साफ, स्वच्छ और कीटाणु-मुक्त होना चाहिए।"
    },
    "relevantTo": {
      "en": "Consumers, water purifier manufacturers, packaged water bottlers, municipal suppliers.",
      "hi": "उपभोक्ता, वॉटर प्यूरीफायर निर्माता, पैकेज्ड वाटर बॉटलर, नगरपालिका जलापूर्ति विभाग।"
    }
  },
  {
    "id": "cement",
    "isNumber": "IS 269 : 2015",
    "title": {
      "en": "Ordinary Portland Cement — Specification",
      "hi": "ऑर्डिनरी पोर्टलैंड सीमेंट — विशिष्टि"
    },
    "sourceFile": "is_269_cement.txt",
    "page": 7,
    "clause": "Cl. 4.1 — Grades and Composition",
    "keywords": [
      "cement",
      "concrete",
      "construction material",
      "सीमेंट",
      "निर्माण"
    ],
    "answer": {
      "en": "For ordinary Portland cement used in general construction, the demo knowledge base points to IS 269 : 2015. It defines grade classification (33, 43, 53), permissible composition, and minimum compressive strength requirements at 28 days.",
      "hi": "सामान्य निर्माण में उपयोग होने वाले ऑर्डिनरी पोर्टलैंड सीमेंट के लिए, डेमो नॉलेज बेस IS 269 : 2015 दर्शाता है। यह ग्रेड वर्गीकरण (33, 43, 53), संरचना और 28 दिनों में न्यूनतम संपीड़न शक्ति आवश्यकताओं को परिभाषित करता है।"
    },
    "simple": {
      "en": "This is the rulebook that decides how strong a bag of cement has to be before it can be sold for construction, sorted into three strength grades.",
      "hi": "यह वह नियम पुस्तिका है जो तय करती है कि निर्माण के लिए बेचे जाने से पहले सीमेंट की एक बोरी कितनी मजबूत होनी चाहिए, जिसे तीन शक्ति श्रेणियों में बांटा गया है।"
    },
    "relevantTo": {
      "en": "Builders, cement manufacturers, structural engineers, hardware retailers.",
      "hi": "बिल्डर, सीमेंट निर्माता, संरचनात्मक इंजीनियर, हार्डवेयर विक्रेता।"
    }
  },
  {
    "id": "lpg",
    "isNumber": "IS 3196 : 1991",
    "title": {
      "en": "LPG Cylinders — Specification",
      "hi": "एलपीजी सिलेंडर — विशिष्टि"
    },
    "sourceFile": "is_3196_lpg_cylinders.txt",
    "page": 21,
    "clause": "Cl. 8.3 — Periodic Testing",
    "keywords": [
      "lpg",
      "cylinder",
      "gas cylinder",
      "cooking gas",
      "गैस सिलेंडर",
      "एलपीजी"
    ],
    "answer": {
      "en": "For LPG cylinders used for domestic cooking gas, the demo knowledge base references IS 3196 : 1991. It covers material thickness, valve fittings, hydrostatic pressure testing and the periodic re-testing interval before a cylinder can stay in circulation.",
      "hi": "घरेलू खाना पकाने की गैस के लिए उपयोग होने वाले एलपीजी सिलेंडर हेतु, डेमो नॉलेज बेस IS 3196 : 1991 का संदर्भ देता है। यह सामग्री की मोटाई, वाल्व फिटिंग, हाइड्रोस्टेटिक दबाव परीक्षण और सिलेंडर के पुनः परीक्षण अंतराल को कवर करता है।"
    },
    "simple": {
      "en": "It's the safety spec that makes sure the gas cylinder in your kitchen won't leak or burst, and that it gets re-checked every so often.",
      "hi": "यह वह सुरक्षा मानक है जो सुनिश्चित करता है कि आपकी रसोई का गैस सिलेंडर लीक या फट न जाए, और समय-समय पर इसकी दोबारा जांच हो।"
    },
    "relevantTo": {
      "en": "Cylinder manufacturers, gas distribution agencies, households, safety inspectors.",
      "hi": "सिलेंडर निर्माता, गैस वितरण एजेंसियां, घर, सुरक्षा निरीक्षक।"
    }
  },
  {
    "id": "helmet",
    "isNumber": "IS 4151 : 2015",
    "title": {
      "en": "Protective Helmets for Two-Wheeler Riders",
      "hi": "दोपहिया वाहन चालकों के लिए सुरक्षा हेलमेट"
    },
    "sourceFile": "is_4151_helmets.txt",
    "page": 9,
    "clause": "Cl. 6.2 — Impact Absorption",
    "keywords": [
      "helmet",
      "two wheeler",
      "motorcycle",
      "bike safety",
      "हेलमेट",
      "दोपहिया"
    ],
    "answer": {
      "en": "For helmets worn by two-wheeler riders, the demo knowledge base references IS 4151 : 2015. It specifies shell strength, impact absorption performance, strap retention and minimum field of vision requirements.",
      "hi": "दोपहिया वाहन चालकों द्वारा पहने जाने वाले हेलमेट के लिए, डेमो नॉलेज बेस IS 4151 : 2015 का संदर्भ देता है। यह शेल की मजबूती, प्रभाव अवशोषण क्षमता, स्ट्रैप की पकड़ और न्यूनतम दृष्टि क्षेत्र को निर्दिष्ट करता है।"
    },
    "simple": {
      "en": "This spec decides how well a helmet needs to cushion your head in a fall, and how firmly the strap needs to stay buckled.",
      "hi": "यह मानक तय करता है कि गिरने की स्थिति में हेलमेट को आपके सिर को कितनी अच्छी तरह से सुरक्षा देनी चाहिए, और स्ट्रैप को कितनी मजबूती से बंधा रहना चाहिए।"
    },
    "relevantTo": {
      "en": "Helmet manufacturers, two-wheeler riders, transport authorities.",
      "hi": "हेलमेट निर्माता, दोपहिया चालक, परिवहन प्राधिकरण।"
    }
  },
  {
    "id": "footwear",
    "isNumber": "IS 15298 (Part 2) : 2016",
    "title": {
      "en": "Footwear — General Requirements and Test Methods",
      "hi": "जूते — सामान्य आवश्यकताएं और परीक्षण विधियां"
    },
    "sourceFile": "is_15298_footwear.txt",
    "page": 3,
    "clause": "Cl. 3.4 — Sole Bonding Strength",
    "keywords": [
      "footwear",
      "shoes",
      "sole",
      "leather shoes",
      "जूते",
      "फुटवियर"
    ],
    "answer": {
      "en": "For general footwear quality requirements, the demo knowledge base references IS 15298 (Part 2) : 2016. It covers sole bonding strength, upper material durability, and abrasion resistance test methods.",
      "hi": "सामान्य फुटवियर गुणवत्ता आवश्यकताओं के लिए, डेमो नॉलेज बेस IS 15298 (Part 2) : 2016 का संदर्भ देता है। यह सोल बॉन्डिंग स्ट्रेंथ, ऊपरी सामग्री की स्थायित्व और घर्षण प्रतिरोध परीक्षण विधियों को कवर करता है।"
    },
    "simple": {
      "en": "This is the quality check that makes sure the sole of a shoe won't peel off and the material holds up to regular wear.",
      "hi": "यह वह गुणवत्ता जांच है जो सुनिश्चित करती है कि जूते का सोल अलग न हो और सामग्री नियमित उपयोग में टिकाऊ बनी रहे।"
    },
    "relevantTo": {
      "en": "Footwear manufacturers, quality inspectors, retailers.",
      "hi": "फुटवियर निर्माता, गुणवत्ता निरीक्षक, विक्रेता।"
    }
  }
];

export const NOT_FOUND_TEXT = {
  en: "This information isn't available in the demo knowledge base yet. The demo currently covers drinking water, cement, LPG cylinders, helmets and footwear standards.",
  hi: "यह जानकारी अभी डेमो नॉलेज बेस में उपलब्ध नहीं है। डेमो में फिलहाल पेयजल, सीमेंट, एलपीजी सिलेंडर, हेलमेट और फुटवियर मानक शामिल हैं।",
};

// ─── Certificate verification: synthetic certificate registry ────────────────
// Source: shared/demoCertificates.json.
// certificateHash = keccak256 of the canonical certificate payload and
// transactionRecord = deterministic demo record id; both were precomputed once
// with the original backend logic and are stored here as fixed demo values.
export const STATIC_CERTIFICATES = [
  {
    "certificateId": "BIS-DEMO-001",
    "product": {
      "en": "Packaged Drinking Water — 1L Bottle",
      "hi": "पैकेज्ड पेयजल — 1 लीटर बोतल"
    },
    "manufacturer": "Himjal Springs Pvt. Ltd.",
    "isNumber": "IS 14543 : 2016",
    "issueDate": "2024-01-05",
    "expiryDate": "2027-01-04",
    "status": "VALID",
    "certificateHash": "0x9cef7c512b80e9c3587793826b8755da026219a15c27f99cf91dc2ee8df83789",
    "transactionRecord": "0x5355d9257922b46c3d03856e41463387f3e0ec32"
  },
  {
    "certificateId": "BIS-DEMO-002",
    "product": {
      "en": "Ordinary Portland Cement — 43 Grade",
      "hi": "ऑर्डिनरी पोर्टलैंड सीमेंट — 43 ग्रेड"
    },
    "manufacturer": "Suryoday Cement Works",
    "isNumber": "IS 269 : 2015",
    "issueDate": "2024-02-06",
    "expiryDate": "2027-02-05",
    "status": "VALID",
    "certificateHash": "0x9a8deddd155b0bf8c37427e4c733bfcfc8069e5720fdf44095d3df8617bd077e",
    "transactionRecord": "0xb616774a9ec0bcf78eab986473f138f5b42b94ce"
  },
  {
    "certificateId": "BIS-DEMO-003",
    "product": {
      "en": "Domestic LPG Cylinder — 14.2 kg",
      "hi": "घरेलू एलपीजी सिलेंडर — 14.2 किग्रा"
    },
    "manufacturer": "Bharat Gas Containers Ltd.",
    "isNumber": "IS 3196 : 1991",
    "issueDate": "2024-03-07",
    "expiryDate": "2027-03-06",
    "status": "VALID",
    "certificateHash": "0xee23c5ca56c773cb6ce973e58ab9d9b09c98fc40c5be090d8094d8a8cd0f09df",
    "transactionRecord": "0x136e36d0704dcc08bb7848a2d4451b49fdb7b5de"
  },
  {
    "certificateId": "BIS-DEMO-004",
    "product": {
      "en": "Two-Wheeler Protective Helmet",
      "hi": "दोपहिया सुरक्षा हेलमेट"
    },
    "manufacturer": "SafeRide Helmets India",
    "isNumber": "IS 4151 : 2015",
    "issueDate": "2024-04-08",
    "expiryDate": "2027-04-07",
    "status": "VALID",
    "certificateHash": "0xc9ead312c86049ba70b1798cc2c4e8b7e2702a3a21a5d2c9d02d8dcf5db68a11",
    "transactionRecord": "0x46ad0ed587a4a9f31ce15690e04c6bceae281c47"
  },
  {
    "certificateId": "BIS-DEMO-005",
    "product": {
      "en": "Leather Formal Footwear",
      "hi": "चमड़े के औपचारिक जूते"
    },
    "manufacturer": "Chandan Leather Co.",
    "isNumber": "IS 15298 (Part 2) : 2016",
    "issueDate": "2024-05-09",
    "expiryDate": "2027-05-08",
    "status": "VALID",
    "certificateHash": "0xfad23a57307d41943e796a644ba54ac44dc2d2268f0e0358c23e44d04a7ebf3e",
    "transactionRecord": "0x7d16f192ee53796aeac297754be3f526858093ae"
  },
  {
    "certificateId": "BIS-DEMO-006",
    "product": {
      "en": "Electric Immersion Water Heater",
      "hi": "इलेक्ट्रिक इमर्शन वाटर हीटर"
    },
    "manufacturer": "Ushakiran Appliances",
    "isNumber": "IS 302 (Part 2/Sec 1)",
    "issueDate": "2023-06-10",
    "expiryDate": "2025-06-09",
    "status": "EXPIRED",
    "certificateHash": "0x52b490908e62566e6e152c64c916b1b83be92176ac9b2d133cfff2452dca2f2c",
    "transactionRecord": "0x0385214dd3977a7b9edc9b578d1d006473f28bd4"
  },
  {
    "certificateId": "BIS-DEMO-007",
    "product": {
      "en": "Packaged Drinking Water — 500ml Bottle",
      "hi": "पैकेज्ड पेयजल — 500 मि.ली. बोतल"
    },
    "manufacturer": "Nirmal Aqua Industries",
    "isNumber": "IS 14543 : 2016",
    "issueDate": "2023-07-11",
    "expiryDate": "2025-07-10",
    "status": "EXPIRED",
    "certificateHash": "0xdf3f9fbf8396639107b59762e772dd4c61ff759fd848ee3da265e0e369d5e683",
    "transactionRecord": "0x0c449504553393072bae0cf7540a88fe31250d71"
  },
  {
    "certificateId": "BIS-DEMO-008",
    "product": {
      "en": "Ordinary Portland Cement — 53 Grade",
      "hi": "ऑर्डिनरी पोर्टलैंड सीमेंट — 53 ग्रेड"
    },
    "manufacturer": "Girnar Cement Ltd.",
    "isNumber": "IS 269 : 2015",
    "issueDate": "2024-08-12",
    "expiryDate": "2027-08-11",
    "status": "INVALID",
    "certificateHash": "0xf4424b8127f76c1447b10efa8783daee47837b42d531ed49afec4bb33c62e8c2",
    "transactionRecord": "0xcd1917449deb5722935da175549458db5744f747"
  },
  {
    "certificateId": "BIS-DEMO-009",
    "product": {
      "en": "Domestic LPG Cylinder — 5 kg",
      "hi": "घरेलू एलपीजी सिलेंडर — 5 किग्रा"
    },
    "manufacturer": "Bharat Gas Containers Ltd.",
    "isNumber": "IS 3196 : 1991",
    "issueDate": "2024-09-13",
    "expiryDate": "2027-09-12",
    "status": "VALID",
    "certificateHash": "0x5828eff32e0e6725cb184d1f9e0d96a70f0cf90a9aa8e259f84a01510b4b6ce2",
    "transactionRecord": "0xf45ea7ad6a283b3f58b1c3c6d695864ae3a2e004"
  },
  {
    "certificateId": "BIS-DEMO-010",
    "product": {
      "en": "Two-Wheeler Protective Helmet — Full Face",
      "hi": "दोपहिया सुरक्षा हेलमेट — फुल फेस"
    },
    "manufacturer": "RoadGuard Safety Gear",
    "isNumber": "IS 4151 : 2015",
    "issueDate": "2023-10-14",
    "expiryDate": "2025-10-13",
    "status": "EXPIRED",
    "certificateHash": "0x8c0773a7fb1a47f39b79e5d042bf05d77207311c9988524d5ae29fde3e6e60de",
    "transactionRecord": "0x3707a48fcdf8bfa1ec6f0f8ffc9f038d12ba9ce4"
  }
];

// Label for the simulated integrity record (not a live network).
export const DEMO_LEDGER_NETWORK = "BIS-Saathi Demo Ledger (simulated)";
export const DEMO_LEDGER_NOTE =
  "Simulated proof — static demonstration data. No live blockchain is connected.";

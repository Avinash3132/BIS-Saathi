/**
 * BIS-Saathi Demo Data
 * All data is synthetic and for SIH demonstration only.
 * No real certificates, HUIDs, or regulatory information.
 */

// ─── Manufacturer Wizard Demo Products ─────────────────────────────────────

export const DEMO_PRODUCTS = [
  {
    id: "helmet",
    label: { en: "Steel Protective Helmet (Two-Wheeler)", hi: "स्टील सुरक्षा हेलमेट (दोपहिया)" },
    description: { en: "I make steel helmets for two-wheeler riders", hi: "मैं दोपहिया सवारों के लिए स्टील हेलमेट बनाता हूँ" },
    icon: "🪖",
    standard: {
      isNumber: "IS 4151:2015",
      title: "Protective Helmets for Two-Wheeler Riders",
      year: 2015,
      scope: "Specifies requirements for helmets worn by drivers and riders of two-wheeled motor vehicles. Covers shell construction, impact absorption, strap retention, field of vision, and surface finish.",
      confidence: 94,
      explanation: "Two-wheeler helmets sold in India are mandatorily covered under IS 4151:2015, which aligns with MoRTH road safety regulations. The standard was last revised in 2015 and incorporates updated impact absorption and field-of-vision requirements.",
      citation: "IS 4151:2015 — BIS, New Delhi (Third Revision)",
      mandatoryQCO: "Motor Vehicles (Amendment) Act 2019 — Road Safety QCO",
    },
    scheme: {
      name: "ISI Mark (Scheme I)",
      type: "ISI",
      mandatory: true,
      reason: "Helmets fall under a Quality Control Order issued by MoRTH. Mandatory ISI marking under Scheme I is required before the product can be legally sold in India.",
      qco: "Motor Vehicles (Amendment) Act 2019 QCO",
      description: "Under Scheme I, BIS grants a licence to use the ISI Mark after factory inspection, product sample testing at a BIS-accredited lab, and documentary verification. The licence is valid for 1 year and subject to annual renewal and surprise inspections.",
    },
    checklist: [
      { id: "c1", label: "Factory Layout Plan", description: "Scaled floor plan showing production zones, quality control area, storage, and utilities.", required: true },
      { id: "c2", label: "Test Equipment List", description: "Inventory of calibrated testing equipment including drop-test rig, penetration tester, retention system test apparatus.", required: true },
      { id: "c3", label: "Calibration Certificates", description: "Valid calibration certificates (within 12 months) for all test equipment.", required: true },
      { id: "c4", label: "Raw Material Test Certificates", description: "Lab test reports for ABS/polycarbonate shell material meeting impact strength requirements.", required: true },
      { id: "c5", label: "Manufacturing Process Details", description: "Step-by-step process flow from moulding to final assembly and quality checks.", required: true },
      { id: "c6", label: "Quality Control Documentation", description: "In-process QC checkpoints, final inspection procedure, reject/rework policy, and QC manuals.", required: true },
      { id: "c7", label: "BIS Grant of Licence Application Form", description: "Filled Form IV under the BIS (Conformity Assessment) Regulations 2018.", required: true },
    ],
    fees: {
      application: 1000,
      inspectionPerManDay: 7000,
      estimatedManDays: 2,
      annualLicence: 1000,
      markingFeeBase: 0.5, // % of turnover
      msmeDiscount: 20,
      timeline: { simplified: "~1 month", standard: "~4 months" },
      scheme: "standard",
    },
  },
  {
    id: "lpg",
    label: { en: "Domestic LPG Cylinder", hi: "घरेलू एलपीजी सिलेंडर" },
    description: { en: "I manufacture LPG cylinders for domestic cooking gas", hi: "मैं घरेलू खाना पकाने की गैस के लिए एलपीजी सिलेंडर बनाता हूँ" },
    icon: "🔵",
    standard: {
      isNumber: "IS 3196 (Part 1):1988",
      title: "Welded Low Carbon Steel Cylinders for LPG — Specification",
      year: 1988,
      scope: "Specifies requirements for welded low carbon steel cylinders for domestic LPG. Covers material, construction, hydrostatic pressure tests, valve fittings, and periodic re-qualification.",
      confidence: 97,
      explanation: "Domestic LPG cylinders are among the most strictly regulated products in India. IS 3196 is mandatory and enforced through the Petroleum and Natural Gas Regulatory Board (PNGRB) and BIS QCO. Periodic re-testing every 5 years is mandated.",
      citation: "IS 3196 (Part 1):1988 — BIS, New Delhi (Second Revision)",
      mandatoryQCO: "Petroleum and Natural Gas (Safety in Offshore Operations) Rules QCO",
    },
    scheme: {
      name: "ISI Mark (Scheme I)",
      type: "ISI",
      mandatory: true,
      reason: "LPG cylinders are designated as mandatory certification products under the Petroleum Acts. ISI marking under Scheme I is legally required.",
      qco: "Petroleum Rules QCO / PNGRB Regulations",
      description: "Scheme I requires factory audit, sample testing at BIS-recognised labs for hydrostatic pressure, weld quality, and valve security, followed by licence grant.",
    },
    checklist: [
      { id: "c1", label: "Factory Layout Plan", description: "Production floor plan including welding stations, pressure test bay, valve fitting area, and dispatch zone.", required: true },
      { id: "c2", label: "Welding Procedure Qualification (WPQ)", description: "Qualified welding procedures as per IS/AWS standards for low carbon steel.", required: true },
      { id: "c3", label: "Hydrostatic Test Equipment Certificates", description: "Calibration certificates for pressure test rigs and gauges.", required: true },
      { id: "c4", label: "Raw Material Mill Certificates", description: "Steel plate/coil chemical composition and mechanical property certificates.", required: true },
      { id: "c5", label: "Manufacturing Process Flow", description: "Blanking → Forming → Welding → Heat Treatment → Hydrostatic Test → Valve Fitting → Marking.", required: true },
      { id: "c6", label: "Quality Plan / QC Manual", description: "Documented QC plan including inspection frequency and acceptance criteria.", required: true },
      { id: "c7", label: "Welder Qualification Certificates", description: "Certificates for all welders demonstrating competency per the applicable welding standard.", required: true },
    ],
    fees: {
      application: 1000,
      inspectionPerManDay: 7000,
      estimatedManDays: 3,
      annualLicence: 1000,
      markingFeeBase: 0.4,
      msmeDiscount: 20,
      timeline: { simplified: "Not applicable", standard: "~4–5 months" },
      scheme: "standard",
    },
  },
  {
    id: "water",
    label: { en: "Packaged Drinking Water", hi: "पैकेज्ड पेयजल" },
    description: { en: "I manufacture packaged drinking water bottles", hi: "मैं पैकेज्ड पेयजल की बोतलें बनाता हूँ" },
    icon: "💧",
    standard: {
      isNumber: "IS 14543:2016",
      title: "Packaged Drinking Water (Other than Packaged Natural Mineral Water) — Specification",
      year: 2016,
      scope: "Specifies requirements for packaged drinking water processed by treatment of potable water. Covers physical, chemical, and microbiological requirements, packaging and labelling.",
      confidence: 99,
      explanation: "Packaged drinking water (non-natural mineral water) is mandatorily covered under IS 14543:2016 through a QCO. Every unit sold requires a valid ISI mark. IS 10500 covers the source water quality limits.",
      citation: "IS 14543:2016 — BIS, New Delhi (Third Revision)",
      mandatoryQCO: "Packaged Drinking Water Quality Control Order 2020 (Ministry of Consumer Affairs)",
    },
    scheme: {
      name: "ISI Mark (Scheme I)",
      type: "ISI",
      mandatory: true,
      reason: "Packaged drinking water is covered under a mandatory QCO. ISI marking is legally required before sale or distribution.",
      qco: "Packaged Drinking Water QCO 2020",
      description: "Scheme I requires facility inspection, water quality lab testing (physical, chemical, microbiological), and packaging material compliance. Renewal required annually.",
    },
    checklist: [
      { id: "c1", label: "Plant Layout with Water Treatment Flow", description: "Floor plan showing source water intake, treatment stages (RO/UV/ozonation), filling, and packaging zones.", required: true },
      { id: "c2", label: "Water Treatment Process Details", description: "Description of all treatment steps, equipment specifications, and monitoring parameters.", required: true },
      { id: "c3", label: "Lab Test Reports (Water Quality)", description: "Recent NABL-accredited lab reports for physical, chemical, and microbiological parameters per IS 14543.", required: true },
      { id: "c4", label: "Packaging Material Test Certificates", description: "PET bottle and cap material compliance with food-grade requirements (IS 12252).", required: true },
      { id: "c5", label: "Calibration Certificates for Monitoring Equipment", description: "TDS meters, pH meters, microbial monitoring equipment — calibration certificates.", required: true },
      { id: "c6", label: "FSSAI Licence Copy", description: "Valid Food Safety and Standards Authority of India licence for food processing.", required: true },
      { id: "c7", label: "QC / HACCP Plan", description: "Documented hazard analysis and critical control points plan for the packaging facility.", required: true },
    ],
    fees: {
      application: 1000,
      inspectionPerManDay: 7000,
      estimatedManDays: 2,
      annualLicence: 1000,
      markingFeeBase: 0.3,
      msmeDiscount: 20,
      timeline: { simplified: "~6 weeks", standard: "~3–4 months" },
      scheme: "standard",
    },
  },
  {
    id: "footwear",
    label: { en: "General Purpose Footwear", hi: "सामान्य उद्देश्य जूते" },
    description: { en: "I produce footwear including leather and synthetic shoes", hi: "मैं चमड़े और सिंथेटिक जूते सहित फुटवियर बनाता हूँ" },
    icon: "👟",
    standard: {
      isNumber: "IS 15298 (Part 2):2016",
      title: "Footwear — General Requirements and Test Methods",
      year: 2016,
      scope: "Specifies requirements for general footwear including upper material, sole bonding strength, abrasion resistance, flex resistance, and dimensional requirements.",
      confidence: 91,
      explanation: "General footwear quality is covered under IS 15298 (Part 2):2016. While not universally mandatory, several categories of footwear (e.g., safety footwear) require BIS certification. Voluntary ISI certification significantly improves market access.",
      citation: "IS 15298 (Part 2):2016 — BIS, New Delhi",
      mandatoryQCO: "Footwear QCO 2022 (For specific categories)",
    },
    scheme: {
      name: "ISI Mark (Scheme I) / Voluntary",
      type: "ISI",
      mandatory: false,
      reason: "For general footwear, BIS certification is largely voluntary but strongly recommended. For specific categories covered under QCO 2022, it becomes mandatory.",
      qco: "Footwear QCO 2022 (category-specific)",
      description: "Voluntary ISI certification under Scheme I enhances brand credibility and retail acceptance. Requires factory inspection and product testing for sole bonding, abrasion resistance, and material durability.",
    },
    checklist: [
      { id: "c1", label: "Factory Layout Plan", description: "Production floor plan showing cutting, stitching, lasting, sole bonding, and finishing areas.", required: true },
      { id: "c2", label: "Test Equipment List", description: "Calibrated equipment for peel strength testing, abrasion tester, flex resistance machine.", required: true },
      { id: "c3", label: "Raw Material Certificates", description: "Leather/PU/synthetic upper material and sole material test certificates meeting IS requirements.", required: true },
      { id: "c4", label: "Manufacturing Process Details", description: "Step-by-step process from pattern cutting to finished product inspection.", required: true },
      { id: "c5", label: "In-Process QC Records", description: "Documentation of quality checks at each production stage.", required: true },
      { id: "c6", label: "Product Sample Test Reports", description: "NABL lab test reports for sole peel strength, abrasion resistance, flex cracking per IS 15298.", required: true },
      { id: "c7", label: "Export/Domestic Market Declaration", description: "Declaration of whether products are for export or domestic sale (affects applicable standard revision).", required: false },
    ],
    fees: {
      application: 1000,
      inspectionPerManDay: 7000,
      estimatedManDays: 2,
      annualLicence: 1000,
      markingFeeBase: 0.3,
      msmeDiscount: 20,
      timeline: { simplified: "~1 month", standard: "~3–4 months" },
      scheme: "simplified",
    },
  },
];

// ─── HUID Demo Records ────────────────────────────────────────────────────────

export const DEMO_HUIDS = [
  {
    huid: "AB1234",
    purity: "22K / 916",
    purityLabel: "22 Karat (91.6% Pure Gold)",
    hallmarkingCentre: "Bharat Hallmarking Centre, Jaipur",
    centreId: "BHCJ-2109",
    articleType: "Necklace",
    weight: "12.5g",
    hallmarkDate: "2025-03-15",
    status: "VERIFIED",
    jeweller: "Raj Jewels & Sons, Jaipur",
  },
  {
    huid: "CD5678",
    purity: "18K / 750",
    purityLabel: "18 Karat (75.0% Pure Gold)",
    hallmarkingCentre: "Delhi Assay Office, Karol Bagh",
    centreId: "DAO-1042",
    articleType: "Ring",
    weight: "4.2g",
    hallmarkDate: "2025-07-22",
    status: "VERIFIED",
    jeweller: "Tanishq Store, Connaught Place, New Delhi",
  },
  {
    huid: "EF9012",
    purity: "14K / 585",
    purityLabel: "14 Karat (58.5% Pure Gold)",
    hallmarkingCentre: "Mumbai Hallmarking Centre, Dadar",
    centreId: "MHC-3314",
    articleType: "Bracelet",
    weight: "8.8g",
    hallmarkDate: "2024-11-05",
    status: "VERIFIED",
    jeweller: "P.N. Gadgil Jewellers, Dadar",
  },
  {
    huid: "XX9999",
    status: "NOT_FOUND",
  },
];

// ─── Officer Dashboard Demo Data ──────────────────────────────────────────────

export const OFFICER_STATS = {
  totalSearches: 14823,
  certificateVerifications: 3941,
  huidVerifications: 1205,
  complaintSubmissions: 287,
  aiAssistantQueries: 9390,
  pendingApplications: 42,
  inReviewApplications: 18,
  completedApplications: 156,
};

export const OFFICER_TOP_STANDARDS = [
  { name: "IS 4151:2015 — Helmet", searches: 3820, trend: "+12%" },
  { name: "IS 3196:1988 — LPG Cylinder", searches: 3215, trend: "+8%" },
  { name: "IS 14543:2016 — Packaged Water", searches: 2980, trend: "+15%" },
  { name: "IS 269:2015 — Cement", searches: 2460, trend: "+5%" },
  { name: "IS 15298:2016 — Footwear", searches: 1748, trend: "+22%" },
  { name: "IS 10500:2012 — Drinking Water", searches: 600, trend: "+3%" },
];

export const OFFICER_REGIONAL_COMPLAINTS = [
  { region: "North (Delhi/UP/Haryana)", count: 89 },
  { region: "West (Maharashtra/Gujarat)", count: 74 },
  { region: "South (TN/Karnataka/AP)", count: 61 },
  { region: "East (WB/Odisha/Bihar)", count: 38 },
  { region: "Central (MP/Rajasthan)", count: 25 },
];

export const OFFICER_APPLICATIONS = [
  { id: "APP-2026-0041", product: "Steel Helmet", manufacturer: "SafeRide Industries", status: "PENDING", submitted: "2026-09-18", standard: "IS 4151:2015" },
  { id: "APP-2026-0040", product: "Packaged Water", manufacturer: "Himalayan Aqua Pvt Ltd", status: "IN_REVIEW", submitted: "2026-09-10", standard: "IS 14543:2016" },
  { id: "APP-2026-0039", product: "LPG Cylinder", manufacturer: "Bharat Gas Containers", status: "COMPLETED", submitted: "2026-08-25", standard: "IS 3196:1988" },
  { id: "APP-2026-0038", product: "Footwear", manufacturer: "Chandan Leather Co.", status: "PENDING", submitted: "2026-09-20", standard: "IS 15298:2016" },
  { id: "APP-2026-0037", product: "Portland Cement", manufacturer: "Suryoday Cement Works", status: "IN_REVIEW", submitted: "2026-09-05", standard: "IS 269:2015" },
  { id: "APP-2026-0036", product: "Steel Helmet", manufacturer: "RoadGuard Safety Gear", status: "COMPLETED", submitted: "2026-08-15", standard: "IS 4151:2015" },
];

export const OFFICER_AUDIT_RECORDS = [
  {
    certId: "BIS-DEMO-001",
    product: "Packaged Drinking Water",
    manufacturer: "Himjal Springs Pvt. Ltd.",
    isNumber: "IS 14543:2016",
    issuedDate: "2024-01-05",
    hash: "0x3a7d4f9e8b2c1a6d5e0f3b8c9d2a1e4f7b3c6d9e2a5f8b1c4d7e0a3f6b9c2d5e8",
    txHash: "0xabc123def456789012345678901234567890abcdef123456789012345678901234",
    block: 18427651,
    integrity: "VERIFIED",
    verifiedAt: "2026-09-26T12:34:00Z",
  },
  {
    certId: "BIS-DEMO-002",
    product: "Ordinary Portland Cement",
    manufacturer: "Suryoday Cement Works",
    isNumber: "IS 269:2015",
    issuedDate: "2024-02-06",
    hash: "0x9b2c5f8a1d4e7b0c3f6a9d2e5b8c1f4a7d0e3f6b9c2a5f8b1e4d7a0c3f6b9d2",
    txHash: "0xdef456abc789012345678901234567890abcdef456789012345678901234567890",
    block: 18487203,
    integrity: "VERIFIED",
    verifiedAt: "2026-09-26T11:22:00Z",
  },
  {
    certId: "BIS-DEMO-004",
    product: "Two-Wheeler Protective Helmet",
    manufacturer: "SafeRide Helmets India",
    isNumber: "IS 4151:2015",
    issuedDate: "2024-04-08",
    hash: "0x6c9f2a5e8b1d4c7f0a3e6b9c2f5a8d1e4b7c0f3a6d9e2b5c8f1a4e7d0c3f6b9",
    txHash: "0x789012abcdef345678901234567890abcdef789012345678901234567890abcdef",
    block: 18601442,
    integrity: "VERIFIED",
    verifiedAt: "2026-09-26T10:05:00Z",
  },
  {
    certId: "BIS-DEMO-008",
    product: "Ordinary Portland Cement — 53 Grade",
    manufacturer: "Girnar Cement Ltd.",
    isNumber: "IS 269:2015",
    issuedDate: "2024-08-12",
    hash: "0x1e4a7d0b3c6f9a2d5e8b1c4f7a0d3e6b9c2f5a8d1e4b7c0f3a6d9e2b5c8f1a4",
    txHash: "0x012345abcdef678901234567890abcdef012345678901234567890abcdef01234",
    block: 18820115,
    integrity: "TAMPERED",
    verifiedAt: "2026-09-26T09:15:00Z",
  },
];

// ─── Complaint Demo Responses ──────────────────────────────────────────────

export function generateComplaintId() {
  const num = Math.floor(100 + Math.random() * 900);
  const year = new Date().getFullYear();
  return `BIS-CMP-${year}-${String(num).padStart(5, "0")}`;
}

export const PRODUCT_CATEGORIES = [
  "Helmets / Road Safety",
  "LPG / Gas Equipment",
  "Packaged Water / Beverages",
  "Cement / Construction Materials",
  "Footwear",
  "Electrical Appliances",
  "Steel / Metals",
  "Toys",
  "Electronic Goods",
  "Other",
];

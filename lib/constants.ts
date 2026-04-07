import type { SectionDef, StepText } from '@/types'

export const STEP_DELTA = 160   // scroll px to complete one animation step
export const SEC_DELTA  = 120   // scroll px to flip a narrative section

export const SECTIONS: SectionDef[] = [
  { id: 0,  kind: 'hero'     },
  { id: 1,  kind: 'engine'   },
  { id: 2,  kind: 'bridge'   },                       // 01 — The Problem
  { id: 3,  kind: 'widget',  widgetId: 1, steps: 6 },
  { id: 4,  kind: 'bridge'   },                       // 02 — Scale
  { id: 5,  kind: 'widget',  widgetId: 2, steps: 6 },
  { id: 6,  kind: 'bridge'   },                       // 03 — Coordination
  { id: 7,  kind: 'widget',  widgetId: 3, steps: 4 },
  { id: 8,  kind: 'noreturn' },                       // State — Critical
  { id: 9,  kind: 'bridge'   },                       // 04 — The Solution
  { id: 10, kind: 'widget',  widgetId: 4, steps: 10 },
  { id: 11, kind: 'bridge'   },                       // 05 — The Mechanism
  { id: 12, kind: 'widget',  widgetId: 5, steps: 5 },
  { id: 13, kind: 'bridge'   },                       // 06 — Economics
  { id: 14, kind: 'widget',  widgetId: 6, steps: 4 },
  { id: 15, kind: 'bridge'   },                       // 07 — The Platform
  { id: 16, kind: 'widget',  widgetId: 7, steps: 6 },
  { id: 17, kind: 'product'  },
  { id: 18, kind: 'cta'      },
]

export const WIDGET_SEC_IDS = new Set([3, 5, 7, 10, 12, 14, 16])

// Step header texts per widget × step
export const STEP_TEXTS: Record<number, StepText[]> = {
  1: [
    { title: 'A single operator. Legitimate credentials.', subtitle: 'All queries within policy. No anomaly will be detected. Watch what the data reveals.' },
    { title: 'Gender correlated.', subtitle: '6,000,000 individuals match this attribute. The space is enormous. For now.' },
    { title: 'Zip code added.', subtitle: '84,000 remain. Two attributes. Still compliant. Still undetected.' },
    { title: 'Insurance plan type.', subtitle: '12,400 individuals. Each attribute collapses the space exponentially.' },
    { title: 'Birth year.', subtitle: '890 individuals. Not a single policy violated.' },
    { title: 'Diagnosis code.', subtitle: '23 individuals remain. The system identifies the pattern. Access restructured.' },
  ],
  2: [
    { title: 'Six operators. Each with legitimate access.', subtitle: 'No operator will exceed any individual limit. Watch what they create together.' },
    { title: 'OP-4471 active. Token density: 18%.', subtitle: 'Gender and Zip code. One session. Fully compliant.' },
    { title: 'OP-8823 joins. Same tokens, different session.', subtitle: 'Density: 28%. No shared session. No anomaly.' },
    { title: 'OP-2241. Convergence forming.', subtitle: 'Density: 37%. Three operators. Zero anomalies. The field is forming.' },
    { title: 'OP-3319. Four operators on the same tokens.', subtitle: 'Density: 44%. Individually compliant. Collectively past the point of safety.' },
    { title: 'OP-7762. Density approaches the limit.', subtitle: 'Density: 50%. CORI detects the collective signal. Sixth operator blocked.' },
  ],
  3: [
    { title: 'Three operators. Each below the limit.', subtitle: 'No operator will trigger any rule. Watch the combined coverage.' },
    { title: 'OP-4471: Zip · Salary · Age range.', subtitle: 'Coverage: 28%. Fully compliant. Individually harmless.' },
    { title: 'OP-8823: Marital · Nationality · Employer.', subtitle: 'Combined: 47%. Different attributes. Different sessions. Still compliant.' },
    { title: 'OP-2241: Occupation · Education · Age range.', subtitle: 'Age overlap detected. Combined: 74%. Space resolved. CORI intervenes.' },
  ],
  4: [
    { title: 'Your raw database.', subtitle: 'Before any query. Identity already exists here — latent in the structure.' },
    { title: 'Your HSM tokenizes.', subtitle: 'Sensitive fields transformed inside your hardware. Nothing leaves in plaintext.' },
    { title: 'Only structure remains.', subtitle: 'Same schema. No values. CORI will only ever see this — and it is enough.' },
    { title: 'CORI receives only tokens and structure.', subtitle: 'Inferential geometry computed from the tokenized dataset alone.' },
    { title: 'The geometry of inference — derived.', subtitle: 'Nodes are attributes. Edges are correlations. Weight encodes rarity.' },
    { title: 'Your dataset has a reconstruction threshold.', subtitle: '87% reconstruction risk without CORI. Calculated. Not estimated.' },
    { title: 'You define the acceptable limit.', subtitle: 'This becomes the contract. Not a policy. A mathematical obligation.' },
    { title: 'These limits become enforceable.', subtitle: 'Derived from geometry. Not configured. Not arbitrary.' },
    { title: 'Anchored in a Verkle tree.', subtitle: 'Immutable. Auditable by the ANPD without exposing a single record.' },
    { title: 'The system enforces what is allowed.', subtitle: 'The limit is not configured. It is derived. And then enforced.' },
  ],
  5: [
    { title: 'Normal operation. Risk: 12%.', subtitle: 'Legitimate queries. Real values. No anomaly detected.' },
    { title: 'Reconstruction risk accumulating.', subtitle: 'Risk: 42%. CORI tracks the inferential geometry across every session.' },
    { title: 'Reconstruction threshold reached. CORI intervenes.', subtitle: 'Risk: 49%. Not by blocking. By changing the state of the data itself.' },
    { title: 'HSM applies encryption to the blast radius.', subtitle: 'Records within inferential reach encrypted before the next query arrives.' },
    { title: 'Operator queries. Receives [ENC:…].', subtitle: 'No error. No denial. No anomaly. The data changed. The path disappeared.' },
  ],
  6: [
    { title: 'Three dimensions of cost.', subtitle: 'Before CORI: all three negligible. After CORI: all three compound.' },
    { title: 'The cost curves diverge.', subtitle: 'Without CORI: linear. With CORI: exponential — compounding with every query.' },
    { title: 'The crossover: ~42 queries.', subtitle: 'After this, the attack costs more than the value of the data recovered.' },
    { title: 'The attack is economically irrational.', subtitle: 'Not technically impossible. Economically irrational. The calculus changes.' },
  ],
  7: [
    { title: 'Most systems rely on static rules.', subtitle: 'Configured once. Unable to sense accumulation. Unable to adapt.' },
    { title: 'But inference is dynamic. Static rules cannot see it.', subtitle: 'The field forms across sessions and time. Rules fire too late.' },
    { title: 'CORI sits above existing controls.', subtitle: 'State → decision → action. Not rule → action.' },
    { title: 'Data plane vs. control plane.', subtitle: 'CORI does not sit in the data path — it controls it indirectly.' },
    { title: 'Same rule. Different behavior.', subtitle: 'Low risk: nothing. Medium: masking. Critical: encryption + blast radius sealed.' },
    { title: 'Protection is no longer configured.', subtitle: 'It is computed. From the geometry of your data.' },
  ],
}

// Bridge content per section id
export interface BridgeContent {
  num: string
  heading: string
  body: string
}

export const BRIDGE_CONTENT: Record<number, BridgeContent> = {
  2: {
    num: '01 — The Problem',
    heading: 'Identity does not leak.\nIt emerges.',
    body: 'A single operator. Legitimate credentials. All queries within policy limits.\nNo alert fires.\nNo rule is broken.\n\nAnd every control reports success.',
  },
  4: {
    num: '02 — Scale',
    heading: 'One attacker is manageable.\nSix are invisible.',
    body: 'Each operator acts alone. Each stays below every individual limit.\nThe problem is not any single session.\n\nThe problem is the field they create together.',
  },
  6: {
    num: '03 — Coordination',
    heading: 'Three operators.\nEach below the limit.\nTogether, they cover everything.',
    body: 'No operator queries the same attributes. No overlap is detectable individually.\n\nBut the combined coverage resolves the full identification space.',
  },
  9: {
    num: '04 — The Solution',
    heading: 'Before the first query,\nthe contract already exists.',
    body: 'CORI does not wait for an attack to begin measuring.\nOn Day 0, the inferential geometry of your dataset is computed via HSM.\nThe limit is derived. Signed. Anchored immutably.\n\nYour data never leaves your environment.',
  },
  11: {
    num: '05 — The Mechanism',
    heading: 'Reconstruction threshold reached.\nCORI intervenes.',
    body: 'Not by blocking. Not by alerting.\nBy changing the state of the data itself.\n\nCORI triggers an encryption policy — executed by your existing HSM.\n\nThe attacker\'s next query returns a valid response.\nThe value is encrypted. No error. No anomaly. No denial.\n\nWatch this happen — query by query.',
  },
  13: {
    num: '06 — Economics',
    heading: 'The attack is not impossible.\nIt is economically irrational.',
    body: 'Without CORI: low cost per query, no forensic trace, no provable legal violation.\nWith CORI: cost compounds exponentially, every move generates a cryptographic signature.\n\nThe crossover happens at approximately 42 queries.\n\nAt that point, the question is no longer technical.\nIt is accountability.',
  },
  15: {
    num: '07 — The Platform',
    heading: 'CORI does not introduce\nnew controls.\nIt makes existing ones intelligent.',
    body: 'Thales CipherTrust. IBM Guardium. Protegrity. CyberArk. Anonimiza.ai for documents.\nYour existing stack — already deployed, already trusted.\n\nCORI adds the inference layer that decides when they act.',
  },
}

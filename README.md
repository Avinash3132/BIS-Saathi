# BIS-Saathi

**AI-powered assistant for Indian Standards and BIS services**
Smart India Hackathon — Problem Statement **SIH26107** (Theme: Smart Automation)

> ⚠️ **This is an SIH demonstration prototype, not a production government
> platform.** It does not connect to any official BIS database, and every
> certificate, source document and blockchain record in this repo is
> synthetic demo data.

---

## 1. What this is

BIS-Saathi demonstrates four core capabilities end to end:

1. **AI-powered BIS Standards Assistant** — ask a question in English or Hindi (typed or spoken), get a grounded answer.
2. **Source-grounded RAG responses with citations** — every grounded answer shows its IS number, source document, page and clause.
3. **QR-based certificate verification** — look up a synthetic demo certificate by ID or simulated QR scan.
4. **Blockchain-backed integrity proof** — a Hardhat/Solidity contract records a hash of each demo certificate; verification checks against it.

Secondary features: Hindi + English UI and voice input, and a "Explain Simply" mode that produces a plain-language explanation without introducing new facts.

## 2. Architecture

```
React + Vite (frontend)
        │  axios
        ▼
Node.js + Express (backend)
        │                      │
        │ MongoDB Atlas        │ axios
        ▼                      ▼
  Certificates,        FastAPI AI service (ai-service)
  chat logs                │
        │                  │ BGE-M3 embeddings → ChromaDB → Llama 3 8B via Ollama
        │
        ▼
  ethers.js → Solidity CertificateRegistry (Hardhat, blockchain/)
```

Every hop has a **DEMO_MODE fallback**: if MongoDB, the AI service, or the
blockchain node aren't running, the backend transparently falls back to
deterministic seeded/mock responses rather than breaking the UI. This is
what lets the whole product be demoed reliably on a laptop with no external
infra running at all — set `DEMO_MODE=true` / `AI_DEMO_MODE=true` (the
defaults) and everything works with **only Node and Python installed**.

## 3. Folder structure

```
bis-saathi/
├── frontend/       React + Vite + Tailwind — pages: /, /assistant, /verify, /certificate/:id, /about
├── backend/        Node + Express — API gateway, MongoDB models, blockchain client, QR generation
├── ai-service/     FastAPI — RAG pipeline (ingestion, embeddings, retrieval, prompt construction)
├── blockchain/     Hardhat + Solidity — CertificateRegistry contract, deploy/seed scripts, tests
└── shared/         Demo dataset (certificates + knowledge base) used by both backend and blockchain seed scripts
```

## 4. Quick start (fastest path — pure demo mode)

This runs the whole product with **no MongoDB, no Ollama, and no
blockchain node** — exactly what you'd use for a judging demo.

```bash
# 1. Backend
cd backend
cp .env.example .env        # DEMO_MODE=true by default
npm install
npm run dev                 # http://localhost:5000

# 2. AI service (new terminal)
cd ai-service
cp .env.example .env        # AI_DEMO_MODE=true by default
python -m venv .venv; .venv\Scripts\Activate.ps1   # (Windows: .venv\Scripts\activate)
pip install fastapi "uvicorn[standard]" pydantic python-dotenv
uvicorn app.main:app --reload --port 8000

# 3. Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev                 # http://localhost:5173
```

Open http://localhost:5173 — the assistant, Hindi/English toggle, voice
input, certificate verification and blockchain proof screen are all fully
functional in this mode.

## 5. Running the full production-style pipeline

### 5.1 MongoDB Atlas

1. Create a free cluster at https://www.mongodb.com/cloud/atlas.
2. Copy the connection string into `backend/.env` as `MONGODB_URI`.
3. Seed the demo certificates:
   ```bash
   cd backend
   npm run seed
   ```
4. Set `DEMO_MODE=false` once you also have the AI service and blockchain running, or leave it `true` to keep the automatic fallback as a safety net.

### 5.2 Ollama + ChromaDB (real RAG pipeline)

1. Install Ollama (https://ollama.com) and pull a model:
   ```bash
   ollama pull llama3:8b
   ```
2. Install the full AI service dependencies (this pulls in `sentence-transformers`, which downloads the BGE-M3 model weights on first use, and `chromadb`):
   ```bash
   cd ai-service
   pip install -r requirements.txt
   ```
3. Set `AI_DEMO_MODE=false` in `ai-service/.env`.
4. Ingest the demo source documents into ChromaDB:
   ```bash
   python scripts/ingest.py
   ```
5. Start the service as usual: `uvicorn app.main:app --reload --port 8000`.

To add your own BIS/public source PDFs, drop them into
`ai-service/data/sources/` and re-run `scripts/ingest.py`. (PDF text
extraction uses PyMuPDF — see `app/ingestion/pdf_loader.py`.)

### 5.3 Hardhat blockchain trust layer

```bash
cd blockchain
npm install
npx hardhat node                       # terminal A — local chain
npm run deploy                         # terminal B — deploys CertificateRegistry
npm run seed                           # registers the 10 demo certificates on-chain
npx hardhat test                       # run the contract test suite
```

Then copy the deployed contract address into `backend/.env`:

```
RPC_URL=http://127.0.0.1:8545
CONTRACT_ADDRESS=<address printed by `npm run deploy`>
PRIVATE_KEY=<one of Hardhat's local test account private keys, printed by `npx hardhat node`>
```

Restart the backend — certificate verification will now query the live
contract, falling back to the simulated proof automatically if the chain
becomes unreachable.

## 6. Environment variables

See `.env.example` in each service (`frontend/`, `backend/`, `ai-service/`, `blockchain/`) for the full list. Never commit a populated `.env` file.

## 7. Positioning & safety notes

- All certificates, the knowledge base source documents, and blockchain records in this repo are **synthetic demo data**, clearly labelled as such in the UI and API responses.
- The knowledge base documents are original, paraphrased summaries written for this prototype — they are **not verbatim reproductions** of any official BIS standard.
- The blockchain layer proves the integrity of the *recorded demo data*. It does **not** independently prove that a certificate was genuinely issued by BIS.
- This prototype does not implement, and should not be presented as implementing, a full Industry Portal, BIS Officer Portal, Admin system, or any of the production-scale infrastructure (Kafka, Redis, Kubernetes, Hyperledger Fabric, IPFS, etc.) — those remain future roadmap ideas only.

## 8. What's intentionally not built (future roadmap)

Full Industry/Officer/Admin portals, procurement compliance, a WhatsApp bot,
a native mobile app, and enterprise infrastructure (Kafka, Redis, Kubernetes,
Hyperledger Fabric, IPFS, Prometheus/Grafana, an API gateway). These are out
of scope for this MVP by design — see the "What must not be built" section
of the product brief.

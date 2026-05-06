import React, { useMemo, useState } from 'react';
import {
  Activity,
  BadgeCheck,
  Brain,
  Bug,
  CheckCircle2,
  ChevronRight,
  DatabaseZap,
  Eye,
  FileWarning,
  Globe2,
  Info,
  Landmark,
  Layers3,
  LockKeyhole,
  Network,
  Radar,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Target,
  TrendingUp,
  Zap
} from 'lucide-react';

const threatItems = [
  {
    id: 'ransomware',
    title: 'Ransomware & Extortion',
    severity: 'High',
    trend: 'Increasing',
    confidence: 'Medium',
    summary:
      'Continued targeting of public sector, healthcare, logistics, finance, and mid-market enterprises through double-extortion playbooks.',
    signals: ['Credential compromise', 'Edge device exposure', 'Backup deletion attempts'],
    action: 'Validate restore capability and isolate critical backup repositories.'
  },
  {
    id: 'supply-chain',
    title: 'Software Supply Chain Risk',
    severity: 'Elevated',
    trend: 'Stable',
    confidence: 'Medium',
    summary:
      'Threat actors continue to exploit trusted software, update channels, third-party services, and dependency ecosystems.',
    signals: ['Suspicious package updates', 'Vendor breach alerts', 'Unexpected outbound traffic'],
    action: 'Maintain vendor inventory and monitor privileged integrations.'
  },
  {
    id: 'phishing',
    title: 'Phishing & Business Email Compromise',
    severity: 'High',
    trend: 'Increasing',
    confidence: 'High',
    summary:
      'Credential theft remains a dominant entry vector, increasingly supported by AI-assisted social engineering and MFA fatigue attempts.',
    signals: ['New inbox rules', 'Impossible travel alerts', 'Invoice redirection requests'],
    action: 'Enforce phishing-resistant MFA for high-risk accounts.'
  },
  {
    id: 'cloud',
    title: 'Cloud Misconfiguration',
    severity: 'Moderate',
    trend: 'Stable',
    confidence: 'Medium',
    summary:
      'Exposed storage, over-permissive identities, weak logging, and unmanaged secrets remain common sources of avoidable cyber exposure.',
    signals: ['Public buckets', 'Excessive IAM permissions', 'Disabled audit logging'],
    action: 'Prioritise identity hardening and continuous configuration checks.'
  }
];

const sectorRisk = [
  { sector: 'Financial Services', level: 'High', driver: 'Fraud, ransomware, credential compromise, and third-party exposure' },
  { sector: 'Healthcare', level: 'High', driver: 'Ransomware disruption, sensitive data exposure, and legacy system dependency' },
  { sector: 'Government', level: 'High', driver: 'Espionage, disruptive attacks, critical service dependency, and public trust impact' },
  { sector: 'Energy & Utilities', level: 'Elevated', driver: 'Operational technology exposure and geopolitically driven targeting' },
  { sector: 'SME / Mid-market', level: 'Elevated', driver: 'Lower detection maturity and reliance on outsourced IT providers' }
];

const intelligenceSources = [
  {
    name: 'AlienVault OTX',
    status: 'Later phase',
    note: 'Pulse and indicator integration reserved until the design baseline is stable.'
  },
  {
    name: 'Public cyber advisories',
    status: 'Future phase',
    note: 'Can later include CISA, NCSC, CERT bulletins, and selected vendor advisories.'
  },
  {
    name: 'Cygnus analyst overlay',
    status: 'Manual input',
    note: 'Future versions can support commentary, client sector notes, and regional context.'
  }
];

const methodology = [
  {
    title: 'Severity',
    body: 'Assesses likely operational, financial, reputational, and regulatory impact if the threat materialises.'
  },
  {
    title: 'Trend Direction',
    body: 'Indicates whether observable threat activity appears to be increasing, stable, or decreasing.'
  },
  {
    title: 'Assessment Confidence',
    body: 'Reflects the quality, consistency, and timeliness of available source information.'
  },
  {
    title: 'Strategic Relevance',
    body: 'Connects technical cyber indicators to business risk, resilience priorities, and executive decision-making.'
  }
];

const brandingPrinciples = [
  {
    icon: <Landmark size={18} />,
    title: 'Cygnus identity',
    body: 'Aligned to the Cygnus Development – Risk Intelligence Technology visual language.'
  },
  {
    icon: <ScanSearch size={18} />,
    title: 'Executive readability',
    body: 'Structured for fast scanning and decision support rather than a cluttered feed-wall experience.'
  },
  {
    icon: <ShieldCheck size={18} />,
    title: 'Cyber-specific focus',
    body: 'Dedicated cyber risk framing while preserving the wider Cygnus strategic risk design principles.'
  }
];

function getSeverityClass(level) {
  if (level === 'High') return 'risk-high';
  if (level === 'Elevated') return 'risk-elevated';
  return 'risk-moderate';
}

function Header() {
  return (
    <header className="hero-shell">
      <div className="brand-ribbon">
        <div className="brand-ribbon-inner">
          <span><BadgeCheck size={14} /> Cygnus Development</span>
          <span>Risk Intelligence Technology</span>
          <span>Cyber Risk Intelligence Tracker v0.2</span>
        </div>
      </div>

      <nav className="top-nav">
        <div className="brand-lockup">
          <div className="logo-mark">
            <span>C</span>
          </div>
          <div>
            <p className="eyebrow">CYGNUS DEVELOPMENT</p>
            <h1>Cyber Risk Intelligence Tracker</h1>
            <p className="brand-subline">Risk Intelligence Technology</p>
          </div>
        </div>
        <div className="version-pill">Clean Branded Preview v0.2</div>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <div className="section-kicker"><Radar size={16} /> Cygnus cyber intelligence preview</div>
          <h2>Branded cyber risk intelligence for strategic visibility.</h2>
          <p>
            A separate Cygnus web tracker focused on cyber risk intelligence. This v0.2 clean preview establishes
            the branded baseline, cyber risk structure, and executive-facing layout before any live threat-feed integration.
          </p>
          <div className="hero-actions">
            <a href="#threat-landscape" className="primary-button">View threat landscape <ChevronRight size={16} /></a>
            <a href="#cygnus-branding" className="ghost-button">View Cygnus branding</a>
          </div>
          <div className="hero-tag-row">
            <span>Strategic cyber monitoring</span>
            <span>Executive-friendly design</span>
            <span>Future API-ready structure</span>
          </div>
        </div>

        <div className="hero-card intelligence-card">
          <div className="status-row">
            <span className="pulse-dot" />
            Static intelligence snapshot
          </div>
          <h3>Current Cyber Risk Posture</h3>
          <div className="posture-score">Elevated</div>
          <p>
            Ransomware, phishing, cloud exposure, and software supply-chain compromise remain prominent strategic cyber
            risk themes for organisations with digitally dependent operations.
          </p>
          <div className="metric-grid">
            <div><strong>4</strong><span>Threat themes</span></div>
            <div><strong>5</strong><span>Sector views</span></div>
            <div><strong>3</strong><span>Source lanes</span></div>
          </div>
        </div>
      </section>
    </header>
  );
}

function ThreatCard({ item }) {
  return (
    <article className="threat-card">
      <div className="card-topline">
        <div className="icon-bubble"><ShieldAlert size={20} /></div>
        <span className={`risk-pill ${getSeverityClass(item.severity)}`}>{item.severity}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <div className="mini-meta">
        <span><TrendingUp size={14} /> Trend: {item.trend}</span>
        <span><Eye size={14} /> Confidence: {item.confidence}</span>
      </div>
      <div className="signal-list">
        {item.signals.map((signal) => <span key={signal}>{signal}</span>)}
      </div>
      <div className="recommended-action">
        <strong>Recommended focus:</strong> {item.action}
      </div>
    </article>
  );
}

function Dashboard() {
  const [selected, setSelected] = useState('All');
  const filteredThreats = useMemo(() => {
    if (selected === 'All') return threatItems;
    return threatItems.filter((item) => item.severity === selected);
  }, [selected]);

  return (
    <main>
      <section className="overview-band">
        <div className="overview-card">
          <Activity size={24} />
          <div><strong>Threat tempo</strong><span>High-volume credential abuse and extortion activity</span></div>
        </div>
        <div className="overview-card">
          <Target size={24} />
          <div><strong>Primary exposure</strong><span>Identity, third-party services, cloud, and remote access</span></div>
        </div>
        <div className="overview-card">
          <Brain size={24} />
          <div><strong>Strategic lens</strong><span>Business continuity, governance, resilience, and executive awareness</span></div>
        </div>
      </section>

      <section id="cygnus-branding" className="content-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker"><Globe2 size={16} /> Cygnus Branding</div>
            <h2>Built as a separate Cygnus cyber tracker</h2>
            <p>This clean v0.2 baseline gives the cyber tracker its own identity while staying aligned with the wider Cygnus risk intelligence design language.</p>
          </div>
        </div>
        <div className="principles-grid">
          {brandingPrinciples.map((item) => (
            <article className="principle-card" key={item.title}>
              <div className="principle-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="threat-landscape" className="content-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker"><Siren size={16} /> Threat Landscape</div>
            <h2>Cyber risk themes</h2>
            <p>Static intelligence cards designed for executive scanning. Live feeds are intentionally reserved for a later phase.</p>
          </div>
          <div className="filter-tabs" aria-label="Filter threat cards">
            {['All', 'High', 'Elevated', 'Moderate'].map((filter) => (
              <button
                key={filter}
                className={selected === filter ? 'active' : ''}
                onClick={() => setSelected(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="threat-grid">
          {filteredThreats.map((item) => <ThreatCard key={item.id} item={item} />)}
        </div>
      </section>

      <section className="split-section">
        <div className="panel-card">
          <div className="section-kicker"><Layers3 size={16} /> Sector Exposure</div>
          <h2>Sector risk view</h2>
          <div className="sector-list">
            {sectorRisk.map((item) => (
              <div className="sector-row" key={item.sector}>
                <div>
                  <strong>{item.sector}</strong>
                  <span>{item.driver}</span>
                </div>
                <span className={`risk-pill ${getSeverityClass(item.level)}`}>{item.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel-card dark-panel">
          <div className="section-kicker"><DatabaseZap size={16} /> Source Architecture</div>
          <h2>Data integration roadmap</h2>
          <p>
            This build remains a static public preview. Live API integration should be phased in carefully to preserve
            readability and avoid turning the tracker into a cluttered feed wall.
          </p>
          <div className="source-stack">
            {intelligenceSources.map((source) => (
              <div className="source-item" key={source.name}>
                <div><strong>{source.name}</strong><span>{source.note}</span></div>
                <em>{source.status}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="methodology" className="content-section methodology-section">
        <div className="section-heading compact">
          <div>
            <div className="section-kicker"><Info size={16} /> Methodology</div>
            <h2>How to interpret the tracker</h2>
          </div>
        </div>
        <div className="method-grid">
          {methodology.map((item) => (
            <article className="method-card" key={item.title}>
              <CheckCircle2 size={20} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="future-section">
        <div>
          <div className="section-kicker"><Zap size={16} /> Future Phase</div>
          <h2>OTX API integration reserved for a later phase</h2>
          <p>
            A later phase can add AlienVault OTX pulses, indicators, malware families, adversary tags, and cyber
            intelligence summaries. For now, this build locks in the clean branded Cygnus baseline.
          </p>
        </div>
        <div className="future-icons">
          <LockKeyhole />
          <Network />
          <Bug />
          <FileWarning />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div>
        <strong>Cygnus Development</strong>
        <span>Risk Intelligence Technology</span>
      </div>
      <p>Cygnus Cyber Risk Intelligence Tracker v0.2 · Clean branded static preview · No live API data in this build</p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

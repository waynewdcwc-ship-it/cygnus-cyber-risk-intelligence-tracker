import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BadgeCheck,
  Brain,
  Bug,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  DatabaseZap,
  Eye,
  ExternalLink,
  FileWarning,
  Flame,
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

const watchlist = [
  {
    title: 'Identity compromise',
    priority: 'Immediate',
    detail: 'Monitor privileged access, MFA fatigue attempts, suspicious sign-ins, impossible travel, and abnormal session persistence.'
  },
  {
    title: 'Internet-facing systems',
    priority: 'High',
    detail: 'Track exposed VPNs, firewalls, remote access tools, outdated web applications, and unmanaged externally visible assets.'
  },
  {
    title: 'Third-party dependency',
    priority: 'High',
    detail: 'Review critical vendors, software update channels, outsourced IT providers, cloud integrations, and privileged service accounts.'
  },
  {
    title: 'Data exposure',
    priority: 'Elevated',
    detail: 'Prioritise sensitive data locations, public cloud storage checks, email forwarding rules, and unusual outbound traffic patterns.'
  }
];

const readinessItems = [
  { label: 'Backups tested', status: 'Validate', description: 'Confirm restore tests, offline copies, and separation from production credentials.' },
  { label: 'MFA coverage', status: 'Strengthen', description: 'Prioritise administrator, finance, email, VPN, and cloud console access.' },
  { label: 'Logging visibility', status: 'Improve', description: 'Ensure sign-in, endpoint, cloud, firewall, and email logs are retained and reviewable.' },
  { label: 'Incident roles', status: 'Define', description: 'Clarify decision-makers, technical responders, communications owners, and escalation paths.' }
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

const terminology = [
  {
    term: 'Threat theme',
    meaning: 'A recurring cyber risk pattern such as ransomware, phishing, supply-chain compromise, or cloud exposure.'
  },
  {
    term: 'Indicator',
    meaning: 'A technical clue that may suggest suspicious or malicious activity, such as a domain, IP address, hash, or file name.'
  },
  {
    term: 'Pulse',
    meaning: 'A grouped intelligence item, often containing related indicators, adversary context, malware references, or campaign notes.'
  },
  {
    term: 'Confidence',
    meaning: 'A judgement about how reliable and complete the available information appears to be.'
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
          <span>Cyber Risk Intelligence Tracker v0.5</span>
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
        <div className="nav-links" aria-label="Page navigation">
          <a href="#otx-live">OTX Preview</a>
          <a href="#watchlist">Watchlist</a>
          <a href="#threat-landscape">Threats</a>
          <a href="#readiness">Readiness</a>
          <a href="#help">Help</a>
        </div>
      </nav>

      <section className="hero-grid">
        <div className="hero-copy">
          <div className="section-kicker"><Radar size={16} /> Cygnus cyber intelligence preview</div>
          <h2>Cyber risk intelligence for strategic visibility.</h2>
          <p>
            A separate Cygnus web tracker focused on cyber risk intelligence. This v0.4 preview adds the first secure OTX API foundation through a Vercel serverless route, while retaining
            static fallback content, the cyber watchlist, readiness snapshot, and terminology support.
          </p>
          <div className="hero-actions">
            <a href="#watchlist" className="primary-button">View cyber watchlist <ChevronRight size={16} /></a>
            <a href="#help" className="ghost-button">View terminology</a>
          </div>
          <div className="hero-tag-row">
            <span>Strategic cyber monitoring</span>
            <span>Executive-friendly design</span>
            <span>Secure OTX foundation</span>
          </div>
        </div>

        <div className="hero-card intelligence-card">
          <div className="status-row">
            <span className="pulse-dot" />
            Static + OTX-ready snapshot
          </div>
          <h3>Current Cyber Risk Posture</h3>
          <div className="posture-score">Elevated</div>
          <p>
            Ransomware, phishing, cloud exposure, and software supply-chain compromise remain prominent strategic cyber
            risk themes for organisations with digitally dependent operations.
          </p>
          <div className="metric-grid">
            <div><strong>4</strong><span>Threat themes</span></div>
            <div><strong>4</strong><span>Watchlist items</span></div>
            <div><strong>5</strong><span>Sector views</span></div>
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


function OtxLivePanel() {
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Checking secure OTX preview route...');
  const [pulses, setPulses] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadPulses() {
      try {
        const response = await fetch('/api/otx-pulses');
        const data = await response.json();

        if (ignore) return;

        if (!response.ok || !data.ok) {
          setStatus('fallback');
          setMessage(data.message || 'OTX preview is not available in this environment yet.');
          setPulses([]);
          return;
        }

        setStatus('live');
        setMessage(data.message || 'OTX preview data loaded through the secure serverless route.');
        setPulses(data.pulses || []);
      } catch (error) {
        if (ignore) return;
        setStatus('fallback');
        setMessage('OTX preview is unavailable. Static tracker content remains active.');
        setPulses([]);
      }
    }

    loadPulses();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="otx-live" className="content-section otx-section">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><DatabaseZap size={16} /> Live OTX Feed</div>
          <h2>OTX feed with source links</h2>
          <p>
            This panel calls a secure Vercel serverless function and now provides direct links to the full OTX pulse in a new tab. The dashboard stays clean while the source detail remains accessible.
          </p>
        </div>
        <div className={`otx-status ${status}`}>{status === 'live' ? 'Live route active' : status === 'loading' ? 'Checking route' : 'Fallback mode'}</div>
      </div>

      <div className="otx-panel">
        <div className="otx-summary-card">
          <div className="status-row"><span className="pulse-dot" /> {message}</div>
          <h3>OTX API Foundation</h3>
          <p>
            The frontend requests <strong>/api/otx-pulses</strong>. The serverless function keeps the private OTX API key on the server side and returns simplified pulse summaries plus source links.
          </p>
        </div>

        <div className="otx-pulse-list">
          {status === 'live' && pulses.length > 0 ? (
            pulses.map((pulse) => (
              <article className="otx-pulse-card" key={pulse.id || pulse.name}>
                <div>
                  <strong>{pulse.name}</strong>
                  <span>{pulse.description || 'No description provided in the preview payload.'}</span>
                </div>
                <div className="otx-meta">
                  <em>{pulse.indicatorCount} indicators</em>
                  <em>{pulse.modified || 'Modified date unavailable'}</em>
                </div>
                {pulse.url ? (
                  <a
                    className="otx-source-link"
                    href={pulse.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open full OTX pulse for ${pulse.name}`}
                  >
                    View full OTX pulse <ExternalLink size={14} />
                  </a>
                ) : (
                  <span className="otx-source-link disabled">Source link unavailable</span>
                )}
              </article>
            ))
          ) : (
            <article className="otx-pulse-card static-fallback">
              <strong>Static fallback active</strong>
              <span>
                The tracker remains fully usable while the live OTX route is unavailable locally or while Vercel is waiting
                for a redeploy with the OTX_API_KEY environment variable.
              </span>
              <div className="otx-meta"><em>No API key exposed</em><em>Safe fallback</em></div>
            </article>
          )}
        </div>
      </div>
    </section>
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

      <OtxLivePanel />

      <section id="watchlist" className="content-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker"><Flame size={16} /> Strategic Watchlist</div>
            <h2>Priority cyber risk focus areas</h2>
            <p>Designed as a simple executive scanning layer before live cyber intelligence feeds are added.</p>
          </div>
        </div>
        <div className="watchlist-grid">
          {watchlist.map((item) => (
            <article className="watch-card" key={item.title}>
              <div className="watch-topline">
                <span>{item.priority}</span>
                <ClipboardCheck size={20} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="cygnus-branding" className="content-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker"><Globe2 size={16} /> Cygnus Branding</div>
            <h2>Built as a separate Cygnus cyber tracker</h2>
            <p>This baseline gives the cyber tracker its own identity while staying aligned with the wider Cygnus risk intelligence design language.</p>
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

      <section id="readiness" className="split-section">
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

        <div className="panel-card readiness-panel">
          <div className="section-kicker"><ClipboardCheck size={16} /> Readiness Snapshot</div>
          <h2>Executive resilience checks</h2>
          <div className="readiness-list">
            {readinessItems.map((item) => (
              <div className="readiness-row" key={item.label}>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.description}</span>
                </div>
                <em>{item.status}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="split-section">
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

        <div id="help" className="panel-card help-panel">
          <div className="section-kicker"><CircleHelp size={16} /> Terminology Help</div>
          <h2>Cyber intelligence terms</h2>
          <div className="term-list">
            {terminology.map((item) => (
              <div className="term-row" key={item.term}>
                <strong>{item.term}</strong>
                <span>{item.meaning}</span>
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
            intelligence summaries. For now, this build improves structure, readability, and cyber-specific decision support.
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
      <p>Cygnus Cyber Risk Intelligence Tracker v0.5 · Static cyber intelligence preview · No live API data in this build</p>
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

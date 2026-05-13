import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import {
  Activity,
  BadgeCheck,
  ShieldQuestion,
  Megaphone,
  ListChecks,
  BookOpenCheck,
  UserCheck,
  SlidersHorizontal,
  MessageSquareWarning,
  KeyRound,
  Bot,
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
  Store,
  Building2,
  HeartPulse,
  Factory,
  Printer,
  FileText,
  Flame,
  Globe2,
  Info,
  Landmark,
  Layers3,
  LockKeyhole,
  Network,
  MousePointerClick,
  LocateFixed,
  MapPinned,
  BellRing,
  BookMarked,
  RadioTower,
  Newspaper,
  BriefcaseBusiness,
  NotebookPen,
  Radar,
  RefreshCcw,
  Rss,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  CircleDollarSign,
  Scale,
  CloudCog,
  Handshake,
  FileCheck2,
  Banknote,
  ShieldPlus,
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

const aiPatchingItems = [
  {
    title: 'Prompt Injection Exposure',
    severity: 'High',
    patchType: 'Prompt / Guardrail',
    icon: <MessageSquareWarning size={20} />,
    summary: 'Attackers may attempt to override instructions, manipulate tools, or extract sensitive information through crafted prompts.',
    actions: ['Harden system prompts', 'Validate user inputs', 'Limit tool access', 'Test common injection patterns']
  },
  {
    title: 'Sensitive Data Leakage',
    severity: 'High',
    patchType: 'Data / Access Control',
    icon: <KeyRound size={20} />,
    summary: 'AI systems can expose confidential data if retrieval, tool permissions, logging, or redaction rules are not controlled.',
    actions: ['Review data access', 'Strengthen redaction', 'Limit retrieval scope', 'Monitor unusual outputs']
  },
  {
    title: 'Model Over-Trust',
    severity: 'Elevated',
    patchType: 'Human Oversight',
    icon: <UserCheck size={20} />,
    summary: 'Users may over-rely on AI outputs for high-impact operational, legal, financial, cyber, or strategic decisions.',
    actions: ['Add human review', 'Label confidence clearly', 'Restrict autonomous decisions', 'Escalate high-impact outputs']
  },
  {
    title: 'AI Supply Chain Risk',
    severity: 'Elevated',
    patchType: 'Vendor / Integration',
    icon: <Bot size={20} />,
    summary: 'AI vendors, APIs, plugins, models, browser extensions, and third-party integrations can introduce hidden exposure.',
    actions: ['Review AI vendors', 'Track integrations', 'Limit plugin permissions', 'Check contractual safeguards']
  },
  {
    title: 'Output Drift or Inconsistency',
    severity: 'Moderate',
    patchType: 'Evaluation / Testing',
    icon: <SlidersHorizontal size={20} />,
    summary: 'AI behaviour can change across model updates, prompt changes, data shifts, or configuration changes.',
    actions: ['Retest key workflows', 'Maintain evaluation cases', 'Track model changes', 'Review failure patterns']
  }
];

const aiPatchCycle = [
  { step: 'Identify', detail: 'Find exposed AI workflows, data paths, tools, users, and high-impact decision points.' },
  { step: 'Contain', detail: 'Restrict risky access, disable unsafe tools, and reduce data exposure while fixes are prepared.' },
  { step: 'Patch', detail: 'Update prompts, policies, permissions, validation rules, logging, and human review controls.' },
  { step: 'Verify', detail: 'Retest outputs, review logs, check edge cases, and confirm that the risk has been reduced.' }
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


const cyberMapMarkers = [
  {
    region: 'United Kingdom',
    coordinates: [54.5, -2.5],
    riskLevel: 'Elevated',
    category: 'Advisory concentration',
    sourceBasis: 'NCSC Reports & Advisories',
    sectors: ['Government', 'Financial Services', 'SME / Mid-market'],
    analystNote: 'Monitor official guidance affecting internet-facing systems, identity controls, cloud services, and supplier dependencies.',
    recommendedAction: 'Use NCSC items to validate exposure, patch priorities, and readiness controls for UK-linked operations or suppliers.'
  },
  {
    region: 'Europe',
    coordinates: [50.8, 10.4],
    riskLevel: 'Elevated',
    category: 'Ransomware / supply-chain exposure',
    sourceBasis: 'OTX + NCSC monitoring',
    sectors: ['Healthcare', 'Government', 'Technology / Service Providers'],
    analystNote: 'European organisations remain exposed to ransomware, supplier compromise, and regulatory pressure around data protection and resilience.',
    recommendedAction: 'Review backup recovery, vendor dependencies, endpoint visibility, and incident communication planning.'
  },
  {
    region: 'North America',
    coordinates: [39.5, -98.35],
    riskLevel: 'Elevated',
    category: 'Credential theft / cloud exposure',
    sourceBasis: 'OTX pulse monitoring',
    sectors: ['Financial Services', 'Technology / Service Providers', 'SME / Mid-market'],
    analystNote: 'Cloud identity compromise, phishing, and business email compromise remain key pathways to financial and operational loss.',
    recommendedAction: 'Prioritise MFA coverage, suspicious sign-in monitoring, privileged cloud accounts, and payment-change controls.'
  },
  {
    region: 'Middle East',
    coordinates: [29.3, 47.7],
    riskLevel: 'High',
    category: 'Geopolitical cyber watch',
    sourceBasis: 'Strategic cyber monitoring',
    sectors: ['Energy & Utilities', 'Government', 'Financial Services'],
    analystNote: 'Geopolitical tensions can increase cyber targeting of government, energy, financial, and critical infrastructure entities.',
    recommendedAction: 'Strengthen monitoring for edge-device exposure, phishing themes, destructive malware signals, and supplier disruption.'
  },
  {
    region: 'Africa',
    coordinates: [-1.3, 24.5],
    riskLevel: 'Moderate',
    category: 'Fraud and infrastructure exposure',
    sourceBasis: 'Regional monitoring',
    sectors: ['Financial Services', 'SME / Mid-market', 'Government'],
    analystNote: 'Digital growth and uneven security maturity create exposure to fraud, credential theft, service disruption, and third-party IT dependency.',
    recommendedAction: 'Focus on email security, MFA, backup discipline, vendor controls, and practical incident response readiness.'
  },
  {
    region: 'Asia-Pacific',
    coordinates: [1.3, 103.8],
    riskLevel: 'Elevated',
    category: 'Supply-chain and cloud dependency',
    sourceBasis: 'OTX + advisory monitoring',
    sectors: ['Technology / Service Providers', 'Manufacturing', 'Financial Services'],
    analystNote: 'Dense technology ecosystems, cloud dependency, and supply-chain connectivity increase the relevance of vendor and platform risk.',
    recommendedAction: 'Map critical third parties, review cloud access controls, and monitor advisory themes affecting widely used technologies.'
  },
  {
    region: 'Latin America',
    coordinates: [-15.8, -47.9],
    riskLevel: 'Moderate',
    category: 'Ransomware and fraud monitoring',
    sourceBasis: 'Strategic cyber monitoring',
    sectors: ['Financial Services', 'Government', 'SME / Mid-market'],
    analystNote: 'Ransomware, payment fraud, and public-sector disruption remain relevant monitoring themes for the region.',
    recommendedAction: 'Review resilience controls, user-awareness measures, endpoint visibility, and incident escalation paths.'
  }
];

const mapLegendItems = [
  { level: 'High', description: 'Potentially significant disruption, exposure, or strategic concern requiring priority review.' },
  { level: 'Elevated', description: 'Meaningful cyber risk theme requiring active monitoring and control validation.' },
  { level: 'Moderate', description: 'Relevant monitoring area where exposure depends strongly on sector, suppliers, and local controls.' }
];

const ncscGuidanceItems = [
  {
    title: 'Reports & Advisories',
    icon: <Newspaper size={22} />,
    summary: 'Official advisory-style updates can help organisations understand exploitation campaigns, vulnerability alerts, threat actor activity, and priority mitigation themes.',
    riskLens: 'Use advisories to validate whether the organisation, its suppliers, or its critical technologies may be affected.'
  },
  {
    title: 'Threat Reports',
    icon: <RadioTower size={22} />,
    summary: 'Threat reports provide a higher-level picture of emerging cyber activity, attack patterns, and strategic cyber risk trends.',
    riskLens: 'Use threat reports to brief executives, adjust monitoring priorities, and support cyber risk horizon scanning.'
  },
  {
    title: 'Early Warning Concept',
    icon: <BellRing size={22} />,
    summary: 'Early warning capability focuses on alerting organisations to network abuse, potential incidents, exposed services, vulnerabilities, or other signs of external cyber exposure.',
    riskLens: 'Use this concept to strengthen attack-surface awareness, external exposure monitoring, and incident escalation readiness.'
  },
  {
    title: 'Mitigation Guidance',
    icon: <BookMarked size={22} />,
    summary: 'Practical guidance supports controls such as logging, monitoring, patching, access control, incident response, cloud security, and secure configuration.',
    riskLens: 'Use mitigation guidance to strengthen readiness, support insurance control evidence, and prioritise remediation actions.'
  }
];

const ncscActionChecklist = [
  'Monitor official advisories for affected technologies, known exploited vulnerabilities, and recommended mitigations.',
  'Compare advisory themes with live OTX pulses, sector relevance tags, and known organisational exposure.',
  'Review whether affected systems are internet-facing, business-critical, supplier-managed, or linked to privileged access.',
  'Use guidance themes to strengthen cyber insurance readiness evidence, including MFA, backups, logging, and patching.',
  'Escalate high-impact advisories into executive cyber briefing, incident response planning, and board-level risk reporting.'
];

const ncscFutureIntegrations = [
  'Live NCSC RSS feed for reports and advisories',
  'Cygnus analyst notes for advisory items',
  'Sector relevance tagging for official advisories',
  'Readiness and insurance impact mapping',
  'Links to full official NCSC guidance pages'
];

const insuranceCoverageItems = [
  {
    title: 'Incident response and recovery',
    icon: <ShieldPlus size={22} />,
    summary: 'Cyber policies may support forensic investigation, legal advice, breach response, crisis communications, notification costs, and specialist recovery support.',
    focus: ['Digital forensics', 'Legal support', 'Crisis communications', 'Data restoration']
  },
  {
    title: 'Ransomware and extortion',
    icon: <Banknote size={22} />,
    summary: 'Policies may address extortion response, negotiation support, recovery costs, and business interruption, subject to policy wording, legality, exclusions, and sublimits.',
    focus: ['Extortion response', 'Restoration costs', 'Downtime losses', 'Policy sublimits']
  },
  {
    title: 'Business interruption',
    icon: <CloudCog size={22} />,
    summary: 'Cover may apply where a cyber incident disrupts operations, customer portals, production systems, cloud services, logistics, payment flows, or other critical technology dependencies.',
    focus: ['Lost income', 'Extra expense', 'Cloud dependency', 'Supplier disruption']
  },
  {
    title: 'Cyber crime and social engineering',
    icon: <CircleDollarSign size={22} />,
    summary: 'Some policies or extensions may address invoice redirection, business email compromise, fraudulent payment instructions, and credential-enabled financial loss.',
    focus: ['BEC fraud', 'Invoice redirection', 'Funds transfer loss', 'Approval controls']
  }
];

const insuranceReadinessItems = [
  'Multi-factor authentication for email, cloud, VPN, finance, and privileged accounts',
  'Offline or isolated backups with tested restoration capability',
  'Patch management for exposed systems, critical applications, and third-party platforms',
  'Endpoint detection, logging, and incident response escalation procedures',
  'Privileged access controls and joiner/mover/leaver access reviews',
  'Vendor and cloud dependency mapping for critical service providers'
];

const brokerQuestions = [
  'Does the policy cover ransomware, extortion support, restoration costs, and business interruption?',
  'Are ransom payments covered only where lawful, and are there any specific sublimits?',
  'Does the wording cover cloud outages, managed service provider incidents, or software supply-chain disruption?',
  'Does the policy cover business email compromise, social engineering fraud, and invoice redirection?',
  'Are AI-related cyber incidents excluded, sublimited, or subject to additional underwriting requirements?',
  'Which incident response vendors must be used, and what notification timelines apply after discovery?'
];

const executivePriorities = [
  {
    title: 'Identity and access control',
    detail: 'Prioritise MFA coverage, privileged account controls, suspicious sign-in monitoring, and business email compromise prevention.'
  },
  {
    title: 'Resilience against disruption',
    detail: 'Validate backups, incident escalation roles, restore procedures, endpoint visibility, and communication plans.'
  },
  {
    title: 'AI-enabled system governance',
    detail: 'Review AI access to sensitive data, harden prompts and guardrails, and define human review for high-impact outputs.'
  }
];

const executiveActions = [
  'Review live OTX pulses for overlap with known assets, vendors, cloud services, and exposed systems.',
  'Use sector relevance tags to prioritise review for industries and operating environments most likely to be affected.',
  'Treat AI patching as part of cyber resilience: prompt controls, access limits, logging, validation, and human oversight.'
];

function getSeverityClass(level) {
  if (level === 'High') return 'risk-high';
  if (level === 'Elevated') return 'risk-elevated';
  return 'risk-moderate';
}

function Header() {
  return (
    <header className="hero-shell global-style-landing">
      <div className="global-brand-header">
        <div>
          <div className="brand-title">CYGNUS DEVELOPMENT</div>
          <div className="brand-tagline">RISK INTELLIGENCE TECHNOLOGY</div>
        </div>
      </div>

      <nav className="landing-nav">
        <a href="#executive-briefing">Briefing</a>
        <a href="#cyber-risk-map">Risk Map</a>
        <a href="#ncsc-live">NCSC Feed</a>
        <a href="#ncsc-guidance">NCSC Guidance</a>
        <a href="#cyber-insurance">Insurance</a>
        <a href="#watchlist">Watchlist</a>
        <a href="#otx-live">OTX Feed</a>
        <a href="#ai-patching">AI Patching</a>
        <a href="#threat-landscape">Threats</a>
        <a href="#help">Help</a>
      </nav>

      <section className="landing-hero">
        <div className="version-banner">
          <ShieldCheck size={20} />
          <span>Tracker v1.4.5 · Cyber Risk Intelligence Map</span>
        </div>

        <h1>Cygnus Cyber Risk Intelligence Tracker</h1>
        <p className="hero-statement">Turning cyber uncertainty into structured insight</p>
        <p className="hero-description">
          A public preview of the Cygnus cyber risk intelligence framework — now aligned with the visual language of
          the Global Strategic Risk Intelligence Tracker and enhanced with an executive briefing layer, a real cyber risk intelligence map, live NCSC advisory feed, cyber insurance and risk transfer guidance,
          live OTX source links, AI systems risk patching, strategic watchlists, and executive readiness guidance.
        </p>

        <div className="landing-feature-stack">
          <article>
            <strong>Monitor cyber signals</strong>
            <span>Track live OTX pulses, priority cyber themes, and emerging risk indicators.</span>
          </article>
          <article>
            <strong>Review AI exposure</strong>
            <span>Assess AI system risks such as prompt injection, data leakage, model over-trust, and output drift.</span>
          </article>
          <article>
            <strong>Support decisions</strong>
            <span>Translate technical cyber signals into structured business-risk and resilience priorities.</span>
          </article>
        </div>

        <div className="landing-actions">
          <a href="#otx-live" className="landing-button primary"><Layers3 size={20} /> Explore OTX Feed</a>
          <a href="#ai-patching" className="landing-button secondary"><FileText size={20} /> View AI Patching</a>
          <a href="#help" className="landing-button secondary"><CircleHelp size={20} /> Help & Methodology</a>
          <button className="landing-button secondary" type="button" onClick={() => window.print()}><Printer size={20} /> Print / Save Briefing</button>
        </div>

        <div className="snapshot-card">
          <div className="snapshot-icon"><Radar size={28} /></div>
          <div>
            <span>Public Preview Snapshot</span>
            <strong>Structured cyber risk insight</strong>
            <p>v1.4.5 adds a proper OpenStreetMap-based Cyber Risk Intelligence Map with curated regional indicators and source-backed notes.</p>
          </div>
        </div>
      </section>
    </header>
  );
}



function getMapRiskColor(level) {
  if (level === 'High') return '#c5162e';
  if (level === 'Elevated') return '#b88924';
  return '#169b7c';
}

function getMapRiskRadius(level) {
  if (level === 'High') return 15;
  if (level === 'Elevated') return 12;
  return 10;
}

function buildNcscAnalystNote(item) {
  const text = `${item.title || ''} ${item.summary || ''}`.toLowerCase();

  if (text.includes('vulnerab') || text.includes('cve') || text.includes('patch') || text.includes('exploit')) {
    return {
      relevance: 'Patch and exposure risk',
      action: 'Check whether the affected technology exists in your environment or supply chain, then prioritise exposed and business-critical systems.'
    };
  }

  if (text.includes('ransom') || text.includes('malware')) {
    return {
      relevance: 'Operational disruption risk',
      action: 'Review backup recoverability, endpoint visibility, incident response roles, and critical process recovery plans.'
    };
  }

  if (text.includes('phish') || text.includes('messaging') || text.includes('credential') || text.includes('account')) {
    return {
      relevance: 'Identity and user-targeting risk',
      action: 'Review MFA coverage, suspicious sign-in monitoring, inbox rules, user awareness, and high-risk account protections.'
    };
  }

  if (text.includes('router') || text.includes('vpn') || text.includes('firewall') || text.includes('edge')) {
    return {
      relevance: 'Internet-facing infrastructure risk',
      action: 'Validate external exposure, firmware status, administrative access controls, and monitoring for edge-device compromise.'
    };
  }

  return {
    relevance: 'Official advisory monitoring',
    action: 'Compare the advisory theme against critical assets, key vendors, exposed services, and current executive cyber priorities.'
  };
}


function CyberRiskMapSection() {
  return (
    <section id="cyber-risk-map" className="content-section cyber-risk-map-section">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><MapPinned size={16} /> Cyber Risk Intelligence Map</div>
          <h2>Curated regional cyber risk indicators</h2>
          <p>
            This map is a strategic situational-awareness layer, not a simulated attack map. Each marker represents a
            curated cyber risk indicator with a clear theme, source basis, sector relevance, and Cygnus analyst note.
          </p>
        </div>
      </div>

      <div className="map-value-note">
        <MapPinned size={20} />
        <div>
          <strong>Map purpose</strong>
          <span>
            The map helps users understand where cyber risk signals or advisory concerns may be strategically relevant,
            and why they matter for resilience, insurance readiness, sector exposure, and executive monitoring.
          </span>
        </div>
      </div>

      <div className="cyber-map-layout">
        <div className="cyber-map-card">
          <MapContainer
            center={[20, 10]}
            zoom={2}
            minZoom={2}
            maxZoom={5}
            scrollWheelZoom={false}
            worldCopyJump={true}
            className="cyber-map"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {cyberMapMarkers.map((marker) => (
              <CircleMarker
                key={marker.region}
                center={marker.coordinates}
                radius={getMapRiskRadius(marker.riskLevel)}
                pathOptions={{
                  color: '#ffffff',
                  weight: 2,
                  fillColor: getMapRiskColor(marker.riskLevel),
                  fillOpacity: 0.86
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <strong>{marker.region}</strong>
                    <span className={`map-risk-pill ${getSeverityClass(marker.riskLevel)}`}>{marker.riskLevel}</span>
                    <p><b>Theme:</b> {marker.category}</p>
                    <p><b>Source basis:</b> {marker.sourceBasis}</p>
                    <p><b>Cygnus note:</b> {marker.analystNote}</p>
                    <p><b>Recommended action:</b> {marker.recommendedAction}</p>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
          <div className="map-caption">
            <MousePointerClick size={16} />
            <span>Click a marker to review the curated regional intelligence note.</span>
          </div>
        </div>

        <aside className="map-side-panel">
          <div className="section-kicker"><LocateFixed size={16} /> Map Method</div>
          <h3>Curated, not exhaustive</h3>
          <p>
            The map does not claim to show all cyber attacks. It highlights selected regional intelligence themes that
            help users prioritise monitoring, controls, sector exposure, and executive review.
          </p>

          <div className="map-legend">
            {mapLegendItems.map((item) => (
              <div className="map-legend-row" key={item.level}>
                <span style={{ backgroundColor: getMapRiskColor(item.level) }} />
                <div>
                  <strong>{item.level}</strong>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="map-marker-grid">
        {cyberMapMarkers.map((marker) => (
          <article className="map-marker-card" key={marker.region}>
            <div className="map-marker-topline">
              <strong>{marker.region}</strong>
              <span className={`risk-pill ${getSeverityClass(marker.riskLevel)}`}>{marker.riskLevel}</span>
            </div>
            <p>{marker.analystNote}</p>
            <div className="sector-tag-row">
              {marker.sectors.map((sector) => <span key={sector}>{sector}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function NcscLivePanel() {
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('Checking live NCSC RSS route...');
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function loadNcscFeed() {
      try {
        const response = await fetch('/api/ncsc-feed');
        const data = await response.json();

        if (ignore) return;

        if (!response.ok || !data.ok) {
          setStatus('fallback');
          setMessage(data.message || 'NCSC RSS feed is not available in this environment yet.');
          setItems([]);
          return;
        }

        setStatus('live');
        setMessage(data.message || 'NCSC RSS feed loaded through the serverless route.');
        setItems(data.items || []);
      } catch (error) {
        if (ignore) return;
        setStatus('fallback');
        setMessage('NCSC RSS preview is unavailable. Static guidance remains active.');
        setItems([]);
      }
    }

    loadNcscFeed();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section id="ncsc-live" className="content-section ncsc-live-section">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><Rss size={16} /> Live NCSC RSS Feed</div>
          <h2>Official reports and advisory updates</h2>
          <p>
            This panel loads NCSC reports and advisory updates through a lightweight Vercel serverless route. It does
            not require an API key and complements the existing OTX feed with an official guidance source.
          </p>
        </div>
        <div className={`otx-status ${status}`}>{status === 'live' ? 'Live NCSC route active' : status === 'loading' ? 'Checking route' : 'Fallback mode'}</div>
      </div>

      <div className="ncsc-live-panel">
        <div className="ncsc-live-summary">
          <div className="status-row"><span className="pulse-dot" /> {message}</div>
          <h3>NCSC RSS Foundation</h3>
          <p>
            The frontend requests <strong>/api/ncsc-feed</strong>. The serverless function fetches the public NCSC
            reports/advisories RSS feed and returns simplified items for the tracker.
          </p>
        </div>

        <div className="ncsc-feed-list">
          {status === 'live' && items.length > 0 ? (
            items.map((item) => {
              const note = buildNcscAnalystNote(item);
              return (
                <article className="ncsc-feed-card" key={item.link || item.title}>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.summary || 'No summary provided in the RSS preview payload.'}</span>
                  </div>
                  <div className="otx-meta">
                    <em>{item.pubDate || 'Publish date unavailable'}</em>
                    <em>{item.source || 'NCSC'}</em>
                  </div>

                  <div className="analyst-note-card">
                    <div className="analyst-note-heading">
                      <NotebookPen size={16} />
                      <strong>Cygnus Analyst Note</strong>
                      <em>{note.relevance}</em>
                    </div>
                    <p>{note.action}</p>
                  </div>

                  {item.link ? (
                    <a
                      className="otx-source-link"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open full NCSC item for ${item.title}`}
                    >
                      View full NCSC item <ExternalLink size={14} />
                    </a>
                  ) : (
                    <span className="otx-source-link disabled">Source link unavailable</span>
                  )}
                </article>
              );
            })
          ) : (
            <article className="ncsc-feed-card static-fallback">
              <strong>Static NCSC guidance active</strong>
              <span>
                The tracker remains fully usable while the live NCSC RSS route is unavailable. The static advisory
                and guidance layer below remains active.
              </span>
              <div className="otx-meta"><em>No API key required</em><em>Safe fallback</em></div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function NcscGuidanceSection() {
  return (
    <section id="ncsc-guidance" className="content-section ncsc-guidance-section">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><BookMarked size={16} /> NCSC Advisory & Guidance Layer</div>
          <h2>Official guidance translated into cyber risk priorities</h2>
          <p>
            This static v1.2 layer introduces an NCSC-style advisory and guidance framework. It is designed to sit
            alongside the live OTX feed by adding an official-guidance perspective on cyber risk, readiness, mitigation,
            incident response, and executive decision-making.
          </p>
        </div>
      </div>

      <div className="ncsc-hero-card">
        <div>
          <span>Authoritative guidance lens</span>
          <strong>Use official advisories to validate exposure and prioritise response.</strong>
          <p>
            OTX provides live threat intelligence signals. NCSC-style guidance adds a more formal advisory and mitigation
            layer. Cygnus connects both into business impact, sector relevance, insurance readiness, and executive action.
          </p>
        </div>
        <a
          className="ncsc-source-button"
          href="https://www.ncsc.gov.uk/section/keep-up-to-date/reports-advisories"
          target="_blank"
          rel="noreferrer"
        >
          View NCSC advisories <ExternalLink size={16} />
        </a>
      </div>

      <div className="ncsc-grid">
        {ncscGuidanceItems.map((item) => (
          <article className="ncsc-card" key={item.title}>
            <div className="ncsc-card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="ncsc-risk-lens">
              <strong>Cygnus risk lens:</strong>
              <span>{item.riskLens}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="ncsc-split">
        <article className="ncsc-panel">
          <div className="section-kicker"><ShieldCheck size={16} /> Advisory Action Checklist</div>
          <h3>How to use official guidance in the tracker</h3>
          <div className="ncsc-action-list">
            {ncscActionChecklist.map((item) => (
              <div className="ncsc-action-row" key={item}>
                <CheckCircle2 size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="ncsc-panel future-ncsc-panel">
          <div className="section-kicker"><DatabaseZap size={16} /> Future Live Feed Phase</div>
          <h3>Now live in v1.3</h3>
          <p>
            v1.3 adds a lightweight serverless RSS route for NCSC reports and advisories. It does not require an API key and complements the existing OTX feed.
          </p>
          <div className="ncsc-future-list">
            {ncscFutureIntegrations.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function CyberInsuranceSection() {
  return (
    <section id="cyber-insurance" className="content-section cyber-insurance-section">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><ShieldPlus size={16} /> Cyber Insurance & Risk Transfer</div>
          <h2>Financial resilience against cyber incidents</h2>
          <p>
            Cyber insurance does not replace cybersecurity controls, but it can help organisations manage the financial
            impact of cyber incidents, including response costs, business interruption, ransomware events, data breaches,
            cyber crime, and third-party technology disruption.
          </p>
        </div>
      </div>

      <div className="insurance-hero-card">
        <div>
          <span>Risk transfer lens</span>
          <strong>Insurance is part of resilience, not a substitute for controls.</strong>
          <p>
            The strongest cyber risk posture combines prevention, detection, response readiness, recovery capability,
            and carefully reviewed insurance cover. Policy wording, exclusions, sublimits, and required security controls
            should be checked before an incident occurs.
          </p>
        </div>
        <div className="insurance-icon-stack">
          <FileCheck2 />
          <Handshake />
          <Scale />
        </div>
      </div>

      <div className="insurance-grid">
        {insuranceCoverageItems.map((item) => (
          <article className="insurance-card" key={item.title}>
            <div className="insurance-card-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <div className="insurance-focus-row">
              {item.focus.map((focus) => <span key={focus}>{focus}</span>)}
            </div>
          </article>
        ))}
      </div>

      <div className="insurance-split">
        <article className="insurance-panel">
          <div className="section-kicker"><FileCheck2 size={16} /> Insurance Readiness Checklist</div>
          <h3>Controls insurers commonly expect</h3>
          <div className="insurance-checklist">
            {insuranceReadinessItems.map((item) => (
              <div className="insurance-check-row" key={item}>
                <ShieldCheck size={16} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="insurance-panel broker-panel">
          <div className="section-kicker"><Handshake size={16} /> Broker / Insurer Questions</div>
          <h3>Questions to ask before relying on the policy</h3>
          <div className="broker-question-list">
            {brokerQuestions.map((question) => (
              <div className="broker-question-row" key={question}>
                <Scale size={16} />
                <span>{question}</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function ExecutiveBriefing() {
  return (
    <section id="executive-briefing" className="content-section executive-briefing-section">
      <div className="section-heading">
        <div>
          <div className="section-kicker"><BookOpenCheck size={16} /> Executive Cyber Briefing</div>
          <h2>Current cyber risk intelligence summary</h2>
          <p>
            A concise executive layer that brings together the live OTX feed, analyst notes, sector relevance, AI systems risk,
            and operational readiness into one decision-focused view.
          </p>
        </div>
      </div>

      <div className="briefing-grid">
        <article className="briefing-hero-card">
          <div className="briefing-topline">
            <span>Current posture</span>
            <strong>Elevated</strong>
          </div>
          <p>
            The current cyber risk posture remains elevated due to persistent ransomware, credential compromise,
            exposed systems, third-party dependency, and the growing governance challenge of AI-enabled systems.
          </p>
          <div className="briefing-meta-row">
            <em>Live OTX feed active where configured</em>
            <em>Analyst notes enabled</em>
            <em>Sector relevance enabled</em>
          </div>
        </article>

        <div className="briefing-priority-stack">
          {executivePriorities.map((item) => (
            <article className="briefing-priority-card" key={item.title}>
              <ShieldQuestion size={20} />
              <div>
                <strong>{item.title}</strong>
                <span>{item.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="briefing-actions-card">
        <div>
          <div className="section-kicker"><ListChecks size={16} /> Recommended Executive Actions</div>
          <h3>Priority actions for the next review cycle</h3>
        </div>
        <div className="briefing-action-list">
          {executiveActions.map((action) => (
            <div className="briefing-action-row" key={action}>
              <Megaphone size={17} />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
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



function buildAnalystNote(pulse) {
  const text = `${pulse.name || ''} ${pulse.description || ''}`.toLowerCase();

  if (text.includes('ransom') || text.includes('extortion')) {
    return {
      relevance: 'Business continuity risk',
      note: 'This pulse may indicate activity linked to ransomware or extortion. Organisations should review backup recoverability, privileged access, endpoint visibility, and incident escalation readiness.',
      action: 'Prioritise restore testing, account hardening, and detection of lateral movement or backup deletion attempts.'
    };
  }

  if (text.includes('phish') || text.includes('credential') || text.includes('email')) {
    return {
      relevance: 'Identity and fraud exposure',
      note: 'This pulse may relate to credential theft, phishing, or business email compromise. The most relevant business risk is unauthorised access to email, finance workflows, cloud accounts, or privileged systems.',
      action: 'Review MFA coverage, suspicious inbox rules, impossible-travel alerts, and payment-change approval controls.'
    };
  }

  if (text.includes('malware') || text.includes('trojan') || text.includes('loader') || text.includes('backdoor')) {
    return {
      relevance: 'Endpoint and persistence risk',
      note: 'This pulse may indicate malware delivery, persistence, or post-compromise tooling. The business concern is loss of endpoint integrity, data exposure, and possible staging for wider compromise.',
      action: 'Check endpoint detections, unusual process activity, command-and-control indicators, and recently downloaded files.'
    };
  }

  if (text.includes('cve') || text.includes('vulnerab') || text.includes('exploit')) {
    return {
      relevance: 'Patch and exposure risk',
      note: 'This pulse may relate to vulnerability exploitation or exposed systems. The strategic concern is whether internet-facing assets, third-party platforms, or critical applications are vulnerable.',
      action: 'Review exposed assets, confirm patch status, and prioritise externally reachable systems with privileged access paths.'
    };
  }

  if (text.includes('cloud') || text.includes('aws') || text.includes('azure') || text.includes('google cloud')) {
    return {
      relevance: 'Cloud control risk',
      note: 'This pulse may relate to cloud exposure, identity misuse, or misconfiguration. The key risk is unauthorised access to cloud resources, data stores, or administrative consoles.',
      action: 'Review privileged cloud identities, storage exposure, audit logging, service accounts, and unusual API activity.'
    };
  }

  return {
    relevance: 'Strategic cyber monitoring',
    note: 'This pulse should be treated as a monitoring signal rather than a standalone conclusion. Review whether the indicators, tactics, or affected technologies overlap with your environment or critical suppliers.',
    action: 'Compare the pulse against known assets, key vendors, exposed systems, security logs, and current incident priorities.'
  };
}


function buildSectorRelevance(pulse) {
  const text = `${pulse.name || ''} ${pulse.description || ''}`.toLowerCase();

  const sectors = new Set();

  if (text.includes('bank') || text.includes('finance') || text.includes('payment') || text.includes('invoice') || text.includes('fraud')) {
    sectors.add('Financial Services');
  }

  if (text.includes('health') || text.includes('hospital') || text.includes('patient') || text.includes('medical')) {
    sectors.add('Healthcare');
  }

  if (text.includes('government') || text.includes('public sector') || text.includes('municipal') || text.includes('state')) {
    sectors.add('Government');
  }

  if (text.includes('energy') || text.includes('utility') || text.includes('industrial') || text.includes('ot ') || text.includes('ics') || text.includes('scada')) {
    sectors.add('Energy & Utilities');
  }

  if (text.includes('ransom') || text.includes('phish') || text.includes('credential') || text.includes('malware') || text.includes('cve') || text.includes('exploit')) {
    sectors.add('SME / Mid-market');
  }

  if (text.includes('cloud') || text.includes('supply') || text.includes('vendor') || text.includes('third-party')) {
    sectors.add('Technology / Service Providers');
  }

  const list = Array.from(sectors);

  return list.length > 0 ? list.slice(0, 4) : ['Cross-sector monitoring'];
}

function getSectorIcon(sector) {
  if (sector.includes('Financial')) return <Building2 size={14} />;
  if (sector.includes('Healthcare')) return <HeartPulse size={14} />;
  if (sector.includes('Government')) return <Landmark size={14} />;
  if (sector.includes('Energy')) return <Factory size={14} />;
  if (sector.includes('SME')) return <Store size={14} />;
  return <Globe2 size={14} />;
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
          <h2>Live cyber source feed</h2>
          <p>
            A curated live/open-source preview using a secure Vercel serverless route. Each item includes a Cygnus Analyst Note, sector relevance tags, and a link to the full OTX pulse in a new browser tab.
          </p>
        </div>
        <div className={`otx-status ${status}`}>{status === 'live' ? 'Live route active' : status === 'loading' ? 'Checking route' : 'Fallback mode'}</div>
      </div>

      <div className="otx-panel">
        <div className="otx-summary-card">
          <div className="status-row"><span className="pulse-dot" /> {message}</div>
          <h3>OTX API Foundation</h3>
          <p>
            The frontend requests <strong>/api/otx-pulses</strong>. The serverless function keeps the private OTX API key on the server side and returns simplified pulse summaries plus source links. The analyst note layer then translates those signals into business-risk language.
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

                {(() => {
                  const analystNote = buildAnalystNote(pulse);
                  return (
                    <div className="analyst-note-card">
                      <div className="analyst-note-heading">
                        <NotebookPen size={16} />
                        <strong>Cygnus Analyst Note</strong>
                        <em>{analystNote.relevance}</em>
                      </div>
                      <p>{analystNote.note}</p>
                      <div className="analyst-action">
                        <BriefcaseBusiness size={15} />
                        <span><strong>Recommended monitoring action:</strong> {analystNote.action}</span>
                      </div>
                    </div>
                  );
                })()}

                <div className="sector-relevance-block">
                  <strong>Sector relevance</strong>
                  <div className="sector-tag-row">
                    {buildSectorRelevance(pulse).map((sector) => (
                      <span key={sector}>{getSectorIcon(sector)} {sector}</span>
                    ))}
                  </div>
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

      <ExecutiveBriefing />

      <CyberRiskMapSection />

      <NcscLivePanel />

      <NcscGuidanceSection />

      <CyberInsuranceSection />

      <OtxLivePanel />

      <section id="sector-relevance-overview" className="content-section sector-relevance-overview">
        <div className="section-heading">
          <div>
            <div className="section-kicker"><Layers3 size={16} /> Sector Relevance Layer</div>
            <h2>Cyber signals mapped to business exposure</h2>
            <p>
              v0.9 adds a lightweight sector relevance layer to help users understand whether a cyber signal may be
              more relevant to financial services, healthcare, government, energy, SMEs, technology providers, or cross-sector monitoring.
            </p>
          </div>
        </div>
        <div className="sector-explain-grid">
          <article>
            <Building2 size={22} />
            <strong>Financial Services</strong>
            <span>Fraud, credential theft, payment redirection, and third-party exposure.</span>
          </article>
          <article>
            <HeartPulse size={22} />
            <strong>Healthcare</strong>
            <span>Ransomware disruption, sensitive data exposure, and operational dependency.</span>
          </article>
          <article>
            <Landmark size={22} />
            <strong>Government</strong>
            <span>Public service disruption, espionage, identity exposure, and citizen trust impact.</span>
          </article>
          <article>
            <Factory size={22} />
            <strong>Energy & Utilities</strong>
            <span>Operational technology, critical infrastructure, and geopolitical targeting.</span>
          </article>
        </div>
      </section>


      <section id="ai-patching" className="content-section ai-patching-section">
        <div className="section-heading">
          <div>
            <div className="section-kicker"><Bot size={16} /> AI Systems Risk & Patching</div>
            <h2>AI patching for emerging cyber and governance exposure</h2>
            <p>
              Tracks practical actions for reducing risk in AI-enabled systems, including prompt hardening, data-access
              reviews, guardrail updates, output validation, logging improvements, and human-in-the-loop controls.
            </p>
          </div>
        </div>

        <div className="ai-patching-layout">
          <div className="ai-card-grid">
            {aiPatchingItems.map((item) => (
              <article className="ai-patch-card" key={item.title}>
                <div className="card-topline">
                  <div className="icon-bubble">{item.icon}</div>
                  <span className={`risk-pill ${getSeverityClass(item.severity)}`}>{item.severity}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className="patch-type">Patch type: <strong>{item.patchType}</strong></div>
                <div className="signal-list">
                  {item.actions.map((action) => <span key={action}>{action}</span>)}
                </div>
              </article>
            ))}
          </div>

          <aside className="ai-cycle-card">
            <div className="section-kicker"><ShieldCheck size={16} /> AI Patch Cycle</div>
            <h3>Practical remediation loop</h3>
            <div className="ai-cycle-list">
              {aiPatchCycle.map((item) => (
                <div className="ai-cycle-row" key={item.step}>
                  <strong>{item.step}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>


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
      <p>Cygnus Cyber Risk Intelligence Tracker v1.4.5.1 · Static cyber intelligence preview · No live API data in this build</p>
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

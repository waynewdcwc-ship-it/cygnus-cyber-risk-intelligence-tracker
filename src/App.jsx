
import React, { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import sidebarBrandBanner from './assets/cygnus-sidebar-banner.png';
import {
  Activity, Banknote, BellRing, BookMarked, BookOpenCheck, Bot, BriefcaseBusiness,
  Building2, CheckCircle2, CircleDollarSign, CircleHelp, ClipboardCheck, CloudCog,
  DatabaseZap, ExternalLink, Factory, FileCheck2, Flame, Globe2, Handshake,
  HeartPulse, KeyRound, Landmark, Layers3, LocateFixed, MapPinned, Megaphone,
  MessageSquareWarning, MousePointerClick, Newspaper, NotebookPen, RadioTower,
  Radar, Rss, Scale, ShieldAlert, ShieldCheck, ShieldPlus, ShieldQuestion, Siren,
  SlidersHorizontal, Store, UserCheck
} from 'lucide-react';

const navItems = [
  ['overview', 'Overview', Activity], ['cyber-risk-map', 'Risk Map', MapPinned],
  ['otx-live', 'OTX Live Feed', Radar], ['ncsc-live', 'NCSC Feed', Rss],
  ['executive-briefing', 'Executive Briefing', BookOpenCheck], ['ncsc-guidance', 'NCSC Guidance', BookMarked],
  ['cyber-insurance', 'Insurance', ShieldPlus], ['ai-patching', 'AI Patching', Bot],
  ['watchlist', 'Watchlist', ClipboardCheck], ['sector-relevance', 'Sector Relevance', Layers3],
  ['threat-landscape', 'Threat Landscape', Siren], ['readiness-help', 'Readiness & Help', CircleHelp]
];

const markers = [
  { region:'United Kingdom', coords:[54.5,-2.5], risk:'Elevated', theme:'Advisory concentration', source:'NCSC Reports & Advisories', sectors:['Government','Financial Services','SME / Mid-market'], note:'Monitor official guidance affecting internet-facing systems, identity controls, cloud services, and supplier dependencies.', action:'Validate exposure, patch priorities, and readiness controls for UK-linked operations or suppliers.' },
  { region:'Europe', coords:[50.8,10.4], risk:'Elevated', theme:'Ransomware / supply-chain exposure', source:'OTX + NCSC monitoring', sectors:['Healthcare','Government','Technology Providers'], note:'European organisations remain exposed to ransomware, supplier compromise, and regulatory pressure around data protection and resilience.', action:'Review backup recovery, vendor dependencies, endpoint visibility, and incident communication planning.' },
  { region:'North America', coords:[39.5,-98.35], risk:'Elevated', theme:'Credential theft / cloud exposure', source:'OTX pulse monitoring', sectors:['Financial Services','Technology Providers','SME / Mid-market'], note:'Cloud identity compromise, phishing, and business email compromise remain key pathways to financial and operational loss.', action:'Prioritise MFA, suspicious sign-in monitoring, privileged cloud accounts, and payment-change controls.' },
  { region:'Middle East', coords:[29.3,47.7], risk:'High', theme:'Geopolitical cyber watch', source:'Strategic cyber monitoring', sectors:['Energy & Utilities','Government','Financial Services'], note:'Geopolitical tensions can increase cyber targeting of government, energy, financial, and critical infrastructure entities.', action:'Strengthen monitoring for edge-device exposure, phishing themes, destructive malware signals, and supplier disruption.' },
  { region:'Africa', coords:[-1.3,24.5], risk:'Moderate', theme:'Fraud and infrastructure exposure', source:'Regional monitoring', sectors:['Financial Services','SME / Mid-market','Government'], note:'Digital growth and uneven security maturity create exposure to fraud, credential theft, service disruption, and third-party IT dependency.', action:'Focus on email security, MFA, backup discipline, vendor controls, and practical incident response readiness.' },
  { region:'Asia-Pacific', coords:[1.3,103.8], risk:'Elevated', theme:'Supply-chain and cloud dependency', source:'OTX + advisory monitoring', sectors:['Technology Providers','Manufacturing','Financial Services'], note:'Dense technology ecosystems, cloud dependency, and supply-chain connectivity increase vendor and platform risk.', action:'Map critical third parties, review cloud access controls, and monitor advisory themes affecting widely used technologies.' },
  { region:'Latin America', coords:[-15.8,-47.9], risk:'Moderate', theme:'Ransomware and fraud monitoring', source:'Strategic cyber monitoring', sectors:['Financial Services','Government','SME / Mid-market'], note:'Ransomware, payment fraud, and public-sector disruption remain relevant monitoring themes for the region.', action:'Review resilience controls, awareness measures, endpoint visibility, and incident escalation paths.' }
];

const threats = [
  ['Ransomware & Extortion','High','Increasing','Credential compromise, backup deletion, disruption risk'],
  ['Phishing & BEC','High','Increasing','Email compromise, invoice redirection, credential theft'],
  ['Supply Chain Risk','Elevated','Stable','Vendor exposure, update channels, third-party access'],
  ['Cloud Misconfiguration','Moderate','Stable','Identity controls, public storage, logging gaps']
];

const watchlist = [
  ['Identity compromise','Immediate','Monitor privileged access, MFA fatigue, suspicious sign-ins, and abnormal session persistence.'],
  ['Internet-facing systems','High','Track exposed VPNs, firewalls, remote access tools, web apps, and unmanaged external assets.'],
  ['Third-party dependency','High','Review critical vendors, cloud integrations, outsourced IT providers, and privileged service accounts.'],
  ['Data exposure','Elevated','Prioritise sensitive data locations, public cloud storage, email forwarding rules, and unusual outbound traffic.']
];

const aiItems = [
  ['Prompt Injection Exposure','High','Prompt / Guardrail','Harden system prompts, validate inputs, and limit tool access.', MessageSquareWarning],
  ['Sensitive Data Leakage','High','Data / Access Control','Review AI data access, redaction rules, retrieval scope, and output monitoring.', KeyRound],
  ['Model Over-Trust','Elevated','Human Oversight','Add review for high-impact AI outputs and restrict autonomous decisions.', UserCheck],
  ['AI Supply Chain Risk','Elevated','Vendor / Integration','Review vendors, APIs, plugins, model dependencies, and contractual safeguards.', Bot],
  ['Output Drift','Moderate','Evaluation / Testing','Retest key workflows and maintain evaluation cases after model/config changes.', SlidersHorizontal]
];

const insurance = [
  ['Incident response and recovery', 'Forensics, legal support, crisis communications, notification costs, and recovery support.', ShieldPlus],
  ['Ransomware and extortion', 'Extortion response, negotiation support, restoration costs, downtime losses, and policy sublimits.', Banknote],
  ['Business interruption', 'Losses linked to internal disruption, cloud platforms, service providers, logistics, or payment flows.', CloudCog],
  ['Cyber crime and social engineering', 'Business email compromise, invoice redirection, fraudulent payment instructions, and credential-enabled loss.', CircleDollarSign]
];

const ncscGuidance = [
  ['Reports & Advisories','Official updates on vulnerabilities, exploitation campaigns, threat activity, and mitigation themes.', Newspaper],
  ['Threat Reports','Higher-level view of cyber activity, attack patterns, and strategic cyber risk trends.', RadioTower],
  ['Early Warning Concept','Network abuse, incident signals, exposed services, vulnerabilities, and external cyber exposure.', BellRing],
  ['Mitigation Guidance','Controls for logging, monitoring, patching, access control, incident response, cloud security, and configuration.', BookMarked]
];

const sectorRisk = [
  ['Financial Services','High','Fraud, ransomware, credential compromise, and third-party exposure'],
  ['Healthcare','High','Ransomware disruption, sensitive data exposure, and operational dependency'],
  ['Government','High','Espionage, service disruption, identity exposure, and public trust impact'],
  ['Energy & Utilities','Elevated','Operational technology exposure and geopolitically driven targeting'],
  ['SME / Mid-market','Elevated','Lower detection maturity and reliance on outsourced IT providers']
];

const readiness = [
  ['Backups tested','Validate','Confirm restore tests, offline copies, and separation from production credentials.'],
  ['MFA coverage','Strengthen','Prioritise administrator, finance, email, VPN, and cloud access.'],
  ['Logging visibility','Improve','Ensure sign-in, endpoint, cloud, firewall, and email logs are retained.'],
  ['Incident roles','Define','Clarify decision-makers, responders, communications owners, and escalation paths.']
];

function riskClass(risk){ return risk === 'High' ? 'risk-high' : risk === 'Elevated' ? 'risk-elevated' : 'risk-moderate'; }
function riskColor(risk){ return risk === 'High' ? '#c5162e' : risk === 'Elevated' ? '#b88924' : '#169b7c'; }
function riskRadius(risk){ return risk === 'High' ? 15 : risk === 'Elevated' ? 12 : 10; }

function buildAnalystNote(item) {
  const text = `${item.name || item.title || ''} ${item.description || item.summary || ''}`.toLowerCase();
  if (text.includes('ransom') || text.includes('extortion')) return ['Business continuity risk','Review backup recoverability, privileged access, endpoint visibility, and incident escalation readiness.'];
  if (text.includes('phish') || text.includes('credential') || text.includes('email')) return ['Identity and fraud exposure','Review MFA coverage, inbox rules, impossible-travel alerts, and payment-change approval controls.'];
  if (text.includes('malware') || text.includes('trojan') || text.includes('loader')) return ['Endpoint and persistence risk','Check endpoint detections, unusual process activity, command-and-control indicators, and downloaded files.'];
  if (text.includes('cve') || text.includes('vulnerab') || text.includes('exploit')) return ['Patch and exposure risk','Review exposed assets, patch status, and externally reachable systems with privileged access paths.'];
  if (text.includes('cloud') || text.includes('aws') || text.includes('azure')) return ['Cloud control risk','Review privileged cloud identities, storage exposure, audit logging, service accounts, and unusual API activity.'];
  return ['Strategic cyber monitoring','Compare the item against known assets, vendors, exposed systems, logs, and current incident priorities.'];
}

function Sidebar(){
  return <aside className="sidebar">
    <div className="brand">
      <img src={sidebarBrandBanner} alt="Cygnus Development Risk Intelligence Technology" className="brand-banner" />
    </div>
    <nav>
      {navItems.map(([id,label,Icon]) => <a href={`#${id}`} key={id}><Icon size={17}/><span>{label}</span></a>)}
    </nav>
    <div className="side-status"><span className="live-dot"/><div><strong>v1.5.1 Prototype</strong><span>Continuous upgrades planned</span></div></div>
  </aside>
}

function DashboardHeader(){
  return <header id="overview" className="hero">
    <div>
      <div className="kicker"><Radar size={16}/> Now Live · Prototype Preview</div>
      <h1>Cygnus Cyber Risk Intelligence Tracker</h1>
      <p>A dashboard-style cyber risk intelligence prototype combining live feeds, curated regional risk mapping, analyst notes, sector relevance, AI patching, cyber insurance guidance, and executive decision support.</p>
    </div>
    <div className="posture-card"><span>Current posture</span><strong>Elevated</strong><em>Best viewed on PC or laptop. Mobile users should view in landscape mode.</em></div>
  </header>
}

function OverviewCards({otxCount,ncscCount}){
  const cards = [
    ['Overall Risk Posture','Elevated','Curated strategic view', ShieldAlert],
    ['OTX Signals', otxCount || 'Live','Secure route active where configured', Radar],
    ['NCSC Items', ncscCount || 'Live','RSS advisory route', Rss],
    ['Regions Monitored', markers.length,'Curated map indicators', MapPinned]
  ];
  return <section className="stat-grid">{cards.map(([l,v,n,Icon]) => <article className="stat" key={l}><div><Icon size={22}/></div><span>{l}</span><strong>{v}</strong><em>{n}</em></article>)}</section>
}

function CyberRiskMap(){
  return <section id="cyber-risk-map" className="map-section">
    <div className="note"><MapPinned size={20}/><div><strong>Map purpose</strong><span>The map highlights curated regional cyber risk indicators and explains why they matter for resilience, insurance readiness, sector exposure, and executive monitoring. It is not a simulated attack map.</span></div></div>
    <div className="map-layout">
      <div className="map-card">
        <MapContainer center={[20,10]} zoom={2} minZoom={2} maxZoom={5} scrollWheelZoom={false} worldCopyJump className="cyber-map">
          <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {markers.map(m => <CircleMarker key={m.region} center={m.coords} radius={riskRadius(m.risk)} pathOptions={{ color:'#fff', weight:2, fillColor:riskColor(m.risk), fillOpacity:0.86 }}>
            <Popup><div className="map-popup"><strong>{m.region}</strong><span className={`risk-pill ${riskClass(m.risk)}`}>{m.risk}</span><p><b>Theme:</b> {m.theme}</p><p><b>Source basis:</b> {m.source}</p><p><b>Cygnus note:</b> {m.note}</p><p><b>Recommended action:</b> {m.action}</p></div></Popup>
          </CircleMarker>)}
        </MapContainer>
        <div className="map-caption"><MousePointerClick size={16}/><span>Click a marker to review the curated regional intelligence note.</span></div>
      </div>
      <aside className="hotspots">
        <div className="kicker white"><LocateFixed size={16}/> Hot Spots</div>
        <h2>Highest regional signals</h2>
        <div className="hotspot-list">{markers.filter(m=>m.risk!=='Moderate').slice(0,5).map(m => <div className="hotspot" key={m.region}><i style={{background:riskColor(m.risk)}}/><div><strong>{m.region}</strong><span>{m.theme}</span></div></div>)}</div>
        <div className="method"><strong>Map method</strong><p>Curated regional indicators. Not an exhaustive attack map.</p></div>
      </aside>
    </div>
  </section>
}

function ThreatSummary(){
  return <section className="split">
    <article className="panel">
      <div className="kicker"><Flame size={16}/> Highest Threat Themes</div>
      <h2>Priority cyber themes</h2>
      <div className="rows">{threats.map(([t,r,tr,n]) => <div className="row" key={t}><div><strong>{t}</strong><span>{tr} · {n}</span></div><span className={`risk-pill ${riskClass(r)}`}>{r}</span></div>)}</div>
    </article>
    <article className="panel">
      <div className="kicker"><DatabaseZap size={16}/> Intelligence Status</div>
      <h2>Source status</h2>
      <div className="status-grid">{[['OTX','Live route',CheckCircle2],['NCSC','RSS route',CheckCircle2],['Analyst Notes','Enabled',NotebookPen],['Map','Curated',Globe2]].map(([a,b,Icon])=><div key={a}><Icon size={20}/><strong>{a}</strong><span>{b}</span></div>)}</div>
    </article>
  </section>
}

function OtxLivePanel({onCount}){
  const [status,setStatus]=useState('loading'), [message,setMessage]=useState('Checking secure OTX route...'), [pulses,setPulses]=useState([]);
  useEffect(()=>{let off=false; (async()=>{try{const r=await fetch('/api/otx-pulses'); const d=await r.json(); if(off)return; if(!r.ok||!d.ok){setStatus('fallback');setMessage(d.message||'OTX route unavailable.');setPulses([]);onCount?.(0);return} setStatus('live');setMessage(d.message||'Live OTX preview loaded.');setPulses(d.pulses||[]);onCount?.((d.pulses||[]).length)}catch(e){if(!off){setStatus('fallback');setMessage('OTX preview unavailable. Static guidance remains active.');setPulses([]);onCount?.(0)}}})(); return()=>{off=true}},[onCount]);
  return <section id="otx-live" className="section"><SectionHead icon={<Radar/>} title="Live OTX Feed" eyebrow="Open-source cyber threat pulses" text="A secure serverless route loads OTX pulse summaries. Each item includes a Cygnus Analyst Note, sector relevance, and a full-source link." status={status} statusText={status==='live'?'Live OTX route active':status==='loading'?'Checking route':'Fallback mode'}/>
    <div className="feed-layout"><FeedSummary color="gold" title="OTX intelligence route" message={message} text="The frontend requests /api/otx-pulses. The serverless function keeps the private OTX API key on the server side."/>
      <div className="feed-list">{status==='live'&&pulses.length>0?pulses.map(p=><OtxCard key={p.id||p.name} p={p}/>):<Fallback title="Static cyber intelligence active" text="The tracker remains usable while the OTX route is unavailable."/>}</div>
    </div>
  </section>
}
function OtxCard({p}){ const [rel,act]=buildAnalystNote(p); return <article className="feed-card"><div><strong>{p.name}</strong><span>{p.description||'No description provided.'}</span></div><div className="meta"><em>{p.indicatorCount} indicators</em><em>{p.modified||'Modified date unavailable'}</em></div><AnalystNote rel={rel} text={act}/><div className="sector-block"><strong>Sector relevance</strong><div className="tags">{['Financial Services','Government','SME / Mid-market'].map(s=><span key={s}>{s}</span>)}</div></div>{p.url&&<a className="source-link" href={p.url} target="_blank" rel="noreferrer">View full OTX pulse <ExternalLink size={14}/></a>}</article> }

function NcscLivePanel({onCount}){
  const [status,setStatus]=useState('loading'), [message,setMessage]=useState('Checking live NCSC RSS route...'), [items,setItems]=useState([]);
  useEffect(()=>{let off=false; (async()=>{try{const r=await fetch('/api/ncsc-feed'); const d=await r.json(); if(off)return; if(!r.ok||!d.ok){setStatus('fallback');setMessage(d.message||'NCSC RSS unavailable.');setItems([]);onCount?.(0);return} setStatus('live');setMessage(d.message||'NCSC RSS feed loaded.');setItems(d.items||[]);onCount?.((d.items||[]).length)}catch(e){if(!off){setStatus('fallback');setMessage('NCSC RSS preview unavailable. Static guidance remains active.');setItems([]);onCount?.(0)}}})(); return()=>{off=true}},[onCount]);
  return <section id="ncsc-live" className="section"><SectionHead icon={<Rss/>} title="Live NCSC RSS Feed" eyebrow="Official reports and advisory updates" text="A lightweight serverless route loads NCSC reports and advisory updates. No API key is required." status={status} statusText={status==='live'?'Live NCSC route active':status==='loading'?'Checking route':'Fallback mode'}/>
    <div className="feed-layout"><FeedSummary color="blue" title="NCSC RSS route" message={message} text="The frontend requests /api/ncsc-feed and returns simplified advisory items for the tracker."/>
      <div className="feed-list">{status==='live'&&items.length>0?items.map(i=><NcscCard key={i.link||i.title} i={i}/>):<Fallback title="Static NCSC guidance active" text="The tracker remains usable while the live NCSC route is unavailable."/>}</div>
    </div>
  </section>
}
function NcscCard({i}){ const [rel,act]=buildAnalystNote(i); return <article className="feed-card"><div><strong>{i.title}</strong><span>{i.summary||'No summary provided.'}</span></div><div className="meta"><em>{i.pubDate||'Publish date unavailable'}</em><em>{i.source||'NCSC'}</em></div><AnalystNote rel={rel} text={act}/>{i.link&&<a className="source-link" href={i.link} target="_blank" rel="noreferrer">View full NCSC item <ExternalLink size={14}/></a>}</article> }

function ExecutiveBriefing(){
  return <section id="executive-briefing" className="section"><SectionHead icon={<BookOpenCheck/>} title="Executive Cyber Briefing" eyebrow="Decision-focused summary" text="A concise executive layer that brings together the map, live feeds, analyst notes, sector relevance, AI risk, insurance guidance, and readiness."/>
    <div className="brief-grid"><article className="brief-hero"><span>Current posture</span><strong>Elevated</strong><p>The cyber risk posture remains elevated due to ransomware, credential compromise, exposed systems, third-party dependency, and AI-enabled system governance challenges.</p><div className="brief-tags"><em>Map active</em><em>Live feeds active where configured</em><em>Analyst notes enabled</em></div></article>
    <div className="brief-stack">{[['Identity and access control','Prioritise MFA, privileged account controls, sign-in monitoring, and BEC prevention.'],['Resilience against disruption','Validate backups, escalation roles, restore procedures, endpoint visibility, and communications.'],['AI-enabled system governance','Review AI access to sensitive data, guardrails, and human review for high-impact outputs.']].map(([a,b])=><article className="brief-card" key={a}><ShieldQuestion size={20}/><div><strong>{a}</strong><span>{b}</span></div></article>)}</div></div>
    <article className="dark-panel"><div className="kicker white"><Megaphone size={16}/> Recommended Executive Actions</div><h2>Priority actions for the next review cycle</h2><div className="dark-list">{['Review live OTX and NCSC items for overlap with assets, vendors, cloud services, and exposed systems.','Use the Cyber Risk Intelligence Map to understand regional themes and source-backed priorities.','Treat AI patching and cyber insurance readiness as part of the same resilience cycle.'].map(x=><div key={x}><Megaphone size={16}/><span>{x}</span></div>)}</div></article>
  </section>
}

function GuidanceInsuranceAi(){
  return <>
    <section id="ncsc-guidance" className="section"><SectionHead icon={<BookMarked/>} title="NCSC Advisory & Guidance Layer" eyebrow="Official guidance layer" text="Official guidance supports cyber risk validation, mitigation, readiness, insurance evidence, and executive reporting."/><CardGrid items={ncscGuidance}/></section>
    <section id="cyber-insurance" className="section"><SectionHead icon={<ShieldPlus/>} title="Cyber Insurance & Risk Transfer" eyebrow="Financial resilience" text="Cyber insurance does not replace controls, but it can help organisations manage the financial impact of cyber incidents."/><CardGrid items={insurance}/><article className="dark-panel"><div className="kicker white"><Handshake size={16}/> Broker / Insurer Questions</div><h2>Questions before relying on the policy</h2><div className="dark-list">{['Does the policy cover ransomware, extortion support, restoration costs, and business interruption?','Does wording cover cloud outages, MSP incidents, or software supply-chain disruption?','Are AI-related cyber incidents excluded, sublimited, or subject to additional requirements?','Which incident response vendors and notification timelines apply?'].map(q=><div key={q}><Scale size={16}/><span>{q}</span></div>)}</div></article></section>
    <section id="ai-patching" className="section"><SectionHead icon={<Bot/>} title="AI Systems Risk & Patching" eyebrow="AI cyber governance" text="Tracks prompt hardening, data-access reviews, guardrail updates, output validation, logging improvements, and human-in-the-loop controls."/><div className="ai-grid">{aiItems.map(([t,r,type,s,Icon])=><article className="card" key={t}><div className="topline"><div className="icon"><Icon size={20}/></div><span className={`risk-pill ${riskClass(r)}`}>{r}</span></div><h3>{t}</h3><p>{s}</p><div className="patch">Patch type: <strong>{type}</strong></div></article>)}</div></section>
  </>
}

function WatchSectorThreats(){
  const [selected,setSelected]=useState('All');
  const filtered = useMemo(()=> selected==='All'?threats:threats.filter(t=>t[1]===selected),[selected]);
  return <>
    <section id="watchlist" className="section"><SectionHead icon={<Flame/>} title="Strategic Watchlist" eyebrow="Priority focus areas" text="Executive scanning layer for priority cyber risk areas."/><div className="grid4">{watchlist.map(([a,b,c])=><article className="card" key={a}><div className="watch"><span>{b}</span><ClipboardCheck size={20}/></div><h3>{a}</h3><p>{c}</p></article>)}</div></section>
    <section id="sector-relevance" className="section"><SectionHead icon={<Layers3/>} title="Sector Relevance Layer" eyebrow="Business exposure" text="Cyber signals mapped to sector exposure and operating context."/><div className="rows panel-pad">{sectorRisk.map(([a,b,c])=><div className="row" key={a}><div><strong>{a}</strong><span>{c}</span></div><span className={`risk-pill ${riskClass(b)}`}>{b}</span></div>)}</div></section>
    <section id="threat-landscape" className="section"><SectionHead icon={<Siren/>} title="Cyber Risk Themes" eyebrow="Threat landscape" text="Static intelligence cards for executive scanning."/><div className="filters">{['All','High','Elevated','Moderate'].map(f=><button key={f} className={selected===f?'active':''} onClick={()=>setSelected(f)}>{f}</button>)}</div><div className="grid2">{filtered.map(([a,b,c,d])=><article className="card" key={a}><div className="topline"><div className="icon"><ShieldAlert size={20}/></div><span className={`risk-pill ${riskClass(b)}`}>{b}</span></div><h3>{a}</h3><p>{d}</p><div className="meta"><em>Trend: {c}</em></div></article>)}</div></section>
  </>
}

function ReadinessHelp(){
  return <section id="readiness-help" className="section"><div className="grid2"><article className="panel"><div className="kicker"><ShieldCheck size={16}/> Readiness Snapshot</div><h2>Executive resilience checks</h2><div className="rows">{readiness.map(([a,b,c])=><div className="row" key={a}><div><strong>{a}</strong><span>{c}</span></div><em>{b}</em></div>)}</div></article><article className="panel"><div className="kicker"><CircleHelp size={16}/> Help & Methodology</div><h2>How to interpret the tracker</h2><div className="rows">{[['Severity','Likely operational, financial, reputational, and regulatory impact.'],['Trend Direction','Whether observable threat activity appears to be increasing, stable, or decreasing.'],['Assessment Confidence','Quality, consistency, and timeliness of available source information.'],['Strategic Relevance','Connection between technical signals and business risk decisions.']].map(([a,b])=><div className="row column" key={a}><strong>{a}</strong><span>{b}</span></div>)}</div></article></div></section>
}

function SectionHead({icon,title,eyebrow,text,status,statusText}){
  return <div className="section-head"><div><div className="kicker">{React.cloneElement(icon,{size:16})} {eyebrow}</div><h2>{title}</h2><p>{text}</p></div>{status&&<div className={`status ${status}`}>{statusText}</div>}</div>
}
function FeedSummary({color,title,message,text}){return <article className={`feed-summary ${color}`}><div className="feed-status"><span className="pulse-dot"/> {message}</div><h3>{title}</h3><p>{text}</p></article>}
function Fallback({title,text}){return <article className="feed-card"><strong>{title}</strong><span>{text}</span><div className="meta"><em>Safe fallback</em><em>Static guidance active</em></div></article>}
function AnalystNote({rel,text}){return <div className="analyst"><div><NotebookPen size={16}/><strong>Cygnus Analyst Note</strong><em>{rel}</em></div><p>{text}</p></div>}
function CardGrid({items}){return <div className="grid4">{items.map(([t,s,Icon])=><article className="card" key={t}><div className="icon"><Icon size={22}/></div><h3>{t}</h3><p>{s}</p></article>)}</div>}

function Footer(){return <footer><div><strong>Cygnus Development</strong><span>Risk Intelligence Technology</span></div><p>Cygnus Cyber Risk Intelligence Tracker v1.5.1 · Branding banner update · Continuous upgrades planned</p></footer>}

export default function App(){
  const [otxCount,setOtxCount]=useState(0), [ncscCount,setNcscCount]=useState(0);
  return <div className="app"><Sidebar/><main className="main"><DashboardHeader/><OverviewCards otxCount={otxCount} ncscCount={ncscCount}/><CyberRiskMap/><ThreatSummary/><OtxLivePanel onCount={setOtxCount}/><NcscLivePanel onCount={setNcscCount}/><ExecutiveBriefing/><GuidanceInsuranceAi/><WatchSectorThreats/><ReadinessHelp/><Footer/></main></div>
}

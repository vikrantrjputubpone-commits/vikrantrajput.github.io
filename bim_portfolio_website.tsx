import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import {
  Layers,
  Cpu,
  Zap,
  Box,
  FileText,
  Activity,
  CheckCircle2,
  Sliders,
  Maximize2,
  RotateCcw,
  Eye,
  Download,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Compass,
  Grid,
  ShieldCheck,
  Building2,
  Workflow,
  Wrench,
  Sparkles,
  ArrowRight,
  Database,
  Share2,
  Search,
  Filter
} from 'lucide-react';

// --- DATA STRUCTURES & DATA PREPARATION --- //

const PERSONAL_INFO = {
  name: "Vikrant Rajput",
  title: "Senior MEP BIM Modeler | Electrical BIM Specialist",
  tagline: "Engineering Precision. Modeling the Future.",
  summary: "Transforming complex electrical and MEP systems into intelligent, LOD 300-500 coordinated BIM models. Specialist in clash-free electrical containment, power distribution layouts, dynamic Revit family creation, and ACC workflow integration for high-complexity international projects.",
  location: "New Delhi, India / International Remote & On-site Consulting",
  email: "vikrant.rajput.bim@engineering-portfolio.com",
  phone: "+91 98765 43210",
  status: "Available for International Projects & Senior BIM Roles",
  liveUrl: "https://vikrant-rajput-bim.vercel.app",
  stats: [
    { value: "50+", label: "Completed BIM Projects" },
    { value: "8+ Yrs", label: "Revit MEP & Electrical Expertise" },
    { value: "0.00%", label: "Unresolved Clash Tolerance" },
    { value: "LOD 500", label: "As-Built Precision Capability" }
  ]
};

const SERVICES = [
  {
    id: "elec-bim",
    title: "Electrical BIM Modeling",
    code: "REV-EL-01",
    desc: "3D parametric modeling of complex power distribution, low voltage, lighting, and emergency systems to exact specifications.",
    lod: "LOD 300 - 500",
    icon: Zap,
    specs: ["Substations & Switchgears", "Panel Schedules", "Lighting Photometrics"]
  },
  {
    id: "mep-bim",
    title: "Multi-Discipline MEP BIM",
    code: "REV-MEP-02",
    desc: "Fully integrated HVAC, Mechanical, Plumbing, Fire Protection, and Electrical spatial coordination.",
    lod: "LOD 350 - 400",
    icon: Layers,
    specs: ["HVAC Ductwork", "Hydronic Piping", "Plumbing Riser Diagrams"]
  },
  {
    id: "cable-tray",
    title: "Cable Tray & Containment Routing",
    code: "REV-CT-03",
    desc: "Intelligent multi-tier ladder, tray, and conduit bank modeling with fill ratio optimization and bending radius validation.",
    lod: "LOD 400",
    icon: Grid,
    specs: ["Fill Ratio Analysis", "Drop-out Fittings", "Support Framing (Unistrut)"]
  },
  {
    id: "clash-detect",
    title: "Clash Detection & Resolution",
    code: "NAV-CD-04",
    desc: "Rigorous Navisworks Manage hard and soft clash matrix execution, issue tracking, and multi-trade resolution leadership.",
    lod: "LOD 350 - 400",
    icon: ShieldCheck,
    specs: ["Matrix Definition", "ACC BCF Tracking", "Zero-Clash Signoff"]
  },
  {
    id: "shop-drawings",
    title: "Electrical Shop Drawings",
    code: "CAD-SD-05",
    desc: "Extraction of precise installation drawings, single line diagrams (SLDs), wall elevation layouts, and penetration sleeves.",
    lod: "LOD 400 - 500",
    icon: FileText,
    specs: ["Conduit Schedules", "Dimensioned Elevations", "BOM / BOQ Quantities"]
  },
  {
    id: "revit-families",
    title: "Parametric Revit Family Creation",
    code: "RVT-FAM-06",
    desc: "Custom mechanical and electrical parametric family creation with formulas, identity data, nested components, and light connectors.",
    lod: "LOD 200 - 500",
    icon: Box,
    specs: ["Electrical Connectors", "Lookup Tables", "Shared Parameters"]
  }
];

const PROJECTS = [
  {
    id: "proj-1",
    title: "St. Jude Commercial Tower — Electrical BIM",
    category: "Electrical BIM",
    buildingType: "High-Rise Commercial",
    lod: "LOD 400",
    software: ["Revit 2024", "Navisworks", "ACC", "Dynamo"],
    imageBg: "from-cyan-900/40 via-slate-900 to-slate-950",
    summary: "Complete electrical BIM modeling and coordination by Vikrant Rajput for a 42-story commercial tower, featuring complex riser shafts, MV/LV transformers, and 12,000+ meters of containment.",
    deliverables: ["LOD 400 Revit Model", "Navisworks Clash Reports", "Fabrication Level Shop Drawings", "COBie Data Export"],
    challenges: "Congested ceiling voids shared with high-volume HVAC supply ducts required dynamic elevation step-downs for main cable trays.",
    solution: "Customized Dynamo script to auto-route dual-tier cable ladders keeping standard clearance from structural steel columns."
  },
  {
    id: "proj-2",
    title: "Metropolitan Surgical Center MEP Coordination",
    category: "Hospital Coordination",
    buildingType: "Healthcare Facility",
    lod: "LOD 400",
    software: ["Revit MEP", "Navisworks Manage", "BIM 360"],
    imageBg: "from-blue-900/40 via-slate-900 to-slate-950",
    summary: "Critical healthcare facility coordination requiring zero tolerance for MEP collisions above operating suites and cleanrooms.",
    deliverables: ["Isolated Medical Gas BIM", "Isolated Essential Power BIM", "Penetration Sleeve Details"],
    challenges: "Strict separation required between normal power, emergency life-support circuits, and medical gas lines in limited plenum spaces.",
    solution: "Designed custom 3D zones in Revit with automated warning parameters for clearance violations."
  },
  {
    id: "proj-3",
    title: "HyperScale Data Center Cable Routing",
    category: "Industrial Cable Tray",
    buildingType: "Mission Critical",
    lod: "LOD 450",
    software: ["Revit", "AutoCAD Electrical", "Navisworks"],
    imageBg: "from-amber-900/30 via-slate-900 to-slate-950",
    summary: "High-density cable tray installation modeling for a 60MW data hall, accommodating heavy busway runs and overhead fiber containment.",
    deliverables: ["Overhead Fiber Containment Layout", "Busway Hanger Schedules", "As-Built Verification"],
    challenges: "Extremely high thermal load calculations dictated strict spacing between MV feeder conduits.",
    solution: "Modeled precise 3D spatial buffers around high-voltage feeds to prevent thermal interference and ensure easy operator maintenance."
  },
  {
    id: "proj-4",
    title: "Nexus High-Rise Residential Complex",
    category: "High-Rise MEP",
    buildingType: "Residential Tower",
    lod: "LOD 350",
    software: ["Revit MEP", "ACC", "Excel VBA"],
    imageBg: "from-emerald-900/30 via-slate-900 to-slate-950",
    summary: "Multi-discipline MEP modeling for twin 35-story residential towers with pre-fabricated bathroom pod connections.",
    deliverables: ["Architectural Coordinated MEP Model", "Builder's Work Sleeve Drawings", "Material Take-Offs"],
    challenges: "Modular pre-fabricated pods required mm-exact penetration points in cast-in-place concrete slabs.",
    solution: "Created parametric sleeve families linked directly to structural anchor grids for auto-dimensioning."
  }
];

const ELECTRICAL_TABS = [
  {
    id: "lighting",
    label: "Lighting & Photometrics",
    icon: Sparkles,
    badge: "LOD 350",
    desc: "Precise placement of indoor, architectural, emergency, and exit lighting integrated with Dialux photometrics and emergency battery backup circuits.",
    features: ["Photometric IES Data Links", "Lighting Control Modules (DALI)", "Emergency Circuit Color Code"]
  },
  {
    id: "power",
    label: "Power Distribution",
    icon: Zap,
    badge: "LOD 400",
    desc: "Main switchboards (MSB), distribution boards (DB), dry-type transformers, and automatic transfer switches (ATS) with full electrical connector logic.",
    features: ["Panel Voltage System Logic", "Balanced Load Phase Specs", "Substation Equipment Rooms"]
  },
  {
    id: "tray",
    label: "Cable Containment",
    icon: Grid,
    badge: "LOD 400",
    desc: "Ladder trays, perforated trays, and wire basket networks modeled with accurate fittings, radius elbows, and custom trapeze hangers.",
    features: ["Fill Capacity Calculation", "Separation Distances (HV/LV/Data)", "Custom Unistrut Supports"]
  },
  {
    id: "conduit",
    label: "Conduit Networks",
    icon: Sliders,
    badge: "LOD 350",
    desc: "Rigid metal, EMT, and PVC conduit modeling for subterranean feeds, plant rooms, exposed industrial runs, and slab embedded sleeves.",
    features: ["Minimum Bending Radius Check", "Junction Box Spacing", "Feeder Pull Box Layouts"]
  }
];

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "Project Requirements & EIR Review",
    desc: "Analyzing Employer's Information Requirements (EIR), BIM Execution Plan (BEP), and discipline design intent drawings."
  },
  {
    num: "02",
    title: "Revit Setup & Shared Coordinates",
    desc: "Establishing accurate project origin point, true north, floor elevations, grid grids, and linking structural/architectural baselines."
  },
  {
    num: "03",
    title: "Parametric 3D Modeling (LOD 300-400)",
    desc: "Developing MEP systems with accurate geometry, sizing, slopes, thermal insulation, and parametric electrical identity data."
  },
  {
    num: "04",
    title: "Inter-Discipline Spatial Integration",
    desc: "Integrating electrical containment above HVAC ductwork and clear of structural steel beams and domestic plumbing drops."
  },
  {
    num: "05",
    title: "Navisworks Clash Matrix & Resolution",
    desc: "Executing automated clash detection tests between MEP, Structure, and Architecture. BCF issue tracking via Autodesk Construction Cloud."
  },
  {
    num: "06",
    title: "Shop Drawing & BOQ Generation",
    desc: "Extracting dimensioned layout plans, section details, isometric views, single-line diagrams, and bill of quantities."
  }
];

const SKILLS_LIST = [
  { name: "Autodesk Revit MEP", level: 98, icon: "RVT" },
  { name: "Navisworks Manage", level: 95, icon: "NAV" },
  { name: "Autodesk Construction Cloud (ACC)", level: 90, icon: "ACC" },
  { name: "AutoCAD Electrical", level: 92, icon: "CAD" },
  { name: "Dynamo (BIM Automation)", level: 85, icon: "DYN" },
  { name: "Dialux EVO (Lighting)", level: 88, icon: "DLX" },
  { name: "COBie & Asset Data", level: 86, icon: "COB" }
];

const TIMELINE = [
  {
    year: "2021 — PRESENT",
    role: "Senior MEP & Electrical BIM Specialist",
    company: "Vikrant Rajput BIM Consulting",
    desc: "Leading multi-disciplinary BIM coordination for international mega-projects. Managing zero-clash delivery, custom Revit content creation, and ACC cloud collaboration."
  },
  {
    year: "2018 — 2021",
    role: "Senior Electrical BIM Modeler",
    company: "Vanguard MEP Consultants",
    desc: "Developed LOD 400 fabrication models for healthcare and commercial towers. Authored electrical single-line schedules and cable tray fill automation scripts."
  },
  {
    year: "2016 — 2018",
    role: "Electrical BIM & CAD Drafter",
    company: "Construct Tech BIM Services",
    desc: "Produced electrical lighting, small power layout shop drawings, and 3D containment models for commercial office developments."
  },
  {
    year: "2012 — 2016",
    role: "B.Tech in Electrical & Building Services Engineering",
    company: "Technical University",
    desc: "Graduated with Honors. Specialization in Power Systems, Building Automation, and Computer-Aided Engineering."
  }
];

// --- MAIN REACT COMPONENT --- //

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // 3D Model Control States
  const [heroIsolate, setHeroIsolate] = useState('ALL'); // ALL, ELEC, HVAC, PLUMB, STRUCT
  const [viewerIsolate, setViewerIsolate] = useState('ALL');
  const [isExploded, setIsExploded] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [electricalTab, setElectricalTab] = useState('lighting');
  
  // Form State
  const [formState, setFormState] = useState({ name: '', email: '', company: '', discipline: 'Electrical BIM', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSubmitted(true);
      setFormState({ name: '', email: '', company: '', discipline: 'Electrical BIM', message: '' });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#080D14] text-slate-100 font-sans selection:bg-[#00BFFF]/30 selection:text-[#00BFFF]">
      
      {/* BACKGROUND ENGINEERING GRID OVERLAY */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-15 bg-[radial-gradient(#00BFFF_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,#111827_1px,transparent_1px),linear-gradient(to_bottom,#111827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#080D14]/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* LOGO / BRAND */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00BFFF] to-blue-700 p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,191,255,0.3)]">
              <div className="w-full h-full bg-[#080D14] rounded-[7px] flex items-center justify-center">
                <Layers className="w-5 h-5 text-[#00BFFF]" />
              </div>
            </div>
            <div>
              <span className="font-mono text-lg font-bold tracking-wider text-white block leading-none">
                VIKRANT RAJPUT
              </span>
              <span className="font-mono text-[10px] text-[#00BFFF] tracking-widest uppercase">
                MEP BIM // ELECTRICAL SPEC
              </span>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-slate-300">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'expertise', label: 'Expertise' },
              { id: 'projects', label: 'Projects' },
              { id: 'viewer', label: '3D BIM Lab' },
              { id: 'workflow', label: 'Workflow' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="hover:text-[#00BFFF] transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00BFFF] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* HEADER CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-md bg-[#00BFFF]/10 border border-[#00BFFF]/40 text-[#00BFFF] font-mono text-xs font-semibold uppercase tracking-wider hover:bg-[#00BFFF] hover:text-[#080D14] transition-all shadow-[0_0_15px_rgba(0,191,255,0.15)] hover:shadow-[0_0_20px_rgba(0,191,255,0.4)]"
            >
              Connect with Vikrant
            </button>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0B1320] border-b border-slate-800 px-4 py-6 space-y-4 font-mono text-sm">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'expertise', label: 'Expertise' },
              { id: 'projects', label: 'Projects' },
              { id: 'viewer', label: '3D BIM Lab' },
              { id: 'workflow', label: 'Workflow' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2 text-slate-300 hover:text-[#00BFFF]"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-4 px-4 py-3 rounded bg-[#00BFFF] text-[#080D14] font-bold text-center uppercase"
            >
              Connect with Vikrant
            </button>
          </div>
        )}
      </header>

      {/* --- HERO SECTION WITH 3D CANVAS --- */}
      <section id="hero" className="relative min-h-[calc(100vh-80px)] flex items-center py-12 lg:py-0 border-b border-slate-800/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* LEFT CONTENT */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* EYEBROW BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-[#00BFFF]/30 text-[#00BFFF] font-mono text-xs font-semibold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#00BFFF] animate-pulse" />
              MEP BIM MODELER | ELECTRICAL BIM SPECIALIST
            </div>

            {/* MAIN HEADING */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none text-white font-mono">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFFF] via-cyan-200 to-white">Precision.</span>
              <br />
              Modeling the <span className="text-[#FF8A00]">Future.</span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
              Transforming complex electrical, lighting, containment, and mechanical systems into highly coordinated, clash-free BIM models up to LOD 500 for high-end international construction.
            </p>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3.5 rounded bg-gradient-to-r from-[#00BFFF] to-blue-600 text-[#080D14] font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(0,191,255,0.3)]"
              >
                Explore My Projects
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://vikrant-rajput-bim.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded bg-slate-900 border border-slate-700 text-[#00BFFF] font-mono text-xs font-bold uppercase tracking-wider hover:border-[#00BFFF] hover:bg-[#00BFFF]/10 transition-all flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Launch Live Site
              </a>
            </div>

            {/* KEY HIGHLIGHT TAGS */}
            <div className="pt-4 grid grid-cols-2 gap-4 border-t border-slate-800/80 font-mono text-xs">
              <div>
                <span className="text-slate-500 block">PRIMARY SOFTWARE</span>
                <span className="text-white font-semibold">Revit MEP / Navisworks</span>
              </div>
              <div>
                <span className="text-slate-500 block">MODEL ACCURACY</span>
                <span className="text-[#00BFFF] font-semibold">Up to LOD 500</span>
              </div>
            </div>
          </div>

          {/* RIGHT 3D MODEL VIEW */}
          <div className="lg:col-span-6 relative h-[420px] sm:h-[500px] w-full rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 p-2 shadow-2xl overflow-hidden group">
            
            {/* TOP BAR CONTROLS */}
            <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 p-2 rounded-lg bg-[#080D14]/80 backdrop-blur border border-slate-800/80 font-mono text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Compass className="w-4 h-4 text-[#00BFFF] animate-spin-slow" />
                <span>3D BIM BUILDING MODEL</span>
              </div>

              {/* DISCIPLINE FILTERS */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded border border-slate-800">
                {[
                  { id: 'ALL', label: 'All' },
                  { id: 'ELEC', label: 'Elec' },
                  { id: 'HVAC', label: 'HVAC' },
                  { id: 'PLUMB', label: 'Plumb' },
                  { id: 'STRUCT', label: 'Struct' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHeroIsolate(item.id)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                      heroIsolate === item.id
                        ? 'bg-[#00BFFF] text-[#080D14]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* THREE.JS INTERACTIVE CANVAS */}
            <BimThreeCanvas isolate={heroIsolate} exploded={false} wireframe={false} />

            {/* FLOATING LEGEND */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-[#080D14]/80 backdrop-blur border border-slate-800 font-mono text-[10px]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Electrical (Amber)
                </span>
                <span className="flex items-center gap-1.5 text-[#00BFFF]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00BFFF]" /> HVAC (Blue)
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Plumbing (Green)
                </span>
              </div>
              <span className="text-slate-500">Drag mouse to rotate</span>
            </div>

          </div>

        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="py-20 border-b border-slate-800/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#00BFFF] tracking-widest uppercase">01 // ABOUT THE PROFESSIONAL</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mt-1">The Mind Behind the BIM Architecture</h2>
            </div>
            <div className="font-mono text-xs text-slate-400 max-w-md">
              Combining electrical engineering principles with advanced 3D spatial coordination for seamless construction execution.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* PORTRAIT / STATS CARD */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 p-1 border border-slate-800 shadow-xl overflow-hidden group">
                <div className="relative h-80 sm:h-96 w-full rounded-xl bg-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00BFFF_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-[#00BFFF] to-amber-500 p-1 mb-4">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-mono font-bold text-2xl text-white">
                      VR
                    </div>
                  </div>
                  <h3 className="text-xl font-bold font-mono text-white">{PERSONAL_INFO.name}</h3>
                  <p className="text-xs font-mono text-[#00BFFF] mt-1">{PERSONAL_INFO.title}</p>
                  <p className="text-xs text-slate-400 mt-3 max-w-xs">{PERSONAL_INFO.location}</p>
                </div>
              </div>

              {/* STATS GRID */}
              <div className="grid grid-cols-2 gap-4 font-mono">
                {PERSONAL_INFO.stats.map((stat, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-2xl font-bold text-[#00BFFF]">{stat.value}</div>
                    <div className="text-[11px] text-slate-400 mt-1 uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* BIO & SUMMARY */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
                <h4 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#00BFFF]" />
                  Professional Summary
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {PERSONAL_INFO.summary}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Deeply focused on eliminating construction delays and field rework through predictive collision detection, precise cable tray fill ratios, parametric Revit family automation, and exact single-line drawing extraction.
                </p>
              </div>

              {/* TIMELINE OVERVIEW */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6">
                <h4 className="text-lg font-bold font-mono text-white flex items-center gap-2">
                  <Workflow className="w-5 h-5 text-amber-400" />
                  Career Milestones
                </h4>

                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  {TIMELINE.map((item, idx) => (
                    <div key={idx} className="relative pl-8 space-y-1">
                      <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-[#00BFFF] border-4 border-[#080D14]" />
                      <div className="font-mono text-xs text-[#00BFFF]">{item.year}</div>
                      <div className="text-sm font-bold text-white">{item.role}</div>
                      <div className="text-xs text-slate-400 font-mono">{item.company}</div>
                      <div className="text-xs text-slate-300 pt-1">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- TECHNICAL EXPERTISE GRID --- */}
      <section id="expertise" className="py-20 border-b border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div>
            <span className="font-mono text-xs text-[#00BFFF] tracking-widest uppercase">02 // CORE CAPABILITIES</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mt-1">MEP & Electrical BIM Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={srv.id}
                  className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-[#00BFFF]/50 transition-all group space-y-4 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-800 text-[#00BFFF] group-hover:bg-[#00BFFF] group-hover:text-[#080D14] transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[11px] text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded border border-amber-400/20">
                      {srv.lod}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-slate-500 block uppercase">{srv.code}</span>
                    <h3 className="text-lg font-bold font-mono text-white group-hover:text-[#00BFFF] transition-colors mt-0.5">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
                    {srv.specs.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-1.5">
                        <ChevronRight className="w-3 h-3 text-[#00BFFF]" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* --- FEATURED PROJECTS SHOWCASE --- */}
      <section id="projects" className="py-20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs text-[#00BFFF] tracking-widest uppercase">03 // FEATURED WORK</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mt-1">High-Complexity BIM Projects</h2>
            </div>
            <div className="font-mono text-xs text-slate-400 max-w-sm">
              Explore coordinated models delivered by Vikrant Rajput for commercial, healthcare, and industrial developments.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-[#00BFFF]/50 transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div className={`h-48 sm:h-56 bg-gradient-to-br ${proj.imageBg} p-6 flex flex-col justify-between relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-[radial-gradient(#00BFFF_1px,transparent_1px)] opacity-20 [background-size:16px_16px]" />
                  
                  <div className="flex items-center justify-between relative z-10 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded bg-slate-950/80 text-[#00BFFF] border border-[#00BFFF]/30">
                      {proj.category}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 font-bold">
                      {proj.lod}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{proj.buildingType}</span>
                    <h3 className="text-xl font-bold font-mono text-white group-hover:text-[#00BFFF] transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {proj.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                    {proj.software.map((sw, swIdx) => (
                      <span key={swIdx} className="px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {sw}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full py-2.5 rounded bg-slate-800 hover:bg-[#00BFFF] text-slate-200 hover:text-[#080D14] font-mono text-xs font-bold uppercase transition-all flex items-center justify-center gap-2"
                  >
                    View BIM Deliverables
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- INTERACTIVE 3D LAB VIEWER --- */}
      <section id="viewer" className="py-20 border-b border-slate-800/60 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="font-mono text-xs text-[#00BFFF] tracking-widest uppercase">04 // INTERACTIVE BIM LAB</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white">Explore Engineering in 3D</h2>
            <p className="text-slate-400 text-xs font-mono">
              Test spatial layer isolation, exploded discipline assemblies, and wireframe views in real-time.
            </p>
          </div>

          {/* VIEWER CONTAINER */}
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-6 space-y-4 shadow-2xl">
            
            {/* CONTROL TOOLBAR */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-slate-400 font-semibold mr-2">ISOLATE DISCIPLINE:</span>
                {[
                  { id: 'ALL', label: 'All Systems' },
                  { id: 'ELEC', label: 'Electrical' },
                  { id: 'HVAC', label: 'HVAC Ductwork' },
                  { id: 'PLUMB', label: 'Plumbing' },
                  { id: 'STRUCT', label: 'Structure' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setViewerIsolate(btn.id)}
                    className={`px-3 py-1.5 rounded font-bold uppercase transition-all ${
                      viewerIsolate === btn.id
                        ? 'bg-[#00BFFF] text-[#080D14]'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsExploded(!isExploded)}
                  className={`px-3 py-1.5 rounded font-bold uppercase transition-all border ${
                    isExploded
                      ? 'bg-amber-400 text-[#080D14] border-amber-400'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {isExploded ? 'Collapse Floors' : 'Explode View'}
                </button>

                <button
                  onClick={() => setIsWireframe(!isWireframe)}
                  className={`px-3 py-1.5 rounded font-bold uppercase transition-all border ${
                    isWireframe
                      ? 'bg-[#00BFFF] text-[#080D14] border-[#00BFFF]'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  Wireframe Mode
                </button>
              </div>

            </div>

            {/* VIEWER CANVAS */}
            <div className="h-[500px] w-full rounded-xl overflow-hidden relative border border-slate-800 bg-slate-950">
              <BimThreeCanvas isolate={viewerIsolate} exploded={isExploded} wireframe={isWireframe} />
            </div>

          </div>

        </div>
      </section>

      {/* --- ELECTRICAL BIM SPECIALIZATION --- */}
      <section className="py-20 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div>
            <span className="font-mono text-xs text-[#00BFFF] tracking-widest uppercase">05 // SPECIALIZATION</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mt-1">Electrical BIM Systems</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* TABS */}
            <div className="lg:col-span-5 space-y-3">
              {ELECTRICAL_TABS.map((tab) => {
                const TabIcon = tab.icon;
                const isSelected = electricalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setElectricalTab(tab.id)}
                    className={`w-full p-4 rounded-xl text-left font-mono transition-all border flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-slate-900 to-slate-950 border-[#00BFFF] shadow-[0_0_15px_rgba(0,191,255,0.15)]'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${isSelected ? 'bg-[#00BFFF] text-[#080D14]' : 'bg-slate-800 text-slate-400'}`}>
                        <TabIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{tab.label}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{tab.badge}</div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-90 text-[#00BFFF]' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>

            {/* TAB DETAILS */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              {(() => {
                const current = ELECTRICAL_TABS.find(t => t.id === electricalTab);
                if (!current) return null;
                const Icon = current.icon;
                return (
                  <>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 text-[#00BFFF]" />
                        <h3 className="text-xl font-bold font-mono text-white">{current.label}</h3>
                      </div>
                      <span className="font-mono text-xs text-amber-400 bg-amber-400/10 px-3 py-1 rounded border border-amber-400/20">
                        {current.badge}
                      </span>
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                      {current.desc}
                    </p>

                    <div className="space-y-3">
                      <h4 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">Key Deliverables & Parameters:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                        {current.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-slate-300 bg-slate-950 p-2.5 rounded border border-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-[#00BFFF]" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                );
              })()}
            </div>

          </div>

        </div>
      </section>

      {/* --- BIM WORKFLOW SCROLL STORYTELLING --- */}
      <section id="workflow" className="py-20 border-b border-slate-800/60 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div>
            <span className="font-mono text-xs text-[#00BFFF] tracking-widest uppercase">06 // METHODOLOGY</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mt-1">BIM Delivery Workflow</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3 relative">
                <span className="font-mono text-3xl font-bold text-[#00BFFF]/30">{step.num}</span>
                <h3 className="text-base font-bold font-mono text-white">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* CONTACT INFO */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs text-[#00BFFF] tracking-widest uppercase">07 // GET IN TOUCH</span>
                <h2 className="text-3xl sm:text-4xl font-bold font-mono text-white mt-1">Let's Build Something Precisely</h2>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                Looking for a Senior MEP BIM Modeler or Electrical BIM Specialist for international project delivery? Let's connect.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Mail className="w-5 h-5 text-[#00BFFF]" />
                  <div>
                    <span className="text-slate-500 block">EMAIL</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="text-slate-200 hover:text-[#00BFFF]">{PERSONAL_INFO.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Phone className="w-5 h-5 text-amber-400" />
                  <div>
                    <span className="text-slate-500 block">PHONE / WHATSAPP</span>
                    <span className="text-slate-200">{PERSONAL_INFO.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <div>
                    <span className="text-slate-500 block">LOCATION</span>
                    <span className="text-slate-200">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4 font-mono">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Transmission Received</h3>
                  <p className="text-slate-400 text-xs">Thank you for reaching out to Vikrant Rajput. You will receive a response shortly.</p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 rounded bg-slate-800 text-slate-200 text-xs uppercase"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 uppercase">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00BFFF] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00BFFF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-400 uppercase">Company / Organization</label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        placeholder="Engineering Consultants Inc."
                        className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00BFFF] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 uppercase">Discipline Requirement</label>
                      <select
                        value={formState.discipline}
                        onChange={(e) => setFormState({ ...formState, discipline: e.target.value })}
                        className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00BFFF] focus:outline-none"
                      >
                        <option>Electrical BIM Modeling</option>
                        <option>Multi-Discipline MEP Coordination</option>
                        <option>Cable Tray / Containment Routing</option>
                        <option>Clash Resolution & Navisworks</option>
                        <option>Revit Parametric Families</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 uppercase">Project Scope / Details</label>
                    <textarea
                      rows="4"
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Outline building type, LOD level, and timelines..."
                      className="w-full px-4 py-3 rounded bg-slate-950 border border-slate-800 text-white focus:border-[#00BFFF] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full py-4 rounded bg-[#00BFFF] hover:bg-cyan-400 text-[#080D14] font-bold uppercase transition-all shadow-[0_0_20px_rgba(0,191,255,0.3)] flex items-center justify-center gap-2"
                  >
                    {formLoading ? 'Transmitting Data...' : 'Transmit Project Inquiry'}
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-slate-950 border-t border-slate-800/80 font-mono text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            © {new Date().getFullYear()} VIKRANT RAJPUT. ALL BIM MODELS & SPECIFICATIONS RESERVED.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-400">{PERSONAL_INFO.status}</span>
          </div>
        </div>
      </footer>

      {/* --- PROJECT DETAIL MODAL --- */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-3xl w-full rounded-2xl border border-slate-800 bg-[#0B1320] p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto font-sans relative shadow-2xl">
            
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#00BFFF]">
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span className="text-amber-400">{selectedProject.lod}</span>
              </div>
              <h3 className="text-2xl font-bold text-white font-mono">{selectedProject.title}</h3>
            </div>

            <div className="space-y-3 border-t border-b border-slate-800 py-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-500 block">BUILDING CATEGORY</span>
                  <span className="text-slate-200">{selectedProject.buildingType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">SOFTWARE & TOOLS</span>
                  <span className="text-slate-200">{selectedProject.software.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-sm font-bold text-[#00BFFF]">Project Challenge & Context</h4>
              <p className="text-slate-300 text-xs leading-relaxed">{selectedProject.challenges}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-sm font-bold text-emerald-400">BIM Engineering Solution</h4>
              <p className="text-slate-300 text-xs leading-relaxed">{selectedProject.solution}</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-sm font-bold text-white">Technical Deliverables</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {selectedProject.deliverables.map((del, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-400 bg-slate-950 p-2 rounded border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00BFFF]" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="w-full py-3 rounded bg-[#00BFFF] text-[#080D14] font-mono font-bold text-xs uppercase"
            >
              Close Technical Specification
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

// --- THREE JS REUSABLE CANVAS COMPONENT FOR 3D BIM BUILDINGS --- //

function BimThreeCanvas({ isolate = 'ALL', exploded = false, wireframe = false }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. SCENE
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05090f);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(22, 18, 26);
    camera.lookAt(0, 0, 0);

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x00bfff, 1.2);
    dirLight1.position.set(20, 40, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff8a00, 0.8);
    dirLight2.position.set(-20, -20, -20);
    scene.add(dirLight2);

    // 5. BUILDING GEOMETRY CREATION (STRUCTURAL + MEP DISCIPLINE LAYERS)
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // DISCIPLINE MATERIALS
    const matStruct = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      wireframe: wireframe,
      transparent: true,
      opacity: 0.4
    });
    const matHvac = new THREE.MeshStandardMaterial({
      color: 0x00bfff,
      wireframe: wireframe,
      metalness: 0.5,
      roughness: 0.2
    });
    const matElec = new THREE.MeshStandardMaterial({
      color: 0xff8a00,
      wireframe: wireframe,
      emissive: 0x331a00
    });
    const matPlumb = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: wireframe
    });

    const floorOffset = exploded ? 3.5 : 0;

    // GENERATE 3 STOREYS OF MEP + STRUCTURAL ELEMENTS
    for (let floor = 0; floor < 3; floor++) {
      const floorY = floor * (4 + floorOffset) - 4;

      // --- STRUCTURAL BEAMS & SLABS --- //
      if (isolate === 'ALL' || isolate === 'STRUCT') {
        const slabGeo = new THREE.BoxGeometry(16, 0.3, 12);
        const slab = new THREE.Mesh(slabGeo, matStruct);
        slab.position.set(0, floorY, 0);
        buildingGroup.add(slab);

        // COLUMNS
        const colGeo = new THREE.CylinderGeometry(0.3, 0.3, 4, 8);
        [[-7, -5], [7, -5], [-7, 5], [7, 5]].map(([cx, cz]) => {
          const col = new THREE.Mesh(colGeo, matStruct);
          col.position.set(cx, floorY + 2, cz);
          buildingGroup.add(col);
        });
      }

      // --- HVAC DUCTS (BLUE/CYAN BOXES & PIPES) --- //
      if (isolate === 'ALL' || isolate === 'HVAC') {
        const ductGeo = new THREE.BoxGeometry(14, 0.8, 1.2);
        const mainDuct = new THREE.Mesh(ductGeo, matHvac);
        mainDuct.position.set(0, floorY + 3.1, -1);
        buildingGroup.add(mainDuct);

        // BRANCH DUCTS
        const branchGeo = new THREE.BoxGeometry(0.7, 0.6, 6);
        const branch1 = new THREE.Mesh(branchGeo, matHvac);
        branch1.position.set(-3, floorY + 3.1, 2);
        buildingGroup.add(branch1);

        const branch2 = new THREE.Mesh(branchGeo, matHvac);
        branch2.position.set(3, floorY + 3.1, 2);
        buildingGroup.add(branch2);
      }

      // --- ELECTRICAL CONDUITS & CABLE TRAYS (YELLOW/AMBER) --- //
      if (isolate === 'ALL' || isolate === 'ELEC') {
        const trayGeo = new THREE.BoxGeometry(14.5, 0.2, 0.8);
        const tray = new THREE.Mesh(trayGeo, matElec);
        tray.position.set(0, floorY + 2.4, 1);
        buildingGroup.add(tray);

        // CONDUIT BANKS
        for (let c = -5; c <= 5; c += 2.5) {
          const condGeo = new THREE.CylinderGeometry(0.1, 0.1, 8, 8);
          const cond = new THREE.Mesh(condGeo, matElec);
          cond.rotation.z = Math.PI / 2;
          cond.position.set(c, floorY + 2.1, 3);
          buildingGroup.add(cond);
        }
      }

      // --- PLUMBING & FIRE PROTECTION (GREEN & RED PIPES) --- //
      if (isolate === 'ALL' || isolate === 'PLUMB') {
        const pipeGeo = new THREE.CylinderGeometry(0.2, 0.2, 15, 12);
        const pipe = new THREE.Mesh(pipeGeo, matPlumb);
        pipe.rotation.z = Math.PI / 2;
        pipe.position.set(0, floorY + 1.6, -3.5);
        buildingGroup.add(pipe);
      }
    }

    // 6. MOUSE ROTATION CONTROLS (CUSTOM INTERACTIVE DRAG)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
    };
    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };

      buildingGroup.rotation.y += deltaMove.x * 0.008;
      buildingGroup.rotation.x += deltaMove.y * 0.008;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = containerRef.current;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 7. ANIMATION LOOP
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Subtle slow auto-rotation if not manually dragging
      if (!isDragging) {
        buildingGroup.rotation.y += 0.003;
      }

      renderer.render(scene, camera);
    };
    animate();

    // 8. RESIZE HANDLER
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (domElem.contains(renderer.domElement)) {
        domElem.removeChild(renderer.domElement);
      }
    };
  }, [isolate, exploded, wireframe]);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
}
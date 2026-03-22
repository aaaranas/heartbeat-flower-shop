"use client";
import { useState } from "react";
import Link from "next/link";

const COLORS = [
  { id: "red", label: "Ruby Red", hex: "#c0392b" },
  { id: "pink", label: "Petal Pink", hex: "#e91e8c" },
  { id: "peach", label: "Soft Peach", hex: "#f0a58f" },
  { id: "white", label: "Snow White", hex: "#f5f0eb" },
  { id: "yellow", label: "Sunlit Yellow", hex: "#f4c430" },
  { id: "lavender", label: "Lavender", hex: "#b784a7" },
  { id: "sage", label: "Sage Green", hex: "#87a96b" },
  { id: "coral", label: "Coral Bloom", hex: "#ff6f61" },
  { id: "cream", label: "Warm Cream", hex: "#f5e6c8" },
  { id: "burgundy", label: "Deep Burgundy", hex: "#722f37" },
];

const FLOWER_TYPES = [
  { id: "rose", label: "Rose", emoji: "🌹" },
  { id: "daisy", label: "Daisy", emoji: "🌼" },
  { id: "tulip", label: "Tulip", emoji: "🌷" },
  { id: "wildflower", label: "Wildflower", emoji: "🌸" },
  { id: "mixed", label: "Surprise mix", emoji: "💐" },
];

const SIZES = [
  { id: "small", label: "Small", desc: "3–5 stems, pocket-sized", price: 220 },
  { id: "medium", label: "Medium", desc: "8–12 stems, everyday bouquet", price: 380 },
  { id: "large", label: "Large", desc: "16–20 stems, statement piece", price: 580 },
];

const WRAPPING = [
  { id: "none", label: "No wrap", desc: "Just the stems" },
  { id: "kraft", label: "Kraft paper", desc: "Rustic, natural look" },
  { id: "ribbon", label: "Ribbon tied", desc: "Classic satin ribbon" },
  { id: "box", label: "Gift box", desc: "+₱60 — presentation-ready" },
];

const STEM_COLOR = "#6b7c45";
const LEAF_COLOR = "#7a9a4a";
const CENTER_YELLOW = "#f4c430";
const CENTER_DARK = "#e8940a";
const DEFAULT_COLORS = ["#d4a5b0", "#f0a58f", "#e8c5cc"];
const SIZE_COUNT = { small: 3, medium: 6, large: 9 };
const MIXED_TYPES = ["rose","daisy","tulip","wildflower","rose","daisy","tulip","wildflower","rose"];

const POSITIONS = [
  [100,65],
  [75,80],[125,80],
  [60,100],[100,95],[140,100],
  [70,118],[100,112],[130,118]
];

function shadeColor(col, pct) {
  let c = col.replace("#","");
  if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2];
  const num = parseInt(c, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + pct));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + pct));
  const b = Math.min(255, Math.max(0, (num & 0xff) + pct));
  return "#" + ((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1);
}

function drawRose(cx, cy, r, col) {
  const dark = shadeColor(col, -25);
  let s = "";
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const px = cx + Math.cos(angle) * r * 0.78;
    const py = cy + Math.sin(angle) * r * 0.78;
    s += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r*0.52).toFixed(1)}" ry="${(r*0.62).toFixed(1)}" fill="${col}" opacity="0.95" transform="rotate(${((i/5)*360).toFixed(0)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2 - Math.PI / 4;
    const px = cx + Math.cos(angle) * r * 0.38;
    const py = cy + Math.sin(angle) * r * 0.38;
    s += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r*0.35).toFixed(1)}" ry="${(r*0.42).toFixed(1)}" fill="${dark}" opacity="0.9" transform="rotate(${((i/4)*360).toFixed(0)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(r*0.22).toFixed(1)}" fill="${dark}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${(r*0.1).toFixed(1)}" fill="${shadeColor(col,-40)}"/>`;
  return s;
}

function drawDaisy(cx, cy, r, col) {
  let s = "";
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const px = cx + Math.cos(angle) * r * 0.72;
    const py = cy + Math.sin(angle) * r * 0.72;
    s += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r*0.18).toFixed(1)}" ry="${(r*0.48).toFixed(1)}" fill="${col}" opacity="0.92" transform="rotate(${(angle * 180 / Math.PI).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(r*0.32).toFixed(1)}" fill="${CENTER_YELLOW}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${(r*0.2).toFixed(1)}" fill="${CENTER_DARK}"/>`;
  return s;
}

function drawTulip(cx, cy, r, col) {
  const dark = shadeColor(col, -20);
  let s = "";
  [-0.45, 0, 0.45].forEach(a => {
    const baseAngle = -Math.PI / 2 + a;
    const px = cx + Math.cos(baseAngle) * r * 0.5;
    const py = cy + Math.sin(baseAngle) * r * 0.5;
    s += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r*0.48).toFixed(1)}" ry="${(r*0.7).toFixed(1)}" fill="${col}" opacity="0.95" transform="rotate(${(baseAngle * 180/Math.PI + 90).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  });
  [-0.22, 0.22].forEach(a => {
    const baseAngle = -Math.PI / 2 + a;
    const px = cx + Math.cos(baseAngle) * r * 0.25;
    const py = cy + Math.sin(baseAngle) * r * 0.25;
    s += `<ellipse cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" rx="${(r*0.3).toFixed(1)}" ry="${(r*0.55).toFixed(1)}" fill="${dark}" opacity="0.9" transform="rotate(${(baseAngle * 180/Math.PI + 90).toFixed(1)} ${px.toFixed(1)} ${py.toFixed(1)})"/>`;
  });
  s += `<ellipse cx="${cx}" cy="${(cy - r*0.12).toFixed(1)}" rx="${(r*0.22).toFixed(1)}" ry="${(r*0.18).toFixed(1)}" fill="${dark}"/>`;
  return s;
}

function drawWildflower(cx, cy, r, col) {
  let s = "";
  for (let i = 0; i < 5; i++) {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    const px = cx + Math.cos(angle) * r * 0.6;
    const py = cy + Math.sin(angle) * r * 0.6;
    const lx = px + Math.cos(angle + 0.4) * r * 0.22;
    const ly = py + Math.sin(angle + 0.4) * r * 0.22;
    const rx2 = px + Math.cos(angle - 0.4) * r * 0.22;
    const ry2 = py + Math.sin(angle - 0.4) * r * 0.22;
    s += `<circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="${(r*0.32).toFixed(1)}" fill="${col}" opacity="0.88"/>`;
    s += `<circle cx="${rx2.toFixed(1)}" cy="${ry2.toFixed(1)}" r="${(r*0.32).toFixed(1)}" fill="${col}" opacity="0.88"/>`;
  }
  s += `<circle cx="${cx}" cy="${cy}" r="${(r*0.28).toFixed(1)}" fill="${CENTER_YELLOW}"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${(r*0.14).toFixed(1)}" fill="${CENTER_DARK}"/>`;
  return s;
}

function drawFlower(type, cx, cy, r, col, index) {
  if (type === "mixed") return drawFlower(MIXED_TYPES[index % MIXED_TYPES.length], cx, cy, r, col, index);
  if (type === "rose") return drawRose(cx, cy, r, col);
  if (type === "daisy") return drawDaisy(cx, cy, r, col);
  if (type === "tulip") return drawTulip(cx, cy, r, col);
  return drawWildflower(cx, cy, r, col);
}

function BouquetSVG({ flowerType, selectedColors, size }) {
  const count = SIZE_COUNT[size];
  const cols = selectedColors.length > 0 ? selectedColors.map(id => COLORS.find(c => c.id === id)?.hex || "#d4a5b0") : DEFAULT_COLORS;
  const positions = POSITIONS.slice(0, count);
  const r = size === "large" ? 12 : size === "medium" ? 13 : 14;

  let stemsSvg = "";
  let leavesSvg = "";
  let flowersSvg = "";

  positions.forEach((p, i) => {
    const wobble = ((i % 3) - 1) * 6;
    stemsSvg += `<path d="M${p[0]},${p[1]+r} Q${p[0]+wobble},155 ${95 + (p[0]-100)*0.25},182" stroke="${STEM_COLOR}" strokeWidth="1.8" fill="none" strokeLinecap="round"/>`;
    if (i % 2 === 0) {
      const lx = p[0] + wobble * 0.5;
      const ly = p[1] + r + 28;
      leavesSvg += `<ellipse cx="${lx+7}" cy="${ly}" rx="7" ry="4" fill="${LEAF_COLOR}" opacity="0.85" transform="rotate(-30 ${lx+7} ${ly})"/>`;
    }
  });

  [...positions].reverse().forEach((p, ri) => {
    const i = count - 1 - ri;
    const col = cols[i % cols.length];
    flowersSvg += drawFlower(flowerType, p[0], p[1], r, col, i);
  });

  return (
    <svg width="100%" viewBox="0 0 200 210" style={{ display: "block", margin: "0 auto" }}>
      <g dangerouslySetInnerHTML={{ __html: stemsSvg + leavesSvg }} />
      <path d="M70,178 Q100,170 130,178 L124,198 Q100,193 76,198 Z" fill="#c4956a" opacity="0.9"/>
      <line x1="76" y1="183" x2="124" y2="183" stroke="#a07850" strokeWidth="0.8" opacity="0.6"/>
      <line x1="78" y1="190" x2="122" y2="190" stroke="#a07850" strokeWidth="0.8" opacity="0.6"/>
      <g dangerouslySetInnerHTML={{ __html: flowersSvg }} />
    </svg>
  );
}

export default function CustomizePage() {
  const [selectedColors, setSelectedColors] = useState([]);
  const [flowerType, setFlowerType] = useState("rose");
  const [size, setSize] = useState("medium");
  const [wrapping, setWrapping] = useState("none");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const toggleColor = (id) => {
    setSelectedColors(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  };

  const sizeObj = SIZES.find(s => s.id === size);
  const wrapExtra = wrapping === "box" ? 60 : 0;
  const total = (sizeObj?.price || 0) + wrapExtra;

  if (submitted) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-body)", display: "flex", flexDirection: "column" }}>
        <Nav />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem 2rem" }}>
          <div style={{ textAlign: "center", maxWidth: 480 }}>
            <div style={{ width: 160, margin: "0 auto 1.5rem" }}>
              <BouquetSVG flowerType={flowerType} selectedColors={selectedColors} size={size} />
            </div>
            <h2 style={{ fontWeight: 800, fontSize: "2.2rem", marginBottom: "0.75rem" }}>Your vision is in our hands!</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "2rem" }}>
              We'll email <strong>{email}</strong> within 24 hours with a preview before we start bending wire.
            </p>
            <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", textAlign: "left", marginBottom: "2rem" }}>
              <p style={{ margin: "0 0 0.75rem", fontWeight: 700 }}>Your customization</p>
              <SummaryRow label="Flower type" value={FLOWER_TYPES.find(f => f.id === flowerType)?.label} />
              <SummaryRow label="Size" value={sizeObj?.label} />
              <SummaryRow label="Colors" value={selectedColors.length ? selectedColors.map(c => COLORS.find(x => x.id === c)?.label).join(", ") : "Maker's choice"} />
              <SummaryRow label="Wrapping" value={WRAPPING.find(w => w.id === wrapping)?.label} />
              {note && <SummaryRow label="Your note" value={`"${note}"`} />}
              <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.75rem", paddingTop: "0.75rem" }}>
                <SummaryRow label="Estimated total" value={`₱${total}`} bold />
              </div>
            </div>
            <Link href="/" style={{ background: "var(--accent)", color: "#fff", textDecoration: "none", padding: "0.7rem 2rem", borderRadius: 24, fontWeight: 600 }}>Back to home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-body)" }}>
      <Nav />
      <div style={{ maxWidth: 1050, margin: "0 auto", padding: "3rem 2rem", display: "grid", gridTemplateColumns: "1fr 280px", gap: "3rem", alignItems: "start" }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.03em", margin: "0 0 0.4rem" }}>Build your bouquet</h1>
          <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem" }}>Every choice gets handcrafted just for you.</p>

          <Step num="1" label="Flower type">
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              {FLOWER_TYPES.map(f => (
                <button key={f.id} type="button" onClick={() => setFlowerType(f.id)} style={{
                  padding: "0.6rem 1.1rem", borderRadius: 12, border: "2px solid",
                  borderColor: flowerType === f.id ? "var(--accent)" : "var(--border)",
                  background: flowerType === f.id ? "var(--accent-light)" : "var(--card-bg)",
                  cursor: "pointer", fontSize: "0.9rem", fontWeight: flowerType === f.id ? 700 : 400,
                  color: "var(--text)", transition: "all 0.15s ease", display: "flex", alignItems: "center", gap: "0.4rem"
                }}>
                  <span>{f.emoji}</span> {f.label}
                </button>
              ))}
            </div>
          </Step>

          <Step num="2" label="Color palette (pick up to 4)">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {COLORS.map(c => {
                const selected = selectedColors.includes(c.id);
                const disabled = !selected && selectedColors.length >= 4;
                return (
                  <button key={c.id} type="button" onClick={() => !disabled && toggleColor(c.id)} title={c.label} style={{
                    width: 40, height: 40, borderRadius: "50%", border: "3px solid",
                    borderColor: selected ? "var(--accent)" : "transparent",
                    background: c.hex, cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.35 : 1, transition: "all 0.15s ease",
                    outline: selected ? "2px solid var(--accent)" : "none",
                    outlineOffset: 2, boxShadow: selected ? "0 0 0 4px var(--accent-light)" : "none"
                  }} />
                );
              })}
            </div>
            <p style={{ margin: "0.6rem 0 0", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              {selectedColors.length > 0
                ? `Selected: ${selectedColors.map(id => COLORS.find(c => c.id === id)?.label).join(" · ")}`
                : "None selected — we'll choose beautifully for you."}
            </p>
          </Step>

          <Step num="3" label="Bouquet size">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
              {SIZES.map(s => (
                <button key={s.id} type="button" onClick={() => setSize(s.id)} style={{
                  padding: "1rem", borderRadius: 14, border: "2px solid",
                  borderColor: size === s.id ? "var(--accent)" : "var(--border)",
                  background: size === s.id ? "var(--accent-light)" : "var(--card-bg)",
                  cursor: "pointer", textAlign: "left", transition: "all 0.15s ease"
                }}>
                  <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{s.label}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", lineHeight: 1.4 }}>{s.desc}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 700, color: size === s.id ? "var(--accent)" : "var(--text)", marginTop: 6 }}>₱{s.price}</div>
                </button>
              ))}
            </div>
          </Step>

          <Step num="4" label="Wrapping">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
              {WRAPPING.map(w => (
                <button key={w.id} type="button" onClick={() => setWrapping(w.id)} style={{
                  padding: "0.75rem 1rem", borderRadius: 12, border: "2px solid",
                  borderColor: wrapping === w.id ? "var(--accent)" : "var(--border)",
                  background: wrapping === w.id ? "var(--accent-light)" : "var(--card-bg)",
                  cursor: "pointer", textAlign: "left", transition: "all 0.15s ease"
                }}>
                  <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "var(--text)" }}>{w.label}</div>
                  <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: 2 }}>{w.desc}</div>
                </button>
              ))}
            </div>
          </Step>

          <Step num="5" label="Message or note (optional)">
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="E.g. 'Can you avoid green? This is for my mom's birthday — she loves warm tones.'" rows={3} style={{
              width: "100%", padding: "0.7rem 0.9rem", borderRadius: 12, border: "1.5px solid var(--border)",
              background: "var(--card-bg)", color: "var(--text)", fontSize: "0.88rem",
              fontFamily: "inherit", resize: "vertical", outline: "none", boxSizing: "border-box"
            }} />
          </Step>

          <Step num="6" label="Where should we send the update?">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.35rem" }}>Your name</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Ana Santos" style={inputStyle} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.35rem" }}>Email *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="ana@email.com" style={inputStyle} />
              </div>
            </div>
          </Step>

          <button onClick={() => { if (email) setSubmitted(true); }} style={{
            background: email ? "var(--accent)" : "var(--border)",
            color: email ? "#fff" : "var(--text-muted)",
            border: "none", borderRadius: 28, padding: "0.9rem 2.5rem",
            fontWeight: 700, fontSize: "1rem", cursor: email ? "pointer" : "not-allowed",
            width: "100%", transition: "all 0.2s ease"
          }}>
            Send my customization →
          </button>
        </div>

        {/* Live bouquet preview */}
        <div style={{ position: "sticky", top: "2rem" }}>
          <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: "1.5rem" }}>
            <h3 style={{ fontWeight: 800, fontSize: "1.05rem", margin: "0 0 1rem", textAlign: "center" }}>Your bouquet</h3>
            <div style={{ background: "var(--bg-subtle)", borderRadius: 14, padding: "1rem" }}>
              <BouquetSVG flowerType={flowerType} selectedColors={selectedColors} size={size} />
            </div>
            <p style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted)", margin: "0.6rem 0 1.25rem", textTransform: "capitalize" }}>
              {size} {FLOWER_TYPES.find(f => f.id === flowerType)?.label} · {WRAPPING.find(w => w.id === wrapping)?.label}
            </p>
            <SummaryRow label="Base price" value={`₱${sizeObj?.price}`} />
            {wrapExtra > 0 && <SummaryRow label="Gift box" value={`+₱${wrapExtra}`} />}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.75rem", paddingTop: "0.75rem" }}>
              <SummaryRow label="Estimated total" value={`₱${total}`} bold />
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: "1rem 0 0", lineHeight: 1.5 }}>
              Final price confirmed after review. Shipping quoted separately.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function Step({ num, label, children }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
        <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent)", color: "#fff", fontSize: "0.72rem", fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{num}</span>
        <span style={{ fontWeight: 700, fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function SummaryRow({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.45rem" }}>
      <span style={{ color: "var(--text-muted)", fontSize: bold ? "0.9rem" : "0.83rem" }}>{label}</span>
      <span style={{ fontWeight: bold ? 800 : 500, fontSize: bold ? "0.95rem" : "0.83rem" }}>{value}</span>
    </div>
  );
}

function Nav() {
  return (
    <nav style={{ padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", color: "inherit" }}>
        <img src="/heartbeat-logo.png" alt="logo" style={{ width: 28, height: 28 }} />
        <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Heartbeat</span>
      </Link>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        <Link href="/gallery" style={{ textDecoration: "none", color: "var(--text-muted)", fontSize: "0.9rem" }}>Gallery</Link>
        <Link href="/customize" style={{ textDecoration: "none", color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem" }}>Customize</Link>
        <Link href="/order" style={{ textDecoration: "none", background: "var(--accent)", color: "#fff", padding: "0.4rem 1rem", borderRadius: 20, fontSize: "0.85rem", fontWeight: 600 }}>Order</Link>
      </div>
    </nav>
  );
}

const inputStyle = {
  width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10,
  border: "1.5px solid var(--border)", background: "var(--card-bg)",
  color: "var(--text)", fontSize: "0.88rem", outline: "none",
  boxSizing: "border-box", fontFamily: "inherit"
};
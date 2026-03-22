"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const products = [
  { id: 1, name: "Heartbeat Rose", type: "roses", size: "medium", price: 380, desc: "Classic warm red petals on a sturdy fuzzy stem.", sku: "heartbeat-rose", img: "/best-rose.jpg", tags: ["bestseller"] },
  { id: 2, name: "Dainty Daisy", type: "daisies", size: "small", price: 280, desc: "Sunny daisies in mixed pastels — cheerful and low-maintenance.", sku: "dainty-daisy", img: "/best-daisy.jpg", tags: ["bestseller"] },
  { id: 3, name: "Mixed Melody", type: "mixed", size: "large", price: 520, desc: "A curated mix of textures and colors for surprising combinations.", sku: "mixed-melody", img: "/best-mixed.jpg", tags: ["bestseller"] },
  { id: 4, name: "Rosy Pocket", type: "roses", size: "small", price: 220, desc: "A petite rose cluster — perfect desk companion.", sku: "rosy-pocket", img: "/bouquet-1.jpg", tags: [] },
  { id: 5, name: "Bloom Statement", type: "mixed", size: "large", price: 680, desc: "Bold, dramatic arrangement to anchor any space.", sku: "bloom-statement", img: "/bouquet-2.jpg", tags: ["new"] },
  { id: 6, name: "Mini Stem Set", type: "minis", size: "small", price: 180, desc: "Six tiny stems — ideal for gifting or decorating.", sku: "mini-stem-set", img: "/bouquet-3.jpg", tags: ["new"] },
  { id: 7, name: "Sunday Daisy", type: "daisies", size: "medium", price: 340, desc: "Warm white and yellow daisies on gentle wire stems.", sku: "sunday-daisy", img: "/best-daisy.jpg", tags: [] },
  { id: 8, name: "Grand Roses", type: "roses", size: "large", price: 600, desc: "A full, lush bouquet of deep crimson fuzzy roses.", sku: "grand-roses", img: "/best-rose.jpg", tags: [] },
  { id: 9, name: "Wildflower Mix", type: "mixed", size: "medium", price: 420, desc: "Organic and free-spirited — no two are alike.", sku: "wildflower-mix", img: "/best-mixed.jpg", tags: [] },
];

const SIZES = ["all", "small", "medium", "large"];
const TYPES = ["all", "roses", "daisies", "mixed", "minis"];

export default function GalleryPage() {
  const [activeSize, setActiveSize] = useState("all");
  const [activeType, setActiveType] = useState("all");

  const filtered = products.filter((p) => {
    const sizeOk = activeSize === "all" || p.size === activeSize;
    const typeOk = activeType === "all" || p.type === activeType;
    return sizeOk && typeOk;
  });

  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-body)" }}>
      <nav style={{ padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", color: "inherit" }}>
          <img src="/heartbeat-logo.png" alt="logo" style={{ width: 28, height: 28 }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem" }}>Heartbeat</span>
        </Link>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/gallery" style={{ textDecoration: "none", color: "var(--accent)", fontWeight: 600, fontSize: "0.9rem" }}>Gallery</Link>
          <Link href="/customize" style={{ textDecoration: "none", color: "var(--text-muted)", fontSize: "0.9rem" }}>Customize</Link>
          <Link href="/order" style={{ textDecoration: "none", background: "var(--accent)", color: "#fff", padding: "0.4rem 1rem", borderRadius: 20, fontSize: "0.85rem", fontWeight: 600 }}>Order</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>The Gallery</h1>
        <p style={{ color: "var(--text-muted)", marginTop: "0.5rem", marginBottom: "2.5rem" }}>{filtered.length} arrangement{filtered.length !== 1 ? "s" : ""} — all made by hand.</p>

        <div style={{ display: "flex", gap: "2.5rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          <FilterGroup label="Size" options={SIZES} active={activeSize} setActive={setActiveSize} />
          <FilterGroup label="Type" options={TYPES} active={activeType} setActive={setActiveType} />
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 0", color: "var(--text-muted)" }}>
            <p>No arrangements match those filters.</p>
            <button onClick={() => { setActiveSize("all"); setActiveType("all"); }} style={{ marginTop: "1rem", background: "var(--accent)", color: "#fff", border: "none", borderRadius: 20, padding: "0.5rem 1.5rem", cursor: "pointer" }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.75rem" }}>
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </main>
  );
}

function FilterGroup({ label, options, active, setActive }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
      <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}:</span>
      {options.map((o) => (
        <button key={o} onClick={() => setActive(o)} style={{
          padding: "0.3rem 0.9rem", borderRadius: 20, border: "1.5px solid",
          borderColor: active === o ? "var(--accent)" : "var(--border)",
          background: active === o ? "var(--accent)" : "transparent",
          color: active === o ? "#fff" : "var(--text-muted)",
          cursor: "pointer", fontSize: "0.82rem", fontWeight: active === o ? 600 : 400,
          textTransform: "capitalize", transition: "all 0.15s ease"
        }}>{o}</button>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--border)", background: "var(--card-bg)", transition: "transform 0.2s ease, box-shadow 0.2s ease", display: "flex", flexDirection: "column" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ position: "relative", aspectRatio: "4/3", background: "var(--bg-subtle)", overflow: "hidden" }}>
        <Image src={product.img} alt={product.name} fill style={{ objectFit: "cover" }} />
        <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: 6 }}>
          {product.tags.map(t => (
            <span key={t} style={{ background: t === "bestseller" ? "var(--accent)" : "#1a1a1a", color: "#fff", fontSize: "0.7rem", fontWeight: 700, padding: "0.2rem 0.55rem", borderRadius: 20, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t}</span>
          ))}
        </div>
        <span style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(6px)", color: "var(--text)", fontSize: "0.72rem", fontWeight: 600, padding: "0.2rem 0.55rem", borderRadius: 20, textTransform: "capitalize" }}>{product.size}</span>
      </div>
      <div style={{ padding: "1.1rem 1.25rem 1.4rem", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ margin: "0 0 0.3rem", fontSize: "1rem", fontWeight: 700 }}>{product.name}</h3>
        <p style={{ margin: "0 0 1rem", color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.5, flex: 1 }}>{product.desc}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontWeight: 800, fontSize: "1.05rem" }}>₱{product.price}</span>
          <Link href={`/order?sku=${product.sku}`} style={{ background: "var(--accent)", color: "#fff", textDecoration: "none", padding: "0.45rem 1.1rem", borderRadius: 20, fontSize: "0.83rem", fontWeight: 600 }}>Order</Link>
        </div>
      </div>
    </div>
  );
}
"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const PRODUCTS = {
  "heartbeat-rose": { name: "Heartbeat Rose", price: 380, desc: "Classic warm red petals on a sturdy fuzzy stem." },
  "dainty-daisy": { name: "Dainty Daisy", price: 280, desc: "Sunny daisies in mixed pastels — cheerful and low-maintenance." },
  "mixed-melody": { name: "Mixed Melody", price: 520, desc: "A curated mix of textures and colors for surprising combinations." },
  "rosy-pocket": { name: "Rosy Pocket", price: 220, desc: "A petite rose cluster — perfect desk companion." },
  "bloom-statement": { name: "Bloom Statement", price: 680, desc: "Bold, dramatic arrangement to anchor any space." },
  "mini-stem-set": { name: "Mini Stem Set", price: 180, desc: "Six tiny stems — ideal for gifting or decorating." },
  "sunday-daisy": { name: "Sunday Daisy", price: 340, desc: "Warm white and yellow daisies on gentle wire stems." },
  "grand-roses": { name: "Grand Roses", price: 600, desc: "A full, lush bouquet of deep crimson fuzzy roses." },
  "wildflower-mix": { name: "Wildflower Mix", price: 420, desc: "Organic and free-spirited — no two are alike." },
};

function OrderForm() {
  const params = useSearchParams();
  const skuParam = params.get("sku") || "";

  const [sku, setSku] = useState(skuParam || "heartbeat-rose");
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", note: "", occasion: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => { if (skuParam) setSku(skuParam); }, [skuParam]);

  const product = PRODUCTS[sku] || PRODUCTS["heartbeat-rose"];
  const subtotal = product.price * qty;
  const shipping = 80;
  const total = subtotal + shipping;

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.address.trim()) e.address = "Delivery address is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
        <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🌸</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 800, marginBottom: "0.75rem" }}>Order received!</h2>
        <p style={{ color: "var(--text-muted)", maxWidth: 400, margin: "0 auto 2rem", lineHeight: 1.6 }}>
          Thank you, {form.name}! We'll reach out to <strong>{form.email}</strong> within 24 hours to confirm your order.
        </p>
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, padding: "1.5rem", maxWidth: 320, margin: "0 auto 2rem", textAlign: "left" }}>
          <p style={{ margin: "0 0 0.5rem", fontWeight: 700 }}>Order Summary</p>
          <p style={{ margin: "0 0 0.25rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>{product.name} × {qty}</p>
          <p style={{ margin: 0, fontWeight: 700 }}>₱{total} total</p>
        </div>
        <Link href="/" style={{ background: "var(--accent)", color: "#fff", textDecoration: "none", padding: "0.6rem 2rem", borderRadius: 24, fontWeight: 600 }}>Back to home</Link>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "3rem", alignItems: "start" }}>
      <form onSubmit={handleSubmit} noValidate>
        <section style={{ marginBottom: "2.5rem" }}>
          <SectionLabel>1. Choose your bouquet</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
            {Object.entries(PRODUCTS).map(([key, p]) => (
              <button type="button" key={key} onClick={() => setSku(key)} style={{
                border: "2px solid", borderColor: sku === key ? "var(--accent)" : "var(--border)",
                background: sku === key ? "var(--accent-light)" : "var(--card-bg)",
                borderRadius: 12, padding: "0.85rem 1rem", textAlign: "left", cursor: "pointer", transition: "all 0.15s ease"
              }}>
                <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "var(--text)", marginBottom: 2 }}>{p.name}</div>
                <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>₱{p.price}</div>
              </button>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <SectionLabel>2. Quantity</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} style={qBtnStyle}>−</button>
            <span style={{ fontWeight: 800, fontSize: "1.5rem", minWidth: 32, textAlign: "center" }}>{qty}</span>
            <button type="button" onClick={() => setQty(q => Math.min(10, q + 1))} style={qBtnStyle}>+</button>
          </div>
        </section>

        <section style={{ marginBottom: "2.5rem" }}>
          <SectionLabel>3. Your details</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <Field label="Full name *" error={errors.name}>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ana Santos" style={inputStyle(errors.name)} />
            </Field>
            <Field label="Email *" error={errors.email}>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="ana@email.com" style={inputStyle(errors.email)} />
            </Field>
            <Field label="Phone">
              <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+63 9xx xxx xxxx" style={inputStyle()} />
            </Field>
            <Field label="Occasion">
              <select value={form.occasion} onChange={e => setForm(f => ({ ...f, occasion: e.target.value }))} style={{ ...inputStyle(), background: "var(--card-bg)" }}>
                <option value="">— Optional —</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Just because</option>
                <option>Thank you</option>
                <option>Wedding / Event</option>
              </select>
            </Field>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Field label="Delivery address *" error={errors.address}>
              <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="123 Sampaguita St, Cebu City" style={inputStyle(errors.address)} />
            </Field>
          </div>
          <div style={{ marginTop: "1rem" }}>
            <Field label="Special note for the maker">
              <textarea value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Color preferences, dedicated message, anything you'd like us to know..." rows={3} style={{ ...inputStyle(), resize: "vertical" }} />
            </Field>
          </div>
        </section>

        <button type="submit" style={{
          background: "var(--accent)", color: "#fff", border: "none", borderRadius: 28,
          padding: "0.9rem 2.5rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer", width: "100%"
        }}>
          Place order →
        </button>
      </form>

      <div style={{ position: "sticky", top: "2rem" }}>
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: "1.75rem" }}>
          <h3 style={{ fontWeight: 800, fontSize: "1.1rem", margin: "0 0 1.25rem" }}>Order summary</h3>
          <div style={{ background: "var(--accent-light)", borderRadius: 12, padding: "1rem 1.1rem", marginBottom: "1.25rem" }}>
            <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{product.name}</div>
            <div style={{ color: "var(--text-muted)", fontSize: "0.82rem", marginTop: 4, lineHeight: 1.4 }}>{product.desc}</div>
          </div>
          <Row label={`₱${product.price} × ${qty}`} value={`₱${subtotal}`} />
          <Row label="Shipping" value={`₱${shipping}`} />
          <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.75rem", paddingTop: "0.75rem" }}>
            <Row label="Total" value={`₱${total}`} bold />
          </div>
          <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "1rem 0 0", lineHeight: 1.5 }}>
            Payment via GCash, bank transfer, or cash on pickup.
          </p>
        </div>
        <Link href="/gallery" style={{ display: "block", textAlign: "center", marginTop: "1rem", color: "var(--text-muted)", fontSize: "0.85rem", textDecoration: "none" }}>
          ← Browse more arrangements
        </Link>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <p style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", margin: "0 0 1rem" }}>{children}</p>;
}

function Field({ label, error, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.35rem" }}>{label}</label>
      {children}
      {error && <p style={{ color: "#e05", fontSize: "0.76rem", margin: "0.3rem 0 0" }}>{error}</p>}
    </div>
  );
}

function Row({ label, value, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
      <span style={{ color: bold ? "var(--text)" : "var(--text-muted)", fontSize: "0.88rem", fontWeight: bold ? 800 : 400 }}>{label}</span>
      <span style={{ fontWeight: bold ? 800 : 500, fontSize: "0.88rem" }}>{value}</span>
    </div>
  );
}

const inputStyle = (err) => ({
  width: "100%", padding: "0.6rem 0.85rem", borderRadius: 10,
  border: `1.5px solid ${err ? "#e05" : "var(--border)"}`,
  background: "var(--card-bg)", color: "var(--text)",
  fontSize: "0.88rem", outline: "none", boxSizing: "border-box", fontFamily: "inherit"
});

const qBtnStyle = {
  width: 36, height: 36, borderRadius: "50%", border: "1.5px solid var(--border)",
  background: "var(--card-bg)", color: "var(--text)", cursor: "pointer",
  fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center"
};

export default function OrderPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", fontFamily: "var(--font-body)" }}>
      <nav style={{ padding: "1.25rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", color: "inherit" }}>
          <img src="/heartbeat-logo.png" alt="logo" style={{ width: 28, height: 28 }} />
          <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Heartbeat</span>
        </Link>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <Link href="/gallery" style={{ textDecoration: "none", color: "var(--text-muted)", fontSize: "0.9rem" }}>Gallery</Link>
          <Link href="/customize" style={{ textDecoration: "none", color: "var(--text-muted)", fontSize: "0.9rem" }}>Customize</Link>
        </div>
      </nav>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 2rem" }}>
        <h1 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.03em", margin: "0 0 0.5rem" }}>Place an order</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2.5rem" }}>Fill out the form and we'll confirm within 24 hours.</p>
        <Suspense fallback={<p>Loading…</p>}>
          <OrderForm />
        </Suspense>
      </div>
    </main>
  );
}
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[28px] row-start-2 items-center sm:items-start max-w-3xl w-full">
        <div className="flex items-center gap-4">
          <Image
            className="dark:invert"
            src="/heart-logo.svg"
            alt="Heartbeat Flower Shop logo"
            width={48}
            height={48}
            priority
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Heartbeat Flower Shop
            </h1>
            <p className="text-sm text-muted-foreground">
              Made-to-order fuzzy-wire flower bouquets — whimsical, durable, and
              handcrafted to surprise.
            </p>
          </div>
        </div>

        <p className="font-mono text-sm/6">
          Choose colors, size, and a short note. We bend the wire, fluff the
          petals, and send a little heartbeat.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row w-full sm:w-auto">
          <a
            className="rounded-full bg-foreground text-background px-5 py-3 font-medium text-sm sm:text-base flex items-center justify-center"
            href="/order"
          >
            Order a bouquet
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] px-5 py-3 font-medium text-sm sm:text-base flex items-center justify-center"
            href="/gallery"
          >
            Browse gallery
          </a>
        </div>

        <div className="grid grid-cols-3 gap-3 w-full sm:w-auto">
          <Image
            src="/bouquet-1.jpg"
            alt="Fuzzy wire bouquet example 1"
            width={160}
            height={120}
            className="rounded"
          />
          <Image
            src="/bouquet-2.jpg"
            alt="Fuzzy wire bouquet example 2"
            width={160}
            height={120}
            className="rounded"
          />
          <Image
            src="/bouquet-3.jpg"
            alt="Fuzzy wire bouquet example 3"
            width={160}
            height={120}
            className="rounded"
          />
        </div>

        {/* Best sellers */}
        <section id="best-sellers" className="w-full mt-4">
          <h2 className="text-lg font-semibold mb-3">Best sellers</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Our most loved fuzzy-wire bouquets — ready to brighten desks, corners,
            and mailboxes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <article className="border rounded-lg p-4 flex flex-col items-start gap-3">
              <Image
                src="/best-rose.jpg"
                alt="Heartbeat Rose"
                width={320}
                height={220}
                className="rounded"
              />
              <div>
                <h3 className="font-medium">Heartbeat Rose</h3>
                <p className="text-sm text-muted-foreground">
                  Classic warm red petals on a sturdy fuzzy stem.
                </p>
                <div className="mt-2">
                  <a
                    className="text-sm underline"
                    href="/order?sku=heartbeat-rose"
                  >
                    Order
                  </a>
                </div>
              </div>
            </article>

            <article className="border rounded-lg p-4 flex flex-col items-start gap-3">
              <Image
                src="/best-daisy.jpg"
                alt="Dainty Daisy"
                width={320}
                height={220}
                className="rounded"
              />
              <div>
                <h3 className="font-medium">Dainty Daisy</h3>
                <p className="text-sm text-muted-foreground">
                  Sunny daisies in mixed pastels — cheerful and low-maintenance.
                </p>
                <div className="mt-2">
                  <a
                    className="text-sm underline"
                    href="/order?sku=dainty-daisy"
                  >
                    Order
                  </a>
                </div>
              </div>
            </article>

            <article className="border rounded-lg p-4 flex flex-col items-start gap-3">
              <Image
                src="/best-mixed.jpg"
                alt="Mixed Melody"
                width={320}
                height={220}
                className="rounded"
              />
              <div>
                <h3 className="font-medium">Mixed Melody</h3>
                <p className="text-sm text-muted-foreground">
                  A curated mix of textures and colors for surprising
                  combinations.
                </p>
                <div className="mt-2">
                  <a
                    className="text-sm underline"
                    href="/order?sku=mixed-melody"
                  >
                    Order
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="w-full mt-6">
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">By size</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <a
                    href="/gallery?size=small"
                    className="underline"
                  >
                    Small — pocket-sized bundles
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery?size=medium"
                    className="underline"
                  >
                    Medium — everyday bouquets
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery?size=large"
                    className="underline"
                  >
                    Large — statement pieces
                  </a>
                </li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">By flower type</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <a
                    href="/gallery?type=roses"
                    className="underline"
                  >
                    Roses
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery?type=daisies"
                    className="underline"
                  >
                    Daisies
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery?type=mixed"
                    className="underline"
                  >
                    Mixed & textured
                  </a>
                </li>
                <li>
                  <a
                    href="/gallery?type=minis"
                    className="underline"
                  >
                    Mini stems
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Customize */}
        <section id="customize" className="w-full mt-6">
          <h2 className="text-lg font-semibold mb-3">
            Customize your own bouquet
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Pick colors, choose a size, and add a short note. We'll handcraft a
            one-of-a-kind fuzzy-wire bouquet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <a
              className="rounded-full bg-foreground text-background px-5 py-3 font-medium text-sm sm:text-base flex items-center justify-center"
              href="/customize"
            >
              Customize now
            </a>
            <div className="text-sm text-muted-foreground">
              Prefer a quick preset?{" "}
              <a href="/order" className="underline">
                Order a preset
              </a>{" "}
              or browse the{" "}
              <a href="/gallery" className="underline">
                gallery
              </a>
              .
            </div>
          </div>
        </section>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="hover:underline"
          href="mailto:hello@heartbeatflowershop.example"
        >
          Contact
        </a>
        <a
          className="hover:underline"
          href="https://instagram.com/heartbeatflowershop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          className="hover:underline"
          href="https://etsy.com/shop/heartbeatflowershop"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shop (Etsy)
        </a>
      </footer>
    </div>
  );
}

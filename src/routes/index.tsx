import { createFileRoute } from "@tanstack/react-router";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import hero from "@/assets/hero-interior.jpg";
import workshop from "@/assets/workshop.jpg";
import ambient from "@/assets/ambient.jpg";
import steering from "@/assets/steering.jpg";
import floormat from "@/assets/floormat.jpg";
import storefrontAsset from "@/assets/storefront.png.asset.json";
import seatRedAsset from "@/assets/seat-red.png.asset.json";
import seatsBlackAsset from "@/assets/seats-black.png.asset.json";

const storefront = storefrontAsset.url;
const seatRed = seatRedAsset.url;
const seatsBlack = seatsBlackAsset.url;

const PHONE = "919927662233";
const wa = (m = "Hi, I'd like a quote for car seat covers.") =>
  `https://wa.me/${PHONE}?text=${encodeURIComponent(m)}`;

const TITLE = "Mahavir Seat Industries | Best Car Seat Covers & Accessories in Dehradun";
const DESC = "Premium car seat covers, custom seat manufacturing, bucket seat covers, ambient lighting, and car accessories in Dehradun. Trusted by customers for over 15 years.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "car seat covers dehradun, car accessories dehradun, premium seat covers uttarakhand, car interior customization, bucket seat covers, mahavir seat industries" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/" },
      { property: "og:image", content: hero },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Mahavir Seat Industries",
        image: hero,
        telephone: "+91-9927662233",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Shop No. 5, First Floor, JN Plaza, Near Prince Chowk, Haridwar Road",
          addressLocality: "Dehradun",
          addressRegion: "Uttarakhand",
          addressCountry: "IN",
        },
        aggregateRating: { "@type": "AggregateRating", ratingValue: "4.4", reviewCount: "145" },
        openingHours: "Mo-Su 09:00-20:30",
      }),
    }],
  }),
  component: Home,
});

const services = [
  { t: "Premium Seat Covers", d: "Custom-tailored leather & fabric covers built to last.", i: "⬢" },
  { t: "Bucket Seat Covers", d: "Sport-style bucket fits with diamond stitching.", i: "◈" },
  { t: "Leather Seat Covers", d: "Full-grain & nappa leather upholstery.", i: "◆" },
  { t: "Fabric Seat Covers", d: "Breathable premium woven textiles.", i: "▣" },
  { t: "Interior Customization", d: "Door pads, roof liners & complete interiors.", i: "▤" },
  { t: "Ambient Lighting", d: "Multi-zone RGB lighting installation.", i: "✦" },
  { t: "Steering Covers", d: "Hand-stitched perforated leather wraps.", i: "◯" },
  { t: "7D Floor Mats", d: "Custom-cut diamond quilted floor protection.", i: "▦" },
  { t: "Dashboard Accessories", d: "Premium dashboard kits & detailing.", i: "▭" },
];

const reasons = [
  { t: "15+ Years Experience", d: "Established craftsmanship since 2010." },
  { t: "Premium Materials", d: "Only genuine, durable upholstery." },
  { t: "Factory-Style Fitting", d: "Precision cut, perfect contour fit." },
  { t: "Expert Technicians", d: "Trained installers, zero compromise." },
  { t: "Affordable Pricing", d: "Honest quotes, no hidden costs." },
  { t: "Warranty Support", d: "Backed by lasting service warranty." },
  { t: "Thousands Installed", d: "Trusted by 5000+ vehicle owners." },
  { t: "Women-Owned Brand", d: "Proudly led & operated locally." },
];

const reviews = [
  { n: "Rohit Sharma", c: "Best seat cover service in Dehradun. Quality and finish are unmatched.", r: 5 },
  { n: "Ankita Verma", c: "Seat fitting is top notch — looks completely factory-installed.", r: 5 },
  { n: "Manish Negi", c: "Reasonable pricing and excellent quality. Highly recommended.", r: 4 },
  { n: "Priya Rawat", c: "Perfect stitching and professional installation. Loved the experience.", r: 5 },
];

const areas = ["Dehradun", "Haridwar", "Rishikesh", "Roorkee", "Vikasnagar", "Mussoorie", "Uttarakhand"];

function Star({ filled = true }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`w-4 h-4 ${filled ? "fill-[var(--gold)]" : "fill-muted"}`}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <WhatsAppButton />

      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
          <nav className="glass rounded-full flex items-center justify-between pl-5 pr-2 py-2">
            <a href="#top" className="flex items-center gap-2">
              <span className="grid place-items-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold text-sm">M</span>
              <span className="font-display font-semibold tracking-tight">Mahavir <span className="text-muted-foreground">Seat Industries</span></span>
            </a>
            <div className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
              <a href="#services" className="hover:text-foreground transition">Services</a>
              <a href="#gallery" className="hover:text-foreground transition">Gallery</a>
              <a href="#why" className="hover:text-foreground transition">Why Us</a>
              <a href="#reviews" className="hover:text-foreground transition">Reviews</a>
              <a href="#contact" className="hover:text-foreground transition">Contact</a>
            </div>
            <a href={wa()} target="_blank" rel="noopener noreferrer" className="rounded-full bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-90 transition">Get Quote</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen flex items-end overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <img src={hero} alt="Premium diamond-stitched car seat interior" className="absolute inset-0 w-full h-full object-cover opacity-60" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pb-20 pt-40 w-full">
          <div className="max-w-3xl animate-fade-up">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs tracking-wider uppercase text-muted-foreground mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Dehradun · Since 2010
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tighter">
              Premium Car Seat Covers
              <br />
              <span className="text-gradient-gold italic font-normal">Crafted for Comfort.</span>
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Dehradun's trusted manufacturer of custom car seat covers, bucket seats & luxury interior accessories — for over 15 years.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-3 rounded-full bg-accent text-accent-foreground px-7 py-4 font-medium shadow-[var(--shadow-glow)] hover:scale-[1.02] transition">
                Get Quote on WhatsApp
                <span className="grid place-items-center w-7 h-7 rounded-full bg-background/20 group-hover:translate-x-1 transition">→</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-3 rounded-full glass px-7 py-4 font-medium hover:bg-white/10 transition">
                Visit Store
              </a>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-8 sm:gap-12">
              <div>
                <div className="flex items-center gap-1.5"><Star /><Star /><Star /><Star /><Star filled={false} /><span className="ml-2 font-display text-2xl font-semibold">4.4</span></div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Google Rating</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-semibold">145<span className="text-accent">+</span></div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Reviews</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-display text-2xl font-semibold">5,000<span className="text-accent">+</span></div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-6">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-16 px-8 font-display text-3xl text-muted-foreground/40">
              {["Custom Stitching", "·", "Bucket Seats", "·", "Leather Interiors", "·", "Ambient Lighting", "·", "Factory Fitting", "·", "Premium Accessories", "·"].map((t, i) => (
                <span key={`${k}-${i}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-28 sm:py-36 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <img src={workshop} alt="Craftsman stitching premium leather" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-60 aspect-square rounded-2xl overflow-hidden border-4 border-background shadow-[var(--shadow-elegant)]">
              <img src={storefront} alt="MSI storefront, Dehradun" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-6">About MSI</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[1.05]">
              Uttarakhand's home of <span className="text-gradient-gold italic">precision craftsmanship</span>.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground leading-relaxed">
              Born in the heart of Dehradun, Mahavir Seat Industries has spent over fifteen years perfecting the art of automotive upholstery. Every seat cover is custom-manufactured in-house, hand-finished by master technicians, and fitted with the precision of a factory line.
            </p>
            <div className="hairline my-10" />
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="font-display text-4xl">15+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">Years</div>
              </div>
              <div>
                <div className="font-display text-4xl">5k+</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">Cars Fitted</div>
              </div>
              <div>
                <div className="font-display text-4xl">7</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">Cities Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 sm:py-36 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Services</div>
              <h2 className="font-display text-4xl sm:text-6xl tracking-tighter leading-[1.05] max-w-2xl">
                Every detail. <span className="text-gradient-gold italic">Engineered.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md">From custom seat manufacturing to complete interior transformations — one studio, every craft.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden">
            {services.map((s) => (
              <div key={s.t} className="group relative bg-card p-8 sm:p-10 hover:bg-muted transition-colors duration-500">
                <div className="text-3xl text-accent mb-8 font-display">{s.i}</div>
                <h3 className="font-display text-xl mb-2">{s.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 transition-all text-accent">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-28 sm:py-36 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Gallery</div>
            <h2 className="font-display text-4xl sm:text-6xl tracking-tighter">Our <span className="text-gradient-gold italic">work</span>, up close.</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { src: seatRed, alt: "Red & black diamond-stitched bucket seat cover", span: "row-span-2", label: "Luxury Seat Cover" },
              { src: seatsBlack, alt: "Black diamond-quilted bucket seats", span: "", label: "Bucket Seats" },
              { src: ambient, alt: "Blue ambient interior lighting", span: "", label: "Ambient Lighting" },
              { src: floormat, alt: "7D black diamond floor mats", span: "row-span-2", label: "7D Floor Mats" },
              { src: steering, alt: "Black perforated steering wheel cover", span: "", label: "Steering Cover" },
              { src: hero, alt: "Premium interior craftsmanship", span: "", label: "Premium Stitching" },
            ].map((g, i) => (
              <figure key={i} className={`group relative overflow-hidden rounded-xl bg-card ${g.span}`}>
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-[1.2s] ease-out" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-90" />
                <figcaption className="absolute bottom-4 left-4 right-4 text-xs uppercase tracking-wider text-foreground/90">{g.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="py-28 sm:py-36 border-t border-border relative overflow-hidden">
        <img src={ambient} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Why Choose Us</div>
            <h2 className="font-display text-4xl sm:text-6xl tracking-tighter leading-[1.05]">
              Eight reasons we're <span className="text-gradient-gold italic">Uttarakhand's #1</span>.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {reasons.map((r, i) => (
              <div key={r.t} className="glass rounded-2xl p-7 hover:border-accent/40 transition group">
                <div className="font-display text-5xl text-muted-foreground/40 group-hover:text-accent transition-colors">{String(i + 1).padStart(2, "0")}</div>
                <div className="hairline my-5" />
                <h3 className="font-display text-lg mb-2">{r.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-28 sm:py-36 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Reviews</div>
              <h2 className="font-display text-4xl sm:text-6xl tracking-tighter">Words from <span className="text-gradient-gold italic">our customers</span>.</h2>
            </div>
            <div className="glass rounded-2xl px-7 py-5">
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl">4.4</span>
                <div>
                  <div className="flex gap-1"><Star /><Star /><Star /><Star /><Star filled={false} /></div>
                  <div className="text-xs text-muted-foreground mt-1">Based on 145+ Google reviews</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviews.map((rv) => (
              <blockquote key={rv.n} className="rounded-2xl bg-card p-7 border border-border hover:border-accent/40 transition">
                <div className="flex gap-1 mb-5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < rv.r} />)}</div>
                <p className="text-foreground leading-relaxed">"{rv.c}"</p>
                <footer className="mt-6 pt-5 border-t border-border text-sm">
                  <div className="font-medium">{rv.n}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Verified Customer</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-accent mb-6">Service Areas</div>
              <h2 className="font-display text-4xl sm:text-5xl tracking-tighter">Serving all of <span className="text-gradient-gold italic">Uttarakhand</span>.</h2>
              <div className="mt-8 flex flex-wrap gap-2">
                {areas.map((a) => (
                  <span key={a} className="glass rounded-full px-5 py-2 text-sm">{a}</span>
                ))}
              </div>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden border border-border">
              <iframe
                title="Mahavir Seat Industries location"
                src="https://www.google.com/maps?q=Mahavir+Seat+Industries+Dehradun&output=embed"
                className="w-full h-full grayscale contrast-125"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section id="contact" className="py-28 sm:py-36 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(60% 50% at 50% 50%, oklch(0.55 0.22 22 / 0.15), transparent)" }} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-tighter leading-[0.95]">
              Transform your car
              <br /><span className="text-gradient-gold italic">interior today.</span>
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={wa()} target="_blank" rel="noopener noreferrer" className="rounded-full bg-accent text-accent-foreground px-8 py-4 font-medium shadow-[var(--shadow-glow)] hover:scale-[1.02] transition">WhatsApp 9927662233</a>
              <a href="tel:+919927662233" className="rounded-full glass px-8 py-4 font-medium hover:bg-white/10 transition">Call Now</a>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass rounded-2xl p-7">
              <div className="text-xs uppercase tracking-wider text-accent mb-4">Main Store</div>
              <p className="font-display text-lg leading-snug">Shop No. 5, First Floor, JN Plaza, Near Prince Chowk</p>
              <p className="text-muted-foreground text-sm mt-2">Haridwar Road, Dehradun, Uttarakhand</p>
            </div>
            <div className="glass rounded-2xl p-7">
              <div className="text-xs uppercase tracking-wider text-accent mb-4">Branches</div>
              <p className="font-display text-lg">Bhaniawala</p>
              <p className="text-muted-foreground text-sm mt-1">Near FRI, Haridwar Road</p>
            </div>
            <div className="glass rounded-2xl p-7">
              <div className="text-xs uppercase tracking-wider text-accent mb-4">Hours & Contact</div>
              <p className="font-display text-lg">Open Daily · till 8:30 PM</p>
              <a href="tel:+919927662233" className="block text-muted-foreground text-sm mt-1 hover:text-foreground">+91 99276 62233</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-7 h-7 rounded-full bg-accent text-accent-foreground font-bold text-xs">M</span>
            <span>© {new Date().getFullYear()} Mahavir Seat Industries · Dehradun</span>
          </div>
          <div>Women-owned · Made in Uttarakhand</div>
        </div>
      </footer>
    </div>
  );
}

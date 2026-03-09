import { Ornament } from './Ornament';

export const Services = () => {
  return (
    <section id="services" className="py-[140px] bg-[var(--bg2)] relative z-10">
      <div className="max-w-[1100px] mx-auto px-[60px]">
        <div className="reveal">
          <div className="text-[10px] tracking-[6px] uppercase text-[var(--gold)] mb-4">
            Services
          </div>
          <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(36px,5vw,58px)] font-light text-[var(--cream)] leading-[1.15]">
            What I <em className="italic text-[var(--gold)]">offer.</em>
          </h2>
          <Ornament />
        </div>
        <div className="grid md:grid-cols-2 gap-[2px]">
          <ServiceCard
            number="01"
            icon="🍷"
            name="Wine Importer Websites"
            description="Elegant, conversion-focused websites that reflect the quality of your portfolio. Built specifically for wine importers — not generic templates."
            tags={['Design', 'Development', 'Wine Portfolio', 'Mobile-First']}
          />
          <ServiceCard
            number="02"
            icon="📊"
            name="Business Dashboards"
            description="Custom dashboards connected to QuickBooks Desktop, providing real-time visibility into sales, margins, and inventory — accessible via secure login from anywhere."
            tags={['QuickBooks', 'Data Viz', 'Secure Login', 'Real-Time']}
          />
          <ServiceCard
            number="03"
            icon="⚡"
            name="Price Post Automation"
            description="Automated monthly price posting for New York State — a process that used to take days, now completed in minutes. Built from real compliance experience."
            tags={['NY Price Post', 'Automation', 'Compliance', 'TTB']}
          />
          <ServiceCard
            number="04"
            icon="🔧"
            name="Custom Development"
            description="Bespoke tools, internal systems, and web applications for wine businesses — from inventory management to client portals and beyond."
            tags={['Full-Stack', 'API Integration', 'Portals', 'Custom Tools']}
          />
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({
  number,
  icon,
  name,
  description,
  tags,
}: {
  number: string;
  icon: string;
  name: string;
  description: string;
  tags: string[];
}) => {
  return (
    <div className="bg-[var(--bg)] border border-[var(--border)] p-11 relative overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] group reveal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(201,168,76,0.04),transparent)] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="font-['Cormorant_Garamond',serif] text-[64px] font-light text-[var(--border)] leading-none absolute top-5 right-[30px] transition-colors duration-300 group-hover:text-[rgba(201,168,76,0.1)]">
        {number}
      </div>
      <div className="text-[28px] mb-5">{icon}</div>
      <div className="font-['Cormorant_Garamond',serif] text-2xl font-normal text-[var(--cream)] mb-3">
        {name}
      </div>
      <p className="text-[13.5px] text-[var(--text-dim)] leading-[1.8] mb-5">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] tracking-[2px] uppercase text-[var(--gold-dim)] border border-[var(--border)] px-[10px] py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

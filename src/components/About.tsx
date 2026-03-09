import { Ornament } from './Ornament';

export const About = () => {
  return (
    <section id="about" className="py-[140px] relative z-10">
      <div className="max-w-[1100px] mx-auto px-[60px]">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="text-[10px] tracking-[6px] uppercase text-[var(--gold)] mb-4 reveal">
              About
            </div>
            <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(36px,5vw,58px)] font-light text-[var(--cream)] leading-[1.15] reveal">
              Built from the
              <br />
              <em className="italic text-[var(--gold)]">inside out.</em>
            </h2>
            <Ornament />
            <p className="text-[15px] leading-[1.9] text-[var(--cream-dim)] mb-5 reveal">
              I'm a developer and digital strategist based in{' '}
              <strong className="text-[var(--cream)] font-medium">Madeira Island, Portugal</strong>,
              working at the intersection of technology and the wine industry. I currently manage
              compliance and the full import operations pipeline at{' '}
              <strong className="text-[var(--cream)] font-medium">Savio Soares Selections</strong> —
              one of the leading boutique wine importers in the US.
            </p>
            <p className="text-[15px] leading-[1.9] text-[var(--cream-dim)] mb-5 reveal">
              This dual role gives me something no generic web agency has: a deep understanding of{' '}
              <strong className="text-[var(--cream)] font-medium">
                how wine importers actually work
              </strong>{' '}
              — from TTB compliance and price posting, to buyer relationships and distributor needs.
            </p>
            <p className="text-[15px] leading-[1.9] text-[var(--cream-dim)] reveal">
              I build websites, dashboards, and automation tools that solve real problems for small
              and mid-size wine importers across the United States.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-[2px] reveal">
            <StatBox number="5+" label="Wine Industry<br/>Projects Delivered" />
            <StatBox number="NY" label="Price Post<br/>Automation" />
            <StatBox number="QB" label="QuickBooks<br/>Dashboard Integration" />
            <StatBox number="∞" label="Hours Saved via<br/>Automation" />
          </div>
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ number, label }: { number: string; label: string }) => {
  return (
    <div className="bg-[var(--bg2)] border border-[var(--border)] p-8 relative overflow-hidden transition-all duration-300 hover:border-[var(--border-hover)] group">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--gold)] to-transparent scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
      <div className="font-['Cormorant_Garamond',serif] text-5xl font-light text-[var(--gold)] leading-none mb-2">
        {number}
      </div>
      <div
        className="text-[11px] tracking-[2px] uppercase text-[var(--text-dim)] leading-[1.4]"
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
};

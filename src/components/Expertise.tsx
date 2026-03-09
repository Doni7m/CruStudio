import { Ornament } from './Ornament';

export const Expertise = () => {
  return (
    <section id="expertise" className="py-[140px] bg-[var(--bg2)] relative z-10">
      <div className="max-w-[1100px] mx-auto px-[60px]">
        <div className="grid md:grid-cols-[1fr_2fr] gap-20 items-start">
          <div>
            <div className="text-[10px] tracking-[6px] uppercase text-[var(--gold)] mb-4 reveal">
              Expertise
            </div>
            <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(36px,5vw,58px)] font-light text-[var(--cream)] leading-[1.15] reveal">
              Skills &<br />
              <em className="italic text-[var(--gold)]">stack.</em>
            </h2>
            <Ornament />
            <p className="text-[14px] text-[var(--text-dim)] leading-[1.9] mt-5 reveal">
              A rare combination of wine industry knowledge and technical depth. I don't just build
              websites — I understand your business from the inside.
            </p>
          </div>
          <div className="flex flex-col reveal">
            <SkillRow name="Web Design & Development" percentage={92} />
            <SkillRow name="Wine Import Compliance" percentage={95} />
            <SkillRow name="QuickBooks Integration" percentage={85} />
            <SkillRow name="Process Automation" percentage={88} />
            <SkillRow name="React / JavaScript" percentage={83} />
            <SkillRow name="Node.js / Backend" percentage={78} />
            <SkillRow name="Data Visualization" percentage={80} />
            <SkillRow name="UI / UX Design" percentage={87} />
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillRow = ({ name, percentage }: { name: string; percentage: number }) => {
  return (
    <div className="flex items-center justify-between py-5 border-b border-[var(--border)] relative group">
      <div className="absolute bottom-[-1px] left-0 h-px bg-[var(--gold)] w-0 transition-all duration-500 ease-out group-hover:w-full" />
      <div className="font-['Cormorant_Garamond',serif] text-lg font-normal text-[var(--cream)]">
        {name}
      </div>
      <div className="flex items-center gap-[14px]">
        <div className="w-[120px] h-px bg-[var(--border)] relative">
          <div
            className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-[11px] tracking-[1px] text-[var(--gold)] w-[38px] text-right">
          {percentage}%
        </div>
      </div>
    </div>
  );
};

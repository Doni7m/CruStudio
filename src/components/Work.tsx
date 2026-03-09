import { Ornament } from './Ornament';

export const Work = () => {
  return (
    <section id="work" className="py-[140px] relative z-10">
      <div className="max-w-[1100px] mx-auto px-[60px]">
        <div className="reveal">
          <div className="text-[10px] tracking-[6px] uppercase text-[var(--gold)] mb-4">
            Portfolio
          </div>
          <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(36px,5vw,58px)] font-light text-[var(--cream)] leading-[1.15]">
            Selected <em className="italic text-[var(--gold)]">work.</em>
          </h2>
          <Ornament />
        </div>
        <div className="grid md:grid-cols-2 gap-7">
          <ProjectCard
            badge="Live"
            visualClass="bg-gradient-to-br from-[#1a1208] via-[#0e0b06] to-[#1a1208]"
            mockupText="Savio Soares"
            category="Wine Importer · Web Design"
            name="Savio Soares Selections"
            description="A refined digital home for one of the US's most respected boutique importers. Elegant storytelling meets a curated wine portfolio experience."
            link="savio-soares-selections.onrender.com"
            url="https://savio-soares-selections.onrender.com/"
          />
          <ProjectCard
            badge="Live"
            visualClass="bg-gradient-to-br from-[#0a0d14] via-[#060810] to-[#0a0d14]"
            mockupText="Angel's Share"
            category="Wine Importer · Web Design"
            name="Angel's Share Wines"
            description="A discovery-driven website for an importer with a passion for rare and artisanal wines. Built to invite exploration and build buyer trust."
            link="angels-share-winesmvp.onrender.com"
            url="https://angels-share-winesmvp.onrender.com"
          />
          <ProjectCard
            visualClass="bg-gradient-to-br from-[#0a1410] via-[#060e0a] to-[#0a1410]"
            mockupText="QB Data"
            category="Dashboard · Automation"
            name="QuickBooks Wine Dashboard"
            description="A secure, web-based dashboard synced with QuickBooks Desktop. Gives importers real-time visibility into key metrics — accessible anywhere, anytime."
            link="Private Client Project"
            isPrivate
          />
          <ProjectCard
            visualClass="bg-gradient-to-br from-[#140a0a] via-[#0e0606] to-[#140a0a]"
            mockupText="NY Price"
            category="Automation · Compliance"
            name="NY Price Post Automation"
            description="A custom automation system that handles New York State's monthly price posting requirements — reducing a multi-day process to just minutes."
            link="Private Client Project"
            isPrivate
          />
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({
  badge,
  visualClass,
  mockupText,
  category,
  name,
  description,
  link,
  url,
  isPrivate,
}: {
  badge?: string;
  visualClass: string;
  mockupText: string;
  category: string;
  name: string;
  description: string;
  link: string;
  url?: string;
  isPrivate?: boolean;
}) => {
  const content = (
    <>
      {badge && (
        <div className="absolute top-4 right-4 bg-[rgba(201,168,76,0.15)] border border-[var(--gold-dim)] text-[var(--gold)] text-[9px] tracking-[2px] uppercase px-[10px] py-1">
          {badge}
        </div>
      )}
      <div className={`h-[200px] relative overflow-hidden ${visualClass} flex items-center justify-center`}>
        <div className="font-['Cormorant_Garamond',serif] text-5xl font-light italic text-[rgba(201,168,76,0.15)] text-center leading-none select-none">
          {mockupText.split(' ').map((word, i) => (
            <div key={i}>{word}</div>
          ))}
        </div>
        {!isPrivate && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="text-[11px] tracking-[4px] uppercase text-[var(--gold)] border border-[var(--gold-dim)] px-[22px] py-[10px]">
              Visit Site →
            </div>
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="text-[10px] tracking-[4px] uppercase text-[var(--gold)] mb-[10px]">
          {category}
        </div>
        <div className="font-['Cormorant_Garamond',serif] text-2xl font-normal text-[var(--cream)] mb-[10px]">
          {name}
        </div>
        <p className="text-[13px] text-[var(--text-dim)] leading-[1.75] mb-[18px]">
          {description}
        </p>
        <div className={`text-[11px] tracking-[2px] flex items-center gap-2 ${isPrivate ? 'text-[var(--text-dim)]' : 'text-[var(--gold-dim)] group-hover:text-[var(--gold)]'}`}>
          {link} {!isPrivate && '→'}
        </div>
      </div>
    </>
  );

  if (isPrivate || !url) {
    return (
      <div className="bg-[var(--bg2)] border border-[var(--border)] overflow-hidden relative transition-all duration-300 group reveal">
        {content}
      </div>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[var(--bg2)] border border-[var(--border)] overflow-hidden relative transition-all duration-300 hover:border-[var(--gold-dim)] group block no-underline reveal"
    >
      {content}
    </a>
  );
};

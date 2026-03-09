export const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-10 pt-[140px] pb-[100px] md:px-10 relative"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%), radial-gradient(ellipse 40% 30% at 20% 20%, rgba(201,168,76,0.03) 0%, transparent 60%)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
        }}
      />

      <div
        className="text-[11px] tracking-[6px] uppercase text-[var(--gold)] mb-7 opacity-0 z-10"
        style={{ animation: 'fadeUp 0.8s 0.2s forwards' }}
      >
        Wine Industry · Digital & Technology
      </div>

      <h1
        className="font-['Cormorant_Garamond',serif] text-[clamp(52px,8vw,96px)] font-light leading-[1.05] text-[var(--cream)] mb-3 opacity-0 z-10"
        style={{ animation: 'fadeUp 0.9s 0.35s forwards' }}
      >
        Crafting digital
        <br />
        <em className="italic text-[var(--gold)] block">presence for wine.</em>
      </h1>

      <p
        className="text-[14px] text-[var(--text-dim)] leading-[1.9] max-w-[520px] mx-auto mt-7 opacity-0 z-10"
        style={{ animation: 'fadeUp 0.9s 0.5s forwards' }}
      >
        Web design, dashboards, and automation built exclusively for the wine import industry — by
        someone who works inside it.
      </p>

      <div
        className="flex gap-5 justify-center mt-[52px] opacity-0 z-10 flex-wrap"
        style={{ animation: 'fadeUp 0.9s 0.65s forwards' }}
      >
        <a
          href="#work"
          className="px-11 py-[15px] bg-[var(--gold)] text-[var(--bg)] text-[11px] tracking-[4px] uppercase no-underline transition-all duration-300 hover:bg-[var(--gold-light)] font-['Montserrat',sans-serif]"
        >
          View Portfolio
        </a>
        <a
          href="#contact"
          className="px-11 py-[15px] border border-[var(--border-hover)] text-[var(--text-dim)] text-[11px] tracking-[4px] uppercase no-underline transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
        >
          Start a Project
        </a>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-[10px] opacity-0"
        style={{ animation: 'fadeIn 1s 1.2s forwards' }}
      >
        <div
          className="w-px h-[50px] bg-gradient-to-b from-[var(--gold)] to-transparent"
          style={{ animation: 'scrollAnim 2s infinite' }}
        />
        <span className="text-[10px] tracking-[4px] uppercase text-[var(--text-dim)]">Scroll</span>
      </div>
    </section>
  );
};

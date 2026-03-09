export const Footer = () => {
  return (
    <footer className="py-10 px-[60px] border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
      <div className="font-['Cormorant_Garamond',serif] text-lg font-semibold text-[var(--cream)] tracking-[2px]">
        CruStudio<span className="text-[var(--gold)]">.dev</span>
      </div>
      <div className="text-[11px] tracking-[2px] text-[var(--text-dim)]">
        © 2026 · crustudio.dev · Madeira Island, PT
      </div>
      <div className="flex gap-7">
        <a
          href="#about"
          className="text-[10px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
        >
          About
        </a>
        <a
          href="#work"
          className="text-[10px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
        >
          Work
        </a>
        <a
          href="#contact"
          className="text-[10px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
        >
          Contact
        </a>
      </div>
    </footer>
  );
};

import { useEffect, useState } from 'react';

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] px-[60px] py-6 flex items-center justify-between border-b transition-all duration-400 ${
        scrolled
          ? 'bg-[rgba(11,9,7,0.95)] border-[var(--border)] backdrop-blur-[10px]'
          : 'border-transparent'
      }`}
    >
      <div
        className="font-['Cormorant_Garamond',serif] text-[22px] font-semibold tracking-[2px] text-[var(--cream)]"
      >
        CruStudio<span className="text-[var(--gold)]">.dev</span>
      </div>
      <ul className="hidden md:flex gap-10 list-none">
        <li>
          <a
            href="#about"
            className="text-[11px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#services"
            className="text-[11px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#work"
            className="text-[11px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          >
            Work
          </a>
        </li>
        <li>
          <a
            href="#dashboard"
            className="text-[11px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#expertise"
            className="text-[11px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--gold)]"
          >
            Expertise
          </a>
        </li>
      </ul>
      <a
        href="#contact"
        className="text-[11px] tracking-[3px] uppercase text-[var(--gold)] no-underline border border-[var(--gold-dim)] px-[22px] py-[10px] transition-all duration-300 hover:bg-[var(--gold)] hover:text-[var(--bg)]"
      >
        Get in Touch
      </a>
    </nav>
  );
};

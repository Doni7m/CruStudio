export const Contact = () => {
  return (
    <section id="contact" className="py-40 relative z-10">
      <div className="max-w-[1100px] mx-auto px-[60px]">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="text-[10px] tracking-[6px] uppercase text-[var(--gold)] mb-4 reveal">
            Contact
          </div>
          <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(40px,6vw,68px)] font-light text-[var(--cream)] leading-[1.15] reveal">
            Let's build
            <br />
            <em className="italic text-[var(--gold)]">something.</em>
          </h2>
          <div className="flex items-center gap-6 my-[52px] justify-center reveal">
            <div className="h-px w-[60px] bg-gradient-to-r from-[var(--gold)] to-transparent" />
            <div className="w-1 h-1 bg-[var(--gold)] rotate-45" />
            <div className="h-px w-[60px] bg-gradient-to-l from-[var(--gold)] to-transparent" />
          </div>
          <p className="text-[15px] text-[var(--text-dim)] leading-[1.9] my-7 reveal">
            Whether you're a small importer looking for your first proper website, or an established
            one that needs smarter tools — let's talk. I offer a free 30-minute consultation to
            every new client.
          </p>
          <a
            href="mailto:crustudio.dev@gmail.com"
            className="font-['Cormorant_Garamond',serif] text-[28px] italic text-[var(--gold)] no-underline block my-[52px] transition-colors duration-300 hover:text-[var(--gold-light)] reveal"
          >
            crustudio.dev@gmail.com
          </a>
          <div className="flex items-center gap-6 my-[52px] reveal">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-[10px] tracking-[4px] uppercase text-[var(--text-dim)]">
              or find me on
            </span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>
          <div className="flex gap-5 justify-center reveal">
            <a
              href="#"
              className="text-[11px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline border border-[var(--border-hover)] px-[22px] py-[10px] transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-[11px] tracking-[3px] uppercase text-[var(--text-dim)] no-underline border border-[var(--border-hover)] px-[22px] py-[10px] transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

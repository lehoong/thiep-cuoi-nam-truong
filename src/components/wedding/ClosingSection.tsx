import { useInView } from "../../hooks/useInView";
import { weddingConfig } from "../../config/wedding";

export default function ClosingSection() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      aria-label="Lời cảm ơn"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={weddingConfig.media.closing}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 text-center px-6 py-16 transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="font-serif text-xl sm:text-2xl text-white/90 leading-relaxed mb-8">
          Cảm Ơn Bạn
          <br />
          Đã Đến Chung Vui
          <br />
          Cùng Chúng Mình
        </p>

        <div className="flex justify-center mb-6">
          <div className="w-10 h-px bg-white/30" />
          <div className="w-1 h-1 rounded-full bg-white/40 mx-2 -mt-px" />
          <div className="w-10 h-px bg-white/30" />
        </div>

        <p className="font-serif text-lg text-white/80">
          {weddingConfig.couple.groom.name} &amp; {weddingConfig.couple.bride.name}
        </p>

        <p className="font-sans text-xs tracking-[0.25em] text-white/50 mt-4">
          {weddingConfig.date.display}
        </p>
      </div>
    </section>
  );
}

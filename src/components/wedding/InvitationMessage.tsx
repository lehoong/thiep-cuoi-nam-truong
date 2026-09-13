import { useInView } from "../../hooks/useInView";
import { weddingConfig } from "../../config/wedding";

export default function InvitationMessage() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="py-20 px-6 bg-[#FDF8F0]"
      aria-label="Lời mời"
    >
      <div
        className={`max-w-md mx-auto text-center transition-all duration-700 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Decorative top */}
        <div className="flex justify-center mb-10">
          <div className="w-12 h-px bg-[#C9B88C]/40" />
          <div className="w-1 h-1 rounded-full bg-[#C9B88C]/50 mx-2 -mt-px" />
          <div className="w-12 h-px bg-[#C9B88C]/40" />
        </div>

        <h2 className="font-sans text-xs tracking-[0.3em] text-[#1B3A5C]/50 uppercase mb-8">
          Trân Trọng Kính Mời
        </h2>

        <p className="font-serif text-lg sm:text-xl text-[#2C2C2C]/80 leading-relaxed mb-8">
          Đến dự buổi tiệc chung vui
          <br />
          cùng gia đình chúng tôi
        </p>

        {/* Venue */}
        <p className="font-sans text-sm tracking-[0.2em] text-[#1B3A5C]/60 mb-3">
          {weddingConfig.events.ceremony.venue}
        </p>

        {/* Date */}
        <p className="font-serif text-2xl sm:text-3xl text-[#2C2C2C] mb-10">
          {weddingConfig.date.display}
        </p>

        {/* Closing message */}
        <p className="font-serif text-base sm:text-lg text-[#2C2C2C]/60 leading-relaxed italic">
          Sự hiện diện của Quý Khách
          <br />
          là niềm vinh hạnh cho gia đình chúng tôi.
        </p>

        {/* Decorative bottom */}
        <div className="flex justify-center mt-10">
          <div className="w-12 h-px bg-[#C9B88C]/40" />
          <div className="w-1 h-1 rounded-full bg-[#C9B88C]/50 mx-2 -mt-px" />
          <div className="w-12 h-px bg-[#C9B88C]/40" />
        </div>
      </div>
    </section>
  );
}

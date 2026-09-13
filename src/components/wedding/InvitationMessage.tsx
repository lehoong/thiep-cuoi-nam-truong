import { useInView } from "../../hooks/useInView";
import { weddingConfig } from "../../config/wedding";

export default function InvitationMessage() {
  const { ref, isInView } = useInView();

  return (
    <section
      ref={ref}
      className="py-20 px-4 sm:px-6 bg-[#FDF8F0]"
      aria-label="Lời mời"
    >
      <div
        className={`max-w-md sm:max-w-lg mx-auto bg-white shadow-2xl p-3 sm:p-5 transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Arch Border Container */}
        <div className="border-[1.5px] border-[#C9B88C]/40 rounded-t-full rounded-b-sm px-4 py-16 sm:px-8 sm:py-20 text-center flex flex-col items-center">
          
          {/* Logo */}
          <div className="font-script text-5xl sm:text-6xl text-[#A68A56] mb-12 drop-shadow-sm">
            T &amp; T
          </div>

          {/* Parents Info */}
          <div className="w-full grid grid-cols-2 gap-4 mb-10 text-[#2C2C2C]">
            <div className="flex flex-col items-center text-center">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1B3A5C]/50 mb-3">Nhà Trai</span>
              <span className="font-serif text-sm sm:text-base whitespace-pre-line leading-relaxed text-[#2C2C2C]/90">
                {(weddingConfig.couple.groom as any).parents?.replace(" - ", "\n")}
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#1B3A5C]/50 mb-3">Nhà Gái</span>
              <span className="font-serif text-sm sm:text-base whitespace-pre-line leading-relaxed text-[#2C2C2C]/90">
                {(weddingConfig.couple.bride as any).parents?.replace(" - ", "\n")}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-20 h-px bg-[#C9B88C]/40 mb-10" />

          {/* Invitation Text */}
          <p className="font-sans text-[11px] sm:text-xs tracking-[0.25em] text-[#1B3A5C]/70 uppercase mb-6">
            Trân trọng kính mời
          </p>

          <p className="font-serif text-base sm:text-lg text-[#2C2C2C]/80 leading-relaxed mb-8 px-4">
            Đến chung vui trong ngày hạnh phúc
            <br />
            cùng gia đình chúng tôi tại
          </p>

          {/* Venue & Address */}
          <div className="mb-10">
            <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1B3A5C] mb-3 uppercase tracking-wider">
              {weddingConfig.events.ceremony.venue}
            </h3>
            <p className="font-serif text-sm sm:text-base text-[#2C2C2C]/70">
              {weddingConfig.events.ceremony.address}
            </p>
          </div>

          {/* Date & Lunar Date */}
          <div className="mb-10">
            <p className="font-serif text-xl sm:text-2xl text-[#A68A56] mb-3 tracking-[0.15em]">
              CHỦ NHẬT | {weddingConfig.date.display}
            </p>
            <p className="font-serif text-sm text-[#2C2C2C]/50 italic">
              {(weddingConfig.date as any).lunar}
            </p>
          </div>

          {/* Closing message */}
          <p className="font-serif text-sm sm:text-base text-[#2C2C2C]/60 leading-relaxed italic px-4">
            Sự hiện diện của bạn
            <br />
            là niềm vinh hạnh lớn nhất đối với gia đình chúng tôi.
          </p>

        </div>
      </div>
    </section>
  );
}

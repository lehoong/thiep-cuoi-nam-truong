import { MapPin } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { weddingConfig } from "../../config/wedding";

interface EventBlockProps {
  title: string;
  time: string | null;
  venue: string | null;
  address: string | null;
  mapUrl: string | null;
  delay?: number;
}

function EventBlock({
  title,
  time,
  venue,
  address,
  mapUrl,
  delay = 0,
}: EventBlockProps) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`text-center py-10 px-6 border border-[#C9B88C]/20 bg-white/50 transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="font-sans text-xs tracking-[0.3em] text-[#1B3A5C] uppercase mb-4">
        {title}
      </h3>

      <p className="font-serif text-base text-[#2C2C2C]/60 mb-4">
        {time ? `VÀO LÚC ${time}` : "VÀO LÚC ...... GIỜ ......"}
      </p>

      {venue && (
        <p className="font-sans text-sm tracking-[0.15em] text-[#1B3A5C]/70 mb-1">
          {venue}
        </p>
      )}
      {!venue && (
        <p className="font-sans text-sm tracking-[0.15em] text-[#2C2C2C]/30 mb-1">
          (Địa điểm sẽ được cập nhật)
        </p>
      )}

      {address && (
        <p className="font-serif text-sm text-[#2C2C2C]/50 mb-5">{address}</p>
      )}

      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs tracking-[0.15em] text-[#1B3A5C]/60 border border-[#1B3A5C]/20 px-5 py-2 transition-all duration-300 hover:bg-[#1B3A5C] hover:text-white active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3A5C]"
        >
          <MapPin size={14} />
          Xem bản đồ
        </a>
      )}
    </div>
  );
}

export default function WeddingDetails() {
  const { ref, isInView } = useInView();
  const { ceremony, reception } = weddingConfig.events;

  return (
    <section className="py-20 px-6 bg-[#FFFEF9]" aria-label="Chi tiết đám cưới">
      <div className="max-w-md mx-auto">
        {/* Title */}
        <div
          ref={ref}
          className={`text-center mb-12 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2C2C] mb-3">
            The Wedding Day
          </h2>
          <p className="font-sans text-sm tracking-[0.2em] text-[#1B3A5C]/50">
            {weddingConfig.date.display}
          </p>
        </div>

        {/* Event blocks */}
        <div className="space-y-6">
          <EventBlock
            title={ceremony.title}
            time={ceremony.time}
            venue={ceremony.venue}
            address={ceremony.address}
            mapUrl={ceremony.mapUrl}
            delay={0}
          />
          <EventBlock
            title={reception.title}
            time={reception.time}
            venue={reception.venue}
            address={reception.address}
            mapUrl={reception.mapUrl}
            delay={150}
          />
        </div>
      </div>
    </section>
  );
}

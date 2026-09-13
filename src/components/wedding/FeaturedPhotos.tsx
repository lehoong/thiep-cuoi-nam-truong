import type { ReactNode } from "react";
import { useInView } from "../../hooks/useInView";
import { weddingConfig } from "../../config/wedding";

export default function FeaturedPhotos() {
  const photos = weddingConfig.media.featured;

  const rows: ReactNode[] = [];
  let i = 0;
  while (i < photos.length) {
    const pos = i % 4;
    if (pos === 0) {
      const idx = i;
      rows.push(
        <PhotoItem
          key={photos[idx]}
          src={photos[idx]}
          index={idx}
          aspectRatio="16/9"
        />,
      );
      i += 1;
    } else if (pos === 1) {
      const idx1 = i;
      const idx2 = i + 1 < photos.length ? i + 1 : null;
      rows.push(
        <div key={`grid-${idx1}`} className="grid grid-cols-2 gap-3">
          <PhotoItem src={photos[idx1]} index={idx1} aspectRatio="3/4" />
          {idx2 !== null && (
            <PhotoItem src={photos[idx2]} index={idx2} aspectRatio="3/4" />
          )}
        </div>,
      );
      i += idx2 !== null ? 2 : 1;
    } else if (pos === 2) {
      const idx = i;
      rows.push(
        <PhotoItem
          key={photos[idx]}
          src={photos[idx]}
          index={idx}
          aspectRatio="3/4"
        />,
      );
      i += 1;
    } else {
      const idx = i;
      rows.push(
        <PhotoItem
          key={photos[idx]}
          src={photos[idx]}
          index={idx}
          aspectRatio="4/3"
        />,
      );
      i += 1;
    }
  }

  return (
    <section className="py-20 px-6 bg-[#FDF8F0]" aria-label="Ảnh cưới">
      <div className="max-w-lg mx-auto">
        {/* Section title at the top */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#2C2C2C] mb-3">
            Khoảnh Khắc
          </h2>
          <div className="flex justify-center">
            <div className="w-10 h-px bg-[#C9B88C]/40" />
            <div className="w-1 h-1 rounded-full bg-[#C9B88C]/50 mx-2 -mt-px" />
            <div className="w-10 h-px bg-[#C9B88C]/40" />
          </div>
        </div>

        <div className="space-y-4">{rows}</div>
      </div>
    </section>
  );
}

function PhotoItem({
  src,
  index,
  aspectRatio,
}: {
  src: string;
  index: number;
  aspectRatio: string;
}) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      <img
        src={src}
        alt={`Ảnh cưới ${index + 1}`}
        loading="lazy"
        className="w-full h-auto rounded-[6px] object-cover"
        style={{ aspectRatio }}
      />
    </div>
  );
}

import { useState, useEffect } from "react";
import { weddingConfig } from "../../config/wedding";
import { useInView } from "../../hooks/useInView";

export default function CountdownTimer() {
  const { ref, isInView } = useInView();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingConfig.date.iso).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "NGÀY", value: timeLeft.days },
    { label: "GIỜ", value: timeLeft.hours },
    { label: "PHÚT", value: timeLeft.minutes },
    { label: "GIÂY", value: timeLeft.seconds },
  ];

  return (
    <section ref={ref} className="py-12 px-6 bg-[#FFFEF9] flex justify-center">
      <div
        className={`w-full max-w-md grid grid-cols-4 gap-2 sm:gap-4 transition-all duration-1000 ${
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {timeBlocks.map((block) => (
          <div
            key={block.label}
            className="flex flex-col items-center justify-center py-4 border border-[#1B3A5C]/10 bg-white shadow-sm"
          >
            <span className="font-serif text-2xl sm:text-3xl text-[#1B3A5C] mb-1">
              {block.value.toString().padStart(2, "0")}
            </span>
            <span className="font-sans text-[10px] sm:text-xs tracking-[0.2em] text-[#2C2C2C]/50 uppercase">
              {block.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

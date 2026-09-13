import { motion } from "framer-motion";

interface MusicControlProps {
  isPlaying: boolean;
  hasError: boolean;
  onToggle: () => void;
}

export default function MusicControl({
  isPlaying,
  hasError,
  onToggle,
}: MusicControlProps) {
  // Don't render if audio failed to load
  if (hasError) return null;

  return (
    <motion.button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm border border-[#1B3A5C]/10 shadow-sm flex items-center justify-center transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B3A5C]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
    >
      {isPlaying ? (
        <span className="flex items-end gap-[2px] h-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[3px] bg-[#1B3A5C] rounded-full"
              animate={{
                height: ["6px", "16px", "6px"],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </span>
      ) : (
        <span className="flex items-end gap-[2px] h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[3px] bg-[#1B3A5C]/40 rounded-full"
              style={{ height: `${8 + i * 3}px` }}
            />
          ))}
        </span>
      )}
    </motion.button>
  );
}

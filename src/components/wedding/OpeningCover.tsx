import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "../../config/wedding";

interface OpeningCoverProps {
  onOpen: () => void;
}

export default function OpeningCover({ onOpen }: OpeningCoverProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleOpen = () => {
    setIsClosing(true);
    // Delay calling onOpen so the exit animation plays
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#F4F1EA]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="relative w-full max-w-2xl bg-[#FFFEF9] h-full sm:h-auto sm:min-h-[80vh] flex flex-col items-center justify-center sm:my-12 sm:shadow-2xl sm:shadow-[#1B3A5C]/5">
            {/* Subtle decorative border */}
            <div className="absolute inset-4 sm:inset-8 border border-[#C9B88C]/30 pointer-events-none" />
            <div className="absolute inset-6 sm:inset-10 border border-[#C9B88C]/15 pointer-events-none" />

            <div className="text-center px-6 max-w-md w-full">
            {/* Top ornament */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="w-16 h-px bg-[#C9B88C]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9B88C]/50 mx-3 -mt-0.5" />
              <div className="w-16 h-px bg-[#C9B88C]/40" />
            </motion.div>

            {/* Wedding Invitation label */}
            <motion.p
              className="font-sans text-xs tracking-[0.35em] text-[#1B3A5C]/50 uppercase mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Wedding Invitation
            </motion.p>

            {/* Groom name */}
            <motion.h1
              className="font-serif text-4xl sm:text-5xl text-[#2C2C2C] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {weddingConfig.couple.groom.name}
            </motion.h1>

            {/* Ampersand */}
            <motion.p
              className="font-serif text-2xl sm:text-3xl text-[#C9B88C] my-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              &amp;
            </motion.p>

            {/* Bride name */}
            <motion.h1
              className="font-serif text-4xl sm:text-5xl text-[#2C2C2C] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              {weddingConfig.couple.bride.name}
            </motion.h1>

            {/* Date */}
            <motion.p
              className="font-sans text-sm tracking-[0.25em] text-[#1B3A5C]/60 mt-10 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {weddingConfig.date.display}
            </motion.p>

            {/* Open button */}
            <motion.button
              onClick={handleOpen}
              className="group relative px-10 py-3.5 border border-[#1B3A5C]/30 text-[#1B3A5C] font-sans text-sm tracking-[0.2em] transition-all duration-500 hover:bg-[#1B3A5C] hover:text-white hover:border-[#1B3A5C] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1B3A5C]"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              aria-label="Mở thiệp mời"
            >
              MỞ THIỆP
            </motion.button>

            {/* Bottom ornament */}
            <motion.div
              className="flex justify-center mt-12"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7, duration: 0.8 }}
            >
              <div className="w-16 h-px bg-[#C9B88C]/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9B88C]/50 mx-3 -mt-0.5" />
              <div className="w-16 h-px bg-[#C9B88C]/40" />
            </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

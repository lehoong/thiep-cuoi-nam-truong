import { useState } from "react";
import { motion } from "framer-motion";
import { weddingConfig } from "../../config/wedding";

interface OpeningCoverProps {
  onOpen: () => void;
}

const CornerOrnament = ({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const getPositionClass = () => {
    switch (position) {
      case "top-left": return "top-2 left-2 sm:top-5 sm:left-5 rotate-0";
      case "top-right": return "top-2 right-2 sm:top-5 sm:right-5 rotate-90";
      case "bottom-right": return "bottom-2 right-2 sm:bottom-5 sm:right-5 rotate-180";
      case "bottom-left": return "bottom-2 left-2 sm:bottom-5 sm:left-5 -rotate-90";
    }
  };

  return (
    <svg
      className={`absolute w-12 h-12 sm:w-16 sm:h-16 text-[#C9B88C]/50 pointer-events-none ${getPositionClass()}`}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M 0 0 L 0 50 C 0 20, 20 0, 50 0 L 0 0 Z" stroke="currentColor" strokeWidth="2" />
      <path d="M 12 12 L 12 40 C 12 25, 25 12, 40 12 L 12 12 Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="3" fill="currentColor" />
    </svg>
  );
};

export default function OpeningCover({ onOpen }: OpeningCoverProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  const handleOpen = () => {
    setIsClosing(true);
    // Wait for the full animation sequence to finish
    setTimeout(() => {
      setIsUnmounted(true);
      onOpen();
    }, 1200);
  };

  if (isUnmounted) return null;

  return (
    <>
      {/* Fullscreen Backdrop fading out */}
      <motion.div
        className="fixed inset-0 z-40 bg-[#F4F1EA]"
        animate={{ opacity: isClosing ? 0 : 1 }}
        transition={{ duration: 0.8, delay: isClosing ? 0.3 : 0, ease: "easeInOut" }}
      />
      
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-2xl h-full sm:h-auto sm:min-h-[80vh] flex flex-col items-center justify-center sm:my-12 pointer-events-auto">
          
          {/* LEFT DOOR */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-[#FFFEF9] overflow-hidden sm:shadow-2xl sm:shadow-[#1B3A5C]/10"
            initial={{ x: 0 }}
            animate={{ x: isClosing ? "-50vw" : 0, opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.1, 1], delay: isClosing ? 0.3 : 0 }}
          >
            {/* Left Borders */}
            <div className="absolute inset-4 sm:inset-8 -right-4 sm:-right-8 border border-[#C9B88C]/30 border-r-0 pointer-events-none" />
            <div className="absolute inset-6 sm:inset-10 -right-6 sm:-right-10 border border-[#C9B88C]/15 border-r-0 pointer-events-none" />
            
            {/* Left Ornaments */}
            <CornerOrnament position="top-left" />
            <CornerOrnament position="bottom-left" />
          </motion.div>

          {/* RIGHT DOOR */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#FFFEF9] overflow-hidden sm:shadow-2xl sm:shadow-[#1B3A5C]/10"
            initial={{ x: 0 }}
            animate={{ x: isClosing ? "50vw" : 0, opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.1, 1], delay: isClosing ? 0.3 : 0 }}
          >
            {/* Right Borders */}
            <div className="absolute inset-4 sm:inset-8 -left-4 sm:-left-8 border border-[#C9B88C]/30 border-l-0 pointer-events-none" />
            <div className="absolute inset-6 sm:inset-10 -left-6 sm:-left-10 border border-[#C9B88C]/15 border-l-0 pointer-events-none" />
            
            {/* Right Ornaments */}
            <CornerOrnament position="top-right" />
            <CornerOrnament position="bottom-right" />
          </motion.div>

          {/* CONTENT LAYER */}
          <motion.div 
            className="relative z-10 text-center px-6 max-w-md w-full flex flex-col items-center justify-center h-full"
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Top ornament */}
            <motion.div
              className="flex justify-center mb-10"
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
              className="font-sans text-xs tracking-[0.35em] text-[#1B3A5C]/50 uppercase mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Wedding Invitation
            </motion.p>

            {/* Groom name */}
            <motion.h1
              className="font-script text-6xl sm:text-7xl text-[#A68A56] leading-tight drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {weddingConfig.couple.groom.name}
            </motion.h1>

            {/* Ampersand */}
            <motion.p
              className="font-serif text-2xl sm:text-3xl text-[#1B3A5C]/60 my-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              &amp;
            </motion.p>

            {/* Bride name */}
            <motion.h1
              className="font-script text-6xl sm:text-7xl text-[#A68A56] leading-tight drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              {weddingConfig.couple.bride.name}
            </motion.h1>

            {/* Date */}
            <motion.p
              className="font-sans text-sm tracking-[0.25em] text-[#1B3A5C]/60 mt-12 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {weddingConfig.date.display}
            </motion.p>

            {/* Open button */}
            <motion.button
              onClick={handleOpen}
              disabled={isClosing}
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
          </motion.div>
        </div>
      </div>
    </>
  );
}

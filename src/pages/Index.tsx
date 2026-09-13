import { useState } from "react";
import { motion } from "framer-motion";
import { useAudio } from "../hooks/useAudio";
import { weddingConfig } from "../config/wedding";
import OpeningCover from "../components/wedding/OpeningCover";
import InvitationMessage from "../components/wedding/InvitationMessage";
import WeddingDetails from "../components/wedding/WeddingDetails";
import FeaturedPhotos from "../components/wedding/FeaturedPhotos";
import RSVPSection from "../components/wedding/RSVPSection";
import WeddingGift from "../components/wedding/WeddingGift";
import ClosingSection from "../components/wedding/ClosingSection";
import MusicControl from "../components/wedding/MusicControl";
import CountdownTimer from "../components/wedding/CountdownTimer";
import Divider from "../components/wedding/Divider";

export default function Index() {
  const [isOpened, setIsOpened] = useState(false);
  const audio = useAudio(weddingConfig.music.src);

  const handleOpen = () => {
    setIsOpened(true);
    audio.play();
  };

  return (
    <>
      {/* Opening Cover */}
      {!isOpened && <OpeningCover onOpen={handleOpen} />}

      {/* Main Wedding Content */}
      {isOpened && (
        <motion.main
          className="min-h-screen bg-[#FFFEF9] max-w-2xl mx-auto sm:my-12 sm:shadow-2xl sm:shadow-[#1B3A5C]/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {/* Hero */}
          <section className="relative h-[70vh] sm:h-[80vh] overflow-hidden">
            <img
              src={weddingConfig.media.hero}
              alt={`${weddingConfig.couple.groom.name} và ${weddingConfig.couple.bride.name}`}
              className="w-full h-full object-cover object-top"
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#FFFEF9]" />

            {/* Subtle name overlay */}
            <div className="absolute bottom-12 left-0 right-0 text-center px-6">
              <p className="font-serif text-3xl sm:text-4xl text-[#2C2C2C] drop-shadow-md">
                {weddingConfig.couple.groom.name}
                <span className="text-[#C9B88C] mx-3">&</span>
                {weddingConfig.couple.bride.name}
              </p>
            </div>
          </section>

          <InvitationMessage />
          <CountdownTimer />
          <Divider />
          <WeddingDetails />
          <Divider />
          <FeaturedPhotos />
          <Divider />
          <RSVPSection />
          <Divider />
          <WeddingGift />
          <ClosingSection />

          {/* Music floating control */}
          <MusicControl
            isPlaying={audio.isPlaying}
            hasError={audio.hasError}
            onToggle={audio.toggle}
          />
        </motion.main>
      )}
    </>
  );
}

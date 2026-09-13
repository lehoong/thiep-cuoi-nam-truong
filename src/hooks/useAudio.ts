import { useCallback, useEffect, useRef, useState } from "react";

interface UseAudioReturn {
  isPlaying: boolean;
  hasError: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
}

export function useAudio(src: string): UseAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.4;

    audio.addEventListener("error", () => {
      setHasError(true);
      setIsPlaying(false);
    });

    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [src]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || hasError) return;
    audio.play().catch(() => {
      setHasError(true);
    });
  }, [hasError]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  return { isPlaying, hasError, play, pause, toggle };
}

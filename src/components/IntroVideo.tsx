import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen, SkipForward } from 'lucide-react';

// Change this to your own intro clip (put the file in /public)
const INTRO_VIDEO_SRC = '/give_beautiful_live_video_202604291917.mp4';

interface IntroVideoProps {
  /** Called when the guest taps "View Invitation" (a user gesture — safe to start music here) */
  onStart?: () => void;
  /** Called when the intro video ends or is skipped */
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onStart, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const finish = () => {
    if (finished) return;
    setFinished(true);
    onComplete();
  };

  const handleStart = () => {
    setHasStarted(true);
    onStart?.();
    videoRef.current?.play().catch(err => {
      console.error('Video play failed:', err);
      setTimeout(finish, 800);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Landing screen with "View Invitation" button */}
      <AnimatePresence>
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-brand-ivory px-6"
          >
            {/* Couple photo watermark */}
            <div
              className="absolute inset-0 bg-[url('/2.jpg')] bg-cover bg-[position:50%_30%] opacity-[0.3] pointer-events-none"
              style={{ maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 90%)' }}
            />
            <div className="relative text-center flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-24 h-24 mb-8 rounded-full bg-white shadow-2xl flex items-center justify-center"
              >
                <MailOpen className="w-10 h-10 text-brand-primary" />
              </motion.div>
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="font-display text-4xl sm:text-6xl text-stone-800 mb-3"
              >
                Loshani <span className="italic text-brand-primary">&</span> Nuwan
              </motion.p>
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-serif italic text-stone-500 mb-10 tracking-wide"
              >
                19 . 09 . 2026
              </motion.p>
              <motion.button
                onClick={handleStart}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.35 }}
                className="px-10 py-4 bg-brand-primary text-white rounded-full font-sans text-sm tracking-[0.3em] uppercase hover:bg-brand-primary-deep transition-colors shadow-xl active:scale-95"
              >
                View Invitation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        playsInline
        muted
        preload="auto"
        onEnded={finish}
        onError={() => setTimeout(finish, 800)}
      >
        <source src={INTRO_VIDEO_SRC} type="video/mp4" />
      </video>

      {hasStarted && (
        <button
          onClick={finish}
          className="absolute bottom-8 right-8 z-40 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 backdrop-blur-md text-white/90 text-xs tracking-[0.25em] uppercase hover:bg-white/25 transition-colors"
        >
          Skip <SkipForward className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  );
};

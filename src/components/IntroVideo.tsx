import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MailOpen } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video play failed:", err);
        setTimeout(onComplete, 1000);
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex items-center justify-center overflow-hidden">
      <AnimatePresence>
        {!hasStarted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-brand-ivory cursor-pointer"
            onClick={handleStart}
          >
            <div className="text-center flex flex-col items-center group">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-24 h-24 mb-6 rounded-full bg-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
              >
                <MailOpen className="w-10 h-10 text-brand-primary" />
              </motion.div>
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="px-10 py-4 bg-brand-primary text-white rounded-full font-sans text-sm tracking-[0.3em] uppercase hover:bg-brand-primary-light transition-colors shadow-xl drop-shadow-md"
              >
                Open Invitation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key="video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="relative w-full h-full bg-black"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          playsInline
          muted
          preload="auto"
          onEnded={onComplete}
          onError={(e) => {
            console.error("Video error event:", e);
            setTimeout(onComplete, 1000);
          }}
        >
          <source src="/openning.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlays removed to show true colors */}
        <div className="absolute inset-0 pointer-events-none bg-transparent" />
      </motion.div>

      {/* Cinematic Background Elements - Opacity heavily reduced to show colors */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

    </div>
  );
};


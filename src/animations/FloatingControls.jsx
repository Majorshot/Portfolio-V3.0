import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MediaPlayer } from './MediaPlayer';

export const FloatingControls = ({ toggleMusicLive, toggleTheme, musicPlaying, theme, introFinished, audioRef, currentTrack, nextTrack, prevTrack }) => {
  const [showPlayer, setShowPlayer] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowPlayer(false);
      }
    };
    if (showPlayer) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPlayer]);

  return (
    <div className={`flex gap-3 md:gap-4 transition-opacity duration-1000 relative ${introFinished ? 'opacity-100' : 'opacity-0'}`} ref={containerRef}>
      
      <button 
        onClick={() => setShowPlayer(!showPlayer)} 
        className="cursor-target w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform shadow-lg overflow-hidden"
      >
        {currentTrack?.cover ? (
          <div className={`w-full h-full transition-transform duration-500 rounded-full ${musicPlaying ? 'scale-110' : 'scale-100 grayscale-[0.8]'}`}>
            <img 
              src={currentTrack.cover} 
              alt="Track" 
              className="w-full h-full object-cover rounded-full animate-spin" 
              style={{ animationDuration: '4s', animationPlayState: musicPlaying ? 'running' : 'paused' }}
            />
          </div>
        ) : (
          musicPlaying ? <Volume2 className="w-4 h-4 text-zinc-900 dark:text-zinc-50" /> : <VolumeX className="w-4 h-4 text-zinc-900 dark:text-zinc-50" />
        )}
      </button>

      <AnimatePresence>
        {showPlayer && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-14 right-0 z-[100]"
          >
            <MediaPlayer 
              audioRef={audioRef}
              currentTrack={currentTrack}
              isPlaying={musicPlaying}
              togglePlay={toggleMusicLive}
              nextTrack={nextTrack}
              prevTrack={prevTrack}
              theme={theme}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button onClick={toggleTheme} className="cursor-target w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
        {theme === 'dark' ? <Moon className="w-4 h-4 text-zinc-50" /> : <Sun className="w-4 h-4 text-zinc-900" />}
      </button>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';

export const MediaPlayer = ({
  audioRef,
  currentTrack,
  isPlaying,
  togglePlay,
  nextTrack,
  prevTrack
}) => {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    // Trigger immediately in case metadata is already loaded before listener attaches
    if (audio.readyState >= 1) {
      updateProgress();
    }

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateProgress);
    };
  }, [audioRef, currentTrack]);

  const handleSeek = (e) => {
    const audio = audioRef?.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    // eslint-disable-next-line
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const calculateProgressPercent = () => {
    if (!duration) return 0;
    return (progress / duration) * 100;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95, backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)" }}
      exit={{ opacity: 0, y: 15, scale: 0.95, backdropFilter: "blur(0px)", WebkitBackdropFilter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="w-72 sm:w-80 rounded-[2.5rem] overflow-hidden bg-zinc-800/80 md:bg-zinc-900/60 border border-white/10 shadow-2xl p-5 flex flex-col gap-5 relative z-50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Album Art */}
      <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden shadow-lg border border-white/5 bg-zinc-800">
        {currentTrack?.cover ? (
          <motion.img 
            key={currentTrack.src}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className={`w-full h-full object-cover transition-transform duration-[10s] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`} 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800">
            <Music className="w-12 h-12 text-zinc-600" />
          </div>
        )}
      </div>

      {/* Track Info */}
      <div className="flex flex-col items-center text-center px-2">
        <motion.h3 
          key={`title-${currentTrack?.title}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-extrabold text-xl tracking-tight truncate w-full"
        >
          {currentTrack?.title || 'Unknown Track'}
        </motion.h3>
        <motion.p 
          key={`artist-${currentTrack?.artist}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-zinc-400 text-sm font-medium tracking-wide truncate w-full mt-1"
        >
          {currentTrack?.artist || 'Unknown Artist'}
        </motion.p>
      </div>

      {/* Seeker */}
      <div className="w-full flex flex-col gap-1.5 px-2 relative group">
        <div className="relative h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
           <div 
             className="absolute top-0 left-0 h-full bg-white transition-all duration-100 rounded-full" 
             style={{ width: `${calculateProgressPercent()}%` }}
           />
        </div>
        <input 
          type="range" 
          min={0} 
          max={duration || 100} 
          value={progress} 
          onChange={handleSeek}
          className="absolute top-0 left-2 right-2 h-1.5 opacity-0 cursor-target w-[calc(100%-1rem)]"
        />
        <div className="flex justify-between text-[11px] text-zinc-500 font-mono font-medium mt-1">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-7 pb-2">
        <button 
          onClick={prevTrack} 
          className="text-zinc-400 hover:text-white transition-colors cursor-target focus:outline-none hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <SkipBack className="w-6 h-6 fill-current" />
        </button>
        <button 
          onClick={togglePlay} 
          className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] cursor-target focus:outline-none"
        >
          {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
        </button>
        <button 
          onClick={nextTrack} 
          className="text-zinc-400 hover:text-white transition-colors cursor-target focus:outline-none hover:scale-110 active:scale-95 flex items-center justify-center"
        >
          <SkipForward className="w-6 h-6 fill-current" />
        </button>
      </div>
    </motion.div>
  );
};

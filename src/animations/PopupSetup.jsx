import React from 'react';
import { Moon, Sun, ArrowRight } from 'lucide-react';
import { MediaPlayer } from './MediaPlayer';

export const PopupSetup = ({ theme, setTheme, musicPlaying, toggleMusicPreference, startPortfolio, audioRef, currentTrack, nextTrack, prevTrack }) => {
  return (
    <div className="fixed inset-0 z-[90] bg-zinc-100/80 dark:bg-zinc-950/80 backdrop-blur-xl flex items-center justify-center p-4 transition-colors duration-700">
      
      {/* UPDATE 1: Changed `p-8` to `p-5 sm:p-8` and added `max-h-[95vh] overflow-y-auto flex flex-col` for safe scrolling on tiny screens */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 sm:p-8 rounded-2xl max-w-md w-full shadow-2xl transform transition-all animate-in fade-in zoom-in duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] relative overflow-hidden max-h-[95vh] overflow-y-auto flex flex-col">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 dark:bg-white/5 blur-[80px] rounded-full pointer-events-none transition-colors duration-700" />
        
        {/* UPDATE 2: Scaled heading to `text-2xl sm:text-3xl` and `mb-1 sm:mb-2` */}
        <h2 className="text-2xl sm:text-3xl font-black tracking-tighter mb-1 sm:mb-2 text-zinc-900 dark:text-white transition-colors duration-700 flex-shrink-0">
          SYSTEM SETUP
        </h2>
        
        {/* UPDATE 3: Reduced subtitle bottom margin `mb-5 sm:mb-8` */}
        <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mb-5 sm:mb-8 font-mono tracking-wide transition-colors duration-700 flex-shrink-0">
          Configure your viewing experience.
        </p>
        
        {/* UPDATE 4: Reduced spacing between items `space-y-3 sm:space-y-4 mb-5 sm:mb-8` */}
        <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-8 flex-shrink-0">
          
          {/* UPDATE 5: Reduced padding inside the theme box `p-3 sm:p-4` */}
          <div className="flex items-center justify-between p-3 sm:p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 transition-colors duration-700">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-zinc-400" /> : <Sun className="w-5 h-5 text-zinc-500" />}
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 transition-colors duration-700">Appearance</span>
            </div>
            <div className="flex bg-zinc-200 dark:bg-zinc-900 rounded-lg p-1 transition-colors duration-700">
              <button 
                onClick={() => setTheme('light')} 
                className={`cursor-target px-3 py-1.5 rounded-md text-xs font-medium transition-all ${theme === 'light' ? 'bg-white text-black shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              >
                Light
              </button>
              <button 
                onClick={() => setTheme('dark')} 
                className={`cursor-target px-3 py-1.5 rounded-md text-xs font-medium transition-all ${theme === 'dark' ? 'bg-zinc-700 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
              >
                Dark
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-1 sm:p-2 rounded-xl">
            <MediaPlayer 
              audioRef={audioRef}
              currentTrack={currentTrack}
              isPlaying={musicPlaying}
              togglePlay={toggleMusicPreference}
              nextTrack={nextTrack}
              prevTrack={prevTrack}
              theme={theme}
            />
          </div>
        </div>

        {/* UPDATE 6: Reduced button height on mobile `py-3 sm:py-4` and pushed to bottom `mt-auto` */}
        <button onClick={startPortfolio} className="cursor-target w-full py-3 sm:py-4 bg-zinc-900 dark:bg-white text-white dark:text-black font-black tracking-widest uppercase text-sm rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group mt-auto flex-shrink-0">
          Enter Portfolio
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
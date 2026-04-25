import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import { LoadingScreen } from './animations/LoadingScreen';
import { PopupSetup } from './animations/PopupSetup'; // Extract Popup setup to a component
import { FloatingControls } from './animations/FloatingControls'; // Extract volume/theme toggles
import { Hero } from './components/Hero';
import { Marquee } from './animations/Marquee';
import { About } from './components/About';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import TargetCursor from './animations/TargetCursor';
import { StaggeredMenu } from './animations/StaggeredMenu';
import { Projects } from './components/Projects';
import { Photography } from './components/Photography';
import { Contact } from './components/Contact';

// Define your video links
import introVideoUrl from './assets/videos/intro.webm';
import backgroundVideoUrl from './assets/videos/background.webm';
import audioTravis from './assets/Audio/STARGAZING - Travis Scott.opus';
import audioKendrick from './assets/Audio/DNA. - Kendrick Lamar.opus';
import audioCarti from './assets/Audio/TOXIC - Playboi Carti.opus';

import coverTravis from './assets/Travis Scott.jpg';
import coverKendrick from './assets/Kendrick Lamar.jpg';
import coverCarti from './assets/Playboi Carti.jpg';

const INTRO_VIDEO_URL = introVideoUrl;
const BACKGROUND_VIDEO_URL = backgroundVideoUrl;
export const PLAYLIST = [
  {
    title: 'TOXIC',
    artist: 'Playboi Carti',
    src: audioCarti,
    cover: coverCarti
  },
  {
    title: 'DNA.',
    artist: 'Kendrick Lamar',
    src: audioKendrick,
    cover: coverKendrick
  },
  {
    title: 'STARGAZING',
    artist: 'Travis Scott',
    src: audioTravis,
    cover: coverTravis
  }
];

export default function App() {
  const [appState, setAppState] = useState('loading'); 
  const [introFinished, setIntroFinished] = useState(false); 
  const [theme, setTheme] = useState('dark');
  const [musicPlaying, setMusicPlaying] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = PLAYLIST[currentTrackIndex];
  
  const audioRef = useRef(null);
  const introVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const heroTextRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const reqAnimFrameRef = useRef(null);

  const setupWebAudio = () => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);
      
      const updateAudioData = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        const bass = dataArray.slice(0, 5).reduce((a, b) => a + b) / 5;
        const treble = dataArray.slice(30, 60).reduce((a, b) => a + b) / 30;

        const heroEl = document.querySelector('.audio-reactive-hero');
        if (heroEl) {
          heroEl.style.setProperty('--bass-hit', (bass / 255).toFixed(3));
          heroEl.style.setProperty('--treble-hit', (treble / 255).toFixed(3));
        }

        reqAnimFrameRef.current = requestAnimationFrame(updateAudioData);
      };
      updateAudioData();
    }
    if (audioContextRef.current?.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  // Simulate Loader — premium pacing
  useEffect(() => {
    if (appState !== 'loading') return;

    let progress = 0;
    const tick = () => {
      // Fast at start, decelerates near 90, then jumps to 100
      const remaining = 100 - progress;
      const increment = remaining > 20
        ? Math.floor(Math.random() * 6) + 3   // fast phase
        : Math.floor(Math.random() * 2) + 1;  // slow suspense phase
      progress = Math.min(progress + increment, 100);
      setLoadingProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // 1.6s gives the panel-split exit time to fully complete
        setTimeout(() => setAppState('popup'), 1600);
      }
    };

    const interval = setInterval(tick, 180);
    return () => clearInterval(interval);
  }, [appState]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleMusicPreference = () => setMusicPlaying(!musicPlaying);
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
  };
  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  useEffect(() => {
    if (appState !== 'ready') return;
    if (musicPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Blocked by browser", e));
    }
  }, [currentTrackIndex, appState, musicPlaying]);
  const toggleMusicLive = () => {
    const willPlay = !musicPlaying;
    setMusicPlaying(willPlay);
    if (audioRef.current) {
      if (willPlay) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(e => console.log("Blocked by browser", e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  const startPortfolio = () => {
    setAppState('ready');
    setupWebAudio();
    if (musicPlaying && audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(e => console.log("Blocked by browser", e));
    }
  };

  const handleIntroEnded = () => {
    if (bgVideoRef.current) bgVideoRef.current.play();
    setIntroFinished(true);
  };

  const handleSkipIntro = () => {
    setIntroFinished(true);
    if(introVideoRef.current) introVideoRef.current.pause();
    if(bgVideoRef.current) bgVideoRef.current.play();
  };

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothTouch: false }}>
      <div className={theme}>
      <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn={false} hoverDuration={0.2} />
      <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 min-h-screen w-full transition-colors duration-700 font-sans relative selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 overflow-x-clip">
        
        <div className="noise-bg opacity-[0.03]" />
        <div className="scanlines opacity-[0.08]" />

        <audio ref={audioRef} crossOrigin="anonymous" onEnded={nextTrack} src={currentTrack.src} />

        <AnimatePresence>
          {appState === 'loading' && (
            <LoadingScreen loadingProgress={loadingProgress} />
          )}
        </AnimatePresence>
        
        {/* Render Popup, Hero, About, etc. below by passing down the states as props! */}
        {appState === 'popup' && (
          <PopupSetup 
            theme={theme} 
            setTheme={setTheme} 
            musicPlaying={musicPlaying} 
            toggleMusicPreference={toggleMusicPreference} 
            startPortfolio={startPortfolio} 
            audioRef={audioRef}
            currentTrack={currentTrack}
            nextTrack={nextTrack}
            prevTrack={prevTrack}
          />
        )}

        {appState === 'ready' && (
          <>
            <StaggeredMenu
              position="right"
              isFixed={true}
              items={[
                { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
                { label: 'About', ariaLabel: 'Who I am', link: '#about' },
                { label: 'Services', ariaLabel: 'What I do', link: '#services' },
                { label: 'Experience', ariaLabel: 'My timeline', link: '#experience' },
                { label: 'Projects', ariaLabel: 'My work', link: '#projects' },
                { label: 'Photography', ariaLabel: 'My lens archive', link: '#photography' },
                { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
              ]}
              socialItems={[
                { label: 'GitHub', link: 'https://github.com/Majorshot' },
                { label: 'LinkedIn', link: 'https://www.linkedin.com/in/midhunmohan-dev/' },
                { label: 'Instagram', link: 'https://www.instagram.com/perilla_paiyen/' }
              ]}
              displaySocials
              displayItemNumbering={true}
              menuButtonColor={theme === 'light' ? '#18181b' : '#ffffff'}
              openMenuButtonColor="#ffffff"
              changeMenuColorOnOpen={true}
              colors={['#18181b', '#27272a']}
              accentColor="#f97316"
              theme={theme}
              headerControls={
                <FloatingControls 
                  toggleMusicLive={toggleMusicLive} 
                  toggleTheme={toggleTheme} 
                  theme={theme} 
                  musicPlaying={musicPlaying} 
                  introFinished={introFinished} 
                  audioRef={audioRef}
                  currentTrack={currentTrack}
                  nextTrack={nextTrack}
                  prevTrack={prevTrack}
                />
              }
            />
            <Hero 
              introFinished={introFinished} 
              theme={theme} 
              introVideoRef={introVideoRef} 
              bgVideoRef={bgVideoRef} 
              heroTextRef={heroTextRef} 
              handleIntroEnded={handleIntroEnded} 
              handleSkipIntro={handleSkipIntro}
              introVideoUrl={INTRO_VIDEO_URL}
              bgVideoUrl={BACKGROUND_VIDEO_URL}
            />

            {introFinished && (
              <>
                <Marquee theme={theme} />
                <About theme={theme} />
                
                {/* Divider: About → Services */}
                <div className="section-divider relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-100/50 dark:via-zinc-950/50 to-zinc-100 dark:to-zinc-950" />
                </div>
                
                <Services />
                
                {/* Divider: Services → Experience */}
                <div className="section-divider relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 dark:from-zinc-950 via-zinc-100/50 dark:via-zinc-950/50 to-transparent" />
                </div>
                
                <Experience />
                
                {/* Divider: Experience → Projects */}
                <div className="section-divider relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-100/50 dark:via-zinc-950/50 to-zinc-100 dark:to-zinc-950" />
                </div>
                
                <Projects />
                
                {/* Divider: Projects → Photography */}
                <div className="section-divider relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-zinc-100 dark:from-zinc-950 via-zinc-100/50 dark:via-zinc-950/50 to-transparent" />
                </div>
                
                <Photography />
                
                {/* Divider: Photography → Contact */}
                <div className="section-divider relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-100/50 dark:via-zinc-950/50 to-zinc-100 dark:to-zinc-950" />
                </div>
                
                <Contact />



                <Footer />
              </>
            )}
          </>
        )}
      </div>
    </div>
    </ReactLenis>
  );
}

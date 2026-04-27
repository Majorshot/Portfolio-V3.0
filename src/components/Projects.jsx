import {
  // eslint-disable-next-line no-unused-vars
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import { FiArrowRight } from "react-icons/fi";
import React, { useRef } from "react";
import presciptoImg from "../assets/prescipto.png";
import pappaspizzaImg from "../assets/pappaspizza.png";
import gorentalImg from "../assets/gorental.png";
import ashbourneImg from "../assets/ashbourne.png";
import nexusImg from "../assets/nexus.png";
import garlandImg from "../assets/Garland.png";

export const Projects = () => {
  return (
    <div id="projects" className="bg-zinc-100 dark:bg-zinc-950 relative z-20">
      <SmoothScrollHero />
      <HoverImageLinks />
    </div>
  );
};

export const SmoothScrollHero = () => {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-950 relative">
        <Hero />
    </div>
  );
};

const SECTION_HEIGHT = 1500;

const Hero = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage scrollYProgress={scrollYProgress} />

      <ParallaxImages />

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-100/0 dark:from-zinc-950/0 to-zinc-100 dark:to-zinc-950" />
    </div>
  );
};

const CenterImage = ({ scrollYProgress }) => {
  // Using pure GPU scale transforms to mimic the clip-path and background-size animations!
  const containerScale = useTransform(scrollYProgress, [0, 0.75], [0.5, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 0.75, 1], [3.4, 1.175, 1]);
  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      <motion.div
        className="w-full h-full origin-center overflow-hidden"
        style={{
          scale: containerScale,
          willChange: "transform",
        }}
      >
        <motion.div
          className="w-full h-full origin-center"
          style={{
            scale: imageScale,
            backgroundImage: `url(${gorentalImg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            willChange: "transform",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxImg
        src={pappaspizzaImg}
        alt="Centurion Staunch Ashbourne"
        start={-200}
        end={200}
        className="w-1/3"
      />
      <ParallaxImg
        src={ashbourneImg}
        alt="Centurion Staunch Nexus"
        start={200}
        end={-250}
        className="mx-auto w-2/3"
      />
      <ParallaxImg
        src={presciptoImg}
        alt="Garland Lodge"
        start={-200}
        end={200}
        className="ml-auto w-1/3"
      />
      <ParallaxImg
        src={nexusImg}
        alt="GoRental Platform"
        start={0}
        end={-500}
        className="ml-24 w-5/12"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);

  return (
    <div ref={ref} className={className}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover"
        style={{ y, scale, opacity, willChange: "transform" }}
      />
    </div>
  );
};



export const HoverImageLinks = () => {
  return (
    <section className="bg-zinc-100 dark:bg-neutral-950 p-4 md:p-8 pb-32">
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 border-b border-zinc-300 dark:border-neutral-800 pb-12">
          <motion.h2
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="text-4xl md:text-7xl font-black uppercase text-zinc-900 dark:text-zinc-50 tracking-tighter"
          >
            Project Showcase
          </motion.h2>
          <motion.div
             initial={{ y: 48, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             transition={{ ease: "easeInOut", duration: 0.75, delay: 0.15 }}
             className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16"
          >
             <p className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
               I don't just write code; I architect entire digital identities. Each project in this showcase is a visceral experience, fusing <span className="text-orange-500 italic">MERN stack engineering</span> and <span className="text-orange-500 italic">custom WordPress development</span> with pixel-perfect design and dynamic motion.
             </p>
             <p className="text-lg md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
               From high-performance web applications to scalable CMS architectures, I treat every project as a cohesive ecosystem that feels alive, high-performance, and meticulously crafted for the modern web.
             </p>
          </motion.div>
        </div>
        <Link
          heading="Precripto"
          subheading="Doctors appointment app"
          imgSrc={presciptoImg}
          href="https://prescipto-qbg7.onrender.com/"
        />
        <Link
          heading="PappasPizza"
          subheading="Craving? order some pizzzzaaa"
          imgSrc={pappaspizzaImg}
          href="https://pappaspizza.netlify.app/"
        />
        <Link
          heading="GoRental"
          subheading="Car rental made easy"
          imgSrc={gorentalImg}
          href="https://gorentalcom.netlify.app/"
        />
        <Link
          heading="Centurion Staunch Nexus"
          subheading="Event Management & Award Platform"
          imgSrc={nexusImg}
          href="https://centurionstaunchnexus.co.uk/"
        />
        <Link
          heading="Centurion Staunch Ashbourne"
          subheading="Physiotherapy & Mental Health Care"
          imgSrc={ashbourneImg}
          href="https://centurionstaunchashbourne.co.uk/"
        />
        <Link
          heading="Garland Lodge"
          subheading="Residential Care Home"
          imgSrc={garlandImg}
          href="https://garlandlodge.org/"
        />
      </div>
    </section>
  );
};

const Link = ({ heading, imgSrc, subheading, href }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Map spring values to pixel offsets combined with the -50% centering
  const translateX = useTransform(mouseXSpring, [0.5, -0.5], ["calc(-50% - 40px)", "calc(-50% + 40px)"]);
  const translateY = useTransform(mouseYSpring, [0.5, -0.5], ["calc(-50% - 40px)", "calc(-50% + 40px)"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      ref={ref}
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b-2 border-zinc-300 dark:border-neutral-700 py-4 transition-colors duration-500 hover:border-zinc-900 dark:hover:border-neutral-50 md:py-8 overflow-visible"
    >
      <div>
        <motion.span
          variants={{
            initial: { x: 0 },
            whileHover: { x: -16 },
          }}
          transition={{
            type: "spring",
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="relative z-10 block text-2xl sm:text-3xl font-bold text-zinc-400 dark:text-neutral-500 transition-colors duration-500 group-hover:text-zinc-900 dark:group-hover:text-neutral-50 md:text-6xl leading-[1.1] md:leading-tight"
        >
          {heading.split(" ").map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.2em] last:mr-0">
              {word.split("").map((l, i) => (
                <motion.span
                  variants={{
                    initial: { x: 0 },
                    whileHover: { x: 16 },
                  }}
                  transition={{ type: "spring" }}
                  className="inline-block"
                  key={i}
                >
                  {l}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.span>
        <span className="relative z-10 mt-2 block text-sm md:text-base text-zinc-400 dark:text-neutral-500 transition-colors duration-500 group-hover:text-zinc-900 dark:group-hover:text-neutral-50 uppercase tracking-wider font-mono">
          {subheading}
        </span>
      </div>

      <motion.img
        style={{
          top: "50%",
          left: "50%",
          x: translateX,
          y: translateY,
          willChange: "transform",
        }}
        variants={{
          initial: { scale: 0, rotate: "-12.5deg", opacity: 0 },
          whileHover: { scale: 1, rotate: "12.5deg", opacity: 1 },
        }}
        transition={{ type: "spring" }}
        src={imgSrc}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64 pointer-events-none"
        alt={`Image representing a link for ${heading}`}
      />

      <motion.div
        variants={{
          initial: {
            x: "25%",
            opacity: 0,
          },
          whileHover: {
            x: "0%",
            opacity: 1,
          },
        }}
        transition={{ type: "spring" }}
        className="relative z-10 p-4"
      >
        <FiArrowRight className="text-5xl text-zinc-900 dark:text-neutral-50" />
      </motion.div>
    </motion.a>
  );
};

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Stepper, { Step } from '../animations/Stepper';

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step) => {
    setError("");
    if (step === 1 && !name.trim()) {
      setError("ERROR: NAME REQUIRED FOR AUTHENTICATION.");
      return false;
    }
    if (step === 2 && (!email.trim() || !email.includes("@"))) {
      setError("ERROR: VALID EMAIL REQUIRED FOR COMMS LINK.");
      return false;
    }
    if (step === 3 && !message.trim()) {
      setError("ERROR: PAYLOAD DATA CANNOT BE EMPTY.");
      return false;
    }
    return true;
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    setResult("INITIATING TRANSMISSION...");
    
    const formData = new FormData();
    formData.append("access_key", "079d0be6-c0b0-4d88-bb65-94dd22d1e7a0");
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setResult("TRANSMISSION SUCCESSFUL. I WILL BE IN TOUCH.");
      } else {
        setResult("ERROR: TRANSMISSION FAILED.");
      }
    } catch (error) {
      setResult("CRITICAL ERROR. PLEASE TRY AGAIN.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-zinc-100 dark:bg-zinc-950 py-16 md:py-48 relative z-20 border-t border-zinc-300 dark:border-zinc-900">
      <div className="w-full px-6 md:px-12 lg:px-24">
        
        {/* Full Width Heading */}
        <motion.h2 
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="text-4xl md:text-7xl lg:text-[5rem] xl:text-[6.5rem] font-black uppercase tracking-tighter text-zinc-900 dark:text-white leading-none mb-10 lg:mb-24 text-left"
        >
          INITIATE<br/><span className="text-zinc-400 dark:text-zinc-600">//</span> CONTACT
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Left Column: Details */}
          <div className="flex flex-col justify-start lg:col-span-6">

            <motion.div 
              initial={{ y: 48, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
              className="space-y-6 md:space-y-8 font-mono text-base md:text-xl text-zinc-500 dark:text-zinc-400"
            >
              <div className="group flex flex-col">
                <span className="text-xs text-orange-500 uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:midhunmohankzhyw@gmail.com" className="text-zinc-900 dark:text-white hover:text-orange-500 transition-colors">midhunmohankzhyw@gmail.com</a>
              </div>
              
              <div className="group flex flex-col">
                <span className="text-xs text-orange-500 uppercase tracking-widest mb-1">Mobile</span>
                <a href="tel:+919995855774" className="text-zinc-900 dark:text-white hover:text-orange-500 transition-colors">+91 999 58 55 774</a>
              </div>

              <div className="pt-8 border-t border-zinc-300 dark:border-zinc-900 flex flex-col space-y-4">
                <span className="text-xs text-orange-500 uppercase tracking-widest text-left">Network</span>
                <a href="https://github.com/Majorshot" target="_blank" rel="noreferrer" className="text-zinc-900 dark:text-white hover:text-orange-500 transition-colors flex items-center group text-left">
                  <span className="w-24 md:w-32 inline-block">GitHub</span> 
                  <span className="text-zinc-400 dark:text-zinc-700 group-hover:text-orange-500 transition-colors">Majorshot</span>
                </a>
                <a href="https://www.linkedin.com/in/midhunmohan-dev/" target="_blank" rel="noreferrer" className="text-zinc-900 dark:text-white hover:text-orange-500 transition-colors flex items-center group text-left">
                  <span className="w-24 md:w-32 inline-block">LinkedIn</span> 
                  <span className="text-zinc-400 dark:text-zinc-700 group-hover:text-orange-500 transition-colors">Midhun Mohan</span>
                </a>
                <a href="https://www.instagram.com/perilla_paiyen/" target="_blank" rel="noreferrer" className="text-zinc-900 dark:text-white hover:text-orange-500 transition-colors flex items-center group text-left">
                  <span className="w-24 md:w-32 inline-block">Instagram</span> 
                  <span className="text-zinc-400 dark:text-zinc-700 group-hover:text-orange-500 transition-colors">@perilla_paiyen</span>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Stepper */}
          <div className="flex flex-col justify-start lg:col-span-5 lg:col-start-8">
            {result ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full min-h-[400px] border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center p-8 text-center rounded-xl"
              >
                <h3 className="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 uppercase tracking-tighter">System Status</h3>
                <p className={`font-mono text-sm tracking-widest uppercase ${result.includes("SUCCESSFUL") ? "text-green-500" : "text-orange-500"}`}>{result}</p>
                {isSubmitting && (
                   <div className="mt-12 w-32 h-1 bg-zinc-300 dark:bg-zinc-800 overflow-hidden relative rounded-full">
                      <motion.div 
                        className="absolute top-0 left-0 bottom-0 bg-orange-500 w-full origin-left"
                        animate={{ scaleX: [0, 1, 0], x: ["-100%", "0%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                   </div>
                )}
                {!isSubmitting && (
                   <button 
                     onClick={() => setResult("")}
                     className="cursor-target mt-12 border border-zinc-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-500 dark:hover:border-zinc-600 px-6 py-2 font-mono text-xs tracking-widest uppercase transition-colors"
                   >
                     Reset Comms
                   </button>
                )}
              </motion.div>
            ) : (
              <div className="w-full">
                <Stepper
                  initialStep={1}
                  onValidateStep={validateStep}
                  onFinalStepCompleted={onSubmit}
                  backButtonText="BACK"
                  nextButtonText="NEXT"
                >
                <Step>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter mb-2">Identify Yourself</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6">Step 01 // Authentication</p>
                  <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="ENTER YOUR FULL NAME"
                    className="w-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 py-4 font-mono uppercase tracking-wider focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                  />
                </Step>
                <Step>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter mb-2">Comms Link</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6">Step 02 // Routing Protocol</p>
                  <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    type="email"
                    className="w-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 py-4 font-mono uppercase tracking-wider focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700"
                  />
                </Step>
                <Step>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter mb-2">Transmission</h3>
                  <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-6">Step 03 // Payload Data</p>
                  <textarea 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="ENTER YOUR MESSAGE HERE..."
                    rows={4}
                    className="w-full bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-white px-6 py-4 font-mono tracking-wider focus:outline-none focus:border-orange-500 transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-700 resize-none"
                  />
                </Step>
                <Step>
                  <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter mb-2">Verify Data</h3>
                  <p className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-6">Step 04 // Final Confirmation</p>
                  
                  <div className="bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 p-6 space-y-4">
                     <div>
                       <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Target Name</span>
                       <span className="text-zinc-900 dark:text-white font-mono">{name || "[NO DATA]"}</span>
                     </div>
                     <div>
                       <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Target Email</span>
                       <span className="text-zinc-900 dark:text-white font-mono">{email || "[NO DATA]"}</span>
                     </div>
                     <div>
                       <span className="block text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">Payload</span>
                       <p className="text-zinc-600 dark:text-zinc-300 font-mono text-sm leading-relaxed mt-1 break-words">{message || "[NO DATA]"}</p>
                     </div>
                  </div>
                </Step>
              </Stepper>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 border border-red-900/50 bg-red-950/20 text-red-500 font-mono text-xs tracking-widest uppercase text-center"
                >
                  {error}
                </motion.div>
              )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState, Children, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'BACK',
  nextButtonText = 'CONTINUE',
  disableStepIndicators = false,
  renderStepIndicator,
  onValidateStep,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  const updateStep = newStep => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) onFinalStepCompleted();
    else onStepChange(newStep);
  };

  const handleBack = (e) => {
    e.preventDefault();
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (onValidateStep) {
      const isValid = await onValidateStep(currentStep);
      if (!isValid) return;
    }
    
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center" {...rest}>
      <div className={`w-full bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 ${stepCircleContainerClassName}`}>
        <div className={`${stepContainerClassName} flex w-full items-center p-6 md:p-8 border-b border-zinc-300/50 dark:border-zinc-800/50`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={async clicked => {
                      // Allow going backward anytime
                      if (clicked < currentStep) {
                        setDirection(-1);
                        updateStep(clicked);
                      } 
                      // Allow clicking the very next step, but enforce validation
                      else if (clicked === currentStep + 1) {
                        if (onValidateStep) {
                          const isValid = await onValidateStep(currentStep);
                          if (!isValid) return;
                        }
                        setDirection(1);
                        updateStep(clicked);
                      }
                      // Ignore clicks that are 2+ steps ahead
                    }}
                  />
                )}
                {isNotLastStep && <StepConnector isComplete={currentStep > stepNumber} />}
              </React.Fragment>
            );
          })}
        </div>
        
        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`${contentClassName}`}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`px-6 md:px-12 pb-6 md:pb-12 ${footerClassName}`}>
            <div className={`flex items-center ${currentStep !== 1 ? 'justify-between' : 'justify-end'}`}>
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`cursor-target duration-300 font-mono text-xs md:text-sm tracking-widest uppercase transition ${
                    currentStep === 1
                      ? 'pointer-events-none opacity-50 text-zinc-600'
                      : 'text-zinc-400 hover:text-orange-500'
                  }`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={handleNext}
                className="cursor-target duration-300 flex items-center justify-center bg-orange-500 py-2.5 md:py-3 px-6 md:px-8 font-bold tracking-widest text-black uppercase transition hover:bg-orange-600 active:bg-orange-700 text-sm md:text-base"
                {...nextButtonProps}
              >
                {isLastStep ? 'SUBMIT' : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className }) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={className}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={h => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="w-full px-6 md:px-12 py-6 md:py-12"
      style={{ position: 'absolute', left: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

const stepVariants = {
  enter: dir => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: dir => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0
  })
};

export function Step({ children }) {
  return <div className="w-full">{children}</div>;
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`cursor-target relative outline-none focus:outline-none ${disableStepIndicators ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#e4e4e7', color: '#71717a' },
          active: { scale: 1, backgroundColor: '#f97316', color: '#000000' },
          complete: { scale: 1, backgroundColor: '#f97316', color: '#000000' }
        }}
        transition={{ duration: 0.3 }}
        className="flex h-10 w-10 items-center justify-center font-bold font-mono text-sm"
      >
        {status === 'complete' ? (
          <CheckIcon className="h-5 w-5 text-black" />
        ) : status === 'active' ? (
          <div className="h-3 w-3 bg-black" />
        ) : (
          <span>{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#f97316' }
  };

  return (
    <div className="relative mx-4 h-px flex-1 overflow-hidden bg-zinc-300 dark:bg-zinc-800">
      <motion.div
        className="absolute left-0 top-0 h-full"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: 'tween', ease: 'easeOut', duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

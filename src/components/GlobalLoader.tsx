import { useState, useEffect } from "react";

const GlobalLoader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("Încărcare resurse");

  useEffect(() => {
    const phases = [
      "Încărcare resurse",
      "Pregătire interfață",
      "Încărcare date",
      "Finalizare"
    ];

    let currentPhase = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress > 25 && currentPhase === 0) {
            setPhase(phases[1]);
            currentPhase = 1;
          } else if (newProgress > 50 && currentPhase === 1) {
            setPhase(phases[2]);
            currentPhase = 2;
          } else if (newProgress > 75 && currentPhase === 2) {
            setPhase(phases[3]);
            currentPhase = 3;
          }
          return newProgress > 100 ? 100 : newProgress;
        });
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="max-w-md w-full px-6 space-y-8">
        {/* Animated logo */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-2xl animate-spin-slow"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-background rounded-xl"></div>
            </div>
          </div>
        </div>

        {/* Progress and text */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Explossion
            </h2>
            <p className="text-muted-foreground animate-pulse">
              {phase}...
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">0%</span>
              <span className="text-primary font-medium">{Math.round(progress)}%</span>
              <span className="text-muted-foreground">100%</span>
            </div>
          </div>
        </div>

        {/* Loading tips */}
        <div className="text-center text-sm text-muted-foreground space-y-1">
          <p>⚡ Găsirea celor mai bune oportunități</p>
          <p>🔍 Încărcarea listei de companii</p>
          <p>🎯 Pregătirea căutării avansate</p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
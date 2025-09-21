import { useState } from "react";

export default function Hero() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCTAClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-4 text-center z-10">
        <div className="fade-in-up">
          <h1 className="font-display text-5xl md:text-7xl lg:text-9xl mb-4 tracking-tight">
            <span className="gradient-text">CORES E</span><br/>
            <span className="text-foreground">FORMAS</span>
          </h1>
          <p className="font-editorial text-xl md:text-2xl mb-2 text-muted-foreground">Edição 01</p>
          <p className="text-lg md:text-xl mb-8 text-muted-foreground">28 de setembro • Soma Galeria • Curitiba</p>
          <a 
            href="https://pixta.me/events/lancamento-side01" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-block bg-primary text-primary-foreground px-8 py-4 text-lg font-bold hover:bg-accent hover:text-accent-foreground transform hover:scale-105 transition-all duration-300 ${isLoading ? 'loading' : ''}`}
            onClick={handleCTAClick}
            data-testid="cta-hero-button"
          >
            GARANTIR INGRESSO
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div 
        className="absolute top-10 left-10 w-20 h-20 rounded-full opacity-60"
        style={{ background: 'var(--color-hot-pink)' }}
      ></div>
      <div 
        className="absolute bottom-20 right-20 w-32 h-32 rounded-full opacity-40"
        style={{ background: 'var(--color-electric-blue)' }}
      ></div>
      <div 
        className="absolute top-1/2 right-10 w-16 h-16 rounded-full opacity-70"
        style={{ background: 'var(--color-lime-green)' }}
      ></div>
    </section>
  );
}

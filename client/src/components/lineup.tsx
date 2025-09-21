export default function Lineup() {
  return (
    <section className="py-20 bg-accent text-accent-foreground">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-5xl text-center mb-16 fade-in-up" data-testid="section-title-lineup">
          LINE-UP MUSICAL
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Headliner */}
          <div className="text-center fade-in-up">
            <div className="inline-block bg-accent-foreground text-accent px-4 py-2 rounded mb-4">
              <span className="text-sm font-bold" data-testid="headliner-label">HEADLINER</span>
            </div>
            <h3 className="font-display text-4xl md:text-6xl mb-2" data-testid="headliner-name">
              RAFFA CHAOUICHE
            </h3>
          </div>
          
          {/* Supporting Acts */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center fade-in-up" data-testid="lineup-card-thiago-danidan">
              <h4 className="font-display text-2xl md:text-3xl mb-2" data-testid="artist-name-thiago">
                THIAGO OLIVEIRA
              </h4>
              <p className="text-xl opacity-80">B2B</p>
              <h4 className="font-display text-2xl md:text-3xl" data-testid="artist-name-danidan">
                DANIDAN
              </h4>
            </div>
            
            <div className="text-center fade-in-up" data-testid="lineup-card-je-amanda">
              <h4 className="font-display text-2xl md:text-3xl mb-2" data-testid="artist-name-je">
                JÉ ALLANA
              </h4>
              <p className="text-xl opacity-80">B2B</p>
              <h4 className="font-display text-2xl md:text-3xl" data-testid="artist-name-amanda">
                AMANDA GOES
              </h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

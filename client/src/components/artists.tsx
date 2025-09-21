export default function Artists() {
  return (
    <section id="edicao" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-5xl text-center mb-16 fade-in-up" data-testid="section-title-artistas">
          ARTISTAS EM DESTAQUE
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Artist 1 */}
          <div className="fade-in-up group" data-testid="artist-card-mateus">
            <div className="relative overflow-hidden bg-card rounded-lg p-8 h-full border-4 border-transparent hover:border-accent transition-all duration-300">
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: 'linear-gradient(45deg, var(--color-hot-pink), var(--color-lime-green))' }}
              ></div>
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl mb-4" data-testid="artist-name-mateus">
                  MATEUS USSUI
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed" data-testid="artist-description-mateus">
                  Artista visual que explora dimensões através de raciocínio lógico transformado em expressão artística
                </p>
              </div>
            </div>
          </div>
          
          {/* Artist 2 */}
          <div className="fade-in-up group" data-testid="artist-card-mazi">
            <div className="relative overflow-hidden bg-card rounded-lg p-8 h-full border-4 border-transparent hover:border-secondary transition-all duration-300">
              <div 
                className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: 'linear-gradient(45deg, var(--color-electric-blue), var(--color-solar-yellow))' }}
              ></div>
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl mb-4" data-testid="artist-name-mazi">
                  MAZI MORETO
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed" data-testid="artist-description-mazi">
                  Criador que trabalha com formas, texturas, eminências e sutilezas em campo orgânico de experimentações
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

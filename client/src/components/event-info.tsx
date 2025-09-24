import { useState } from "react";

export default function EventInfo() {
  const [isLoading, setIsLoading] = useState(false);

  const handleCTAClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section id="evento" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2
          className="font-display text-3xl md:text-5xl text-center mb-16 fade-in-up"
          data-testid="section-title-evento"
        >
          INFORMAÇÕES DO EVENTO
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Location */}
          <div
            className="text-center fade-in-up"
            data-testid="info-card-location"
          >
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl text-accent-foreground"
              style={{ background: "var(--color-electric-blue)" }}
            >
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h3
              className="font-display text-xl mb-2"
              data-testid="info-title-location"
            >
              LOCAL
            </h3>
            <p className="text-muted-foreground" data-testid="info-venue">
              Soma Galeria
            </p>
            <p
              className="text-sm text-muted-foreground"
              data-testid="info-address"
            >
              R. Mal José B Bormann, 730
              <br />
              Curitiba/PR
            </p>
          </div>

          {/* Date & Time */}
          <div
            className="text-center fade-in-up"
            data-testid="info-card-datetime"
          >
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl text-accent-foreground"
              style={{ background: "var(--color-hot-pink)" }}
            >
              <i className="fas fa-calendar-alt"></i>
            </div>
            <h3
              className="font-display text-xl mb-2"
              data-testid="info-title-datetime"
            >
              DATA E HORÁRIO
            </h3>
            <p className="text-muted-foreground" data-testid="info-date">
              28 de setembro de 2025
            </p>
            <p
              className="text-sm text-muted-foreground"
              data-testid="info-time"
            >
              Domingo • 14h às 21h
            </p>
          </div>

          {/* Special */}
          <div
            className="text-center fade-in-up"
            data-testid="info-card-special"
          >
            <div
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl text-accent-foreground"
              style={{ background: "var(--color-lime-green)" }}
            >
              <i className="fas fa-gift"></i>
            </div>
            <h3
              className="font-display text-xl mb-2"
              data-testid="info-title-special"
            >
              DESTAQUE
            </h3>
            <p className="text-muted-foreground" data-testid="info-special">
              Sorteio de press kit exclusivo
            </p>
            <p
              className="text-sm text-muted-foreground"
              data-testid="info-special-description"
            >
              Para os participantes do evento
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 fade-in-up">
          <a
            href="https://pixta.me/events/lancamento-side01"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block bg-accent text-accent-foreground px-12 py-6 text-xl font-bold hover:bg-primary hover:text-primary-foreground transform hover:scale-105 transition-all duration-300 ${isLoading ? "loading" : ""}`}
            onClick={handleCTAClick}
            data-testid="cta-event-button"
          >
            GARANTIR INGRESSO AGORA
          </a>
        </div>
      </div>
    </section>
  );
}

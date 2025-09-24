import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail("");

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto fade-in-up">
          <h2
            className="font-display text-3xl md:text-4xl mb-4"
            data-testid="newsletter-title"
          >
            FIQUE POR DENTRO
          </h2>
          <p
            className="text-muted-foreground mb-8"
            data-testid="newsletter-description"
          >
            Receba updates sobre próximas edições e eventos exclusivos
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="input-newsletter-email"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              className="px-6 py-3 bg-accent text-accent-foreground font-bold hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
              data-testid="button-newsletter-submit"
              disabled={isSubmitting || !email}
            >
              {isSubmitting
                ? "ENVIANDO..."
                : isSubmitted
                  ? "ENVIADO!"
                  : "ASSINAR"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

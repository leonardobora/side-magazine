export default function About() {
  return (
    <section id="sobre" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center fade-in-up">
          <h2 className="font-display text-3xl md:text-5xl mb-8" data-testid="section-title-sobre">
            SOBRE A REVISTA
          </h2>
          <p className="font-editorial text-xl md:text-2xl leading-relaxed text-muted-foreground">
            A SIDE Magazine é uma <span className="text-accent font-semibold">revista-ponte</span> entre moda, arte, cultura visual, criatividade prática e inovação digital. Um espaço de encontro entre <span className="text-accent font-semibold">especialistas generalistas</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

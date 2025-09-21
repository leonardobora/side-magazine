export default function Footer() {
  return (
    <footer id="contato" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center md:text-left">
          {/* Logo & Description */}
          <div className="fade-in-up">
            <div className="font-display text-3xl mb-4" data-testid="footer-logo">SIDE</div>
            <p className="text-sm opacity-80" data-testid="footer-description">
              Revista-ponte entre moda, arte, cultura visual e inovação digital.
            </p>
          </div>
          
          {/* Contact */}
          <div className="fade-in-up">
            <h3 className="font-bold mb-4" data-testid="footer-contact-title">CONTATO</h3>
            <p className="text-sm mb-2">
              <a 
                href="mailto:sidemagazine@outlook.com" 
                className="hover:text-accent transition-colors"
                data-testid="link-email"
              >
                sidemagazine@outlook.com
              </a>
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a 
                href="https://instagram.com/side.magazine" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-2xl hover:text-accent transition-colors"
                data-testid="link-instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Credits */}
          <div className="fade-in-up">
            <h3 className="font-bold mb-4" data-testid="footer-credits-title">CRÉDITOS</h3>
            <p className="text-sm opacity-80" data-testid="footer-team">Equipe SIDE Magazine</p>
            <p className="text-xs opacity-60 mt-4" data-testid="footer-copyright">
              © 2025 SIDE Magazine. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

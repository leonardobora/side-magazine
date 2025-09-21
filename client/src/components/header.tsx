import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const handleMenuLinkClick = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    handleMenuLinkClick();
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="font-display text-2xl lg:text-3xl text-foreground">SIDE</div>
            <div className="text-sm font-medium bg-accent text-accent-foreground px-2 py-1 rounded">01</div>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 font-medium">
            <li>
              <a 
                href="#sobre" 
                className="hover:text-accent transition-colors"
                onClick={(e) => handleSmoothScroll(e, '#sobre')}
                data-testid="nav-sobre"
              >
                Sobre
              </a>
            </li>
            <li>
              <a 
                href="#edicao" 
                className="hover:text-accent transition-colors"
                onClick={(e) => handleSmoothScroll(e, '#edicao')}
                data-testid="nav-edicao"
              >
                Edição 01
              </a>
            </li>
            <li>
              <a 
                href="#evento" 
                className="hover:text-accent transition-colors"
                onClick={(e) => handleSmoothScroll(e, '#evento')}
                data-testid="nav-evento"
              >
                Evento
              </a>
            </li>
            <li>
              <a 
                href="#contato" 
                className="hover:text-accent transition-colors"
                onClick={(e) => handleSmoothScroll(e, '#contato')}
                data-testid="nav-contato"
              >
                Contato
              </a>
            </li>
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl z-50 relative"
            onClick={handleMenuToggle}
            data-testid="mobile-menu-toggle"
          >
            <i className="fas fa-bars"></i>
          </button>
        </nav>
      </header>
      
      {/* Mobile Menu Backdrop */}
      <div 
        className={`fixed inset-0 bg-black z-40 md:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={handleMenuLinkClick}
        data-testid="mobile-menu-backdrop"
      />
      
      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 left-0 w-full h-screen bg-background z-50 md:hidden ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-container">
          <div className="flex justify-between items-center mb-8">
            <div className="font-display text-2xl text-foreground">SIDE</div>
            <button 
              className="text-2xl p-2"
              onClick={handleMenuToggle}
              data-testid="mobile-menu-close"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <ul className="space-y-6 font-medium text-xl">
            <li>
              <a 
                href="#sobre" 
                className="block hover:text-accent transition-colors py-2"
                onClick={(e) => handleSmoothScroll(e, '#sobre')}
                data-testid="mobile-nav-sobre"
              >
                Sobre
              </a>
            </li>
            <li>
              <a 
                href="#edicao" 
                className="block hover:text-accent transition-colors py-2"
                onClick={(e) => handleSmoothScroll(e, '#edicao')}
                data-testid="mobile-nav-edicao"
              >
                Edição 01
              </a>
            </li>
            <li>
              <a 
                href="#evento" 
                className="block hover:text-accent transition-colors py-2"
                onClick={(e) => handleSmoothScroll(e, '#evento')}
                data-testid="mobile-nav-evento"
              >
                Evento
              </a>
            </li>
            <li>
              <a 
                href="#contato" 
                className="block hover:text-accent transition-colors py-2"
                onClick={(e) => handleSmoothScroll(e, '#contato')}
                data-testid="mobile-nav-contato"
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

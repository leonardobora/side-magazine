import { useState } from "react";
import { Link, useLocation } from "wouter";
import sideLogo from "@assets/LOGO_SIDE_BRANCO_1758588504393.png";

interface MinimalLayoutProps {
  children: React.ReactNode;
}

export default function MinimalLayout({ children }: MinimalLayoutProps) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveRoute = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white border border-gray-300 p-2 rounded"
        onClick={toggleMobileMenu}
        data-testid="mobile-menu-toggle"
      >
        <span className="sr-only">Menu</span>
        <div className="w-4 h-4 flex flex-col justify-center">
          <span className="w-full h-0.5 bg-black mb-1"></span>
          <span className="w-full h-0.5 bg-black mb-1"></span>
          <span className="w-full h-0.5 bg-black"></span>
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          data-testid="mobile-menu-overlay"
        />
      )}

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6">
          {/* Logo */}
          <div className="mb-12">
            <img 
              src={sideLogo} 
              alt="SIDE Magazine" 
              className="w-24 h-auto" 
              data-testid="logo"
            />
          </div>

          {/* Navigation Links */}
          <ul className="space-y-4 text-sm font-medium tracking-wide">
            <li>
              <Link 
                href="/"
                className={`block py-1 transition-colors ${isActiveRoute("/") ? "text-black" : "text-gray-600 hover:text-black"}`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="nav-home"
              >
                HOME
              </Link>
            </li>
            <li>
              <a 
                href="#about"
                className="block py-1 text-gray-600 hover:text-black transition-colors"
                onClick={(e) => {
                  handleSmoothScroll(e, '#about');
                  setIsMobileMenuOpen(false);
                }}
                data-testid="nav-about"
              >
                SOBRE
              </a>
            </li>
            <li>
              <a 
                href="#editions"
                className="block py-1 text-gray-600 hover:text-black transition-colors"
                onClick={(e) => {
                  handleSmoothScroll(e, '#editions');
                  setIsMobileMenuOpen(false);
                }}
                data-testid="nav-editions"
              >
                EDIÇÕES
              </a>
            </li>
            <li>
              <a 
                href="#events"
                className="block py-1 text-gray-600 hover:text-black transition-colors"
                onClick={(e) => {
                  handleSmoothScroll(e, '#events');
                  setIsMobileMenuOpen(false);
                }}
                data-testid="nav-events"
              >
                EVENTOS
              </a>
            </li>
            <li>
              <Link 
                href="/galeria"
                className={`block py-1 transition-colors ${isActiveRoute("/galeria") ? "text-black" : "text-gray-600 hover:text-black"}`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="nav-galeria"
              >
                GALERIA
              </Link>
            </li>
            <li>
              <Link 
                href="/parcerias"
                className={`block py-1 transition-colors ${isActiveRoute("/parcerias") ? "text-black" : "text-gray-600 hover:text-black"}`}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="nav-parcerias"
              >
                PARCERIAS
              </Link>
            </li>
            <li>
              <a 
                href="#subscribe"
                className="block py-1 text-gray-600 hover:text-black transition-colors"
                onClick={(e) => {
                  handleSmoothScroll(e, '#subscribe');
                  setIsMobileMenuOpen(false);
                }}
                data-testid="nav-subscribe"
              >
                INSCREVA-SE
              </a>
            </li>
          </ul>

          {/* Instagram Links */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-3 tracking-wide">SIGA</div>
            <div className="space-y-2 text-sm">
              <a 
                href="https://www.instagram.com/side.magazine"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-black transition-colors"
                data-testid="link-side-instagram"
              >
                @side.magazine
              </a>
              <a 
                href="https://www.instagram.com/somagaleria"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-black transition-colors"
                data-testid="link-soma-instagram"
              >
                @somagaleria
              </a>
              <a 
                href="https://www.instagram.com/pixta.me"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-600 hover:text-black transition-colors"
                data-testid="link-pixta-instagram"
              >
                @pixta.me
              </a>
            </div>
          </div>

          {/* Purchase Button */}
          <div className="mt-8">
            <a
              href="https://pixta.me/events/lancamento-side01"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full bg-red-600 text-white font-bold py-3 px-4 text-sm tracking-wide hover:bg-red-700 transition-colors border-0">
                COMPRAR SIDE 01
              </button>
            </a>
          </div>

          {/* Contact */}
          <div className="mt-8">
            <div className="text-xs text-gray-500 mb-2 tracking-wide">CONTATO</div>
            <div className="text-sm text-gray-600">
              <div>antoniavonhart@gmail.com</div>
              <div className="mt-1">+55 41 9723-2690</div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="md:ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
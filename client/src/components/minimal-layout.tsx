import { useState } from "react";
import { Link, useLocation } from "wouter";

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
            <h1 className="text-xl font-serif text-black tracking-wide" data-testid="logo">
              SIDE Magazine
            </h1>
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
                ABOUT
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
                EDITIONS
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
                EVENTS
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
                SUBSCRIBE
              </a>
            </li>
          </ul>

          {/* Instagram Links */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-3 tracking-wide">FOLLOW</div>
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
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8">
            <div className="text-xs text-gray-500 mb-2 tracking-wide">CONTACT</div>
            <div className="text-sm text-gray-600">
              post@sidemagazine.com
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
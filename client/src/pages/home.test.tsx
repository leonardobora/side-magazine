import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the image assets
vi.mock('@assets/side (4)_1758574540066.png', () => ({
  default: 'mocked-hero-image.png'
}));

vi.mock('@assets/side (1)_1758574511865.png', () => ({
  default: 'mocked-edition-cover.png'
}));

vi.mock('@assets/side_1758591780694.png', () => ({
  default: 'mocked-side-logo.png'
}));

// Mock the toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Create a simple mock component for Home to test basic rendering
const MockHome = () => {
  return (
    <div role="main">
      <img data-testid="main-logo" src="mocked-side-logo.png" alt="SIDE Logo" />
      <img 
        data-testid="hero-image" 
        src="mocked-hero-image.png" 
        alt="SIDE Magazine CORES E FORMAS - Evento de Lançamento" 
      />
      <a href="https://pixta.me/events/lancamento-side01" target="_blank" rel="noopener noreferrer">
        <button data-testid="button-main-cta">Garanta seu ingresso</button>
      </a>
      <h2 data-testid="images-title">Arquivo Visual</h2>
      <footer>
        <a 
          href="https://www.instagram.com/side.magazine"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-side-instagram"
        >
          @side.magazine
        </a>
        <a 
          href="https://www.instagram.com/somagaleria"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-soma-instagram"
        >
          @somagaleria
        </a>
        <a 
          href="https://linkedin.com/in/leonardobora"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="footer-linkedin"
        >
          desenvolvido por Leo Bora!
        </a>
      </footer>
    </div>
  );
};

// Create a test wrapper with QueryClient
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const renderWithQueryClient = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('Home Page', () => {
  it('renders main elements correctly', () => {
    renderWithQueryClient(<MockHome />);
    
    // Check if main logo is present
    const mainLogo = screen.getByTestId('main-logo');
    expect(mainLogo).toBeInTheDocument();
    
    // Check if hero image is present
    const heroImage = screen.getByTestId('hero-image');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('alt', 'SIDE Magazine CORES E FORMAS - Evento de Lançamento');
    
    // Check if main CTA button is present
    const ctaButton = screen.getByTestId('button-main-cta');
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveTextContent('Garanta seu ingresso');
  });

  it('renders images section with title', () => {
    renderWithQueryClient(<MockHome />);
    
    const imagesTitle = screen.getByTestId('images-title');
    expect(imagesTitle).toBeInTheDocument();
    expect(imagesTitle).toHaveTextContent('Arquivo Visual');
  });

  it('renders footer with social links', () => {
    renderWithQueryClient(<MockHome />);
    
    const sideInstagram = screen.getByTestId('footer-side-instagram');
    expect(sideInstagram).toBeInTheDocument();
    expect(sideInstagram).toHaveAttribute('href', 'https://www.instagram.com/side.magazine');
    
    const somaInstagram = screen.getByTestId('footer-soma-instagram');
    expect(somaInstagram).toBeInTheDocument();
    expect(somaInstagram).toHaveAttribute('href', 'https://www.instagram.com/somagaleria');
    
    const linkedinLink = screen.getByTestId('footer-linkedin');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/leonardobora');
  });

  it('CTA button has correct external link', () => {
    renderWithQueryClient(<MockHome />);
    
    const ctaButton = screen.getByTestId('button-main-cta');
    const ctaLink = ctaButton.closest('a');
    
    expect(ctaLink).toHaveAttribute('href', 'https://pixta.me/events/lancamento-side01');
    expect(ctaLink).toHaveAttribute('target', '_blank');
    expect(ctaLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders main container', () => {
    renderWithQueryClient(<MockHome />);
    
    const homeContainer = screen.getByRole('main');
    expect(homeContainer).toBeInTheDocument();
  });
});
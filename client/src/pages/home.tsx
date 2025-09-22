import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/side (4)_1758574540066.png";
import editionCover from "@assets/side (1)_1758574511865.png";

export default function Home() {
  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll(".fade-in").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Main Title */}
      <header className="mb-16 fade-in">
        <h1
          className="font-serif text-5xl md:text-7xl text-black mb-4"
          data-testid="main-title"
        >
          SIDE Magazine
        </h1>
        <div className="w-full h-px bg-gray-200 my-8"></div>
      </header>

      {/* Hero Image Section */}
      <section className="mb-16 fade-in">
        <div className="relative mb-8">
          <img
            src={heroImage}
            alt="SIDE Magazine CORES E FORMAS - Evento de Lançamento"
            className="w-full h-80 md:h-96 object-cover object-center"
            data-testid="hero-image"
          />
        </div>
        <div className="text-center">
          <Button
            className="bg-black text-white hover:bg-gray-800 px-8 py-3"
            data-testid="button-main-cta"
          >
            Garanta seu ingresso
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-16 fade-in">
        <p
          className="text-lg leading-relaxed mb-6 font-serif italic"
          data-testid="about-text"
        >
          <em>SIDE Magazine</em> é concebida como um espaço de pesquisa e
          criação artística, dedicada à intersecção entre moda, arte e cultura
          visual. Cada edição explora territórios únicos através do olhar de
          artistas, curadores e pensadores contemporâneos.
        </p>
        <div className="divider"></div>
      </section>

      {/* Current Edition */}
      <section id="editions" className="mb-16 fade-in">
        <h2
          className="font-serif text-3xl md:text-4xl text-black mb-8"
          data-testid="edition-title"
        >
          CORES E FORMAS
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <img
              src={editionCover}
              alt="CORES E FORMAS Edition Cover"
              className="w-4/5 h-96 object-cover mx-auto"
              data-testid="edition-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-medium mb-4">Edição 01</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              A segunda edição da Side Magazine explora as relações entre cores
              e formas no contexto da arte contemporânea brasileira. Uma
              investigação sobre como artistas emergentes reinterpretam
              linguagens visuais tradicionais.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Lançamento:</strong> 28 de Setembro, 2025
              </p>
              <p>
                <strong>Local:</strong> Soma Galeria, Curitiba
              </p>
              <p>
                <strong>Formato:</strong> Publicação impressa + evento de
                lançamento
              </p>
            </div>
          </div>
        </div>

        <Button
          className="bg-black text-white hover:bg-gray-800 px-8 py-3"
          data-testid="button-buy-magazine"
        >
          Adquirir Revista
        </Button>

        <div className="divider"></div>
      </section>

      {/* Team Section */}
      <section id="team" className="mb-16 fade-in">
        <h2
          className="font-serif text-2xl text-black mb-8"
          data-testid="team-title"
        >
          Equipe
        </h2>

        <div className="grid md:grid-cols-2 gap-8 text-sm">
          <div>
            <p className="mb-2">
              <strong>Editora Executiva:</strong> [A definir]
            </p>
            <p className="mb-2">
              <strong>Direção de Arte:</strong> [A definir]
            </p>
            <p className="mb-2">
              <strong>Curadoria:</strong> [A definir]
            </p>
          </div>
          <div>
            <p className="mb-2">
              <strong>Coordenação Editorial:</strong> [A definir]
            </p>
            <p className="mb-2">
              <strong>Assistente de Pesquisa:</strong> [A definir]
            </p>
            <p className="mb-2">
              <strong>Design Gráfico:</strong> [A definir]
            </p>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p className="italic">
            SIDE Magazine é publicada de forma independente em Curitiba, Brasil.
          </p>
        </div>

        <div className="divider"></div>
      </section>

      {/* Events Section */}
      <section id="events" className="mb-16 fade-in">
        <h2
          className="font-serif text-2xl text-black mb-8"
          data-testid="events-title"
        >
          Eventos
        </h2>

        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">
            Lançamento CORES E FORMAS
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="space-y-3 text-sm">
                <p>
                  <strong>Data:</strong> 28 de Setembro, 2025
                </p>
                <p>
                  <strong>Horário:</strong> 19h às 22h
                </p>
                <p>
                  <strong>Local:</strong> Soma Galeria
                </p>
                <p>
                  <strong>Endereço:</strong> Curitiba, PR
                </p>
                <p>
                  <strong>Entrada:</strong> Gratuita
                </p>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Programação</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>19h - Abertura e coquetel</li>
                  <li>19h30 - Apresentação da revista</li>
                  <li>20h - Conversa com artistas participantes</li>
                  <li>20h30 - Performance musical: Raffa Chaouiche</li>
                  <li>21h30 - Encerramento</li>
                </ul>
              </div>
            </div>

            <div>
              {/* Google Maps Embed */}
              <div className="w-full h-64 bg-gray-100 border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.2089876892!2d-49.27292!3d-25.440397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDI2JzI1LjQiUyA0OcKwMTYnMjIuNSJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Soma Galeria"
                  data-testid="maps-embed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Localização da Soma Galeria, Curitiba
              </p>
            </div>
          </div>
        </div>

        <div className="divider"></div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="mb-16 fade-in">
        <h2
          className="font-serif text-2xl text-black mb-8"
          data-testid="subscribe-title"
        >
          Newsletter
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Receba atualizações sobre novas edições, eventos e conteúdos
          exclusivos da Side Magazine diretamente em seu email.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-md">
          <input
            type="email"
            placeholder="seu@email.com"
            className="flex-1 px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:border-black"
            data-testid="input-newsletter-email"
          />
          <Button
            className="bg-black text-white hover:bg-gray-800 px-6 py-2 text-sm"
            data-testid="button-subscribe"
          >
            Inscrever
          </Button>
        </div>

        <div className="divider"></div>
      </section>

      {/* Images Section */}
      <section id="images" className="mb-16 fade-in">
        <h2
          className="font-serif text-2xl text-black mb-8"
          data-testid="images-title"
        >
          Arquivo Visual
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="aspect-square bg-gray-100 border flex items-center justify-center">
            <span className="text-gray-400 text-sm">Imagem 1</span>
          </div>
          <div className="aspect-square bg-gray-100 border flex items-center justify-center">
            <span className="text-gray-400 text-sm">Imagem 2</span>
          </div>
          <div className="aspect-square bg-gray-100 border flex items-center justify-center">
            <span className="text-gray-400 text-sm">Imagem 3</span>
          </div>
          <div className="aspect-square bg-gray-100 border flex items-center justify-center">
            <span className="text-gray-400 text-sm">Imagem 4</span>
          </div>
          <div className="aspect-square bg-gray-100 border flex items-center justify-center">
            <span className="text-gray-400 text-sm">Imagem 5</span>
          </div>
          <div className="aspect-square bg-gray-100 border flex items-center justify-center">
            <span className="text-gray-400 text-sm">Imagem 6</span>
          </div>
        </div>

        <p className="text-sm text-gray-500 italic">
          Arquivo visual em construção. Imagens serão adicionadas conforme o
          desenvolvimento do projeto.
        </p>

        <div className="divider"></div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-gray-200 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p>SIDE Magazine © 2025</p>
            <p>contato@sidemagazine.com</p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/side.magazine"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
              data-testid="footer-side-instagram"
            >
              @side.magazine
            </a>
            <a
              href="https://www.instagram.com/somagaleria"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
              data-testid="footer-soma-instagram"
            >
              @somagaleria
            </a>
            <a
              href="https://linkedin.com/in/leonardobora"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
              data-testid="footer-linkedin"
            >
              desenvolvido por Leo Bora!
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

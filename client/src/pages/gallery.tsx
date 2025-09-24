import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Image } from "lucide-react";

// Mock data - será substituído por dados reais do backend no futuro
const mockGalleries = [
  {
    id: "1",
    title: "Lançamento CORES E FORMAS",
    description:
      "Registro fotográfico do evento de lançamento da Edição 01 na Soma Galeria",
    coverImage: "/api/placeholder/400/300",
    imageCount: 24,
    createdAt: "2025-09-28",
    category: "evento",
  },
  {
    id: "2",
    title: "Bastidores da Produção",
    description: "Processo criativo e preparação da primeira edição da revista",
    coverImage: "/api/placeholder/400/300",
    imageCount: 18,
    createdAt: "2025-09-15",
    category: "bastidores",
  },
  {
    id: "3",
    title: "Ensaio Editorial",
    description:
      "Fotografias autorais dos artistas em destaque na primeira edição",
    coverImage: "/api/placeholder/400/300",
    imageCount: 12,
    createdAt: "2025-09-10",
    category: "editorial",
  },
  {
    id: "4",
    title: "Processo Criativo",
    description:
      "Documentação do desenvolvimento visual e conceitual da revista",
    coverImage: "/api/placeholder/400/300",
    imageCount: 15,
    createdAt: "2025-09-01",
    category: "bastidores",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Query placeholder - será implementada quando conectar com o backend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: _galleries, isLoading: _isLoading } = useQuery({
    queryKey: ["/api/galleries"],
    queryFn: () => Promise.resolve(mockGalleries),
    enabled: false, // Desabilitado até implementar backend
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _displayGalleries = mockGalleries.filter(
    (gallery) =>
      selectedCategory === "all" || gallery.category === selectedCategory
  );

  const categories = [
    { value: "all", label: "Todos" },
    { value: "evento", label: "Eventos" },
    { value: "bastidores", label: "Bastidores" },
    { value: "editorial", label: "Editorial" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-16">
        <h1
          className="font-serif text-4xl md:text-5xl text-black mb-6"
          data-testid="gallery-title"
        >
          Galeria
        </h1>
        <div className="w-full h-px bg-gray-200 mb-8"></div>
        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
          Explore os momentos únicos, bastidores e registros visuais dos eventos
          e projetos da Side Magazine. Uma documentação visual do nosso processo
          criativo e das experiências que criamos.
        </p>
      </header>

      {/* Filter Navigation */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 text-sm border transition-colors ${
                selectedCategory === category.value
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:border-black hover:text-black"
              }`}
              data-testid={`filter-${category.value}`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Construction Notice */}
      <div className="text-center py-24">
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <Image className="w-16 h-16 text-white mx-auto mb-6 opacity-60" />
            <h2 className="font-serif text-3xl text-white mb-4">
              EM CONSTRUÇÃO
            </h2>
            <p className="text-lg text-white opacity-80 leading-relaxed mb-6">
              Nossa galeria está sendo cuidadosamente organizada para oferecer a
              melhor experiência visual. Em breve você poderá explorar nosso
              arquivo completo de imagens e momentos únicos.
            </p>
            <p className="text-sm text-white opacity-60">
              Acompanhe nossas redes sociais para não perder as novidades!
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="border-t border-gray-200 pt-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-black mb-4">
            Quer acompanhar nossos próximos eventos?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Fique por dentro dos lançamentos, eventos exclusivos e bastidores da
            Side Magazine. Siga nossas redes sociais para não perder nenhum
            momento.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://www.instagram.com/side.magazine"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors text-sm"
              data-testid="link-side-instagram"
            >
              @side.magazine
            </a>
            <a
              href="https://www.instagram.com/somagaleria"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors text-sm"
              data-testid="link-soma-instagram"
            >
              @somagaleria
            </a>
          </div>
        </div>
      </div>

      {/* Technical Note */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-xs text-gray-500">
        <p className="italic">
          As galerias estão sendo organizadas e novas imagens serão adicionadas
          conforme os eventos acontecem. Esta seção será expandida com
          funcionalidades avançadas de visualização em breve.
        </p>
      </div>
    </div>
  );
}

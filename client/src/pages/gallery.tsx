import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Eye, Calendar, Image } from "lucide-react";

// Mock data - será substituído por dados reais do backend no futuro
const mockGalleries = [
  {
    id: "1",
    title: "Lançamento CORES E FORMAS",
    description: "Registro fotográfico do evento de lançamento da Edição 01 na Soma Galeria",
    coverImage: "/api/placeholder/400/300",
    imageCount: 24,
    createdAt: "2025-09-28",
    category: "evento"
  },
  {
    id: "2", 
    title: "Bastidores da Produção",
    description: "Processo criativo e preparação da primeira edição da revista",
    coverImage: "/api/placeholder/400/300",
    imageCount: 18,
    createdAt: "2025-09-15",
    category: "bastidores"
  },
  {
    id: "3",
    title: "Ensaio Editorial",
    description: "Fotografias autorais dos artistas em destaque na primeira edição",
    coverImage: "/api/placeholder/400/300", 
    imageCount: 12,
    createdAt: "2025-09-10",
    category: "editorial"
  },
  {
    id: "4",
    title: "Processo Criativo",
    description: "Documentação do desenvolvimento visual e conceitual da revista",
    coverImage: "/api/placeholder/400/300",
    imageCount: 15,
    createdAt: "2025-09-01",
    category: "bastidores"
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Query placeholder - será implementada quando conectar com o backend
  const { data: galleries, isLoading } = useQuery({
    queryKey: ["/api/galleries"],
    queryFn: () => Promise.resolve(mockGalleries),
    enabled: false // Desabilitado até implementar backend
  });

  const displayGalleries = mockGalleries.filter(gallery => 
    selectedCategory === "all" || gallery.category === selectedCategory
  );

  const categories = [
    { value: "all", label: "Todos" },
    { value: "evento", label: "Eventos" },
    { value: "bastidores", label: "Bastidores" },
    { value: "editorial", label: "Editorial" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-black mb-6" data-testid="gallery-title">
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

      {/* Gallery Grid */}
      {displayGalleries.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {displayGalleries.map((gallery) => (
            <div key={gallery.id} className="group" data-testid={`gallery-${gallery.id}`}>
              <div className="mb-4">
                <img
                  src={gallery.coverImage}
                  alt={gallery.title}
                  className="w-full h-64 object-cover border border-gray-200 group-hover:border-black transition-colors"
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-lg group-hover:text-gray-600 transition-colors" data-testid={`gallery-title-${gallery.id}`}>
                  {gallery.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {gallery.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
                  <div className="flex items-center gap-1">
                    <Image className="w-3 h-3" />
                    <span>{gallery.imageCount} fotos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(gallery.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-gray-300 text-gray-600 hover:border-black hover:text-black"
                  data-testid={`button-view-${gallery.id}`}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Ver Galeria
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <Image className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              Nenhuma galeria encontrada
            </h3>
            <p className="text-sm text-gray-500">
              Não há galerias disponíveis para a categoria selecionada.
            </p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="border-t border-gray-200 pt-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-black mb-4">
            Quer acompanhar nossos próximos eventos?
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Fique por dentro dos lançamentos, eventos exclusivos e bastidores 
            da Side Magazine. Siga nossas redes sociais para não perder nenhum momento.
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
          As galerias estão sendo organizadas e novas imagens serão adicionadas conforme 
          os eventos acontecem. Esta seção será expandida com funcionalidades avançadas 
          de visualização em breve.
        </p>
      </div>
    </div>
  );
}
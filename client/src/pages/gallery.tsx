import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Calendar, Eye } from "lucide-react";

// Mock data - será substituído por dados reais do backend no futuro
const mockGalleries = [
  {
    id: "1",
    title: "Lançamento CORES E FORMAS",
    description: "Registro fotográfico do evento de lançamento da Edição 01 na Soma Galeria",
    coverImage: "/api/placeholder/400/300",
    imageCount: 24,
    createdAt: "2025-09-28",
    isPublished: "published"
  },
  {
    id: "2", 
    title: "Bastidores da Produção",
    description: "Processo criativo e preparação da primeira edição da revista",
    coverImage: "/api/placeholder/400/300",
    imageCount: 18,
    createdAt: "2025-09-15",
    isPublished: "published"
  },
  {
    id: "3",
    title: "Ensaio Editorial",
    description: "Fotografias autorais dos artistas em destaque",
    coverImage: "/api/placeholder/400/300", 
    imageCount: 12,
    createdAt: "2025-09-10",
    isPublished: "draft"
  }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Query placeholder - será implementada quando conectar com o backend
  const { data: galleries, isLoading } = useQuery({
    queryKey: ["/api/galleries"],
    queryFn: () => Promise.resolve(mockGalleries), // Mock implementation
    enabled: false // Desabilitado até implementar backend
  });

  const displayGalleries = mockGalleries.filter(gallery => 
    selectedCategory === "all" || 
    gallery.isPublished === selectedCategory ||
    (selectedCategory === "evento" && gallery.title.toLowerCase().includes("lançamento")) ||
    (selectedCategory === "bastidores" && gallery.title.toLowerCase().includes("bastidores")) ||
    (selectedCategory === "editorial" && gallery.title.toLowerCase().includes("ensaio"))
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto fade-in-up">
              <h1 className="font-display text-4xl md:text-6xl mb-6" data-testid="gallery-title">
                GALERIA DIGITAL
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Explore os momentos únicos, bastidores e registros visuais dos 
                eventos e projetos da SIDE Magazine
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {[
                  { key: "all", label: "Todos" },
                  { key: "evento", label: "Eventos" },
                  { key: "bastidores", label: "Bastidores" },
                  { key: "editorial", label: "Editorial" },
                ].map((category) => (
                  <Button
                    key={category.key}
                    variant={selectedCategory === category.key ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.key)}
                    data-testid={`filter-${category.key}`}
                    className="transition-all duration-300"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {displayGalleries.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {displayGalleries.map((gallery, index) => (
                    <div key={gallery.id} className="fade-in-up group" data-testid={`gallery-card-${gallery.id}`}>
                      <Card className="overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-300 h-full">
                        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                            <Camera className="w-16 h-16 text-muted-foreground/50" />
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge 
                              variant={gallery.isPublished === "published" ? "default" : "secondary"}
                              data-testid={`badge-status-${gallery.id}`}
                            >
                              {gallery.isPublished === "published" ? "Publicado" : "Rascunho"}
                            </Badge>
                          </div>
                          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            {gallery.imageCount} fotos
                          </div>
                        </div>
                        
                        <CardContent className="p-6">
                          <h3 className="font-display text-xl mb-2" data-testid={`gallery-title-${gallery.id}`}>
                            {gallery.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2" data-testid={`gallery-description-${gallery.id}`}>
                            {gallery.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {new Date(gallery.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="hover:bg-accent hover:text-accent-foreground"
                              data-testid={`button-view-${gallery.id}`}
                            >
                              Ver Álbum
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Camera className="w-24 h-24 text-muted-foreground/50 mx-auto mb-6" />
                  <h3 className="font-display text-2xl mb-4">Em breve</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Estamos preparando conteúdo visual exclusivo. 
                    As fotografias dos eventos e projetos serão publicadas aqui em breve.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-accent text-accent-foreground">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto fade-in-up">
              <h2 className="font-display text-3xl md:text-4xl mb-6">
                Seja Parte da História
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Acompanhe nossos próximos eventos e seja fotografado para nossa galeria digital
              </p>
              <Button 
                size="lg"
                variant="secondary"
                className="bg-accent-foreground text-accent hover:bg-primary hover:text-primary-foreground"
                data-testid="button-events-cta"
              >
                Ver Próximos Eventos
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
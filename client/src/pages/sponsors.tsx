import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { insertSponsorSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sponsorFormSchema = insertSponsorSchema;

type SponsorFormData = z.infer<typeof sponsorFormSchema>;

export default function Sponsors() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<SponsorFormData>({
    resolver: zodResolver(sponsorFormSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      partnershipType: "",
      budget: "",
      message: "",
    },
  });

  const createSponsorMutation = useMutation({
    mutationFn: (data: SponsorFormData) =>
      apiRequest("POST", "/api/sponsors", data),
    onSuccess: () => {
      setIsSubmitted(true);
      form.reset();
      toast({
        title: "Formulário enviado com sucesso!",
        description: "Entraremos em contato em breve para discutir as oportunidades de parceria.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao enviar formulário",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SponsorFormData) => {
    createSponsorMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center py-16">
          <h1 className="font-serif text-3xl md:text-4xl text-black mb-6" data-testid="success-title">
            Obrigado pelo seu interesse
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Recebemos suas informações e entraremos em contato em breve para discutir as oportunidades de parceria.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
            data-testid="button-new-submission"
          >
            Enviar nova proposta
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <header className="mb-16">
        <h1 className="font-serif text-4xl md:text-5xl text-black mb-6" data-testid="partnerships-title">
          Parcerias
        </h1>
        <div className="w-full h-px bg-gray-200 mb-8"></div>
        <p className="text-lg text-gray-600 leading-relaxed">
          Conecte sua marca com a cultura visual contemporânea. A Side Magazine 
          oferece oportunidades únicas de parceria para empresas que valorizam 
          arte, inovação e criatividade.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Information Section */}
        <div>
          <h2 className="font-serif text-2xl text-black mb-8">Por que ser nosso parceiro?</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="font-medium text-lg mb-3">Alcance Qualificado</h3>
              <p className="text-gray-600 leading-relaxed">
                Conecte-se com uma audiência engajada de profissionais criativos, 
                artistas e entusiastas da cultura visual contemporânea.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Visibilidade Estratégica</h3>
              <p className="text-gray-600 leading-relaxed">
                Posicione sua marca em eventos exclusivos, edições especiais 
                e ações de alto impacto cultural na cena artística de Curitiba.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-3">Colaboração Criativa</h3>
              <p className="text-gray-600 leading-relaxed">
                Participe de projetos únicos que unem arte, design e inovação 
                em experiências memoráveis para públicos especializados.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="font-medium text-lg mb-4">Tipos de Parceria</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Patrocínio de eventos e lançamentos</li>
              <li>• Apoio a edições especiais da revista</li>
              <li>• Colaborações em projetos editoriais</li>
              <li>• Parcerias em experiências e workshops</li>
              <li>• Apoio institucional e cultural</li>
            </ul>
          </div>
        </div>

        {/* Form Section */}
        <div>
          <h2 className="font-serif text-2xl text-black mb-8">Formulário de Interesse</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nome da Empresa *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Empresa LTDA"
                        className="border-gray-300 focus:border-black focus:ring-0"
                        data-testid="input-company-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Nome do Contato *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome completo"
                        className="border-gray-300 focus:border-black focus:ring-0"
                        data-testid="input-contact-name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contato@empresa.com"
                          className="border-gray-300 focus:border-black focus:ring-0"
                          data-testid="input-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Telefone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(41) 99999-9999"
                          className="border-gray-300 focus:border-black focus:ring-0"
                          data-testid="input-phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="partnershipType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Tipo de Parceria *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger 
                          className="border-gray-300 focus:border-black focus:ring-0"
                          data-testid="select-partnership-type"
                        >
                          <SelectValue placeholder="Selecione o tipo de parceria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="event-sponsor">Patrocínio de Eventos</SelectItem>
                        <SelectItem value="magazine-sponsor">Apoio à Revista</SelectItem>
                        <SelectItem value="editorial-partnership">Parceria Editorial</SelectItem>
                        <SelectItem value="institutional-support">Apoio Institucional</SelectItem>
                        <SelectItem value="creative-collaboration">Colaboração Criativa</SelectItem>
                        <SelectItem value="other">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Orçamento Aproximado</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: R$ 10.000 - R$ 50.000"
                        className="border-gray-300 focus:border-black focus:ring-0"
                        data-testid="input-budget"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Mensagem *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conte-nos mais sobre seus objetivos e como podemos colaborar..."
                        className="border-gray-300 focus:border-black focus:ring-0 min-h-[120px]"
                        data-testid="textarea-message"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={createSponsorMutation.isPending}
                className="w-full bg-black text-white hover:bg-gray-800 py-3"
                data-testid="button-submit"
              >
                {createSponsorMutation.isPending ? "Enviando..." : "Enviar Proposta"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Contact Info */}
      <div className="mt-16 pt-8 border-t border-gray-200 text-sm text-gray-600">
        <p>
          <strong>Contato direto:</strong> post@sidemagazine.com
        </p>
        <p className="mt-2">
          Todas as propostas são analisadas individualmente. Retornaremos em até 5 dias úteis.
        </p>
      </div>
    </div>
  );
}
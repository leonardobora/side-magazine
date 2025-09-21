import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { insertSponsorSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/header";
import Footer from "@/components/footer";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto fade-in-up">
              <h1 className="font-display text-4xl md:text-6xl mb-6" data-testid="sponsors-title">
                PARCERIAS ESTRATÉGICAS
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Junte-se à SIDE Magazine e conecte sua marca com a cultura visual contemporânea, 
                arte e inovação. Explore oportunidades únicas de parceria conosco.
              </p>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                
                {/* Info Card */}
                <div className="fade-in-up">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-display text-2xl">
                        Por que ser nosso parceiro?
                      </CardTitle>
                      <CardDescription className="text-lg">
                        A SIDE Magazine é uma revista-ponte que conecta diferentes universos criativos
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-bold text-lg mb-2">Alcance Qualificado</h3>
                        <p className="text-muted-foreground">
                          Conecte-se com uma audiência engajada de profissionais criativos, 
                          artistas e entusiastas da cultura visual.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg mb-2">Visibilidade Estratégica</h3>
                        <p className="text-muted-foreground">
                          Posicione sua marca em eventos exclusivos, edições especiais 
                          e ações de alto impacto cultural.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold text-lg mb-2">Colaboração Criativa</h3>
                        <p className="text-muted-foreground">
                          Participe de projetos únicos que unem arte, tecnologia e inovação 
                          em experiências memoráveis.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Form */}
                <div className="fade-in-up">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-display text-2xl">
                        Formulário de Interesse
                      </CardTitle>
                      <CardDescription>
                        Preencha os dados da sua empresa para iniciarmos uma conversa
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nome da Empresa *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Ex: Empresa LTDA"
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
                                <FormLabel>Nome do Contato *</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Seu nome completo"
                                    data-testid="input-contact-name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Corporativo *</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="email"
                                      placeholder="contato@empresa.com"
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
                                  <FormLabel>Telefone</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="(11) 99999-9999"
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
                                <FormLabel>Tipo de Parceria *</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  data-testid="select-partnership-type"
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione o tipo de parceria" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="patrocinio-evento">Patrocínio de Evento</SelectItem>
                                    <SelectItem value="parceria-conteudo">Parceria de Conteúdo</SelectItem>
                                    <SelectItem value="colaboracao-editorial">Colaboração Editorial</SelectItem>
                                    <SelectItem value="apoio-institucional">Apoio Institucional</SelectItem>
                                    <SelectItem value="custom">Projeto Customizado</SelectItem>
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
                                <FormLabel>Faixa de Investimento</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value || ""}
                                  data-testid="select-budget"
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecione a faixa de investimento" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="ate-5k">Até R$ 5.000</SelectItem>
                                    <SelectItem value="5k-15k">R$ 5.000 - R$ 15.000</SelectItem>
                                    <SelectItem value="15k-50k">R$ 15.000 - R$ 50.000</SelectItem>
                                    <SelectItem value="acima-50k">Acima de R$ 50.000</SelectItem>
                                    <SelectItem value="a-definir">A definir</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mensagem *</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Conte-nos mais sobre sua empresa e o que espera desta parceria..."
                                    className="min-h-[120px]"
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
                            size="lg"
                            className="w-full bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
                            disabled={createSponsorMutation.isPending}
                            data-testid="button-submit-sponsor"
                          >
                            {createSponsorMutation.isPending
                              ? "ENVIANDO..."
                              : isSubmitted
                              ? "ENVIADO!"
                              : "ENVIAR PROPOSTA"
                            }
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
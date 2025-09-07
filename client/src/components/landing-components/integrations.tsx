import type { IntegrationsContent, GlobalTheme } from "@shared/schema";

interface IntegrationsProps {
  content: IntegrationsContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Integrations({ content, theme, globalTheme }: IntegrationsProps) {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-foreground font-heading">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {content.logos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center p-4 bg-card rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow duration-200"
              data-testid={`integration-logo-${index}`}
            >
              <img
                src={logo.logoUrl}
                alt={logo.name}
                className="h-10 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
                title={logo.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ExternalLink } from "lucide-react";
import type { ResourcesContent, GlobalTheme } from "@shared/schema";

interface ResourcesProps {
  content: ResourcesContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Resources({ content, theme, globalTheme }: ResourcesProps) {
  return (
    <section className="bg-accent/50 py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-foreground font-heading">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {content.items.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="group block bg-background rounded-lg shadow-md overflow-hidden border border-border hover:shadow-lg transition-all duration-200"
              data-testid={`resource-link-${index}`}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                  {item.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors font-heading">
                    {item.title}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2 mt-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

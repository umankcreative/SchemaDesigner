import type { AwardsContent, GlobalTheme } from "@shared/schema";

interface AwardsProps {
  content: AwardsContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Awards({ content, theme, globalTheme }: AwardsProps) {
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
        
        <div className="grid md:grid-cols-4 gap-8">
          {content.items.map((item, index) => (
            <div
              key={index}
              className="text-center group"
              data-testid={`award-item-${index}`}
            >
              <div className="mb-6 flex justify-center">
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  className="h-24 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity filter grayscale group-hover:grayscale-0"
                />
              </div>
              <h3 className="font-semibold text-foreground mb-2 font-heading">
                {item.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

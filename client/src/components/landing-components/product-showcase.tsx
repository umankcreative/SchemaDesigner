import type { ProductShowcaseContent, GlobalTheme } from "@shared/schema";

interface ProductShowcaseProps {
  content: ProductShowcaseContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function ProductShowcase({ content, theme, globalTheme }: ProductShowcaseProps) {
  return (
    <section className="bg-accent/50 py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-foreground font-heading">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          {content.showcases.map((showcase, index) => (
            <div key={index} className="bg-background rounded-lg shadow-md overflow-hidden border border-border">
              <img
                src={showcase.imageUrl}
                alt={showcase.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground font-heading">
                  {showcase.title}
                </h3>
                <p className="text-muted-foreground mt-2 mb-4">
                  {showcase.description}
                </p>
                <ul className="space-y-2 text-sm">
                  {showcase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

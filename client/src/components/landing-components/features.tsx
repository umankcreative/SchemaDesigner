import type { FeaturesContent, GlobalTheme } from "@shared/schema";

interface FeaturesProps {
  content: FeaturesContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Features({ content, theme, globalTheme }: FeaturesProps) {
  return (
    <section className="bg-accent/50 py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-heading">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {content.featureList.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl mb-5 flex items-center justify-center h-16">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2 font-heading">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

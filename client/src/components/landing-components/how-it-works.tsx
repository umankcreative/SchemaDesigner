import type { HowItWorksContent, GlobalTheme } from "@shared/schema";

interface HowItWorksProps {
  content: HowItWorksContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function HowItWorks({ content, theme, globalTheme }: HowItWorksProps) {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16 font-heading">
          {content.title}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-10">
          {content.steps.map((step, index) => (
            <div key={index} className="relative p-8 bg-card rounded-xl shadow-lg border border-border">
              <div className="absolute -top-6 -left-6 bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ring-8 ring-background">
                {step.step}
              </div>
              <h3 className="mt-4 text-xl font-bold text-foreground mb-2 font-heading">
                {step.title}
              </h3>
              <p className="text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";
import type { PricingContent, GlobalTheme } from "@shared/schema";

interface PricingProps {
  content: PricingContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Pricing({ content, theme, globalTheme }: PricingProps) {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16 font-heading">
          {content.title}
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
          {content.plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card p-8 rounded-xl shadow-lg border transition-transform transform ${
                plan.isPopular 
                  ? 'border-primary scale-105 ring-2 ring-primary/20' 
                  : 'border-border hover:scale-105'
              }`}
            >
              {plan.isPopular && (
                <div className="text-center mb-4">
                  <span className="bg-primary/20 text-primary font-semibold px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-primary mb-4 text-center font-heading">
                {plan.name}
              </h3>
              
              <div className="text-5xl font-extrabold text-foreground mb-8 text-center">
                {plan.price}
              </div>
              
              <ul className="space-y-4 text-muted-foreground mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={plan.cta.link}
                className={`block w-full text-center py-3 rounded-lg font-semibold transition-opacity hover:opacity-90 ${
                  plan.isPopular 
                    ? 'bg-primary text-primary-foreground shadow-lg' 
                    : 'bg-primary/20 text-primary'
                }`}
              >
                {plan.cta.text}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

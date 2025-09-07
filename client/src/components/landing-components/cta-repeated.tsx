import { ArrowRight } from "lucide-react";
import type { CTARepeatedContent, GlobalTheme } from "@shared/schema";

interface CTARepeatedProps {
  content: CTARepeatedContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function CTARepeated({ content, theme, globalTheme }: CTARepeatedProps) {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-foreground font-heading">
          {content.title}
        </h2>
        <a
          href={content.cta.link}
          className="inline-flex items-center mt-6 text-primary font-semibold text-lg hover:underline group"
          data-testid="cta-repeated-link"
        >
          <span>{content.cta.text}</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}

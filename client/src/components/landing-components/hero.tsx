import type { HeroContent, GlobalTheme } from "@shared/schema";

interface HeroProps {
  content: HeroContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Hero({ content, theme, globalTheme }: HeroProps) {
  const renderVisual = () => {
    if (content.visual.type === "slider" && content.visual.slides) {
      return (
        <div className="mt-16 w-full max-w-4xl mx-auto">
          <img
            src={content.visual.slides[0].imageUrl}
            alt={content.visual.slides[0].altText}
            className="rounded-xl shadow-2xl w-full h-auto"
          />
        </div>
      );
    }
    
    if (content.visual.imageUrl) {
      return (
        <div className="mt-16 w-full max-w-4xl mx-auto">
          <img
            src={content.visual.imageUrl}
            alt={content.visual.altText || "Hero image"}
            className="rounded-xl shadow-2xl w-full h-auto"
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-heading">
          {content.headline}
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {content.subheadline}
        </p>
        <a
          href={content.ctaButton.link}
          className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity shadow-lg hover:scale-105 transform"
        >
          {content.ctaButton.text}
        </a>
        {renderVisual()}
      </div>
    </section>
  );
}

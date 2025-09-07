import type { SocialProofContent, GlobalTheme } from "@shared/schema";

interface SocialProofProps {
  content: SocialProofContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function SocialProof({ content, theme, globalTheme }: SocialProofProps) {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-6">
        <h3 className="text-center text-base font-semibold text-muted-foreground tracking-wider uppercase mb-10">
          {content.title}
        </h3>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-8">
          {content.clientLogos.map((client, index) => (
            <img
              key={index}
              src={client.logoUrl}
              alt={client.name}
              className="h-7 object-contain opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

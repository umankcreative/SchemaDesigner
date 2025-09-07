import type { AboutContent, GlobalTheme } from "@shared/schema";

interface AboutProps {
  content: AboutContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function About({ content, theme, globalTheme }: AboutProps) {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src={content.imageUrl}
              alt={content.title}
              className="rounded-xl shadow-2xl w-full"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-foreground font-heading">
              {content.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {content.subtitle}
            </p>
            
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground font-heading">
                  {content.mission.title}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {content.mission.text}
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground font-heading">
                  {content.vision.title}
                </h3>
                <p className="text-muted-foreground mt-2">
                  {content.vision.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { HorizontalScrollContent, GlobalTheme } from "@shared/schema";

interface HorizontalScrollProps {
  content: HorizontalScrollContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function HorizontalScroll({ content, theme, globalTheme }: HorizontalScrollProps) {
  return (
    <section className="overflow-hidden py-24">
      <div className="flex flex-nowrap">
        {content.cards.map((card, index) => (
          <div 
            key={index} 
            className={`panel w-screen h-screen flex flex-col justify-center items-center shrink-0 ${card.bgColor}`}
          >
            <div className="max-w-2xl text-center p-8">
              <h2 className={card.titleStyle}>
                {card.title}
              </h2>
              <p className={card.subtitleStyle}>
                {card.subtitle}
              </p>
              <div className="mt-8 max-w-md mx-auto">
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

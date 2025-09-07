import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FAQContent, GlobalTheme } from "@shared/schema";

interface FAQProps {
  content: FAQContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function FAQ({ content, theme, globalTheme }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="bg-accent/50 py-24">
      <div className="container mx-auto max-w-3xl px-6">
        <h2 className="text-4xl font-bold text-foreground text-center mb-12 font-heading">
          {content.title}
        </h2>
        
        <div className="space-y-4">
          {content.items.map((item, index) => {
            const isOpen = openItems.has(index);
            return (
              <div
                key={index}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <Button
                  variant="ghost"
                  className="w-full p-6 font-semibold text-lg text-left flex justify-between items-center hover:bg-accent/50 h-auto"
                  onClick={() => toggleItem(index)}
                  data-testid={`faq-question-${index}`}
                >
                  <span className="text-foreground pr-4">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </Button>
                
                {isOpen && (
                  <div 
                    className="px-6 pb-6 text-muted-foreground"
                    data-testid={`faq-answer-${index}`}
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

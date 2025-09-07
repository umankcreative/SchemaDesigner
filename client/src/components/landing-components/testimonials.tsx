import type { TestimonialsContent, GlobalTheme } from "@shared/schema";

interface TestimonialsProps {
  content: TestimonialsContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Testimonials({ content, theme, globalTheme }: TestimonialsProps) {
  return (
    <section className="bg-accent/50 py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-foreground text-center mb-16 font-heading">
          {content.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {content.testimonialList.map((testimonial, index) => (
            <div key={index} className="bg-background p-8 rounded-xl border border-border">
              <blockquote className="text-lg text-foreground italic mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <img
                  src={testimonial.photoUrl}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full mr-4"
                />
                <div>
                  <div className="font-bold text-foreground">{testimonial.name}</div>
                  <div className="text-muted-foreground">{testimonial.position}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

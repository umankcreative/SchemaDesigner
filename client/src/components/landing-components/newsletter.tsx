import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NewsletterContent, GlobalTheme } from "@shared/schema";

interface NewsletterProps {
  content: NewsletterContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Newsletter({ content, theme, globalTheme }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    // Newsletter subscription logic would go here
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="mb-8">
          <Mail className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-foreground font-heading">
            {content.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {content.subtitle}
          </p>
        </div>
        
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          data-testid="newsletter-form"
        >
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md border border-input focus:ring-2 focus:ring-ring focus:border-ring"
            required
            data-testid="input-newsletter-email"
          />
          <Button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:opacity-90 transition-opacity shadow-md whitespace-nowrap"
            data-testid="button-newsletter-submit"
          >
            {isSubmitting ? "Subscribing..." : content.cta.text}
          </Button>
        </form>
        
        <p className="text-xs text-muted-foreground mt-4">
          We respect your privacy and will never share your information.
        </p>
      </div>
    </section>
  );
}

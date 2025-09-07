import { ArrowRight } from "lucide-react";
import type { CTABannerContent, GlobalTheme } from "@shared/schema";

interface CTABannerProps {
  content: CTABannerContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function CTABanner({ content, theme, globalTheme }: CTABannerProps) {
  return (
    <section className="bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto py-20 text-center text-primary-foreground px-6 relative z-10">
        <h2 className="text-4xl font-extrabold mb-4 font-heading">
          {content.title}
        </h2>
        <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
          {content.description}
        </p>
        
        <a
          href={content.cta.link}
          className="inline-flex items-center bg-background text-primary px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform shadow-xl hover:shadow-2xl group"
          data-testid="cta-banner-button"
        >
          <span>{content.cta.text}</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
        
        <div className="mt-8 flex justify-center items-center space-x-8 text-primary-foreground/80">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm">14-day free trial</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

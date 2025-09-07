import type { NavigationContent, GlobalTheme } from "@shared/schema";

interface NavigationProps {
  content: NavigationContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Navigation({ content, theme, globalTheme }: NavigationProps) {
  return (
    <header className="bg-primary/10 backdrop-blur-lg border-b border-border sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4 px-6">
        <img 
          src={content.logoUrl} 
          alt="Logo" 
          className="h-8 md:h-9"
        />
        
        <div className="hidden md:flex items-center space-x-8">
          {content.navLinks.map((link, index) => (
            <a
              key={index}
              href={link.link}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.text}
            </a>
          ))}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={content.ctaButton.link}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-sm hover:shadow-lg hover:scale-105 transform"
          >
            {content.ctaButton.text}
          </a>
        </div>
        
        <button className="md:hidden p-2 text-foreground">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
}

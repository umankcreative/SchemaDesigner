import type { FooterContent, GlobalTheme } from "@shared/schema";

interface FooterProps {
  content: FooterContent;
  theme: Record<string, string>;
  globalTheme: GlobalTheme;
}

export default function Footer({ content, theme, globalTheme }: FooterProps) {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto py-16 px-6">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <img 
              src={content.logoUrl} 
              alt="Logo" 
              className="h-10 mb-4 brightness-0 invert"
            />
            <p className="text-sm max-w-xs text-background/80 mb-6">
              {content.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {content.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-10 h-10 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors"
                  data-testid={`social-link-${social.name.toLowerCase()}`}
                >
                  <span className="text-sm font-medium">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Link Groups */}
          {content.linkGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="font-semibold text-background mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.link}
                      className="text-background/80 hover:text-background transition-colors text-sm"
                      data-testid={`footer-link-${link.text.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-background/20 text-center">
          <p className="text-sm text-background/60">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}

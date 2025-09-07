import { Edit, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ComponentType, GlobalTheme } from "@shared/schema";
import Navigation from "@/components/landing-components/navigation";
import Hero from "@/components/landing-components/hero";
import Features from "@/components/landing-components/features";
import HowItWorks from "@/components/landing-components/how-it-works";
import SocialProof from "@/components/landing-components/social-proof";
import ProductShowcase from "@/components/landing-components/product-showcase";
import HorizontalScroll from "@/components/landing-components/horizontal-scroll";
import About from "@/components/landing-components/about";
import ProblemSolution from "@/components/landing-components/problem-solution";
import Comparison from "@/components/landing-components/comparison";
import Testimonials from "@/components/landing-components/testimonials";
import Pricing from "@/components/landing-components/pricing";
import FAQ from "@/components/landing-components/faq";
import Resources from "@/components/landing-components/resources";
import Integrations from "@/components/landing-components/integrations";
import Awards from "@/components/landing-components/awards";
import Newsletter from "@/components/landing-components/newsletter";
import CTABanner from "@/components/landing-components/cta-banner";
import CTARepeated from "@/components/landing-components/cta-repeated";
import Footer from "@/components/landing-components/footer";

interface ComponentPreviewProps {
  componentName: string;
  component: ComponentType;
  globalTheme: GlobalTheme;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
}

export default function ComponentPreview({
  componentName,
  component,
  globalTheme,
  isSelected,
  onSelect,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
}: ComponentPreviewProps) {
  const renderComponent = () => {
    const baseProps = { theme: component.theme, globalTheme };
    
    switch (componentName) {
      case 'navigation':
        return <Navigation content={component.content as any} {...baseProps} />;
      case 'hero':
        return <Hero content={component.content as any} {...baseProps} />;
      case 'features':
        return <Features content={component.content as any} {...baseProps} />;
      case 'howItWorks':
        return <HowItWorks content={component.content as any} {...baseProps} />;
      case 'socialProof':
        return <SocialProof content={component.content as any} {...baseProps} />;
      case 'productShowcase':
        return <ProductShowcase content={component.content as any} {...baseProps} />;
      case 'horizontalScroll':
        return <HorizontalScroll content={component.content as any} {...baseProps} />;
      case 'about':
        return <About content={component.content as any} {...baseProps} />;
      case 'problemSolution':
        return <ProblemSolution content={component.content as any} {...baseProps} />;
      case 'comparison':
        return <Comparison content={component.content as any} {...baseProps} />;
      case 'testimonials':
        return <Testimonials content={component.content as any} {...baseProps} />;
      case 'pricing':
        return <Pricing content={component.content as any} {...baseProps} />;
      case 'faq':
        return <FAQ content={component.content as any} {...baseProps} />;
      case 'resources':
        return <Resources content={component.content as any} {...baseProps} />;
      case 'integrations':
        return <Integrations content={component.content as any} {...baseProps} />;
      case 'awards':
        return <Awards content={component.content as any} {...baseProps} />;
      case 'newsletter':
        return <Newsletter content={component.content as any} {...baseProps} />;
      case 'ctaBanner':
        return <CTABanner content={component.content as any} {...baseProps} />;
      case 'ctaRepeated':
        return <CTARepeated content={component.content as any} {...baseProps} />;
      case 'footer':
        return <Footer content={component.content as any} {...baseProps} />;
      default:
        return (
          <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border">
            <p>Unknown component: {componentName}</p>
          </div>
        );
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to remove the ${componentName} component?`)) {
      onRemove();
    }
  };

  return (
    <div 
      className={`preview-component group relative ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}
      onClick={onSelect}
      data-testid={`component-preview-${componentName}`}
    >
      {/* Component Controls */}
      <div className="component-controls">
        <div className="bg-card border border-border rounded-md shadow-lg flex">
          <Button
            size="sm" 
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            title="Edit"
            data-testid={`button-edit-${componentName}`}
          >
            <Edit className="w-3 h-3" />
          </Button>
          
          {canMoveUp && (
            <Button
              size="sm" 
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              title="Move Up"
              data-testid={`button-move-up-${componentName}`}
            >
              <ArrowUp className="w-3 h-3" />
            </Button>
          )}
          
          {canMoveDown && (
            <Button
              size="sm" 
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              title="Move Down"
              data-testid={`button-move-down-${componentName}`}
            >
              <ArrowDown className="w-3 h-3" />
            </Button>
          )}
          
          <Button
            size="sm" 
            variant="ghost"
            onClick={handleRemove}
            title="Delete"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
            data-testid={`button-delete-${componentName}`}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Component Content */}
      {renderComponent()}
    </div>
  );
}

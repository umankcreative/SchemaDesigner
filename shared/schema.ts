import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const schemas = pgTable("schemas", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  content: jsonb("content").notNull(),
  createdAt: text("created_at").default(sql`now()`),
  updatedAt: text("updated_at").default(sql`now()`),
});

// Global theme schema
export const GlobalThemeSchema = z.object({
  colors: z.object({
    primary: z.string(),
    secondary: z.string(),
    background: z.string(),
    surface: z.string(),
    "text-base": z.string(),
    "text-muted": z.string(),
  }),
  fonts: z.object({
    heading: z.string(),
    body: z.string(),
  }),
});

// Component content schemas
export const NavigationContentSchema = z.object({
  logoUrl: z.string(),
  navLinks: z.array(z.object({
    text: z.string(),
    link: z.string(),
  })),
  ctaButton: z.object({
    text: z.string(),
    link: z.string(),
  }),
});

export const HeroContentSchema = z.object({
  headline: z.string(),
  subheadline: z.string(),
  ctaButton: z.object({
    text: z.string(),
    link: z.string(),
  }),
  visual: z.object({
    type: z.string(),
    slides: z.array(z.object({
      imageUrl: z.string(),
      altText: z.string(),
    })).optional(),
    imageUrl: z.string().optional(),
    altText: z.string().optional(),
  }),
});

export const FeaturesContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  featureList: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  })),
});

export const HowItWorksContentSchema = z.object({
  title: z.string(),
  steps: z.array(z.object({
    step: z.string(),
    title: z.string(),
    description: z.string(),
  })),
});

export const SocialProofContentSchema = z.object({
  title: z.string(),
  clientLogos: z.array(z.object({
    name: z.string(),
    logoUrl: z.string(),
  })),
});

export const ProductShowcaseContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  showcases: z.array(z.object({
    imageUrl: z.string(),
    title: z.string(),
    description: z.string(),
    features: z.array(z.string()),
  })),
});

export const HorizontalScrollContentSchema = z.object({
  cards: z.array(z.object({
    title: z.string(),
    subtitle: z.string(),
    bgColor: z.string(),
    titleStyle: z.string(),
    subtitleStyle: z.string(),
    imgSrc: z.string(),
  })),
});

export const AboutContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  imageUrl: z.string(),
  mission: z.object({
    title: z.string(),
    text: z.string(),
  }),
  vision: z.object({
    title: z.string(),
    text: z.string(),
  }),
});

export const ProblemSolutionContentSchema = z.object({
  title: z.string(),
  items: z.array(z.object({
    problem: z.object({
      title: z.string(),
      description: z.string(),
    }),
    solution: z.object({
      title: z.string(),
      description: z.string(),
    }),
  })),
});

export const ComparisonContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  headers: z.array(z.string()),
  rows: z.array(z.object({
    feature: z.string(),
    values: z.array(z.union([z.boolean(), z.string()])),
  })),
});

export const TestimonialsContentSchema = z.object({
  title: z.string(),
  testimonialList: z.array(z.object({
    name: z.string(),
    position: z.string(),
    photoUrl: z.string(),
    quote: z.string(),
  })),
});

export const PricingContentSchema = z.object({
  title: z.string(),
  plans: z.array(z.object({
    name: z.string(),
    price: z.string(),
    features: z.array(z.string()),
    isPopular: z.boolean(),
    cta: z.object({
      text: z.string(),
      link: z.string(),
    }),
  })),
});

export const FAQContentSchema = z.object({
  title: z.string(),
  items: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
});

export const ResourcesContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  items: z.array(z.object({
    imageUrl: z.string(),
    category: z.string(),
    title: z.string(),
    link: z.string(),
  })),
});

export const IntegrationsContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  logos: z.array(z.object({
    name: z.string(),
    logoUrl: z.string(),
  })),
});

export const AwardsContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  items: z.array(z.object({
    logoUrl: z.string(),
    name: z.string(),
    description: z.string(),
  })),
});

export const NewsletterContentSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  cta: z.object({
    text: z.string(),
    link: z.string(),
  }),
});

export const CTABannerContentSchema = z.object({
  title: z.string(),
  description: z.string(),
  cta: z.object({
    text: z.string(),
    link: z.string(),
  }),
});

export const CTARepeatedContentSchema = z.object({
  title: z.string(),
  cta: z.object({
    text: z.string(),
    link: z.string(),
  }),
});

export const FooterContentSchema = z.object({
  logoUrl: z.string(),
  description: z.string(),
  socialLinks: z.array(z.object({
    name: z.string(),
    link: z.string(),
  })),
  linkGroups: z.array(z.object({
    title: z.string(),
    links: z.array(z.object({
      text: z.string(),
      link: z.string(),
    })),
  })),
  copyright: z.string(),
});

// Component schema
export const ComponentSchema = z.object({
  content: z.union([
    NavigationContentSchema,
    HeroContentSchema,
    FeaturesContentSchema,
    HowItWorksContentSchema,
    SocialProofContentSchema,
    ProductShowcaseContentSchema,
    HorizontalScrollContentSchema,
    AboutContentSchema,
    ProblemSolutionContentSchema,
    ComparisonContentSchema,
    TestimonialsContentSchema,
    PricingContentSchema,
    FAQContentSchema,
    ResourcesContentSchema,
    IntegrationsContentSchema,
    AwardsContentSchema,
    NewsletterContentSchema,
    CTABannerContentSchema,
    CTARepeatedContentSchema,
    FooterContentSchema,
  ]),
  theme: z.record(z.string()),
});

// Main schema
export const LandingPageSchema = z.object({
  globalTheme: GlobalThemeSchema,
  components: z.record(ComponentSchema),
});

export const insertSchemaSchema = createInsertSchema(schemas).pick({
  name: true,
  content: true,
});

export type InsertSchema = z.infer<typeof insertSchemaSchema>;
export type Schema = typeof schemas.$inferSelect;
export type GlobalTheme = z.infer<typeof GlobalThemeSchema>;
export type LandingPageSchemaType = z.infer<typeof LandingPageSchema>;
export type ComponentType = z.infer<typeof ComponentSchema>;

// Component type definitions
export type NavigationContent = z.infer<typeof NavigationContentSchema>;
export type HeroContent = z.infer<typeof HeroContentSchema>;
export type FeaturesContent = z.infer<typeof FeaturesContentSchema>;
export type HowItWorksContent = z.infer<typeof HowItWorksContentSchema>;
export type SocialProofContent = z.infer<typeof SocialProofContentSchema>;
export type ProductShowcaseContent = z.infer<typeof ProductShowcaseContentSchema>;
export type HorizontalScrollContent = z.infer<typeof HorizontalScrollContentSchema>;
export type AboutContent = z.infer<typeof AboutContentSchema>;
export type ProblemSolutionContent = z.infer<typeof ProblemSolutionContentSchema>;
export type ComparisonContent = z.infer<typeof ComparisonContentSchema>;
export type TestimonialsContent = z.infer<typeof TestimonialsContentSchema>;
export type PricingContent = z.infer<typeof PricingContentSchema>;
export type FAQContent = z.infer<typeof FAQContentSchema>;
export type ResourcesContent = z.infer<typeof ResourcesContentSchema>;
export type IntegrationsContent = z.infer<typeof IntegrationsContentSchema>;
export type AwardsContent = z.infer<typeof AwardsContentSchema>;
export type NewsletterContent = z.infer<typeof NewsletterContentSchema>;
export type CTABannerContent = z.infer<typeof CTABannerContentSchema>;
export type CTARepeatedContent = z.infer<typeof CTARepeatedContentSchema>;
export type FooterContent = z.infer<typeof FooterContentSchema>;

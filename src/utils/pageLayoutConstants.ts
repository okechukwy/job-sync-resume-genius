// Page layout configurations for different page types
export const PAGE_LAYOUTS = {
  // Full width pages (no max-width constraints)
  FULL_WIDTH: {
    maxWidth: "none" as const,
    padding: "none"
  },
  
  // Standard dashboard pages
  DASHBOARD: {
    maxWidth: "7xl" as const,
    padding: "standard"
  },
  
  // Content-focused pages (articles, forms)
  CONTENT: {
    maxWidth: "4xl" as const,
    padding: "standard"
  },
  
  // Landing pages and marketing content
  MARKETING: {
    maxWidth: "6xl" as const,
    padding: "responsive"
  }
} as const;

export type PageLayoutType = keyof typeof PAGE_LAYOUTS;
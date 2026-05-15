export const JOB_CATEGORIES = [
  "Design",
  "Cleaning",
  "Delivery & errands",
  "Moving & lifting",
  "Admin & data",
  "Creative",
  "Tech & web",
  "Events",
  "Tutoring",
  "Other",
] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];

export const SUBCATEGORIES: Record<(typeof JOB_CATEGORIES)[number], readonly string[]> = {
  Design: ["Graphic design", "UI & UX", "Branding", "Print"],
  Cleaning: ["Home", "Office", "Deep clean", "End of tenancy"],
  "Delivery & errands": ["Same-day", "Shopping", "Courier", "Food"],
  "Moving & lifting": ["Furniture", "Small moves", "Heavy lifting", "Assembly"],
  "Admin & data": ["Data entry", "VA", "Scheduling", "Bookkeeping"],
  Creative: ["Photography", "Video", "Writing", "Social content"],
  "Tech & web": ["Websites", "Debugging", "Setup", "Automation"],
  Events: ["Staffing", "Setup", "Hosting help", "Catering assist"],
  Tutoring: ["Academic", "Languages", "Music", "Driving theory"],
  Other: ["General"],
};

export function subcategoriesFor(category: string): readonly string[] {
  const entry = SUBCATEGORIES[category as JobCategory];
  return entry ?? SUBCATEGORIES.Other;
}

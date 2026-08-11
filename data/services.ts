export const serviceSlugs = [
  "home-cleaning",
  "deep-cleaning",
  "office-cleaning",
  "airbnb-cleaning",
  "move-in-out-cleaning",
  "post-renovation-cleaning",
  "carpet-cleaning",
  "upholstery-cleaning",
  "window-cleaning",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceIcons = ["home", "building", "key", "truck", "sofa", "sparkles"] as const;

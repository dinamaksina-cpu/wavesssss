export type PriceCategory = "general" | "airbnb" | "specialty" | "bundle";

export interface PriceItem {
  id: string;
  category: PriceCategory;
  price: string;
  unit?: string;
  value?: string;
  options?: Array<{
    price: string;
    unit: "window" | "room" | "property";
    from?: boolean;
    description?: "individualWindows" | "fullWindows" | "fullCarpet";
  }>;
}

export const pricing: PriceItem[] = [
  { id: "regular", category: "general", price: "€45" },
  { id: "deep", category: "general", price: "€125" },
  { id: "renovation", category: "general", price: "€180" },
  { id: "office", category: "general", price: "€45" },
  { id: "studio", category: "airbnb", price: "€40" },
  { id: "twoBed", category: "airbnb", price: "€55" },
  { id: "threeBed", category: "airbnb", price: "€70" },
  { id: "oven", category: "specialty", price: "€20" },
  { id: "fridge", category: "specialty", price: "€15" },
  { id: "windows", category: "specialty", price: "€5", options: [
    { price: "€5", unit: "window", description: "individualWindows" },
    { price: "€45", unit: "property", from: true, description: "fullWindows" },
  ] },
  { id: "carpet", category: "specialty", price: "€30", options: [
    { price: "€30", unit: "room", from: true },
    { price: "€45", unit: "property", from: true, description: "fullCarpet" },
  ] },
  { id: "sofa", category: "specialty", price: "€39.99" },
  { id: "car", category: "specialty", price: "quote" },
  { id: "kitchen", category: "bundle", price: "€30", value: "€35" },
];

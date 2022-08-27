import { Tuple, DefaultMantineColor } from "@mantine/core";

type ExtendedCustomColors = "techBlue" | "businessGreen" | "educationPurple" | "primaryColor" | DefaultMantineColor;

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>;
  }
}

export const techBlue: Tuple<string, 10> = [
  "#e4eeff",
  "#b7cdfa",
  "#89acf4",
  "#5c8bf0",
  "#326aec",
  "#1e50d2",
  "#153ea4",
  "#0e2d76",
  "#051b48",
  "#00091c"
];

export const businessGreen: Tuple<string, 10> = [
  "#e2fff3",
  "#b9f8de",
  "#8ff2c8",
  "#64eeb2",
  "#3ee99d",
  "#2bd083",
  "#20a167",
  "#157449",
  "#07462b",
  "#00180c"
];

export const educationPurple: Tuple<string, 10> = [
  "#fbe6ff",
  "#e9b7fa",
  "#d988f5",
  "#cb5af1",
  "#bc2dee",
  "#a317d4",
  "#7e11a5",
  "#5a0b77",
  "#370548",
  "#14011b"
];

export const primaryColor: Tuple<string, 10> = [
  "#f9ecfd",
  "#e2cae8",
  "#cca9d6",
  "#b786c4",
  "#a365b3",
  "#894b99",
  "#6b3a78",
  "#4d2956",
  "#2f1835",
  "#120616"
];

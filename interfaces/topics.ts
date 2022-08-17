import { MantineColor } from "@mantine/core";

export type Topics = "entertainment" | "technology" | "business" | "art" | "education" | "sports" | "fashion";
export interface Data {
  key: Topics;
  value: MantineColor;
}

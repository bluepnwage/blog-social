import { MantineColor } from "@mantine/core";

export type Topics =
  | "entertainment"
  | "technology"
  | "business"
  | "art"
  | "education"
  | "sports"
  | "fashion"
  | "other"
  | "";

export interface Data {
  key: Topics;
  value: MantineColor;
}
export type FilterTypes = "popular" | "recent" | "least popular" | "oldest" | "";

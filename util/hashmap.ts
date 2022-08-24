import { MantineColor } from "@mantine/core";
import { Topics } from "@interfaces/blogs";

const colors = new Map<Topics, MantineColor>();

colors.set("education", "green");
colors.set("technology", "blue");
colors.set("sports", "orange");
colors.set("fashion", "cyan");
colors.set("art", "yellow");
colors.set("business", "grape");
colors.set("entertainment", "pink");
export default colors;

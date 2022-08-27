import { MantineColor } from "@mantine/core";
import { Topics } from "@interfaces/blogs";

const colors = new Map<Topics, MantineColor>();

colors.set("education", "educationPurple");
colors.set("technology", "techBlue");
colors.set("sports", "orange");
colors.set("fashion", "cyan");
colors.set("art", "yellow");
colors.set("business", "businessGreen");
colors.set("entertainment", "pink");
export default colors;

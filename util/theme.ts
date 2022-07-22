import { MantineTheme } from "@mantine/core";

export function checkTheme<T>(theme: MantineTheme, val1: T, val2: T) {
  return theme.colorScheme === "light" ? val1 : val2;
}

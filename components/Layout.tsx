import { ReactNode } from "react";
import { MantineProvider, ColorSchemeProvider, Paper, ColorScheme } from "@mantine/core";
import { useState } from "react";
import { checkTheme } from "util/theme";
import Header from "./Header";

interface PropTypes {
  children: ReactNode;
}

export default function Layout({ children }: PropTypes) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleTheme}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily: "PT Sans, Segoe UI, serif",
            headings: { fontFamily: "Segoe UI, sans-serif" }
          }}
        >
          <Header onToggle={toggleTheme} />
          <Paper
            sx={(theme) => ({
              backgroundColor: checkTheme(theme, theme.colors.gray[0], ""),
              minHeight: "100vh",
              transition: "all 250ms ease-out"
            })}
            component={"main"}
          >
            {children}
          </Paper>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

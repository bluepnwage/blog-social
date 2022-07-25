import Header from "./Header";
import { MantineProvider, ColorSchemeProvider, Paper, ColorScheme } from "@mantine/core";
import { checkTheme } from "util/theme";
import { ReactNode, lazy, Suspense, useState } from "react";

const Footer = lazy(() => import("./Footer"));

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
          <Header />
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
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
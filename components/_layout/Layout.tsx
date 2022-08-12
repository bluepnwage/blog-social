import Header from "./Header";
import { MantineProvider, ColorSchemeProvider, Paper, ColorScheme, useMantineTheme } from "@mantine/core";
import { checkTheme } from "@util/theme";
import { ReactNode, lazy, Suspense, useState, useEffect } from "react";
import { setCookie } from "cookies-next";

const Footer = lazy(() => import("./Footer"));

interface PropTypes {
  children: ReactNode;
  colorScheme: ColorScheme;
}

export default function Layout({ children, colorScheme: currentColorScheme }: PropTypes) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(currentColorScheme);
  const theme = useMantineTheme();

  useEffect(() => {
    const html = document.documentElement;
    html.className = colorScheme;
    setCookie("mantine-color-scheme", colorScheme, { maxAge: 60 * 60 * 24 * 30 });
  }, [colorScheme]);

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
            headings: { fontFamily: "Segoe UI, sans-serif" },
            breakpoints: { ...theme.breakpoints, sm: 820, md: 1100 }
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

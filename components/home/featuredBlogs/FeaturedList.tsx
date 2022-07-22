import { Title } from "@mantine/core";
import { useStyles } from "./styles";

export function FeaturedList() {
  const { classes, cx } = useStyles();
  return (
    <>
      <section className="section-container">
        <header>
          <Title order={2}>Hello there</Title>
        </header>
      </section>
    </>
  );
}

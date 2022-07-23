import { Title } from "@mantine/core";
import { useStyles } from "./styles";

export function BlogTitle() {
  const { classes } = useStyles();
  return (
    <header className={classes.container}>
      <Title order={1}>Fugiat amet quis reprehenderit nulla do laborum labore ullamco aliqua cillum.</Title>
    </header>
  );
}

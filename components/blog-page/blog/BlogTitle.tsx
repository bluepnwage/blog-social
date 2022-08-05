import { Title } from "@mantine/core";
import { useStyles } from "./styles";

interface PropTypes {
  heading: string;
}

export function BlogTitle({ heading }: PropTypes) {
  const { classes } = useStyles();
  return (
    <header className={classes.container}>
      <Title order={1}>{heading}</Title>
    </header>
  );
}

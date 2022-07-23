import { useStyles } from "./styles";
import { Image, Text } from "@mantine/core";

export function BlogImage() {
  const { classes, cx } = useStyles();
  return (
    <>
      <figure className={cx(classes.container, classes.imageContainer)}>
        <Image width={"100%"} height={"100%"} alt={"Blog thumbnail"} src={"/painting.jpg"} />
      </figure>
      <Text className={classes.container} color={"dimmed"} component="p">
        Velit ad nulla laboris esse do. Sunt voluptate commodo ea ipsum irure duis occaecat irure cillum reprehenderit.
        Ea veniam eu excepteur dolore esse Lorem minim enim id cillum ea occaecat Lorem. Officia tempor in aliqua nulla
        ut qui duis.
      </Text>
    </>
  );
}

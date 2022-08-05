import { useStyles } from "./styles";
import { Image, Text } from "@mantine/core";

interface PropTypes {
  image: string;
  description: string;
}

export function BlogImage({ image, description }: PropTypes) {
  const { classes, cx } = useStyles();
  return (
    <>
      <figure className={cx(classes.container, classes.imageContainer)}>
        <Image width={"100%"} height={"100%"} alt={"Blog thumbnail"} src={image} />
      </figure>
      <Text className={cx(classes.container, classes.dimmedText)} component="p">
        {description}
      </Text>
    </>
  );
}

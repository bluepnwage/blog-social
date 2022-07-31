import { Image, Text } from "@mantine/core";
import { useStyles } from "./styles";
interface PropTypes {
  src: string;
}
export function ImagePreview({ src }: PropTypes) {
  const { classes } = useStyles();
  return (
    <>
      <figure className={classes.imagePreviewContainer}>
        <Image
          placeholder={<Text component="p">Upload image to see it displayed here</Text>}
          withPlaceholder
          src={src}
          alt={""}
          width={"100%"}
          height={"100%"}
        />
      </figure>
    </>
  );
}

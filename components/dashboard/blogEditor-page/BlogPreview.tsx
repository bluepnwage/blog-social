import { Text, Image, Title, TypographyStylesProvider } from "@mantine/core";

interface PropTypes {
  thumbnail: string;
  heading: string;
  content: string;
  description: string;
}

export function BlogPreview({ content, heading, thumbnail, description }: PropTypes) {
  return (
    <>
      <Title my={"xl"} order={2}>
        {heading}
      </Title>
      <figure>
        <Image alt={"Blog thumbnail"} src={thumbnail} imageProps={{ loading: "lazy" }} />
      </figure>
      <Text component="p" mt={"md"}>
        {description}
      </Text>
      <TypographyStylesProvider>
        <article dangerouslySetInnerHTML={{ __html: content }}></article>
      </TypographyStylesProvider>
    </>
  );
}

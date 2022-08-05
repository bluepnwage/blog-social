import { Divider, TypographyStylesProvider } from "@mantine/core";
import { useStyles } from "./styles";

interface PropTypes {
  content: string;
}

export function BlogArticle({ content }: PropTypes) {
  const { classes, cx } = useStyles();
  return (
    <>
      <article className={cx(classes.container, classes.article)}>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
        </TypographyStylesProvider>
      </article>
      <Divider mb={"xl"} className={classes.container} />
    </>
  );
}

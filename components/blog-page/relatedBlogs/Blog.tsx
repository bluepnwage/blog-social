import Link from "next/link";
import { Image, Text, Title, Anchor } from "@mantine/core";
import { useStyles } from "./styles";
import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
}

export function Blog({ children }: PropTypes) {
  const { classes, cx } = useStyles();
  const link = Math.floor(Math.random() * 1500);
  return (
    <>
      <div className={cx(classes.container, classes.articleContainer)}>
        <article>
          <Text component="time" color={"dimmed"}>
            Jul 21, 2022
          </Text>
          <Title mt={"xs"} mb={"md"} order={3}>
            Aliquip id ullamco cillum exercitation Lorem amet in ea nostrud dolor do.
          </Title>
          <Text mb={"sm"} component="p">
            Laborum dolore id culpa eu. Esse elit ut aliquip est sit exercitation amet aliqua. Minim deserunt proident
            minim cillum reprehenderit laborum in laboris amet sunt velit.
          </Text>
          <Link href={`/blogs/${link}`} passHref>
            <Anchor>Read article</Anchor>
          </Link>
        </article>
        <figure className={classes.imageContainer}>
          <Image
            src={"/underworld.jpg"}
            width={"100%"}
            height={"100%"}
            imageProps={{ loading: "lazy" }}
            alt={"Painting of the underworld"}
          />
        </figure>
      </div>
      {children}
    </>
  );
}

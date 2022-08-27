import Link from "next/link";
import { Title, Image, Text, Button } from "@mantine/core";
import { useStyles } from "./styles";

export function Hero() {
  const { classes, cx } = useStyles();
  return (
    <>
      <section className={cx(classes.heroContainer, "section-container")}>
        <div className={cx("container", classes.container)}>
          <div className={classes.descriptionContainer}>
            <Title mb={"md"} order={1}>
              Share your ideas with the world
            </Title>
            <Text color={"dark"} component="p" mb={"md"}>
              Aliqua adipisicing Lorem aliqua voluptate nisi minim eiusmod irure aute. Amet aliquip non sunt esse est
              dolor anim. Aliqua consequat incididunt velit Lorem id dolore adipisicing voluptate minim officia ad
              incididunt. Officia qui esse eiusmod mollit ad aliqua amet Lorem labore aute nulla minim ut magna.
            </Text>
            <Link href={"/dashboard"} passHref>
              <Button className={classes.btn} component="a" size="lg" radius={"xl"} >
                Get Started
              </Button>
            </Link>
          </div>
          <figure className={classes.imageContainer}>
            <Image style={{ transform: "scale(0.8)" }} src={"/article-amico.svg"} alt={"Team working on blog"} />
          </figure>
        </div>
        <div className="custom-shape-divider-bottom-1658446700">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className={classes.shapeFill}
            ></path>
          </svg>
        </div>
      </section>
    </>
  );
}

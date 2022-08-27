import { SimpleGrid, Card, Title, Image } from "@mantine/core";
import { useStyles } from "./styles";
import Link from "next/link";

export function TopicList() {
  const { classes, cx } = useStyles();
  return (
    <>
      <section className="section-container">
        <Title mb={"xl"} order={2}>
          Popular Topics
        </Title>

        <SimpleGrid mb={90} cols={3} className="container">
          <Link href={"/blogs?topic=technology"}>
            <a>
              <Card className={cx(classes.tech, classes.card)}>
                <Title align="center" order={3}>
                  Technology
                </Title>
                <figure>
                  <Image className={classes.image} src={"/www-amico.svg"} alt={""} />
                </figure>
              </Card>
            </a>
          </Link>
          <Link href={"/blogs?topic=business"}>
            <a>
              <Card className={cx(classes.finance, classes.card)}>
                <Title align="center" order={3}>
                  Business
                </Title>
                <figure>
                  <Image className={classes.image} src={"/Finance-amico.svg"} alt={""} />
                </figure>
              </Card>
            </a>
          </Link>
          <Link href={"/blogs?topic=education"}>
            <a>
              <Card className={cx(classes.education, classes.card)}>
                <Title align="center" order={3}>
                  Education
                </Title>
                <figure>
                  <Image className={classes.image} src={"/High School-amico.svg"} alt={""} />
                </figure>
              </Card>
            </a>
          </Link>
        </SimpleGrid>
      </section>
    </>
  );
}

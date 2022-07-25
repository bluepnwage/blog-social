import { Divider, Title } from "@mantine/core";
import { useStyles } from "./styles";
import { Blog } from "./Blog";

export default function RelatedList() {
  const { classes, cx } = useStyles();
  const related = Array(5).fill(null);
  return (
    <>
      <section className={cx("section-container", classes.sectionContainer)}>
        <header className={classes.container}>
          <Title mb={"xl"} order={2}>
            Related Blogs
          </Title>
        </header>
        {related.map((_, key) => {
          const notLast = key !== related.length - 1;
          return <Blog key={key}>{notLast && <Divider className={classes.container} my={"xl"} />}</Blog>;
        })}
      </section>
    </>
  );
}

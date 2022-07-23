import { Divider, Text } from "@mantine/core";
import { useStyles } from "./styles";

export function BlogArticle() {
  const { classes, cx } = useStyles();
  return (
    <>
      <article className={cx(classes.container, classes.article)}>
        <Text component="p">
          Tempor enim minim tempor id cupidatat exercitation ut do occaecat. Non nisi nulla velit ex do nisi sunt ut.
          Officia sunt cupidatat veniam aute. Eu eiusmod pariatur pariatur fugiat esse officia qui ea est. Elit
          exercitation dolor excepteur dolore irure officia labore exercitation aute tempor. Culpa do irure ex ipsum id
          officia. Sit ut non culpa sit laboris dolor adipisicing veniam eu non magna. Sint duis laborum fugiat dolor
          consectetur nisi do nulla ad nisi veniam. Elit reprehenderit nostrud incididunt qui officia est. Laborum
          exercitation laborum commodo eu. Elit nulla tempor sit sunt aliqua eu dolore sint qui sint exercitation dolor
          aliqua ipsum. Esse anim irure voluptate dolore incididunt irure. Exercitation enim proident aliqua eu.
          Occaecat incididunt aute commodo fugiat dolore deserunt dolor est qui aliqua laborum officia adipisicing
          reprehenderit. Nisi qui officia esse amet. Irure aliquip elit id elit in aute anim.
        </Text>
        <Text component="p" my={"md"}>
          Cillum mollit dolore laboris ea consectetur officia voluptate aliquip proident incididunt fugiat magna tempor.
          Do occaecat id in in adipisicing in. Quis velit irure duis aute eiusmod non ut est consectetur sint ullamco
          Lorem. Aliquip fugiat est occaecat minim in mollit deserunt mollit Lorem non consectetur. Laboris qui laboris
          id Lorem enim ad sint ea adipisicing reprehenderit non ad. Exercitation consequat amet amet veniam excepteur
          nulla qui proident. Commodo enim tempor ex quis ut qui. Aliqua occaecat officia aliquip tempor irure qui duis
          est.
        </Text>
        <Text component="p">
          Ipsum qui ipsum eu sunt incididunt consequat aliqua qui. Veniam voluptate consequat sint minim pariatur anim
          ipsum anim magna cillum. Lorem nostrud mollit et non nostrud dolore aliquip ipsum. Adipisicing reprehenderit
          minim consectetur ut amet aliquip tempor labore anim ex aliqua nostrud sit sit.
        </Text>
      </article>
      <Divider mb={"xl"} className={classes.container} />
    </>
  );
}

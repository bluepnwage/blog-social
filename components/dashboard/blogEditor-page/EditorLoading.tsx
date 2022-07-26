import { Title, Loader } from "@mantine/core";
import { useStyles } from "./styles";

export function EditorLoading() {
  const { classes, cx } = useStyles();
  return (
    <>
      <div className={cx(classes.container, classes.flex)}>
        <Title mb={"sm"} order={1}>
          Loading Editor
        </Title>
        <Loader />
      </div>
    </>
  );
}

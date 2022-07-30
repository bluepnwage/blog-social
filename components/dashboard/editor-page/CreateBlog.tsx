import { Card, ActionIcon, Text } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { useStyles } from "./styles";
import { useDisclosure } from "@mantine/hooks";
import { Suspense, lazy } from "react";

const Modal = lazy(() => import("./CreateBlogModal"));

export function CreateBlog() {
  const { classes, cx } = useStyles();
  const [opened, handler] = useDisclosure(false);
  return (
    <>
      <Suspense fallback={null}>
        <Modal opened={opened} onClose={handler.close} />
      </Suspense>
      <Card className={cx(classes.flex, classes.createBlog)}>
        <Text size={28} component="span" weight={500}>
          Create blog
        </Text>
        <ActionIcon
          onClick={handler.open}
          component="button"
          radius={"xl"}
          size={"lg"}
          color={"blue"}
          variant={"light"}
        >
          <Plus />
        </ActionIcon>
      </Card>
    </>
  );
}

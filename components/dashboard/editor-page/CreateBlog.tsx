import Link from "next/link";
import { Card, ActionIcon, Text } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { useStyles } from "./styles";

export function CreateBlog() {
  const { classes, cx } = useStyles();
  return (
    <>
      <Card className={cx(classes.flex, classes.createBlog)}>
        <Text size={28} component="span" weight={500}>
          Create blog
        </Text>
        <Link href={"/dashboard/bluepnwage/editor/1"} passHref>
          <ActionIcon component="a" radius={"xl"} size={"lg"} color={"blue"} variant={"light"}>
            <Plus />
          </ActionIcon>
        </Link>
      </Card>
    </>
  );
}
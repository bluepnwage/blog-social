import { ActionIcon, Group, Indicator } from "@mantine/core";
import { HeartPlus, Share } from "tabler-icons-react";
import { formatNum } from "util/formatNum";
import { useStyles } from "./styles";

export default function BlogStats() {
  const { classes, theme } = useStyles();
  return (
    <>
      <Group mb={theme.spacing.xl * 2.5} position="apart" className={classes.container}>
        <Indicator color={"red"} size={16} inline label={formatNum(652358)}>
          <ActionIcon color={"red"}>
            <HeartPlus />
          </ActionIcon>
        </Indicator>
        <ActionIcon>
          <Share />
        </ActionIcon>
      </Group>
    </>
  );
}

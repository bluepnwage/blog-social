import { ActionIcon, Group, Indicator } from "@mantine/core";
import { HeartPlus, Share } from "tabler-icons-react";
import { formatNum } from "util/formatNum";
import { useStyles } from "./styles";

interface PropTypes {
  likes: number;
}

export default function BlogStats({ likes }: PropTypes) {
  const { classes, theme } = useStyles();
  return (
    <>
      <Group mb={theme.spacing.xl * 2.5} position="apart" className={classes.container}>
        <Indicator color={"red"} size={16} inline label={formatNum(likes)}>
          <ActionIcon title="Total likes" color={"red"}>
            <HeartPlus />
          </ActionIcon>
        </Indicator>
        <ActionIcon title="Share this blog">
          <Share />
        </ActionIcon>
      </Group>
    </>
  );
}

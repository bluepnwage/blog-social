import { SimpleGrid } from "@mantine/core";
import { File, Heart } from "tabler-icons-react";
import { StatCard, PropTypes as StatCardProps } from "./StatCard";
import { useStyles } from "./styles";

interface PropTypes {
  count: number;
  likes: number;
}

export function StatList({ count, likes }: PropTypes) {
  const { classes, cx } = useStyles();
  const stats: StatCardProps[] = [
    {
      icon: <File />,
      statAmount: count,
      statTitle: "Total Blogs",
      secondaryStat: "#2 most blogs"
    },
    {
      icon: <Heart />,
      statAmount: likes,
      secondaryStat: "#2 most likes",
      statTitle: "Total likes"
    }
  ];

  return (
    <>
      <SimpleGrid cols={2} className={cx("container", classes.grid)}>
        {stats.map((stat, key) => (
          <StatCard key={key} {...stat} />
        ))}
      </SimpleGrid>
    </>
  );
}

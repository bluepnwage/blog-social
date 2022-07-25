import { SimpleGrid } from "@mantine/core";
import { File, Heart, FilePencil, TrendingUp } from "tabler-icons-react";
import { StatCard, PropTypes as StatCardProps } from "./StatCard";
import { useStyles } from "./styles";

export function StatList() {
  const { classes, cx } = useStyles();
  const stats: StatCardProps[] = [
    {
      icon: <File />,
      statAmount: 26,
      statTitle: "Total Blogs",
      secondaryStat: "#2 most blogs"
    },
    {
      icon: <Heart />,
      statAmount: 25493,
      secondaryStat: "#2 most likes",
      statTitle: "Total likes"
    },
    {
      icon: <FilePencil />,
      statAmount: 15006,
      statTitle: "Average Word Count Per Blog",
      secondaryStat: "#2 highest average word count"
    },
    {
      icon: <TrendingUp />,
      statAmount: 8387908,
      secondaryStat: "#2 highest word count",
      statTitle: "Total Word Count"
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

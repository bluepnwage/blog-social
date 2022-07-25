import { Card, Text, ThemeIcon } from "@mantine/core";
import { ReactNode } from "react";
import { useStyles } from "./styles";
import { formatNum } from "@util/formatNum";

export interface PropTypes {
  icon: ReactNode;
  statAmount: number;
  statTitle: string;
  secondaryStat: string;
}

export function StatCard({ icon, statAmount, statTitle, secondaryStat }: PropTypes) {
  const { classes, cx } = useStyles();
  return (
    <>
      <Card shadow={"sm"}>
        <Text component="strong" color={"dimmed"}>
          {statTitle}
        </Text>
        <div className={cx(classes.flex, classes.iconContainer)}>
          <ThemeIcon size={"xl"} variant="light" radius={"xl"}>
            {icon}
          </ThemeIcon>
        </div>
        <div className={cx(classes.flex, classes.statAmountContainer)}>
          <Text size={64} component="strong">
            {formatNum(statAmount)}
          </Text>
        </div>
        <div>
          <Text component="span">{secondaryStat}</Text>
        </div>
      </Card>
    </>
  );
}

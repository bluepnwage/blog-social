import { Title, Select, Divider } from "@mantine/core";
import { useStyles } from "./styles";
import { useState } from "react";

export function Filters() {
  const { classes, cx } = useStyles();
  const [filter, setFilter] = useState("popular");

  const filterType = filter.slice(0, 1).toUpperCase() + filter.slice(1);

  return (
    <>
      <div className={cx(classes.flex, "container", classes.filterContainer)}>
        <header>
          <Title mb={"md"} order={1}>
            Most {filterType} Blogs
          </Title>
        </header>
        <Select
          onChange={setFilter}
          value={filter}
          width={100}
          data={[
            { value: "popular", label: "Most Popular" },
            { value: "recent", label: "Most Recent" }
          ]}
        />
      </div>
      <Divider mb={44} className={"container"} />
    </>
  );
}

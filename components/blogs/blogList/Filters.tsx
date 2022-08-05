import { Title, Select, Divider } from "@mantine/core";
import { useStyles } from "./styles";

interface PropTypes {
  filter: string;
  onChange: (value: string) => void;
}

export function Filters({ filter, onChange }: PropTypes) {
  const { classes, cx } = useStyles();

  const filterType = filter.slice(0, 1).toUpperCase() + filter.slice(1);

  return (
    <>
      <div className={cx(classes.flex, "container", classes.filterContainer)}>
        <header>
          <Title mb={"md"} order={1}>
            {filterType} Blogs
          </Title>
        </header>
        <Select
          onChange={onChange}
          value={filter}
          width={100}
          data={[
            { value: "popular", label: "Most Popular" },
            { value: "recent", label: "Most Recent" },
            { value: "least popular", label: "Least Popular" }
          ]}
        />
      </div>
      <Divider mb={44} className={"container"} />
    </>
  );
}

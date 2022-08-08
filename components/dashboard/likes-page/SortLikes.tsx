import { Select } from "@mantine/core";
import { useStyles } from "./styles";

interface PropTypes {
  value: string;
  onChange: (value: string) => void;
}

export function SortLikes({ value, onChange }: PropTypes) {
  const { classes } = useStyles();
  return (
    <>
      <Select
        className={classes.selectInput}
        value={value}
        onChange={onChange}
        data={[
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" }
        ]}
      />
    </>
  );
}

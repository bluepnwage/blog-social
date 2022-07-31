import { TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useStyles } from "./styles";

interface PropTypes {
  onFilter: (string: string) => void;
  filter: string;
}

export function SearchBlog({ onFilter, filter }: PropTypes) {
  const { classes } = useStyles();
  return (
    <TextInput
      onChange={({ currentTarget }) => onFilter(currentTarget.value)}
      icon={<Search size={16} />}
      mb={"md"}
      value={filter}
      className={classes.input}
      aria-label="Search blogs"
      placeholder="Search blogs"
    />
  );
}

import { TextInput } from "@mantine/core";
import { Search } from "tabler-icons-react";
import { useStyles } from "./styles";

export function SearchBlog() {
  const { classes } = useStyles();
  return (
    <TextInput
      icon={<Search size={16} />}
      mb={"md"}
      className={classes.input}
      aria-label="Search blogs"
      placeholder="Search blogs"
    />
  );
}

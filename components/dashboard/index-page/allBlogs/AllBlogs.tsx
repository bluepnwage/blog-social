import { Blog } from "@interfaces/supabase";
import { Title, Table, UnstyledButton, Group, Text, Stack, TextInput } from "@mantine/core";
import { formatDate } from "@util/formatDate";
import { useState } from "react";
import { ChevronDown, ChevronUp, Search } from "tabler-icons-react";
import { useStyles } from "./styles";

interface PropTypes {
  blogs: Blog[];
}

export function AllBlogs({ blogs }: PropTypes) {
  const [filter, setFilter] = useState("");
  const { classes, cx } = useStyles();

  const filterBlogs = () => {
    return blogs.filter((blog) => blog.title.toLowerCase().includes(filter.toLowerCase()));
  };

  const filteredBlogs = filter ? filterBlogs() : blogs;

  return (
    <>
      <Title mb={"lg"} order={2}>
        All of your blogs
      </Title>
      <TextInput
        onChange={(e) => setFilter(e.currentTarget.value)}
        icon={<Search size={18} />}
        className={classes.input}
        aria-label="Search Fields"
        placeholder="Search fields"
        mb={"xl"}
      />
      <Table striped className={cx("container", classes.table)}>
        <thead>
          <tr>
            <th className={classes.th}>
              <UnstyledButton className={classes.btn}>
                <Group position="apart">
                  <Text size={"sm"} weight={500}>
                    Blog name
                  </Text>
                  <Stack spacing={0}>
                    <ChevronUp size={14} />
                    <ChevronDown size={14} />
                  </Stack>
                </Group>
              </UnstyledButton>
            </th>
            <th className={classes.th}>
              <UnstyledButton className={classes.btn}>
                <Group position="apart">
                  <Text size={"sm"} weight={500}>
                    Upload date
                  </Text>
                  <Stack spacing={0}>
                    <ChevronUp size={14} />
                    <ChevronDown size={14} />
                  </Stack>
                </Group>
              </UnstyledButton>
            </th>
            <th className={classes.th}>
              <UnstyledButton className={classes.btn}>
                <Group position="apart">
                  <Text size={"sm"} weight={500}>
                    Likes
                  </Text>
                  <Stack spacing={0}>
                    <ChevronUp size={14} />
                    <ChevronDown size={14} />
                  </Stack>
                </Group>
              </UnstyledButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.map(({ created_at, title, id, likes }) => {
            const date = new Date(created_at);
            return (
              <tr key={id}>
                <td>{title}</td>
                <td>{formatDate(date)}</td>
                <td>{likes}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

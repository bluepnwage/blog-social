import { Title, Table, UnstyledButton, Group, Text, Stack, TextInput } from "@mantine/core";
import { ChevronDown, ChevronUp, Search } from "tabler-icons-react";
import { useStyles } from "./styles";

interface PropTypes {
  blogs: any[];
}

export function AllBlogs({ blogs }: PropTypes) {
  const { classes, cx } = useStyles();
  return (
    <>
      <Title mb={"lg"} order={2}>
        All Blogs
      </Title>
      <TextInput
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
          {blogs.map((_, key) => {
            return (
              <tr key={key}>
                <td>My Blog</td>
                <td>Jul 21, 2022</td>
                <td>56113</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

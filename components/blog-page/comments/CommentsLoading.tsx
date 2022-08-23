import { Skeleton, Avatar, Group, Stack, Text } from "@mantine/core";
import { useStyles } from "./styles";

export function CommentsLoading() {
  const { classes } = useStyles();
  const array = new Array(5).fill(null);
  return (
    <div className="section-container">
      <div className={classes.container}>
        <Text component="p">Comments</Text>
        <Stack mt={"lg"} spacing={"lg"}>
          {array.map((_, key) => {
            return (
              <Group key={key}>
                <Skeleton circle height={50}>
                  <Avatar imageProps={{ loading: "lazy" }} alt={"user profile picture"} radius={"xl"} />
                </Skeleton>
                <Stack className={classes.flexGrow} spacing={"sm"}>
                  <Skeleton width={100} height={8} />
                  <Stack spacing={5}>
                    <Skeleton width={"75%"} height={8} />
                    <Skeleton width={"55%"} height={8} />
                    <Skeleton width={"25%"} height={8} />
                  </Stack>
                </Stack>
              </Group>
            );
          })}
        </Stack>
      </div>
    </div>
  );
}

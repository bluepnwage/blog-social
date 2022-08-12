import { ThemeIcon, CopyButton, Group, Indicator, Stack, Text, Tooltip, ActionIcon } from "@mantine/core";
import { Check, HeartPlus, Share } from "tabler-icons-react";
import { formatNum } from "@util/formatNum";
import { formatDate } from "@util/formatDate";
import { useStyles } from "./styles";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Blog } from "@interfaces/supabase";
import useSWR from "swr";

interface PropTypes {
  likes: number;
  slug: string;
  lastUpdate: string;
}

const fetcher = async (key: string) => {
  const { data, error } = await supabaseClient.from<Blog>("blogs").select("likes").eq("slug", key).single();
  if (error) throw error;
  return data.likes;
};

export default function BlogStats({ likes, slug, lastUpdate }: PropTypes) {
  const { data } = useSWR(slug, fetcher, { fallbackData: likes });
  const { classes, theme } = useStyles();
  const date = new Date(lastUpdate);
  return (
    <Stack mb={theme.spacing.xl * 3} className={classes.container}>
      <Group position="apart">
        <Indicator color={"red"} size={16} inline label={formatNum(data)}>
          <ThemeIcon variant={"light"} title="Total likes" color={"red"}>
            <HeartPlus />
          </ThemeIcon>
        </Indicator>
        <CopyButton timeout={2000} value={typeof window !== "undefined" ? location.href : ""}>
          {({ copied, copy }) => {
            return (
              <Tooltip label={copied ? "Copied" : "Copy link"} withArrow>
                <ActionIcon aria-label="Copy link" color={copied ? "green" : "gray"} onClick={copy}>
                  {!copied ? <Share /> : <Check />}
                </ActionIcon>
              </Tooltip>
            );
          }}
        </CopyButton>
      </Group>
      <Group>
        <Text component="strong">Last update:</Text>
        <Text component="time">{formatDate(date)}</Text>
      </Group>
    </Stack>
  );
}

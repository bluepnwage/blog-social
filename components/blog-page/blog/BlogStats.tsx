import { ActionIcon, CopyButton, Group, Indicator, Tooltip } from "@mantine/core";
import { Check, HeartPlus, Share } from "tabler-icons-react";
import { formatNum } from "util/formatNum";
import { useStyles } from "./styles";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Blog } from "@interfaces/supabase";
import useSWR from "swr";

interface PropTypes {
  likes: number;
  slug: string;
}

const fetcher = async (key: string) => {
  const { data, error } = await supabaseClient.from<Blog>("blogs").select("likes").eq("slug", key).single();
  if (error) throw error;
  return data.likes;
};

export default function BlogStats({ likes, slug }: PropTypes) {
  const { data } = useSWR(slug, fetcher, { fallbackData: likes });
  const { classes, theme } = useStyles();
  return (
    <>
      <Group mb={theme.spacing.xl * 2.5} position="apart" className={classes.container}>
        <Indicator color={"red"} size={16} inline label={formatNum(data)}>
          <ActionIcon title="Total likes" color={"red"}>
            <HeartPlus />
          </ActionIcon>
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
    </>
  );
}

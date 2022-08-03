import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

async function fetcher(...args: string[]) {
  const [, avatar_url] = args;
  const filePath = avatar_url.slice(4);
  const { data, error } = await supabaseClient.storage.from("img").download(filePath);
  if (error) throw error;

  return URL.createObjectURL(data);
}

type Key = [string, string];

export function useAvatar(key: Key | null) {
  const { data, error } = useSWR(key, fetcher);
  return { avatar: data, avatarLoading: !data && !error, error };
}

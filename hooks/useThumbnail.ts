import useSWR from "swr";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

async function fetcher(...args: string[]) {
  const [, thumbnail] = args;
  const filePath = thumbnail.slice(4);
  const { data, error } = await supabaseClient.storage.from("img").download(filePath);

  if (error) throw error;

  return URL.createObjectURL(data);
}

type Key = [number, string];

export function useThumbnail(key: Key | null) {
  const { data, error } = useSWR(key, fetcher, { revalidateOnFocus: false });
  return { thumbnail: data, isLoading: !data && !error, error };
}

import useSWR from "swr";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@interfaces/supabase";

async function fetcher(key: string) {
  const { data, error } = await supabaseClient.from<User>("profiles").select("*").eq("id", key).single();
  if (error) throw error;

  return data;
}

export function useUser(key: string) {
  const { data, error } = useSWR(key, fetcher, { revalidateOnFocus: false });
  return { user: data, userLoading: !error && !data };
}

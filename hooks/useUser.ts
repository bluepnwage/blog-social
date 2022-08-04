import useSWR, { SWRConfiguration } from "swr";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@interfaces/supabase";

async function fetcher(id: string) {
  const { data, error } = await supabaseClient.from<User>("profiles").select("*").eq("id", id).single();
  if (error) throw error;

  return data;
}

export function useUser(key: string, options?: SWRConfiguration) {
  const { data, error } = useSWR<User>(key, fetcher, { ...options, revalidateOnFocus: false });
  return { user: data, userLoading: !error && !data };
}

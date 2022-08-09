import useSWR, { SWRConfiguration } from "swr";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@interfaces/supabase";

async function fetcher(id: string) {
  const { data, error } = await supabaseClient.from<User>("profiles").select("*").eq("id", id).single();
  if (error) {
    const { id } = supabaseClient.auth.user();
    const { data } = await supabaseClient.from<User>("profiles").upsert({ id });
    const [user] = data;
    return user;
  }

  return data;
}

export function useUser(key: string | null, options?: SWRConfiguration<User>) {
  const { data, error, mutate } = useSWR<User>(key, fetcher, {
    ...options,
    revalidateOnFocus: false,
    dedupingInterval: 10000
  });
  return { user: data, userLoading: !error && !data, mutate };
}

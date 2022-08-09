import useSWR, { SWRConfiguration } from "swr";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@interfaces/supabase";

async function fetcher(id: string) {
  try {
    const { data, error } = await supabaseClient.from<User>("profiles").select("*").eq("id", id).single();
    if (error) throw error;

    return data;
  } catch (error) {
    const userError: User = {
      avatar_url: "",
      bio: "",
      city: "",
      country: "",
      first_name: "",
      github: "",
      id: "",
      last_name: "",
      likes: [],
      occupation: "",
      twitter: "",
      updated_at: "",
      username: "",
      website: ""
    };
    return { error: true, message: error.message, user: userError };
  }
}

export function useUser(key: string | null, options?: SWRConfiguration<User>) {
  const { data, error, mutate } = useSWR<User | { message: string; error: boolean; user: User }>(key, fetcher, {
    ...options,
    revalidateOnFocus: false,
    dedupingInterval: 10000
  });
  if (!error && data && "error" in data) return { user: data.user, userLoading: !error && !data, mutate };
  return { user: data, userLoading: !error && !data, mutate };
}

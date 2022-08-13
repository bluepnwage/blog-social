import Link from "next/link";
import github from "../public/github.png";
import {
  TextInput,
  Text,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Card,
  Image,
  LoadingOverlay,
  PasswordInput,
  Alert
} from "@mantine/core";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { AlertCircle } from "tabler-icons-react";

interface Form {
  email: string;
  password: string;
}

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>({ password: "", email: "" });
  const [error, setError] = useState(false);
  const [supabaseError, setSupabaseError] = useState({ error: false, message: "" });
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    try {
      if (!email || !password) {
        setError(true);
        return;
      }

      setLoading(true);

      const { error } = await supabaseClient.auth.signIn({ email, password });

      if (error) throw new Error(error.message);
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setSupabaseError({ error: true, message: error.message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    if (error) setError(false);
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const signInWithGithub = async () => {
    await supabaseClient.auth.signIn({ provider: "github" });
  };

  return (
    <div style={{ justifyContent: "center", height: "90vh" }} className="section-container">
      <Card style={{ width: "35%", position: "relative" }} radius="md" p="xl" withBorder>
        <LoadingOverlay visible={loading} />
        <Text size="lg" weight={500}>
          Welcome to Blog Social, login with
        </Text>
        <Group grow mb="md" position="center" mt="md">
          <Button onClick={async () => await signInWithGithub()} variant="default">
            <Group spacing={5}>
              <Image src={github.src} imageProps={{ loading: "lazy" }} width={12} height={12} alt="Twitter logo" />
              <Text>Github</Text>
            </Group>
          </Button>
        </Group>
        <Divider label="Or continue with email" labelPosition="center" my="lg" />
        <form onSubmit={handleLogin}>
          <Stack>
            <TextInput
              error={error && "You must enter an email to sign in"}
              value={form.email}
              name="email"
              onChange={handleChange}
              required
              label="Email"
              placeholder="hello@mantine.dev"
              type={"email"}
            />
            <PasswordInput
              error={error && "You must enter a password to sign in"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              label="Password"
            />
          </Stack>
          <Group position="apart" mt="xl">
            <Text color={"dimmed"} size={"sm"}>
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} passHref>
                <Anchor size="sm">Sign up </Anchor>
              </Link>
            </Text>
            <Button type="submit">Log in</Button>
          </Group>
          {supabaseError.error && (
            <Alert icon={<AlertCircle />} mt={"md"} color={"red"} title={"An error ocurred"}>
              {supabaseError.message}
            </Alert>
          )}
        </form>
      </Card>
    </div>
  );
}

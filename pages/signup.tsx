import {
  TextInput,
  PasswordInput,
  Text,
  Group,
  Button,
  Divider,
  Anchor,
  Stack,
  Card,
  Image,
  LoadingOverlay,
  Alert
} from "@mantine/core";
import google from "../public/google.png";
import twitter from "../public/twitter.png";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { AlertCircle, Check } from "tabler-icons-react";

interface Form {
  email: string;
  password: string;
}

export default function SignUp() {
  const [form, setForm] = useState<Form>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState("");
  const [signUpSuccess, setSuccess] = useState(false);

  const signUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = form;
    try {
      if (!email || !password) throw new Error("Please fill out all fields");

      setLoading(true);

      const { error } = await supabaseClient.auth.signUp({ email, password });
      if (error) throw new Error(error.message);

      setSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setSupabaseError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{ justifyContent: "center", height: "90vh" }} className="section-container">
      <Card style={{ width: "35%", position: "relative" }} radius="md" p="xl" withBorder>
        <LoadingOverlay visible={loading} />
        <Text size="lg" weight={500}>
          Welcome to Blog Social, sign up with
        </Text>

        <Group grow mb="md" mt="md">
          <Button variant="default">
            <Group spacing={5}>
              <Image src={google.src} imageProps={{ loading: "lazy" }} width={12} height={12} alt="Google logo" />
              <Text>Google</Text>
            </Group>{" "}
          </Button>
          <Button variant="default">
            <Group spacing={5}>
              <Image src={twitter.src} imageProps={{ loading: "lazy" }} width={12} height={12} alt="Twitter logo" />
              <Text>Twitter</Text>
            </Group>
          </Button>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={signUp}>
          <Stack>
            <TextInput
              value={form.email}
              onChange={handleChange}
              name="email"
              required
              label="Email"
              placeholder="hello@mantine.dev"
              type={"email"}
            />
            <PasswordInput
              value={form.password}
              onChange={handleChange}
              required
              name="password"
              label="Password"
              placeholder="Your password"
            />
          </Stack>

          <Group position="apart" mt="xl">
            <Text size={"sm"}>
              Already have an account?{" "}
              <Link href={"/signin"} passHref>
                <Anchor size="sm">Sign in</Anchor>
              </Link>
            </Text>
            <Button type="submit">Sign up</Button>
          </Group>
        </form>
        {supabaseError && (
          <Alert mt={"md"} icon={<AlertCircle />} title="An error ocurred" color="red">
            {supabaseError}
          </Alert>
        )}
        {signUpSuccess && (
          <Alert color={"green"} icon={<Check />} mt={"md"} title="Sign up successful">
            Please check your email for the confirmation link to sign in.
          </Alert>
        )}
      </Card>
    </div>
  );
}

import {
  Card,
  Text,
  Avatar,
  TextInput,
  Group,
  NumberInput,
  Stack,
  Divider,
  Textarea,
  Button,
  LoadingOverlay
} from "@mantine/core";
import { useStyles } from "./styles";
import { BrandTwitch, BrandTwitter, BrandLinkedin, BrandHtml5, At, Location } from "tabler-icons-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState } from "react";

interface Form {
  username: string;
  website: string;
}

interface User {
  email: string;
  website: string;
}

export function UpdateProfile({ email, website }: User) {
  const [form, setForm] = useState<Form>({ username: "", website });
  const [loading, setLoading] = useState(false);
  const { classes, cx } = useStyles();

  async function updateProfile() {
    const { website } = form;
    try {
      if (!website) throw new Error("Fill out info first");
      setLoading(true);
      const user = supabaseClient.auth.user();
      const updates = {
        id: user.id,
        website,
        updated_at: new Date()
      };

      let { error } = await supabaseClient.from("profiles").upsert(updates, {
        returning: "minimal" // Don't return the value after inserting
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      <Card className={cx("container", classes.card)}>
        <LoadingOverlay visible={loading} />
        <Card.Section className={classes.cardTitle} withBorder>
          <Text>My Account</Text>
        </Card.Section>
        <Text mb={"md"} weight={200}>
          USER INFORMATION
        </Text>
        <Avatar
          mb={"md"}
          alt={"Profile picture"}
          imageProps={{ loading: "lazy" }}
          src={"/bluepnwage.jpg"}
          style={{ width: 90, height: 90, borderRadius: "50%" }}
        />
        <Stack mb={"lg"}>
          <Group grow>
            <TextInput label={"First name"} placeholder={"Agis"} />
            <TextInput label={"Last name"} placeholder={"Carty"} />
          </Group>
          <NumberInput label={"Age"} />
          <Divider mt={"md"} />
          <Text>CONTACT INFORMATION</Text>
          <TextInput label={"Email"} icon={<At size={16} />} placeholder={"hellothere@gmail.com"} />
          <Group grow>
            <TextInput icon={<Location size={16} />} label={"City"} placeholder={"Spring"} />
            <TextInput icon={<Location size={16} />} label={"Country"} placeholder={"St Martin"} />
          </Group>
          <Divider mt={"md"} />
          <Text>ABOUT ME</Text>
          <Group grow>
            <TextInput
              value={form.website}
              onChange={handleChange}
              name={"website"}
              icon={<BrandHtml5 size={16} />}
              label={"Personal website"}
              placeholder={"www.mywebsite.com"}
            />
            <TextInput icon={<BrandTwitter size={16} />} label={"Twitter"} placeholder={"bluepnwage"} />
          </Group>
          <Group grow>
            <TextInput icon={<BrandTwitch size={16} />} label={"Twitch"} placeholder={"bluepnwage"} />
            <TextInput icon={<BrandLinkedin size={16} />} label={"LinkedIn"} placeholder={"Agis Carty"} />
          </Group>
          <Textarea label={"Bio"} placeholder={"This is my bio"} />
          <Button onClick={updateProfile} size="lg" color={"green"}>
            Update profile
          </Button>
        </Stack>
      </Card>
    </>
  );
}

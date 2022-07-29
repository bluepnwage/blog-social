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
import { BrandTwitter, BrandLinkedin, BrandHtml5, At, Location, BrandGithub } from "tabler-icons-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState } from "react";

interface Form {
  website: string;
  twitter: string;
  github: string;
  city: string;
  country: string;
  bio: string;
  first_name: string;
  last_name: string;
}

interface User extends Form {
  email: string;
  id: string;
}

export function UpdateProfile({ email, id, ...formProps }: User) {
  const [form, setForm] = useState<Form>({
    ...formProps
  });
  const [loading, setLoading] = useState(false);
  const { classes, cx } = useStyles();

  async function updateProfile() {
    const { bio, city, country, first_name, github, last_name, twitter, website } = form;
    try {
      setLoading(true);
      const updates = {
        id,
        bio,
        city,
        country,
        first_name,
        github,
        last_name,
        twitter,
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

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            <TextInput
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              label={"First name"}
              placeholder={"Agis"}
            />
            <TextInput
              value={form.last_name}
              onChange={handleChange}
              name="last_name"
              label={"Last name"}
              placeholder={"Carty"}
            />
          </Group>
          <NumberInput label={"Age"} />
          <Divider mt={"md"} />
          <Text>CONTACT INFORMATION</Text>
          <TextInput label={"Email"} icon={<At size={16} />} placeholder={"hellothere@gmail.com"} />
          <Group grow>
            <TextInput
              onChange={handleChange}
              value={form.city}
              icon={<Location size={16} />}
              label={"City"}
              placeholder={"Spring"}
              name="city"
            />
            <TextInput
              onChange={handleChange}
              value={form.country}
              icon={<Location size={16} />}
              label={"Country"}
              name="country"
              placeholder={"St Martin"}
            />
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
            <TextInput
              value={form.twitter}
              onChange={handleChange}
              icon={<BrandTwitter size={16} />}
              label={"Twitter"}
              name="twitter"
              placeholder={"bluepnwage"}
            />
          </Group>
          <Group grow>
            <TextInput
              value={form.github}
              onChange={handleChange}
              icon={<BrandGithub size={16} />}
              label={"Github"}
              name="github"
              placeholder={"bluepnwage"}
            />
            <TextInput icon={<BrandLinkedin size={16} />} label={"LinkedIn"} placeholder={"Agis Carty"} />
          </Group>
          <Textarea
            name={"bio"}
            value={form.bio}
            onChange={handleChange}
            label={"Bio"}
            placeholder={"This is my bio"}
          />
          <Button onClick={updateProfile} size="lg" color={"green"}>
            Update profile
          </Button>
        </Stack>
      </Card>
    </>
  );
}

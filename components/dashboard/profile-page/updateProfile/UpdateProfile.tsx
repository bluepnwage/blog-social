import {
  Card,
  Text,
  Avatar,
  TextInput,
  Group,
  Stack,
  Divider,
  Textarea,
  Button,
  LoadingOverlay,
  FileButton
} from "@mantine/core";
import { useStyles } from "./styles";
import { BrandTwitter, ReportMoney, BrandHtml5, At, Location, BrandGithub } from "tabler-icons-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState, useEffect } from "react";
import { User } from "@interfaces/supabase";

interface Form {
  website: string;
  twitter: string;
  github: string;
  city: string;
  country: string;
  bio: string;
  first_name: string;
  last_name: string;
  occupation: string;
}

export function UpdateProfile({ id, avatar_url, ...formProps }: User) {
  const [form, setForm] = useState<Form>({
    ...formProps
  });
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (!avatar_url) return;
    downloadProfilePic();
  }, []);

  async function updateProfile() {
    const { bio, city, country, first_name, github, last_name, twitter, website, occupation } = form;
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
        occupation,
        updated_at: new Date()
      };

      let { error } = await supabaseClient.from<User>("profiles").upsert(updates, {
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

  const updatePicture = async (file: File) => {
    try {
      //Specifying the path for the image and uploading it
      const filePath = `${id}/avatar/${file.name}`;
      const { data, error } = await supabaseClient.storage.from("img").upload(filePath, file);
      if (error) throw new Error(error.message);

      //If there was a previous profile picture then delete it
      if (profilePic) await deletePrevProfilePic();

      //Updating the avatar url in the database record to match the file that was just uploaded
      const { error: updateError } = await supabaseClient.from<User>("profiles").upsert({ avatar_url: data.Key, id });
      if (updateError) throw new Error(updateError.message);
      if (avatar_url) {
        return await downloadProfilePic();
      }
      setProfilePic(URL.createObjectURL(file));
    } catch (error) {
      alert(error.message);
    }
  };

  const downloadProfilePic = async () => {
    try {
      //Getting the key for the latest avatar url
      const { data: userData, error: userError } = await supabaseClient
        .from<User>("profiles")
        .select("avatar_url")
        .single();
      if (userError) throw new Error(userError.message);
      const filePath = `${userData.avatar_url.slice(4)}`;

      //Downloading the image based on the latest key
      const { data, error } = await supabaseClient.storage.from("img").download(filePath);
      if (error) throw new Error(error.message);

      const url = URL.createObjectURL(data);
      setProfilePic(url);
    } catch (error) {
      alert(error.message);
    }
  };

  const deletePrevProfilePic = async () => {
    //Getting the key for the latest avatar
    const { data: userData, error: userError } = await supabaseClient
      .from<User>("profiles")
      .select("avatar_url")
      .single();

    if (userError) throw new Error(userError.message);

    //Deleting the latest avatar url
    const filePath = `${userData.avatar_url.slice(4)}`;
    const { error } = await supabaseClient.storage.from("img").remove([filePath]);
    if (error) {
      console.log(error.message);
      throw new Error(`Failed to delete: ${error.message}`);
    }
  };

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
        <Stack mb={"md"} style={{ width: "fit-content" }} spacing={0}>
          <Avatar
            mb={"md"}
            alt={"Profile picture"}
            imageProps={{ loading: "lazy" }}
            src={profilePic}
            style={{ width: 90, height: 90, borderRadius: "50%" }}
          />

          <FileButton onChange={updatePicture} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Stack>
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
            <TextInput
              onChange={handleChange}
              name={"occupation"}
              icon={<ReportMoney size={16} />}
              value={form.occupation}
              label={"Occupation"}
              placeholder={"Front-end Engineer"}
            />
          </Group>
          <Textarea
            maxRows={5}
            autosize
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

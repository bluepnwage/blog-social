import { Card, Text, Avatar, Group, Stack, Divider, Button, LoadingOverlay, FileButton } from "@mantine/core";
import { useStyles } from "./styles";
import { BrandTwitter, ReportMoney, BrandHtml5, Location, BrandGithub } from "tabler-icons-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState, useEffect } from "react";
import { User } from "@interfaces/supabase";
import { Input } from "./Input";

export function UpdateProfile({ id, avatar_url, ...form }: User) {
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);
  const { classes, cx } = useStyles();

  useEffect(() => {
    if (!avatar_url) return;
    downloadProfilePic();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputData = new FormData(e.currentTarget);
    const inputs: (keyof User)[] = [
      "bio",
      "city",
      "country",
      "first_name",
      "github",
      "last_name",
      "occupation",
      "twitter",
      "website"
    ];

    const formData = { id, updated_at: new Date() };

    inputs.forEach((input) => {
      formData[input] = inputData.get(input);
    });

    try {
      setLoading(true);

      const { error } = await supabaseClient.from<User>("profiles").upsert(formData, {
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
    if (!file) return;
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

  return (
    <>
      <Card className={cx("container", classes.card)}>
        <LoadingOverlay visible={loading} zIndex={250} />
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
            className={classes.profilePicture}
          />

          <FileButton onChange={updatePicture} accept="image/png,image/jpeg">
            {(props) => <Button {...props}>Upload image</Button>}
          </FileButton>
        </Stack>
        <form onSubmit={handleSubmit}>
          <Stack mb={"lg"}>
            <Group>
              <Input name="first_name" defaultValue={form.first_name} label={"First name"} placeholder={"Agis"} />
              <Input defaultValue={form.last_name} name={"last_name"} label={"Last name"} placeholder={"Carty"} />
            </Group>
            <Divider mt={"md"} />
            <Text>CONTACT INFORMATION</Text>
            <Group>
              <Input
                defaultValue={form.city}
                icon={<Location size={16} />}
                label={"City"}
                placeholder={"Spring"}
                name="city"
              />
              <Input
                defaultValue={form.country}
                icon={<Location size={16} />}
                label={"Country"}
                name="country"
                placeholder={"St Martin"}
              />
            </Group>
            <Divider mt={"md"} />
            <Text>ABOUT ME</Text>
            <Group>
              <Input
                defaultValue={form.website}
                name={"website"}
                icon={<BrandHtml5 size={16} />}
                label={"Personal website"}
                placeholder={"www.mywebsite.com"}
              />
              <Input
                defaultValue={form.twitter}
                icon={<BrandTwitter size={16} />}
                label={"Twitter"}
                name="twitter"
                placeholder={"bluepnwage"}
              />
            </Group>
            <Group>
              <Input
                defaultValue={form.github}
                icon={<BrandGithub size={16} />}
                label={"Github"}
                name="github"
                placeholder={"bluepnwage"}
              />
              <Input
                name={"occupation"}
                icon={<ReportMoney size={16} />}
                defaultValue={form.occupation}
                label={"Occupation"}
                placeholder={"Front-end Engineer"}
              />
            </Group>
            <Input name={"bio"} defaultValue={form.bio} label={"Bio"} placeholder={"This is my bio"} textArea />
            <Button type="submit" size="lg" color={"green"}>
              Update profile
            </Button>
          </Stack>
        </form>
      </Card>
    </>
  );
}

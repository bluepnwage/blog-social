import { Card, Text, Avatar, Group, Stack, Divider, Button, LoadingOverlay, FileButton } from "@mantine/core";
import { useStyles } from "./styles";
import { BrandTwitter, ReportMoney, BrandHtml5, Location, BrandGithub, X, Check } from "tabler-icons-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { FormEvent, useState } from "react";
import { User } from "@interfaces/supabase";
import { Input } from "./Input";
import { showNotification } from "@mantine/notifications";
import { mutate } from "swr";
import { CloudinaryResponse } from "@interfaces/cloudinary";

export function UpdateProfile({ id, avatar_url, ...form }: User) {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(avatar_url);
  const { classes, cx } = useStyles();

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
      showNotification({
        message: "Profile updated successfully",
        color: "green",
        autoClose: 3000,
        title: "Success",
        icon: <Check />
      });
    } catch (error) {
      showNotification({ message: error.message, color: "red", title: "Error", icon: <X /> });
    } finally {
      setLoading(false);
    }
  }

  const updatePicture = async (file: File) => {
    if (!file) return;
    try {
      const formData = new FormData();
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

      const res = await fetch(url, {
        method: "POST",
        body: formData
      });

      if (res.ok) {
        const json = (await res.json()) as CloudinaryResponse;
        const { error: updateError } = await supabaseClient
          .from<User>("profiles")
          .upsert({ avatar_url: json.secure_url, id });

        if (updateError) throw updateError;
        if (avatar) await deletePrevAvatar();

        setAvatar(json.secure_url);
        mutate(id);
        showNotification({ message: "Profile picture updated", color: "green", title: "Success" });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      showNotification({ message: error.message, color: "red", title: "Error", icon: <X /> });
    }
  };

  const deletePrevAvatar = async () => {
    await fetch("/api/delete-image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: avatar })
    });
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
            src={avatar}
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

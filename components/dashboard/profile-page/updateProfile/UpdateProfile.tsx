import { Card, Text, Avatar, TextInput, Group, NumberInput, Stack, Divider, Textarea, Button } from "@mantine/core";
import { useStyles } from "./styles";
import { BrandTwitch, BrandTwitter, BrandLinkedin, BrandHtml5, At, Location } from "tabler-icons-react";

export function UpdateProfile() {
  const { classes, cx } = useStyles();
  return (
    <>
      <Card className={cx("container", classes.card)}>
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
          <TextInput label={"Email"} icon={<At size={16} />} placeholder={"a.carty2555@gmail.com"} />
          <Group grow>
            <TextInput icon={<Location size={16} />} label={"City"} placeholder={"Spring"} />
            <TextInput icon={<Location size={16} />} label={"Country"} placeholder={"St Martin"} />
          </Group>
          <Divider mt={"md"} />
          <Text>ABOUT ME</Text>
          <Group grow>
            <TextInput icon={<BrandHtml5 size={16} />} label={"Personal website"} placeholder={"www.mywebsite.com"} />
            <TextInput icon={<BrandTwitter size={16} />} label={"Twitter"} placeholder={"bluepnwage"} />
          </Group>
          <Group grow>
            <TextInput icon={<BrandTwitch size={16} />} label={"Twitch"} placeholder={"bluepnwage"} />
            <TextInput icon={<BrandLinkedin size={16} />} label={"LinkedIn"} placeholder={"Agis Carty"} />
          </Group>
          <Textarea label={"Bio"} placeholder={"This is my bio"} />
          <Button size="lg" color={"green"}>
            Update profile
          </Button>
        </Stack>
      </Card>
    </>
  );
}

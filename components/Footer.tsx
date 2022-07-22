import React from "react";
import { createStyles, Container, Group, ActionIcon, Image, Text } from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandGithub } from "tabler-icons-react";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    transition: "all 250ms ease-out"
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column"
    }
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md
    }
  }
}));

export default function FooterSocial() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group spacing={5}>
          <Image src={"/logo-icon.svg"} height={36} width={36} alt={"Website logo"} />
          <Text weight={600}>Blog Social</Text>
        </Group>
        <Group spacing={0} className={classes.links} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

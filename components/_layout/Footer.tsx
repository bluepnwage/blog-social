import { Container, Group, ActionIcon, Image, Text } from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandGithub } from "tabler-icons-react";
import { useStyles } from "./styles";
import { memo } from "react";

function Footer() {
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

export default memo(Footer);

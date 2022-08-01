import { Container, Group, ActionIcon, Image, Text } from "@mantine/core";
import { BrandTwitter, BrandLinkedin, BrandGithub } from "tabler-icons-react";
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
          <ActionIcon aria-label="View profile on Twitter" size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon aria-label="View profile on LinkedIn" size="lg">
            <BrandLinkedin size={18} />
          </ActionIcon>
          <ActionIcon aria-label="View profile on Github" size="lg">
            <BrandGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default memo(Footer);

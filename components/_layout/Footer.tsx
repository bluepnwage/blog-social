import { Container, Group, ActionIcon, Image, Text } from "@mantine/core";
import { BrandTwitter, BrandGithub } from "tabler-icons-react";
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
          <ActionIcon
            target={"_blank"}
            href={"https://twitter.com/bluepnwage"}
            component="a"
            aria-label="View profile on Twitter"
            size="lg"
          >
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon
            component="a"
            href={"https://github.com/bluepnwage"}
            target={"_blank"}
            aria-label="View profile on Github"
            size="lg"
          >
            <BrandGithub size={18} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default memo(Footer);

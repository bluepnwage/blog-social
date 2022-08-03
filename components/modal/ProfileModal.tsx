import { GroupedTransition, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./styles";
import { Modal } from "./Modal";
import { ReactNode, memo } from "react";
import { User } from "@interfaces/supabase";

interface PropTypes {
  children: ReactNode;
  user?: User;
  avatar?: string;
}

function ProfileModal({ children, user, avatar }: PropTypes) {
  const { classes, cx } = useStyles();
  const [opened, handler] = useDisclosure(false);
  return (
    <>
      <GroupedTransition
        mounted={opened}
        transitions={{
          overlay: { duration: 100, transition: "fade", timingFunction: "ease" },
          modal: { duration: 250, transition: "scale", timingFunction: "ease" }
        }}
      >
        {(styles) => {
          return (
            <div style={styles.overlay} className={cx(classes.overlay)}>
              <Modal avatar={avatar} user={user} styles={styles} onClose={handler.close} />
            </div>
          );
        }}
      </GroupedTransition>
      <UnstyledButton
        disabled={!user || !avatar}
        title="Open user profile"
        onClick={handler.open}
        className={classes.btn}
      >
        {children}
      </UnstyledButton>
    </>
  );
}

export default memo(ProfileModal);

import { GroupedTransition, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./styles";
import { Modal } from "./Modal";
import { ReactNode, memo } from "react";

interface PropTypes {
  children: ReactNode;
}

function ProfileModal({ children }: PropTypes) {
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
              <Modal styles={styles} onClose={handler.close} />
            </div>
          );
        }}
      </GroupedTransition>
      <UnstyledButton title="Open user profile" onClick={handler.open} className={classes.btn}>
        {children}
      </UnstyledButton>
    </>
  );
}

export default memo(ProfileModal);

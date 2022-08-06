import { UnstyledButton, Modal as MantineModal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useStyles } from "./styles";
import { Modal } from "./Modal";
import { ReactNode, memo } from "react";
import { User } from "@interfaces/supabase";

interface PropTypes {
  children: ReactNode;
  user?: User;
  onClose?: () => void;
}

function ProfileModal({ children, user, onClose }: PropTypes) {
  const { classes } = useStyles();
  const [opened, handler] = useDisclosure(false);

  const closeModal = onClose
    ? () => {
        onClose();
        handler.close();
      }
    : handler.close;

  return (
    <>
      <MantineModal
        padding={0}
        size={"50%"}
        withCloseButton={false}
        overlayOpacity={0.55}
        overlayBlur={3}
        zIndex={500}
        opened={opened}
        onClose={closeModal}
      >
        <Modal user={user} onClose={closeModal} />
      </MantineModal>

      <UnstyledButton disabled={!user} title="Open user profile" onClick={handler.open} className={classes.btn}>
        {children}
      </UnstyledButton>
    </>
  );
}

export default memo(ProfileModal);

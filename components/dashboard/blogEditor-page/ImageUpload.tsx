import { Group, Text, useMantineTheme } from "@mantine/core";
import { X, Upload, Photo } from "tabler-icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export function ImageUpload(props: Partial<DropzoneProps>) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      onDrop={() => {}}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      {...props}
    >
      <Group position="center" spacing="xl" style={{ pointerEvents: "none" }}>
        <Dropzone.Accept>
          <Upload size={50} color={theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]} />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <X size={50} color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]} />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Photo size={50} />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            File should not exceed 5mb
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

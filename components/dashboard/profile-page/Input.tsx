import { FormEvent, ReactNode, useState } from "react";
import { Textarea, TextInput } from "@mantine/core";
import { User } from "@interfaces/supabase";
import { useStyles } from "./styles";

interface PropTypes {
  name: keyof User;
  label: string;
  placeholder: string;
  icon?: ReactNode;
  textArea?: boolean;
  defaultValue: string;
}

export function Input({ label, name, placeholder, textArea, icon, defaultValue }: PropTypes) {
  const [value, setValue] = useState(defaultValue);
  const { classes } = useStyles();

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <>
      {!textArea && (
        <TextInput
          className={classes.textInput}
          icon={icon}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          name={name}
          label={label}
        />
      )}
      {textArea && (
        <Textarea
          maxRows={5}
          autosize
          name={"bio"}
          value={value}
          onChange={handleChange}
          label={"Bio"}
          placeholder={"This is my bio"}
        />
      )}
    </>
  );
}

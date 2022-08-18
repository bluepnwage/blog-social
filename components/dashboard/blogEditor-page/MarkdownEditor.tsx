import TurndownService from "turndown";
import { Textarea } from "@mantine/core";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { marked } from "marked";

interface PropTypes {
  content: string;
  onChange: Dispatch<SetStateAction<string>>;
}
const turndownService = new TurndownService();

export default function MarkdownEditor({ content, onChange }: PropTypes) {
  const [state, setState] = useState(turndownService.turndown(content));

  const handleChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setState(e.currentTarget.value);
    const html = marked.parse(state);
    onChange(html);
  };

  return <Textarea onChange={handleChange} value={state} minRows={3} autosize maxRows={Infinity} />;
}

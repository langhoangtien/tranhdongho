import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { Toggle } from "./ui/toggle";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ChevronDownIcon,
  CodeIcon,
  ImageIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  QuoteIcon,
  Redo2Icon,
  RemoveFormatting,
  SquareCodeIcon,
  StrikethroughIcon,
  UnderlineIcon,
  Undo2Icon,
  WrapTextIcon,
} from "lucide-react";
import { uploadImage } from "@/lib/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Editor } from "@tiptap/react";
import { useEffect, useImperativeHandle } from "react";

export default function EditorTipTap({
  isFull = false,
  initialContent,
  ref,
}: {
  isFull?: boolean;
  initialContent?: string;
  ref?: React.Ref<any>;
}) {
  const editor = useEditor({
    extensions: [
      Underline,
      Link,
      Image,
      Color.configure({}),
      TextStyle.configure({}),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content: initialContent || "",
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent, editor]);

  useImperativeHandle(ref, () => ({
    getContent: () => (editor ? editor.getHTML() : ""),
  }));
  const addImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const url = await uploadImage(event, 800);
    if (editor && url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return <div>Loading...</div>;
  }
  return (
    <div className="border border-border rounded-md tiptap ">
      <div className="control-group flex gap-4 ">
        <div className="flex flex-wrap gap-2 p-2 border-b border-border">
          <HeadingBlock editor={editor} />
          <Toggle
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            data-state={editor.isActive("bold") ? "on" : "off"}
          >
            <BoldIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            data-state={editor.isActive("bold") ? "on" : "off"}
          >
            <ItalicIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            data-state={editor.isActive("strike") ? "on" : "off"}
          >
            <StrikethroughIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            data-state={editor.isActive("underline") ? "on" : "off"}
          >
            <UnderlineIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            data-state={editor.isActive({ textAlign: "left" }) ? "on" : "off"}
          >
            <AlignLeftIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            data-state={editor.isActive({ textAlign: "center" }) ? "on" : "off"}
          >
            <AlignCenterIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            data-state={editor.isActive({ textAlign: "right" }) ? "on" : "off"}
          >
            <AlignRightIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            data-state={
              editor.isActive({ textAlign: "justify" }) ? "on" : "off"
            }
          >
            <AlignJustifyIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            data-state={editor.isActive("bulletList") ? "on" : "off"}
          >
            <ListIcon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            data-state={editor.isActive("orderedList") ? "on" : "off"}
          >
            <ListOrderedIcon strokeWidth={1.25} />
          </Toggle>

          {isFull && (
            <>
              {" "}
              <Toggle
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                data-state={editor.isActive("code") ? "on" : "off"}
              >
                <CodeIcon strokeWidth={1.25} />
              </Toggle>
              <Toggle
                onClick={() =>
                  editor.chain().focus().clearNodes().unsetAllMarks().run()
                }
              >
                <RemoveFormatting strokeWidth={1.25} />
              </Toggle>
              <Toggle
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                data-state={editor.isActive("codeBlock") ? "on" : "off"}
              >
                <SquareCodeIcon strokeWidth={1.25} />
              </Toggle>
              <Toggle
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                data-state={editor.isActive("blockquote") ? "on" : "off"}
              >
                <QuoteIcon strokeWidth={1.25} />
              </Toggle>
              <Toggle
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <MinusIcon strokeWidth={1.25} />
              </Toggle>
              <Toggle
                onClick={() => editor.chain().focus().setHardBreak().run()}
              >
                <WrapTextIcon strokeWidth={1.25} />
              </Toggle>
            </>
          )}

          <Toggle
            onClick={() => {
              const url = prompt("Enter URL");
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }}
            data-state={editor.isActive("link") ? "on" : "off"}
          >
            <LinkIcon strokeWidth={1.25} />
          </Toggle>

          <Toggle
            disabled={!editor.isActive("link")}
            onClick={() => editor.chain().focus().unsetLink().run()}
            data-state={editor.isActive("link") ? "off" : "on"}
          >
            <LinkIcon strokeWidth={1.25} />
          </Toggle>
          <label
            htmlFor="image-upload"
            className="size-9 bg-accent flex justify-center items-center rounded-md"
          >
            <input
              type="file"
              accept="image/*"
              onChange={addImage}
              className="hidden"
              id="image-upload"
            />

            <ImageIcon size={16} strokeWidth={1.25} />
          </label>
          <Toggle
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo2Icon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo2Icon strokeWidth={1.25} />
          </Toggle>
          <Toggle
            onClick={() =>
              editor.chain().focus().setColor("var(--primary)").run()
            }
            data-state={
              editor.isActive("textStyle", { color: "var(--primary)" })
                ? "on"
                : "off"
            }
          >
            Primary
          </Toggle>
        </div>
      </div>
      <EditorContent
        editor={editor}
        className="p-4 min-h-40 max-h-screen overflow-y-auto"
      />
    </div>
  );
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

const HEADING_OPTIONS = [
  "Heading 1",
  "Heading 2",
  "Heading 3",
  "Heading 4",
  "Heading 5",
  "Heading 6",
];

export function HeadingBlock({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-25" variant="outline">
          {(editor.isActive("heading", { level: 1 }) && "Heading 1") ||
            (editor.isActive("heading", { level: 2 }) && "Heading 2") ||
            (editor.isActive("heading", { level: 3 }) && "Heading 3") ||
            (editor.isActive("heading", { level: 4 }) && "Heading 4") ||
            (editor.isActive("heading", { level: 5 }) && "Heading 5") ||
            (editor.isActive("heading", { level: 6 }) && "Heading 6") ||
            "Paragraph"}

          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            Paragraph
          </DropdownMenuItem>
          {HEADING_OPTIONS.map((option, index) => (
            <DropdownMenuItem
              key={option}
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: (index + 1) as HeadingLevel })
                  .run();
              }}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

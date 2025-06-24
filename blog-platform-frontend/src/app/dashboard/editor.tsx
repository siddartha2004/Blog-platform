'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function Editor({ onChange }: { onChange: (html: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello 👋</p>',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} className="prose max-w-none bg-white p-2 border rounded" />;
}

import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "All" ? undefined : slug[0];
  const limit = 12;
  const initialData = await fetchNotes("", 1, limit, tag);
  return <NotesClient initialData={initialData} tag={tag} />;
};

export default NotesByCategory;

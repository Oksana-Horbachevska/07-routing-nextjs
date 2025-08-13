import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];
  const initialData = await fetchNotes("", 1, 12, category);
  return <NotesClient initialData={initialData} category={category} />;
};

export default NotesByCategory;

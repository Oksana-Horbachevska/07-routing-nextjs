import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";

type Props = {
  params: { slug: string[] };
};

const NotesByCategory = async ({ params }: Props) => {
  const initialQuery = "";
  const initialPage = 1;
  const { slug } = await params;
  const category = slug[0] === "All" ? undefined : slug[0];
  const initialData = await fetchNotes(initialQuery, initialPage, 12, category);
  return (
    <NotesClient
      initialData={initialData}
      initialQuery={initialQuery}
      initialPage={initialPage}
      initialCategory={category}
    />
  );
};

export default NotesByCategory;

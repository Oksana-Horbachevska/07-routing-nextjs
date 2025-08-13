"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import NoteList from "@/components/NoteList/NoteList";
import { useRouter } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import type { Note } from "@/types/note";
import css from "./page.module.css";

interface NotesClientProps {
  initialData: {
    notes: Note[];
    totalPages: number;
  };

  tag?: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const router = useRouter();

  const [inputValue, setInputValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const limit = 12;

  const updateSearchQuery = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
    const tagPart = tag ? `/notes/filter/${tag}` : "/notes/filter/All";
    router.push(`${tagPart}?query=${newQuery}&page=1`);
  }, 300);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["notes", query, currentPage, limit, tag],
    queryFn: () => fetchNotes(query, currentPage, limit, tag),
    initialData,
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const tagPart = tag ? `/notes/filter/${tag}` : "/notes/filter/All";
    router.push(`${tagPart}?query=${query}&page=${page}`);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onSearch={(val) => {
            setInputValue(val);
            updateSearchQuery(val);
          }}
          value={inputValue}
        />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create note +
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isSuccess && data.notes.length === 0 && (
        <p className={css.empty}>No notes found</p>
      )}
    </div>
  );
}

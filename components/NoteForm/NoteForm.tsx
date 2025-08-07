import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FormikHelpers } from "formik";
import { useId } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import type { NewNoteData, NoteTag } from "../../types/note";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";

interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Content is too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag is required"),
});

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (noteData: NewNoteData) => createNote(noteData),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      onClose();
    },
  });

  const fieldId = useId();
  const handleSubmit = (
    values: NoteFormValues,
    actions: FormikHelpers<NoteFormValues>
  ) => {
    console.log(values);
    mutation.mutate({
      title: values.title,
      content: values.content,
      tag: values.tag,
    });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="div" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component="div" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="div" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

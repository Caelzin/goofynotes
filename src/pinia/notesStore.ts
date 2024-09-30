import { computed, ref, reactive } from 'vue';
import clonedeep from 'lodash.clonedeep'

import { defineStore } from 'pinia';

import type NoteType from '../utils/types/noteType';
import { NotesService } from '../utils/classes/Notes';

const notes = new NotesService();

export const useNotesStore = defineStore('notes', () => {
  const noteList = ref(notes.getNotes());
  const unsavedNote = reactive<NoteType>(NotesService.generateEmptyNote());
  const selectedNoteId = ref(0);

  const notesAmount = ref(noteList.value.length)

  const emptyTaskAmount = computed(() => unsavedNote
      .tasks
      .filter(task => !task.text)
      .length
  );


  const rewriteUnsavedNote = (newData: NoteType = NotesService.generateEmptyNote()): void => {
    const copiedNote = clonedeep(newData);
    for (const key in copiedNote) {
      if (copiedNote.hasOwnProperty(key) && key in unsavedNote) {
        unsavedNote[key as keyof NoteType] = copiedNote[key as keyof NoteType]!;
      }
    }

    selectedNoteId.value = unsavedNote.id;
  };

  const addEmptyTasks = (amount = 1): void => {
    unsavedNote.tasks.push(...NotesService.addEmptyTasks(amount));
  }

  const flushUnsavedNote = () => {
    rewriteUnsavedNote();
  }

  const selectNote = (id: number) => {
    selectedNoteId.value = id;
    rewriteUnsavedNote(notes.getNoteById(id));
  }

  const saveEditChanges = () => {
    return new Promise<void>((resolve, reject) => {
      if (!unsavedNote.title) {
        alert('Заголовок не может быть пуст');
        reject();
        return;
      }

      notes.updateNoteById(selectedNoteId.value, unsavedNote);
      rewriteUnsavedNote();
      selectedNoteId.value = 0;
      resolve();
    })
  }

  const addNoteToList = async () => {
    return new Promise<void>((resolve, reject) => {
      if (!unsavedNote.title) {
        alert('Заголовок не может быть пуст');
        reject();
      } else {
        notes.addNote(unsavedNote);
        rewriteUnsavedNote();
        selectedNoteId.value = 0;
        resolve();
      }
    })
  }

  const deleteNoteFromList = (id: number = selectedNoteId.value) => {
    notes.deleteNoteById(id);
    selectedNoteId.value = 0;
  }

  const changeTaskChecked = (noteId: number, taskId: number) => {
    const note = notes.getNoteById(noteId);
    if (!note) {
      return;
    }

    note.tasks = note.tasks.map((task) => {
      if (task.id === taskId) {
        return {...task, checked: !task.checked};
      }

      return task
    })
    notes.updateNoteById(noteId, note);
  }

  return {
    noteList,
    unsavedNote,
    notesAmount,
    emptyTaskAmount,

    addEmptyTasks,
    flushUnsavedNote,
    saveEditChanges,
    addNoteToList,
    deleteNoteFromList,
    changeTaskChecked,
    selectNote,
  }
})
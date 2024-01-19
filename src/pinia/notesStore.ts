import { computed, ref, reactive } from 'vue';

import { defineStore } from 'pinia';

import NoteType from '../utils/types/noteType';
import TaskType from "../utils/types/taskType";

import { NotesService } from '../utils/classes/Notes';

export const useNotesStore = defineStore('notes', () => {
  const notes = new NotesService();

  const noteList = reactive(notes.getNotes());
  const unsavedNote = reactive(NotesService.generateEmptyNote());
  const selectedNoteId = ref(0);

  const emptyTaskAmount = computed(() => unsavedNote
      .tasks
      .filter(task => !task.text)
      .length
  );


  const rewriteUnsavedNote = (newData: Partial<NoteType> = NotesService.generateEmptyNote()): void => {
    let key: keyof NoteType;

    for (key in newData) {
      if (unsavedNote[key] !== undefined) {
        unsavedNote[key] = newData[key] as NoteType[keyof NoteType]; // TODO нужна помощь. Как сказать тайпскрипту об их идентичности?
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

  const deleteNoteFromList = async (id: number = selectedNoteId.value) => {
    return new Promise<void>((resolve, reject) => {
      selectedNoteId.value = 0;
      notes.deleteNoteById(id) ? resolve() : reject();
    });
  }

  return {
    noteList,
    unsavedNote,

    emptyTaskAmount,

    addEmptyTasks,
    flushUnsavedNote,
    saveEditChanges,
    addNoteToList,
    deleteNoteFromList,
    selectNote,
  }
})
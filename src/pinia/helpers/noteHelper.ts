import {defineStore} from 'pinia';

import NoteType from '../../utils/types/noteType';
import TaskType from "../../utils/types/taskType";

export const useNoteHelperStore = defineStore('noteHelper', () => {
  function createEmptyNote(index : number) {
    const emptyNote = {
      id: index,
      title: '',
      tasks: [],
    };

    generateEmptyTasks(emptyNote, index);
    return emptyNote;
  }

  function flushNote(note : NoteType, id : number) {
    note.id = id;
    note.title = '';
    note.tasks = [];
  }

  function fillNote(targetNote: NoteType, oldNote: NoteType) {
    targetNote.id = oldNote.id;
    targetNote.title = oldNote.title;
    targetNote.tasks = oldNote.tasks;
  }

  return {
    createEmptyNote,
    flushNote,
    fillNote,
    generateEmptyTasks,
  }
})
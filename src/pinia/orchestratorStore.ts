import { computed } from 'vue';

import { defineStore } from 'pinia';

import Pages from '../utils/enums/pages';

import { useNotesStore } from './notesStore';
import { usePagesStore } from './pagesStore';

export const useOrchestratorStore = defineStore('orchestrator', () => {
  const notesStore = useNotesStore();
  const pagesStore = usePagesStore();

  const curPage = computed<Pages>(() => pagesStore.getCurrentPage.value);

  function goBack() {
    switch (curPage.value) {
      case Pages.Edit:
        try {
          notesStore.flushUnsavedNote();
          pagesStore.goToPrevious();
        } catch (e) {}
        break;

      default:
        pagesStore.goTo(Pages.List);
    }
  }

  function goView(id: number) {
    notesStore.selectNote(id);
    pagesStore.goTo(Pages.View);
  }

  function goEdit(id: number) {
    notesStore.selectNote(id);
    pagesStore.goTo(Pages.Edit);
  }

  function goCreate() {
    pagesStore.goTo(Pages.Create);
  }

  async function saveNote() {
    switch (curPage.value) {
      case Pages.Create:
        try {
          await notesStore.addNoteToList();
          pagesStore.goToPrevious();
        } catch (e) {}
        break;

      case Pages.Edit:
        try {
          await notesStore.saveEditChanges();
          pagesStore.goToPrevious();
        } catch (e) {}
        break;
    }
  }

  async function deleteNote() {
    try {
      await notesStore.deleteNoteFromList();
      pagesStore.goToPrevious();
    } catch (e) {}
  }

  return {
    goBack,
    goView,
    goEdit,
    goCreate,
    saveNote,
    deleteNote,
  }
})
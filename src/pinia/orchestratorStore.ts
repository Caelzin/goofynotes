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

  function goList() {
    notesStore.flushUnsavedNote();
    pagesStore.goTo(Pages.List);
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

  async function saveNote(id: number | undefined = undefined) {
    switch (curPage.value) {
      case Pages.Create:
        try {
          await notesStore.addNoteToList();
          goList();
        } catch (e) {}
        break;

      case Pages.Edit:
        try {
          await notesStore.saveEditChanges();
          if (id) {
            goView(id);
          }
        } catch (e) {}
        break;
    }
  }

  async function deleteNote(id: number) {
    goView(id);
    setTimeout(() => {
      const result = confirm('Вы уверены, что хотите удалить документ?')

      if (result) {
        notesStore.deleteNoteFromList(id);
        goList();
      } else {
        goBack();
      }
    }, 100)

  }

  return {
    goBack,
    goList,
    goView,
    goEdit,
    goCreate,
    saveNote,
    deleteNote,
  }
})
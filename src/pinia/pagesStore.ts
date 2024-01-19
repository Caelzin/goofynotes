import {ref, computed} from 'vue';

import { defineStore } from 'pinia';

import Pages from '../utils/enums/pages';

import {useNotesStore} from './notesStore';

export const usePagesStore = defineStore('pages', () => {
  const notesStore = useNotesStore();

  const currentPage = ref(Pages.List);
  const previousPage = ref(Pages.List);

  const getCurrentPage = computed(() => currentPage);

  function goToPrevious() {
    currentPage.value = previousPage.value;
    previousPage.value = Pages.List;
  }

  function goTo(page: Pages, id?: number) {
    if (Pages[page]) {
      previousPage.value = currentPage.value;
      currentPage.value = page;
    }

    if (id !== undefined) {
      notesStore.selectNote(id);
    }
  }

  return {
    getCurrentPage,
    goToPrevious,
    goTo,
  }
})
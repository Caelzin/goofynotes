<template>
  <div class="note-edit">
    <NoteItem :modelValue="note" allow-edit />
  </div>
</template>

<script setup lang='ts'>
  import NoteItem from "../notes/NoteItem.vue";

  import {watch, reactive} from 'vue';
  import {useNotesStore} from '../../pinia/notesStore';
  import {useOrchestratorStore} from '../../pinia/orchestratorStore';

  const notesStore = useNotesStore();
  const orchestratorStore = useOrchestratorStore();

  const note = reactive(notesStore.unsavedNote);

  if (notesStore.emptyTaskAmount === 0) {
    notesStore.addEmptyTasks();
  }

  watch(note.tasks, () => {
    if (notesStore.emptyTaskAmount === 0) {
      notesStore.addEmptyTasks();
    }
  });
</script>

<style lang='stylus'>
</style>

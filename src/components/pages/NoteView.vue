<template>
  <div class="note-view">
    <NoteItem :modelValue="note" />

    <button @click="orchestratorStore.deleteNote">delete note</button>
  </div>
</template>

<script setup lang='ts'>
  import {computed} from 'vue';
  import {useNotesStore} from '../../pinia/notesStore';

  import NoteItem from '../notes/NoteItem.vue';

  const notesStore = useNotesStore();

  const note = computed(() => notesStore.unsavedNote);
</script>

<style lang='stylus'>

</style>

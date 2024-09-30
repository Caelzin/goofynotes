<template>
  <div class="note-view">
    <NoteToListButton/>

    <NoteItem :modelValue="note" />
    <NoteControlButtons :id="note.id"/>
  </div>
</template>

<script setup lang='ts'>
  import {computed} from 'vue';
  import {useNotesStore} from '../../pinia/notesStore';
  const notesStore = useNotesStore();

  import NoteItem from '../notes/NoteItem.vue';
  import NoteControlButtons from "../notes/NoteControlButtons.vue";
  import NoteToListButton from "../notes/NoteToListButton.vue";

  const note = computed(() => notesStore.unsavedNote);
</script>

<style lang='stylus'>
.note-view
  & .note-control-buttons
    margin-top 10px
</style>

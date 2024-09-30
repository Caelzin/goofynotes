<template>
  <div class="note-edit">
    <NoteToListButton/>

    <NoteItem :modelValue="note" allow-edit />

    <div class="note-edit-buttons">
      <button @click="orchestratorStore.saveNote(note.id)">Сохранить</button>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import NoteItem from "../notes/NoteItem.vue";

  import {watch, reactive} from 'vue';
  import {useNotesStore} from '../../pinia/notesStore';
  import {useOrchestratorStore} from '../../pinia/orchestratorStore';
  import NoteToListButton from "../notes/NoteToListButton.vue";

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
.note-edit
  &-buttons
    display flex
    justify-content flex-end
    margin-top 10px
    margin-right 10px

  &-buttons > button
    background-color green
    color white

    &:hover
      border-color green
</style>

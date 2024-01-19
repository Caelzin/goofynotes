<template>
  <div class="note-list">
    <div class="note-list-item" v-for="note in notesStore.noteList">
      <NoteItem class="note-preview"  :modelValue="getShortNote(note)" @click="openViewMode(note.id)" />
      <div class="note-list-buttons">
        <button @click="orchestratorStore.deleteNote">delete note</button>
        <button @click="orchestratorStore.deleteNote">delete note</button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import {useNotesStore} from '../../pinia/notesStore';
  import {useOrchestratorStore} from "../../pinia/orchestratorStore";

  import NoteItem from '../notes/NoteItem.vue';
  import NoteType from '../../utils/types/noteType';


  const notesStore = useNotesStore();
  const orchestratorStore = useOrchestratorStore();

  const openViewMode = function (id: number) {
    orchestratorStore.goView(id);
  }

  function getShortNote(note: NoteType) {
    return {...note, tasks: note.tasks.slice(0, 3)};
  }

</script>

<style lang="stylus">
.note-list
  display flex
  flex-direction column
  gap 20px

  &-item
    display flex
    justify-content center

.note-preview
  cursor pointer
  &:hover
    background-color #f5f5f5
</style>

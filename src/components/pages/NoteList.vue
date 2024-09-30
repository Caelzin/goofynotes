<template>
  <div class="note-list">
    <div class="note-list-create" @click="orchestratorStore.goCreate">
      <span class="material-symbols-outlined">add</span> Создать новую заметку
    </div>

    <div class="note-list-item" v-for="note in noteList">
      <NoteItem class="note-preview"  :modelValue="getShortNote(note)" @click="openViewMode(note.id)" />
      <NoteControlButtons :id="note.id"/>
    </div>

    <div class="note-list-empty" v-if="!noteList.length">
      Сейчас список заметок пуст. Почему бы не создать одну?
    </div>
  </div>
</template>

<script setup lang='ts'>
  import {computed} from 'vue';
  import {useNotesStore} from '../../pinia/notesStore';
  import {useOrchestratorStore} from "../../pinia/orchestratorStore";

  import NoteItem from '../notes/NoteItem.vue';
  import NoteControlButtons from "../notes/NoteControlButtons.vue";
  import NoteType from '../../utils/types/noteType';

  const notesStore = useNotesStore();
  const orchestratorStore = useOrchestratorStore();

  const openViewMode = function (id: number) {
    orchestratorStore.goView(id);
  }

  function getShortNote(note: NoteType) {
    return {...note, tasks: note.tasks.filter((task) => !task.checked).slice(0, 3)};
  }

  const noteList = computed(() => notesStore.noteList)

</script>

<style lang="stylus">
.note-list
  display flex
  flex-direction column
  gap 20px

  &-create
    color blue
    font-weight 600
    display flex
    align-items center
    gap 5px
    cursor pointer

  &-item
    display flex
    justify-content center
    gap 10px

  & .note-control-buttons
    flex-direction column

  &-empty
    color gray

.note-preview
  cursor pointer
  flex-grow 1
  &:hover
    background-color #f5f5f5
</style>

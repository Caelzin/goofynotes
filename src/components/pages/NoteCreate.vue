<template>
  <div class="note-create">
    <NoteToListButton/>

    <CustomInput v-model="note.title" placeholder="Заголовок заметки*" allow-edit />

    <Task v-for="task in note.tasks" :modelValue="task" allow-edit allow-check/>

    <div class="note-create-buttons">
      <button @click="orchestratorStore.saveNote()">Сохранить</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {reactive, watch} from 'vue';

  import CustomInput from '../ui/CustomInput.vue';
  import Task from '../notes/TaskItem.vue';

  import {useNotesStore} from '../../pinia/notesStore';
  const notesStore = useNotesStore();
  import {useOrchestratorStore} from "../../pinia/orchestratorStore";
  import NoteToListButton from "../notes/NoteToListButton.vue";
  const orchestratorStore = useOrchestratorStore();

  const note = reactive(notesStore.unsavedNote);
  if (notesStore.emptyTaskAmount === 0) {
    notesStore.addEmptyTasks(3);
  }

  watch(note.tasks, () => {
    if (notesStore.emptyTaskAmount === 0) {
      notesStore.addEmptyTasks();
    }
  });
</script>

<style lang="stylus">
.note-create
  &-buttons
    display flex
    justify-content flex-end
    margin-top 10px

  &-buttons > button
    background-color green
    color white

    &:hover
      border-color green
</style>

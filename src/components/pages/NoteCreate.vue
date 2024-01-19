<template>
  <div class="node-create">
    <CustomInput v-model="note.title" placeholder="Заголовок заметки*" allow-edit />

    <Task v-for="task in note.tasks" :modelValue="task" allow-edit />
  </div>
</template>

<script setup lang="ts">
  import {reactive, watch} from 'vue';

  import CustomInput from '../ui/CustomInput.vue';
  import Task from '../notes/TaskItem.vue';

  import {useNotesStore} from '../../pinia/notesStore';
  const notesStore = useNotesStore();

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
</style>

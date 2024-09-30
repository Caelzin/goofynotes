<template>
  <div class="note-item">
    <template v-if="props.allowEdit">
      <CustomInput v-model="props.modelValue.title" :placeholder="`Заметка #${props.modelValue.id}` " allow-edit />
    </template>

    <template v-else>
      <div class="note-item-text">{{ props.modelValue.title }}</div>
    </template>

    <template v-if="allowEdit">
      <Task v-for="task in props.modelValue.tasks" :modelValue="task" allow-edit/>
    </template>
    <template v-else>
      <Task v-for="task in notesForView" :modelValue="task" allow-check @check="checkHandler(task)"/>
    </template>

  </div>
</template>

<script setup lang="ts">
  import {PropType} from 'vue';

  import CustomInput from '../ui/CustomInput.vue';
  import Task from './TaskItem.vue';

  import type NoteType from '../../utils/types/noteType';
  import type TaskType from '../../utils/types/taskType';

  import {useNotesStore} from '../../pinia/notesStore';
  const notesStore = useNotesStore();

  const props = defineProps({
    modelValue: {
      type: Object as PropType<NoteType>,
      required: true,
    },
    allowEdit: {
      type: Boolean,
      default: false,
    },
  });

  const notesForView = [
      ...props.modelValue.tasks.filter((task) => !task.checked),
      ...props.modelValue.tasks.filter((task) => task.checked)
  ]

  function checkHandler(task: TaskType) {
    notesStore.changeTaskChecked(props.modelValue.id, task.id)
  }
</script>

<style lang="stylus">
  .note-item
    padding 20px
    border 1px solid #f5f5f5
    border-radius 20px

    &-text
      text-align start
      font-size 20px
      font-weight 600
</style>

<template>
  <div class="note-item">
    <template v-if="props.allowEdit">
      <CustomInput v-model="props.modelValue.title" :placeholder="`Заметка #${props.modelValue.id}` " allow-edit />
    </template>

    <template v-else>
      <div class="note-item-text">{{ props.modelValue.title }}</div>
    </template>

    <Task v-for="task in props.modelValue.tasks" :modelValue="task" :allow-edit="props.allowEdit"/>
  </div>
</template>

<script setup lang="ts">
  import {PropType, computed} from 'vue';

  import CustomInput from '../ui/CustomInput.vue';
  import Task from './TaskItem.vue';

  import {useOrchestratorStore} from '../../pinia/orchestratorStore';

  import NoteType from '../../utils/types/noteType';

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

  const orchestratorStore = useOrchestratorStore();


  const shortNotes = computed(() => props.modelValue);
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

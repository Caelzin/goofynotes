<template>
  <div class="task-item">
    <CustomCheckbox
        class="task-item-checkbox"
        v-model="props.modelValue.checked"
        :disabled="!props.allowEdit"
    />

    <template v-if="props.allowEdit">
      <CustomInput
          v-model="props.modelValue.text"
          placeholder="Текст заметки"
          allow-edit
      />
    </template>

    <template v-else>
      <div class="task-item-text">{{ props.modelValue.text }}</div>
    </template>
  </div>
</template>

<script setup lang="ts">
  import {PropType} from 'vue';

  import CustomCheckbox from '../ui/CustomCheckbox.vue';
  import CustomInput from '../ui/CustomInput.vue';

  import TaskType from '../../utils/types/taskType';

  const props = defineProps({
    modelValue: {
      type: Object as PropType<TaskType>,
      required: true,
    },
    allowEdit: Boolean,
  });

</script>

<style lang="stylus">
  .task-item
    display flex

    &-checkbox
      margin-top 12px

    &-text
      margin-top 10px
</style>

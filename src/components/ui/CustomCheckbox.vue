<script setup lang='ts'>
  import { ref, defineProps } from 'vue';

  const props = defineProps({
    modelValue: Boolean,
    disabled: Boolean,
  });

  const emit = defineEmits(['update:modelValue']);

  const toggleCheckbox = () => {
    if (!props.disabled) {
      emit('update:modelValue', !props.modelValue);
    }
  };
</script>

<template>
  <div class="custom-checkbox">
    <input
        type="checkbox"
        :checked="props.modelValue"
        :disabled="props.disabled"
        @click="toggleCheckbox"
    />
  </div>
</template>

<style scoped lang="stylus">
  $size = 16px

  .custom-checkbox
    display flex
    align-items center

    input
      appearance none
      margin-right 10px
      width $size
      height $size
      border 2px solid #3498db
      border-radius 4px
      outline none
      transition border-color 0.3s
      cursor pointer

      &:checked
        border-color #27ae60
        background-color #27ae60

      &:disabled
        cursor not-allowed
</style>
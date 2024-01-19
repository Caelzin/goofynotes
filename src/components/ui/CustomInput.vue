<template>
  <div class="custom-input">
    <input
        class="custom-input__input"
        :value="props.modelValue"
        :placeholder="placeholder"
        :type="type"
        @input="emitInput"
        :disabled="!props.allowEdit"
    />
    <span
        class="custom-input__placeholder"
        :class="{visible: props.modelValue}"
    >
      {{ placeholder }}
    </span>
  </div>
</template>

<script setup lang='ts'>
  export interface Props {
    modelValue: string,
    placeholder?: string,
    type?: string,
    allowEdit?: boolean,
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: 'Значение',
    type: () => 'text',
    allowEdit: () => false,
  })

  const emit = defineEmits(['update:modelValue']);

  function emitInput (event: Event) {
    emit('update:modelValue', event.target.value); //TODO тут после добавления value ругается, что делать?
  }

</script>

<style lang="stylus">
  $fontSize = 16px
  $padding = 10px
  $marginTop = 20px
  $borderWidth = 1px
  $borderRadius = 4px
  $verticalPadding = 12px
  $inputHeight = 2 * $verticalPadding + $fontSize

  .custom-input
    position relative
    padding-bottom 5px
    width 100%

    & > input
      box-sizing border-box
      width 100%
      outline none
      font-size $fontSize
      line-height $fontSize
      border $borderWidth solid #6c7688
      border-radius $borderRadius
      padding $verticalPadding $padding
      margin-top 20px

      &::placeholder
        font-size 14px

    & > span
      position absolute
      top $marginTop + $borderWidth + (($inputHeight - $fontSize) / 2)
      left $padding + $borderWidth
      transition transform .1s linear, opacity .04s linear
      color #6c7688
      font-size 14px
      opacity 0

      &.visible
        transform translate(-($padding), -30px)
        opacity 1
        transition transform .1s linear, opacity .1s linear
</style>
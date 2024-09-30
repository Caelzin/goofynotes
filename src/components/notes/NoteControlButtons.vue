<template>
  <div class="note-control-buttons">
    <button @click="orchestratorStore.goEdit(id)">Редактировать</button>
    <button @click="orchestratorStore.deleteNote(id)">Удалить</button>
  </div>
</template>

<script setup lang='ts'>
import {useOrchestratorStore} from "../../pinia/orchestratorStore";
const orchestratorStore = useOrchestratorStore();

withDefaults(defineProps<{
  id: number
}>(), {
  id: 0
})
</script>

<style lang="stylus">
.note-control-buttons
  display flex
  gap 10px
</style>


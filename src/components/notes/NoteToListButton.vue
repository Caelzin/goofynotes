<template>
  <div class="note-to-list-button" @click="orchestratorStore.goList">
    <span class="material-symbols-outlined">arrow_back</span> К заметкам
  </div>
</template>

<script setup lang="ts">
import {useOrchestratorStore} from '../../pinia/orchestratorStore';
const orchestratorStore = useOrchestratorStore();
</script>

<style lang="stylus">
.note-to-list-button
  color gray
  font-weight 600
  display flex
  align-items center
  gap 5px
  cursor pointer
  margin-bottom 10px
</style>
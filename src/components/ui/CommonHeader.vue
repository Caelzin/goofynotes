<template>
  <div class="header">
    <div class="header-area-left">
      <span class="material-symbols-outlined" v-if="showBackButton" @click="orchestrator.goBack">arrow_back</span>
    </div>

    <span class="header-title">{{props.title}}</span>

    <div class="header-area-right">
      <span class="material-symbols-outlined" v-if="showEditButton" @click="orchestrator.goEdit">edit</span>
      <span class="material-symbols-outlined" v-if="showCreateButton" @click="orchestrator.goCreate">add_circle</span>
      <span class="material-symbols-outlined" v-if="showSaveButton" @click="orchestrator.saveNote">save</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import {computed, ref, watch} from 'vue';

  import {usePagesStore} from '../../pinia/pagesStore';
  import {useOrchestratorStore} from '../../pinia/orchestratorStore';

  import Pages from '../../utils/enums/pages';

  const pagesStore = usePagesStore();
  const orchestrator = useOrchestratorStore();

  const props = defineProps({
    title: String,
  });

  const curPage = computed<Pages>(() => pagesStore.getCurrentPage.value);

  const showBackButton = computed(() => curPage.value !== Pages.List);
  const showEditButton = computed(() => curPage.value === Pages.View);
  const showCreateButton = computed(() => curPage.value === Pages.List);
  const showSaveButton = computed(() => [Pages.Create, Pages.Edit].includes(curPage.value));
</script>

<style lang="stylus">
  .header
    position sticky
    top 0
    height 36px
    padding 10px
    box-shadow 0 5px 5px #ebebeb
    background-color white
    z-index 1
    display flex
    justify-content space-between
    & .material-symbols-outlined
      font-size 36px

</style>

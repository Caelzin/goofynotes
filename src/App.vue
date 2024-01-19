<template>
  <CommonHeader />

  <div class="content">
    <NoteList v-if="isPage(Pages.List)"/>
    <NoteView v-if="isPage(Pages.View)"/>
    <NoteEdit v-if="isPage(Pages.Edit)"/>
    <NoteCreate v-if="isPage(Pages.Create)"/>
  </div>

</template>

<script setup lang='ts'>
  import NoteList from './components/pages/NoteList.vue';
  import NoteView from './components/pages/NoteView.vue';
  import NoteEdit from './components/pages/NoteEdit.vue';
  import NoteCreate from './components/pages/NoteCreate.vue';
  import CommonHeader from './components/ui/CommonHeader.vue';

  import {usePagesStore} from './pinia/pagesStore';

  import Pages from './utils/enums/pages';

  const pagesStore = usePagesStore();

  const isPage = function (page: Pages) {
    return page === pagesStore.getCurrentPage.value;
  };
</script>

<style lang="stylus">
  .content
    padding 20px
</style>

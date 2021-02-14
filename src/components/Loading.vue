<template>
   <div v-if="$store.state.loading || $store.state.error" class="loading-container">
      <p v-if="$store.state.error" class="loading">{{ $store.state.error }}</p>
      <p v-else class="loading">Loading ...</p>
   </div>
</template>

<script lang="ts">
export default {
   name: 'loading',
};
</script>

<style lang="scss">
.loading-container {
   position: fixed;
   z-index: 1;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background-color: rgba(0, 0, 0, 0.4);
}
</style>

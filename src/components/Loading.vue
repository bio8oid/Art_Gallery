<template>
   <div v-if="$store.state.loading || $store.state.error" class="loading-container">
      <h2 v-if="$store.state.error" class="loading">{{ $store.state.error }}</h2>
      <h2 v-else class="loading">Loading ...</h2>
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
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background-color: rgba(0, 0, 0, 0.4);
}

.loading {
   margin-top: 50vh;
}
</style>

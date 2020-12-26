<template>
  <div class="about">

        <List />

        <HelloWorld msg="Welcome to about page" />

  </div>
</template>

<script>
import List from '@/components/List.vue';
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  components: {
    List,
    HelloWorld
  }
}
</script>

<style lang="scss">
.about {
  background: #fff;
}
</style>

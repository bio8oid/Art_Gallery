<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Welcome to Careers</h1>
        <List />
  </div>
</template>

<script>
// @ is an alias to /src
import List from "@/components/List.vue";

export default {
  // name: "Careers",
  components: {
    List
  }
};

</script>
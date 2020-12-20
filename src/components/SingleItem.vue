<template>
      <div>

       <img
          style="width: 100%"
          v-bind:src="this.$store.state.content.artObject.webImage.url"
          v-bind:alt="this.$store.state.content.artObject.title"
        />

        <div class="record record-details">
          <h2>{{ this.$store.state.content.artObject.title }}</h2>
          <h3 v-if="this.$store.state.content.artObject.label.makerLine === null">
            {{ this.$store.state.content.artObject.principalOrFirstMaker }}
          </h3>
          <p>{{ this.$store.state.content.artObject.label.makerLine }}</p>
          <p>{{ this.$store.state.content.artObject.subTitle }}</p>
          <p class="record-description">
            {{ this.$store.state.content.artObject.label.description }}
          </p>
        </div>

        <!-- <p v-if="error">{{ error }}</p> -->

      </div> 
</template>

<script>
export default {
  name: "SingleItem"
};

</script>

<style lang="scss">

</style>



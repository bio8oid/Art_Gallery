<template>
  <div class="details">
    <LanguageButton v-on:changeLanguage="changeLanguage()" />

    <div id="app">
      <p v-if="this.$store.state.loading">Loading...</p>

      <div v-else>
        <SingleItem />
        <h2 class="related-items">YOU MAY BE INTERESTED WITH</h2>
        <Records
          class="details-related-records"
          v-bind:recordsData="this.$store.state.relatedItems"
          v-on:refresh="refreshContent()"
        />
      </div>

      <p v-if="this.$store.state.error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue'
import LanguageButton from '@/components/LanguageButton.vue'
import Records from '@/components/Records.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    SingleItem,
    LanguageButton,
    Records
  },

  watch: {
    $route: 'refreshContent'
  },

  methods: {
    changeLanguage() {
      this.changeStoreLanguage()
      this.fetchContent(
        `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`
      )
    },

    refreshContent() {
      this.$router.go()
    },

    ...mapActions(['fetchContent', 'changeStoreLanguage', 'getRelatedItems'])
  },

  async created() {
    this.getRelatedItems();
    this.fetchContent(
        `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`
      )
  }
}
</script>

<style lang="scss">

.related-items {
  margin-top: 20%;
  color: rgb(199, 199, 199);
  text-shadow: 3px 3px 10px #000;
}

.details-related-records {
  justify-content: space-around;
}
/* https://www.rijksmuseum.nl/api/en/collection/SK-A-2860?key=iOQQBTgH */
</style>

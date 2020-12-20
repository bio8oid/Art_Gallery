<template>
  <div class="details">
    <p class="language-button" @click="changeLanguage()">
      {{ this.$store.state.language === 'nl' ? 'EN' : 'NL' }}
    </p>

    <div id="app">
      <p v-if="this.$store.state.loading">Loading...</p>

      <div v-else>
        <SingleItem />
      </div>

      <p v-if="this.$store.state.error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import SingleItem from '@/components/SingleItem.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    SingleItem
  },

  methods: {
    changeLanguage() {
      this.changeStoreLanguage()
      this.fetchContent(
        `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`
      )
    },

    ...mapActions(['fetchContent', 'changeStoreLanguage'])
  },

  async created() {
    // JSON.parse(localStorage.removeItem('content'))

    try {
      await this.fetchContent(
        `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`
      )
    } catch (error) {
      console.log('error:', error)
    }
  }
}
</script>

<style lang="scss">
/* https://www.rijksmuseum.nl/api/en/collection/SK-A-2860?key=iOQQBTgH */
</style>
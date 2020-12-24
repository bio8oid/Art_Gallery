<template>
  <div class="home">
    <img class="background" alt="Vue logo" src="../assets/background.jpg" />

    <LanguageButton v-on:changeLanguage="changeLanguage()" />

    <div id="app">
      <label for="sort-by"></label>
      <select
        name="sort-by"
        id="sort-by"
        v-model="value"
        @change="sortByName(value)"
      >
        <option value="" disabled>sort by</option>
        <optgroup label="Date">
          <option value="oldest">from oldest</option>
          <option value="newest">from newest</option>
        </optgroup>
        <optgroup label="Title">
          <option value="a-z">a-z</option>
          <option value="z-a">z-a</option>
        </optgroup>
      </select>

      <p v-if="this.$store.state.loading">Loading...</p>

      <div v-else class="records-container">
        <Records v-bind:recordsData="this.$store.state.items" />
      </div>

      <p v-if="this.$store.state.error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import LanguageButton from '@/components/LanguageButton.vue'
import Records from '@/components/Records.vue'
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      value: ''
    }
  },

  components: {
    LanguageButton,
    Records
  },

  methods: {
    changeLanguage() {
      this.changeStoreLanguage()
      this.fetchContent(
        `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection?key=${this.$store.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`
      )
    },

    sortByName(value) {
      if (value === 'z-a') {
        this.$store.state.items = this.$store.state.items.sort((a, b) =>
          b.title.localeCompare(a.title)
        )
      }
      if (value === 'a-z') {
        this.$store.state.items = this.$store.state.items.sort((a, b) =>
          a.title.localeCompare(b.title)
        )
      }
      if (value === 'newest') {
        this.$store.state.items = this.$store.state.items.sort(
          (a, b) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/)
        )
      }
      if (value === 'oldest') {
        this.$store.state.items = this.$store.state.items.sort(
          (a, b) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/)
        )
      }
    },

    ...mapActions([
      'fetchContent',
      'changeStoreLanguage',
      'setItemsId',
      'setItems'
    ])
  },

  async created() {
    try {
      await this.fetchContent(
        `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection?key=${this.$store.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`
      )
    } catch (error) {
      console.log('error:', error)
    }
  }
}
</script>

<style lang="scss">
.background {
  width: 100%;
}
/* https://www.rijksmuseum.nl/api/en/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer */
</style>
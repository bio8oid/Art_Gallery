<template>
  <div class="randomizer">
    <p class="language-button" @click="this.changeLanguage()">
      {{ this.$store.state.language === 'nl' ? 'EN' : 'NL' }}
      <!-- {{ this.language === 'nl' ? 'EN' : 'NL' }} -->
    </p>

    <div id="app">
      <p v-if="this.$store.state.loading">Loading...</p>

      <div v-else>
        
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      //  loading: false,
      // post: null,
      // error: '',
      // language: 'nl',
      // key: 'iOQQBTgH',
      // value: '',
      // items: [],
      // itemsId : [],
      // relatedItems: [],
      random: 0, 
    }
  },

  methods: {
    // changeLanguage() {
    //   this.language === 'nl' ? (this.language = 'en') : (this.language = 'nl')
    //   this.fetch()
    // },

    getRandom() {
      this.random = Math.floor(Math.random() * (10 - 1) + 1)
      // console.log(this.items)
    },

    // fetch() {
    //   this.loading = true
    //   axios
    //     // .get(
    //     //   `https://www.rijksmuseum.nl/api/${this.language}/collection/${this.itemsId[this.random]}?key=${this.key}`
    //     // )
    //     .get(
    //       `https://www.rijksmuseum.nl/api/${this.language}/collection?key=${this.key}&ps=10&involvedMaker=Johannes%20Vermeer`
    //     )
    //     .then((res) => {
    //       this.loading = false
    //       this.post = res.data
    //     })
    //     .catch((err) => {
    //       this.loading = false
    //       this.error = err
    //     })
    // },
  },

  created: function () {
    this.getRandom()
    // this.fetch()
  },
}
</script>


<style lang="scss">
.randomizer {
  .record-randomizer {
    width: 95%;
    height: 100%;
    padding: 50px;
  }
}

.random-button {
  display: block;
  margin: 100px auto;
  width: 230px;
  font-size: 16px;
  padding: 15px;
  background: #202327;
  border: 3px solid #000;
  color: #ffdc96;
  border-radius: 10px;
  cursor: pointer;
}

/* https://www.rijksmuseum.nl/api/en/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer */
</style>
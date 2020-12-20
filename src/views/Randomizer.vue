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
  data() {
    return {
      random: JSON.parse(localStorage.getItem('random')) || 0
    }
  },

  components: {
    SingleItem
},

  methods: {

    changeLanguage() {
      // console.log('language:', this.$store.state.language)
      this.changeStoreLanguage()
      // console.log('this.url:', this.url)
      this.fetchContent(`https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$store.state.itemsId[this.random]}?key=${this.$store.state.key}`)
      // this.fetchContent(this.url)
    },

        getRandom() {
      this.random = Math.floor(Math.random() * (10 - 1) + 1)
      localStorage.setItem("random",JSON.stringify(this.random))
      // console.log(this.items)
    },

    ...mapActions(['fetchContent', 'changeStoreLanguage'])
},

async created() {

    try {

      this.getRandom()
  console.log('this.random:', this.random)
  console.log('itemsIDs:', this.$store.state.itemsId)
  console.log('this.randomID:', this.$store.state.itemsId[this.random])
      // let url = `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`
      // console.log('this.$route.params.id:', this.$route.params.id)

      await this.fetchContent(`https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$store.state.itemsId[this.random]}?key=${this.$store.state.key}`)

    } catch (error) {
      console.log('error:', error)
    }
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

/* <template>
  <div class="randomizer">
    <p class="language-button" @click="this.changeLanguage()">
      {{ this.$store.state.language === 'nl' ? 'EN' : 'NL' }}
    </p>

    <div id="app">
      <p v-if="this.$store.state.loading">Loading...</p>

      <div v-else>
        <SingleItem />
      </div>
      
    </div>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data() {
    return {
      random: 0, 
    }
  },

  methods: {


    getRandom() {
      this.random = Math.floor(Math.random() * (10 - 1) + 1)
      // console.log(this.items)
    },
  },

  created: function () {
    this.getRandom()
    // this.fetch()
  },
}
</script> */

</style>
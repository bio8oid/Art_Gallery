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

      <!-- <div v-else>



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

        <p v-if="this.$store.state.error">{{ error }}</p>

      </div> -->

        <p v-if="this.$store.state.error">{{ error }}</p>
    </div>

  </div>

</template>

<script>
// import axios from 'axios'
import SingleItem from '@/components/SingleItem.vue'
import { mapActions } from 'vuex'


export default {
  data() {
    return {
      // loading: false,
      // this.$store.state.content: null,
      // error: '',
      // language: 'nl',
      // key: 'iOQQBTgH',
      // value: ''
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
      this.fetchContent(`https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`)
      // this.fetchContent(this.url)
    },

//     changeLanguage() {
//       this.language === 'nl' ? (this.language = 'en') : (this.language = 'nl')
//       this.fetch()
//     },

//     fetch() {
//       this.loading = true
//       axios
//         .get(
//           `https://www.rijksmuseum.nl/api/${this.language}/collection/${this.$route.params.id}?key=${this.key}`
//         )
//         .then((res) => {
//           this.loading = false
//           this.this.$store.state.content = res.data
//         })
//         .catch((err) => {
//           this.loading = false
//           this.error = err
//         })
//     },
//   },

  // created: function () {
//         console.log('this.$route.params.id:', this.$route.params.id)
//       JSON.parse(localStorage.removeItem('content'))
// this.fetchContent(`https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`)
  //   console.log('this.$store.state.content', this.$store.state.content)
  // },

  
  //   watch: {
  //   // call again the method if the route changes
  //   '$route': 'fetchContent'
  // },

    ...mapActions(['fetchContent', 'changeStoreLanguage'])
},

async created() {
    // console.log('this.$route.params.id:', this.$route.params.id)
    // console.log('this.$store.state.content', this.$store.state.content)
    // console.log('kutas')

    // JSON.parse(localStorage.removeItem('content'))

    try {
      // let url = `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`
      console.log('this.$route.params.id:', this.$route.params.id)

      await this.fetchContent(`https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection/${this.$route.params.id}?key=${this.$store.state.key}`)

    } catch (error) {
      console.log('error:', error)
    }
  },
}

</script>

<style lang="scss">
.details {
  min-height: 100vh;
}

.record-details {
  width: 95%;
  height: 100%;
  padding: 50px;

  h2 {
    padding-bottom: 50px;
  }

  .record-description {
    padding-top: 50px;
    font-size: 17px;
  }

  @media not all and (hover: none) {
    &:hover {
      transform: scale(1);
    }
  }
}

/* https://www.rijksmuseum.nl/api/en/collection/SK-A-2860?key=iOQQBTgH */
</style>
<template>
  <div class="details">
    <h1>Welcome to Details - {{ $route.params.id }}</h1>

    <button  @click="changeLanguageToEnglish()">EN</button>
    <button   @click="changeLanguageToDutch()">NL</button>

    <div id="app">
      <p v-if="loading">Loading...</p>

      <div
        v-else
        style="display: flex; flex-direction: column; align-items: center"
      >
      <img
            style="width: 100%"
            v-bind:src="post.artObject.webImage.url"
            v-bind:alt="post.artObject.title"
          />

      <h2>{{ post.artObject.principalOrFirstMaker }}</h2>
            <p>{{ post.artObject.title }}</p>

    

      <!-- <p>{{ post }}</p> -->

      <p v-if="error">{{ error }}</p>
    </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      loading: false,
      post: null,
      error: '', 
      language: '' || 'nl'
    }
  },

  methods: {
    changeLanguageToEnglish() {
       this.language = 'en'
      this.fetch() 
    },
    changeLanguageToDutch() {
       this.language = 'nl'
      this.fetch() 
    },

    fetch() {
      this.loading = true
    axios
      .get(
       `https://www.rijksmuseum.nl/api/${this.language}/collection/${ this.$route.params.id }?key=iOQQBTgH&`
      )
      .then((res) => {
        this.loading = false
        this.post = res.data
      })
      .catch((err) => {
        this.loading = false
        this.error = err
      })
    }
  },

    created: function () {
      this.fetch()
    }

  // created: function fetchData() {
  //   this.loading = true
  //   axios
  //     .get(
  //      `https://www.rijksmuseum.nl/api/${this.language}/collection/${ this.$route.params.id }?key=iOQQBTgH&`
  //     )
  //     .then((res) => {
  //       this.loading = false
  //       this.post = res.data
  //     })
  //     .catch((err) => {
  //       this.loading = false
  //       this.error = err
  //     })
  // }
}
</script>
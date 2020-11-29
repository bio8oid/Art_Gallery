<template>
  <div class="details">
    <!-- <h1>Welcome to Details - {{ $route.params.id }}</h1> -->

    

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

      <h2>{{ post.artObject.title }}</h2>
<p>{{post.dimentions}}</p>

      <!-- <h2>{{ post.artObject.principalOrFirstMaker }}</h2> -->
            <!-- <p>{{ post.artObject.title }}</p>principalMakers -->
            <h3>{{ post.artObject.principalOrFirstMaker }}</h3>
            <!-- <p>{{ post.artObject.principalMakers.placeOfBirth }}</p>
            <p>{{ post.artObject.principalMakers.dateOfBirth }}</p>
            <p>{{ post.artObject.principalMakers.dateOfDeath }}</p>
            <p>{{ post.artObject.principalMakers.placeOfDeath }}</p>
            <p>{{ post.artObject.principalMakers.placeOfBirth }}</p> -->


            <p>{{ post.artObject.label.makerLine }}</p>
            <p>{{ post.artObject.subTitle }}</p>
            <p>{{ post.artObject.label.description }}</p>

            <button @click="changeLanguage()">{{this.language === 'nl' ? 'EN' : 'NL'}}</button>

    

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
      language: 'nl',
      key: 'iOQQBTgH'
    }
  },

  methods: {
    changeLanguage() {
      this.language === 'nl' ? this.language = 'en' : this.language = 'nl'
      this.fetch() 
    },

    fetch() {
      this.loading = true
    axios
      .get(
       `https://www.rijksmuseum.nl/api/${this.language}/collection/${ this.$route.params.id }?key=${this.key}`
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
}
</script>
<template>
  <div class="home">
    <button @click="changeLanguage()">
      {{ this.language === 'nl' ? 'EN' : 'NL' }}
    </button>

    <img alt="Vue logo" src="../assets/logo.png" />
    <div id="app">
      <p v-if="loading">Loading...</p>

      <div
        v-else
        style="display: flex; flex-direction: column; align-items: center"
      >
        <div
          style="
            border: 2px solid #41b883;
            margin: 50px;
            padding: 50px;
            display: flex;
            justify-content: space-between;
            width: 50%;
          "
          v-for="item in post.artObjects"
          :key="item.id"
        >
          <div>
            <h2>{{ item.principalOrFirstMaker }}</h2>
            <p>{{ item.title }}</p>

            <router-link
              :to="{ name: 'Details', params: { id: item.objectNumber } }"
            >
              Details
            </router-link>
          </div>

          <img
            v-if="item.hasImage"
            style="height: 200px"
            v-bind:src="item.webImage.url"
            v-bind:alt="item.title"
          />
        </div>

        <a href=""></a>
      </div>

      <p v-if="error">{{ error }}</p>
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
      key: 'iOQQBTgH',
      prefix: "https://cors-anywhere.herokuapp.com/"
    }
  },

  methods: {
    changeLanguage() {
      this.language === 'nl' ? (this.language = 'en') : (this.language = 'nl')
      this.fetch()
    },

        fetch() {
      this.loading = true
    axios
      .get(
       this.prefix + `https://www.rijksmuseum.nl/api/${this.language}/collection?key=${this.key}&ps=10&involvedMaker=Johannes%20Vermeer`
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
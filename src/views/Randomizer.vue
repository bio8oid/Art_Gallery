<template>
  <div class="randomizer">
    <p class="language-button" @click="changeLanguage()">
      {{ this.language === 'nl' ? 'EN' : 'NL' }}
    </p>

    <div id="app">
      <p v-if="loading">Loading...</p>

      <div v-else>
        <img
          style="width: 100%"
          v-bind:src="post.artObjects[random].webImage.url"
          v-bind:alt="post.artObjects[random].title"
        />

        <span @click="getRandom()" class="random-button"
          >GET RANDOM RECORD</span
        >

        <div class="record record-randomizer">
          <h2>{{ post.artObjects[random].title }}</h2>
          <!-- <h3 v-if="post.artObjects[random].label.makerLine === null">
            {{ post.artObjects[random].principalOrFirstMaker }}
          </h3> -->
          <!-- <p>{{ post.artObjects[random].label.makerLine }}</p> -->
          <p>{{ post.artObjects[random].subTitle }}</p>
          <p class="record-description">
            <!-- {{ post.artObjects[random].label.description }} -->
          </p>
        </div>

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
      key: 'iOQQBTgH',
      prefix: 'https://cors-anywhere.herokuapp.com/',
      random: 0,
    }
  },

  methods: {
    changeLanguage() {
      this.language === 'nl' ? (this.language = 'en') : (this.language = 'nl')
      this.fetch()
    },

    getRandom() {
      this.random = Math.floor(Math.random() * (10 - 1) + 1)
    },

    fetch() {
      this.loading = true
      axios
        .get(
          `https://www.rijksmuseum.nl/api/${this.language}/collection?key=${this.key}&ps=10&involvedMaker=Johannes%20Vermeer`
        )
        .then((res) => {
          this.loading = false
          this.post = res.data
        })
        .catch((err) => {
          this.loading = false
          this.error = err
        })
    },
  },

  created: function () {
    this.getRandom()
    this.fetch()
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
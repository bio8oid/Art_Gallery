<template>
  <div class="details">
    <p class="language-button" @click="changeLanguage()">
      {{ this.language === 'nl' ? 'EN' : 'NL' }}
    </p>

    <div id="app">
      <p v-if="loading">Loading...</p>

      <div v-else>
        <img
          style="width: 100%"
          v-bind:src="post.artObject.webImage.url"
          v-bind:alt="post.artObject.title"
        />

        <div class="record record-details">
          <h2>{{ post.artObject.title }}</h2>
          <h3 v-if="post.artObject.label.makerLine === null">
            {{ post.artObject.principalOrFirstMaker }}
          </h3>
          <p>{{ post.artObject.label.makerLine }}</p>
          <p>{{ post.artObject.subTitle }}</p>
          <p class="record-description">
            {{ post.artObject.label.description }}
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
          `https://www.rijksmuseum.nl/api/${this.language}/collection/${this.$route.params.id}?key=${this.key}`
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
    this.fetch()
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
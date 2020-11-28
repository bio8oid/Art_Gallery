<template>
  <div class="details">
    <h1>Welcome to Details - {{ $route.params.id }}</h1>

    <div id="app">
      <p v-if="loading">Loading...</p>

      <div
        v-else
        style="display: flex; flex-direction: column; align-items: center"
      >
      <p>{{ post }}</p>

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
      id: '',
      prefix: "https://cors-anywhere.herokuapp.com/"
    }
  },

  created: function () {
    this.loading = true
    axios
      .get(
       `https://www.rijksmuseum.nl/api/nl/collection/${ this.$route.params.id }?key=iOQQBTgH&`
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
}
</script>
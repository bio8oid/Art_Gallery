<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div id="app">
      <p v-if="loading">Loading...</p>

      <!-- <p v-else>{{ post.artObjects }}</p> -->
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

            <!-- <a href="">details</a> -->
            <!-- <router-link to="/details/:id">Details</router-link> -->

            <router-link :to="{ name: 'Details', params: { id: item.objectNumber } }">
              Details
            </router-link>

            <!-- <p style="font-size: 12px">{{ item.id }}</p> -->
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
    }
  },

  created: function () {
    this.loading = true
    axios
      .get(
        'https://www.rijksmuseum.nl/api/nl/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer'
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
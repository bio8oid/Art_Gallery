<template>
  <div class="home">
    <img class="background" alt="Vue logo" src="../assets/background.jpg" />

    <button class="language-button" @click="changeLanguage()">
      {{ this.language === 'nl' ? 'EN' : 'NL' }}
    </button>

    <div id="app">
      <p v-if="loading">Loading...</p>

      <div v-else class="records-container">
        <div class="record" v-for="item in post.artObjects" :key="item.id">
          <router-link
            class="details-link"
            :to="{ name: 'Details', params: { id: item.objectNumber } }"
          >
            <div class="record-wrapper">
              <div class="record-text">
                <h2>{{ item.principalOrFirstMaker }}</h2>
                <p>{{ item.title }}</p>
              </div>
              <img
                class="record-image"
                v-if="item.hasImage"
                v-bind:src="item.webImage.url"
                v-bind:alt="item.title"
              />
            </div>
          </router-link>
        </div>
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
      prefix: 'https://cors-anywhere.herokuapp.com/',
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
    this.fetch()
  },
}
</script>



<style lang="scss">
.background {
  width: 100%;
}

.language-button {
  position: fixed;
  top: 30px;
  right: 25px;
}

.records-container {
  display: flex;
  flex-wrap: wrap;
}

.record {
  box-shadow: 5px 5px 10px #202327;
  border-radius: 10px;
  width: 45%;
  height: 50vh;
  margin: 2.5%;
  background: #fff;
  text-decoration: none;

  .record-wrapper {
    padding: 50px;
    display: flex;
    justify-content: space-between;
    height: 50vh;

    .record-text {
      padding-right: 50px;
      text-align: left;
      color: #2c3e50;

      h2 {
        margin: 0;
      }
      p {
        font-size: 16px;
      }
    }

    .record-image {
      height: 100%;
      max-width: 50%;
      border-radius: 10px;
      border: 6px solid#2c3e50;
      box-shadow: 0 0 5px #2c3e50;
    }
  }

  &:hover {
    transform: scale(1.01);
  }

  .details-link {
    text-decoration: none;
  }
}

@media (max-width: 1099px) {
  .record {
    width: 100%;
  }
}

@media (max-width: 579px) {
  .record {
    height: 100%;

    .record-wrapper {
      height: 100%;
      flex-direction: column;
      align-items: center;

      .record-image {
        max-height: 200px;
        width: 100%;
      }

      .record-text {
        padding: 0;
        text-align: center;
      }
    }
  }
}

/* https://www.rijksmuseum.nl/api/en/collection?key=iOQQBTgH&ps=10&involvedMaker=Johannes%20Vermeer */
</style>
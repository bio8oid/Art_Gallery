<template>
  <div class="home">
    <img class="background" alt="Vue logo" src="../assets/background.jpg" />

    <p class="language-button" @click="changeLanguage()">
      {{ this.$store.state.language === 'nl' ? 'EN' : 'NL' }}
    </p>

    <div id="app">
      <label for="categories"></label>
      <select
        name="categories"
        id="categories"
        v-model="value"
        @change="sortByName(value)"
      >
        <option value="" disabled>sort by</option>
        <optgroup label="Date">
          <option value="oldest">from oldest</option>
          <option value="newest">from newest</option>
        </optgroup>
        <optgroup label="Title">
          <option value="a-z">a-z</option>
          <option value="z-a">z-a</option>
        </optgroup>
      </select>

      <p v-if="this.$store.state.loading">Loading...</p>

      <div v-else class="records-container">
        <div
          class="record"
          v-for="item in this.$store.state.items"
          :key="item.id"
        >
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

      <p v-if="this.$store.state.error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      // url: `https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection?key=${this.$store.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`,
      value: ''
    }
  },
  
  methods: {

    changeLanguage() {
      this.changeStoreLanguage()
      this.fetchContent(`https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection?key=${this.$store.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`)
      
      // this.setItemsId()
      // this.fetchContent(this.homeUrl)
            // this.setItemsId()

    },

    sortByName(value) {
      if (value === 'z-a') {
        this.$store.state.items = this.$store.state.items.sort((a, b) =>
          b.title.localeCompare(a.title)
        )
      }
      if (value === 'a-z') {
        this.$store.state.items = this.$store.state.items.sort((a, b) =>
          a.title.localeCompare(b.title)
        )
      }
      if (value === 'newest') {
        this.$store.state.items = this.$store.state.items.sort(
          (a, b) => b.longTitle.match(/\d{4}/) - a.longTitle.match(/\d{4}/)
        )
      }
      if (value === 'oldest') {
        this.$store.state.items = this.$store.state.items.sort(
          (a, b) => a.longTitle.match(/\d{4}/) - b.longTitle.match(/\d{4}/)
        )
      }
    },

    ...mapActions(['fetchContent', 'changeStoreLanguage', 'setItemsId', 'setItems'])
  },

  async created() {
    try {
      // const url = `https://www.rijksmuseum.nl/api/${this.state.language}/collection?key=${this.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`

      // await this.fetchContent(this.homeUrl)

      await this.fetchContent(`https://www.rijksmuseum.nl/api/${this.$store.state.language}/collection?key=${this.$store.state.key}&ps=10&involvedMaker=Johannes%20Vermeer`)

      // this.setItems()
      // this.setItemsId()
            
    } catch (error) {
      console.log('error:', error)
    }
  }
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
  z-index: 3;
  background: #2c3e50;
  border-radius: 5px;
  padding: 3px 5px;
  margin: 0;
  color: #ffdc96;
  font-size: 16px;
  cursor: pointer;
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

  @media not all and (hover: none) {
    &:hover {
      transform: scale(1.01);
    }
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

fetch() {
      this.loading = true
      axios
        .get(
          this.prefix + `https://www.rijksmuseum.nl/api/${this.language}/collection?key=${this.key}&ps=10&involvedMaker=Johannes%20Vermeer`
        )
        .then((res) => {
          this.state.loading = false
          this.state.post = res.data
          this.state.items = this.state.post.artObjects
          this.state.itemsId = this.state.items.map(x => x.objectNumber)
          console.log('fetched:')
        })
        .catch((err) => {
          this.state.loading = false
          this.state.error = err
        })
    }

export default fetch;
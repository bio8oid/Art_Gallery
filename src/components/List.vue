<template>
  <div id="list-to-do">
    <h1>TO DO LIST VUE</h1>
    <form action="">
      <input class="input" v-model="newToDo" v-on:submit="add()" />
      <input type="submit" value="Add" class="add-button" v-on:click="add()" />
    </form>

    <!-- <button class="add-button" v-on:click="add()" >Add</button> -->
    <ul style="list-style-type: none; text-align: left">
      <li v-for="(todo, i) in exisitingToDo" :key="i">
        <span> {{ `Nr ${i + 1} - ` }} {{ todo.text }} </span>
        <button class="delete-button" v-on:click="deleteToDo()">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    msg: String,
  },

  data() {
    return {
      newToDo: '',
      exisitingToDo: [
        { text: 'Get lemons', id: 0 },
        { text: 'Get anions', id: 1 },
        { text: 'Get bag of potatos', id: 2 },
      ],
    }
  },

  methods: {
    add() {
      this.preventDefault
      this.exisitingToDo.push({
        text: this.newToDo,
        id: new Date().indexOf,
      }),
        (this.newToDo = '')
      this.preventDefault
    },
    deleteToDo(i) {
      this.exisitingToDo.splice(i, 1)
    },
  },
}
</script>

<style>
</style>
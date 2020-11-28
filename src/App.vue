<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/categories">Categories</router-link> |
      <router-link to="/random">Random</router-link> 
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 100px;
}

body {
  color: #c8c7e2;
  padding: 0;
  margin: 0;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }
  
    html {
    box-sizing: border-box;
  }

#nav {
  padding: 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
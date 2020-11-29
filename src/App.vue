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
  margin-top: 80px;
}

body {
  color: #c8c7e2;
  padding: 0;
  margin: 0;
  background: #40474f;
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
  /* background: #fff; */
  background: #202327;
      /* color: #202327; */
      box-shadow: 0 0 10px #000;

      color: #96ffc2;
  z-index: 3;

  a {
      color: #96ffc2;
    font-weight: bold;
    /* color: #2c3e50; */
    text-decoration: none;
    font-weight: 300;
    padding: 0 10px;

    &.router-link-exact-active {
      color: #ffdc96;
      /* color: #42b983; */
    }
  }
}
</style>
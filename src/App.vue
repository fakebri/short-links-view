<template>
  <div id="app">
    <nav v-if="!$route.meta.hideNav">
      <router-link to="/">主页</router-link> |
      <router-link to="/login">登录</router-link> |
      <a href="http://localhost:8080/shortlinks/swagger-ui/index.html" target="_blank">API文档</a>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  padding-bottom: 10vh;
}
</style>

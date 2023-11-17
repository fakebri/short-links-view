<template>
  <div id="app">
    <div class="bg" v-if="!$route.meta.hideNav">
      <img
        src="https://zuramai.github.io/starback.js/examples/snowfall/images/bg.png"
      />
    </div>
    <canvas class="background" ref="background"></canvas>
    <div class="menu" v-if="!$route.meta.hideNav">
      <el-menu class="menu-el" mode="horizontal">
        <el-menu-item index="1"
          ><router-link to="/">主页</router-link></el-menu-item
        >
        <el-menu-item index="2"
          ><router-link to="/login">登录</router-link></el-menu-item
        >
        <el-menu-item index="3"
          disabled>管理面板</el-menu-item
        >
        <el-menu-item index="4"
          ><a
            href="http://localhost:8080/shortlinks/swagger-ui/index.html"
            target="_blank"
            >API文档</a
          ></el-menu-item
        >
      </el-menu>
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
}

.menu {
  width: 325px;
  margin: 0 auto;
  margin-bottom: 24px;
}

.menu-el {
  border-radius: 12px;
}

.bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}
.bg img {
  height: 100vh;
  width: 100%;
  transition: all 2s cubic-bezier(0.25, 1, 0.5, 1);
  object-fit: cover;
  transform: scale(1.1);
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>

<script>
import Starback from "starback";
export default {
  mounted() {
    let canvas = this.$refs.background;
    const starback = new Starback(this.$refs.background, {
      type: "dot",
      quantity: 300,
      starSize: [1, 5],
      direction: 20,
      starColor: "white",
      randomOpacity: [0.7, 1],
      backgroundColor: "transparent",
      // backgroundColor:["red"],
      width: window.innerWidth,
      height: window.innerHeight,
    });
  },
};
</script>
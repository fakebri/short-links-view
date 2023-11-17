<template>
  <div class="container">
    <div class="menu">
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        router
        :collapse="false"
      >
      <div v-if="userName" style="width:100%"><el-button type="danger" @click="logout">登出</el-button></div>
        <el-menu-item index="1" route="/user/list">
          <i class="el-icon-menu"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="2" route="/surl/list">
          <i class="el-icon-menu"></i>
          <span slot="title">短链接管理</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">统计数据</span>
        </el-menu-item>
        <el-menu-item index="4" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="5" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="6" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="7" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="8" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="9" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="10" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="11" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="12" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="13" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="14" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
        <el-menu-item index="15" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">其他管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <h2 v-if="this.$route.path=='/admin'">
      欢迎您，{{userName}} 
      </h2>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.menu {
  width: 10%;
  min-width: 150px;
  height: 100vh;
}
.content {
  box-sizing: content-box;
  padding-left: 16px;
  width: 90%;
  height: 100%;
}
</style>

<script>
export default {
  data(){
    return{
      userName: "",
    }
  },
  created() {
    let user = localStorage.getItem("user")
    if (user) {
      let data = JSON.parse(user);
      this.userName = data.userName;
    }
  },
  methods:{
    logout(){
      localStorage.clear();
      this.$message({
          message: '登出成功',
          type: 'success'
        });
      setTimeout(() => {
      this.$router.go("/login")
      }, 500);
    },
  }
};
</script>
<template>
  <div class="login">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form :model="userForm" ref="userForm" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="userForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="userForm.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login('userForm')" class="login-btn" type="primary"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.box-card {
  max-height: 320px;
  max-width: 360px;
  width: 50vw;
  height: 50vh;
  margin: 0 auto;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>

<script>
import { get, post } from "@/utils/request";
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      userForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          post("/shortlinks/auth/login", {
            userName: this.userForm.username,
            password: this.userForm.password,
          })
            .then((message) => {
              if (message != null) {
                this.$message({
                  message: "登录成功",
                  type: "success",
                });
                localStorage.setItem("user", JSON.stringify(message.data));
                this.$router.push("/admin");
              }
            })
            .catch((error) => {
              this.$message({
                message: "登录失败: " + error.response.data.message,
                type: "error",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    if (localStorage.getItem("user") != null) {
      this.$router.push("/admin");
    }
  },
};
</script>

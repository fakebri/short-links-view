<template>
  <div class="login">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <el-form :model="userForm" ref="userForm" :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="userForm.username"
            placeholder="用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="userForm.password"
            clearable
          ></el-input>
        </el-form-item>
        <div id="nc"></div>
        <br />
        <br />
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
  min-height: 300px;
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

#nc {
  width: 100%;
  margin-bottom: 100px;
  /* background: red; */
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
      captcha: {},
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.captcha) {
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
    // // 在组件加载完成后，动态创建 script 标签引入远程 JavaScript 文件
    // const script = document.createElement("script");
    // script.src = "https://g.alicdn.com/AWSC/AWSC/awsc.js";
    // script.async = true; // 可选，异步加载
    // document.head.appendChild(script);
  },
  mounted() {
    // 实例化nc
    AWSC.use("nc", function (state, module) {
      // 初始化
      window.nc = module.init({
        // 应用类型标识。它和使用场景标识（scene字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的appkey字段值，请务必正确填写。
        appkey: "CF_APP_1",
        //使用场景标识。它和应用类型标识（appkey字段）一起决定了滑动验证的业务场景与后端对应使用的策略模型。您可以在阿里云验证码控制台的配置管理页签找到对应的scene值，请务必正确填写。
        scene: "register",
        // 声明滑动验证需要渲染的目标ID。
        renderTo: "nc",
        //前端滑动验证通过时会触发该回调参数。您可以在该回调参数中将会话ID（sessionId）、签名串（sig）、请求唯一标识（token）字段记录下来，随业务请求一同发送至您的服务端调用验签。
        success: function (data) {
          this.captcha = {
            sessionId: data.sessionId,
            sig: data.sig,
            token: data.token,
          };
        },
        // 滑动验证失败时触发该回调参数。
        fail: function (failCode) {
          window.console && console.log(failCode);
        },
        // 验证码加载出现异常时触发该回调参数。
        error: function (errorCode) {
          window.console && console.log(errorCode);
        },
      });
    });
  },
};
</script>

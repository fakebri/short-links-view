<template>
  <div class="home">
    <el-card class="box-card" shadow="hover">
      <a class="linkCount">本站已有{{linksCount}}条链接</a>
      <el-tabs v-model="activeTab" @tab-click="changeTab">
        <el-tab-pane label="缩短网址" name="short">
          <el-input
            placeholder="请输入要缩短的网址.."
            v-model="originalUrl"
            clearable
            class="box-input"
            autofocus
          >
            <el-button slot="append" icon="el-icon-link" @click="doShortUrl"
              >缩短</el-button
            >
          </el-input>
          <el-input
            placeholder="缩短的网址"
            v-model="shortUrl"
            :disabled="disableShortUrl"
            class="box-input"
          >
            <el-button
              slot="append"
              icon="el-icon-copy-document"
              @click="copyToClipboard"
              >复制</el-button
            >
          </el-input>
          <el-collapse accordion @change="collapseChange">
            <el-collapse-item>
              <template slot="title">
                更多<i class="header-icon el-icon-info"></i>
              </template>
              <div>
                <div>
                  <el-input
                    placeholder="自定义链接"
                    size="small"
                    maxlength="10"
                    show-word-limit
                    v-model="customShortUrl"
                  >
                    <template slot="prepend">{{ API_BASE_URL +"/s/" }}</template>
                  </el-input>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="网址还原" name="reshort">
          <el-input
            placeholder="请输入要还原的短链接.."
            v-model="shortUrl"
            clearable
            class="box-input"
          >
            <el-button slot="append" icon="el-icon-link" @click="doReshortUrl"
              >还原</el-button
            >
          </el-input>
          <el-input
            placeholder="源链接网址"
            v-model="originalUrl"
            :disabled="disableShortUrl"
            class="box-input"
          >
            <el-button
              slot="append"
              icon="el-icon-copy-document"
              @click="copyToClipboard"
              >复制</el-button
            >
          </el-input>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<style scoped>
.box-card {
  width: 50vw;
  height: 40vh;
  margin: 0 auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
}

.box-input:nth-child(1) {
  margin-bottom: 20px;
}

.linkCount {
  padding: 12px;
  border-radius: 6px;
  background-color: #F0F0F2;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
</style>

<script>
import { get, post } from "@/utils/request.js";
import { API_BASE_URL } from "@/constants/appConstants";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      originalUrl: "",
      shortUrl: "",
      expireDate: "",
      disableShortUrl: true,
      activeTab: "short",
      customShortUrl: "",
      API_BASE_URL,
      linksCount: 0,
    };
  },
  computed: {
  },
  mounted() {
    get("/shortlinks/count")
      .then(res=>{
        this.linksCount = res;
      }).error(error => {
        this.$alert("获取链接数量出错，请检查网络！");
      })
  },
  methods: {
    doShortUrl() {
      let data = {
        originalUrl: this.originalUrl,
        customShortUrl: this.customShortUrl,
        expiresDays: 0,
      };
      if (this.customShortUrl != "") {
        data.customShortUrl = API_BASE_URL +"/s/" + this.customShortUrl;
      } 
      console.log(post);
      post("/shortlinks/short", data)
        .then((response) => {
          console.log(response);
          this.shortUrl = response.data.shortUrl;
        })
        .catch((error) => {});
    },
    copyToClipboard() {
      navigator.clipboard
        .writeText(this.shortUrl)
        .then(() => {
          this.$notify({
            title: "成功",
            message: "短链接已经复制到粘贴板",
            type: "success",
          });
        })
        .catch((err) => {
          this.$notify.error({
            title: "失败",
            message: "无法复制到粘贴板，请检查浏览器权限配置",
          });
        });
    },
    changeTab() {
      this.originalUrl = "";
      this.shortUrl = "";
    },
    collapseChange(event) {
      if (event == "") {
        this.customShortUrl = "";
      }
    },
    doReshortUrl() {
      post("/shortlinks/reshort", {
        shortUrl: this.shortUrl,
      })
        .then((response) => {
          this.originalUrl = response.data.originalUrl;
        })
        .catch((error) => {});
    },
  },
};
</script>

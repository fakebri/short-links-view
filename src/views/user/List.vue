<template>
  <div>
    <div style="padding: 5px">
      <el-button type="primary">添加</el-button>
      <el-button type="danger" @click="batchDel">批量删除</el-button>
    </div>
    <el-table :data="tableData" ref="multipleTable" border max-height="700">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="userId" label="用户编号" width="150" selection>
      </el-table-column>
      <el-table-column prop="userName" label="用户名称" width="120" selection>
      </el-table-column>
      <el-table-column prop="password" label="用户密码" width="120">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { get, post } from "@/utils/request";
export default {
  methods: {
    handleClick(row) {
      this.$alert(JSON.stringify(row), "对象详细", {
        confirmButtonText: "确定",
        callback: (action) => {},
      });
    },
    batchDel() {
      let delArr = [];
      this.$refs.multipleTable.selection.forEach((user) => {
        delArr.push(user.userId);
      });
      console.log(delArr);
      post("/shortlinks/admin/user/del",{
        "delUserIds" : delArr
      })
        .then((res) => {
          this.$alert("删除成功").then(()=>{
            this.$router.go();
          })
          
        })
        .catch((error) => {
          this.$alert("删除失败，错误："+error);
        });
    },
  },
  mounted() {
    get("/shortlinks/admin/user/all")
      .then((res) => {
        this.tableData = res;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  data() {
    return {
      tableData: [],
    };
  },
};
</script>

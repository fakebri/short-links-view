<template>
  <div>
    <div style="padding: 5px;">
      <el-button type="primary">添加</el-button>
      <el-button type="danger">批量删除</el-button>
    </div>
    <el-table :data="tableData" border max-height="700">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="surlId" label="短链接编号" width="150" selection>
      </el-table-column>
      <el-table-column prop="shortUrl" label="短链接" width="300" selection>
      </el-table-column>
      <el-table-column prop="originalUrl" label="源链接" width="500">
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
      this.$alert(JSON.stringify(row), '对象详细', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
    },
  },
  mounted() {
    get("/shortlinks/admin/surl/all")
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

<template>
  <el-col :span="24">
    <el-col class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="pageTotal">
      </el-pagination>
    </el-col>
  </el-col>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      pageTotal: Number,
      pageSize: Number,
      pageIndex: Number,
      pageChange: Function,
    },
    data() {
      return {
      }
    },

    methods: {
      handleCurrentChange(val) {
        this.$emit('pageChange', val)
      },
    },
    mounted() {
    },
  }
</script>

<style scoped>
  .pagination {
    text-align: right;
    margin-top: 30px;
  }
</style>

<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleModalCancel" width="35%" :show-close="false">
    <slot></slot>
    <div slot="footer" class="dialog-footer" show-close="false"	>
      <el-button @click="handleModalCancel">取 消</el-button>
      <el-button type="primary" @click="handleModalConfirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "commonModal",
    props: {
      dialogFormVisible:Boolean,
      showClose:Boolean,
      title:String,
      handleCancel:Function
    },
    methods:{
      handleModalCancel(){
        this.$emit('handleCancel',false)
      },
      handleModalConfirm(){
        this.$emit('handleConfirm',false)
      },
    }
  }
</script>

<style scoped>

</style>

<template>
  <el-col :span="24">
    <el-table :data="tableData" v-loading="loading"
              element-loading-text="列表正在加载中" border fit highlight-current-row
              style="width: 100%;">
      <el-table-column align="center" :label="'单位类型'" prop="name">
      </el-table-column>
      <el-table-column align="center" :label="'操作'">
        <template slot-scope="scope">
          <el-button size="mini" plain
                     @click="handleAdd"
          >添加
          </el-button>
          <el-button size="mini" type="primary" plain
                     @click="handleEdit(scope.row.id)"
          >编辑
          </el-button>
          <el-button size="mini" type="danger" plain
                     @click="handleDel(scope.row.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :pageIndex="pageIndex" :pageSize="pageSize" :pageTotal="total"
                @pageChange="handlePageChange"></Pagination>
    <commonModal :dialogFormVisible="formVisible" :title="form.id?'修改模具类别':'添加模具类别'" @handleCancel="handleCancel"
                 @handleConfirm="handleComfirm">
      <el-form :model="form" :rules="rules" label-position="left" label-width="0px"
               class="form-container">
        <el-form-item label="单位类别:" :label-width="formLabelWidth" prop="name">
          <el-input style="width: 200px" v-model="form.name" size="small" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </commonModal>
  </el-col>

</template>

<script>
  import {basicService} from '../../api';
  import {Pagination, commonModal} from '../../components';

  export default {
    name: "unitType",
    components: {
      Pagination,
      commonModal
    },
    data() {
      return {
        pageIndex: 1,
        pageSize: 10,
        loading: true,
        total: 0,
        tableData: [],
        formVisible: false,
        formLabelWidth: '100px',
        form: {
          name:''
        },
        options: [],
        rules: {
          name: [
            {required: true, message: '请输入模具类别', trigger: 'blur'},
          ],
        },
      }
    },
    methods: {
      handlePageChange(val) {
        this.pageIndex = val;
        this.getList()
      },
      handleAdd() {
        this.formVisible = true;
        this.form = {}
      },
      handleCancel(val) {
        this.formVisible = false
      },
      handleEdit(id) {
        this.formVisible = true;
        this.form.id = id;
        this.getTypeById(id)
      },
      handleComfirm(val) {
        this.formVisible = false;
        if (this.form.id) {
          this.editTypeById()
        } else {
          this.addWorkshop()
        }
      },
      handleSelect(val){
        this.$set(this.form, 'workshopTypeId', val)
      },
      handleDel(id) {
        this.$confirm('确认删除？', '提示', {
          type: 'warning',
        })
          .then(_ => {
            this.delWorkshop(id)
          })
          .catch(_ => {
            console.log(222)
          });
      },
      getList: async function () {
        basicService.getUnitType(this.pageIndex,this.pageSize)
          .then(res=>{
            this.tableData = res.list;
            this.total = res.total;
            this.loading = false;
          })
      },
      getTypeById(id) {
        basicService.getUnitTypeById(id).then((res) => {
          this.$set(this.form, 'name', res.name)
        });
      },
      editTypeById() {
        basicService.editUnitType(this.form.id,this.form.name).then((res) => {
          if (res.code == '200') {
            this.$message.success(res.message)
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        });
      },
      addWorkshop() {
        console.log(this.form.name)
        basicService.addUnitType(this.form.name).then(res => {
          if (res.code == '200') {
            this.$message.success(res.message)
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      delWorkshop(id) {
        basicService.delUnitType(id).then(res => {
          if (res.code == '200') {
            this.$message.success(res.message)
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        })
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped>
  .form-container {
    width: 75%;
    margin: 0 auto;
  }
</style>

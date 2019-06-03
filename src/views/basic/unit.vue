<template>
  <el-col :span="24">
    <el-table :data="tableData" v-loading="loading"
              element-loading-text="列表正在加载中" border fit highlight-current-row
              style="width: 100%;">

      <el-table-column align="center" :label="'编号'" prop="measureUnitCode">
      </el-table-column>
      <el-table-column align="center" :label="'单位名称'" prop="measureUnitName">
      </el-table-column>
      <el-table-column align="center" :label="'单位类型'" prop="measureTypeName">
      </el-table-column>
      <el-table-column align="center" :label="'操作'" width="250">
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
    <commonModal :dialogFormVisible="formVisible" :title="form.id?'修改单位':'添加单位'" @handleCancel="handleCancel"
                 @handleConfirm="handleComfirm">
      <el-form :model="form" :rules="rules" label-position="left" label-width="0px"
               class="form-container">
        <el-form-item label="编号:" :label-width="formLabelWidth" prop="measureUnitCode">
          <el-input v-model="form.measureUnitCode" autocomplete="off" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="单位名称:" :label-width="formLabelWidth" prop="measureUnitName">
          <el-input v-model="form.measureUnitName" autocomplete="off" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="单位类型:" :label-width="formLabelWidth" prop="measureTypeId">
          <el-select style="width: 200px" v-model="form.measureTypeId" size="small" placeholder="请选择"
                     @change="handleSelect($event,'measureTypeId')">
            <el-option
              v-for="item in unitType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </commonModal>
  </el-col>

</template>

<script>
  import {basicService} from '../../api';
  import {Pagination, commonModal} from '../../components';

  export default {
    name: "module",
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
          measureUnitCode: '',
          measureUnitName: '',
          measureTypeId:'',
        },
        unitType: [],
        rules: {
          measureUnitCode: [
            {required: true, message: '请输入单位编号', trigger: 'blur'},
          ],
          measureUnitName: [
            {required: true, message: '请输入单位名称', trigger: 'blur'},
          ],
          measureTypeId: [
            {required: true, message: '请选择单位类别', trigger: 'blur'},
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
      handleSelect(val, name) {
        this.$set(this.form, name, val)
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
      getData: function () {
        basicService.getAllUnitType()
          .then(res=>{
            this.unitType = res.map(role => {
              return {
                label: role.name,
                value: role.id,
              }
            });
          })
      },
      getList: function () {
        basicService.getUnitInfo(this.pageIndex, this.pageSize)
          .then(res => {
            this.tableData = res.list;
            this.total = res.total;
            this.loading = false;
          })
      },
      getTypeById(id) {
        basicService.getUnitInfoById(id).then((res) => {
          this.form = res
        });
      },
      editTypeById() {
        basicService.editUnitInfo(this.form).then((res) => {
          if (res.code == '200') {
            this.$message.success(res.message)
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        });
      },
      addWorkshop() {
        basicService.addUnitInfo(this.form).then(res => {
          if (res.code == '200') {
            this.$message.success(res.message);
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      delWorkshop(id) {
        basicService.delUnitInfo(id).then(res => {
          if (res.code == '200') {
            this.$message.success(res.message);
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        })
      }
    },
    mounted() {
      this.getList();
      this.getData();
    }
  }
</script>

<style scoped>
  .form-container {
    width: 75%;
    margin: 0 auto;
  }

  .el-form-item {
    margin-bottom: 0 !important;
  }
</style>

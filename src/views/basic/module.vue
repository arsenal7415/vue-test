<template>
  <el-col :span="24">
    <el-table :data="tableData" v-loading="loading"
              element-loading-text="列表正在加载中" border fit highlight-current-row
              style="width: 100%;">

      <el-table-column align="center" :label="'编号'" prop="mouldCode">
      </el-table-column>
      <el-table-column align="center" :label="'名称'" prop="mouldName">
      </el-table-column>
      <el-table-column align="center" :label="'来源'" prop="mouldSourceName">
      </el-table-column>
      <el-table-column align="center" :label="'类别'" prop="mouldTypeName">
      </el-table-column>
      <el-table-column align="center" :label="'规格型号'" prop="materielModelName">
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
    <commonModal :dialogFormVisible="formVisible" :title="form.id?'修改模具':'添加模具'" @handleCancel="handleCancel"
                 @handleConfirm="handleComfirm">
      <el-form :model="form" :rules="rules" label-position="left" label-width="0px"
               class="form-container">
        <el-form-item label="编号:" :label-width="formLabelWidth" prop="mouldCode">
          <el-input v-model="form.mouldCode" autocomplete="off" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="名称:" :label-width="formLabelWidth" prop="mouldName">
          <el-input v-model="form.mouldName" autocomplete="off" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="来源:" :label-width="formLabelWidth" prop="mouldSourceId">
          <el-select style="width: 200px" v-model="form.mouldSourceId" size="small" placeholder="请选择"
                     @change="handleSelect($event,'mouldSourceId')">
            <el-option
              v-for="item in moduleSource"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别:" :label-width="formLabelWidth" prop="mouldTypeId">
          <el-select style="width: 200px" v-model="form.mouldTypeId" size="small" placeholder="请选择"
                     @change="handleSelect($event,'mouldTypeId')">
            <el-option
              v-for="item in moduleType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格型号:" :label-width="formLabelWidth" prop="model">
          <el-select style="width: 200px" v-model="form.model" size="small" placeholder="请选择"
                     @change="handleSelect($event,'model')">
            <el-option
              v-for="item in materielModel"
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
          mouldCode: '',
          mouldName: '',
          mouldSourceId: '',
          mouldTypeId: '',
          model: '',
        },
        moduleSource: [],
        moduleType: [],
        materielModel: [],
        rules: {
          mouldCode: [
            {required: true, message: '请输入模具编号', trigger: 'blur'},
          ],
          mouldName: [
            {required: true, message: '请输入模具名称', trigger: 'blur'},
          ],
          mouldSourceId: [
            {required: true, message: '请选择模具来源', trigger: 'blur'},
          ],
          mouldTypeId: [
            {required: true, message: '请选择模具类别', trigger: 'blur'},
          ],
          model: [
            {required: true, message: '请选择规格型号', trigger: 'blur'},
          ]
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
      getData: async function () {
        const allModuleTypePromise = basicService.getAllModuleType();
        const allModuleSourcePromise = basicService.getAllModuleSource();
        const allMaterielSizePromise = basicService.getAllMaterielSize();
        const [allModuleType, allModuleSource, allMaterielSize] = await Promise.all([allModuleTypePromise, allModuleSourcePromise, allMaterielSizePromise]);

        this.moduleType = allModuleType.map(role => {
          return {
            label: role.mouldTypeName,
            value: role.id,
          }
        });
        this.moduleSource = allModuleSource.map(role => {
          return {
            label: role.mouldSourceName,
            value: role.id,
          }
        });
        this.materielModel = allMaterielSize.map(role => {
          return {
            label: role.materielModelName,
            value: role.id,
          }
        });
      },
      getList: function () {
        basicService.getModuleInfo(this.pageIndex, this.pageSize)
          .then(res => {
            this.tableData = res.list;
            this.total = res.total;
            this.loading = false;
          })
      },
      getTypeById(id) {
        basicService.getModuleInfoById(id).then((res) => {
          this.form = res
        });
      },
      editTypeById() {
        basicService.editModuleInfo(this.form).then((res) => {
          if (res.code == '200') {
            this.$message.success(res.message)
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        });
      },
      addWorkshop() {
        console.log(this.form)
        basicService.addModuleInfo(this.form).then(res => {
          if (res.code == '200') {
            this.$message.success(res.message);
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      delWorkshop(id) {
        basicService.delModuleInfo(id).then(res => {
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

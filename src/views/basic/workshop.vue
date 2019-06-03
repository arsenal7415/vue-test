<template>
  <el-col :span="24">
    <el-table :data="tableData" v-loading="loading"
              element-loading-text="列表正在加载中" border fit highlight-current-row
              style="width: 100%;">

      <el-table-column align="center" :label="'车间编号'" prop="workshopCode">
      </el-table-column>
      <el-table-column align="center" :label="'名称'" prop="workshopName">
      </el-table-column>
      <el-table-column align="center" :label="'车间类别'" prop="workshopTypeName">
      </el-table-column>
      <el-table-column align="center" :label="'工位数量'" prop="workstationNumber">
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
    <commonModal :dialogFormVisible="formVisible" :title="'添加车间'" @handleCancel="handleCancel"
                 @handleConfirm="handleComfirm">
      <el-form :model="form" :rules="rules" label-position="left" label-width="0px"
               class="form-container">
        <el-form-item label="车间编号:" :label-width="formLabelWidth" prop="workshopCode">
          <el-input v-model="form.workshopCode" autocomplete="off" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="名称:" :label-width="formLabelWidth" prop="workshopName">
          <el-input v-model="form.workshopName" autocomplete="off" size="small" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="车间类别:" :label-width="formLabelWidth" prop="workshopTypeId">
          <el-select style="width: 200px" v-model="form.workshopTypeId" size="small" placeholder="请选择"
                     @change="handleSelect">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工位数量:" :label-width="formLabelWidth" prop="workstationNumber">
          <el-input style="width: 200px" v-model="form.workstationNumber" size="small" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </commonModal>
  </el-col>

</template>

<script>
  import {basicService} from '../../api';
  import {Pagination, commonModal} from '../../components';

  export default {
    name: "workshop",
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
          workshopCode: '',
          workshopName: '',
          workshopTypeId: '',
          workstationNumber: ''
        },
        options: [],
        rules: {
          workshopCode: [
            {required: true, message: '请输入车间编号', trigger: 'blur'},
          ],
          workshopName: [
            {required: true, message: '请输入车间名称', trigger: 'blur'},
          ],
          workshopTypeId: [
            {required: true, message: '请选择车间类别', trigger: 'blur'},
          ],
          workstationNumber: [
            {required: true, message: '请输入工位数量', trigger: 'blur'},
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
        this.getWorkshopInfoById(id)
      },
      handleComfirm(val) {
        this.formVisible = false;
        if (this.form.id) {
          this.editWorkshopInfo()
        } else {
          this.addWorkshop()
        }
      },
      handleSelect(val) {
        this.$set(this.form, 'workshopTypeId', val)
      },
      handleDel(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delWorkshop(id)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      getList: async function () {
        const data = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        const allWorkshopTypePromise = basicService.getAllWorkshopType();
        //获取用户权限
        const workShopListPromise = basicService.getWorkShopList(data);
        const [allWorkshopType, workShopList] = await Promise.all([allWorkshopTypePromise, workShopListPromise]);
        const dataSource = allWorkshopType.map(role => {
          return {
            label: role.workshopTypeName,
            value: role.id,
          }
        });
        this.tableData = workShopList.list;
        this.total = workShopList.total;
        this.options = dataSource;
        this.loading = false;
      },
      getWorkshopInfoById(id) {
        basicService.getWorkshopInfoById(id).then((res) => {
          this.form = res
        });
      },
      editWorkshopInfo() {
        const data=this.form;
        basicService.editWorkshopInfo(data).then((res) => {
          if (res.code == '200') {
            this.$message.success(res.message)
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        });
      },
      addWorkshop() {
        basicService.addWorkShop(this.form).then(res => {
          if (res.code == '200') {
            this.$message.success(res.message)
            this.getList()
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      delWorkshop(id) {
        basicService.delWorkShop(id).then(res => {
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

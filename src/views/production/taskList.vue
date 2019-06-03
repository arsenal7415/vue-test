<template>
  <el-col :span="24">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name=""></el-tab-pane>
      <el-tab-pane label="计划中" name="PLANNED"></el-tab-pane>
      <el-tab-pane label="已下达" name="RELEASED"></el-tab-pane>
      <el-tab-pane label="已结案" name="CLOSED"></el-tab-pane>
      <el-tab-pane label="已挂起" name="HANG_UP"></el-tab-pane>
    </el-tabs>
    <el-table :data="tableData" v-loading="loading"
              @cell-click="checkProduction" element-loading-text="列表正在加载中" border fit highlight-current-row
              style="width: 100%;" @selection-change="handleSelect">
      <el-table-column align="center" type="selection" width="55px"></el-table-column>
      <el-table-column align="center" :label="'操作'">
        <template v-slot="scope">
          <el-button size="mini" plain type="primary"
                     @click="handleSplit"
          >拆分
          </el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'产品任务单号'" prop="scope.row.id">
        <template v-slot="scope">
          <span v-text="scope.row.id"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'状态'" prop="scope.row.taskStatus" width="120px">
        <template v-slot="scope">
          <el-select v-model="scope.row.planStatus==='PLANNED'?'计划中':'未计划'" size="mini" @change="handleChange($event,scope.row.id,'plan')">
            <el-option
              key="UNPLANNED"
              label="取消计划"
              value="UNPLANNED">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'审核状态'" prop="scope.row.auditStatus" width="120px">
        <template slot-scope="scope">
          <el-select v-model="scope.row.auditStatus==='AUDITED'?'已审核':'未审核'" size="mini" @change="handleChange($event,scope.row.id,'audit')">
            <el-option
              key="AUDITED"
              label="审核通过"
              value="AUDITED">
            </el-option>
            <el-option
              key="UNAUDITED"
              label="取消审核"
              value="UNAUDITED">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'生产车间'" prop="workshop">
      </el-table-column>
      <el-table-column align="center" :label="'产品代码'" prop="bomCode">
      </el-table-column>
      <el-table-column align="center" :label="'产品名称'" prop="bomName">
      </el-table-column>
      <el-table-column align="center" :label="'规格型号'" prop="materielModel">
      </el-table-column>
      <el-table-column align="center" :label="'单位'" prop="measureUnit">
      </el-table-column>
      <el-table-column align="center" :label="'计划生产数量'" prop="planProductionNumber">
      </el-table-column>
      <el-table-column align="center" :label="'计划开工日期'" prop="planCommencementDate">
      </el-table-column>
      <el-table-column align="center" :label="'计划完工日期'" prop="planCompletionDate">
      </el-table-column>
    </el-table>
    <Pagination :pageIndex="pageIndex" :pageSize="pageSize" :pageTotal="total"
                @pageChange="handlePageChange"></Pagination>
  </el-col>
</template>

<script>
  import {basicService, taskService} from '../../api/index';
  import {Pagination} from '@/components';
  export default {
    name: "taskList",
    components: {
      Pagination
    },
    data() {
      return {
        pageIndex: 1,
        pageSize: 10,
        loading: true,
        total: 100,
        tableData: [],
        selectKeys: [],
        activeName:'',
      }
    },
    methods: {
      handlePageChange(val) {
        this.pageIndex = val;
        this.getList()
      },
      handleChange(val,id,type){
        if(type=='plan'){
          taskService.changePlan(id)
            .then(res=>{
              console.log(res)
            })
        }else{
          taskService.changeAudit(id,val)
            .then(res=>{
              console.log(res)
            })
        }
        this.getList()
      },
      handleSplit(){
        console.log(111)
      },
      handleClick(tab, event) {
        this.activeName=tab.name;
        this.pageIndex=1;
        this.getList()
      },
      checkProduction(row) {
        console.log(row.id)
      },
      handleSelect(val) {
        console.log(val)
      },
      getList() {
        const data = {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          status:this.activeName=='0'?'':this.activeName
        };
        taskService.getTaskList(data).then((res) => {
          this.tableData = res.list;
          this.total = res.total;
          this.loading = false;
        });
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style scoped>

</style>

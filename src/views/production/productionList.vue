<template>
  <el-row :gutter="40">
    <el-col :span="4" v-for="item in lists" class="card">
      <el-card shadow="hover" :body-style="{ padding: '0px' }">
        <div :style="{backgroundColor:item.color}" style="height: 145px">
          <img :src="item.img" alt="" style="width: 60px;margin-top: 30px">
          <div class="title">
            {{item.title}}
          </div>
        </div>
        <!--<a :href="item.url" class="go">-->
          <!--点击进入>-->
        <!--</a>-->
        <router-link :to="{name: item.name}" class="go" href="javascript:">
                 点击进入> 
        </router-link>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  import productionTabs from '@/static/productionTabs'
  export default {
    name: "productionList",
    components: {},
    data() {
      return {
        lists:productionTabs
      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style scoped>
  a{
    display: block;
    text-decoration: none;
  }
  .title{
    color: #fff;
    margin-top: 10px;
    font-family: 'Microsoft YaHei';
  }
  .card{
    margin: 20px auto;
  }
  .go{
    text-align: right;
    line-height: 45px;
    padding-right: 10px;
    color: #666;
  }
</style>

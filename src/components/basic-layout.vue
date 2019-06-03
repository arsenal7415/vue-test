<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <div class="logo">
        <!--<task-img :src="logo" alt="">-->
      </div>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleTopMenu"
        background-color="#f0f5fb"
        text-color="#5BA916"
        router
        active-text-color="#5BA916">
        <el-menu-item v-for="(item,columns) in $router.options.routes" v-if="!item.hidden" :index="item.path">
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#fff0e3"
          text-color="#333"
          router
          active-text-color="#5BA916">
          <el-menu-item v-for="(item,index) in leftMenus" v-if="!item.hidden&&!item.children" :index="item.path">
            <!--<img :src="item.img" alt="" v-if="item.img" class="menu-img">-->
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu v-for="(item,index) in leftMenus" v-if="!item.hidden&&item.children" :index="item.path">
            <template slot="title">
              <span class="title">{{item.name}}</span>
            </template>
            <el-menu-item-group v-if="item.children">
              <el-menu-item v-for="(list,index) in item.children" v-if="!list.hidden" :index="list.path"
                            class="sub-title">{{list.name}}
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <!--<strong class="title">{{$route.name}}</strong>-->
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  // import get from '../common/js/http'
  export default {
    data() {
      return {
        sysName: 'VUEADMIN',
        collapsed: false,
        url: '',
        sysUserName: '',
        activeIndex: '/',
        activeLeft: '/',
        sysUserAvatar: '',
        activeName: 'second',
        leftMenus: [],
        logo: '../assets/logo.png',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      handleTopMenu(key, keyPath) {
        const routers = this.$router.options.routes;
        const path = routers.filter(item => {
          return item.path == keyPath
        })
        this.leftMenus = path[0].children;
      },
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      showMenu(i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
      },
      getUrlActive:function(url){
        const firstPath = url.split('/')[1];
        const routers = this.$router.options.routes;
        const path = routers.filter(item => {
          return item.path == '/' + firstPath;
        });
        this.leftMenus = path[0].children ? path[0].children : [];
        this.activeIndex = '/' + firstPath;
        this.activeLeft = this.$route.path;
      }
    },
    computed: {
      getUrl() {
        return this.$store.state.url
      }
    },
    watch: {
      getUrl: function (url) {
        this.getUrlActive(url)
      }
    },
    mounted() {
      this.getUrlActive( this.$route.path)
    }
  }

</script>

<style scoped lang="scss">
  @import '@/styles/vars.scss';

  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: #324057;
      color: #fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        width: 230px;
        float: left;
        height: 60px;
        background: #000;
        img {
          width: 40px;
          height: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 230px;
      }
      .logo-collapse-width {
        width: 60px
      }
      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .el-menu-vertical-demo {
      width: 100% !important;
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      .sub-title {
        text-align: right;
        padding-right: 65px;
      }
      aside {
        flex: 0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu {
          height: 100%;
        }
        /*.el-menu-item, .el-submenu__title{*/
          /*height: 86px;*/
          /*font-size: 16px;*/
        /*}*/
        .menu-img{
          display: block;
          margin: 20px auto -5px;
        }
        .collapsed {
          width: 60px;
          .item {
            position: relative;
          }
          .submenu {
            position: absolute;
            top: 0px;
            left: 60px;
            z-index: 99999;
            height: auto;
            display: none;
          }

        }
      }
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
      }
      .content-container {
        // background: #f1f2f7;
        flex: 1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            /*float: left;*/
            color: #475669;
          }
          .breadcrumb-inner {
            line-height: 60px;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>

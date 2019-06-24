<template>
<el-row class="header-body">
    <el-col class="header">
      <el-col :span="16" class="logo">
        <div class="logoimg"></div>
          <div>
            <el-menu class="navbar" mode="horizontal">
              <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened" style="float:left;"></hamburger>
              <breadcrumb></breadcrumb> -->
              <leftMenu class="hamburger-container"></leftMenu>
            </el-menu>
          </div>
      </el-col>
      <el-col :span="5">
        <div class="tools">
          <div class="portrait-div">
            <!-- <img src="../assets/logo.png" /> -->
          </div>
            <div class="account-login">
              <p>张三</p>
              <p>你好，欢迎登录</p>
            </div>
        </div>
      </el-col>
      <!-- <el-col :span="3" class="userinfo" divided>
       <div @click="logout">安全退出</div>
      </el-col> -->
    </el-col>
</el-row>
</template>
<script>
// import { mapGetters } from 'vuex'
// import breadcrumb from '@/components/breadcrumb/breadcrumb'
// import hamburger from '@/components/hamburger/hamburger'
import leftMenu from '../components/leftMenu'
export default {
  components: {
    leftMenu
    // breadcrumb,
    // hamburger
  },
  // computed: {
  //   ...mapGetters([
  //     'sidebar',
  //     'avatar'
  //   ])
  // },
  methods: {
    // logout() {
    //   this.$store.dispatch('LogOut').then(() => {
    //     location.reload() // 为了重新实例化vue-router对象 避免bug
    //   })
    // },
    // toggleSideBar() {
    //   this.$store.dispatch('ToggleSideBar')
    // }
  }
}
</script>
<style scoped>
.header-body{
  height: 75px;
}
.header{
  height: 80px;
  /* line-height:80px; */
  background-color: rgb(59, 94, 131);
  width: 100%;
  position:fixed;
  z-index:10000;
}
.logo{
  float:left;
  height:80px;
}
.logoimg{
  float:left;
  height:80px;
}
.logo img{
  width: 195px;
  height:36px;
  margin: 23px 25px 0px 17px;
}
.portrait-div{
  float:left;
  height:80px;
}
.portrait-div img{
  margin-top:17px;
  width:48px;
  height:48px;
}
.tools{
  /* // float: right; */
  display:inline-block;
}
.account-login{
  /* // float:left;
  // margin-top: 17px; */
  display:inline;
  margin-left: 10px;
}
.account-login p{
  color:#fff;
  font-size:14px;
  height:24px;
  line-height:24px;
  padding:0;
  margin:0;
}
.userinfo{
  color:#fff;
  font-size:14px;
  color:#b7deff;
  height:80px;
}
.userinfo div{
  text-align:right;
  padding:12px 20px 0 0;
  cursor:pointer;
}
.navbar {
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  float:left;
  background:none;
  border:0;
    /* .hamburger-container {
    line-height: 60px;
    height: 60px;
    float: left;
    padding: 0 10px;
    color:#fff;
    } */
  }

.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
  color: #fff;
}
.el-breadcrumb__separator {
    color: #b6dffe;
}
</style>

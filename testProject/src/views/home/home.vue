<template>
  <headTop></headTop>
  <!-- <leftMenu></leftMenu> -->
</template>


<script>
import leftMenu from '../../components/leftMenu'
import headTop from '../../components/head-top';

export default {
  components: { leftMenu ,headTop },
  created(){
    // this.input = this.$t("lang.homeOverview") // 必须得是双引号
    console.log("enter homePage ")
  },
  methods:{
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeBut() {
      console.log('welcome to the magic world!!!')
    //   this.$router.push({ path: '/home/home.vue' })
    },
    change() {
      console.log('welcome to the magic world!!!')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>

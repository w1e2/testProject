<template>
  <div class="hello">
    <el-button type="primary" @click="changeBut" size="mini">保 存</el-button>
   <div ref="inRef" >
      <el-button type="primary" @click="changeAdd" size="mini">添加</el-button>
   </div>
   <div style="visibility:hidden" ref="outRef">
      <el-button  type="primary" @click="changeDelete" size="mini">删除</el-button>
   </div>
  </div>
</template>


<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      input:'',
      input1:'',
      isShow: false
    }
  },
  created(){
    // this.input = this.$t("lang.homeOverview") // 必须得是双引号
    console.log('enter helloworld!!!')
  },
  methods:{
    changeBut(){
      console.log('welcome to the magic world!!!')
      this.$router.push({ path: '/home/home' })
    },
    changeAdd() {
      this.$refs.outRef.className = 'deleteBtn-in'
      var that = this
      setTimeout(function () {
        // that.$refs.outRef.style.display='none'
        that.$refs.outRef.style.visibility='visible'
      }, 100);
    },
    changeDelete() {
      this.$refs.outRef.className = 'deleteBtn-hide'
      var that = this
      setTimeout(function () {
        // that.$refs.outRef.style.display='none'
        that.$refs.outRef.style.visibility='hidden'
      }, 3000);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @-webkit-keyframes in {
  0% {
    opacity: 0; /*初始状态 透明度为0*/
  }
  50% {
    opacity: 0.5; /*中间状态 透明度为0*/
  }
  100% {
    opacity: 1; /*结尾状态 透明度为1*/
  }
}
.deleteBtn-in{
  -webkit-animation-name: in; /*动画名称*/
  -webkit-animation-duration: 3s; /*动画持续时间*/
  -webkit-animation-iteration-count: 1; /*动画次数*/
  -webkit-animation-delay: 0s; /*延迟时间*/
}
@-webkit-keyframes hide {
  0% {
    opacity: 1; /*初始状态 透明度为0*/
  }
  50% {
    opacity: 0.5; /*中间状态 透明度为0*/
  }
  100% {
    opacity: 0; /*结尾状态 透明度为1*/
  }
}
.deleteBtn-hide{
  -webkit-animation-name: hide; /*动画名称*/
  -webkit-animation-duration: 3s; /*动画持续时间*/
  -webkit-animation-iteration-count: 1; /*动画次数*/
  -webkit-animation-delay: 0s; /*延迟时间*/
}
</style>

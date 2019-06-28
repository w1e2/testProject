<template>
<!--  首页-->
  <div>
    <el-main>
      <h2 style="color: #0090d2">Welcome to the test world   !!!!!!!</h2>
    </el-main>
  </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
      managementAgency: "", // 管理机构
      flag: true,
      formData: {
        comCode: "",
        manageCom: "",
        prtNo: "",
        inputDate: "",
        payDate: "",
        pageNum: 1
      },
      selfPage: {
        currentPage: 1,
        hasMore: true,
        perPage: 10,
        totalPage: 0,
        totalSize: 0
      },
      selfList: [],
      isShowSingle: true
    };
  },
  methods: {
    silkFuna(val) { // 业务员代码
      // this.formData.salesmanCode = val.agentCode
      // this.show = val.isShowPages
    },
  }
}
</script>
<style>
</style>

<template>
  <div>
    <el-main>
      <h2 style="color: #0090d2">Welcome to the test world   !!!!!!!</h2>
<!--      <pedorapply></pedorapply>-->
    </el-main>
  </div>
</template>
<script>
  import pedorapply from '@/views/preservationManage/component/pedorapply-accept'
export default {
  components: {
    pedorapply
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
  }
}
</script>
<style>
</style>

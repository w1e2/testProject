<template>
<!--  首页-->
  <div>
    <el-main>
      <h2 style="color: #0090d2">Welcome to the test world   !!!!!!!</h2>
<!--      <pedorapply></pedorapply>-->
<!--      <perservationApplyInfo></perservationApplyInfo>-->
<!--      <manualUnderwriting></manualUnderwriting>-->
    </el-main>
  </div>
</template>
<script>
  import pedorapply from '@/views/preservationManage/component/pedorapply-accept'
  import perservationApplyInfo from '@/views/preservationManage/preservation-applyInfo'
  import manualUnderwriting from '@/views/preservationManage/manual-underwriting'
export default {
  components: {
    pedorapply,
    perservationApplyInfo,
    manualUnderwriting
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

<template>
  <main></main>
</template>
<script>
import main from '../../components/Main'
export default {
  components: {
    main
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
    changeBut: function() {
      console.log("dddddddddddddddddd");
    },
    handleCurrentChangeSingle(num) {
      this.selfFormData.pageNum = num;
      //   this.querySelfData()
    },
    isShow(val) {
      this[val] = !this[val];
    },
        // 个人工作池录入操作
    entry() {
    //   this.prtNo = val.missionprop1 // 获取投保单号
    //   this.state = val.contpayState // 保单状态
    //   this.polApplyDate = val.missionprop2 // 获取当前表格的扫描日期
    //   const subType = val.missionprop5 ? val.missionprop5.split('-')[0] : ''
      this.$router.push({
        path: 'preservation-apply',
        // query: {
        //   scanFlag: '1',
        //   prtNo: this.prtNo,
        //   manageCom: val.missionprop3,
        //   noType: '1',
        //   subType: subType, // 单证类型
        //   missionID: val.missionid,
        //   subMissionID: val.submissionid,
        //   activityID: val.activityid,
        //   scantype: 'scan'
        // }
      })
    },
  }
};
</script>
<style>
</style>
<template>
  <div class="main" v-if="isShowPages">
    <div class="box">
      <p class='content-tit'>
	      <span @click="isShow('queryShow')" v-if='queryShow'>-</span>
	      <span @click="isShow('queryShow')" v-else>+</span>
	      业务员查询条件
        <el-button @click.native.prevent="delPolRow" type="primary" icon="el-icon-circle-close-outline" class="add-btn" style="font-size: 16px;"></el-button>
	    </p>
		<el-form :model="formData" label-width="100px" label-position="left" v-show="queryShow">
			<el-row type="flex"  :gutter="30">
	          <el-col :span="7">
	            <el-form-item label="业务员编码">
	               <el-input v-model="formData.agentCode" size="small"></el-input>
	            </el-form-item>
	          </el-col>
	          <el-col :span="8">
	            <el-form-item label="销售机构">
	               <el-input v-model="formData.agentGroup" size="small"></el-input>
	            </el-form-item>
	          </el-col>
<!--	          <el-col :span="9">-->
<!--	            <el-form-item  label="管理机构">-->
<!--	              <el-select v-model="formData.manageCom" filterable clearable placeholder="请选择" size="small">-->
<!--	                <el-option-->
<!--		              v-for="item in common.managementAgency"-->
<!--		              :key="item.code"-->
<!--		              :label="item.codeName"-->
<!--		              :value="item.code">-->
<!--		              <span>{{ item.code }}</span>-<span>{{ item.codeName }}</span>-->
<!--		            </el-option>-->
<!--	              </el-select>-->
<!--	            </el-form-item>-->
<!--	          </el-col>-->
	        </el-row>
	        <el-row type="flex"  :gutter="30">
	          <el-col :span="7">
	            <el-form-item label="姓名">
	               <el-input v-model="formData.name" size="small"></el-input>
	            </el-form-item>
	          </el-col>
	          <el-col :span="8">
<!--	            <el-form-item label="性别">-->
<!--	               <el-select v-model="formData.sex" filterable placeholder="请选择" size="small">-->
<!--	                <el-option-->
<!--		              v-for="item in common.gender"-->
<!--		              :key="item.code"-->
<!--		              :label="item.codeName"-->
<!--		              :value="item.code">-->
<!--		              <span>{{ item.code }}</span>-<span>{{ item.codeName }}</span>-->
<!--		            </el-option>-->
<!--	              </el-select>-->
<!--	            </el-form-item>-->
	          </el-col>
	          <el-col :span="8">
	            <el-form-item label="身份证号码">
	               <el-input v-model="formData.idNo" size="small"></el-input>
	            </el-form-item>
	          </el-col>
	        </el-row>
	        <el-form-item>
	          <el-button type="primary" @click="query">查询</el-button>
	          <el-button type="primary" @click="back">返回</el-button>
	        </el-form-item>
		</el-form>
		<p class='content-tit'>
	      <span @click="isShow('isShowSales')" v-if='isShowSales'>-</span>
	      <span @click="isShow('isShowSales')" v-else>+</span>
	      业务员结果
	    </p>
	    <el-table :data="salesList" border v-show='isShowSales' class='table-common' @current-change="tableHandleCurrentChangeSingle">
            <el-table-column width="60" align="center">
              <template slot-scope="scope">
                  <el-radio v-model="policyNumber" :label="scope.$index+1"></el-radio>
              </template>
            </el-table-column>
            <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
            <el-table-column prop="agentCode" label="业务员编码" min-width="10%" align="center"></el-table-column>
            <el-table-column prop="agentGroup" label="销售机构" min-width="10%"  align="center"></el-table-column>
            <el-table-column prop="manageCom" label="管理机构" min-width="10%"  align="center"></el-table-column>
            <el-table-column prop="agentName" label="姓名" min-width="10%"  align="center"></el-table-column>
            <el-table-column prop="idNo" label="身份证号" min-width="15%"  align="center"></el-table-column>
            <el-table-column prop="agentState" label="状态" min-width="10%"  align="center"></el-table-column>
            <el-table-column prop="phone" label="电话" min-width="10%"  align="center"></el-table-column>
            <el-table-column prop="mobile" label="手机" min-width="10%"  align="center"></el-table-column>
          </el-table>
          <div class="block" style="margin:20px 0;float: right;" v-show='isShowSales'>
            <el-pagination
              @current-change="handleCurrentChangeSingle"
              :current-page="page.currentPage"
              :page-size="page.perPage"
              layout="total, prev, pager, next, jumper"
              :total="page.totalSize">
            </el-pagination>
          </div>
    </div>
  </div>
</template>
<script>
// import { codeQueryic } from '@/api/shipment/public-pool.js'
// import { getSalesList } from '@/api/order-enter/order-enter'
// import { getComcode } from '@/utils/auth'
export default {
  name: 'showPage',
  components: {},
  props: {
    isShowPage: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      isShowPages: this.isShowPage,
      queryShow: true,
      isShowSales: true,
      agentCode: '', // 业务员编号
      salesmanName: '', // 业务员姓名
      manageCom: '', // 管理机构
      agentGroup: '', // 代理人组别
      salesList: [],
      page: {
        currentPage: 1,
        perPage: 10,
        totalPage: 0,
        totalSize: 0
      },
      policyNumber: '',
      currentPageSingle: 2,
      pagesSingle: 10,
      formData: {
        agentCode: '', // 业务员编码
        agentGroup: '', // 销售机构
        // manageCom: getComcode(), // 管理机构
        name: '', // 姓名
        sex: '', // 性别
        idNo: '', // 身份证号
        pageNum: 1
      },
      sexList: []
    }
  },
  mounted() {},
  created() {
    // if (!this.common.managementAgency || this.common.managementAgency.length === 0) {
    //   this.$store.dispatch('GetManagementAgency')
    // }
    // if (!this.common.gender || this.common.gender.length === 0) {
    //   this.$store.dispatch('GetGender')
    // }
  },
  methods: {
    delPolRow() {
      this.isShowPages = false
      this.$emit('silkFuna', {
        agentCode: this.agentCode,
        salesmanName: this.salesmanName,
        manageCom: this.manageCom,
        agentGroup: this.agentGroup,
        isShowPages: this.isShowPages
      })
    },
    back() { // 返回按钮
      if (this.agentCode === '') {
        this.$alert('请先选择一条记录，再点击返回按钮。', '警告', {
          confirmButtonText: '确定'
        }).catch(() => {})
        return false
      } else {
        this.isShowPages = false
        this.$emit('silkFuna', {
          agentCode: this.agentCode,
          salesmanName: this.salesmanName,
          manageCom: this.manageCom,
          agentGroup: this.agentGroup,
          isShowPages: this.isShowPages
        })
      }
    },
    tableHandleCurrentChangeSingle(n) { // 获取当前的点击选中的业务员编码
      this.agentCode = n.agentCode
      this.salesmanName = n.agentName
      this.manageCom = n.manageCom
      this.agentGroup = n.agentGroup
      console.log(this.agentCode, this.salesmanName, this.manageCom, this.agentGroup)
    },
    query() {
      if (!this.formData.manageCom && !this.formData.agentCode && !this.formData.agentGroup && !this.formData.name && !this.formData.idNo) {
        this.$alert('除性别外,其余录入项至少录入一项。', '警告', {
          confirmButtonText: '确定'
        }).catch(() => {})
        return false
      } else {
        this.formData.pageNum = 1
        this.querySalesList()
      }
    },
    handleCurrentChangeSingle(num) { // 页数
      this.formData.pageNum = num
      this.querySalesList()
    },
    querySalesList() { // 查询业务员
      // if (!this.formData.manageCom) {
      //   this.formData.manageCom = '86'
      // }
      getSalesList(this.formData).then(response => {
        // const resData = response.data
        const resData = {
          'returnCode': {
            'name': null,
            'desc': '成功',
            'code': 0,
            'service': null
          },
          'body': {
            'totalSize': 15,
            'totalPage': 2,
            'currentPage': 1,
            'perPage': 10,
            'hasMore': true,
            'data': []
          },
          'cid': 0,
          'systime': 0,
          'elapsed': 0,
          'code': 0,
          'message': '成功'
        }
        resData.body.data = response.data
        console.log(resData, '业务员返回的数据')
        if (resData && resData.code === 0) {
          this.salesList = resData.body.data
          this.page.currentPage = resData.body.currentPage
          this.page.perPage = resData.body.perPage
          this.page.totalPage = resData.body.totalPage
          this.page.totalSize = resData.body.totalSize
        } else {
          this.salesList = []
          this.page.currentPage = 1
          this.page.perPage = 10
          this.page.totalPage = 0
          this.page.totalSize = 0
          this.$message.error(resData.message)
        }
      })
    },
    isShow(val) {
      this[val] = !this[val]
    }
  },
  // watch: {
  //   isShowPage(val) {
  //     this.isShowPages = val
  //   },
  //   isShowPages(val) {
  //     this.$emit('back', val)
  //   }
  // },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

.main {
  position: fixed;
  background: rgba(0,0,0,0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1900;
  padding: 40px;
  .box{
    background: #fff;
	  height: 500px;
	  overflow: auto;
	  padding: 0px 20px 20px;
  }
}
</style>

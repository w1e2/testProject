<template>
  <div class="main" v-if="isShowPages">
    <div class="box">
      <p class='content-tit'>
        <span @click="isShow('queryShow')" v-if='queryShow'>-</span>
        <span @click="isShow('queryShow')" v-else>+</span>
        Pos机查询条件
        <el-button @click.native.prevent="delPolRow" type="primary" icon="el-icon-circle-close-outline" class="add-btn" style="font-size: 16px;"></el-button>
      </p>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="合作人" size="small" :required="true" prop="name">
              <el-input v-model="formData.name" placeholder="请输入姓名" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="合作人电话" size="small" :required="true" prop="telephone">
              <el-input v-model="formData.telephone" maxlength="11" placeholder="请输入电话号码" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="本方银行编码" size="small" :required="true" prop="bankCode">
              <el-select v-model="formData.bankCode" placeholder="请选择" @change="checkType()">
                <el-option
                  v-for="item in bankOption"
                  :key="item.code"
                  :label="item.codeName"
                  :value="item.code">
                  <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="收款平台" size="small" :required="true" prop="platForm">
              <el-input v-model="formData.platForm" maxlength="15" placeholder="请输入收款平台" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="最小收款金额" size="small" :required="true" prop="minAmount">
              <el-input v-model="formData.minAmount" maxlength="15" placeholder="请输入金额" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="最大收款金额" size="small" :required="true" prop="maxAmount">
              <el-input v-model="formData.maxAmount" maxlength="15" placeholder="请输入金额" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="闪付收费比率" size="small" prop="flashRatio" :required="true">
              <el-input v-model="formData.flashRatio" placeholder="请输入1-100整数" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="Pay收费比率" size="small" prop="payRatio" :required="true">
              <el-input v-model="formData.payRatio" placeholder="请输入1-100整数" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="红卡收费比率" size="small" prop="redRatio" :required="true">
              <el-input v-model="formData.redRatio" placeholder="请输入1-100整数" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="正常收费比率" size="small" :required="true" prop="posRatio">
              <el-input v-model="formData.posRatio" maxlength="15" placeholder="请输入1-100整数" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="状态" size="small" :required="true" prop="posState">
              <el-select v-model="formData.posState" placeholder="请选择" @change="checkType()">
                <el-option
                  v-for="item in stateOption"
                  :key="item.code"
                  :label="item.codeName"
                  :value="item.code">
                  <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class='content-tit'>
        <span @click="isShow('isShowSales')" v-if='isShowSales'>-</span>
        <span @click="isShow('isShowSales')" v-else>+</span>
        Pos机查询结果
      </p>
      <el-table :data="salesList" border v-show='isShowSales' class='table-common' @current-change="tableHandleCurrentChangeSingle">
        <el-table-column width="60" align="center">
          <template slot-scope="scope">
            <el-radio v-model="policyNumber" :label="scope.$index+1"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="agentName" label="姓名" min-width="10%"  align="center"></el-table-column>
        <el-table-column prop="phone" label="电话" min-width="10%"  align="center"></el-table-column>
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
        name: '', // 姓名
        salesList: [],
        stateOption: [{ code: '0', codeName: '无效' },{ code: '1', codeName: '有效' }],
        bankOption: [],
        page: {
          currentPage: 1,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        formData: {
          name: '',// 姓名
          telephone: "",// 电话号码
          platForm: '', // 收款平台
          sendDate: '', // 送卡时间
          bankCode: '', // 银行编码
          minAmount: '',// 最小收款金额
          maxAmount: "",// 最大收款金额
          flashRatio: '', // 闪付收费比率
          payRatio: '', // Pay收费比率
          redRatio: '', // 红卡收费比率
          posRatio: '', // 正常收费比率
          posState: '', // 状态 0-无效 1-有效
          pageNum:1
        }
      }
    },
    mounted() {},
    created() {
    },
    methods: {
      delPolRow() {
        this.isShowPages = false
        this.$emit('silkFuna', {
          name: this.name,
          telephone: this.telephone,
          isShowPages: this.isShowPages
        })
      },
      back() { // 返回按钮
        if (this.name === '') {
          this.$alert('请先选择一条记录，再点击返回按钮。', '警告', {
            confirmButtonText: '确定'
          }).catch(() => {})
          return false
        } else {
          this.isShowPages = false
          this.$emit('silkFuna', {
            name: this.name,
            telephone: this.telephone,
            isShowPages: this.isShowPages
          })
        }
      },
      tableHandleCurrentChangeSingle(n) { // 获取当前的点击选中的业务员编码
        this.name = n.name
        this.telephone = n.telephone
        console.log(this.name, this.telephone)
      },
      query() {
        if (!this.formData.name && !this.telephone) {
          this.$alert('请至少输入一项。', '警告', {
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
          const resData = response.data
          // console.log(resData, '返回的数据')
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

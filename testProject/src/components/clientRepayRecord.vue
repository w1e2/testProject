
<template>
  <div class="main" v-if="isShowPages">
    <div class="box">
      <p class='content-tit'>
        <span @click="isShow('queryShow')" v-if='queryShow'>-</span>
        <span @click="isShow('queryShow')" v-else>+</span>
        客户还款记录条件
        <el-button @click.native.prevent="delPolRow" type="primary" icon="el-icon-circle-close-outline" class="add-btn" style="font-size: 16px;"></el-button>
      </p>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="信用卡编码" size="small" :required="true" prop="cardCode">
              <el-input v-model="formData.cardCode" maxlength="15" placeholder="请输入姓名" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="Pos编码" size="small" :required="true" prop="posCode">
              <el-select v-model="formData.posCode" placeholder="请选择" @change="checkType()">
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
          <el-col :span="7" :offset="1">
            <el-form-item  label="操作金额" size="small" :required="true" prop="amount">
              <el-input v-model="formData.amount" maxlength="15" placeholder="请输入账号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="操作类型" size="small" :required="true" prop="operator">
              <el-select v-model="formData.operator" placeholder="请选择" @change="checkType()">
                <el-option
                  v-for="item in operatorOption"
                  :key="item.code"
                  :label="item.codeName"
                  :value="item.code">
                  <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="刷卡类型" size="small" :required="true" prop="creditType">
              <el-select v-model="formData.creditType" placeholder="请选择" @change="checkType()">
                <el-option
                  v-for="item in creditTypeOption"
                  :key="item.code"
                  :label="item.codeName"
                  :value="item.code">
                  <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="备注" size="small" :required="true" prop="remarks">
              <el-input v-model="formData.remarks" placeholder="备注" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class='content-tit'>
        <span @click="isShow('isShowSales')" v-if='isShowSales'>-</span>
        <span @click="isShow('isShowSales')" v-else>+</span>
        客户还款记录查询结果
      </p>
      <el-table :data="salesList" border v-show='isShowSales' class='table-common' @current-change="tableHandleCurrentChangeSingle">
        <el-table-column width="60" align="center">
          <template slot-scope="scope">
            <el-radio v-model="policyNumber" :label="scope.$index+1"></el-radio>
          </template>
        </el-table-column>
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column prop="agentName" label="信用卡编码" min-width="10%"  align="center"></el-table-column>
        <el-table-column prop="phone" label="银行编码" min-width="10%"  align="center"></el-table-column>
        <el-table-column prop="phone" label="操作类型" min-width="10%"  align="center"></el-table-column>
        <el-table-column prop="phone" label="操作金额" min-width="10%"  align="center"></el-table-column>
        <el-table-column prop="phone" label="刷卡类型" min-width="10%"  align="center"></el-table-column>
        <el-table-column prop="phone" label="备注" min-width="10%"  align="center"></el-table-column>
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
        bankOption: [],
        operatorOption: [],
        creditTypeOption: [],
        page: {
          currentPage: 1,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        formData: {
          cardCode: '',// 卡编码
          posCode: "",// 银行编码
          operator: '', // 操作类型
          creditType: '', // 刷卡类型
          amount: '', // 金额
          remarks: '', // 备注
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
        if (!this.formData.cardCode && !this.formData.posCode && !this.formData.operator && !this.formData.creditType && !this.formData.amount && !this.formData.remarks) {
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
    }
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

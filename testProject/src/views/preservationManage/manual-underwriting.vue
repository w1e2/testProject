<template>
  <div>
    <el-main>
      <p class="content-tit"><span @click="isShow">{{ shape }}</span>申请任务列表信息</p>
      <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border v-if="isShowSingle">
        <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
        <el-table-column prop="missionprop1" label="业务类别" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop2" label="保单号" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="批单号" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop4" label="客户号" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop5" label="险种名称" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop6" label="投保人" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop7" label="被保险人" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop8" label="保单生效日期" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop9" label="保单失效日期" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="保单状态" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="受理日期" min-width="15%" align="center"></el-table-column>
      </el-table>
      <p class="content-tit"><span @click="isShow">{{ shape }}</span>强制人工核保原因说明栏</p>
      <el-input type="textarea" :autosize="{minRows: 3, maxRows: 4}"></el-input>
      <p class="content-tit"></p>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        保全明细查询
      </el-button>
      <el-button type="primary" size="mini" @click="showNotePad()">
        保单信息查询
      </el-button>
      <el-button type="primary" size="mini" @click="showNotePad()">
        投保影像资料查询
      </el-button>
      <el-button type="primary" size="mini" @click="showNotePad()">
        保全影像资料查询
      </el-button>
      <el-button type="primary" size="mini" @click="showNotePad()">
        操作履历查询
      </el-button>
      <el-button type="primary" size="mini" @click="showNotePad()">
        自动核保信息
      </el-button>

      <p class="content-tit"><span @click="isShow">{{ shape }}</span>投保人信息</p>
      <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border v-if="isShowSingle">
        <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
        <el-table-column prop="missionprop1" label="客户号码" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop2" label="姓名" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="性别" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop4" label="年龄" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop5" label="与被保险人关系" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop6" label="国籍" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop7" label="婚姻" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop8" label="学历" min-width="15%" align="center"></el-table-column>
      </el-table>
      <el-form :model="formDatas" :rules="rules" ref="formDatas" label-width="120px" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="姓名" prop="policyNumber" size="small" :required="false">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="性别" prop="policyHolder" size="small" :required="false">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="年龄" prop="salesmanCode" size="small" :required="false" v-on:click.native.prevent="silkFuns()">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="职业" prop="policyNumber" size="small" :required="false">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="寿险职业类别" prop="policyHolder" size="small" :required="false">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="住院险职业类别" prop="salesmanCode" size="small" :required="false" v-on:click.native.prevent="silkFuns()">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="身高" prop="policyNumber" size="small" :required="false">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="体重" prop="policyHolder" size="small" :required="false">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="BMI值" prop="salesmanCode" size="small" :required="false" v-on:click.native.prevent="silkFuns()">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="年收入" :required="false" prop="underwritingTaskStatus" size="small">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="累计年交保费" :required="false" prop="management" size="small">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="累计寿险保额" :required="false" prop="management" size="small">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="累计意外险保额" :required="false" prop="underwritingTaskStatus" size="small">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="累计重大疾病保额" :required="false" prop="management" size="small">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="累计人身险保额" :required="false" prop="management" size="small">
              <el-input v-model="formDatas.policyNumber" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="累计交通意外保险" prop="recognizee" size="small" :required="false">
              <el-input v-model="formDatas.recognizee" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="累计航空意外保额" prop="recognizee" size="small" :required="false">
              <el-input v-model="formDatas.recognizee" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="累计医疗险保额" prop="recognizee" size="small" :required="false">
              <el-input v-model="formDatas.recognizee" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item label="累计私车交通意外保额" :required="false" prop="coding" size="small">
              <el-input v-model="formDatas.recognizee" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item label="黑名单标记" :required="false" prop="coding" size="small">
              <el-input v-model="formDatas.recognizee" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button type="primary" size="mini" @click="showNotePad()">
          投保人告知查询
        </el-button>
        <el-button type="primary" size="mini" @click="showNotePad()">
          投保人既往投保资料查询
        </el-button>
      </el-form>
      <p class="content-tit"><span @click="isShows">{{ shapes }}</span>待核保投保单</p>
      <el-table :data="dataList" :highlight-current-row="true" border :row-class-name="tableRowClassName" v-if="flags" style="width: 100%" size="mini">
        <el-table-column fixed="left" label="序号" align="center" header-align="center" type="index" width="60">
          <template slot-scope="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column
          v-for="(v,i) in column"
          :key="i"
          :prop="v.content"
          :label="v.label"
          :min-width="v.width"
          align="center"
          header-align="center">
          <template slot-scope="scope">
            {{ scope.row[v.content] }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="110px" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button type="primary"  @click="radioChanges(scope.$index+1)">人工核保</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div  class="mar15 ali-right">
        <el-pagination
          @current-change="handleCurrentChangeSingles"
          :current-page="pages.currentPage"
          :page-size="pages.perPage"
          layout="total, prev, pager, next, jumper"
          :total="pages.totalSize">
        </el-pagination>
      </div>
      <!--      <salesmanCodind v-if="show" @silkFuna="silkFuna"></salesmanCodind>-->
      <!--      <salesmanCodind v-if="shows" @silkFuna="silkFunas"></salesmanCodind>-->
    </el-main>

  </div>
</template>
<script>
  export default {
    name: 'manual-underwriting',
    components: {
    },
    data() {
      return {
        managementAgency: "", // 管理机构
        uwpopedom:'', //核保级别
        uwstatus:'',//核保任务状态
        coding:'',//险种编码
        flag: true,
        flags: true,
        shape: '-',
        shapes: '-',
        datas: [], // 表格数据
        formData: {
          policyNumber: '', // 投保单号码
          scanDate: '', // 扫描日期
          distributionChannel: '', // 销售渠道
          coding: '', // 险种编码
          management: '', // 管理机构
          salesmanCode: '', // 业务员代码
          salesmanStar: '', // 星级业务员
          vipClient: '', // VIP客户
          underwritingRank: '', // 核保级别
          policyHolder: '', // 投保人
          recognizee: '', // 被保人
          underwritingTaskStatus: '', // 核保任务状态
          underwritingMemberCode: '', // 核保员代码
          isBill: '', // 是否到账
          isEmployeeBill: '', // 是否员工单
          salesRank: '', // 业务员等级
          insuranceSlip: '', // 百团机构投保单
          total: '', // 总单数
          pageNum: 1, // 当前第几页
          pageSize: 10 // 每页显示条数
        },
        formDatas: {
          policyNumber: '', // 投保单号码
          distributionChannel: '', // 销售渠道
          coding: '', // 险种编码
          management: '', // 管理机构
          salesmanCode: '', // 业务员代码
          policyHolder: '', // 投保人
          recognizee: '', // 被保险人
          underwritingTaskStatus: '', // 核保任务状态
          isBill: '', // 是否到账
          isEmployeeBill: '', // 是否员工单
          salesRank: '', // 业务员等级
          insuranceSlip: '', // 百团机构投保单
          reportType: '', // 上报类型
          pageNum: 1, // 当前第几页
          pageSize: 10 // 每页显示条数
        },
        rule: { // 表单验证
          // underwritingTaskStatus: [ // 核保任务状态验证
          //   { required: true, message: '请输入核保任务状态', trigger: 'blur' }
          // ]
        },
        rules: {
          // underwritingTaskStatus: [
          //   { required: true, message: '请输入核保任务状态', trigger: 'blur' }
          // ]
        },
        selfList: [],
        columns: [ // 表格标题
          {
            content: 'missionprop12',
            label: '核保级别',
            width: '80'
          },
          {
            content: 'missionprop20',
            label: '最近处理人',
            width: '100'
          },
          {
            content: 'missionprop15',
            label: 'VIP客户',
            width: '100'
          },
          {
            content: 'missionprop15',
            label: '星级业务员',
            width: '100'
          },
          {
            content: 'missionprop15',
            label: '投保时间',
            width: '100'
          },
          {
            content: 'order4',
            label: '最后回复时间',
            width: '150'
          },
          {
            content: 'missionprop18',
            label: '核保任务状态',
            width: '115'
          },
          {
            content: 'missionprop10',
            label: '管理机构',
            width: '105'
          },
          {
            content: 'missionProp25',
            label: '险种编码',
            width: '105'
          },
          {
            content: 'missionprop1',
            label: '投保单号码',
            width: '145'
          },
          {
            content: 'missionProp24',
            label: '被保险人',
            width: '100'
          },
          {
            content: 'calworktime',
            label: '规定作业用时',
            width: '110'
          },
          {
            content: 'rtime',
            label: '剩余作业时间',
            width: '110'
          },
          {
            content: 'lev',
            label: '紧急度指数',
            width: '105'
          }
        ],
        dataList: [],
        column: [
          {
            content: 'missionprop12',
            label: '核保级别',
            width: '90'
          },
          {
            content: 'missionProp24',
            label: '被保险人',
            width: '100'
          },
          {
            content: 'order1',
            label: '上报类型',
            width: '110'
          },
          {
            content: 'order1',
            label: '扫描时间',
            width: '110'
          },
          {
            content: 'order1',
            label: '最后回复时间',
            width: '110'
          },
          {
            content: 'missionprop18',
            label: '核保任务状态',
            width: '115'
          },
          {
            content: 'missionprop10',
            label: '管理机构',
            width: '115'
          },
          {
            content: 'missionProp25',
            label: '险种编码',
            width: '115'
          },
          {
            content: 'missionprop1',
            label: '投保单号码',
            width: '145'
          },
          {
            content: 'missionprop7',
            label: '最近处理人',
            width: '100'
          },
          {
            content: 'calworktime',
            label: '规定作业用时',
            width: '115'
          },
          {
            content: 'rtime',
            label: '剩余作业时间',
            width: '115'
          },
          {
            content: 'lev',
            label: '紧急度指数',
            width: '110'
          }
        ],
        page: { // 分页器
          currentPage: 1,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        pages: { // 分页器
          currentPage: 1,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        show: false,
        shows: false,
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
      stand() { // 核保员代码
        if (this.formData.underwritingMemberCode === '') {
          this.$alert('必须输入当前核保员代码!', '警告', {
            confirmButtonText: '确定'
          })
          return false
        }
      },
      isShow() {
        if (this.flag) {
          this.flag = !this.flag
          this.shape = '+'
        } else {
          this.flag = !this.flag
          this.shape = '-'
        }
      },
      isShows() {
        if (this.flags) {
          this.flags = !this.flags
          this.shapes = '+'
        } else {
          this.flags = !this.flags
          this.shapes = '-'
        }
      },
      handleCurrentChangeSingles(num) { // 分页器事件
        this.formDatas.pageNum = num
        // this.inquireSharedPool() // 人工核保待核保投保单查询按钮
      },
      tableRowClassName({ row, rowIndex }) {
        if (row.workColor === '01') {
          return 'bg01'
        }
        if (row.workColor === '02') {
          return 'bg02'
        }
        if (row.workColor === '03') {
          return 'bg03'
        }
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

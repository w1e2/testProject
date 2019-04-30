<template>
  <div>
    <el-main>
      <p class='content-tit'>请输入查询条件:</p>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="8">
            <el-form-item  label="保全受理号" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="号码类型" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="客户/保单号" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="8">
            <el-form-item  label="申请人" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="申请方式" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="录入日期" size="small">
              <el-date-picker
                v-model="formData.inputDate"
                type="date"
                placeholder="选择日期"
                :format="'yyyy-MM-dd'"
                :value-format="'yyyy-MM-dd'">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item  label="管理机构" size="small">
              <el-select v-model="formData.manageCom" placeholder="请选择">
                <el-option
                  v-for="item in managementAgency"
                  :key="item.code"
                  :label="item.codeName"
                  :value="item.code">
                  <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="ali-right">
          <el-button type="primary" @click="queryData('formData')">查询</el-button>
        </div>
      </el-form>
      <p class="content-tit">
        <span @click="isShow('flag')" v-if='flag'>-</span>
        <span @click="isShow('flag')" v-else>+</span>
        共享工作池
      </p>
      <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border v-if="isShowSingle">
        <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
        <el-table-column prop="missionprop5" label="保单受理号" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop1" label="客户/保单号" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="号码类型" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="投保人" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="申请方式" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="管理机构" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="录入员" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop2" label="录入日期" min-width="15%" align="center"></el-table-column>
        <el-table-column label="操作" min-width="15%" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="entry(scope.row)">
              申请
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="mini" @click="entry()">
        申请
      </el-button>
      <div class="mar15 ali-right">
        <el-pagination
          @current-change="handleCurrentChangeSingle"
          :current-page="selfPage.currentPage"
          :page-size="selfPage.perPage"
          layout="total, prev, pager, next, jumper"
          :total="selfPage.totalSize">
        </el-pagination>
      </div>
      <p class="content-tit">
        <span @click="isShow('flag')" v-if='flag'>-</span>
        <span @click="isShow('flag')" v-else>+</span>
        我的任务
      </p>
      <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border v-if="isShowSingle">
        <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
        <el-table-column prop="missionprop5" label="保单受理号" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop1" label="客户/保单号" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="号码类型" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="投保人" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="申请方式" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="管理机构" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="录入员" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop2" label="录入日期" min-width="15%" align="center"></el-table-column>
        <el-table-column label="操作" min-width="15%" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="entry(scope.row)">
              自动核保
            </el-button>
            <el-button type="primary" size="mini" @click="entry(scope.row)">
              记事本查看
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="mini" @click="entry()">
        自动核保
      </el-button>
      <el-button type="primary" size="mini" @click="entry()">
        记事本查看
      </el-button>
      <div class="mar15 ali-right">
        <el-pagination
          @current-change="handleCurrentChangeSingle"
          :current-page="selfPage.currentPage"
          :page-size="selfPage.perPage"
          layout="total, prev, pager, next, jumper"
          :total="selfPage.totalSize">
        </el-pagination>
      </div>
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

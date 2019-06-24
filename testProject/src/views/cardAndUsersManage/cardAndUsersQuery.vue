<template>
  <!--  卡/用户信息查询页面-->
  <el-main>
    <p class='content-tit'>请输入查询条件:</p>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="8">
          <el-form-item  label="查询类型" size="small">
            <el-select v-model="formData.queryType" placeholder="请选择">
              <el-option
                v-for="item in queryOption"
                :key="item.code"
                :label="item.codeName"
                :value="item.code">
                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" v-if="searchFlag">
        <el-col :span="8">
          <el-form-item  label="保全受理号" size="small">
            <el-input v-model="formData.edoracceptNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="号码类型" size="small">
            <el-select v-model="formData.numberType" placeholder="请选择">
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
        <el-col :span="8">
          <el-form-item  label="客户/保单号" size="small">
            <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" v-if="searchFlag">
        <el-col :span="8">
          <el-form-item  label="申请人" size="small">
            <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item  label="申请方式" size="small">
            <el-select v-model="formData.applyType" placeholder="请选择">
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
    </el-form>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      查询结果
    </p>
    <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border v-if="isShowSingle">
      <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
      <el-table-column prop="missionprop1" label="保单受理号" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop2" label="客户/保单号" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="号码类型" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop4" label="投保人" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop5" label="下次交费对应日" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop6" label="申请方式" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop7" label="管理机构" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop8" label="录入员" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop9" label="录入日期" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="保全操作" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop3" label="受理日期" min-width="15%" align="center"></el-table-column>
      <el-table-column prop="missionprop4" label="超过日期" min-width="15%" align="center"></el-table-column>
      <el-table-column label="操作" min-width="15%" align="center">
      </el-table-column>
    </el-table>
<!--    <el-button type="primary" size="mini" @click="goToBusiDeal()">-->
<!--      保全受理-->
<!--    </el-button>-->
<!--    <el-button type="primary" size="mini" @click="showNotePad()">-->
<!--      记事本查看-->
<!--    </el-button>-->
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
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        searchFlag: false, // 选择查询类型后显示查询条件
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }], // 管理机构
        flag: true,
        formData: {
          edoracceptNo:'',//保全受理号
          numberType: "",//号码类型
          applyPerson: "",//申请人
          applyType:'',//申请类型
          prtNo: "",//客户/保单号
          inputDate: "",//录入日期
          manageCom:'',//管理机构
          pageNum:1
        },
        selfPage: {
          currentPage: 1,
          hasMore: true,
          perPage: 10,
          totalPage: 0,
          totalSize: 0
        },
        selfList: [],
        isShowSingle: true//是否显示个人工作池表格
      };
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      changeBut: function() {
        console.log("dddddddddddddddddd");
      },
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
      },
      isShow(val) {
        this[val] = !this[val];
      },
      // 查询按钮
      queryClick() {
      },
      //申请按钮
      applyMission(){},
      //记事本查看按钮
      showNotePad(){},
      //保全受理按钮
      goToBusiDeal(){},
    }
  };
</script>
<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>

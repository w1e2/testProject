<template>
  <!--  保全受理信息 这里还有东西，看不到先不写了-->
  <div>
    <el-main>
      <p class="content-tit">
        <span @click="isShow('flag')" v-if='flag'>-</span>
        <span @click="isShow('flag')" v-else>+</span>
        保全受理信息
      </p>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="保全受理号" size="small">
              <el-input v-model="formData.edoracceptNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="保单号/客户号" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
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
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="批改状态" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入批改状态" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
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
          <el-col :span="7" :offset="1">
            <el-form-item  label="申请资格人" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入申请资格人" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" >
            <el-form-item  label="申请资格人联系电话" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入申请资格人联系电话" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="申请资格人联系地址" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入申请资格人联系地址" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="邮编" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入邮编" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item  label="客户申请日期" size="small">
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
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        确定
      </el-button>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        返回
      </el-button>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        保全查询
      </el-button>
    </el-main>
  </div>
</template>
<script>
  export default {
    name: 'preservation-applyInfo',
    components: {
    },
    data() {
      return {
        managementAgency: "", // 管理机构
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
<style>
</style>

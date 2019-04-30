<template>
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
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
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
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" >
            <el-form-item  label="申请资格人联系电话" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="申请资格人联系地址" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="邮编" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
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
      <p class="content-tit">
        <span @click="isShow('flag')" v-if='flag'>-</span>
        <span @click="isShow('flag')" v-else>+</span>
        保单信息
      </p>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="保单号/客户号" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="生效日期" size="small">
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
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="投保人" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="主被保人" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="业务员" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item  label="申请资格人联系电话" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="申请资格人联系地址" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="邮编" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
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
      <p class="content-tit">
        <span @click="isShow('flag')" v-if='flag'>-</span>
        <span @click="isShow('flag')" v-else>+</span>
        保单状态信息
      </p>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="保单效力状态" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="保单状态" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="挂失状态" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="自垫状态" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="贷款状态" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="冻结状态" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item  label="减额缴清状态" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="密码挂失状态" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <p class="content-tit">
        <span @click="isShow('flag')" v-if='flag'>-</span>
        <span @click="isShow('flag')" v-else>+</span>
        险种信息
      </p>
      <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border v-if="isShowSingle">
        <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
        <el-table-column prop="missionprop1" label="险种代码" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop2" label="险种名称" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="被保人姓名" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop4" label="基本保额" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop5" label="份数" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop6" label="保费标准" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop7" label="币种" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop8" label="健康加费" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop9" label="职业加费" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="其他加费" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="交费对应日" min-width="15%" align="center"></el-table-column>
        <el-table-column label="操作" min-width="15%" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="entry(scope.row)">
              保单明细
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        保全明细
      </el-button>
      <p class="content-tit">
        <span @click="isShow('flag')" v-if='flag'>-</span>
        <span @click="isShow('flag')" v-else>+</span>
        保全项目信息
      </p>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="批改类型" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="柜面受理日期" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="操作员" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="申请原因" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="生效日期" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="系统操作日期" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        添加保全项目
      </el-button>
      <el-table :data="selfList" style="width: 100%" class='table-common' :highlight-current-row="true" border v-if="isShowSingle">
        <el-table-column label="序号" type='index' width="60" align="center"></el-table-column>
        <el-table-column prop="missionprop1" label="批改类型" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop2" label="保单号码" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop3" label="客户号码" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop4" label="保单险种号码" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop5" label="柜面受理日期" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop6" label="生效日期" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop7" label="申请原因" min-width="15%" align="center"></el-table-column>
        <el-table-column prop="missionprop8" label="处理状态" min-width="15%" align="center"></el-table-column>
        <el-table-column label="操作" min-width="15%" align="center">
        </el-table-column>
      </el-table>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        保全项目明细
      </el-button>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        保全项目撤销
      </el-button>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        签名查询
      </el-button>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        保全影像查询
      </el-button>
      <p class="content-tit">
        <span @click="isShow('flag')" v-if='flag'>-</span>
        <span @click="isShow('flag')" v-else>+</span>
        收付费方式信息
      </p>
      <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="收付费方式" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="开户行所在省" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="银行区域" size="small">
              <el-input v-model="formData.prtNo" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" class="row-bg">
          <el-col :span="7">
            <el-form-item  label="银行行号" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="开户银行" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-form-item  label="银行账户" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" >
            <el-form-item  label="户名" size="small">
              <el-input v-model="formData.applyPerson" maxlength="15" placeholder="请输入投保单号" size='small'></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        申请确认
      </el-button>
      <el-button type="primary" size="mini" @click="goToBusiDeal()">
        返回
      </el-button>
    </el-main>
  </div>
</template>
<script>
  export default {
    name: 'pedorapply-accept',
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

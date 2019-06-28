<template>
  <!--  卡/用户信息录入页面-->
  <el-main>
    <p class="content-tit">
      <span @click="isShow('flag')" v-if='flag'>-</span>
      <span @click="isShow('flag')" v-else>+</span>
      规则配置信息
    </p>
    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">
      <el-row type="flex" class="row-bg">
        <el-col :span="7">
          <el-form-item  label="操作金额最小范围" size="small" :required="true" prop="name">
            <el-input v-model="formData.name" maxlength="15" placeholder="请输入姓名" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="操作的上限" size="small" :required="true" prop="telephone">
            <el-input v-model="formData.telephone" maxlength="15" placeholder="请输入电话号码" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="是否为风险卡" size="small" :required="true" prop="sex">
            <el-select v-model="formData.sex" placeholder="请选择" @change="checkType()">
              <el-option
                v-for="item in sexOption"
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
          <el-form-item  label="还款的天数" size="small" prop="sendDate" :required="true">
            <el-input v-model="formData.sendDate" maxlength="15" placeholder="请选择时间" size='small'></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item  label="每次还款次数" size="small" prop="sendDate" :required="true">
            <el-input v-model="formData.sendDate" maxlength="15" placeholder="请选择时间" size='small'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
<!--    <p class="content-tit">-->
<!--      <span @click="isShow('flags')" v-if='flags'>-</span>-->
<!--      <span @click="isShow('flags')" v-else>+</span>-->
<!--      送卡人信息-->
<!--    </p>-->
<!--    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">-->
<!--      <el-row type="flex" class="row-bg">-->
<!--        <el-col :span="8">-->
<!--          <el-form-item  label="姓名" size="small" :required="true" prop="sendName">-->
<!--            <el-input v-model="formData.sendName" maxlength="15" placeholder="请输入姓名" size='small'></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item  label="电话号码" size="small" :required="true" prop="sendTelephone">-->
<!--            <el-input v-model="formData.sendTelephone" maxlength="15" placeholder="请输入电话号码" size='small'></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item  label="性别" size="small" :required="true" prop="sendSex">-->
<!--            <el-select v-model="formData.sendSex" placeholder="请选择">-->
<!--              <el-option-->
<!--                v-for="item in sexOption"-->
<!--                :key="item.code"-->
<!--                :label="item.codeName"-->
<!--                :value="item.code">-->
<!--                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--      <el-row type="flex" class="row-bg">-->
<!--        <el-col :span="8">-->
<!--          <el-form-item  label="送卡时间" size="small" prop="sendDate" :required="true">-->
<!--            <el-input v-model="formData.sendDate" maxlength="15" placeholder="请选择时间" size='small'></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->

<!--      </el-row>-->
<!--    </el-form>-->
<!--    <p class="content-tit">-->
<!--      <span @click="isShow('cardFlag')" v-if='cardFlag'>-</span>-->
<!--      <span @click="isShow('cardFlag')" v-else>+</span>-->
<!--      信用卡信息-->
<!--    </p>-->
<!--    <el-form :model="formData" ref="formData" label-width="100px" class="demo-ruleForm" label-position="right">-->
<!--      <el-row type="flex" class="row-bg">-->
<!--        <el-col :span="8">-->
<!--          <el-form-item  label="卡号" size="small" :required="true" prop="cardID">-->
<!--            <el-input v-model="formData.cardID" maxlength="15" placeholder="请输入姓名" size='small'></el-input>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--        <el-col :span="8">-->
<!--          <el-form-item  label="所属银行" size="small" :required="true" prop="bankName">-->
<!--            <el-select v-model="formData.bankName" placeholder="请选择" @change="checkType()">-->
<!--              <el-option-->
<!--                v-for="item in bankOption"-->
<!--                :key="item.code"-->
<!--                :label="item.codeName"-->
<!--                :value="item.code">-->
<!--                <span>{{ item.code }}</span> - <span>{{ item.codeName }}</span>-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-col>-->
<!--      </el-row>-->
<!--    </el-form>-->
    <div class="ali-right">
      <el-button type="primary" size="small" @click="addClick('formDatas')">录入</el-button>
    </div>
  </el-main>
</template>
<script>
  export default {
    components: {
    },
    data() {
      return {
        queryOption: [{ code: '0', codeName: '持卡人' },{ code: '1', codeName: '送卡人' },{ code: '2', codeName: '信用卡' }],
        sexOption: [{ code: '0', codeName: '正常卡' },{ code: '1', codeName: '风险卡' }],
        flag: true,
        flags: true,
        cardFlag: true,
        bankOption: [],
        formData: {
          name: '',// 姓名
          telephone: "",// 电话号码
          sex: '', // 性别
          sendDate: '', // 送卡时间
          sendName: '',// 姓名
          sendTelephone: "",// 电话号码
          sendSex: '', // 性别
          cardID: '',
          bankName: '',
          pageNum:1
        }
      };
    },
    methods: {
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      checkType: function () {
        this.searchFlag = true
        console.log(this.formData.queryType, "dddddddddddddddddd");
      },
      handleCurrentChangeSingle(num) {
        this.formData.pageNum = num;
        this.queryClick()
      },
      isShow(val) {
        this[val] = !this[val];
      },
      // 录入按钮
      addClick() {
      }
    }
  }
</script>
<style scoped>
</style>

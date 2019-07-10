<template>
  <div :class="{'entry-main':(imagesList && imagesList.length>0)}">
    <div class="containter" :class="{'containter-full-screen':app.displayMode!=='normal'}">
      <!-- <div class="guide-top" :class="{'hide':app.displayStyle!=='normal'}">
        <span><b>1</b><em>合同信息</em></span>
        <span :class="{'hs':!appnt.changeFlag}"><b>2</b><em>投保人信息</em></span>
        <span :class="{'hs':!insured.changeFlag}"><b>3</b><em>被保险人信息</em></span>
        <span :class="{'hs':!product.changeFlag}"><b>4</b><em>险种信息</em></span>
      </div> -->
       <!-- :imgList="imagesList" -->
      <imageFollow v-if="imagesList && imagesList.length>0"
                   :coordinate="coordinate"
                   :imgList="imagesList"
                   :isImageFllow="isImageFllow"
                   v-on:setIsCrop="setIsCrop"
                   v-on:realTime="realTime"
                   ref="imageFollow">
      </imageFollow>
      <div :class="{'content-containter':app.displayStyle!=='normal'}">
        <div class="guide-top" :class="{'hide':(app.displayStyle==='normal')}">
          <span><b>1</b><em>合同信息</em></span>
          <span :class="{'hs':!appnt.changeFlag}"><b>2</b><em>投保人信息</em></span>
          <span :class="{'hs':!insured.changeFlag}"><b>3</b><em>被保险人信息</em></span>
          <!--<span :class="{'hs':!product.changeFlag}"><b>4</b><em>险种信息</em></span>-->
        </div>
        <div class="guide-bottom">
          <span :class="{'kd':cont.changeFlag&&!cont.showFlag,'hs':!cont.changeFlag&&!cont.showFlag}" @click="showContent('cont')">合同信息</span>
          <span :class="{'kd':appnt.changeFlag&&!appnt.showFlag,'hs':!appnt.changeFlag&&!appnt.showFlag}" @click="showContent('appnt')">投保人信息</span>
          <span :class="{'kd':insured.changeFlag&&!insured.showFlag,'hs':!insured.changeFlag&&!insured.showFlag}" @click="showContent('insured')">被保险人信息</span>
          <!--<span :class="{'kd':product.changeFlag&&!product.showFlag,'hs':!product.changeFlag&&!product.showFlag}"--> <!--@click="showContent('product')">险种信息</span>-->
        </div>
        <div class="content" :class="{'content-yx':(imagesList && imagesList.length>0),'content-yx-full':(app.displayStyle==='normal')&&(app.displayMode!=='normal'),'content-left-right':(app.displayStyle!=='normal')&&(app.displayMode==='normal'),'content-full-left-right':(app.displayStyle!=='normal')&&(app.displayMode!=='normal')}" ref="content">
        <!-- 合同信息start -->
        <div class="cont" :class="{'hide':!cont.showFlag, 'content-sj-left-right':app.displayStyle!=='normal'}">
          <el-form :model="contData" ref="contData" :rules="contRules" label-width="110px" label-position="right">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="投保单号" prop='prtNo' size="small" class="prtno-name">
                  <el-input v-model="contData.prtNo" class="prtno" readonly="readonly" @focus="followImage('ProposalContNo')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投保日期" prop='polApplyDate' class="dateClick">
                  <el-input @blur="operatPolApplyDate('contData.polApplyDate')" size="small" v-model="contData.polApplyDate" @focus="followImage('PolAppntDate')" placeholder="日期格式为yyyy-MM-dd"></el-input>
                  <el-date-picker size="small" v-model="contData.polApplyDate" type="date" placeholder="选择日期"
                                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" @focus="followImage('PolAppntDate')" :clearable="false"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="管理机构" prop='manageCom'>
                  <el-select v-model="contData.manageCom" filterable placeholder="请选择" size="small" disabled>
                    <el-option v-for="(item,index) in common.managementAgency" :key="index" :label="item.codeName"
                              :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="一级销售渠道" prop='saleChnl'>
                  <el-select v-model="contData.saleChnl" filterable placeholder="请选择" @change="selectSaleChn1"
                            size="small" @focus="followImage('SaleChnl')">
                    <el-option v-for="(item,index) in saleChnlList" :key="index" v-if='item.code!=="05"' :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="二级销售渠道" prop='sellType'>
                  <el-select v-model="contData.sellType" filterable placeholder="请选择" size="small">
                    <el-option v-for="(item, index) in sellTypeList" :key="index" :label="item.codeName"
                              :value="item.code1">
                      <span>{{ item.code1 }}</span>-<span>{{ item.codeName }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="业绩归属">
                  <el-input size="small" v-model="contData.performanceType"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="realTimeShowFlag">
                <el-form-item label="是否非实时" prop='realTime':required="required"  size="small" label-width="130px">
                  <el-select v-model="contData.realTime" placeholder="请选择" size="small" :disabled="this.entryOrEasy !== 'entry'">
                    <el-option v-for="item in realTimeList" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{item.code}}</span>-
                      <span>{{item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-form :model="agent" ref="agent" :rules="agentRules" label-width="110px" label-position="right">
            <el-row :gutter="10" name="agent" v-if="agentFrame.showFlag" size="small">
              <el-col :span="12">
                <el-form-item label="代理人编码" prop='agentCode' :required="required" class="common-double-input">
                  <input size="small" v-model.lazy="agent.agentCode" class="first-input agent-code" @focus="followImage('AgentCode')" @change="agentCodeChange(agent.agentCode)"></input>
                  <el-input size="small" v-model="agent.agentName" class="second-input" @focus="followImage('AgentCode')">
                    <el-button slot="append" icon="el-icon-search" class="append-button" type="primary"
                              @click="agentCodeDbCliclk"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="代理人组别" prop='agentGroup' :required="required" class="common-double-input">
                  <el-input size="small" v-model="agent.agentGroup" class="first-input" :disabled="true"></el-input>
                  <el-input size="small" v-model="agent.groupName" class="second-input" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" name="agent" v-if="agentFrame.showFlag" size="small">
              <el-col :span="8">
                <el-form-item label="代理人所属机构" prop='manageCom'>
                  <!-- <el-select v-model="agent.manageCom" filterable placeholder="请选择" size="small">
                    <el-option v-for="item in common.managementAgency" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName }}</span>
                    </el-option>
                  </el-select> -->
                  <!-- <el-col :span="8">
                    <el-select v-model="agent.manageCom" placeholder="请选择" size="small" @change="changeCode" :disabled="true">
                      <el-option v-for="item in common.managementAgency" :key="item.code" :label="item.code" :value="item.code+'-'+item.codeName">
                        <span>{{ item.code }}</span>-<span>{{ item.codeName }}</span>
                      </el-option>
                    </el-select>
                  </el-col> -->
                  <el-input size="small" v-model="common.manageComMap[agent.manageCom]" :disabled="true" @focus="followImage('AgentManageComName')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8" v-if="ydzjShowFlag">
                <el-form-item label="出单类型" prop='makeType'>
                  <el-select v-model="contData.makeType" filterable placeholder="请选择" size="small" @change="makeTypeChange">
                    <el-option v-for="(item, index) in makeTypeList" :key="index" :label="item.codeName"
                               :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 综拓 -->
          <el-form :model="ztagent" ref="ztagent" :rules="ztagentRules" label-width="140px" label-position="right">
            <el-row :gutter="10" name="ztagent" v-if="ztagentFrame.showFlag" size="small">
              <el-col :span="8">
                <el-form-item label="综拓代理人编码" prop='agentCode' class="common-double-input" size="small">
                  <el-input v-model="ztagent.agentCode" @dblclick.native="ztAgentCodeDbClicll" class="first-input"
                            @focus="followImage('AgenterCode1')" @change="ztAgentCodeChange(ztagent.agentCode)"></el-input>
                  <el-input v-model="ztagent.agentName" class="second-input" @focus="followImage('AgenterName1')" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="综拓代理人组别" prop='agentGroup' size="small" :required="required"
                              class="common-double-input">
                  <el-input v-model="ztagent.agentGroup" class="first-input" :disabled="true"></el-input>
                  <el-input v-model="ztagent.groupName" class="second-input" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="综拓代理人所属机构" prop='manageCom' size="small">
                  <el-select v-model="ztagent.manageCom" placeholder="请选择" @focus="followImage('AgentManageCom1')" size="small" :disabled="true">
                    <el-option v-for="(item,index) in common.managementAgency" :key="index" :label="item.codeName"
                              :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 中介 -->
          <el-form :model="zjagent" ref="zjagent" :rules="zjagentRules" label-width="135px" label-position="right">
            <el-row :gutter="10" name="zjagent" v-if="zjagentFrame.showFlag" size="small">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="中介机构编码" prop='zjAgentCom' size="small">
                    <el-input v-model="zjagent.zjAgentCom" size="small" @change="zjAgentComChange(zjagent.zjAgentCom, 'zj')">
                      <el-button class="append-button" type="primary" slot="append" icon="el-icon-search" @click.native="zjAgentComDbCliclk"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中介机构名称" prop='zjAgentComName' size="small">
                    <el-input v-model="zjagent.zjAgentComName" @focus="followImage('ZJAgentComName')" size="small" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中介销售人员姓名" prop='zjAgentName' size="small">
                    <el-input v-model="zjagent.zjAgentName" @focus="followImage('ZJAgentName')" size="small"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="中介销售人员代码" prop='zjAgentCode' :required="false" size="small">
                    <el-input v-model="zjagent.zjAgentCode" @focus="followImage('ZJAgentCode')" size="small"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="中介销售人员电话" prop='mobile' size="small" :required="false">
                    <el-input v-model="zjagent.mobile"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-form>
          <!-- 银行邮政代理 -->
          <el-form :model="ydagent" ref="ydagent" :rules="ydagents" label-width="120px" label-position="right">
            <el-row :gutter="10" name="ydagent" v-if="ydagentFrame.showFlag" size="small">
              <el-row>
              <div v-if="ydzjShowFlag && issueShowFlag">
                <el-col :span="8">
                  <el-form-item label="中介机构" prop='zjAgentCom' size="small" class="common-double-input">
                    <el-input v-model="ydagent.zjAgentCom" @dblclick.native="zjAgentComDbCliclk" class="first-input" @change="zjAgentComChange(ydagent.zjAgentCom, 'yd')"></el-input>
                    <el-input v-model="ydagent.zjAgentComName" class="second-input" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </div>
                <el-col :span="8">
                  <el-form-item label="代理机构" prop='agentCom' size="small" class="common-double-input">
                    <el-input v-model="ydagent.agentCom" @dblclick.native="ydAgentComDbCliclk" class="first-input" @focus="followImage('AgentCom')" @change="agentComChange(ydagent.agentCom)"></el-input>
                    <el-input v-model="ydagent.agentComName" class="second-input" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="银行专管员" prop='agentCode' class="common-double-input" size="small">
                    <el-select v-model="ydagent.agentCode" placeholder="请选择" size="small" value-key="id"
                              @change="selectYdAgent" @focus="followImage('AgentName')">
                      <el-option v-for="(item,index) in ydzgAgents" :key="index"
                                :label="item.agentCode"
                                :value="item.agentCode">
                        <span>{{item.agentCode}}</span>-
                        <span>{{item.agentName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专管人组别" prop='branchAttr' :required="false" size="small">
                    <el-input v-model="ydagent.branchAttr" size="small" :disabled="bankRequired" readonly></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="银行销售员代码" prop='ydAgentCode'  size="small" label-width="130px">
                    <el-input v-model="ydagent.ydAgentCode" size="small" @focus="followImage('CounterCode')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="银行销售员姓名" prop='ydAgentName'  size="small" label-width="130px">
                    <el-input v-model="ydagent.ydAgentName" size="small" @focus="followImage('CounterName')"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-row>
          </el-form>
          <el-form :model="contData" ref="contData2" :rules="contRules" label-width="110px" label-position="right">
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="初审员签名" prop='signName' size="small" :required="required" v-if="agenttype">
                  <el-input v-model="contData.signName" @focus="followImage('SignName')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="初审日期" prop='firstTrialDate' v-if="agenttype" class="dateClick">
                  <el-input @blur="operatPolApplyDate('contData.firstTrialDate')" size="small" v-model="contData.firstTrialDate" @focus="followImage('FirstTrialDate')" placeholder="日期格式为yyyy-MM-dd"></el-input>
                  <el-date-picker size="small" v-model="contData.firstTrialDate" type="date" placeholder="选择日期"
                                  format="yyyy-MM-dd" value-format="yyyy-MM-dd" @focus="followImage('FirstTrialDate')" :clearable="false"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保单服务人员">
                  <el-input size="small" v-model="policyOfficer" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10" v-if="this.entryOrEasy !== 'entry'">
              <el-col :span="8">
                <el-form-item label="是否关联投保单" prop='appLinkedOrNot'>
                  <!-- <el-radio-group v-model="contData.appLinkedOrNot" filterable placeholder="请选择" size="small">
                    <el-radio-button v-for="item in appLinked" :key="item.code" :label="item.code" :value="item.code">
                      <span>{{ item.codeName }}</span>
                    </el-radio-button>
                  </el-radio-group> -->
                  <el-select v-model="contData.appLinkedOrNot" placeholder="请选择" size="small" @change="changeRelationNoCheck" disabled>
                    <el-option v-for="item in appLinked" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{item.code}}</span>-
                      <span>{{item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="关联投保单号" prop='relationNo' size="small">
                  <el-input v-model="contData.relationNo" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="双录保单" prop='isDoubleRecords' size="small" :required="required">
                  <el-input v-model="contData.isDoubleRecords" @change="channelFun" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否已双录" prop='doubleRecordOrNot' v-if="agenttype">
                  <!-- <el-radio-group v-model="contData.doubleRecordOrNot" filterable placeholder="请选择" size="small"
                                  aria-readonly="true" :disabled="disabledList">
                    <el-radio-button v-for="item in doubleInputed" :key="item.code" :label="item.code"
                                    :value="item.code">
                      <span>{{ item.codeName }}</span>
                    </el-radio-button>
                  </el-radio-group> -->
                  <el-select v-model="contData.doubleRecordOrNot" placeholder="请选择" size="small">
                    <el-option v-for="item in doubleInputed" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{item.code}}</span>-
                      <span>{{item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="保单币种" prop='currency'>
                  <el-select v-model="contData.currency" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in currency"
                      :key="item.currcode"
                      :label="item.codealias"
                      :value="item.currcode">
                      <span>{{ item.currcode }}</span>-
                      <span>{{ item.codealias }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="16">
                <el-form-item label="备注" size="small" prop='remark' :required="false">
                  <el-input v-model="contData.remark" :autosize="{minRows: 3, maxRows: 4}" type="textarea"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <p class='content-tit' name="manager-info" :class="{'hide':!managerFrame.showFlag}">
              <span @click="isShow('isShowManage')" v-if='isShowManage'>-</span>
              <span @click="isShow('isShowManage')" v-else>+</span>
              项目经理信息
            </p>
            <el-table :data="manager.managerInfos" border v-show='isShowManage' class='table-common'
                      :class="{'hide':!managerFrame.showFlag}" size="mini">
              <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
              <el-table-column prop="agentCode" label="项目经理代码" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="agentName" label="项目经理姓名" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="manageCom" label="所属机构" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="groupName" label="营业部、组" min-width="10%" align="center"></el-table-column>
            </el-table>
            <!-- <p class='content-tit' name="other-agent-info"  :class="{'hide':!otherAgentFrame.showFlag}">
              <span @click="isShow('isShowManage')" v-if='isShowManage'>-</span>
              <span @click="isShow('isShowManage')" v-else>+</span>
              其他业务员信息
            </p>
            <el-table :data="otherAgent.otherAgentInfos" border v-show='isShowManage' class='table-common' :class="{'hide':!otherAgentFrame.showFlag}" @row-dblclick = "otherAgentDbClick" size="mini">
              <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
              <el-table-column prop="agentCode" label="业务员代码" min-width="10%" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.agentCode" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="agentName" label="业务员姓名" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="manageCom" label="所属机构" min-width="10%" align="center"></el-table-column>
              <el-table-column prop="groupName" label="营业部、组" min-width="10%" align="center"></el-table-column>
            </el-table>-->
            <!-- 代理人告知信息 -->
            <agentImpart editShowFlag="true" :disabled="false" name='agentImpart' ref="agentImpart" v-on:agentImpartUpdate='agentImpartUpdate'></agentImpart>
          </el-form>
          <div align="right" class="next-btn">
            <el-button type="primary" icon="el-icon-arrow-right" @click='saveCont'>下一步</el-button>
          </div>
        </div>
        <!-- 合同信息end -->
        <!-- 投保人信息start -->
        <div class="appnt" :class="{'hide':!appnt.showFlag, 'content-sj-left-right':app.displayStyle!=='normal'}">
          <el-form :model="appntData" ref="appntData" :rules='appntDataRules' label-width="130px" label-position="right"
                  v-if="appnt.showFlag">
            <el-row>
              <el-form-item label="客户号:" prop="appntNo" size="small" :required="false">
                <el-input v-model="appntData.appntNo" style="width:200px;margin:5px;" size="mini" @change="queryCustomerForAppntBlur">
                  <el-button class="append-button" icon="el-icon-search" slot="append"
                            @click="queryCustomerForAppnt"></el-button>
                </el-input>
                (首次投保客户无需填写客户号)
                <el-button @click="resetForm()">重置</el-button>
              </el-form-item>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="姓名" prop="appntName">
                  <el-input v-model="appntData.appntName" maxlength="20" size="small"
                            @focus="followImage('AppntName')" @change="queryCustomerInfoByFive"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件类型" prop="idtype" size="small">
                  <el-select v-model="appntData.idtype" @change="changeAppIdType" filterable placeholder="请选择" :disabled="false"  @focus="followImage('AppntIDType')">
                    <el-option v-for="item in idType" :key="item.code" :label="item.code+'-'+item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码" prop="idno" size="small">
                  <el-input v-model="transformation" maxlength="20" @focus="followImage('AppntIDNo')" @change="queryCustomerInfoByFive"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-col :span="15">
                  <el-form-item label="证件有效期至" prop='idExpDates' class="common-double-input">
                    <el-select v-model="appntData.idExpDates" filterable placeholder="请选择" :disabled="disabledDate"
                              size="small" @change="dataLists"  @focus="followImage('AppIDPeriodOfValidityType')">
                      <el-option
                        v-for="item in datalist"
                        :key="item.code"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item v-show="!datas" label='' :required="false" prop="idexpDate" size="small" label-width="0">
                    <el-input v-model="appntData.idexpDate" @focus="followImage('AppIDPeriodOfValidity')" maxlength="20"></el-input>
                  </el-form-item>
                  <el-form-item v-show="datas" label='' :required="false" prop="idexpDate" size="small" label-width="0" class="dateClick">
                    <el-input @blur="operatPolApplyDate('appntData.idexpDate')" :disabled="disabledDate" size="small" v-model="appntData.idexpDate" @focus="followImage('AppIDPeriodOfValidity')" placeholder="日期格式为yyyy-MM-dd"></el-input>
                    <el-date-picker v-model="appntData.idexpDate" type="date" placeholder="选择日期" @focus="followImage('AppIDPeriodOfValidity')"
                                      :format="'yyyy-MM-dd'" :value-format="'yyyy-MM-dd'" :picker-options='pickerOptions' :clearable="false"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
              <el-col :span="8">
                <el-form-item label="性别" prop="appntSex" size="small">
                  <!-- <el-radio-group v-model="appntData.appntSex" filterable placeholder="请选择" :disabled="false" @change="queryCustomerInfoByFive,followImage('AppntSex')">
                    <el-radio-button v-for="item in gender" :key="item.code" :label="item.code" :value="item.code" >
                      <span>{{ item.codeName}}</span>
                    </el-radio-button>
                  </el-radio-group> -->
                  <el-select v-model="appntData.appntSex" placeholder="请选择" size="small"  @change="queryCustomerInfoByFive" @focus="followImage('AppntSex')">
                    <el-option v-for="item in gender" :key="item.code" :label="item.codeName" :value="item.code" >
                      <span>{{item.code}}</span>-
                      <span>{{item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="出生日期" prop="appntBirthday" class="dateClick">
                  <el-input @change="operatPolApplyDate('appntData.appntBirthday','changeAppntBirthday')" size="small" v-model="appntData.appntBirthday" @focus="followImage('AppntBirthday')" placeholder="日期格式为yyyy-MM-dd"></el-input>
                  <el-date-picker v-model="appntData.appntBirthday" size="small" type="date" placeholder="选择日期"
                                  format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                                  @change="changeAppntBirthday(appntData.appntBirthday)"
                                  @focus="followImage('AppntBirthday')" :clearable="false"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="国籍" :required="required" prop="nativePlace" size="small">
                  <el-select v-model="appntData.nativePlace" filterable placeholder="请选择" :disabled="false" @focus="followImage('AppntNativePlace')">
                    <el-option v-for="item in appntNativePlace" :key="item.code" :label="item.code+'-'+item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年龄" prop="age" size="small">
                  <el-input v-model.number="appntData.age" readonly="readonly"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="isHide">
                <el-form-item label="是否为特殊人群" prop="specialPopFlag" size="small">
                  <!-- <el-radio-group v-model="appntData.specialPopFlag" filterable placeholder="请选择" :disabled="false"  @change="followImage('SocialInsuFlag')">
                    <el-radio-button v-for="item in specialPopFlag" :key="item.code" :label="item.code"
                                    :value="item.code">
                      <span>{{ item.codeName}}</span>
                    </el-radio-button>
                  </el-radio-group> -->
                  <el-select v-model="appntData.specialPopFlag" placeholder="请选择" size="small" @change="followImage('SocialInsuFlag')">
                    <el-option v-for="item in specialPopFlag" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{item.code}}</span>-
                      <span>{{item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="身高(/厘米)" prop="stature" size="small">
                  <el-input v-model="appntData.stature" maxlength="3" @focus="followImage('AppntStature')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="体重(/公斤)" prop="avoirdupois" size="small">
                  <el-input v-model="appntData.avoirdupois" maxlength="3" @focus="followImage('AppntAvoirdupois')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="电子邮件" prop="lcaddressPojo.email" size="small">
                  <el-input v-model="appntData.lcaddressPojo.email" maxlength="40" @focus="followImage('AppntEMail')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="denTypeShow">
                <el-form-item label="居民类型" prop="denType" size="small">
                  <el-select v-model="appntData.denType" filterable placeholder="请选择" :disabled="false" @focus="followImage('DenType')">
                    <el-option v-for="item in denType" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="16">
                <el-form-item label="联系地址" prop="lcaddressPojo.postalAddress" size="small" :required="required">
                  <el-input v-model="appntData.lcaddressPojo.postalAddress"  @focus="followImage('AppntHomeAddress')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮政编码" prop="lcaddressPojo.zipCode" size="small" :required="required">
                  <el-input v-model="appntData.lcaddressPojo.zipCode" @change="getHomeAddressByAppntZip()" @focus="followImage('AppntHomeZipCode')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="联系电话" prop="lcaddressPojo.preferredPhoneNum" size="small">
                  <el-select v-model="appntData.lcaddressPojo.preferredPhoneNum" filterable placeholder="请选择"
                            :disabled="false" @change='changePhoneNum'>
                    <el-option v-for="item in preferredPhoneNum" :key="item.code" :label="item.codeName"
                              :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="固定电话" prop="lcaddressPojo.phone" size="small" :required="false">
                  <el-input v-model="appntData.lcaddressPojo.phone"  @focus="followImage('AppntHomePhone')" maxlength="15"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机" prop="lcaddressPojo.mobile" size="small" :required="false">
                  <el-input v-model="appntData.lcaddressPojo.mobile" maxlength="15" @focus="followImage('AppntMobile')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="工作单位" prop="lcaddressPojo.grpName" size="small" :required="false">
                  <el-input v-model="appntData.lcaddressPojo.grpName" maxlength="80" @focus="followImage('AppntGrpName')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职业编码" prop="occupationCode" size="small" class="common-double-input">
                  <el-input v-model="appntData.occupationCode" class="first-input" @focus="followImage('AppntOccupationCode')" @change="occupationCodeChange(appntData.occupationCode, 'appnt')"></el-input>
                  <el-input v-model="appntData.occupationName" readonly="readonly" class="second-input" @focus="followImage('AppntOccupationCodeName')">
                    <el-button class="append-button" type="primary" slot="append" icon="el-icon-search"
                              @click="showJobQueryDialogForAppnt"></el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="职业类别" prop="occupationType" size="small" class="common-double-input">
                  <el-input v-model="appntData.occupationType" readonly="readonly" class="first-input"></el-input>
                  <el-input v-model="appntData.occupationLevel" readonly="readonly" class="second-input">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8" v-if="yearIncomes">
                <el-form-item label="年收入(/万元)" prop="yearIncome" size="small">
                  <el-input v-model="appntData.yearIncome" @focus="followImage('Income0')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="!yearIncomes">
                <el-form-item label="年收入" prop="yearIncome" size="small">
                  <el-input v-model="appntData.yearIncome" @focus="followImage('Income0')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="!yearIncomes">
                <el-form-item label="保单币种" prop='currency'>
                  <el-select v-model="appntData.currency" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in currency"
                      :key="item.currcode"
                      :label="item.codealias"
                      :value="item.currcode">
                      <span>{{ item.currcode }}</span>-
                      <span>{{ item.codealias }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="主要收入来源" :required="required" prop="incomeSource" size="small">
                  <el-select v-model="appntData.incomeSource" filterable placeholder="请选择" :disabled="false" :clearable="true">
                    <el-option v-for="item in salarySource" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="是否拥有公费医疗、社会医疗保险" :required="false" prop="socialInsuFlag" size="small"
                              label-width="250px">
                  <!-- <el-radio-group v-model="appntData.socialInsuFlag" filterable placeholder="请选择" :disabled="false">
                    <el-radio-button :label="1">
                      <span>是</span>
                    </el-radio-button>
                    <el-radio-button :label="0">
                      <span>否</span>
                    </el-radio-button>
                  </el-radio-group> -->
                  <el-select v-model="appntData.socialInsuFlag" placeholder="请选择" size="small" @change="followImage('SocialInsuFlagName')">
                    <el-option v-for="item in specialPopFlag" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{item.code}}</span>-
                      <span>{{item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-col :span="8">
              <el-form-item  label="系被保人的" :required="true" prop="relationToInsured" size="small">
                <el-select v-model="appntData.relationToInsured" filterable placeholder="请选择"  :disabled="false">
                  <el-option v-for="item in relation" :key="item.code" :label="item.codeName" :value="item.code">
                    <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                  </el-option>
                </el-select>
            <el-col :span="8">
              <el-form-item  label="是否拥有公费医疗、社会医疗保险" :required="false" prop="socialInsuFlag" size="small" label-width="250px">
                <el-radio-group v-model="appntData.socialInsuFlag" filterable placeholder="请选择"  :disabled="false">
                  <el-radio-button v-for="item in socisalFlag" :key="item.code" :label="item.code" :value="item.code">
                    <span>{{ item.codeName}}</span>
                  </el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        <el-row type="flex" class="row-bg">
            <el-col>
              <el-form-item>
                <el-button type="primary" @click="queryBtn">查询</el-button>
              </el-form-item>
            </el-col>
          -->
          </el-form>
          <p class="content-tit"><span
            @click="showIndividualTaxation">{{ individualTaxation.shapIndividualTaxation }}</span>个人税收居民身份信息</p>
          <el-form :model="individualTaxationData" ref="individualTaxationData" :rules='individualData' label-width="130px"
                  label-position="right" v-if="individualTaxation.showFlag">
            <el-row type="flex" class="">
              <el-col :span="8">
                <el-form-item label="纳税身份" required prop="taxpayerType" size="small">
                  <el-select v-model="individualTaxationData.taxpayerType" filterable placeholder="请选择"
                            @change="changeTaxpayerType" :disabled="false">
                    <el-option v-for="item in taxpayerType" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div v-if="individualTaxation1.showFlag">
              <el-row type="flex" class="">
                <el-col :span="8">
                  <el-form-item label="姓(英文或拼音)" prop="firstName" size="small" :required="false">
                    <el-input v-model="individualTaxationData.firstName"
                              @keyup.native="individualTaxationData.firstName=individualTaxationData.firstName.replace(/[^\a-z\A-Z]/g,'')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="名(英文或拼音)" prop="lastName" size="small" :required="false">
                    <el-input v-model="individualTaxationData.lastName"
                              @keyup.native="individualTaxationData.lastName=individualTaxationData.lastName.replace(/[^\a-z\A-Z]/g,'')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生日期" :required="false" prop="birthday" size="small">
                    <el-date-picker v-model="individualTaxationData.birthday" type="date" placeholder="选择日期"
                                    :format="'yyyy-MM-dd'" :value-format="'yyyy-MM-dd'">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">

                <el-col :span="24">
                  <p class="content-tit">现居住地址</p>
                  <el-row type="flex">
                    <el-col :span="6">
                      <el-form-item label="中文" prop="nowCountry" size="small" :required="false">
                        <!--<el-input v-model="individualTaxationData.nowCountry" placeholder="国家"></el-input>-->
                        <el-select v-model="individualTaxationData.nowCountry" filterable placeholder="请选择"
                                  :disabled="false">
                          <el-option v-for="item in nativeplace" :key="item.code" :label="item.codeName"
                                    :value="item.code">
                            <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="20px" prop="nowProvince" size="small" :required="false">
                        <el-input v-model="individualTaxationData.nowProvince" placeholder="省"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="20px" prop="nowCity" size="small" :required="false">
                        <el-input v-model="individualTaxationData.nowCity" placeholder="市"></el-input>
                        <span></span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="" label-width="20px" prop="nowAddress" size="small" :required="false">
                        <el-input v-model="individualTaxationData.nowAddress" placeholder="详细地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="row-bg">
                    <el-col :span="6">
                      <el-form-item label="英文或拼音" prop="nowCountry2" size="small" :required="false">
                        <el-input v-model="individualTaxationData.nowCountry2" placeholder="国家"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="20px" prop="nowProvince2" size="small" :required="false">
                        <el-input v-model="individualTaxationData.nowProvince2" placeholder="省"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="20px" prop="nowCity2" size="small" :required="false">
                        <el-input v-model="individualTaxationData.nowCity2" placeholder="市"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="" label-width="20px" prop="nowAddress2" size="small" :required="false">
                        <el-input v-model="individualTaxationData.nowAddress2" placeholder="详细地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="24">
                  <p class="content-tit">出生地址</p>
                  <el-row>
                    <el-col :span="6">
                      <el-form-item label="中文" prop="birthCountry" size="small" :required="false">
                        <el-select v-model="individualTaxationData.birthCountry" filterable placeholder="请选择"
                                  :disabled="false">
                          <el-option v-for="item in nativeplace" :key="item.code" :label="item.codeName"
                                    :value="item.code">
                            <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="20px" prop="birthProvince" size="small" :required="false">
                        <el-input v-model="individualTaxationData.birthProvince" placeholder="省"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="20px" prop="birthCity" size="small" :required="false">
                        <el-input v-model="individualTaxationData.birthCity" placeholder="市"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="" label-width="20px" prop="birthAddress" size="small" :required="false">
                        <el-input v-model="individualTaxationData.birthAddress" placeholder="详细地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" class="row-bg">
                    <el-col :span="6">
                      <el-form-item label="英文或拼音" prop="birthCountry2" size="small" :required="false">
                        <el-input v-model="individualTaxationData.birthCountry2" placeholder="国家"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="20px" prop="birthProvince2" size="small" :required="false">
                        <el-input v-model="individualTaxationData.birthProvince2" placeholder="省"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="" label-width="20px" prop="city" size="small" :required="false">
                        <el-input v-model="individualTaxationData.birthCity2" placeholder="市"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="" label-width="20px" prop="birthCity2" size="small" :required="false">
                        <el-input v-model="individualTaxationData.birthAddress2" placeholder="详细地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
              <p class="content-tit">税收信息</p>
              <el-row type="flex" class="row-bg">

                <el-col :span="8">
                  <el-form-item label="税收居民国（地区）1" prop="taxResident" size="small" :required="false"
                                label-width="160px">
                    <el-input v-model="individualTaxationData.taxResident"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="纳税人识别号1" prop="taxpayerNo" size="small" :required="false">
                    <el-input v-model="individualTaxationData.taxpayerNo" @change="distinguish"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="8">
                  <el-form-item label="税收居民国（地区）2" prop="taxResident2" size="small" :required="false"
                                label-width="160px">
                    <el-input v-model="individualTaxationData.taxResident2"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="纳税人识别号2" prop="taxpayerNo2" size="small" :required="false">
                    <el-input v-model="individualTaxationData.taxpayerNo2" @change="distinguishFun"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="16">
                  <el-form-item label="不能提供居民国（地区）纳税人识别号原因:" :required="false" prop="reasonCode" size="small"
                                label-width="300px">
                    <el-select v-model="individualTaxationData.reasonCode" filterable placeholder="请选择"
                              :disabled="disabled">
                      <el-option v-for="item in reasonCode" :key="item.code" :label="item.codeName" :value="item.code">
                        <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="16">
                  <el-form-item label="详细原因:" prop="reason" size="small" :required="false">
                    <el-input v-model="individualTaxationData.reason" type="textarea"
                              :autosize="{minRows: 3, maxRows: 4}"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <p class="content-tit"><span @click="showAccount">{{ account.shapeAccount }}</span>缴费信息</p>
          <el-form :model="accountData" ref="accountData" :rules="accountDataRules" label-width="130px"
                  class="demo-ruleForm" label-position="right" v-if="account.showFlag">
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <!--目前只有银行转账和其他，所以做了筛选 v-if='item.code==="0" || item.code==="b"'-->
                <el-form-item label="首期交费形式" prop="newPayMode" size="small">
                  <el-select @change="theSameToFirstAccount" v-model="accountData.newPayMode" filterable
                            placeholder="请选择" :disabled="false" @focus="followImage('PayMode')">
                    <el-option v-for="item in newPayMode" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  v-if="accountData.newPayMode==='0'" label="公私标志" prop="privateOrPublicSigns">
                  <!-- <el-radio-group v-model="accountData.privateOrPublicSigns">
                    <el-radio-button v-for="item in privateOrPublicSigns" :key="item.code" :label="item.code"
                                    :value="item.code">
                      {{item.codeName}}
                    </el-radio-button>
                  </el-radio-group> -->
                  <el-select v-model="accountData.privateOrPublicSigns" placeholder="请选择" size="small">
                    <el-option v-for="item in privateOrPublicSigns" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{item.code}}</span>-
                      <span>{{item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item required v-if="accountData.newPayMode=='0'" label="自动垫交标志" prop="autoPayFlag" size="small">
                  <el-radio-group v-model="accountData.autoPayFlag">
                    <el-radio-button  v-for="item in autoPayFlag" :key="item.code" :label="item.code" :value="item.code">
                      {{item.codeName}}
                    </el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </el-col>-->
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item  v-if="accountData.newPayMode==='0'" label="首期转账开户行" prop="newBankCode"
                              size="small">
                  <el-select v-model="accountData.newBankCode" filterable
                            placeholder="请选择">
                    <el-option v-for="item in bankCode" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  v-if="accountData.newPayMode==='0'" label="首期账户姓名" prop="newAccName"
                              size="small">
                  <el-input v-model="accountData.newAccName" maxlength="20" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  v-if="accountData.newPayMode==='0'" label="首期账号" prop="newBankAccNo"
                              size="small">
                  <el-input @change="queryBank(1)" v-model="accountData.newBankAccNo" maxlength="25"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="续期/续保首期一致" v-if="accountData.newPayMode==='0'" label-width="150px">
                  <el-checkbox v-model="accountData.payAccountChecked" @change='theSameToFirstAccount'></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="续期/续保交费形式" prop="payMode" size="small" label-width="150px">
                  <el-select v-model="accountData.payMode" filterable placeholder="请选择" @change="theSameToFirstAccount" @focus="followImage('SecPayMode')">
                    <el-option v-for="item in payMode" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item v-if="accountData.payMode==='0'" label="续期/续保开户行属地" prop="bankProivnce"
                              size="small">
                  <el-select v-model="accountData.bankProivnce" filterable placeholder="请选择">
                    <el-option v-for="item in province" :key="item.placecode" :label="item.placename"
                              :value="item.placecode">
                      <span>{{ item.placecode }}</span>-<span>{{ item.placename}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8" required v-if="accountData.payMode==='0'">
                <el-form-item  label="续期/续保转账开户行" prop="bankCode" size="small">
                  <el-select :disabled="accountData.payAccountChecked" v-model="accountData.bankCode" filterable
                            placeholder="请选择" @focus="followImage('SecAppntBankCode')">
                    <el-option v-for="item in bankCode" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8" v-if="accountData.payMode==='0'">
                <el-form-item  label="续期/续保账户姓名" prop="accName" size="small">
                  <el-input :disabled="accountData.payAccountChecked" v-model="accountData.accName"
                            maxlength="20" disabled  @focus="followImage('SecAppntAccName')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="accountData.payMode==='0'">
                <el-form-item label="续期/续保账号" prop="bankAccNo" size="small">
                  <el-input :disabled="accountData.payAccountChecked" @focus="followImage('SecAppntBankAccNo')" v-model="accountData.bankAccNo" maxlength="25" @change="queryBank(2)"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!-- 投保人告知 -->
          <appntImpart :msgfromfa="contData" editShowFlag="true" :disabled="false" name='appntImpart' ref="appntImpart" v-on:appntImpartUpdate='appntImpartUpdate'></appntImpart>
           <el-form name='otherInfo' label-width="130px" label-position="right">
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="确认栏是否录入" prop="affirmInputFlag" size="small">
                  <el-select v-model="appntData.affirmInputFlag" filterable placeholder="请选择" @focus="followImage('AffirmInputFlag')">
                    <el-option v-for="item in affirmInputFlag" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="8">
                <el-form-item label="合同争议处理方式" prop="disputedFlag" size="small">
                  <el-select v-model="contData.disputedFlag" filterable placeholder="请选择">
                    <el-option v-for="item in disputedFlag" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="8">
                <el-form-item label="仲裁机构" prop="arbitrationCom" size="small">
                  <el-input v-model="contData.arbitrationCom"></el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-form>
          <div align="right">
            <el-button type="primary" icon="el-icon-arrow-right" @click='saveAppnt'>下一步</el-button>
          </div>
        </div>
        <!-- 投保人信息end -->
        <!-- 被保人信息start -->
        <div class="insured" :class="{'hide':!insured.showFlag,'content-sj-left-right':app.displayStyle!=='normal'}">
          <p class="content-tit">被保险人信息</p>
          <el-table :data="insuredDatas" class='table-common' size="mini" :highlight-current-row="true" border>
            <el-table-column label="序号" type="index" min-width="4%" align="center"></el-table-column>
            <el-table-column prop="sequenceNo" label="被保险人顺位" min-width="10%" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.sequenceNo" filterable placeholder="请选择" disabled readonly='readonly'
                          size="mini">
                  <el-option v-for="item in sequenceNo" :key="item.code" :label="item.code+'-'+item.codeName" :value="item.code">
                    <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="insuredNo" label="客户号码" min-width="10%" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="10%" align="center"></el-table-column>
            <el-table-column prop="sex" label="性别" min-width="8%" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.sex" filterable placeholder="请选择" disabled size="mini">
                  <el-option v-for="item in gender" :key="item.code" :label="item.codeName" :value="item.code">
                    <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="birthday" label="出生日期" min-width="10%" align="center"></el-table-column>
            <el-table-column prop="relationToAppnt" label="投保人是被保险人的" min-width="15%" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.relationToAppnt" filterable placeholder="请选择" disabled size="mini"
                          @change="setInsuredByAppnt">
                  <el-option v-for="item in relation" :key="item.code" :label="item.code+'-'+item.codeName" :value="item.code">
                    <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                  </el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" header-align="center" min-width="10%">
              <template slot-scope="scope">
                <el-button v-if="insuredBtnController[scope.$index].addBtnShowFlag" type="primary"
                          icon="el-icon-edit-outline" @click.native.prevent='canModifyInsured(scope.$index)'
                          size="mini"></el-button>
                <el-button v-if="insuredBtnController[scope.$index].modifyBtnShowFlag" type="success"
                          icon="el-icon-check" @click.native.prevent='canAddInsured(scope.$index)'
                          size="mini"></el-button>
                <el-button type="danger" icon="el-icon-delete"
                          @click.native.prevent="deleteInsured(scope.$index, insuredDatas)" size="mini"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-form :model="insuredData" ref="insuredData" :rules="insuredDataRules" label-width="130px"
                  label-position="right" v-if="insured.showFlag">
            <el-row type="flex" class="row-bg">
              <el-col :span="12">
                <el-form-item label="客户号" prop="insuredNo" size="small" :required="false">
                  <el-input v-model="insuredData.insuredNo" style="width:200px;margin:5px;" size="mini" @change="queryCustomerForInsuredBlur">
                    <el-button class="append-button" icon="el-icon-search" slot="append"
                              @click="queryCustomerForInsured"></el-button>
                  </el-input>
                  (首次投保客户无需填写客户号)
                </el-form-item>
              </el-col>
              <!-- <el-col :span="9" style="color: red">
                <el-form-item label="如投保人为被保险人本人，可免填本栏，请选择" label-width="320px">
                  <el-checkbox @change = 'oneself'></el-checkbox>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="8">
                <el-form-item label="被保险人顺位" prop="sequenceNo" size="small" :required="required">
                  <el-select v-model="insuredData.sequenceNo" filterable placeholder="请选择">
                    <el-option v-for="item in sequenceNo" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="投保人是被保险人的" prop="relationToAppnt" size="small" :required="required" :label-width="'150px'">
                  <el-select v-model="insuredData.relationToAppnt" filterable placeholder="请选择" :disabled="false"
                            @change="setInsuredByAppnt" @focus="followImage('RelationToInsured')">
                    <el-option v-for="item in relation" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <div  v-if="!(insuredData.relationToAppnt==='00')">
              <el-row type="flex" class="row-bg">
                <el-col :span="8">
                  <el-form-item label="姓名" prop="name" size="small" :required="required">
                    <el-input v-model="insuredData.name" @focus="followImage('Name')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件类型" prop="idtype" size="small" :required="required">
                    <el-select v-model="insuredData.idtype" @change="changeInsuredIdType" filterable placeholder="请选择" :disabled="false" @focus="followImage('IDType')">
                      <el-option v-for="item in idType" :key="item.code" :label="item.code+'-'+item.codeName" :value="item.code">
                        <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件号码" :required="required" prop="idno" size="small">
                    <el-input v-model="insuredTransformation"  @focus="followImage('IDNo')"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="8">
                    <el-col :span="15">
                      <el-form-item label="证件有效期至" prop='idExpDates' class="common-double-input">
                        <el-select v-model="insuredData.idExpDates" filterable placeholder="请选择" :disabled="disabledDate"
                                  size="small" @change="idexpLists"  @focus="followImage('IDPeriodOfValidityType')">
                          <el-option
                            v-for="item in datalist"
                            :key="item.code"
                            :value="item.code">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item v-show="!datas" label='' :required="false" prop="idexpDate" size="small" label-width="0">
                        <el-input v-model="insuredData.idexpDate" maxlength="20"  @focus="followImage('IDPeriodOfValidity')"></el-input>
                      </el-form-item>
                      <el-form-item v-show="datas" label='' :required="false" prop="idexpDate" size="small" label-width="0" class="dateClick">
                        <el-input @blur="operatPolApplyDate('insuredData.idexpDate')" :disabled="disabledDate" size="small" v-model="insuredData.idexpDate" @focus="followImage('IDPeriodOfValidity')" placeholder="日期格式为yyyy-MM-dd"></el-input>
                        <el-date-picker v-model="insuredData.idexpDate" type="date" placeholder="选择日期"
                                        :format="'yyyy-MM-dd'" :value-format="'yyyy-MM-dd'" :picker-options='pickerOptions' @focus="followImage('IDPeriodOfValidity')" :clearable="false"></el-date-picker>
                      </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别" prop="sex" size="small" :required="required">
                    <!-- <el-radio-group v-model="insuredData.sex" filterable placeholder="请选择" :disabled="false" @change="followImage('Sex')">
                      <el-radio-button v-for="item in gender" :key="item.code" :label="item.code" :value="item.code">
                        <span>{{ item.codeName}}</span>
                      </el-radio-button>
                    </el-radio-group> -->
                    <el-select v-model="insuredData.sex" placeholder="请选择" size="small"  @focus="followImage('Sex')">
                      <el-option v-for="item in gender" :key="item.code" :label="item.codeName" :value="item.code">
                        <span>{{item.code}}</span>-
                        <span>{{item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="出生日期" :required="required" prop="birthday" size="small" class="dateClick">
                    <el-input @blur="operatPolApplyDate('insuredData.birthday')" size="small" v-model="insuredData.birthday" @focus="followImage('Birthday')" placeholder="日期格式为yyyy-MM-dd"></el-input>
                    <el-date-picker v-model="insuredData.birthday" type="date" placeholder="选择日期" :format="'yyyy-MM-dd'"
                                    :value-format="'yyyy-MM-dd'" @focus="followImage('Birthday')" :clearable="false"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--<el-row type="flex" class="row-bg">
                 <el-col :span="8">
                  <el-form-item label="证件有效期至" prop="idExpDate" size="small">
                    <el-select v-model="insuredData.idexpDate" filterable placeholder="请选择"  :disabled="false" @change="idexpLists">
                      <el-option v-for="item in datalist" :key="item.code" :label="item.codeName" :value="item.code">
                        <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item v-if="datas" :required="false" prop="idexpDate" size="small">
                    <el-date-picker v-model="insuredData.idexpDate" type="date" placeholder="选择日期" :format="'yyyy-MM-dd'" :value-format="'yyyy-MM-dd'"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <el-row type="flex" class="row-bg">
                <el-col :span="8">
                  <el-form-item label="国籍" :required="required" prop="nativePlace" size="small">
                    <el-select v-model="insuredData.nativePlace" filterable placeholder="请选择" :disabled="false" @focus="followImage('NativePlace')">
                      <el-option v-for="item in insuredNativePlace" :key="item.code" :label="item.code+'-'+item.codeName" :value="item.code">
                        <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="被保人年龄" prop="age" size="small" :required="false">
                    <el-input v-model.number="insuredData.age"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="isHide">
                  <el-form-item label="是否为特殊人群" :required="false" prop="specialPopFlag" size="small">
                    <!-- <el-radio-group v-model="insuredData.specialPopFlag" filterable placeholder="请选择" :disabled="false" @change="followImage('SocialInsuFlag')">
                      <el-radio-button v-for="item in specialPopFlag" :key="item.code" :label="item.code"
                                      :value="item.code">
                        <span>{{ item.codeName}}</span>
                      </el-radio-button>
                    </el-radio-group> -->
                    <el-select v-model="insuredData.specialPopFlag" placeholder="请选择" size="small" @change="followImage('SocialInsuFlag')">
                      <el-option v-for="item in specialPopFlag" :key="item.code" :label="item.codeName" :value="item.code">
                        <span>{{item.code}}</span>-
                        <span>{{item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="8">
                  <el-form-item label="身高(/厘米)"  prop="stature" size="small">
                    <el-input v-model="insuredData.stature" maxlength="3"  @focus="followImage('Stature')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="体重(/公斤)"  prop="avoirdupois" size="small">
                    <el-input v-model="insuredData.avoirdupois" maxlength="3"  @focus="followImage('Avoirdupois')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电子邮件" :required="false" prop="email" size="small">
                    <el-input v-model="insuredData.lcaddres.email"  @focus="followImage('EMail')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="denTypeShow">
                  <el-form-item label="居民类型"  prop="denType" size="small">
                    <el-select v-model="insuredData.denType" filterable placeholder="请选择" :disabled="false">
                      <el-option v-for="item in denType" :key="item.code" :label="item.codeName" :value="item.code">
                        <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="16">
                  <el-form-item label="联系地址" :required="required" prop="lcaddres.postalAddress" size="small">
                    <el-input v-model="insuredData.lcaddres.postalAddress" maxlength="80"  @focus="followImage('HomeAddress')">
                      <el-button type="primary" size="small" class="append-button" slot="append"
                                @click="setAddressInfoByAppnt">同投保人
                      </el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="邮政编码" :required="required" prop="lcaddres.zipCode" size="small">
                    <el-input v-model="insuredData.lcaddres.zipCode" @change="getHomeAddressByInsuredZip"  @focus="followImage('HomeZipCode')"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="8">
                  <el-form-item label="联系电话" :required="false" prop="preferredPhoneNum" size="small">
                    <el-select v-model="insuredData.lcaddres.preferredPhoneNum" filterable placeholder="请选择"
                              :disabled="false">
                      <el-option v-for="item in preferredPhoneNum" :key="item.code" :label="item.codeName"
                                :value="item.code">
                        <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="固定电话" :required="false" prop="phone" size="small">
                    <el-input v-model="insuredData.lcaddres.phone" @focus="followImage('HomePhone')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机" :required="false" prop="mobile" size="small">
                    <el-input v-model="insuredData.lcaddres.mobile" maxlength="15"  @focus="followImage('Mobile')"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="8">
                  <el-form-item label="工作单位" prop="yearIncome" size="small" :required="required">
                    <el-input v-model="insuredData.lcaddres.grpName" maxlength="60" @focus="followImage('GrpName')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职业编码" prop="occupationCode" size="small" class="common-double-input">
                    <el-input v-model="insuredData.occupationCode" class="first-input" @focus="followImage('OccupationCode')" @change="occupationCodeChange(insuredData.occupationCode, 'insured')"></el-input>
                    <el-input v-model="insuredData.occupationCodeName" readonly="readonly"
                              class="second-input"  @focus="followImage('OccupationCodeName')">
                      <el-button class="append-button" type="primary" slot="append" icon="el-icon-search"
                                @click="showJobQueryDialogForInsured"></el-button>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="职业类别" prop="occupationType" size="small" class="common-double-input">
                    <el-input v-model="insuredData.occupationType" readonly="readonly" class="first-input"></el-input>
                    <el-input v-model="insuredData.occupationLevel" readonly="readonly" class="second-input">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="8" v-if="yearIncomes">
                  <el-form-item label="年收入(/万元)" prop="yearIncome" size="small" :required="false">
                    <el-input v-model="insuredData.yearIncome"  @focus="followImage('Income')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="!yearIncomes">
                  <el-form-item label="年收入" prop="yearIncome" size="small" :required="false">
                    <el-input v-model="insuredData.yearIncome"  @focus="followImage('Income')"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8" v-if="!yearIncomes">
                <el-form-item label="保单币种" prop='currency'>
                  <el-select v-model="insuredData.currency" placeholder="请选择" size="small">
                    <el-option
                      v-for="item in currency"
                      :key="item.currcode"
                      :label="item.codealias"
                      :value="item.currcode">
                      <span>{{ item.currcode }}</span>-
                      <span>{{ item.codealias }}</span>
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                <el-col :span="8">
                  <el-form-item label="主要收入来源" :required="false" prop="incomeSource" size="small">
                    <el-select v-model="insuredData.incomeSource" filterable placeholder="请选择" :disabled="false" :clearable="true">
                      <el-option v-for="item in salarySource" :key="item.code" :label="item.codeName"
                                :value="item.code">
                        <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row type="flex" class="row-bg">
                <el-col :span="8">
                  <el-form-item label="是否拥有公费医疗、社会医疗保险" :required="false" prop="socialInsuFlag" size="small"
                                label-width="250px">
                    <!-- <el-radio-group v-model="insuredData.socialInsuFlag" :disabled="false"  @focus="followImage('SocialInsuFlagName')">
                      <el-radio-button label="1" value="1">是</el-radio-button>
                      <el-radio-button label="0" value="0">否</el-radio-button>
                    </el-radio-group> -->
                    <el-select v-model="insuredData.socialInsuFlag" placeholder="请选择" size="small" @focus="followImage('SocialInsuFlagName')">
                      <el-option v-for="item in specialPopFlag" :key="item.code" :label="item.codeName" :value="item.code">
                        <span>{{item.code}}</span>-
                        <span>{{item.codeName}}</span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <!-- 被保人信息 -->
          <insuredImpart :msgfromfa="contData" editShowFlag="true" :disabled="false" name='insuredImpart' ref="insuredImpart" v-on:infoFollowImage='infoFollowImage'></insuredImpart>
          <p class="content-tit"><span @click="showOrgBnf">{{ orgBnf.shapeOrgBnf }}</span>受益人类别信息
            <el-button @click.native.prevent="addOrgBnfRow" type="primary" icon="el-icon-plus" size="mini"
                      class="add-btn" v-if="this.insuredData.orgBnfs && this.insuredData.orgBnfs.length<=0">添加
            </el-button>
          </p>
          <div class="table" v-if="orgBnf.showOrgBnfFlag" name="org-bnfs">
            <el-table :data="insuredData.orgBnfs" style="width: 100%" :highlight-current-row="true" border size="mini">
              <el-table-column label="序号" align="center" header-align="center" type="index" width="60">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column label="受益人形态" width="150" align="center" header-align="center" prop="remark">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.remark" filterable placeholder="" :disabled="false" size="mini"
                            @change="selectBnfType(scope.row)">
                    <el-option v-for="item in orgBnfType" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="受益人类别" width="150" align="center" header-align="center" prop="bnfType">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.bnfType" filterable placeholder="" :disabled="false" size="mini">
                    <el-option v-for="item in bnfType" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span><span>{{item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="金融机构名称" width="600" align="center" header-align="center" prop="name">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="受益顺序" width="200" align="center" header-align="center" prop="bnfGrade">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bnfGrade" readonly="readonly" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="受益份额" width="340" align="center" header-align="center" prop="bnfLot">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bnfLot" readonly="readonly" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete"
                            @click.native.prevent="deleteRow(scope.$index, insuredData.orgBnfs)"
                            size="mini"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <p class="content-tit"><span @click="showOrgBnf">{{ orgBnf.shapeOrgBnf }}</span>受益人信息
            <el-button type="primary" size="mini" @click="followImage('BnfInfoScan')">受益人信息随动</el-button>
            <el-button @click.native.prevent="addLcBnfRow" type="primary" class="add-btn" icon="el-icon-plus" size="mini">添加</el-button>
          </p>
          <div class="table" v-if="orgBnf.showOrgBnfFlag" name="lc-bnfs ">
            <el-table :data="insuredData.lcBnfs" :highlight-current-row="true" border style="width: 100%" size="mini">
              <el-table-column fixed="left" label="序号" align="center" header-align="center" type="index" width="60">
                <template slot-scope="scope">{{scope.$index+1}}</template>
              </el-table-column>
              <el-table-column label="受益人类别" width="150" align="center" header-align="center" prop="bnfNo">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.bnfType" filterable placeholder="" :disabled="false" size="mini">
                    <el-option v-for="item in bnfType" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="受益顺序" width="150" align="center" header-align="center" prop="bnfGrade">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.bnfGrade" filterable placeholder="" :disabled="false" size="mini">
                    <el-option v-for="item in bnfGrade" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="受益份额(%)" width="150" align="center" header-align="center" prop="bnfLot">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.bnfLot" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="姓名" width="150" align="center" header-align="center" prop="name">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" size="mini" minlength="2" maxlength="20" @paste.native.prevent=" return false" @copy.native.prevent=" return false"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="性别" width="100" align="center" header-align="center" prop="sex">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.sex" filterable placeholder="" :disabled="false" size="mini">
                    <el-option v-for="item in gender" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="出生日期" width="240" align="center" header-align="center" prop="birthday">
                <template slot-scope="scope">
                  <el-date-picker size="mini" v-model="scope.row.birthday" type="date" placeholder="选择日期"
                                  :format="'yyyy-MM-dd'" :value-format="'yyyy-MM-dd'"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="证件类型" width="150" align="center" header-align="center" prop="idtype">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.idtype" filterable placeholder="" :disabled="false" size="mini" @change="lcBnfsNativePlace(scope.$index, scope.row)">
                    <el-option v-for="item in idType" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="证件号码" width="340" align="center" header-align="center" prop="idno">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.idno" size="mini" @change="orgBnfIdNo(scope.$index)"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="与被保人关系" width="220" align="center" header-align="center" prop="relationToInsured">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.relationToInsured" filterable placeholder="" :disabled="false"
                            size="mini">
                    <el-option v-for="item in relation" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="证件有效期" width="240" align="center" header-align="center" prop="idexpDate">
                <template slot-scope="scope">
                  <el-date-picker v-model="scope.row.idexpDate" type="date" placeholder="选择日期" :format="'yyyy-MM-dd'"
                                  :value-format="'yyyy-MM-dd'" :disabled="disabledDate" :picker-options='pickerOptions' size="mini"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column label="速填" width="150" align="center" header-align="center" prop="customerType">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.customerType" :disabled="false" size="mini"
                            @change="customerSelect(scope.row)">
                    <el-option v-for="item in customerType" :key="item.code" :label="item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="国籍" width="150" align="center" header-align="center" prop="nativePlace">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.nativePlace" filterable :disabled="false" size="mini">
                    <el-option v-for="item in iLIdTypeNativePlace[scope.$index].nativeplace" :key="item.code" :label="item.code+'-'+item.codeName" :value="item.code">
                      <span>{{ item.code }}</span>-<span>{{ item.codeName}}</span>
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="工作单位" width="200" align="center" header-align="center" prop="grpName">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.grpName" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="联系地址" width="340" align="center" header-align="center" prop="contactAddress">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.contactAddress" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="联系电话" width="150" align="center" header-align="center" prop="contactPhone">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.contactPhone" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="职业编码" width="120" align="center" header-align="center" prop="occupationCode">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.occupationCode" @focus="showJobQueryDialogForBnf(scope.$index)"
                            size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="职业" width="300" align="center" header-align="center" prop="occupationName">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.occupationName" readonly="readonly" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-button type="danger" icon="el-icon-delete"
                            @click.native.prevent="deleteRow(scope.$index, insuredData.lcBnfs)"
                            size="mini"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <p class="content-tit"><span @click="showLcpol">{{ lcpol.shapeLcpol }}</span>被保险人险种信息
            <el-button type="primary" size="mini" @click="followImage('RiskImageButton')">被保险人险种随动</el-button>
            <el-button @click.native.prevent="addPolRow('')" type="primary" icon="el-icon-plus" size="mini"
                      class="add-btn">险种录入
            </el-button>
          </p>
          <div class="table" v-if="lcpol.showLcpolFlag" name="lc-pols">
            <el-table :data="insuredData.lcpols" :highlight-current-row="true" border size="mini">
              <el-table-column label="序号" align="center" header-align="center" type="index" min-width="2%">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column label="险种编码" min-width="10%" align="center" header-align="center"
                              prop="riskCode"></el-table-column>
              <el-table-column label="险种名称" min-width="17%" align="center" header-align="center"
                              prop="riskName"></el-table-column>
              <el-table-column label="保险期间" min-width="10%" align="center" header-align="center"
                              :formatter="formatterInsuYearYearColumn" prop="insuYear"></el-table-column>
              <el-table-column label="交费期间" min-width="10%" align="center" header-align="center"
                              :formatter="formatterPayEndYearColumn" prop="payEndYear"></el-table-column>
              <el-table-column label="保险金额" min-width="8%" align="center" header-align="center"
                              prop="amnt"></el-table-column>
              <el-table-column label="投保份数" min-width="8%" align="center" header-align="center"
                              prop="mult"></el-table-column>
              <el-table-column label="合计保费（元）" min-width="11%" align="center" header-align="center"
                              prop="prem"></el-table-column>
              <el-table-column :formatter="formatterOccupationalPlusFeeColumn" label="职业加费（元）" min-width="11%"
                              align="center" header-align="center" prop="occupationalPlusFee"></el-table-column>
              <el-table-column :formatter="formatterCurrencyColumn" label="币种" min-width="8%" align="center"
                              header-align="center" prop="currency"></el-table-column>
              <el-table-column fixed="right" label="操作" min-width="25%" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-button type="primary" @click.native.prevent="addPolRow(scope.row.riskCode)" size="mini"
                            v-show="isFullBucket(scope.row.riskCode,scope.row.mainRiskCode)">添加附加险
                  </el-button>
                  <el-button type="primary" icon="el-icon-edit" @click.native.prevent='modifyPol(scope.$index)'
                            size="mini" class="modifylist"></el-button>
                  <el-button type="danger" icon="el-icon-delete"
                            @click.native.prevent="delConfirm(scope.$index, insuredData.lcpols)"
                            size="mini" class="modifylist"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div align="right" name='insured-save-btn'>
            <el-button v-if="insuredSaveBtn.addBtnShowFlag" type="primary" icon="el-icon-plus" @click='addInsured'
                      size="mini">添加被保人
            </el-button>
            <el-button v-if="insuredSaveBtn.modifyBtnShowFlag" type="primary" icon="el-icon-edit" @click='modifyInsured'
                      size="mini">保存信息
            </el-button>
          </div>
          <br/>
          <div align="right">
            <!-- <el-button type="primary" @click='inputConfirm' v-if="!insuredSaveBtn.modifyBtnShowFlag">录入完毕</el-button> -->
            <el-button type="primary" @click='toExamine' v-if="!insuredSaveBtn.modifyBtnShowFlag && this.entryOrEasy === 'entry'">录入完毕</el-button>
            <el-button type="primary" @click="modify" style="margin:5px;" size="mini" v-if="this.entryOrEasy !== 'entry' && !insuredSaveBtn.modifyBtnShowFlag">问题件修改完毕</el-button>
          </div>
        </div>
        <!-- 被保人信息end -->
        <!-- 险种信息start -->
        <!--<div class="product" :class="{'hide':!product.showFlag}">-->
        <!--险种-->
        <!--<el-button type="primary" @click='saveProduct' >保存</el-button>-->
        <!--</div>-->
        <!-- 险种信息end -->
        <div>
          <el-button type="primary" @click="problemReply" style="margin:5px;" size="mini" v-if="this.entryOrEasy !== 'entry'">问题件回复</el-button>
          <el-button type="primary" @click="photoQuery" style="margin:5px;" size="mini">影像件查询</el-button>
          <el-button type="primary" @click="signQuery" style="margin:5px;" size="mini">签名查询</el-button>
          <el-button type="primary" @click="problemEntry" style="margin:5px;" size="mini">问题件录入</el-button>
          <el-button type="primary" @click="problemQuery" style="margin:5px;" size="mini">问题件查询</el-button>
          <el-button type="primary" @click="noteQuery" style="margin:5px;" size="mini">记事本查看</el-button>
          <!--<el-button type="primary" @click="modify" style="margin:5px;" size="mini" v-if="this.entryOrEasy !== 'entry'">问题件修改完毕</el-button>-->
        </div>
          <div v-if="showSignFlag&&!changeSignFlag" class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '15px','margin-left': '55px'}">
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
          <el-button v-if="showSignFlag&&changeSignFlag" type="primary" @click="changeSignFlag = !changeSignFlag;followImage('ProposalContNo')" style="margin:5px;margin-left: 200px" size="mini">更换签名</el-button>
          <div v-if="showSignFlag&&!changeSignFlag">
            <el-button type="success" @click="screenShotUpload" style="margin:5px;margin-left: 180px" size="mini">截图</el-button>
            <el-button @click="changeSignFlag = !changeSignFlag;coordinate.isCrop=!coordinate.isCrop" style="margin:5px;" size="mini">取消</el-button>
          </div>
          <img :src="img">
      </div>
    </div>
    </div>
    <el-dialog  title="业务员查询" :visible.sync="agentCodeQuery.showFlag" width="90%">
      <agentCodeQuery :set-agentinfo="setAgentinfo"></agentCodeQuery>
    </el-dialog>
    <el-dialog title="中介机构查询" :visible.sync="zjAgentComQuery.showFlag" width="90%">
      <zjAgentComQuery :set-zj-agent-cominfo="setZjAgentCominfo"></zjAgentComQuery>
    </el-dialog>
    <el-dialog title="代理机构查询" :visible.sync="ydAgentComQuery.showFlag" width="90%">
      <ydAgentComQuery :set-yd-agent-cominfo="setYdAgentCominfo"></ydAgentComQuery>
    </el-dialog>
    <el-dialog title="综拓代理人查询" :visible.sync="ztAgentCodeQuery.showFlag" width="90%">
      <ztAgentCodeQuery :set-zt-agentinfo="setZtAgentinfo"></ztAgentCodeQuery>
    </el-dialog>
    <el-dialog title="客户信息查询" :visible.sync="customerQuery.showFlag" width="90%">
      <customerQuery :return-customer-info="returnCustomerInfo"></customerQuery>
    </el-dialog>
    <el-dialog title="职业查询" :visible.sync="occupationQuery.showFlag" width="80%">
      <occupationQuery :occupationInitParam="occupationInitParam" name='occupationQuery'
                       ref="occupationQuery"></occupationQuery>
      <span slot="footer">
        <el-button @click="occupationQuery.showFlag=false" size="mini">取 消</el-button>
        <el-button type="primary" @click="setOccpation" size="mini">确 认</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag title="险种信息录入" :visible.sync="proposalInput.showFlag" width="90%" @close="loading = false">
      <proposalInput :proposalInputInitParams="proposalInputInitParams" :contNoRiskFetch="contNoRiskFetch"
                     ref="proposalInput"></proposalInput>
      <span slot="footer">
        <el-button type="primary" @click="saveProduct" size="mini" :loading="loading">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import agentCodeQuery from './components/new-entry-change/agent-code-query'
  import ztAgentCodeQuery from './components/new-entry-change/zt-agent-code-query'
  import ydAgentComQuery from '@/components/apply/yd-agent-com-query'
  import zjAgentComQuery from './components/new-entry-change/zj-agent-com-query'
  import agentImpart from './components/new-entry-change/agent-impart'
  import appntImpart from './components/new-entry-change/appnt-impart'
  import insuredImpart from './components/new-entry-change/insured-impart'
  import occupationQuery from './components/new-entry-change/occupation-query'
  import customerQuery from './components/new-entry-change/customer-query'
  import proposalInput from './components/new-entry-change/proposal-input'
  import imageFollow from '@/components/image-follow/image-follow'
  import { mapState } from 'vuex'
  import { dataFormat, getAfterNYear } from '@/utils/common'
  import { getCode, getProvince, getSub, getOccupationList, getOccupationListByCode } from '@/api/common/common'
  import { getCustomerInfoByNo, getLcAddressInfoByCustomerNo } from '@/api/common/customer'
  import { getSecondaryCode, queryBankAgent, toExamineQuery, getBankAgentComs, getZjAgentComs, returnResult, returnZtResult, returnZjResult } from '@/api/order-enter/order-enter'
  // import { getSecondaryCode, queryBankAgent, toExamineQuery, getSalesList, getBankAgentComs, getZjAgentComs, getZtAgentList, returnResult, returnZtResult } from '@/api/order-enter/order-enter'
  import {
    checkQualification,
    getDetail,
    getHomeAddressByZip,
    initCont,
    inputConfirm,
    queryCustomerInfoByFive,
    saveCont,
    saveProposal,
    getScan,
    getScanImageData,
    checkAddInsured,
    checkDeleteInsured,
    queryCustomerTaxation,
    queryGradeBelong,
    doubleRecording,
    currency
  } from '@/api/new-entry/new-entry-change'
  import { calAge, dateDiff, getBirthdatByIdNo, getSexByIDNo, getBirthdayByHongKongPermit, getFormatDate } from '@/utils/common'
  import execCheck from '@/utils/checkutil'
  import { setRiskMap } from '@/utils/auth'
  import { modified } from '@/api/proposal-easy-scan/proposal-easy-scan'
  import { getSubtype } from '@/api/underwriting-application/underwriting-application'
  export default {
    name: 'newEntryChange',
    components: {
      agentCodeQuery,
      zjAgentComQuery,
      ydAgentComQuery,
      ztAgentCodeQuery,
      agentImpart,
      appntImpart,
      customerQuery,
      occupationQuery,
      insuredImpart,
      proposalInput,
      imageFollow
    },
    props: {
      entryOrEasy: { // 区分是新录入还是问题件修改，entry默认是新录入
        default: 'entry'
      }
    },
    data() {
      const required = (rule, value, callback) => {
        if (this.contData.appLinkedOrNot === '01' && !value) {
          return callback(new Error('请填写关联投保单号'))
        } else {
          callback()
        }
      }
      const checkDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择日期'))
        }
        const vlist = [
          {
            method: 'isDate',
            params: [value],
            errorMsg: '日期格式不正确'
          }
        ]
        const result = execCheck(vlist)
        if (result !== 'true') {
          callback(new Error(result))
        } else {
          callback()
        }
      }
      const checkValidityOfDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择日期'))
        }
        const vlist = [
          {
            method: 'compareWithNow',
            params: [value, true],
            errorMsg: '投保日期需大于当前日期'
          }
        ]
        const result = execCheck(vlist)
        if (result !== 'true') {
          callback(new Error(result))
        } else {
          callback()
        }
      }
      const compareTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择投保日期'))
        }
        const vlist = [
          {
            method: 'isDate',
            params: [value],
            errorMsg: '投保日期格式不正确'
          },
          {
            method: 'compareWithNow',
            params: [value, false],
            errorMsg: '投保日期只能为当前日期以前'
          }
        ]
        const result = execCheck(vlist)
        if (result !== 'true') {
          callback(new Error(result))
        } else {
          // 该校验目的是：校验业务员是否有出单资格，由于业务员出单资格的校验，与投保日期相关，所以当投保日期改变时，要同事校验业务员是否有出单资格
          if (this.agent.agentCode && this.agentFrame.showFlag) {
            this.$refs['agent'].validateField('agentCode')
          }
          callback()
        }
      }

      const compareFirstTrialDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择初审日期'))
        }
        const vlist = [
          {
            method: 'compareWithNow',
            params: [value, false],
            errorMsg: '初审日期只能为当前日期以前'
          }
        ]
        const result = execCheck(vlist)
        if (result !== 'true') {
          callback(new Error(result))
        }
        if (value < this.contData.polApplyDate) {
          return callback(new Error('初审日期必须大于等于投保日期'))
        } else {
          callback()
        }
      }
      // const checkMobile = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('请填写中介销售人员电话'))
      //   }
      //   const vlist = [
      //     {
      //       method: 'regular',
      //       params: [value, 'Mobile'],
      //       errorMsg: '中介销售人员电话填写有误'
      //       // 'TelePhone'
      //     }
      //   ]
      //   const result = execCheck(vlist)
      //   if (result !== 'true') {
      //     callback(new Error(result))
      //   } else {
      //     callback()
      //   }
      // }
      const checkAppntName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写投保人姓名'))
        } else {
          return callback()
        }
      }
      const compareDate = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择出生日期'))
        }
        const vlist = [
          {
            method: 'compareWithNow',
            params: [value, false],
            errorMsg: '出生日期只能为当前日期以前'
          }
        ]
        const result = execCheck(vlist)
        if (result !== 'true') {
          callback(new Error(result))
        } else {
          callback()
        }
      }
      const checkAppntAge = (rule, value, callback) => {
        if (!value) {
          if (!this.appntData.appntBirthday) {
            return callback(new Error('请选择出生日期'))
          } else {
            value = calAge(this.appntData.appntBirthday)
            this.appntData.age = value
          }
        }
        if (value < 0) {
          callback(new Error('年龄必须大于等于0'))
        } else {
          callback()
        }
      }
      const checkInsuredAge = (rule, value, callback) => {
        if (!value) {
          if (!this.insuredData.birthday) {
            return callback(new Error('请选择出生日期'))
          } else {
            value = calAge(this.insuredData.birthday)
            this.insuredData.age = value
          }
        }
        if (value < 0) {
          callback(new Error('年龄必须大于等于0'))
        } else {
          callback()
        }
      }
      const changeInsuredBirthday = (rule, value, callback) => {
        const age = calAge(value)
        this.insuredData.age = age
        var differ = dateDiff(this.insuredData.birthday, this.contData.polApplyDate, 'D') + 1 // 获取天数之差，横琴算法中，投保当天算1天，出生当天算1天，所以需要加1
        if (differ < 7) {
          return callback(new Error('被保险人自出生至投保未满7天'))
        }
        callback()
      }
      const checkIdno = (rule, value, callback) => {
        if (this.appntData.idtype === '') {
          return callback(new Error('请先选择证件类型'))
        }
        if (!value) {
          return callback(new Error('请填写投保人证件号码'))
        }
        // 如果证件类型是身份证和户口本，判断身份证是否填写正确
        if (this.appntData.idtype === '0' || this.appntData.idtype === '4' || this.appntData.idtype === 'C') {
          let idTypeName = ''
          if (this.appntData.idtype === '0') {
            idTypeName = '身份证需为15/18位数字或字母!'
          }
          if (this.appntData.idtype === '4') {
            idTypeName = '户口本需为15/18位数字或字母!'
          }
          if (this.appntData.idtype === 'C') {
            idTypeName = '临时身份证需为15/18位数字或字母!'
          }
          const vlist1 = [
            {
              method: 'isIdCard',
              params: [value],
              errorMsg: idTypeName
            }
          ]
          const result = execCheck(vlist1)
          if (result !== 'true') {
            return callback(new Error(result))
          }
          const idno = this.appntData.idno
          const birthday = getBirthdatByIdNo(idno)
          const birthday2 = this.appntData.appntBirthday
          const vlist2 = [
            {
              method: 'compareTimeIsEqual',
              params: [birthday, birthday2],
              errorMsg: idTypeName + '号码与出生日期不符'
            }
          ]
          const resultBirth = execCheck(vlist2)
          if (resultBirth !== 'true') {
            if (this.appntData.appntBirthday === '' || this.appntData.age === '' || this.appntData.appntSex === '') {
              this.appntData.appntBirthday = birthday
              const age = calAge(birthday)
              this.appntData.age = age
              const sex = getSexByIDNo(idno)
              this.appntData.appntSex = sex
            } else {
              this.$confirm(idTypeName + '号码与出生日期不符，是否自动更改投保人出生日期?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.appntData.appntBirthday = birthday
                const age = calAge(birthday)
                this.appntData.age = age
                const sex = getSexByIDNo(idno)
                if (sex !== this.appntData.appntSex) {
                  this.$confirm(idTypeName + '号码与性别不符，是否自动更改投保人性别?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.appntData.appntSex = sex
                  }).catch(() => {
                    this.appntData.idno = ''
                  })
                }
              }).catch(() => {
                this.appntData.idno = ''
              })
            }
          }
        } else if ((this.appntData.idtype === '2') && (this.appntData.idno.length < 8 || this.appntData.idno.length > 18)) {
          return callback(new Error('军人证号码需为8到18位字符'))
        } else if ((this.appntData.idtype === 'A') && (this.appntData.idno.length < 8 || this.appntData.idno.length > 18)) {
          return callback(new Error('士兵证号码需为8到18位字符'))
        } else if ((this.appntData.idtype === 'D') && (this.appntData.idno.length < 6 || this.appntData.idno.length > 18)) {
          return callback(new Error('警官证号码需为6到18位字符'))
        } else if (this.appntData.idtype === '7' && (!this.appntData.idno.match(/^[A-Z]{1}\d{9}$/))) {
          return callback(new Error('出生证号码有误'))
        } else if (this.appntData.idtype === '1') {
          if (this.appntData.idno.length < 8 || this.appntData.idno.length > 18) {
            return callback(new Error('护照号码需为8-18位字符!'))
          }
          // if (!(this.appntData.idno.match(/^(14|15)\d{7}$/) || this.appntData.idno.match(/^[S|D|G|E]\d{8}$/) || this.appntData.idno.match(/^(P\.|S\.)\d{7}$/))) {
          //   return callback(new Error('护照号码填写有误!'))
          // }
        } else if (this.appntData.idtype === 'F' && (!/^[C]\d{8}$/.test(this.appntData.idno))) {
          return callback(new Error('中国居民来往港澳台通行证号码需为C+8位数字!'))
        } else if (this.appntData.idtype === 'B' && (!this.appntData.idno.match(/^(H|M)\d{8}$/))) {
          return callback(new Error('港澳居民来往大陆通行证需为字母H或M+8位数字'))
        } else if (this.appntData.idtype === 'E' && (!this.appntData.idno.match(/^\d{8}$/))) {
          return callback(new Error('台湾居民来往大陆通行证有误，需为（8位数字）'))
        }
        // else if (this.appntData.idtype === 'G') {
        //   if ((!this.appntData.idno.match(/^810000\d{8}[0-9A-Z]{4}$/)) || (!this.appntData.idno.match(/^820000\d{8}[0-9A-Z]{4}$/))) {
        //     // return callback(new Error('港澳的居住证的证件号码和出生日期不匹配'))
        //     this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
        //     return
        //   }
        // } else if (this.appntData.idtype === 'H') {
        //   if ((!this.appntData.idno.match(/^830000\d{8}[0-9A-Z]{4}$/))) {
        //     this.$message.error('台湾居民居住证的录入格式为830000+出生日期+4位数字或字母')
        //     return
        //   }
        // } else if (this.appntData.idtype === 'I') {
        //   if ((!this.appntData.idno.match(/^[0-9a-zA-Z]{15,18}$/))) {
        //     this.$message.error('外国人居留证号码需为15~18位数字或字母')
        //     return
        //   }
        // }
        return callback()
      }
      const checkInsuredIdno = (rule, value, callback) => {
        if (this.insuredData.idtype === '') {
          return callback(new Error('请先选择证件类型'))
        }
        if (!value) {
          return callback(new Error('请填写被保人证件号码'))
        }

        // 如果证件类型是身份证，判断身份证是否填写正确
        if (this.insuredData.idtype === '0' || this.insuredData.idtype === '4' || this.insuredData.idtype === 'C') {
          let idTypeName = ''
          if (this.appntData.idtype === '0') {
            idTypeName = '身份证需为15/18位数字或字母!'
          }
          if (this.appntData.idtype === '4') {
            idTypeName = '户口本需为15/18位数字或字母!'
          }
          if (this.appntData.idtype === 'C') {
            idTypeName = '临时身份证需为15/18位数字或字母!'
          }
          const vlist1 = [
            {
              method: 'isIdCard',
              params: [value],
              errorMsg: idTypeName
            }
          ]
          const result = execCheck(vlist1)
          if (result !== 'true') {
            return callback(new Error(result))
          }
          const idno = this.insuredData.idno
          const birthday = getBirthdatByIdNo(idno)
          const birthday2 = this.insuredData.birthday
          const vlist2 = [
            {
              method: 'compareTimeIsEqual',
              params: [birthday, birthday2],
              errorMsg: idTypeName + '号码与出生日期不符'
            }
          ]
          const resultBirth = execCheck(vlist2)
          if (resultBirth !== 'true') {
            if (this.insuredData.birthday === '' || this.insuredData.sex === '' || this.insuredData.age === '') {
              this.insuredData.birthday = birthday
              const age = calAge(birthday)
              this.insuredData.age = age
              const sex = getSexByIDNo(idno)
              this.insuredData.sex = sex
            } else {
              this.$confirm(idTypeName + '号码与出生日期不符，是否自动更改被保人出生日期?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.insuredData.birthday = birthday
                const age = calAge(birthday)
                this.insuredData.age = age
                const sex = getSexByIDNo(idno)
                if (sex !== this.insuredData.sex) {
                  this.$confirm(idTypeName + '号码与性别不符，是否自动更改被保人性别?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.insuredData.sex = sex
                  }).catch(() => {
                    this.insuredData.idno = ''
                  })
                }
              }).catch(() => {
                this.insuredData.idno = ''
              })
            }
          }
        } else if ((this.insuredData.idtype === '2') && (this.insuredData.idno.length < 8 || this.insuredData.idno.length > 18)) {
          return callback(new Error('军人证号码需为8到18位字符'))
        } else if ((this.insuredData.idtype === 'A') && (this.insuredData.idno.length < 8 || this.insuredData.idno.length > 18)) {
          return callback(new Error('士兵证号码需为8到18位字符'))
        } else if ((this.insuredData.idtype === 'D') && (this.insuredData.idno.length < 6 || this.insuredData.idno.length > 18)) {
          return callback(new Error('警官证号码需为6到18位字符'))
        } else if (this.insuredData.idtype === '7' && (!this.insuredData.idno.match(/^[A-Z]{1}\d{9}$/))) {
          return callback(new Error('出生证号码有误'))
        } else if (this.insuredData.idtype === '1') {
          if (this.insuredData.idno.length < 8 || this.insuredData.idno.length > 18) {
            return callback(new Error('护照号码需为8-18位字符!'))
          }
          // if (!(this.insuredData.idno.match(/^(14|15)\d{7}$/) || this.insuredData.idno.match(/^[S|D|G|E]\d{8}$/) || this.insuredData.idno.match(/^(P\.|S\.)\d{7}$/))) {
          //   return callback(new Error('护照号码填写有误!'))
          // }
        } else if (this.insuredData.idtype === 'F' && (!/^[C]\d{8}$/.test(this.insuredData.idno))) {
          return callback(new Error('中国居民来往港澳台通行证号码需为C+8位数字!'))
        } else if (this.insuredData.idtype === 'B' && (!this.insuredData.idno.match(/^(H|M)\d{8}$/))) {
          return callback(new Error('港澳居民来往大陆通行证需为字母H或M+8位数字'))
        } else if (this.insuredData.idtype === 'E' && (!this.insuredData.idno.match(/^\d{8}$/))) {
          return callback(new Error('台湾居民来往大陆通行证位数有误，需为8位数字'))
        }
        // else if (this.insuredData.idtype === 'G') {
        //   if ((!this.insuredData.idno.match(/^810000\d{8}[0-9A-Z]{4}$/)) || (!this.insuredData.idno.match(/^820000\d{8}[0-9A-Z]{4}$/))) {
        //     // return callback(new Error('港澳的居住证的证件号码和出生日期不匹配'))
        //     this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
        //     return
        //   }
        // } else if (this.insuredData.idtype === 'H') {
        //   if ((!this.insuredData.idno.match(/^830000\d{8}[0-9A-Z]{4}$/))) {
        //     this.$message.error('台湾居民居住证的录入格式为830000+出生日期+4位数字或字母')
        //     return
        //   }
        // } else if (this.insuredData.idtype === 'I') {
        //   if ((!this.insuredData.idno.match(/^[0-9a-zA-Z]{15,18}$/))) {
        //     this.$message.error('外国人居留证号码需为15~18位数字或字母')
        //     return
        //   }
        // }
        return callback()
      }
      const checkAppntZipCode = (rule, value, callback) => {
        if (this.appntData.lcaddressPojo.zipCode.length !== 6) {
          return callback(new Error('联系地址邮编必须为6位!'))
        }
        if (value) {
          const vlist = [
            {
              method: 'regular',
              params: [value, 'PostCode'],
              errorMsg: '请输入正确的邮政编码'
            }
          ]
          const result = execCheck(vlist)
          if (result === 'true') {
            callback()
          } else {
            callback(new Error(result))
          }
        } else {
          callback()
        }
      }
      const checkinsuredZipCode = (rule, value, callback) => {
        if (this.insuredData.lcaddres.zipCode.length !== 6) {
          return callback(new Error('联系地址邮编必须为6位!'))
        }
        if (value) {
          const vlist = [
            {
              method: 'regular',
              params: [value, 'PostCode'],
              errorMsg: '请输入正确的邮政编码'
            }
          ]
          const result = execCheck(vlist)
          if (result === 'true') {
            callback()
          } else {
            callback(new Error(result))
          }
        } else {
          callback()
        }
      }
      const checkAppntMobile = (rule, value, callback) => {
        if (value) {
          const vlist = [
            {
              method: 'regular',
              params: [value, 'Mobile'],
              errorMsg: '请输入正确的手机号码'
            }
          ]
          const result = execCheck(vlist)
          if (result !== 'true') {
            callback(new Error(result))
          } else {
            callback()
          }
        } else {
          callback()
        }
      }
      const checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请填写被保人姓名'))
        } else {
          return callback()
        }
      }
      const checkContQualification = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请选择代理人编码'))
        }
        const prtNo = this.contData.prtNo
        const polApplyDate = this.contData.polApplyDate
        const params = {
          agentCode: value,
          contNo: prtNo,
          polAppntDate: polApplyDate
        }
        checkQualification(params).then(res => {
          const data = res.data
          if (data && data.code === 0) {
            callback()
          } else {
            if (data.message) {
              callback(new Error(data.message))
            } else {
              callback(new Error('该业务员没有有效的《保险销售从业人员执业证》，不允许出单!'))
            }
          }
        })
      }
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() < 9 ? ('0' + (date.getMonth() + 1)) : (date.getMonth() + 1)
      const day = date.getDate() < 10 ? ('0' + date.getDate()) : date.getDate()
      this.dateStr = year + '-' + month + '-' + day
      return {
        yearIncomes: true, // 币种的判断
        realTimeShowFlag: false, // 是否显示非实时
        agenttype: true, //  判断线上线下
        img: '',
        showSignFlag: false, // 点击签名查询按钮时为true，展示签名
        changeSignFlag: true, //  为true时显示更换签名按钮
        previews: {}, //  签名查询截图数据
        disabledList: true,
        coordinate: {
          picIndex: 1,
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0,
          isCrop: true
        },
        isImageFllow: true,
        isInit: true, // 是否是初始化，初始化完毕后变为false，此字段目的是为了防止合同信息、投保人信息修改置灰功能在初始化时便全部置灰
        dateStr: '',
        subType: '',
        points: {},
        imagesList: [],
        imagesPointList: [],
        contNoRiskFetch: '', // 投保单号传递给险种信息
        required: false,
        datas: true,
        disabled: false,
        // 合同信息begin
        // 合同信息框属性
        cont: {
          showFlag: true,
          changeFlag: true
        },
        isShowManage: true,
        // 代理人信息框
        agentFrame: {
          showFlag: true,
          isDbClicked: false // 是否是代理人编码双击触发
        },
        agent: {
          agentCode: '', //  代理人编码
          agentName: '', //  代理人姓名
          agentGroup: '', // 隐藏字段，和代理人组别有关
          groupName: '', // 代理人组别名称
          manageCom: '', // 代理人所属机构
          codeNames: '',
          branchManager: '',
          introAgency: '',
          agentSeries: '',
          agentGrade: '',
          branchAttr: '',
          ascriptSeries: '',
          idType: '',
          idNo: ''
        },
        // 银行代理人信息框
        ydagent: {
          zjAgentCom: '', //  中介代理机构代码
          zjAgentComName: '', //  中介代理机构名称
          agentCode: '', // 专管人编码
          agentName: '', // 专管人姓名
          branchAttr: '', // 专管人组别
          ydAgentName: '', //  银行销售人员姓名
          ydAgentCode: '', //  银行销售人员代码
          agentGroup: '', // 银行销售人员组别
          agentCom: '', // 代理机构编码
          agentComName: '' // 代理机构名称
        },
        // 银代专管人员列表
        ydzgAgents: [],
        ztagentFrame: {
          showFlag: false
        },
        // 综拓代理人信息框
        ztagent: {
          agentCode: '', // 综拓代理人编码
          agentGroup: '', // 综拓代理人组别
          manageCom: '', // 综拓代理人所属管理机构
          agentName: '', // 综拓代理人姓名
          branchManager: '',
          introAgency: '',
          agentSeries: '',
          agentGrade: '', // 综拓代理人级别
          branchAttr: '',
          ascriptSeries: '',
          groupName: '', // 综拓代理人组别名称
          idType: '',
          idNo: ''
        },
        zjagentFrame: {
          showFlag: false
        },
        ydagentFrame: {
          showFlag: false
        },
        ydzjShowFlag: false,
        issueShowFlag: true, // 出单类型控制中介机构展示
        // 中介代理人信息框
        zjagent: {
          zjAgentCom: '', //  中介机构代码
          zjAgentComName: '', //  中介机构名称
          zjAgentName: '', //  中介销售人员姓名
          zjAgentCode: '', //  中介销售人员代码
          mobile: '' //  中介销售人员电话
        },
        // 项目经理信息框
        managerFrame: {
          showFlag: false
        },
        manager: {
          managerInfos: []
        },
        /* otherAgentFrame: {
          isDbClicked: false, // 是否是该文本框内双击触发
          showFlag: false
        },*/
        // 其他业务员信息框
        /* otherAgent: {
          clickRowNo: '', // 双击选择的行数
          otherAgentInfos: [
            {
              agentCode: '', // 信息内容同代理人信息
              agentGroup: '',
              manageCom: '',
              agentName: '',
              branchManager: '',
              introAgency: '',
              agentSeries: '',
              agentGrade: '',
              branchAttr: '',
              ascriptSeries: '',
              groupName: '',
              idType: '',
              idNo: ''
            }
          ]
        },*/
        // 代理人查询框
        agentCodeQuery: {
          showFlag: false
        },
        // 综拓代理人查询框
        ztAgentCodeQuery: {
          showFlag: false
        },
        // 客户信息查询框
        customerQuery: {
          showFlag: false,
          queryFrom: ''
        },
        // 中介机构查询框
        zjAgentComQuery: {
          showFlag: false
        },
        // 银行代理机构查询框
        ydAgentComQuery: {
          showFlag: false
        },
        // 合同信息表单
        contData: {
          prtNo: '', //  投保单号
          polApplyDate: '', // 投保日期
          manageCom: '', //  管理机构
          saleChnl: '', //  一级销售渠道
          sellType: '', //  二级销售渠道
          performanceType: '', // 业绩归属
          makeType: '', // 出单类型
          signName: '', //  初审员签名
          firstTrialDate: '', //  初审日期
          appLinkedOrNot: '02', //  是否关联投保单
          relationNo: '', //  关联投保单号
          isDoubleRecords: '否', // 是否双录保单
          doubleRecordOrNot: '02', //  是否已双录
          remark: '', //  备注
          cvaliDate: '', //  生效日期
          disputedFlag: '', // 合同争议处理方式
          arbitrationCom: '', // 仲裁机构
          mobile: '',
          realTime: '', //  是否非实时
          currency: '01' // 币种
        },
        currency: [], // 币种
        contRules: {
          prtNo: [
            { required: true, message: '投保单号不能为空', trigger: 'change' }
          ],
          polApplyDate: [
            { required: true, message: '请选择投保日期', trigger: 'change' },
            { validator: compareTime, trigger: 'change' }
          ],
          saleChnl: [
            { required: true, message: '请选择一级销售渠道', trigger: 'change' }
          ],
          sellType: [
            { required: true, message: '请选择二级销售渠道', trigger: 'change' }
          ],
          manageCom: [
            { required: true, message: '请选择管理机构', trigger: 'change' }
          ],
          signName: [
            { required: true, message: '请填写初审员签名', trigger: 'blur' }
          ],
          firstTrialDate: [
            { required: true, message: '请选择初审日期', trigger: 'change' },
            { validator: checkDate, trigger: 'change' },
            { validator: compareFirstTrialDate, trigger: 'change' }
          ],
          doubleRecordOrNot: [
            { required: true, message: '请选择是否已双录', trigger: 'change' }
          ],
          relationNo: [
            { required: false, message: '请填写关联投保单号', trigger: ['change', 'blur'] },
            { validator: required, trigger: 'change' },
            { min: 15, max: 15, message: '长度必须是15位', trigger: 'blur' }
          ],
          realTime: [
            { required: true, message: '请选择是否非实时', trigger: ['blur', 'change'] }
          ]
        },
        agentRules: {
          agentCode: [
            { required: true, message: '请填写代理人编码', trigger: 'blur' },
            { validator: checkContQualification, trigger: 'change' }
          ]
        },
        ztagentRules: {
          agentCode: [
            { required: true, message: '请填写综拓代理人编码', trigger: 'change' }
          ]
        },
        ydagents: {
          agentCode: [
            { required: true, message: '请填写银行专管员', trigger: ['blur', 'change'] }
          ],
          agentCom: [
            { required: true, message: '请填写代理机构', trigger: ['blur', 'change'] }
          ],
          ydAgentCode: [
            { required: false, message: '请填写银行销售员代码', trigger: 'blur' }
          ],
          ydAgentName: [
            { required: false, message: '请填写银行销售员姓名', trigger: 'blur' }
          ],
          zjAgentCom: [
            { required: false, message: '请填写中介机构', trigger: ['blur', 'change'] }
          ]
        },
        zjagentRules: {
          zjAgentName: [
            { required: true, message: '请填写中介销售人员姓名', trigger: 'blur' },
            { min: 1, max: 20, message: '最长20个字符', trigger: 'blur' }
          ],
          zjAgentCom: [
            { required: true, message: '请填写中介机构编码', trigger: 'blur' }
          ],
          zjAgentComName: [
            { required: true, message: '请填写中介机构名称', trigger: 'blur' }
          ]
        },
        saleChnlList: [], //  一级销售渠道
        sellTypeList: [], // 二级销售渠道
        makeTypeList: [
          { code: '1', codeName: '专业代理模式' },
          { code: '3', codeName: '无代理模式' }
        ], // 出单类型
        // 是否关联保单
        appLinked: [{
          code: '01',
          codeName: '是'
        }, {
          code: '02',
          codeName: '否'
        }],
        // 是否双录
        doubleInputed: [{
          code: '01',
          codeName: '是'
        }, {
          code: '02',
          codeName: '否'
        }],
        // 是否双录
        gender: [
          {
            code: '0',
            codeName: '男'
          },
          {
            code: '1',
            codeName: '女'
          }
          // {
          // code: '2',
          // codeName: '不详'
          // }
        ],
        realTimeList: [{
          code: '0',
          codeName: '否'
        }, {
          code: '1',
          codeName: '是'
        }],
        // 收入来源下拉框数据
        salarySource: [],
        // 系被保人的下拉框数据
        relation: [],
        // 国籍下拉框
        nativeplace: [],
        appntNativePlace: [], // 投保人国籍
        insuredNativePlace: [], // 被保人国籍
        // 是否拥有公费医疗、社会医疗保险下拉框数据
        socisalFlag: [{
          code: '0',
          codeName: '否'
        }, {
          code: '1',
          codeName: '是'
        }],
        // 合同争议处理方式下拉框数据
        disputedFlag: [],
        // 合同信息end
        // 投保人信息begin
        // 投保人信息框属性
        appnt: {
          showFlag: false,
          changeFlag: false
        },
        // 职业查询框
        occupationQuery: {
          showFlag: false,
          queryFrom: '',
          bnfNo: ''
        },
        // 职业查询组件属性：初始化参数
        occupationInitParam: {
          occupationType: '1', // 职业类别
          occupationLevel: '一级', // 职业级别
          occupationCode: '1010001', // 职业编码
          occupationName: '中国共产党中央委员会和地方各级党组织负责人' // 职业名称
        },
        // 纳税身份框
        individualTaxation: {
          showFlag: true,
          shapIndividualTaxation: '-'
        },
        // 纳税身份为非仅为中国税收居民时，详细内容显示form
        individualTaxation1: {
          showFlag: false
        },
        // 交费信息
        account: {
          showFlag: true,
          shapeAccount: '-'
        },
        // 投保人信息表单数据
        appntData: {
          appntNo: '', // 投保人客户号
          appntName: '', // 投保人姓名
          appntSex: '', // 投保人性别
          appntBirthday: '', // 投保人出生日期
          age: '', // 投保人年龄
          idtype: '', // 投保人证件类型
          idno: '', // 投保人证件号码
          idExpDates: '',
          idexpDate: '', // 投保人证件有效期
          stature: '', // 身高
          avoirdupois: '', // 体重
          specialPopFlag: '0', // 特殊人群标识
          nativePlace: '', // 投保人国籍
          denType: '', // 居民类型
          lcaddressPojo: {
            postalAddress: '', // 投保人联系地址
            zipCode: '', // 投保人邮政编码
            phone: '', // 投保人固定电话
            mobile: '', // 投保人手机
            grpName: '', // 工作单位
            email: '', // 投保人邮件地址
            preferredPhoneNum: '' // 投保人首选联系电话
          },
          occupationCode: '', // 投保人职业编码
          occupationType: '', // 投保人职业级别编码
          occupationLevel: '', // 投保人职业级别名称
          occupationName: '', // 投保人职业名称
          yearIncome: '', // 年收入
          incomeSource: '', // 投保人收入来源
          // relationToInsured: '', // 投保人与被保人关系：是被保人**
          socialInsuFlag: '', // 投保人社保信息
          affirmInputFlag: '', // 确认栏是否录入
          currency: '' // 币种
        },
        appntDataRules: {
          appntName: [
            { required: true, message: '请填写投保人姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '投保人姓名长度不得少于2个中文字符', trigger: 'blur' },
            { validator: checkAppntName, trigger: 'blur' }
          ],
          appntSex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          appntBirthday: [
            { required: true, message: '请选择出生日期', trigger: 'change' },
            { validator: checkDate, trigger: 'change' },
            { validator: compareDate, trigger: 'change' }
          ],
          age: [
            { required: true, message: '请选择出生日期', trigger: 'change' },
            { type: 'number', message: '年龄必须为数字值' },
            { validator: checkAppntAge, trigger: 'change' }
          ],
          idtype: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          idno: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            { validator: checkIdno, trigger: 'blur' }
          ],
          idExpDates: [
            { required: true, message: '请填写证件有效期至', trigger: 'change' }
          ],
          idexpDate: [
            { required: true, message: '请填写证件有效期至', trigger: 'change' },
            { validator: checkDate, trigger: 'change' },
            { validator: checkValidityOfDate, trigger: 'change' }
          ],
          stature: [
            { required: false, message: '请填写身高', trigger: 'blur' }
          ],
          avoirdupois: [
            { required: false, message: '请填写体重', trigger: 'blur' }
          ],
          denType: [
            { required: true, message: '请填写居民类型', trigger: 'change' }
          ],
          nativePlace: [
            { required: true, message: '请选择国籍', trigger: 'change' }
          ],
          'lcaddressPojo.email': [
            { required: false, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
            { min: 2, max: 40, message: '长度需小于等于40', trigger: 'blur' }
          ],
          'lcaddressPojo.zipCode': [
            { required: true, message: '请填写邮政编码', trigger: 'blur' },
            { validator: checkAppntZipCode, trigger: 'blur' }
          ],
          'lcaddressPojo.grpName': [
            { required: false, message: '请填写工作单位', trigger: 'blur' }
          ],
          'lcaddressPojo.preferredPhoneNum': [
            { required: true, message: '请选择联系电话', trigger: 'change' }
          ],
          'lcaddressPojo.phone': [
            { required: false, message: '请填写固话', trigger: 'blur' },
            { min: 10, max: 14, message: '固话长度是10-14位，请确认！', trigger: 'blur' }
          ],
          'lcaddressPojo.mobile': [
            { required: false, message: '请填写手机号', trigger: 'blur' },
            { validator: checkAppntMobile, trigger: 'blur' }
          ],
          'lcaddressPojo.postalAddress': [
            { required: true, message: '请填写联系地址', trigger: 'blur' },
            { min: 9, max: 50, message: '联系地址至少9个中文字符！', trigger: 'blur' }
          ],
          yearIncome: [
            { required: false, message: '请填写年收入' },
            { pattern: /^[0-9]*$/, message: '年收入必须为数字值', trigger: 'blur' }
          ],
          occupationType: [
            { required: true, message: '请录入职业编码', trigger: ['change', 'blur'] }
          ],
          occupationCode: [
            { required: true, message: '请录入职业类别', trigger: ['change', 'blur'] }
          ]
          // relationToInsured: [ // 该字段已去掉
          //   { required: true, message: '请选择投被保人关系', trigger: 'change' }
          // ]
        },
        // 税收信息表单数据
        individualTaxationData: {
          birthAddress: '', // 出生地址-中文（详细地址）
          birthAddress2: '', // 出生地址-英文（详细地址）
          birthCity: '', // 出生地址-中文（市）
          birthCity2: '', // 出生地址-英文或拼音（市）
          birthCountry: '', // 出生地址-中文（国家）
          birthCountry2: '', // 出生地址-英文或拼音（国家）
          birthProvince: '', // 出生地址-中文（省）
          birthProvince2: '', // 出生地址-英文或拼音（省）
          birthday: '', // 出生日期
          firstName: '', // 姓
          lastName: '', // 名
          nowAddress: '', // 现居住地址-中文（详细地址）
          nowAddress2: '', // 现居住地址-英文或拼音（详细地址）
          nowCity: '', // 现居住地址-中文（市）
          nowCity2: '', // 现居住地址-英文或拼音（市）
          nowCountry: '', // 现居住地址-中文（国家）
          nowCountry2: '', // 现居住地址-英文或拼音（国家）
          nowProvince: '', // 现居住地址-中文（省）
          nowProvince2: '', // 现居住地址-英文或拼音（省）
          reason: '', // 详细原因
          reasonCode: '', // 不能提供居民国（地区）纳税人识别号原因
          taxResident: '', // 税收居民国（地区）
          taxResident2: '', // 税收居民国（地区）
          taxpayerNo: '', // 纳税人识别号1
          taxpayerNo2: '', // 纳税人识别号2
          taxpayerType: '' // 纳税人身份
        },
        individualData: {
          taxpayerType: [
            { required: true, message: '纳税身份不能为空', trigger: ['change', 'blur'] }
          ]
        },
        accountData: {
          newPayMode: '', // 首期交费形式
          privateOrPublicSigns: '1', // 公私标志
          autoPayFlag: '', // 自动垫交标志
          newBankCode: '', // 首期银行
          newAccName: '', // 首期账户名称
          newBankAccNo: '', // 首期账户号码
          payMode: '', // 续期/续保交费方式
          bankCode: '', // 续期/续保银行
          bankProivnce: '', // 续期/续保银行所在省份
          accName: '', // 续期/续保账户名称
          bankAccNo: '', // 续期/续保账户号码
          destAccountDate: '', // 指定交费日期
          payAccountChecked: false // 是否和首期保持一致
        },
        accountDataRules: {
          newPayMode: [
            { required: true, message: '请选择首期交费形式', trigger: 'change' }
          ],
          newAccName: [
            { required: true, message: '请填写首期账户姓名', trigger: 'change' },
            { min: 1, max: 20, message: '最长是20位', trigger: 'blur' }
          ],
          newBankAccNo: [
            { required: true, message: '请填写首期账号', trigger: 'change' },
            { min: 1, max: 25, message: '最长是25位', trigger: 'change' }
          ],
          bankAccNo: [
            { min: 1, max: 25, message: '最长是25位', trigger: 'blur' },
            { required: true, message: '请输入续期/续保账号', trigger: 'change' }
          ],
          newBankCode: [
            { required: true, message: '请选择首期转账开户行', trigger: 'change' }
          ],
          payMode: [
            { required: false, message: '请选择续期/续保交费形式', trigger: 'change' }
          ],
          bankCode: [
            { required: true, message: '请选择续期/续保转账开户行', trigger: 'change' }
          ],
          privateOrPublicSigns: [
            { required: true, message: '请填写公私标志', trigger: 'change' }
          ]
        },
        // 证件类型输入框
        idType: [],
        // 是否特殊人群录入框
        specialPopFlag: [{
          code: '0',
          codeName: '否'
        }, {
          code: '1',
          codeName: '是'
        }],
        // 联系方式录入框
        preferredPhoneNum: [],
        // preferredPhoneNum: [{
        //   code: '0',
        //   codeName: '固定电话'
        // }, {
        //   code: '2',
        //   codeName: '手机'
        // }],
        // 是否确认录入框
        affirmInputFlag: [{
          code: '0',
          codeName: '否'
        }, {
          code: '1',
          codeName: '是'
        }],
        // 纳税身份下拉框数据
        taxpayerType: [],
        // 不能提供居民国（地区）纳税人识别号原因下拉框
        reasonCode: [],
        // 首期缴费形式下拉框
        newPayMode: [],
        // 首期交费银行列表
        bankCode: [],
        // 续期/续保缴费形式下拉框
        payMode: [],
        // 开户所在身份下拉框
        province: [],
        // 自动垫交标志
        autoPayFlag: [],
        // 公私标识下拉框
        privateOrPublicSigns: [],
        // 投保人信息end
        // 被保险人信息begin
        // 被保人信息框属性
        insured: {
          showFlag: false,
          changeFlag: false
        },
        orgBnf: {
          shapeOrgBnf: '-',
          showOrgBnfFlag: true
        },
        lcpol: {
          shapeLcpol: '-',
          showLcpolFlag: true
        },
        // 被保险人信息页签最下方两个按钮显示控制
        insuredSaveBtn: {
          modifyBtnShowFlag: false,
          addBtnShowFlag: true
        },
        // 被保险人列表，操作列按钮显示控制
        insuredBtnController: [],
        // this.insuredBtnController[i].addBtnShowFlag = false addBtnShowFlag=true,即列表未被编辑，代表现在是在添加被保人
        // this.insuredBtnController[i].modifyBtnShowFlag = true modifyBtnShowFlag=true,即列表被编辑中，代表现在是在修改被保人
        lcpolSelectNo: '',
        // 页面上多被保人集合 即下列insuredDate的集合
        insuredDatas: [],
        // 页面上多被保人被选中的行数
        insuredSelectNo: '',
        // 页面上被保人显示信息 对应表单内容 为了统一维护，请参照setDefaultInsured方法。后续需要加属性，请放setDefaultInsured方法中添加，同时此处做维护，以便后面的开发同学
        insuredData: {
          // sequenceNo: '', // 客户内部编号
          // relationToAppnt: '', // 与投保人关系   投保人是被保险人的
          // insuredNo: '', // 被保险人客户号
          // name: '', // 被保险人姓名
          // sex: '', // 被保险人性别
          // birthday: '', // 被保险人出生日期
          // age: '', // 被保险人年龄
          // idtype: '', // 被保险人证件类型
          // idno: '', // 被保险人证件号码
          // idexpDate: '', // 被保险人证件有效期
          // stature: '', // 被保险人身高
          // avoirdupois: '', // 被保险人体重
          // specialPopFlag: '', // 是否为特殊人群
          // nativePlace: 'CHN', // 被保险人国籍
          // occupationCode: '', // 被保险人职业编码
          // occupationType: '', // 被保险人职业级别编码
          // occupationLevel: '', // 被保险人职业级别名称
          // occupationCodeName: '', // 被保险人职业名称
          // yearIncome: '', // 被保险人年收入
          // incomeSource: '', // 被保险人收入来源
          // socialInsuFlag: '', // 被保险人社保信息
          // lcaddres: {
          //   postalAddress: '', // 被保险人联系地址
          //   zipCode: '', // 被保险人邮政编码
          //   phone: '', // 被保险人固定电话
          //   mobile: '', // 被保险人手机
          //   grpName: '', // 被保险人工作单位
          //   preferredPhoneNum: '', // 被保险人首选联系电话
          //   email: '' // 被保险人邮件地址
          // },
          // orgBnfs: [
          //   {
          //   bnfGrade: '', // 受益顺位
          //   bnfLot: '', // 受益比例
          //   bnfNo: '', // 序号
          //   bnfType: '', // 受益人类别
          //   name: '', // 金融机构名称
          //   remark: '' // 前面投保没有记录受益人形态，这里暂时用remark记录
          // }
          // ], // 机构受益人信息
          // lcBnfs: [
          //   {
          //   bnfNo: '', // 序号
          //   bnfType: '', // 受益类型
          //   name: '', // 姓名
          //   sex: '', // 性别
          //   birthday: '', // 出生日期
          //   idtype: '', // 证件类型
          //   idno: '', // 证件号码
          //   relationToInsured: '', // 与被保人关系
          //   bnfGrade: '', // 受益顺序
          //   bnfLot: '', // 受益份额
          //   idexpDate: '', // 证件有效期
          //   customerType: '', // 客户类型[投保人 or 被保人]
          //   nativePlace: '', // 国籍
          //   grpName: '', // 工作单位
          //   ContactAddress: '', // 联系地址
          //   ContactPhone: '', // 联系电话
          //   occupationCode: '', // 职业编码
          //   occupationName: '' // 职业
          // }
          // ], // 受益人信息
          // 险种信息
          // lcpols: []
        },
        iLIdTypeNativePlace: [], // 受益人所对应的国籍的选择列表
        insuredDataRules: {
          sequenceNo: [
            { required: true, message: '请填写被保险人顺位', trigger: 'change' }
          ],
          relationToAppnt: [
            { required: true, message: '请填写投保人是被保险人的', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请填写被保人姓名', trigger: 'blur' },
            { min: 2, max: 20, message: '被保人姓名长度不得少于2个中文字符', trigger: 'blur' },
            { validator: checkName, trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          birthday: [
            { required: true, message: '请选择出生日期', trigger: 'change' },
            { validator: checkDate, trigger: 'change' },
            { validator: compareDate, trigger: 'change' },
            { validator: changeInsuredBirthday, trigger: 'change' }
          ],
          age: [
            { required: true, message: '请选择出生日期', trigger: 'change' },
            { type: 'number', message: '年龄必须为数字值' },
            { validator: checkInsuredAge, trigger: 'change' }
          ],
          idtype: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          idno: [
            { required: true, message: '请填写证件号码', trigger: 'blur' },
            { validator: checkInsuredIdno, trigger: ['blur', 'change'] }
          ],
          idExpDates: [
            { required: true, message: '请填写证件有效期至', trigger: 'change' }
          ],
          idexpDate: [
            { required: true, message: '请填写证件有效期至', trigger: 'change' },
            { validator: checkDate, trigger: 'change' },
            { validator: checkValidityOfDate, trigger: 'change' }
          ],
          stature: [
            { required: true, message: '请填写身高', trigger: 'change' }
          ],
          avoirdupois: [
            { required: true, message: '请填写体重', trigger: 'change' }
          ],
          nativePlace: [
            { required: true, message: '请选择国籍', trigger: 'blur' }
          ],
          'lcaddres.email': [
            { required: false, message: '请填写邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
            { min: 2, max: 40, message: '长度需小于等于40', trigger: 'blur' }
          ],
          denType: [
            { required: true, message: '请填写居民类型', trigger: 'blur' }
          ],
          'lcaddres.postalAddress': [
            { required: true, message: '请填写联系地址', trigger: 'change' },
            { min: 9, max: 50, message: '联系地址至少9个中文字符！', trigger: 'blur' }
          ],
          'lcaddres.zipCode': [
            { required: true, message: '请填写邮政编码', trigger: 'blur' },
            { validator: checkinsuredZipCode, trigger: 'blur' }
          ],
          'lcaddres.phone': [
            { required: false, message: '请填写固话', trigger: 'blur' },
            { min: 10, max: 14, message: '录入固话长度不为10-14位，请确认！', trigger: 'blur' }
          ],
          'lcaddres.mobile': [
            { required: false, message: '请填写手机号', trigger: 'blur' },
            { validator: checkAppntMobile, trigger: 'blur' }
          ],
          occupationType: [
            { required: true, message: '请录入职业编码', trigger: 'change' }
          ],
          occupationCode: [
            { required: true, message: '请录入职业类别', trigger: 'change' }
          ]
        },
        // 被保险人内部客户号下拉框内容
        sequenceNo: [],
        // 机构受益人形态下拉框
        orgBnfType: [{
          code: '1',
          codeName: '机构受益人'
        }],
        // 受益人类型下拉框
        bnfType: [],
        // 受益顺位下拉框
        bnfGrade: [],
        // 受益人速填下拉框
        customerType: [],
        // 被保险人信息end
        // 险种信息框属性
        // product: {
        //   showFlag: false,
        //   changeFlag: false
        // },
        proposalInput: {
          showFlag: false
        },
        proposalInputInitParams: {
          riskName: '',
          riskCode: '',
          lcinsured: {},
          lcpol: {},
          mainRiskCode: '',
          mainRiskLcpol: {}, // 添加附加险时的主险信息
          insuredData: {}, // 被保人信息
          appntData: {}, // 投保人信息
          lcCont: {}, // 合同信息
          activityID: ''
        },
        // 添加险种时，保费试算校验,以及子组件对应的参数
        proposalPojo: {
          lcPolPojo: {},
          lcInsuredPojo: {},
          lcContPojo: {},
          lcAppntPojo: {}
        },
        // 与后端交易投保对象，属性名称必须与上述表单数据保持一致、也必须与后台json内容保持一致
        applyPojo: {
          id: '', // 唯一主键
          contNo: '', // 合同号
          missionID: '', // 工作流id
          subMissionID: '',
          activityID: '', // 工作流
          // 合同信息节点begin-
          lcCont: { // 合同信息
            appLinkedOrNot: '', // 是否关联投保单
            firstTrialDate: '', // 初审日期
            manageCom: '', // 管理机构
            polApplyDate: '', // 申请（投保）日期
            prtNo: '', // 投保单号
            relationNo: '', // 关联投保单号
            remark: '', // 备注
            saleChnl: '', // 一级销售渠道
            sellType: '', // 二级销售渠道
            signName: '', // 初审人签名
            isDoubleRecords: '', // 是否双录保单
            doubleRecordOrNot: '', //  是否已双录
            // 缴费信息节点begin-
            newPayMode: '',
            privateOrPublicSigns: '',
            autoPayFlag: '',
            newBankCode: '',
            newAccName: '',
            newBankAccNo: '',
            payMode: '',
            bankCode: '',
            bankProivnce: '',
            accName: '',
            bankAccNo: '',
            destAccountDate: '',
            // 缴费信息节点end-
            disputedFlag: '', // 合同争议处理方式
            arbitrationCom: '', // 仲裁机构
            agentType: '',
            currency: '' // 币种
          },
          agentImpartList: [], // 代理人告知信息
          agencyQueryResultList: [], // 项目经理信息
          // otherAgents: [], // 其他业务员信息
          ztAgentPojo: {}, // 综拓代理人信息
          zjAgentPojo: {}, // 中介代理人信息
          mainAgentPojo: {}, // 主业务员信息（代理人信息）
          ydAgentPojo: {}, // 银行代理人信息
          // 合同信息节点end-
          // 投保人信息节点begin-
          lcAppnt: { // 投保人信息
            appntNo: '',
            appntName: '',
            appntSex: '',
            appntBirthday: '',
            age: '',
            idtype: '',
            idno: '',
            idexpDate: '',
            stature: '', // 身高
            avoirdupois: '', // 体重
            specialPopFlag: '0', // 特殊人群标识
            nativePlace: '',
            occupationCode: '',
            occupationType: '',
            yearIncome: '', // 年收入
            incomeSource: '',
            relationToInsured: '',
            socialInsuFlag: '',
            denType: '', // 居民类型
            currency: '', // 币种
            lcaddressPojo: {
              zipCode: '',
              email: '',
              mobile: '',
              phone: '',
              postalAddress: '',
              preferredPhoneNum: '',
              grpName: '' // 工作单位
            }
          },
          lcIndividualTaxationPojo: { // 投保人税收信息
            birthAddress: '',
            birthAddress2: '',
            birthCity: '',
            birthCity2: '',
            birthCountry: '',
            birthCountry2: '',
            birthProvince: '',
            birthProvince2: '',
            birthday: '',
            firstName: '',
            lastName: '',
            nowAddress: '',
            nowAddress2: '',
            nowCity: '',
            nowCity2: '',
            nowCountry: '',
            nowCountry2: '',
            nowProvince: '',
            nowProvince2: '',
            reason: '',
            reasonCode: '',
            taxResident: '',
            taxResident2: '',
            taxpayerNo: '',
            taxpayerNo2: '',
            taxpayerType: ''
          },
          appntImpartList: [], // 投保人告知信息
          insuredImpartList: [], // 被保人告知信息
          // 投保人信息节点end-
          // 被保人信息节点begin-
          lcInsuredList: [],
          // 被保人信息节点end-
          // 投保步骤，初始化页面为合同页，合同页面保存后，下次初始化应该在投保人信息页面，依次类推
          applyStep: ''
        },
        datalist: [
          {
            code: '长期'
          },
          {
            code: '短期'
          }
        ],
        // 公共常量
        // 对应后台CONT_INPUT_STEP_CONT
        contInputStepCont: '1001',
        // 对应后台CONT_INPUT_STEP_APPNT
        contInputStepAppnt: '1002',
        // 对应后台CONT_INPUT_STEP_INSURED
        contInputStepInsured: '1003',
        // 对应后台CONT_INPUT_STEP_COMFIRM
        contInputStepComfirm: '1005',
        // 新单录入页面跳转过来的参数
        prtNo: '', // 保单号
        state: '', // 保单状态
        operator: '', // 操作人
        activityID: '', // 工作流活动id
        isSequenceNo: false,
        mainRiskCode: '',
        riskMap: {},
        polNo: '', // 编辑主险
        loading: false,
        manageCom: '',
        denType: [], // 居民类型
        borrowerAccidentInsurance: ['15110'], // 借款人意外险集合，用于险种的校验，当险种是借款人意外险时，需要校验受益人类别信息
        bankRequired: false,
        denTypeShow: false, // 居民类型控制
        idTypeAll: [], // 所有的证件类型
        oldNativePlace: '', // 记录当前的国籍
        testing: '',
        insuredInformation: { // 被保人五要素
          name: '',
          sex: '',
          age: '',
          birthday: '',
          idNo: ''
        },
        loadFlag: '',
        occupationTypes: [], // 通过编码获取职业数据
        itemManagerName: '', // 项目经理姓名
        pickerOptions: {
          disabledDate: (time) => {
            return time.getTime() < Date.now()
          }
        },
        disabledDate: false,
        scanFlag: '' // 标志位，标注页面从哪里跳转而来，1：新单录入，0：无扫描录入
      }
    },
    created() {
      this.contData.prtNo = this.$route.query.prtNo ? this.$route.query.prtNo : ''
      this.scanFlag = this.$route.query.scanFlag
      this.subType = this.$route.query.subType ? this.$route.query.subType : ''
      this.contNoRiskFetch = this.contData.prtNo
      if (this.$route.query.polApplyDate) {
        this.contData.polApplyDate = this.$route.query.polApplyDate
      }
      this.contData.manageCom = this.$route.query.manageCom ? this.$route.query.manageCom : ''
      // this.prtNo: this.$route.query.prtNo
      this.state = this.$route.query.state
      this.operator = this.$route.query.operator
      this.activityID = this.$route.query.activityID
      this.oldNativePlace = this.appntData.nativePlace
      this.loadFlag = this.$route.query.loadFlag
      if (this.loadFlag === '3') {
        this.loadFlag = 3
      } else {
        this.loadFlag = 1
      }
      this.initCont()
      this.getOccupationtype() // 通过编码获取职业数据
    },
    methods: {
      // 截图上传
      screenShotUpload() {
        console.log('截图上传')
        this.$refs.imageFollow.$refs.cropper.getCropBlob((data) => {
          // do something
          console.log(data)
          const blobURL = URL.createObjectURL(data)
          this.img = blobURL
        })
      },
      realTime(obj) {
        this.previews = obj
      },
      infoFollowImage(name) {
        this.followImage(name)
      },
      // 获取影像随动的图片
      getScanImg() {
        const jsonData = {
          bussNoType: '11',
          bussType: 'TB',
          queryType: '3',
          bussNo: this.contData.prtNo,
          subType: this.subType // 单证类型，需要从新单录入带值
        }
        new Promise((resolve, reject) => {
          getScan(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              if (data.body) {
                this.imagesList = data.body
              } else {
                this.imagesList = []
              }
            } else {
              this.imagesList = []
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 获取影像随动，坐标数据
      getScanImgData() {
        new Promise((resolve, reject) => {
          getScanImageData(this.subType).then(response => {
            const data = response.data
            if (data.code === 0) {
              if (data.body) {
                this.imagesPointList = data.body
                for (let i = 0; i < this.imagesPointList.length; i++) {
                  const point = this.imagesPointList[i]
                  const objCode = point.objCode
                  this.points[objCode] = point
                }
              } else {
                this.imagesPointList = []
              }
            } else {
              this.imagesPointList = []
            }
            console.log('imageData', data)
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 合同信息tab页中的method -------begin
      /**
       * 获取一级销售渠道
       */
      getSaleChnl() {
        const jsonData = {
          codeType: 'salechnl'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const saleChnlList = data.body
              const saleChnlListData = saleChnlList.filter((v) => {
                return v.codeName !== null && v.codeName.length !== 0
              })
              const subTypes = this.subType.substring(0, 6)
              if (subTypes === '111011' || subTypes === '111012') {
                const saleChnlLists = saleChnlListData.filter(function(item) {
                  return (item.code !== '03')
                })
                this.saleChnlList = saleChnlLists
                return
              }
              if (subTypes === '211011') {
                const saleChnlLists = saleChnlListData.filter(function(item) {
                  return (item.code !== '02')
                })
                this.saleChnlList = saleChnlLists
                return
              }
              this.saleChnlList = saleChnlListData
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 获取二级销售渠道
       */
      getSellType(saleChn) {
        const jsonData = {
          codeType: 'SellType',
          code: saleChn
        }
        new Promise((resolve, reject) => {
          getSecondaryCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const sellTypeList = data.body
              this.sellTypeList = sellTypeList
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 币种下拉框
      currencyFun() { // 获取币种
        new Promise((resolve, reject) => {
          currency().then(response => {
            const data = response.data
            // console.log('币种信息', data)
            if (data.code === 0) {
              const currency = data.body
              this.currency = currency
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 返回设置代理人信息
       */
      setAgentinfo(agentQueryResult) {
        console.log(agentQueryResult)
        if (agentQueryResult) {
          const queryResult = agentQueryResult.agentQueryResult
          console.log(queryResult, 'queryResultqueryResultqueryResultqueryResultqueryResult')
          // 当双击代理人编码框时
          if (this.agentFrame.isDbClicked) {
            // 代理人信息
            this.agent = queryResult
            this.agentFrame.showFlag = true
            // Object.assign(this.agent, queryResult)
            // 管理机构信息
            this.contData.manageCom = queryResult.manageCom
            this.manageCom = queryResult.manageCom
          }
          /**
           * 当双击其他业务员信息框时
           */
          // if (this.otherAgentFrame.isDbClicked) {
          //   this.otherAgent.otherAgentInfos = [queryResult]
          // }
        }
        const jsonData = {
          manageCom: agentQueryResult.agentQueryResult.manageCom,
          branchType: agentQueryResult.agentQueryResult.branchType,
          saleChnl: this.contData.saleChnl + this.contData.sellType
        }
        queryGradeBelong(jsonData).then(response => {
          const data = response.data
          if (data.code === 0) {
            this.contData.performanceType = data.body
          } else {
            this.$message.error(data.message)
          }
        })
        this.agentCodeQuery.showFlag = false
      },
      changeCode(val) {
        console.log(val)
        this.agent.codeNames = val.split('-')[1]
      },
      /**
       * 居民类型
       **/
      getDenType() {
        const jsonData = {
          codeType: 'dentype'
        }
        return new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const denType = data.body
              this.denType = denType
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 返回设置中介机构信息
       */
      setYdAgentCominfo(queryResult) {
        if (queryResult) {
          const agentCom = queryResult.agentCom
          const saleChnl = this.contData.saleChnl
          if (agentCom) {
            this.ydagent.agentCom = agentCom.agentCom
            this.ydagent.agentComName = agentCom.agentComName
            // 管理机构信息
            this.contData.manageCom = agentCom.manageCom
            this.manageCom = agentCom.manageCom
            // 设置专管人员列表数据
            queryBankAgent(agentCom.agentCom, saleChnl).then(response => {
              const resData = response.data
              if (resData.code === 0 && resData.body) {
                this.ydzgAgents = resData.body
                this.ydagent.agentCode = resData.body[0].agentCode
                this.ydagent.agentName = resData.body[0].agentName
                console.log(resData.body)
                this.selectYdAgent(resData.body[0].agentCode)
                this.bankRequired = true
                /* const jsonData = {
                  manageCom: this.ydzgAgents[0].manageCom,
                  branchType: this.ydzgAgents[0].branchType,
                  saleChnl: this.contData.saleChnl + this.contData.sellType
                }
                queryGradeBelong(jsonData).then(response => {
                  const data = response.data
                  if (data.code === 0) {
                    this.contData.performanceType = data.body
                  } else {
                    this.$message.error(data.message)
                  }
                })*/
              } else {
                this.ydagent.agentCode = ''
                this.ydagent.branchAttr = ''
                this.ydagent.agentName = ''
                this.$message.error(resData.message)
              }
            })
          }
        }
        console.log(queryResult)
        this.ydAgentComQuery.showFlag = false
      },
      /**
       * 返回设置中介机构信息
       */
      setZjAgentCominfo(queryResult) {
        if (queryResult) {
          const zjagent = queryResult.ztagent
          // 当其为邮政银行代理渠道时
          if (this.contData.sellType === '02') {
            this.ydagent.zjAgentCom = zjagent.agentCom
            this.ydagent.zjAgentComName = zjagent.name
          } else {
            this.manager.managerInfos = queryResult.managerInfos
            this.zjagent.zjAgentCom = zjagent.agentCom
            this.zjagent.zjAgentComName = zjagent.name
            // 管理机构信息
            this.contData.manageCom = zjagent.manageCom
            this.manageCom = zjagent.manageCom
            // this.itemManagerFun()
          }
        }
        const jsonData = {
          manageCom: queryResult.ztagent.manageCom,
          branchType: queryResult.ztagent.branchType,
          saleChnl: this.contData.saleChnl + this.contData.sellType
        }
        queryGradeBelong(jsonData).then(response => {
          const data = response.data
          if (data.code === 0) {
            this.contData.performanceType = data.body
          } else {
            this.$message.error(data.message)
          }
        })
        this.zjAgentComQuery.showFlag = false
      },
      /**
       * 返回设置综拓代理人信息
       */
      setZtAgentinfo(ztQueryResult) {
        if (ztQueryResult) {
          const queryResult = ztQueryResult.agentQueryResult
          console.log(ztQueryResult.agentQueryResult)
          // 代理人信息
          this.manager.managerInfos = [queryResult]
          this.ztagent = queryResult
          this.ztagentFrame.showFlag = true
          // 管理机构信息
          this.contData.manageCom = queryResult.manageCom
          this.manageCom = queryResult.manageCom
        }
        console.log(ztQueryResult)
        const jsonData = {
          manageCom: ztQueryResult.agentQueryResult.manageCom,
          branchType: ztQueryResult.agentQueryResult.branchType,
          saleChnl: this.contData.saleChnl + this.contData.sellType
        }
        queryGradeBelong(jsonData).then(response => {
          const data = response.data
          if (data.code === 0) {
            this.contData.performanceType = data.body
          } else {
            this.$message.error(data.message)
          }
        })
        this.ztAgentCodeQuery.showFlag = false
      },
      /**
       * 选择二级销售渠道
       */
      selectSaleChn1() {
        this.contData.sellType = ''
        this.getSellType(this.contData.saleChnl) // 获取二级销售渠道
      },
      // 居民类型是否显示
      isDenTypeShow() {
        if ((this.contData.saleChnl === '04' && this.contData.sellType === '02') || (this.contData.saleChnl === '03' && this.contData.sellType === '02')) {
          this.denTypeShow = true
        } else {
          this.denTypeShow = false
        }
      },
      /**
       * 保存合同信息
       */
      saveCont() {
        const valid1 = new Promise((resolve, reject) => {
          this.$refs['contData'].validate((valid) => {
            if (valid) {
              resolve()
            }
          })
        })
        const valid2 = new Promise((resolve, reject) => {
          this.$refs['agent'].validate((valid) => {
            if (valid) {
              resolve()
            }
          })
        })
        const valid3 = new Promise((resolve, reject) => {
          this.$refs['zjagent'].validate((valid) => {
            if (valid) {
              resolve()
            }
          })
        })
        const valid4 = new Promise((resolve, reject) => {
          this.$refs['contData2'].validate((valid) => {
            if (valid) {
              resolve()
            }
          })
        })
        const valid5 = new Promise((resolve, reject) => {
          this.$refs['ydagent'].validate((valid) => {
            if (valid) {
              resolve()
            }
          })
        })
        let validList = []
        if (this.contData.saleChnl === '04' && this.contData.sellType !== '02' && this.contData.sellType !== '05') {
          validList = [valid1, valid2, valid3, valid4, valid5]
        } else {
          validList = [valid1, valid2, valid4, valid5]
        }
        if (this.contData.saleChnl === '04' && this.contData.sellType === '05') {
          if (this.ztagent.agentCode === '') {
            this.$alert('综拓代理人编码不能为空', '警告')
            return false
          }
        }
        if (this.contData.saleChnl === '02' && this.contData.sellType === '01') {
          if (this.agent.agentCode === '') {
            this.$alert('个险代理人编码不能为空', '警告')
            return false
          }
        }
        if (this.contData.polApplyDate === '' || this.contData.saleChnl === '') {
          return false
        } else {
          if (this.contData.manageCom !== this.manageCom) {
            this.$alert('管理机构和代理人所属机构内容不一致，请修改！', '警告')
            return false
          }
        }
        this.isDenTypeShow()
        // if (this.contData.manageCom !== this.$route.query.manageCom) {
        //   this.$alert('管理机构和代理人所属机构内容不一致，请修改！', '警告')
        //   return false
        // }
        Promise.all(validList).then(() => {
          const applyPojo = {}
          Object.assign(applyPojo, this.applyPojo)
          // 设置合同信息
          Object.assign(applyPojo.lcCont, this.contData)
          // 设置代理人告知
          Object.assign(applyPojo.agentImpartList, this.$refs.agentImpart.impartDatas)
          for (var i = 0; i < applyPojo.agentImpartList.length; i++) {
            if (applyPojo.agentImpartList[i].impartParamModle === '' || applyPojo.agentImpartList[i].impartParamModle === '/') {
              this.$alert('代理人告知信息填写内容内容不能为空！', '警告')
              return false
            }
          }
          Object.assign(applyPojo.agentImpartList, agentImpart)
          // 设置中介项目经理
          Object.assign(applyPojo.agencyQueryResultList, this.manager.managerInfos)
          // 设置其他代理人信息
          // Object.assign(applyPojo.otherAgents, this.otherAgent.otherAgentInfos)
          // 设置综拓代理人信息
          Object.assign(applyPojo.ztAgentPojo, this.ztagent)
          // 设置中介代理人信息
          Object.assign(applyPojo.zjAgentPojo, this.zjagent)
          // 设置代理人信息
          Object.assign(applyPojo.mainAgentPojo, this.agent)
          // 设置银行代理人信息
          Object.assign(applyPojo.ydAgentPojo, this.ydagent)
          // 设置初始化步骤，合同信息保存后，初始化在投保人信息页签
          applyPojo.applyStep = this.contInputStepAppnt
          saveCont(applyPojo).then(response => {
            const resData = response.data
            if (resData && resData.code === 0) {
              this.applyPojo.id = resData.body
              this.cont.showFlag = false
              this.insured.showFlag = false
              // this.product.showFlag = false
              this.appnt.showFlag = true
              this.appnt.changeFlag = true
              document.body.scrollTop = 0
              document.documentElement.scrollTop = 0
              this.$refs.content.scrollTop = 0
            } else {
              this.$message.error(resData.message)
            }
          })
        })
      },
      /**
       *纳税人识别号1
       * */
      distinguish() {
        if (this.individualTaxationData.taxpayerNo !== '') {
          this.individualTaxationData.reasonCode = ''
          this.individualTaxationData.reason = ''
          this.disabled = true
        } else {
          this.disabled = false
        }
        return
      },
      distinguishFun() {
        if (this.individualTaxationData.taxpayerNo2 !== '') {
          this.individualTaxationData.reasonCode = ''
          this.individualTaxationData.reason = ''
          this.disabled = true
        } else {
          this.disabled = false
        }
        return
      },
      /**
       *投保数据初始化
       * */
      initCont() {
        //  获取管理机构
        if (!this.common.managementAgency || this.common.managementAgency.length === 0) {
          this.$store.dispatch('GetManagementAgency')
        }
        // 设置默认的被保人信息
        this.setDefaultInsured()
        this.applyPojo.missionID = this.$route.query.missionID
        this.applyPojo.subMissionID = this.$route.query.subMissionID
        this.applyPojo.activityID = this.$route.query.activityID
        this.applyPojo.contNo = this.$route.query.prtNo
        // 页面码表数据初始化begin
        if (this.subType) {
          this.getScanImg()
          this.getScanImgData()
        } else {
          this.querySubType().then(() => {
            if (this.subType) {
              this.getScanImg()
              this.getScanImgData()
            }
          })
        }
        this.getDenType() // 居民身份类型
        this.getSaleChnl() // 获取一级销售渠道
        this.getIdType() // 获取证件类型
        this.getSalarySource() // 获取收入来源
        this.getRelation() // 获取关系
        this.getNativeplace() // 获取国籍
        this.getTaxpayerType() // 获取纳税身份
        this.getReasonCode() // 获取不能纳税原因下拉框数据
        this.getNewPayMode() // 获取首期缴费形式下拉框
        this.getPayMode() // 获取首续期/续保缴费形式下拉框
        this.getBankCode() // 获取银行列表
        this.getProvince() // 获取身份列表
        this.getAutoPayFlag() // 获取自动垫交标志
        this.getPrivateOrPublicSigns() // 获取公私标识下拉框数据
        this.getDisputedFlag() // 获取合同争议处理方式
        this.getSequenceNo() // 获取客户内部号码下拉框数据
        this.getBnfType() // 获取受益人类别下拉框数据
        this.getBnfGrade() // 获取受益顺序下拉框数据
        this.getCustomerType() // 获取受益人速填下拉框数据
        this.contactInformation() // 联系方式
        this.currencyFun() // 货币币种获取
        // 页面码表数据初始化end
        // 新加参数，判断是问题件修改还是新单录入 1：新单录入 2：问题件修改
        let loadFlag
        if (this.entryOrEasy === 'entry') {
          loadFlag = '1'
        } else {
          loadFlag = '2'
        }
        const prtNo = {
          // 暂时只有通过投保单号去初始化 todo
          prtNo: this.contData.prtNo,
          loadFlag: loadFlag
        }
        const initContPromise = () => {
          return new Promise((resolve, reject) => {
            initCont(prtNo).then(response => {
              // console.log('保单初始化-------')
              const resData = response.data
              console.log(resData)
              if (resData && resData.code === 0) {
                Object.assign(this.applyPojo, resData.body)
                this.applyPojo.missionID = this.$route.query.missionID
                this.applyPojo.subMissionID = this.$route.query.subMissionID
                this.applyPojo.activityID = this.$route.query.activityID
                // 合同信息初始化begin
                // 合同信息
                if (this.applyPojo.lcCont.agentType === '') {
                  this.agenttype = true
                } else {
                  this.agenttype = false
                }
                Object.assign(this.contData, this.applyPojo.lcCont)
                if (this.contData.makeType) {
                  this.makeTypeChange()
                }
                // 防止管理机构信息初始化后，未初始化this.manageCom，会弹出“管理机构和代理人所属机构内容不一致”的弹框
                // 当然，理论上这里始终会有初始化值，但是，但选择代理人时，this.manageCom会改变，点击下一步，再去校验上面的东西
                if (this.applyPojo.lcCont.manageCom) {
                  this.manageCom = this.applyPojo.lcCont.manageCom
                }
                // 初始化二级销售渠道
                if (this.contData.saleChnl) {
                  this.getSellType(this.contData.saleChnl)
                }
                // 项目经理信息
                this.manager.managerInfos = this.applyPojo.agencyQueryResultList
                // 其他代理人信息
                // this.otherAgent.otherAgentInfos = this.applyPojo.otherAgents
                // 综拓代理人信息
                Object.assign(this.ztagent, this.applyPojo.ztAgentPojo)
                // 中介代理人信息
                Object.assign(this.zjagent, this.applyPojo.zjAgentPojo)
                // 代理人信息
                Object.assign(this.agent, this.applyPojo.mainAgentPojo)
                // 银行代理人信息
                Object.assign(this.ydagent, this.applyPojo.ydAgentPojo)
                console.log(this.applyPojo)
                // 代理人告知
                this.$refs.agentImpart.impartDatas = this.applyPojo.agentImpartList
                // 合同信息初始化end
                // 投保人信息初始化begin
                // 投保人信息
                Object.assign(this.appntData, this.applyPojo.lcAppnt)
                console.log(this.appntData, 'appntData')
                this.appntData.age = calAge(this.appntData.appntBirthday)
                if (this.appntData.idexpDate === '9999-01-01') {
                  this.appntData.idExpDates = '长期'
                } else {
                  this.appntData.idExpDates = '短期'
                }
                // 投保人账户信息
                this.accountData.newPayMode = this.applyPojo.lcCont.newPayMode
                this.accountData.privateOrPublicSigns = this.applyPojo.lcCont.privateOrPublicSigns || '1'
                this.accountData.autoPayFlag = this.applyPojo.lcCont.autoPayFlag
                this.accountData.newBankCode = this.applyPojo.lcCont.newBankCode
                this.accountData.newAccName = this.applyPojo.lcCont.newAccName
                this.accountData.newBankAccNo = this.applyPojo.lcCont.newBankAccNo
                this.accountData.payMode = this.applyPojo.lcCont.payMode
                this.accountData.bankCode = this.applyPojo.lcCont.bankCode
                this.accountData.bankProivnce = this.applyPojo.lcCont.bankProivnce
                this.accountData.accName = this.applyPojo.lcCont.accName
                this.accountData.bankAccNo = this.applyPojo.lcCont.bankAccNo
                this.accountData.destAccountDate = this.applyPojo.lcCont.destAccountDate
                this.accountData.payAccountChecked = this.applyPojo.payAccountChecked
                // 投保人税收信息
                Object.assign(this.individualTaxationData, this.applyPojo.lcIndividualTaxationPojo)
                // 投保人告知信息
                this.$refs.appntImpart.impartDatas = this.applyPojo.appntImpartList
                // 被保人告知信息 todo 这个地方不对，被保险人告知放在被保险人节点下了
                this.$refs.insuredImpart.impartDatas = this.applyPojo.insuredImpartList
                // 初始化税收信息框
                this.initIndividualTaxation()
                // 投保人信息初始化end
                // 被保险人信息初始化begin
                if (this.applyPojo.lcInsuredList) {
                  this.insuredDatas = this.applyPojo.lcInsuredList
                  console.log(this.insuredDatas, '被保人数组')
                }
                if (this.insuredDatas && this.insuredDatas.length && this.insuredDatas.length > 0) {
                  for (let i = 0; i < this.insuredDatas.length; i++) {
                    this.insuredBtnController.push({
                      modifyBtnShowFlag: false,
                      addBtnShowFlag: true
                    })
                    // 获取被保人的四大要素
                    this.insuredInformation.name = this.insuredDatas[i].name
                    this.insuredInformation.sex = this.insuredDatas[i].sex
                    this.insuredInformation.birthday = this.insuredDatas[i].birthday
                    this.insuredInformation.idNo = this.insuredDatas[i].idno
                    console.log(this.insuredInformation.birthday, this.insuredInformation.idNo, '999999')
                  }
                }
                if (this.insuredDatas.length >= 1) {
                  this.canModifyInsured(0)
                } else {
                  this.isSequenceNo = true
                }
                // 被保险人信息初始化end
                this.showFormContent(this.applyPojo.applyStep)
                this.isDenTypeShow()
                this.otherChangeCheck()
                this.changeRelationNoCheck()
                this.appntChangeCheck()
                this.changePhoneNum()
                this.insuredChangeCheck()
                this.changeAppIdType()
                resolve()
                console.log('保单初始化-------end-----')
              } else if (resData.code === 11001) {
                resolve()
              } else {
                this.$message.error(resData.message)
                reject()
              }
            })
          })
        }
        initContPromise().then(() => { this.isInit = false }).then(() => {
          if (this.contData.saleChnl && this.ydagent.agentCom) {
          // 初始化设置专管人员列表数据
            queryBankAgent(this.ydagent.agentCom, this.contData.saleChnl).then(response => {
              const resData = response.data
              if (resData.code === 0 && resData.body) {
                this.ydzgAgents = resData.body
                this.bankRequired = true
              } else {
                this.ydagent.agentCode = ''
                this.ydagent.branchAttr = ''
                this.$message.error(resData.message)
              }
            })
          }
        })
      },
      /**
       * 双录单校验
       */
      channelFun() {
        if (this.contData.isDoubleRecords === '否') {
          this.disabledList = true
        } else {
          this.disabledList = false
        }
      },
      /**
       * 显示页签信息
       */
      showContent(content) {
        if (!this[content].changeFlag) {
          return
        } else {
          this.$refs.content.scrollTop = 0
          this.cont.showFlag = false
          this.appnt.showFlag = false
          this.insured.showFlag = false
          // this.product.showFlag = false
          this[content].showFlag = true
        }
      },
      /**
       * 显示具体录入窗体信息位置
       */
      showFormContent(applyStep) {
        switch (applyStep) {
          case this.contInputStepCont: {
            this.appnt.showFlag = false
            this.appnt.changeFlag = false
            this.insured.showFlag = false
            this.insured.changeFlag = false
            // this.product.showFlag = false
            // this.product.changeFlag = false
            this.cont.changeFlag = true
            this.cont.showFlag = true
            break
          }
          case this.contInputStepAppnt: {
            this.appnt.showFlag = true
            this.appnt.changeFlag = true
            this.insured.showFlag = false
            this.insured.changeFlag = false
            // this.product.showFlag = false
            // this.product.changeFlag = false
            this.cont.changeFlag = true
            this.cont.showFlag = false
            break
          }
          case this.contInputStepInsured: {
            this.appnt.showFlag = false
            this.appnt.changeFlag = true
            this.insured.showFlag = true
            this.insured.changeFlag = true
            // this.product.showFlag = false
            // this.product.changeFlag = false
            this.cont.changeFlag = true
            this.cont.showFlag = false
            break
          }
          // case this.contInputStepProposal: {
          //   this.appnt.showFlag = false
          //   this.appnt.changeFlag = true
          //   this.insured.showFlag = false
          //   this.insured.changeFlag = true
          //   // this.product.showFlag = true
          //   // this.product.changeFlag = true
          //   this.cont.changeFlag = true
          //   this.cont.showFlag = false
          //   break
          // }
          case this.contInputStepComfirm: {
            this.appnt.showFlag = false
            this.appnt.changeFlag = true
            this.insured.showFlag = false
            this.insured.changeFlag = true
            this.cont.changeFlag = true
            this.cont.showFlag = true
            break
          }
          default: {
            this.appnt.showFlag = false
            this.appnt.changeFlag = false
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.cont.changeFlag = false
            this.cont.showFlag = true
            break
          }
        }
      },
      /**
       * 初始化税收信息表单
       */
      initIndividualTaxation() {
        if (this.individualTaxationData.taxpayerType === '01') {
          this.individualTaxation1.showFlag = false
        } else {
          this.individualTaxation1.showFlag = true
        }
      },
      /**
       * 校验一二级销售渠道是否录入
       */
      saleChnlCheck() {
        if (!this.contData.saleChnl || !this.contData.sellType) {
          this.$message.error('请先选择销售渠道')
        } else {
          return true
        }
      },
      /**
       * 代理人编码双击事件
       */
      agentCodeDbCliclk() {
        if (this.saleChnlCheck()) {
          this.agentCodeQuery.showFlag = true
          this.agentFrame.isDbClicked = true
          // this.otherAgentFrame.isDbClicked = false
        } else {
          this.agentCodeQuery.showFlag = false
          this.agentFrame.isDbClicked = false
        }
      },
      /**
       * 其他代理人编码双击事件
       * @param row 双击的行数
       */
      otherAgentDbClick(row) {
        this.agentCodeQuery.showFlag = true
        this.agentFrame.isDbClicked = false
        // this.otherAgentFrame.isDbClicked = true
        // this.otherAgent.clickRowNo = row
      },
      /**
       * 综拓代理人编码编码双击事件
       */
      ztAgentCodeDbClicll() {
        if (this.saleChnlCheck()) {
          this.ztAgentCodeQuery.showFlag = true
        } else {
          this.ztAgentCodeQuery.showFlag = false
        }
      },
      queryZtAgentList(val) { // 查询业务员
        returnZtResult(val).then(response => {
          const resData = response.data
          console.log(resData)
          if (resData.code === 0) {
            if (resData.body) {
              const ztagent = {
                agentQueryResult: resData.body
              }
              this.setZtAgentinfo(ztagent)
              // this.ztagent.agentName = resData.body.agentName
              // this.ztagent.agentGroup = resData.body.agentGroup
              // this.ztagent.groupName = resData.body.groupName
              // this.ztagent.manageCom = resData.body.manageCom
            } else {
              this.$message('没有返回结果')
            }
          } else {
            if (resData.message) {
              this.$message.error(resData.message)
            } else {
              this.$message.error('没有返回结果')
            }
          }
        })
      },
      ztAgentCodeChange(val) {
        this.queryZtAgentList(val)
      },
      /**
       * 中介机构编码双击事件
       */
      zjAgentComDbCliclk() {
        if (this.saleChnlCheck()) {
          this.zjAgentComQuery.showFlag = true
        } else {
          this.zjAgentComQuery.showFlag = false
        }
      },
      // 查询中介机构信息
      queryZjAgentComsChange(val, flag) {
        getZjAgentComs({ agentComCode: val }).then(response => {
          const resData = response.data
          if (resData.code === 0) {
            if (resData.body.data) {
              const agentCom = resData.body.data[0]
              if (agentCom) {
                const agentComCode = agentCom.agentCom
                returnZjResult(agentComCode).then(res => {
                  const repData = res.data
                  if (repData.code === 0) {
                    this.setZjAgentCominfo({ managerInfos: repData.body, ztagent: agentCom })
                  } else if (repData.code === 13003) {
                    this.setZjAgentCominfo({ managerInfos: null, ztagent: agentCom })
                  } else {
                    this.$message.error(repData.message)
                  }
                })
              }
              // if (flag === 'yd') {
              //   this.ydagent.zjAgentComName = resData.body.data[0].name
              // } else if (flag === 'zj') {
              //   this.zjagent.zjAgentComName = resData.body.data[0].name
              //   // console.log(this.zjagent.zjAgentComName, 'thiszjagentzjAgentComName')
              // }
            } else {
              this.$message('没有返回结果')
            }
          } else {
            if (resData.message) {
              this.$message.error(resData.message)
            } else {
              this.$message.error('没有返回结果')
            }
          }
        })
      },
      zjAgentComChange(val, flag) {
        this.queryZjAgentComsChange(val, flag)
      },
      /**
       * 代理机构编码双击事件
       */
      ydAgentComDbCliclk() {
        if (this.saleChnlCheck()) {
          this.biography = this.contData.saleChnl
          this.ydAgentComQuery.showFlag = true
        } else {
          this.ydAgentComQuery.showFlag = false
        }
      },
      // 查询中介机构信息
      queryZjAgentComs(val) {
        // if (!this.formData.manageCom) {
        //   this.formData.manageCom = '86'
        // }
        getBankAgentComs({ agentComCode: val }).then(response => {
          const resData = response.data
          if (resData && resData.code === 0) {
            if (resData.body.data) {
              const agent = { agentCom: resData.body.data[0] }
              this.setYdAgentCominfo(agent)
            } else {
              this.$message('没有返回结果')
            }
          } else {
            if (resData.message) {
              this.$message.error(resData.message)
            } else {
              this.$message.error('没有返回结果')
            }
          }
        })
      },
      agentComChange(val) {
        this.queryZjAgentComs(val)
      },
      /**
       * 代理机构编码双击事件
       */
      selectYdAgent(val) {
        const vals = val.split('-')[0]
        console.log(vals)
        for (var i = 0; i < this.ydzgAgents.length; i++) {
          if (this.ydzgAgents[i].agentCode === vals) {
            this.ydagent.agentCode = this.ydzgAgents[i].agentCode
            this.ydagent.branchAttr = this.ydzgAgents[i].branchAttr
            this.ydagent.agentGroup = this.ydzgAgents[i].branchCode
            const jsonData = {
              manageCom: this.ydzgAgents[i].manageCom,
              branchType: this.ydzgAgents[i].branchType,
              saleChnl: this.contData.saleChnl + this.contData.sellType
            }
            queryGradeBelong(jsonData).then(response => {
              const data = response.data
              if (data.code === 0) {
                this.contData.performanceType = data.body
              } else {
                this.$message.error(data.message)
              }
            })
          }
        }
        // this.ydagent.agentCode = value.agentCode
        // this.ydagent.agentName = value.agentName
        // this.ydagent.branchAttr = value.branchAttr
        // this.ydagent.agentGroup = value.branchCode
      },
      // 合同信息tab页中的method -------end
      /**
       * 获取收入来源下拉框
       */
      getSalarySource() {
        const jsonData = {
          codeType: 'incomeway'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const salarySource = data.body
              this.salarySource = salarySource
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      contactInformation() {
        const jsonData = {
          codeType: 'contactfirst'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const preferredPhoneNum = data.body
              this.preferredPhoneNum = preferredPhoneNum
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 获取税收原因下拉框数据
       */
      getReasonCode() {
        const jsonData = {
          codeType: 'reasoncode'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const reasonCode = data.body
              this.reasonCode = reasonCode
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 首期付款方式下拉框
       */
      getNewPayMode() {
        const jsonData = {
          codeType: 'paylocation3'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const newPayMode = data.body.filter(function(item) {
                return (item.code === '0' || item.code === '2' || item.code === 'b')
              })
              this.newPayMode = newPayMode
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 续期/续保付款方式下拉框
       */
      getPayMode() {
        const jsonData = {
          codeType: 'paylocation4'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const payMode = data.body
              this.payMode = payMode
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 币种事件，一期本不开发这个需求，需要二期开发
       */
      currencyQuery(item) {
        if (item !== '01') {
          this.yearIncomes = false
        }
      },
      /**
       * 银行列表下拉框
       */
      getBankCode() {
        const jsonData = {
          codeType: 'bank'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const bankCode = data.body
              this.bankCode = bankCode
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 省份下拉框
       */
      getProvince() {
        new Promise((resolve, reject) => {
          getProvince().then(response => {
            const data = response.data
            if (data.code === 0) {
              const province = data.body
              this.province = province
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 自动垫交方式下拉框
       */
      getAutoPayFlag() {
        const jsonData = {
          codeType: 'autopayflag'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const autoPayFlag = data.body
              this.autoPayFlag = autoPayFlag
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 公私标识下拉框
       */
      getPrivateOrPublicSigns() {
        const jsonData = {
          codeType: 'privateorpublicsigns'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              this.privateOrPublicSigns = data.body
              console.log(this.privateOrPublicSigns, 'this.privateOrPublicSigns')
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 合同争议处理方式下拉框
       */
      getDisputedFlag() {
        const jsonData = {
          codeType: 'disputedflag'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              this.disputedFlag = data.body
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 纳税身份下拉框
       */
      getTaxpayerType() {
        const jsonData = {
          codeType: 'taxpayertype'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            // console.log(data, '333333333')
            if (data.code === 0) {
              const taxpayerType = data.body
              this.taxpayerType = taxpayerType
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 国籍下拉框
       */
      getNativeplace() {
        const jsonData = {
          codeType: 'nativeplace'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const nativeplace = data.body
              this.nativeplace = nativeplace
              this.appntNativePlace = nativeplace
              this.insuredNativePlace = nativeplace
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 关系下拉框
       */
      getRelation() {
        const jsonData = {
          codeType: 'relation'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              const relation = data.body
              this.relation = relation
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 证件类型下拉框
       */
      getIdType() {
        const jsonData = {
          codeType: 'idtype'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) { // 0-身份证件、2-军人证、4-户口本、7-出生证、A-士兵证、C-临时身份证、D-警官证、F-港澳台通行证
              const idType = data.body
              this.idTypeAll = idType
              const idTypeList = idType.filter(function(item) {
                return (item.code === '0' || item.code === '2' || item.code === '4' || item.code === '7' || item.code === 'C' || item.code === 'D' || item.code === 'B' || item.code === 'G' || item.code === '1' || item.code === 'I' || item.code === 'E' || item.code === 'H')
              })
              this.idType = idTypeList
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      // 更改投保人国籍
      changeNativePlace(val) {
        this.testing = val
        const idTypeList = this.idTypeAll.filter(function(item) {
          if (val === 'HKG' || val === 'MAC') { // 国籍为中国香港，中国澳门时可以使用B-返乡证、G-港澳居民居住证办理业务
            return (item.code === 'B' || item.code === 'G')
          } else if (val === 'TWN') { // 国籍为中国台湾时可以使用E-台胞证，H-台湾居民居住证办理业务
            return (item.code === 'E' || item.code === 'H')
          } else if (val === 'CHN') { // 只允许使用0-身份证件、2-军人证、4-户口本、7-出生证、C-临时身份证、D-警官证、F-港澳台通行证
            return (item.code === '0' || item.code === '2' || item.code === '4' || item.code === '7' || item.code === 'C' || item.code === 'D' || item.code === 'F')
          } else { // 国籍为非中国、非中国香港、非中国澳门、非中国台湾的其他国家只允许使用护照或外国人永久居住办理业务
            return (item.code === '1' || item.code === 'I')
          }
        })
        this.idType = idTypeList
        if (this.oldNativePlace === 'CHN') {
          if (val !== 'CHN') {
            this.appntData.idtype = ''
            this.oldNativePlace = val
          }
        } else if (this.oldNativePlace === 'TWN') {
          if (val !== 'TWN') {
            this.appntData.idtype = ''
            this.oldNativePlace = val
          }
        } else if (this.oldNativePlace === 'HKG' || this.oldNativePlace === 'MAC') {
          if (val !== 'HKG' && val !== 'MAC') {
            this.appntData.idtype = ''
            this.oldNativePlace = val
          }
        } else {
          if (val === 'HKG' || val === 'MAC' || val === 'CHN' || val === 'TWN') {
            this.appntData.idtype = ''
            this.oldNativePlace = val
          }
        }
        if (!this.appntData.idtype) {
          this.tipsInformation() // 当证件类型被重置后再进行提示，若未重置，说明选的证件类型是正确的，则不需要弹出提示框
        }
      },
      tipsInformation() { // 根据不同的国籍来提示信息
        if (this.testing === 'CHN') {
          this.$message.error('中国居民需使用身份证、户口本（17周岁以下客户）或出生证（2周岁以下客户）办理保险业务')
          return
        }
        if (this.testing === 'HKG' || this.testing === 'MAC') {
          this.$message.error('国籍为中国香港，中国澳门时可以使用B-返乡证、G-港澳居民居住证办理业务')
          return
        }
        if (this.testing === 'TWN') {
          this.$message.error('国籍为中国台湾时可以使用E-台胞证，H-台湾居民居住证办理业务')
          return
        }
        if (this.testing !== 'TWN' || this.testing !== 'HKG' || this.testing !== 'MAC' || this.testing !== 'CHN') {
          this.$message.error('国籍为非中国、中国香港、中国澳门、中国台湾的用户、请使用护照或外国人永久居留证办理保险业务!')
          return
        }
      },
      // 更改被保人国籍
      insuredDataNativePlace(val) {
        this.testing = val
        const idTypeList = this.idTypeAll.filter(function(item) {
          if (val === 'HKG' || val === 'MAC') { // 国籍为中国香港，中国澳门时可以使用B-返乡证、G-港澳居民居住证办理业务
            return (item.code === 'B' || item.code === 'G')
          } else if (val === 'TWN') { // 国籍为中国台湾时可以使用E-台胞证，H-台湾居民居住证办理业务
            return (item.code === 'E' || item.code === 'H')
          } else if (val === 'CHN') { // 只允许使用0-身份证件、2-军人证、4-户口本、7-出生证、C-临时身份证、D-警官证、F-港澳台通行证
            return (item.code === '0' || item.code === '2' || item.code === '4' || item.code === '7' || item.code === 'C' || item.code === 'D' || item.code === 'F')
          } else { // 国籍为非中国、非中国香港、非中国澳门、非中国台湾的其他国家只允许使用护照或外国人永久居住办理业务
            return (item.code === '1' || item.code === 'I')
          }
        })
        this.idType = idTypeList
        if (this.oldNativePlace === 'CHN') {
          if (val !== 'CHN') {
            this.insuredData.idtype = ''
            this.oldNativePlace = val
          }
        } else if (this.oldNativePlace === 'TWN') {
          if (val !== 'TWN') {
            this.insuredData.idtype = ''
            this.oldNativePlace = val
          }
        } else if (this.oldNativePlace === 'HKG' || this.oldNativePlace === 'MAC') {
          if (val !== 'HKG' && val !== 'MAC') {
            this.insuredData.idtype = ''
            this.oldNativePlace = val
          }
        } else {
          if (val === 'HKG' || val === 'MAC' || val === 'CHN' || val === 'TWN') {
            this.insuredData.idtype = ''
            this.oldNativePlace = val
          }
        }
        if (!this.insuredData.idtype) {
          this.tipsInformation()
        }
      },
      // 受益人根据证件类型 选择国籍
      lcBnfsNativePlace(index, row) {
        if (row.idtype) {
          const nativeplace = this.changeNativePlaceByIdType(row.idtype)
          this.iLIdTypeNativePlace[index].nativeplace = nativeplace
          if (nativeplace.length === 1) {
            row.nativePlace = nativeplace[0].code
          } else {
            const nativePlaceNow = nativeplace.find((item, index, arr) => {
              return item.code === row.nativePlace
            })
            if (!nativePlaceNow) {
              row.nativePlace = ''
            }
          }
        }
      },
      /**
       * 根据证件号码设置生日、性别、年龄等信息
       */
      // setOtherInfoByIdNo() {
      //   if (this.appntData.idtype === '') {
      //     this.$message.error('请先选择证件类型')
      //   }
      //   if (this.appntData.idtype === '0') {
      //     const idno = this.appntData.idno
      //     const birthday = getBirthdatByIdNo(idno)
      //     const birthday2 = this.appntData.appntBirthday
      //     const vlist = [
      //       {
      //         method: 'compareTimeIsEqual',
      //         params: [birthday, birthday2],
      //         errorMsg: '身份证号码与出生日期不符'
      //       }
      //     ]
      //     const resultBirth = execCheck(vlist)
      //     console.log(resultBirth)
      //     if (resultBirth !== 'true') {
      //       this.$confirm('身份证号码与出生日期不符，是否自动更改投保人出生日期?', '提示', {
      //         confirmButtonText: '确定',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //       }).then(() => {
      //         this.appntData.appntBirthday = birthday
      //         const age = calAge(birthday)
      //         this.appntData.age = age
      //         const sex = getSexByIDNo(idno)
      //         if (sex !== this.appntData.appntSex) {
      //           this.$confirm('身份证号码与性别不符，是否自动更改投保人性别?', '提示', {
      //             confirmButtonText: '确定',
      //             cancelButtonText: '取消',
      //             type: 'warning'
      //           }).then(() => {
      //             this.appntData.appntSex = sex
      //           }).catch(() => {
      //             this.appntData.idno = ''
      //           })
      //         }
      //       }).catch(() => {
      //         this.appntData.idno = ''
      //       })
      //     }
      //   }
      // },
      /**
       * 修改投保人出生日期
       */
      changeAppntBirthday(value) {
        this.queryCustomerInfoByFive()
        const age = calAge(value)
        this.appntData.age = age
      },
      /**
       * 证件有效期
       */
      dataLists(data) {
        if (data === '长期') {
          this.datas = false
          this.appntData.idexpDate = '9999-01-01'
        } else {
          this.datas = true
          if (this.appntData.idexpDate === '9999-01-01') {
            this.appntData.idexpDate = ''
          }
        }
        return false
      },
      idexpLists(data) {
        if (data === '长期') {
          this.datas = false
          this.insuredData.idexpDate = '9999-01-01'
        } else {
          this.datas = true
          if (this.insuredData.idexpDate === '9999-01-01') {
            this.insuredData.idexpDate = ''
          }
        }
        return false
      },
      /**
       * 修改纳税身份
       */
      changeTaxpayerType() {
        if (this.individualTaxationData.taxpayerType !== '01') {
          this.individualTaxation1.showFlag = true
        } else {
          this.individualTaxation1.showFlag = false
        }
        if (this.individualTaxationData.taxpayerType === '02') {
          this.individualTaxationData.birthday = this.appntData.appntBirthday
        }
      },
      /**
       * 勾选首期、续期/续保账户保持一致
       */
      theSameToFirstAccount(val) {
        if (this.accountData.newPayMode === '0') {
          if (this.accountData.payAccountChecked) {
            this.applyPojo.payAccountChecked = true
            this.accountData.payMode = this.accountData.newPayMode
            this.accountData.bankCode = this.accountData.newBankCode
            this.accountData.bankAccNo = this.accountData.newBankAccNo
            this.accountData.accName = this.accountData.newAccName
          } else {
            // this.accountData.payMode = null
            this.accountData.bankCode = ''
            this.accountData.bankAccNo = ''
            this.accountData.accName = ''
          }
        } else {
          this.accountData.payAccountChecked = false
        }
        if (this.accountData.payMode === '0') {
          this.accountData.accName = this.accountData.newAccName
        }
      },
      /**
       * 投保人客户信息查询
       */
      queryCustomerForAppnt() {
        if (!this.appntData.appntNo) {
          this.customerQuery.showFlag = true
          this.customerQuery.queryFrom = 'appnt'
        } else {
          this.customerQuery.showFlag = true
          this.customerQuery.queryFrom = 'appnt'
        }
      },
      queryCustomerForAppntBlur() {
        this.returnCustomerResult(this.appntData.appntNo, 'appnt')
      },
      queryCustomerForInsuredBlur() {
        this.returnCustomerResult(this.insuredData.insuredNo, 'insured')
      },
      returnCustomerResult(customerNo, customerType) {
        if (!customerNo) {
          return false
        }
        getCustomerInfoByNo(customerNo).then(response => {
          const resData = response.data
          console.log(resData)
          if (resData && resData.code === 0) {
            const queryResult = resData.body
            console.log(queryResult, '返回的客户数据')
            switch (customerType) {
              case 'appnt': {
                // 职业信息 todo
                this.appntData.appntNo = queryResult.customerNo
                this.appntData.appntName = queryResult.name
                this.appntData.appntSex = queryResult.sex
                this.appntData.appntBirthday = queryResult.birthday
                const age = calAge(this.appntData.appntBirthday)
                this.appntData.age = age === 0 ? '' : age
                this.appntData.idno = queryResult.idno
                this.appntData.idtype = queryResult.idtype
                this.appntData.idexpDate = queryResult.idexpDate
                this.appntData.stature = queryResult.stature === 0 ? '' : queryResult.stature
                this.appntData.avoirdupois = queryResult.avoirdupois === 0 ? '' : queryResult.avoirdupois
                this.appntData.socialInsuFlag = queryResult.socialInsuFlag
                this.appntData.nativePlace = queryResult.nativePlace
                this.appntData.lcaddressPojo.grpName = queryResult.grpName // 工作单位
                this.appntData.yearIncome = queryResult.yearIncome === 0 ? '' : queryResult.yearIncome
                this.appntData.incomeSource = queryResult.incomeSource // 主要收入来源
                this.appntData.specialPopFlag = queryResult.specialPopFlag // 是否为特殊人群
                this.appntData.occupationCode = queryResult.occupationCode
                this.appntData.occupationType = queryResult.occupationType
                // 获取职业信息
                this.queryOccupationLevelAndCodeName()
                break
              }
              case 'insured': {
                this.insuredData.insuredNo = queryResult.customerNo
                this.insuredData.name = queryResult.name
                this.insuredData.sex = queryResult.sex
                this.insuredData.birthday = queryResult.birthday
                const age = calAge(this.insuredData.birthday)
                this.insuredData.age = age === 0 ? '' : age
                this.insuredData.idno = queryResult.idno
                this.insuredData.idtype = queryResult.idtype
                this.insuredData.idexpDate = queryResult.idexpDate
                this.insuredData.stature = queryResult.stature === 0 ? '' : queryResult.stature
                this.insuredData.avoirdupois = queryResult.avoirdupois === 0 ? '' : queryResult.avoirdupois
                this.insuredData.specialPopFlag = queryResult.specialPopFlag
                this.insuredData.socialInsuFlag = queryResult.socialInsuFlag
                this.insuredData.nativePlace = queryResult.nativePlace
                this.insuredData.lcaddres.grpName = queryResult.grpName
                this.insuredData.yearIncome = queryResult.yearIncome === 0 ? '' : queryResult.yearIncome
                this.insuredData.incomeSource = queryResult.incomeSource
                break
              }
            }
          } else {
            this.$message.error(resData.message)
          }
        })
        getLcAddressInfoByCustomerNo(customerNo).then(response => {
          const resData = response.data
          console.log(resData)
          if (resData && resData.code === 0) {
            const queryLcaddressResult = resData.body
            console.log(queryLcaddressResult, '返回的客户数据again')
            switch (customerType) {
              case 'appnt': {
                this.appntData.lcaddressPojo.email = queryLcaddressResult.email // e-mail
                this.appntData.lcaddressPojo.preferredPhoneNum = queryLcaddressResult.preferredPhoneNum // 联系电话
                this.appntData.lcaddressPojo.mobile = queryLcaddressResult.mobile // 手机
                this.appntData.lcaddressPojo.phone = queryLcaddressResult.phone // 固定电话
                this.appntData.lcaddressPojo.zipCode = queryLcaddressResult.zipCode // 邮政编码
                this.appntData.lcaddressPojo.postalAddress = queryLcaddressResult.postalAddress // 联系地址
                break
              }
              case 'insured': {
                this.insuredData.lcaddres.email = queryLcaddressResult.email
                this.insuredData.lcaddres.preferredPhoneNum = queryLcaddressResult.preferredPhoneNum
                this.insuredData.lcaddres.mobile = queryLcaddressResult.mobile
                this.insuredData.lcaddres.phone = queryLcaddressResult.phone
                this.insuredData.lcaddres.zipCode = queryLcaddressResult.zipCode
                this.insuredData.lcaddres.postalAddress = queryLcaddressResult.postalAddress
                break
              }
            }
          } else {
            this.$message.error(resData.message)
          }
        })
      },
      /**
       * 获取职业信息
       */
      queryOccupationLevelAndCodeName() {
        const jsonData = {
          codeType: 'occupationtype',
          code: this.appntData.occupationType
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data.body
            this.appntData.occupationLevel = data[0].codeName
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
        const jsonData1 = {
          occupationCode: this.appntData.occupationCode,
          occupationType: this.appntData.occupationType
        }
        new Promise((resolve, reject) => {
          getOccupationList(jsonData1).then(response => {
            const data = response.data.body
            this.appntData.occupationName = data[0].occupationName
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      getOccupationtype() {
        const jsonData = {
          codeType: 'occupationtype'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            if (response.data.code === 0) {
              this.occupationTypes = response.data.body
              // console.log(this.occupationTypes, 'occupationTypesoccupationTypesoccupationTypes')
              resolve()
            }
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 通过编码获取职业信息
       */
      queryOccupationLevelAndCodeNameByCode(val, flag) {
        const occupationCode = val
        new Promise((resolve, reject) => {
          getOccupationListByCode(occupationCode).then(response => {
            const data = response.data
            console.log(data, 'getOccupationListByCodegetOccupationListByCode')
            if (data.code === 0) {
              if (data.body) {
                if (flag === 'appnt') {
                  this.appntData.occupationName = data.body.occupationName
                  this.appntData.occupationType = data.body.occupationType
                  for (let i = 0; i < this.occupationTypes.length; i++) {
                    if (this.occupationTypes[i].code === data.body.occupationType) {
                      this.appntData.occupationLevel = this.occupationTypes[i].codeName
                    }
                  }
                } else {
                  this.insuredData.occupationCodeName = data.body.occupationName
                  this.insuredData.occupationType = data.body.occupationType
                  for (let m = 0; m < this.occupationTypes.length; m++) {
                    if (this.occupationTypes[m].code === data.body.occupationType) {
                      this.insuredData.occupationLevel = this.occupationTypes[m].codeName
                    }
                  }
                }
              }
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      occupationCodeChange(val, flag) {
        this.queryOccupationLevelAndCodeNameByCode(val, flag)
      },
      /**
       * 被保人客户信息查询
       */
      queryCustomerForInsured() {
        this.customerQuery.showFlag = true
        this.customerQuery.queryFrom = 'insured'
      },
      /**
       * 返回设置客户信息
       */
      returnCustomerInfo(customerResult) {
        const queryResult = customerResult.queryResult
        const queryLcaddressResult = customerResult.queryLcaddressResult ? customerResult.queryLcaddressResult : {}
        if (queryResult || queryLcaddressResult) {
          switch (this.customerQuery.queryFrom) {
            case 'appnt': {
              // 职业信息 todo
              this.appntData.appntNo = queryResult.customerNo
              this.appntData.appntName = queryResult.name
              this.appntData.appntSex = queryResult.sex
              this.appntData.appntBirthday = queryResult.birthday
              const age = calAge(this.appntData.appntBirthday)
              this.appntData.age = age === 0 ? '' : age
              this.appntData.idno = queryResult.idno
              this.appntData.idtype = queryResult.idtype
              this.appntData.idexpDate = queryResult.idexpDate
              if (this.appntData.idexpDate === '9999-01-01') {
                this.appntData.idExpDates = '长期'
              } else {
                this.appntData.idExpDates = '短期'
              }
              this.appntData.stature = queryResult.stature === 0 ? '' : queryResult.stature
              this.appntData.avoirdupois = queryResult.avoirdupois === 0 ? '' : queryResult.avoirdupois
              this.appntData.socialInsuFlag = queryResult.socialInsuFlag
              this.appntData.nativePlace = queryResult.nativePlace
              this.appntData.lcaddressPojo.grpName = queryResult.grpName // 工作单位
              this.appntData.yearIncome = queryResult.yearIncome === 0 ? '' : queryResult.yearIncome
              this.appntData.incomeSource = queryResult.incomeSource // 主要收入来源
              this.appntData.specialPopFlag = queryResult.specialPopFlag // 是否为特殊人群
              this.appntData.occupationCode = queryResult.occupationCode
              this.appntData.occupationType = queryResult.occupationType
              this.appntData.lcaddressPojo.email = queryLcaddressResult.email
              this.appntData.lcaddressPojo.preferredPhoneNum = queryLcaddressResult.preferredPhoneNum
              this.appntData.lcaddressPojo.mobile = queryLcaddressResult.mobile
              this.appntData.lcaddressPojo.phone = queryLcaddressResult.phone
              this.appntData.lcaddressPojo.zipCode = queryLcaddressResult.zipCode
              this.appntData.lcaddressPojo.postalAddress = queryLcaddressResult.postalAddress
              // 获取职业信息
              this.queryOccupationLevelAndCodeName()
              console.log('纳税身份')
              this.queryCustomerTaxation(queryResult.customerNo)
              break
            }
            case 'insured': {
              this.insuredData.insuredNo = queryResult.customerNo
              this.insuredData.name = queryResult.name
              this.insuredData.sex = queryResult.sex
              this.insuredData.birthday = queryResult.birthday
              const age = calAge(this.insuredData.birthday)
              this.insuredData.age = age === 0 ? '' : age
              this.insuredData.idno = queryResult.idno
              this.insuredData.idtype = queryResult.idtype
              this.insuredData.idexpDate = queryResult.idexpDate
              if (this.insuredData.idexpDate === '9999-01-01') {
                this.insuredData.idExpDates = '长期'
              } else {
                this.insuredData.idExpDates = '短期'
              }
              this.insuredData.stature = queryResult.stature === 0 ? '' : queryResult.stature
              this.insuredData.avoirdupois = queryResult.avoirdupois === 0 ? '' : queryResult.avoirdupois
              this.insuredData.specialPopFlag = queryResult.specialPopFlag
              this.insuredData.socialInsuFlag = queryResult.socialInsuFlag
              this.insuredData.nativePlace = queryResult.nativePlace
              this.insuredData.lcaddres.grpName = queryResult.grpName
              this.insuredData.yearIncome = queryResult.yearIncome === 0 ? '' : queryResult.yearIncome
              this.insuredData.incomeSource = queryResult.incomeSource
              this.insuredData.lcaddres.email = queryLcaddressResult.email
              this.insuredData.lcaddres.preferredPhoneNum = queryLcaddressResult.preferredPhoneNum
              this.insuredData.lcaddres.mobile = queryLcaddressResult.mobile
              this.insuredData.lcaddres.phone = queryLcaddressResult.phone
              this.insuredData.lcaddres.zipCode = queryLcaddressResult.zipCode
              this.insuredData.lcaddres.postalAddress = queryLcaddressResult.postalAddress
              console.log('纳税身份')
              break
            }
          }
        }
        // if (queryLcaddressResult) {
        //   switch (this.customerQuery.queryFrom) {
        //     case 'appnt': {
        //       this.appntData.lcaddressPojo.email = queryLcaddressResult.email
        //       this.appntData.lcaddressPojo.preferredPhoneNum = queryLcaddressResult.preferredPhoneNum
        //       this.appntData.lcaddressPojo.mobile = queryLcaddressResult.mobile
        //       this.appntData.lcaddressPojo.phone = queryLcaddressResult.phone
        //       this.appntData.lcaddressPojo.zipCode = queryLcaddressResult.zipCode
        //       this.appntData.lcaddressPojo.postalAddress = queryLcaddressResult.postalAddress
        //       break
        //     }
        //     case 'insured': {
        //       this.insuredData.lcaddres.email = queryLcaddressResult.email
        //       this.insuredData.lcaddres.preferredPhoneNum = queryLcaddressResult.preferredPhoneNum
        //       this.insuredData.lcaddres.mobile = queryLcaddressResult.mobile
        //       this.insuredData.lcaddres.phone = queryLcaddressResult.phone
        //       this.insuredData.lcaddres.zipCode = queryLcaddressResult.zipCode
        //       this.insuredData.lcaddres.postalAddress = queryLcaddressResult.postalAddress
        //       break
        //     }
        //   }
        // }
        this.customerQuery.showFlag = false
        // 代理人信息
      },
      /**
       * 显示投保人职业查询
       */
      showJobQueryDialogForAppnt() {
        this.occupationQuery.showFlag = true
        this.occupationQuery.queryFrom = 'appnt'
        if (this.appntData.occupationCode !== '') {
          this.occupationInitParam.occupationCode = this.appntData.occupationCode
          this.occupationInitParam.occupationName = this.appntData.occupationName
          this.occupationInitParam.occupationType = this.appntData.occupationType
          this.occupationInitParam.occupationLevel = this.appntData.occupationLevel
        }
      },
      /**
       * 显示受益人信息
       */
      showOrgBnf() {
        if (this.orgBnf.showOrgBnfFlag) {
          this.orgBnf.showOrgBnfFlag = !this.orgBnf.showOrgBnfFlag
          this.orgBnf.shapeOrgBnf = '+'
        } else {
          this.orgBnf.showOrgBnfFlag = !this.orgBnf.showOrgBnfFlag
          this.orgBnf.shapeOrgBnf = '-'
        }
      },
      /**
       * 显示缴费信息
       */
      showAccount() {
        if (this.account.showFlag) {
          this.account.showFlag = !this.account.showFlag
          this.account.shapeAccount = '+'
        } else {
          this.account.showFlag = !this.account.showFlag
          this.account.shapeAccount = '-'
        }
      },
      /**
       * 显示个人税收信息
       */
      showIndividualTaxation() {
        if (this.individualTaxation.showFlag) {
          this.individualTaxation.showFlag = !this.individualTaxation.showFlag
          this.individualTaxation.shapIndividualTaxation = '+'
        } else {
          this.individualTaxation.showFlag = !this.individualTaxation.showFlag
          this.individualTaxation.shapIndividualTaxation = '-'
        }
      },
      /**
       * 显示险种信息
       */
      showLcpol() {
        if (this.lcpol.showLcpolFlag) {
          this.lcpol.showLcpolFlag = !this.lcpol.showLcpolFlag
          this.lcpol.shapeLcpol = '+'
        } else {
          this.lcpol.showLcpolFlag = !this.lcpol.showLcpolFlag
          this.lcpol.shapeLcpol = '-'
        }
      },
      /**
       * 设置职业信息
       */
      setOccpation() {
        this.occupationQuery.showFlag = false
        switch (this.occupationQuery.queryFrom) {
          case 'appnt': {
            this.appntData.occupationType = this.$refs.occupationQuery.occupationData.occupationType
            this.appntData.occupationCode = this.$refs.occupationQuery.occupationData.occupationCode
            this.appntData.occupationLevel = this.$refs.occupationQuery.occupationData.occupationLevel
            this.appntData.occupationName = this.$refs.occupationQuery.occupationData.occupationName
            break
          }
          case 'bnf': {
            const index = this.occupationQuery.bnfNo
            this.insuredData.lcBnfs[index].occupationCode = this.$refs.occupationQuery.occupationData.occupationCode
            this.insuredData.lcBnfs[index].occupationName = this.$refs.occupationQuery.occupationData.occupationName
            this.insuredData.lcBnfs[index].occupationType = this.$refs.occupationQuery.occupationData.occupationType
            this.insuredData.lcBnfs[index].occupationLevel = this.$refs.occupationQuery.occupationData.occupationLevel
            break
          }
          case 'insured': {
            this.insuredData.occupationType = this.$refs.occupationQuery.occupationData.occupationType
            this.insuredData.occupationCode = this.$refs.occupationQuery.occupationData.occupationCode
            this.insuredData.occupationLevel = this.$refs.occupationQuery.occupationData.occupationLevel
            this.insuredData.occupationCodeName = this.$refs.occupationQuery.occupationData.occupationName
            break
          }
        }
      },
      // /**
      //  *  投保服务人员事件----0401/0403/0404渠道：<保单服务人员>应该对应的是项目经理的信息的项目经理姓名
      //  */
      // itemManagerFun() {
      //   for (var i = 0; i < this.manager.managerInfos.length; i++) {
      //     this.itemManagerName = this.manager.managerInfos[i].agentName
      //   }
      // },
      /**
       * 保存投保人信息
       */
      saveAppnt() {
        const valid1 = new Promise((resolve, reject) => {
          this.$refs['appntData'].validate((valid) => {
            console.log('valid1', valid)
            if (valid) {
              resolve()
            }
          })
        })
        const valid2 = new Promise((resolve, reject) => {
          this.$refs['accountData'].validate((valid) => {
            console.log('valid2', valid)
            if (valid) {
              resolve()
            }
          })
        })
        let validList = []
        if (this.account.showFlag) {
          validList = [valid1, valid2]
        } else {
          validList = [valid1]
        }
        if (this.appntData.idtype === '4' && this.appntData.age >= 17) {
          this.$alert('户口本只适用于17岁以下的人！', '', {}).catch(() => {
          })
          return false
        }
        if (this.appntData.idtype === '7' && this.appntData.age >= 2) {
          this.$alert('出生证只适用于2岁以下的人！', '', {}).catch(() => {
          })
          return false
        }
        if (this.appntData.lcaddressPojo.preferredPhoneNum === '2' && this.appntData.lcaddressPojo.phone === '') {
          this.$alert('固定电话不能为空！', '', {}).catch(() => {
          })
          return false
        }
        if (this.appntData.lcaddressPojo.preferredPhoneNum === '3' && this.appntData.lcaddressPojo.mobile === '') {
          this.$alert('手机号码不能为空！', '', {}).catch(() => {
          })
          return false
        }
        if (this.individualTaxationData.reasonCode === '2' && this.individualTaxationData.reason === '') {
          this.$alert('详细原因不能为空!', '', {}).catch(() => {
          })
          return false
        }
        if (this.individualTaxationData.taxpayerType === '') {
          this.$alert('纳税身份不能为空!', '', {}).catch(() => {
          })
          return false
        }
        if (this.individualTaxation1.showFlag) {
          if (this.individualTaxationData.firstName === '') {
            this.$alert('姓（英文或拼音）不符合输入规则！', '', {}).catch(() => {
            })
            return false
          }
          if (this.individualTaxationData.lastName === '') {
            this.$alert('名（英文或拼音）不符合输入规则！', '', {}).catch(() => {
            })
            return false
          }
          if ((this.individualTaxationData.nowCountry === '' || this.individualTaxationData.nowProvince === '' || this.individualTaxationData.nowCity === '' || this.individualTaxationData.nowAddress === '') && (this.individualTaxationData.nowCountry2 === '' || this.individualTaxationData.nowProvince2 === '' || this.individualTaxationData.nowCity2 === '' || this.individualTaxationData.nowAddress2 === '')) {
            this.$alert('现居住地址录入有误，不能同时为空，请检查！', '', {}).catch(() => {
            })
            return false
          }
          if ((this.individualTaxationData.birthCountry === '' || this.individualTaxationData.birthProvince === '' || this.individualTaxationData.birthCity === '' || this.individualTaxationData.birthAddress === '') && (this.individualTaxationData.birthCountry2 === '' || this.individualTaxationData.birthProvince2 === '' || this.individualTaxationData.city === '' || this.birthCity2 === '')) {
            this.$alert('出生地址录入有误，不能同时为空，请检查！', '', {}).catch(() => {
            })
            return false
          }
          // const reasonCode = this.individualTaxationData.reasonCode
          // const vlistOrg = [
          //   {
          //     method: 'isNotEmpty',
          //     params: [reasonCode],
          //     errorMsg: '值为空'
          //   }
          // ]
          // const resultOrg = execCheck(vlistOrg)
          // if (resultOrg !== 'true') {
          //   if ((!this.individualTaxationData.taxResident || !this.individualTaxationData.taxpayerNo) && (!this.individualTaxationData.taxResident2 || !this.individualTaxationData.taxpayerNo2)) {
          //     this.$alert('税收居民国录入有误，不能同时为空，请检查！', '', {}).catch(() => {})
          //     return false
          //   }
          // } else {
          //   if (!this.individualTaxationData.taxResident && !this.individualTaxationData.taxResident2) {
          //     this.$alert('税收居民国录入有误，不能同时为空，请检查！', '', {}).catch(() => {})
          //     return false
          //   }
          // }
        }
        if (this.contData.disputedFlag === '1' && this.contData.arbitrationCom === '') {
          this.$alert('合同争议处理方式为仲裁，请录入仲裁机构！', '', {}).catch(() => {
          })
          return false
        }
        if (this.accountData.newPayMode === '0' && this.appntData.appntName !== this.accountData.newAccName) {
          this.$alert('首期账户所有人必须为投保人！', '', {}).catch(() => {
          })
          return false
        }
        // 当投保人当前年龄为16周岁（不含）以下且证件类型为“0-身份证”时进行校验
        if (this.appntData.idtype === '0' && this.appntData.age < 16) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 5)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.appntData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当投保人当前年龄为16周岁（含）-25周岁（含）且证件类型为“0-身份证”时进行校验
        if (this.appntData.idtype === '0' && this.appntData.age >= 16 && this.appntData.age <= 25) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 10)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.appntData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当投保人当前年龄为26周岁（含）-45周岁（含）且证件类型为“0-身份证”时进行校验
        if (this.appntData.idtype === '0' && this.appntData.age >= 26 && this.appntData.age <= 45) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 20)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.appntData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 校验香港的时候
        if (this.appntData.idtype === 'G' && this.appntData.nativePlace === 'HKG') {
          if (!this.appntData.idno.match(/^810000\d{8}[0-9A-Z]{4}$/)) {
            this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验澳门的时候
        if (this.appntData.idtype === 'G' && this.appntData.nativePlace === 'MAC') {
          if (!this.appntData.idno.match(/^820000\d{8}[0-9A-Z]{4}$/)) {
            this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验台湾时
        if (this.appntData.idtype === 'H') {
          if ((!this.appntData.idno.match(/^830000\d{8}[0-9A-Z]{4}$/))) {
            this.$message.error('台湾居民居住证的录入格式为830000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验国外永久居留身份证证
        if (this.appntData.idtype === 'I') {
          if ((!this.appntData.idno.match(/^[0-9a-zA-Z]{15}$/)) && (!this.appntData.idno.match(/^[0-9a-zA-Z]{18}$/))) {
            this.$message.error('外国人居留证号码需为15位或者18位数字或字母')
            return
          }
        }
        // 证件类型为港澳台的证件时进行校验
        if ((this.appntData.idtype === 'E') || (this.appntData.idtype === 'G') || (this.appntData.idtype === 'H')) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 5)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.appntData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当投保人当前年龄为0周岁（含）17周岁（含）时进行校验
        if (this.appntData.idtype === 'B' || this.appntData.idtype === 'I') {
          if (this.appntData.age >= 0 && this.appntData.age <= 17) {
            const birthday = this.contData.polApplyDate
            const totalTime = getAfterNYear(birthday, 5)
            const effectiveDate = dataFormat(totalTime)
            if (effectiveDate < this.appntData.idexpDate) {
              this.$message.error('证件有效期不符要求')
              return
            }
          }
        }
        // 当投保人当前年龄为18周岁（含）以上时进行校验
        if (this.appntData.idtype === 'B' || this.appntData.idtype === 'I') {
          if (this.appntData.age >= 18) {
            const birthday = this.contData.polApplyDate
            const totalTime = getAfterNYear(birthday, 10)
            const effectiveDate = dataFormat(totalTime)
            if (effectiveDate < this.appntData.idexpDate) {
              this.$message.error('证件有效期不符要求')
              return
            }
          }
        }
        // 投保人证件类型国外护照或者永久居留证以及港澳台居住证时的有效期处理
        if ((this.appntData.idtype === '1' || this.appntData.idtype === 'B' || this.appntData.idtype === 'E' || this.appntData.idtype === 'G' || this.appntData.idtype === 'H' || this.appntData.idtype === 'I') && (this.appntData.idExpDates === '长期' || this.appntData.idExpDat === '9999-01-01')) {
          this.$message.error('证件有效期不符要求')
          return
        }
        // if (this.accountData.newPayMode === '0' && this.appntData.appntName !== this.accountData.accName) {
        //   this.$alert('续期/续保账户所有人必须为投保人！', '', {}).catch(() => {
        //   })
        //   return false
        // }
        // 如果续期开户行，续期账号，续期姓名不为空且续期交费方式为空时，续期交费方式 默认保存为“银行转账”
        if (this.accountData.payMode === '' && this.accountData.bankCode !== '' && this.accountData.accName !== '' && this.accountData.bankAccNo !== '') {
          this.accountData.payMode = '4'
        }
        if (this.appntData.idtype === 'G') {
          if (this.appntData.appntBirthday) {
            const birthday = getBirthdayByHongKongPermit(this.appntData.idno)
            if (this.appntData.appntBirthday !== birthday) {
              this.$message.error('港澳的居住证的证件号码和出生日期不匹配')
              return
            }
          }
        }
        console.log('校验职业与年龄开始')
        if (this.appntData.occupationCode) {
          const appntOccupationAge = String(this.checkOccupationCodeAndAge(this.appntData.age, this.appntData.occupationCode))
          console.log(appntOccupationAge)
          if (appntOccupationAge !== 'true') {
            this.$message.error(appntOccupationAge)
            return false
          }
          const appntOccupationSex = String(this.checkOccupationCodeAndSex(this.appntData.appntSex, this.appntData.occupationCode))
          console.log(appntOccupationSex)
          if (appntOccupationSex !== 'true') {
            this.$message.error(appntOccupationSex)
            return false
          }
        }
        console.log('校验职业与年龄结束')
        // const a = this.$refs.appntImpart.impartDatas
        // for (var i = 0; i < a.length; i++) {
        //   if (a[i].impartParamModle === '') {
        //   }
        // }
        this.getIdType()
        Promise.all(validList).then(async() => {
          // if (['F', '2', 'C', 'D'].indexOf(this.appntData.idtype) > -1) {
          //   const Bool = await this.$confirm('请确认是否要选择该证件类型进行投保?', '提示', {
          //     confirmButtonText: '确定',
          //     cancelButtonText: '取消',
          //     type: 'warning'
          //   }).catch(() => { return false })
          //   if (!Bool) {
          //     return false
          //   }
          // }
          if (this.appntData.nativePlace === 'CHN' && ['0', '4', '7'].indexOf(this.appntData.idtype) < 0) {
            const Bool = await this.$confirm('国籍为中国用户，请使用0-身份证、4-户口本或7-出生证办理保险业务', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).catch(() => { return false })
            if (!Bool) {
              return false
            }
          }
          const applyPojo = {}
          Object.assign(applyPojo, this.applyPojo)
          Object.assign(applyPojo.lcCont, this.accountData)
          Object.assign(applyPojo.lcAppnt, this.appntData)
          // 设置税收信息
          Object.assign(applyPojo.lcIndividualTaxationPojo, this.individualTaxationData)
          // 设置投保人地址信息
          applyPojo.lcCont.disputedFlag = this.contData.disputedFlag
          applyPojo.lcCont.arbitrationCom = this.contData.arbitrationCom
          // 设置投保人告知信息
          Object.assign(applyPojo.appntImpartList, this.$refs.appntImpart.impartDatas)
          // 设置初始化时，显示的具体步骤
          applyPojo.applyStep = this.contInputStepInsured
          applyPojo.ydAgentPojo = this.ydagent
          // 投被保人为本人,返回投保人页签，更改投保人信息，点击下一步，更新被保人为本人的信息
          // 该段代码是防止被保人为本人的信息已保存后，返回投保人信息，修改投保人信息，此时被保人信息与投保人信息不一致
          // 需要同步start
          if (this.insuredDatas && this.insuredDatas.length > 0) {
            for (let i = 0; i < this.insuredDatas.length; i++) {
              const insured = this.insuredDatas[i]
              if (insured.relationToAppnt === '00') {
                insured.insuredNo = this.appntData.appntNo
                insured.name = this.appntData.appntName
                insured.sex = this.appntData.appntSex
                insured.birthday = this.appntData.appntBirthday
                const age = calAge(this.insuredData.birthday)
                insured.age = age === 0 ? '' : age
                insured.idno = this.appntData.idno
                insured.idtype = this.appntData.idtype
                insured.idExpDates = this.appntData.idExpDates
                insured.idexpDate = this.appntData.idexpDate
                insured.stature = this.appntData.stature === 0 ? '' : this.appntData.stature
                insured.avoirdupois = this.appntData.avoirdupois === 0 ? '' : this.appntData.avoirdupois
                insured.socialInsuFlag = this.appntData.socialInsuFlag
                insured.nativePlace = this.appntData.nativePlace
                insured.yearIncome = this.appntData.yearIncome === 0 ? '' : this.appntData.yearIncome
                insured.incomeSource = this.appntData.incomeSource
                insured.occupationCode = this.appntData.occupationCode
                insured.occupationCodeName = this.appntData.occupationName
                insured.occupationLevel = this.appntData.occupationLevel
                insured.occupationType = this.appntData.occupationType
                insured.lcaddres.postalAddress = this.appntData.lcaddressPojo.postalAddress
                insured.lcaddres.zipCode = this.appntData.lcaddressPojo.zipCode
                insured.lcaddres.phone = this.appntData.lcaddressPojo.phone
                insured.lcaddres.mobile = this.appntData.lcaddressPojo.mobile
                insured.lcaddres.grpName = this.appntData.lcaddressPojo.grpName
                insured.lcaddres.preferredPhoneNum = this.appntData.lcaddressPojo.preferredPhoneNum
                insured.lcaddres.email = this.appntData.lcaddressPojo.email
                insured.denType = this.appntData.denType
                this.insuredData = this.insuredDatas[i]
                applyPojo.lcInsuredList = this.insuredDatas
                this.applyPojo.lcInsuredList = this.insuredDatas
                console.log('进来了吧')
              }
            }
          }
          console.log(this.applyPojo.lcInsuredList)
          // 需要同步end
          saveCont(applyPojo).then(response => {
            const resData = response.data
            console.log(resData)
            if (resData && resData.code === 0) {
              this.applyPojo.id = resData.body
              this.cont.showFlag = false
              this.appnt.showFlag = false
              this.insured.showFlag = false
              // this.product.showFlag = false
              this.insured.showFlag = true
              this.insured.changeFlag = true
              // this.accountData.bankAccNo = ''
              document.body.scrollTop = 0
              document.documentElement.scrollTop = 0
              this.$refs.content.scrollTop = 0
            } else {
              this.$message.error(resData.message)
            }
          })
        })
      },
      async saveTheInsured() {
        const applyPojo = {}
        this.applyPojo.lcInsuredList = this.insuredDatas
        this.applyPojo.activityID = this.activityID
        Object.assign(applyPojo, this.applyPojo)
        checkAddInsured(applyPojo).then(response => {
          const checkinsuredData = response.data
          if (checkinsuredData && checkinsuredData.code === 0) {
            applyPojo.applyStep = this.contInputStepInsured
            // 设置被保人信息
            saveCont(applyPojo).then(response => {
              const resData = response.data
              if (resData && resData.code !== 0) {
                this.$message.error(resData.message)
              } else {
                this.applyPojo.id = resData.body
              }
            })
          } else {
            this.$message.error(checkinsuredData.message)
          }
        })
      },
      checkInsured() {
        // 校验被保人职业编码与年龄性别start
        if (this.insuredData.occupationCode) {
          const insuredOccupationAge = String(this.checkOccupationCodeAndAge(this.insuredData.age, this.insuredData.occupationCode))
          if (insuredOccupationAge !== 'true') {
            this.$message.error(insuredOccupationAge)
            return false
          }
          const insuredOccupationSex = String(this.checkOccupationCodeAndSex(this.insuredData.sex, this.insuredData.occupationCode))
          if (insuredOccupationSex !== 'true') {
            this.$message.error(insuredOccupationSex)
            return false
          }
        }
        // 校验被保人职业编码与年龄性别end
        if (!(this.insuredData.lcpols && this.insuredData.lcpols.length > 0)) {
          this.$message({ message: '请先添加险种信息！', type: 'error' })
          return false
        }
        if (this.insuredData.orgBnfs && this.insuredData.orgBnfs.length > 0) {
          for (let i = 0; i < this.insuredData.lcBnfs.length; i++) {
            if (this.insuredData.lcBnfs[i].bnfGrade === '1') {
              this.$message({ message: '机构为第一受益人时，个人不能作为第一受益人，请修改受益顺序！', type: 'error' })
              return false
            }
          }
        }
        // 借款人意外险校验
        for (let i = 0; i < this.insuredData.lcpols.length; i++) {
          const lcpol = this.insuredData.lcpols[i]
          const riskCode = lcpol.riskCode
          const riskCodeStr = this.borrowerAccidentInsurance.join(',')
          if (!(riskCodeStr.indexOf(riskCode) < 0)) {
            if (!(this.insuredData.orgBnfs && this.insuredData.orgBnfs.length > 0)) {
              this.$message({ message: '请录入受益人类别信息', type: 'error' })
              return false
            }
            const filedNameOrg = {
              bnfGrade: '受益顺位',
              bnfLot: '受益比例',
              bnfNo: '序号',
              bnfType: '受益人类别',
              name: '金融机构名称',
              remark: '受益人形态'
            }
            for (let i = 0; i < this.insuredData.orgBnfs.length; i++) {
              const org = this.insuredData.orgBnfs[i]
              for (const name in org) {
                if (name === 'remark' || name === 'bnfType' || name === 'name') {
                  const valueOrg = String(org[name])
                  const messageOrg = '请填写' + filedNameOrg[name]
                  console.log(messageOrg)
                  const vlistOrg = [
                    {
                      method: 'isNotEmpty',
                      params: [valueOrg],
                      errorMsg: messageOrg
                    }
                  ]
                  const resultOrg = execCheck(vlistOrg)
                  if (resultOrg !== 'true') {
                    this.$message({ showClose: true, message: resultOrg, type: 'error' })
                    return false
                  }
                }
              }
            }
          }
        }
        // 受益人校验 start
        const filedName = {
          bnfNo: '受益人序号', // 不需要校验
          bnfType: '受益人类型',
          name: '受益人姓名',
          sex: '受益人性别',
          birthday: '受益人出生日期',
          idtype: '受益人证件类型',
          idno: '受益人证件号码',
          relationToInsured: '受益人与被保人关系',
          bnfGrade: '受益人受益顺序',
          bnfLot: '受益人受益份额',
          idexpDate: '受益人证件有效期',
          customerType: '受益人客户类型', // 不需要校验,速填
          nativePlace: '受益人国籍',
          grpName: '受益人工作单位',
          contactAddress: '受益人联系地址',
          contactPhone: '受益人联系电话',
          occupationCode: '受益人职业编码',
          occupationName: '职业名称',
          occupationType: '职业类别', // 不需要校验
          occupationLevel: '职业等级' // 不需要校验

        }
        if (this.insuredData.lcBnfs && this.insuredData.lcBnfs.length > 0) {
          const bnfLotObj = {} // 受益人受益份额保存
          for (let i = 0; i < this.insuredData.lcBnfs.length; i++) {
            const lcBnf = this.insuredData.lcBnfs[i]
            for (const name in lcBnf) {
              if (name !== 'bnfNo' && name !== 'customerType' && name !== 'grpName' && name !== 'contactAddress' && name !== 'contactPhone' && name !== 'occupationCode' && name !== 'occupationName' && name !== 'occupationType' && name !== 'occupationLevel' && filedName[name] !== undefined) {
                const value = String(lcBnf[name])
                const message = '请填写' + filedName[name]
                console.log(filedName[name])
                const vlist = [
                  {
                    method: 'isNotEmpty',
                    params: [value],
                    errorMsg: message
                  }
                ]
                const result = execCheck(vlist)
                if (result !== 'true') {
                  this.$message({ showClose: true, message: result, type: 'error' })
                  return false
                }
                if (name === 'bnfLot') { // 受益人受益份额
                  const bnfMessage = '受益人受益份额必须是1-100的正整数'
                  const bnfLotVlist = [
                    {
                      method: 'regular',
                      params: [value, 'PInteger'],
                      errorMsg: bnfMessage
                    }
                  ]
                  const bnfResult = execCheck(bnfLotVlist)
                  if (bnfResult !== 'true') {
                    this.$message({ showClose: true, message: bnfResult, type: 'error' })
                    return false
                  }
                  const objFiledName = lcBnf.bnfGrade
                  if (bnfLotObj[objFiledName]) {
                    bnfLotObj[objFiledName] = bnfLotObj[objFiledName] + parseInt(value)
                  } else {
                    bnfLotObj[objFiledName] = parseInt(value)
                  }
                }
              }
              const age = calAge(lcBnf.birthday)
              // 校验职业，与年龄 、性别
              if (name === 'occupationCode') {
                const occupationCode = String(lcBnf[name])
                if (occupationCode) {
                  const occupationAge = String(this.checkOccupationCodeAndAge(age, occupationCode))
                  if (occupationAge !== 'true') {
                    this.$message.error(occupationAge)
                    return false
                  }
                  const occupationSex = String(this.checkOccupationCodeAndSex(lcBnf.sex, occupationCode))
                  if (occupationSex !== 'true') {
                    this.$message.error(occupationSex)
                    return false
                  }
                }
              }
            }
          }
          const bnfLot1 = bnfLotObj['1']
          const bnfLot2 = bnfLotObj['2']
          const bnfLot3 = bnfLotObj['3']
          const bnfLot4 = bnfLotObj['4']
          const bnfLot5 = bnfLotObj['5']
          if (bnfLot1) {
            if (bnfLot1 !== 100) {
              this.$message({ showClose: true, message: '第一顺序受益人受益份额总和必须为100%', type: 'error' })
              return false
            }
            if (bnfLot2) {
              if (bnfLot2 !== 100) {
                this.$message({ showClose: true, message: '第二顺序受益人受益份额总和必须为100%', type: 'error' })
                return false
              }
              if (bnfLot3) {
                if (bnfLot3 !== 100) {
                  this.$message({ showClose: true, message: '第三顺序受益人受益份额总和必须为100%', type: 'error' })
                  return false
                }
                if (bnfLot4) {
                  if (bnfLot4 !== 100) {
                    this.$message({ showClose: true, message: '第四顺序受益人受益份额总和必须为100%', type: 'error' })
                    return false
                  }
                  if (bnfLot5) {
                    if (bnfLot5 !== 100) {
                      this.$message({ showClose: true, message: '第五顺序受益人受益份额总和必须为100%', type: 'error' })
                      return false
                    }
                  }
                } else {
                  if (bnfLot5) {
                    this.$message({ showClose: true, message: '必须先填写第四顺序受益人，才可填写第5顺序受益人', type: 'error' })
                    return false
                  }
                }
              } else {
                if (bnfLot4 || bnfLot5) {
                  this.$message({ showClose: true, message: '必须先填写第三顺序受益人，才可填写第4、第5顺序受益人', type: 'error' })
                  return false
                }
              }
            } else {
              if (bnfLot3 || bnfLot4 || bnfLot5) {
                this.$message({ showClose: true, message: '必须先填写第二顺序受益人，其他顺位依次填写', type: 'error' })
                return false
              }
            }
          } else {
            if (this.insuredData.orgBnfs && this.insuredData.orgBnfs.length > 0) {
              return true
            } else {
              this.$message({ showClose: true, message: '必须先填写第一顺序受益人，其他顺位依次填写', type: 'error' })
              return false
            }
          }
        }
        if (this.insuredData.lcBnfs && this.insuredData.lcBnfs.length > 0) {
          for (let i = 0; i < this.insuredData.lcBnfs.length; i++) {
            if (!this.insuredData.lcBnfs[i].name.match(/^[\u4e00-\u9fa5]{2,4}$/)) {
              this.$message({ showClose: true, message: '受益人姓名必须为2到20个汉字', type: 'error' })
              return false
            }
          }
        }
        // 受益人校验 end
        return true
      },
      /**
       * 添加一个被保人、包含了被保人下的所有数据（被保人基本信息、受益人信息、被保人告知信息、险种信息）
       **/
      addInsured() {
        // if (this.insuredData.idtype === '4' && this.insuredData.age >= 17) {
        //   this.$alert('户口本只适用于17岁以下的人！', '', {}).catch(() => {
        //   })
        //   return false
        // }
        // if (this.insuredData.idtype === '7' && this.insuredData.age >= 2) {
        //   this.$alert('出生证只适用于2岁以下的人！', '', {}).catch(() => {
        //   })
        //   return false
        // }
        if (this.insuredData.idtype === 'G') {
          if (this.insuredData.birthday) {
            const birthday = getBirthdayByHongKongPermit(this.insuredData.idno)
            if (this.insuredData.birthday !== birthday) {
              this.$message.error('港澳的居住证的证件号码和出生日期不匹配')
              return
            }
          }
        }
        // 校验香港的时候
        if (this.insuredData.idtype === 'G' && this.insuredData.nativePlace === 'HKG') {
          if (!this.insuredData.idno.match(/^810000\d{8}[0-9A-Z]{4}$/)) {
            this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验澳门的时候
        if (this.insuredData.idtype === 'G' && this.insuredData.nativePlace === 'MAC') {
          if (!this.insuredData.idno.match(/^820000\d{8}[0-9A-Z]{4}$/)) {
            this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验台湾时
        if (this.insuredData.idtype === 'H') {
          if ((!this.insuredData.idno.match(/^830000\d{8}[0-9A-Z]{4}$/))) {
            this.$message.error('台湾居民居住证的录入格式为830000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验国外永久居留身份证证
        if (this.insuredData.idtype === 'I') {
          if ((!this.insuredData.idno.match(/^[0-9a-zA-Z]{15}$/)) && (!this.insuredData.idno.match(/^[0-9a-zA-Z]{18}$/))) {
            this.$message.error('外国人居留证号码需为15位或者18位数字或字母')
            return
          }
        }
        // 被保人信息页面被保人年龄大于16嘴或者证件有效类型大于五年时进行逻辑处理
        if (this.insuredData.idtype === '0' && this.insuredData.age < 16) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 5)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.insuredData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当被保人当前年龄为16周岁（含）-25周岁（含）且证件类型为“0-身份证”时进行校验
        if (this.insuredData.idtype === '0' && this.insuredData.age >= 16 && this.insuredData.age <= 25) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 10)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.insuredData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当被保人当前年龄为26周岁（含）-45周岁（含）且证件类型为“0-身份证”时进行校验
        if (this.insuredData.idtype === '0' && this.insuredData.age >= 26 && this.insuredData.age <= 45) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 20)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.insuredData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 证件类型为港澳台的证件时进行校验
        if ((this.insuredData.idtype === 'E') || (this.insuredData.idtype === 'G') || (this.insuredData.idtype === 'H')) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 5)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.insuredData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当投保人当前年龄为0周岁（含）17周岁（含）时进行校验
        if (this.insuredData.idtype === 'B' || this.insuredData.idtype === 'I') {
          if (this.insuredData.age >= 0 && this.insuredData.age <= 17) {
            const birthday = this.contData.polApplyDate
            const totalTime = getAfterNYear(birthday, 5)
            const effectiveDate = dataFormat(totalTime)
            if (effectiveDate < this.insuredData.idexpDate) {
              this.$message.error('证件有效期不符要求')
              return
            }
          }
        }
        // 当投保人当前年龄为18周岁（含）以上时进行校验
        if (this.insuredData.idtype === 'B' || this.insuredData.idtype === 'I') {
          if (this.insuredData.age >= 18) {
            const birthday = this.contData.polApplyDate
            const totalTime = getAfterNYear(birthday, 10)
            const effectiveDate = dataFormat(totalTime)
            if (effectiveDate < this.insuredData.idexpDate) {
              this.$message.error('证件有效期不符要求')
              return
            }
          }
        }
        // 投保人证件类型国外护照或者永久居留证以及港澳台居住证时的有效期处理
        if ((this.insuredData.idtype === '1' || this.insuredData.idtype === 'B' || this.insuredData.idtype === 'E' || this.insuredData.idtype === 'G' || this.insuredData.idtype === 'H' || this.insuredData.idtype === 'I') && (this.insuredData.idExpDates === '长期' || this.insuredData.idExpDat === '9999-01-01')) {
          this.$message.error('证件有效期不符要求')
          return
        }
        this.$refs['insuredData'].validate(async(valid, obj) => {
          if (valid) {
            const validInsure = this.checkInsured()
            if (!validInsure) {
              return false
            }
            if (this.insuredData.idtype === '4' && this.insuredData.age > 16) {
              const Bool = await this.$confirm('被保人证件类型为户口本，户口本仅允许0-16周岁未成年人使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).catch(() => { return false })
              if (!Bool) {
                return false
              }
            }
            if (this.insuredData.idtype === '7' && this.insuredData.age > 2) {
              const Bool = await this.$confirm('被保人证件类型为出生证，出生证仅允许0-2周岁儿童使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).catch(() => { return false })
              if (!Bool) {
                return false
              }
            }
            if (this.insuredData.nativePlace === 'CHN' && ['0', '4', '7'].indexOf(this.insuredData.idtype) < 0) {
              const Bool = await this.$confirm('被保人国籍为中国用户，请使用0-身份证、4-户口本或7-出生证办理保险业务', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).catch(() => { return false })
              if (!Bool) {
                return false
              }
            }
            if (this.insuredData.lcBnfs && this.insuredData.lcBnfs.length > 0) {
              for (let i = 0; i < this.insuredData.lcBnfs.length; i++) {
                const lcBnf = this.insuredData.lcBnfs[i]
                const ageLcBnf = calAge(lcBnf.birthday)
                const idTypeLcBnf = lcBnf.idtype
                const nativePlace = lcBnf.nativePlace
                const idexpDate = lcBnf.idexpDate // 有效期间
                const idnos = lcBnf.idno
                const applyDate = this.contData.polApplyDate
                const totalFive = getAfterNYear(applyDate, 5) // 五年
                const toFive = dataFormat(totalFive) // 五年有效期
                const totalTime = getAfterNYear(applyDate, 10) // 十年
                const effectiveDate = dataFormat(totalTime) // 十年有效期
                const totalTimeAll = getAfterNYear(applyDate, 20) // 二十年
                const effDate = dataFormat(totalTimeAll) // 二十年有效期
                if (idTypeLcBnf === '0' && ageLcBnf < 16) { // 小于16岁
                  if (toFive < idexpDate) {
                    this.$message.error('证件有效期不符要求')
                    return false
                  }
                }
                if (idTypeLcBnf === '0' && ageLcBnf >= 16 && ageLcBnf <= 25) { // 16~25岁
                  if (effectiveDate < idexpDate) {
                    this.$message.error('证件有效期不符要求')
                    return false
                  }
                }
                if (idTypeLcBnf === '0' && ageLcBnf >= 26 && ageLcBnf <= 45) { // 26~45岁
                  if (effDate < idexpDate) {
                    this.$message.error('证件有效期不符要求')
                    return false
                  }
                }
                // 校验香港的时候
                if (idTypeLcBnf === 'G' && nativePlace === 'HKG') {
                  if (!idnos.match(/^810000\d{8}[0-9A-Z]{4}$/)) {
                    this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
                    return
                  }
                }
                // 校验澳门的时候
                if (idTypeLcBnf === 'G' && nativePlace === 'MAC') {
                  if (!idnos.match(/^820000\d{8}[0-9A-Z]{4}$/)) {
                    this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
                    return
                  }
                }
                // 校验台湾时
                if (idTypeLcBnf === 'H') {
                  if ((!idnos.match(/^830000\d{8}[0-9A-Z]{4}$/))) {
                    this.$message.error('台湾居民居住证的录入格式为830000+出生日期+4位数字或字母')
                    return
                  }
                }
                // 校验国外永久居留身份证证
                if (idTypeLcBnf === 'I') {
                  if ((!idnos.match(/^[0-9a-zA-Z]{15}$/)) && (!idnos.match(/^[0-9a-zA-Z]{18}$/))) {
                    this.$message.error('外国人居留证号码需为15位或者18位数字或字母')
                    return
                  }
                }
                // 证件类型为港澳台的证件时进行校验
                if ((idTypeLcBnf === 'E') || (idTypeLcBnf === 'G') || (idTypeLcBnf === 'H')) {
                  const totalTime = getAfterNYear(applyDate, 5)
                  const effectiveDate1 = dataFormat(totalTime)
                  if (effectiveDate1 < idexpDate) {
                    this.$message.error('证件有效期不符要求')
                    return
                  }
                }
                // 当投保人当前年龄为0周岁（含）17周岁（含）时进行校验
                if (idTypeLcBnf === 'B' || idTypeLcBnf === 'I') {
                  if (ageLcBnf >= 0 && ageLcBnf <= 17) {
                    const totalTime = getAfterNYear(applyDate, 5)
                    const effectiveDate2 = dataFormat(totalTime)
                    if (effectiveDate2 < idexpDate) {
                      this.$message.error('证件有效期不符要求')
                      return
                    }
                  }
                }
                // 当投保人当前年龄为18周岁（含）以上时进行校验
                if (idTypeLcBnf === 'B' || idTypeLcBnf === 'I') {
                  if (ageLcBnf >= 18) {
                    const totalTime = getAfterNYear(applyDate, 10)
                    const effectiveDate3 = dataFormat(totalTime)
                    if (effectiveDate3 < idexpDate) {
                      this.$message.error('证件有效期不符要求')
                      return
                    }
                  }
                }
                // 证件类型为B-港澳居民来往大陆通行证时
                if (idTypeLcBnf === 'B') {
                  if ((!idnos.match(/^[H, M]{1}\d{8}$/))) {
                    this.$message.error('证件类型为B-港澳居民来往大陆通行证时，证件号码需为（字母H或M+8位数字）')
                    return
                  }
                }
                if (nativePlace === 'CHN' && ['0', '4', '7'].indexOf(idTypeLcBnf) < 0) {
                  const Bool = await this.$confirm('受益人国籍为中国用户，请使用0-身份证、4-户口本或7-出生证办理保险业务', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).catch(() => { return false })
                  if (!Bool) {
                    return false
                  }
                }
                if (idTypeLcBnf === '4' && ageLcBnf > 16) {
                  const Bool = await this.$confirm('受益人证件类型为户口本，户口本仅允许0-16周岁未成年人使用', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).catch(() => { return false })
                  if (!Bool) {
                    return false
                  }
                }
                if (idTypeLcBnf === '7' && ageLcBnf > 2) {
                  const Bool = await this.$confirm('受益人证件类型为出生证，出生证仅允许0-2周岁儿童使用', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).catch(() => { return false })
                  if (!Bool) {
                    return false
                  }
                }
              }
            }
            const insured = JSON.parse(JSON.stringify(this.insuredData))
            if (insured.orgBnfs && insured.orgBnfs.length > 0) {
              for (let s = 0; s < insured.orgBnfs.length; s++) {
                if (insured.orgBnfs[s].bnfLot) {
                  insured.orgBnfs[s].bnfLot = insured.orgBnfs[s].bnfLot / 100
                }
              }
            }
            if (insured.lcBnfs && insured.lcBnfs.length > 0) {
              for (let z = 0; z < insured.lcBnfs.length; z++) {
                if (insured.lcBnfs[z].bnfLot) {
                  insured.lcBnfs[z].bnfLot = insured.lcBnfs[z].bnfLot / 100
                }
              }
            }
            if (this.insuredDatas && this.insuredDatas.length > 0) {
              for (let i = 0; i < this.insuredDatas.length; i++) {
                const insuredOther = this.insuredDatas[i] // 已添加的其他被保人
                if (insuredOther.name === insured.name && insuredOther.sex === insured.sex && insuredOther.birthday === insured.birthday && insuredOther.idno === insured.idno && insuredOther.idtype === insured.idtype) {
                  this.$message({ message: '该被被保人已添加，不能添加同一个被保人', type: 'error' })
                  return false
                }
              }
            }
            insured.insuredImpartList = this.$refs.insuredImpart.impartDatas
            this.$refs.insuredImpart.impartDatas = []
            this.insuredDatas.push(insured)
            this.$refs['insuredData'].resetFields()
            this.setDefaultInsured()
            this.insuredBtnController.push({
              modifyBtnShowFlag: false,
              addBtnShowFlag: true
            })
            await this.saveTheInsured()
            this.$message({ message: '添加成功', type: 'success' })
          }
        })
      },
      /**
       * 修改被保险人信息
       **/
      async modifyInsured() {
        // if (this.insuredData.idtype === '4' && this.insuredData.age >= 17) {
        //   this.$alert('户口本只适用于17岁以下的人！', '', {}).catch(() => {
        //   })
        //   return false
        // }
        // if (this.insuredData.idtype === '7' && this.insuredData.age >= 2) {
        //   this.$alert('出生证只适用于2岁以下的人！', '', {}).catch(() => {
        //   })
        //   return false
        // }
        if (this.insuredData.idtype === 'G') {
          if (this.insuredData.birthday) {
            const birthday = getBirthdayByHongKongPermit(this.insuredData.idno)
            if (this.insuredData.birthday !== birthday) {
              this.$message.error('港澳的居住证的证件号码和出生日期不匹配')
              return
            }
          }
        }
        // 被保人信息页面被保人年龄大于16嘴或者证件有效类型大于五年时进行逻辑处理
        if (this.insuredData.idtype === '0' && this.insuredData.age < 16) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 5)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.insuredData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当被保人当前年龄为16周岁（含）-25周岁（含）且证件类型为“0-身份证”时进行校验
        if (this.insuredData.idtype === '0' && this.insuredData.age >= 16 && this.insuredData.age <= 25) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 10)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.insuredData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当被保人当前年龄为26周岁（含）-45周岁（含）且证件类型为“0-身份证”时进行校验
        if (this.insuredData.idtype === '0' && this.insuredData.age >= 26 && this.insuredData.age <= 45) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 20)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.insuredData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 校验香港的时候
        if (this.insuredData.idtype === 'G' && this.insuredData.nativePlace === 'HKG') {
          if (!this.insuredData.idno.match(/^810000\d{8}[0-9A-Z]{4}$/)) {
            this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验澳门的时候
        if (this.insuredData.idtype === 'G' && this.insuredData.nativePlace === 'MAC') {
          if (!this.insuredData.idno.match(/^820000\d{8}[0-9A-Z]{4}$/)) {
            this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验台湾时
        if (this.insuredData.idtype === 'H') {
          if ((!this.insuredData.idno.match(/^830000\d{8}[0-9A-Z]{4}$/))) {
            this.$message.error('台湾居民居住证的录入格式为830000+出生日期+4位数字或字母')
            return
          }
        }
        // 校验国外永久居留身份证证
        if (this.insuredData.idtype === 'I') {
          if ((!this.insuredData.idno.match(/^[0-9a-zA-Z]{15}$/)) && (!this.insuredData.idno.match(/^[0-9a-zA-Z]{18}$/))) {
            this.$message.error('外国人居留证号码需为15位或者18位数字或字母')
            return
          }
        }
        // 证件类型为港澳台的证件时进行校验
        if ((this.insuredData.idtype === 'E') || (this.insuredData.idtype === 'G') || (this.insuredData.idtype === 'H')) {
          const birthday = this.contData.polApplyDate
          const totalTime = getAfterNYear(birthday, 5)
          const effectiveDate = dataFormat(totalTime)
          if (effectiveDate < this.insuredData.idexpDate) {
            this.$message.error('证件有效期不符要求')
            return
          }
        }
        // 当投保人当前年龄为0周岁（含）17周岁（含）时进行校验
        if (this.insuredData.idtype === 'B' || this.insuredData.idtype === 'I') {
          if (this.insuredData.age >= 0 && this.insuredData.age <= 17) {
            const birthday = this.contData.polApplyDate
            const totalTime = getAfterNYear(birthday, 5)
            const effectiveDate = dataFormat(totalTime)
            if (effectiveDate < this.insuredData.idexpDate) {
              this.$message.error('证件有效期不符要求')
              return
            }
          }
        }
        // 当投保人当前年龄为18周岁（含）以上时进行校验
        if (this.insuredData.idtype === 'B' || this.insuredData.idtype === 'I') {
          if (this.insuredData.age >= 18) {
            const birthday = this.contData.polApplyDate
            const totalTime = getAfterNYear(birthday, 10)
            const effectiveDate = dataFormat(totalTime)
            if (effectiveDate < this.insuredData.idexpDate) {
              this.$message.error('证件有效期不符要求')
              return
            }
          }
        }
        // 投保人证件类型国外护照或者永久居留证以及港澳台居住证时的有效期处理
        if ((this.insuredData.idtype === '1' || this.insuredData.idtype === 'B' || this.insuredData.idtype === 'E' || this.insuredData.idtype === 'G' || this.insuredData.idtype === 'H' || this.insuredData.idtype === 'I') && (this.insuredData.idExpDates === '长期' || this.insuredData.idExpDat === '9999-01-01')) {
          this.$message.error('证件有效期不符要求')
          return
        }
        this.$refs['insuredData'].validate(async(valid, obj) => {
          if (valid) {
            const validInsure = this.checkInsured()
            if (!validInsure) {
              return false
            }
            if (this.insuredData.idtype === '4' && this.insuredData.age > 16) {
              const Bool = await this.$confirm('被保人证件类型为户口本，户口本仅允许0-16周岁未成年人使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).catch(() => { return false })
              if (!Bool) {
                return false
              }
            }
            if (this.insuredData.idtype === '7' && this.insuredData.age > 2) {
              const Bool = await this.$confirm('被保人证件类型为出生证，出生证仅允许0-2周岁儿童使用', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).catch(() => { return false })
              if (!Bool) {
                return false
              }
            }
            if (this.insuredData.nativePlace === 'CHN' && ['0', '4', '7'].indexOf(this.insuredData.idtype) < 0) {
              const Bool = await this.$confirm('被保人国籍为中国用户，请使用0-身份证、4-户口本或7-出生证办理保险业务', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).catch(() => { return false })
              if (!Bool) {
                return false
              }
            }
            if (this.insuredData.lcBnfs && this.insuredData.lcBnfs.length > 0) {
              for (let i = 0; i < this.insuredData.lcBnfs.length; i++) {
                const lcBnf = this.insuredData.lcBnfs[i]
                const ageLcBnf = calAge(lcBnf.birthday)
                const idTypeLcBnf = lcBnf.idtype
                const nativePlace = lcBnf.nativePlace
                const idexpDate = lcBnf.idexpDate // 有效期间
                const idnos = lcBnf.idno
                const applyDate = this.contData.polApplyDate
                const totalFive = getAfterNYear(applyDate, 5) // 五年
                const toFive = dataFormat(totalFive) // 五年有效期
                const totalTime = getAfterNYear(applyDate, 10) // 十年
                const effectiveDate = dataFormat(totalTime) // 十年有效期
                const totalTimeAll = getAfterNYear(applyDate, 20) // 二十年
                const effDate = dataFormat(totalTimeAll) // 二十年有效期
                if (idTypeLcBnf === '0' && ageLcBnf < 16) { // 小于16岁
                  if (toFive < idexpDate) {
                    this.$message.error('证件有效期不符要求')
                    return false
                  }
                }
                if (idTypeLcBnf === '0' && ageLcBnf >= 16 && ageLcBnf <= 25) { // 16~25岁
                  if (effectiveDate < idexpDate) {
                    this.$message.error('证件有效期不符要求')
                    return false
                  }
                }
                if (idTypeLcBnf === '0' && ageLcBnf >= 26 && ageLcBnf <= 45) { // 26~45岁
                  if (effDate < idexpDate) {
                    this.$message.error('证件有效期不符要求')
                    return false
                  }
                }
                // 校验香港的时候
                if (idTypeLcBnf === 'G' && nativePlace === 'HKG') {
                  if (!idnos.match(/^810000\d{8}[0-9A-Z]{4}$/)) {
                    this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
                    return
                  }
                }
                // 校验澳门的时候
                if (idTypeLcBnf === 'G' && nativePlace === 'MAC') {
                  if (!idnos.match(/^820000\d{8}[0-9A-Z]{4}$/)) {
                    this.$message.error('港澳居住证的录入格式为810000/820000+出生日期+4位数字或字母')
                    return
                  }
                }
                // 校验台湾时
                if (idTypeLcBnf === 'H') {
                  if ((!idnos.match(/^830000\d{8}[0-9A-Z]{4}$/))) {
                    this.$message.error('台湾居民居住证的录入格式为830000+出生日期+4位数字或字母')
                    return
                  }
                }
                // 校验国外永久居留身份证证
                if (idTypeLcBnf === 'I') {
                  if ((!idnos.match(/^[0-9a-zA-Z]{15}$/)) && (!idnos.match(/^[0-9a-zA-Z]{18}$/))) {
                    this.$message.error('外国人居留证号码需为15位或者18位数字或字母')
                    return
                  }
                }
                // 证件类型为港澳台的证件时进行校验
                if ((idTypeLcBnf === 'E') || (idTypeLcBnf === 'G') || (idTypeLcBnf === 'H')) {
                  const totalTime = getAfterNYear(applyDate, 5)
                  const effectiveDate1 = dataFormat(totalTime)
                  if (effectiveDate1 < idexpDate) {
                    this.$message.error('证件有效期不符要求')
                    return
                  }
                }
                // 当投保人当前年龄为0周岁（含）17周岁（含）时进行校验
                if (idTypeLcBnf === 'B' || idTypeLcBnf === 'I') {
                  if (ageLcBnf >= 0 && ageLcBnf <= 17) {
                    const totalTime = getAfterNYear(applyDate, 5)
                    const effectiveDate2 = dataFormat(totalTime)
                    if (effectiveDate2 < idexpDate) {
                      this.$message.error('证件有效期不符要求')
                      return
                    }
                  }
                }
                // 当投保人当前年龄为18周岁（含）以上时进行校验
                if (idTypeLcBnf === 'B' || idTypeLcBnf === 'I') {
                  if (ageLcBnf >= 18) {
                    const totalTime = getAfterNYear(applyDate, 10)
                    const effectiveDate3 = dataFormat(totalTime)
                    if (effectiveDate3 < idexpDate) {
                      this.$message.error('证件有效期不符要求')
                      return
                    }
                  }
                }
                // 证件类型为B-港澳居民来往大陆通行证时
                if (idTypeLcBnf === 'B') {
                  if ((!idnos.match(/^[H, M]{1}\d{8}$/))) {
                    this.$message.error('证件类型为B-港澳居民来往大陆通行证时，证件号码需为（字母H或M+8位数字）')
                    return
                  }
                }
                if (nativePlace === 'CHN' && ['0', '4', '7'].indexOf(idTypeLcBnf) < 0) {
                  const Bool = await this.$confirm('受益人国籍为中国用户，请使用0-身份证、4-户口本或7-出生证办理保险业务', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).catch(() => { return false })
                  if (!Bool) {
                    return false
                  }
                }
                if (idTypeLcBnf === '4' && ageLcBnf > 16) {
                  const Bool = await this.$confirm('受益人证件类型为户口本，户口本仅允许0-16周岁未成年人使用', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).catch(() => { return false })
                  if (!Bool) {
                    return false
                  }
                }
                if (idTypeLcBnf === '7' && ageLcBnf > 2) {
                  const Bool = await this.$confirm('受益人证件类型为出生证，出生证仅允许0-2周岁儿童使用', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).catch(() => { return false })
                  if (!Bool) {
                    return false
                  }
                }
              }
            }
            if (this.insuredDatas && this.insuredDatas.length > 0) {
              for (let i = 0; i < this.insuredDatas.length; i++) {
                if (this.insuredDatas[i].insuredNo === this.insuredData.insuredNo && this.insuredData.relationToAppnt === '00') {
                  this.insuredData.name = this.insuredDatas[i].name
                  break
                }
              }
            }
            const insured = JSON.parse(JSON.stringify(this.insuredData))
            if (insured.orgBnfs && insured.orgBnfs.length > 0) {
              for (let s = 0; s < insured.orgBnfs.length; s++) {
                if (insured.orgBnfs[s].bnfLot) {
                  insured.orgBnfs[s].bnfLot = insured.orgBnfs[s].bnfLot / 100
                }
              }
            }
            if (insured.lcBnfs && insured.lcBnfs.length > 0) {
              for (let z = 0; z < insured.lcBnfs.length; z++) {
                if (insured.lcBnfs[z].bnfLot) {
                  insured.lcBnfs[z].bnfLot = insured.lcBnfs[z].bnfLot / 100
                }
              }
            }
            if (this.insuredDatas && this.insuredDatas.length > 0) {
              for (let i = 0; i < this.insuredDatas.length; i++) {
                if (this.insuredSelectNo !== i) {
                  const insuredOther = this.insuredDatas[i] // 已添加的其他被保人
                  if (insuredOther.name === insured.name && insuredOther.sex === insured.sex && insuredOther.birthday === insured.birthday && insuredOther.idno === insured.idno && insuredOther.idtype === insured.idtype) {
                    this.$message({ message: '该被被保人已添加，被保人不能为同一人', type: 'error' })
                    return false
                  }
                }
              }
            }
            // if (['F', '2', 'C', 'D'].indexOf(this.insuredData.idtype) > -1) {
            //   const Bool = await this.$confirm('请确认是否要选择该证件类型进行投保?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            //   }).catch(() => { return false })
            //   if (!Bool) {
            //     return false
            //   }
            // }
            insured.insuredImpartList = this.$refs.insuredImpart.impartDatas
            this.$refs.insuredImpart.impartDatas = []
            this.insuredDatas[this.insuredSelectNo] = insured
            this.$refs['insuredData'].resetFields()
            this.setDefaultInsured()
            // 保存完以后，需要将被保人列表中操作的按钮和被保人最下方按钮恢复默认。默认状态:操作列表-非修改  下方按钮-添加被保人
            this.insuredBtnController[this.insuredSelectNo].addBtnShowFlag = true
            this.insuredBtnController[this.insuredSelectNo].modifyBtnShowFlag = false
            this.insuredSaveBtn.addBtnShowFlag = true
            this.insuredSaveBtn.modifyBtnShowFlag = false
            await this.saveTheInsured()
            this.$message({ message: '修改成功', type: 'success' })
          }
        })
      },
      /**
       * 删除一行被保人信息 该删除，会把被保人下的所有数据包括基础信息、被保险人告知、受益人信息、险种信息都删除
       * @param index 下表
       * @param rows 被保人信息数组
       */
      deleteInsured(index, rows) {
        this.$confirm('是否删除该被保险人?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          var applyPojo = {}
          this.applyPojo.lcInsuredList = this.insuredDatas
          this.applyPojo.activityID = this.activityID
          Object.assign(applyPojo, this.applyPojo)
          applyPojo.lcInsuredList = [rows[index]]
          const checkdelete = await checkDeleteInsured(applyPojo)
          const checkdeleteData = checkdelete.data
          console.log(checkdelete)
          if (checkdeleteData && checkdeleteData.code === 0) {
            rows.splice(index, 1)
            this.setDefaultInsured()
            await this.saveTheInsured()
            this.$refs['insuredData'].resetFields()
            this.insuredSaveBtn.addBtnShowFlag = true
            this.insuredSaveBtn.modifyBtnShowFlag = false
            this.$message.success('删除成功')
          } else {
            this.$message.error(checkdeleteData.message)
          }
        })
      },
      // 获取投保保险年限
      getInformation() {
        var applyPojo = {}
        Object.assign(applyPojo, this.applyPojo)
        applyPojo.applyStep = this.contInputStepInsured
        new Promise((resolve, reject) => {
          doubleRecording(applyPojo).then(response => {
            const data = response.data
            console.log(data, '后台返回的值')
            if (data.code === 0) {
              if (this.entryOrEasy !== 'entry') {
                this.modifys()
              } else {
                this.inputConfirm()
              }
            } else if (data.code === 17010) {
              this.$confirm('本次投保计划符合保监双录要求，需确认已完成双录作业，请确认是否继续提交!', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: ''
                })
                if (this.entryOrEasy !== 'entry') {
                  this.modifys()
                } else {
                  this.inputConfirm()
                }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                })
                return false
              })
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 录入完毕时的校验
       **/
      toExamine() {
        const contNo = this.contData.prtNo
        new Promise((resolve, reject) => {
          toExamineQuery(contNo).then(response => {
            const data = response.data
            if (data.body !== null) {
              this.getInformation()
              // if (this.applyPojo.lcCont.doubleRecordOrNot === '01') {
              //   this.$confirm('本次投保计划符合保监双录要求，需确认已完成双录作业，请确认是否继续提交!', '提示', {
              //     confirmButtonText: '确定',
              //     cancelButtonText: '取消',
              //     type: 'warning'
              //   }).then(() => {
              //     this.$message({
              //       type: 'success',
              //       message: ''
              //     })
              //     this.inputConfirm()
              //   }).catch(() => {
              //     this.$message({
              //       type: 'info',
              //       message: '已取消'
              //     })
              //   })
              //   return false
              // } else {
              //   this.inputConfirm()
              // }
            } else {
              // this.inputConfirm()
              this.getInformation()
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       * 保存被保人信息
       **/
      inputConfirm() {
        const h = this.$createElement
        const confirm = [h('p', { style: 'margin-bottom:8px;font-weight:700' }, '请核对投保人信息：'), h('p', null, [h('span', null, '姓名：'), h('span', null, this.appntData.appntName)]), h('p', null, [h('span', null, '证件号码：'), h('span', null, this.appntData.idno)]), h('p', null, [h('span', null, '联系地址：'), h('span', null, this.appntData.lcaddressPojo.postalAddress)])]
        if (this.accountData.newBankAccNo) {
          confirm.push(h('p', null, [h('span', null, '首期账号：'), h('span', null, this.accountData.newBankAccNo)]))
        } else {
          confirm.push(h('p', null, [h('span', null, '首期账号：'), h('span', null, '无')]))
        }
        if (this.accountData.bankAccNo) {
          confirm.push(h('p', null, [h('span', null, '续期账户：'), h('span', null, this.accountData.bankAccNo)]))
        } else {
          confirm.push(h('p', null, [h('span', null, '续期账户：'), h('span', null, '无')]))
        }
        if (this.insuredDatas && this.insuredDatas.length > 0) {
          confirm.push(h('p', { style: 'margin:8px 0;font-weight:700' }, '请核对被保人信息：'))
          for (let i = 0; i < this.insuredDatas.length; i++) {
            const insured = this.insuredDatas[i]
            const sequenceNoArray = this.sequenceNo.filter((item) => {
              return item.code === insured.sequenceNo
            })
            if (sequenceNoArray && sequenceNoArray.length > 0) {
              confirm.push(h('p', { style: 'margin:5px 0;' }, sequenceNoArray[0].codeName + '：'))
            }
            confirm.push(h('p', null, [h('span', null, '姓名：'), h('span', null, insured.name)]))
            confirm.push(h('p', null, [h('span', null, '证件号码：'), h('span', null, insured.idno)]))
          }
        }
        this.$msgbox({
          title: '请确认',
          message: h('p', null, confirm),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true
              instance.confirmButtonLoading = false
              var applyPojo = {}
              Object.assign(applyPojo, this.applyPojo)
              // 设置初始化时，显示的具体步骤
              applyPojo.applyStep = this.contInputStepInsured
              done()
              inputConfirm(applyPojo).then(response => {
                const resData = response.data
                console.log(resData)
                if (resData && resData.code === 0) {
                  this.cont.showFlag = false
                  this.appnt.showFlag = false
                  this.insured.showFlag = true
                  this.$message.success('录入完成')
                  // this.product.showFlag = true
                  // this.product.changeFlag = true
                  if (this.scanFlag === '1') {
                    this.$router.push({ name: 'newEntry' })
                  } else {
                    this.$router.push({ name: 'noScanEntry' })
                  }
                } else {
                  this.$message.error(resData.message)
                }
              })
            } else {
              done()
            }
          }
        }).then(action => {})
      },
      /**
       * 通用方法-删除一行
       */
      deleteRow(index, rows) {
        rows.splice(index, 1)
      },
      /**
       *  选中被保人列表中的单选按钮时，显示对应被保人的信息
       * @param index
       */
      canModifyInsured(index) {
        for (let i = 0; i < this.insuredBtnController.length; i++) {
          if (index === i) {
            this.insuredBtnController[i].addBtnShowFlag = false
            this.insuredBtnController[i].modifyBtnShowFlag = true
          } else {
            this.insuredBtnController[i].addBtnShowFlag = true
            this.insuredBtnController[i].modifyBtnShowFlag = false
          }
        }
        this.insuredSaveBtn.addBtnShowFlag = false
        this.insuredSaveBtn.modifyBtnShowFlag = true
        this.insuredSelectNo = index
        const insured = JSON.parse(JSON.stringify(this.insuredDatas[index]))
        if (!insured.age) {
          if (insured.birthday) {
            insured.age = calAge(insured.birthday)
          }
        }
        if (insured.idexpDate === '9999-01-01') {
          insured.idExpDates = '长期'
        } else {
          insured.idExpDates = '短期'
        }
        this.insuredData = insured
        this.$refs.insuredImpart.impartDatas = this.applyPojo.lcInsuredList[index].insuredImpartList
        if (this.insuredData && this.insuredData.lcBnfs && this.insuredData.lcBnfs.length) {
          for (var i = 0; i < this.insuredData.lcBnfs.length; i++) {
            this.iLIdTypeNativePlace.push({
              nativeplace: this.nativeplace
            })
            this.lcBnfsNativePlace(i, this.insuredData.lcBnfs[i])
            if (this.insuredData.lcBnfs[i].bnfLot) {
              this.insuredData.lcBnfs[i].bnfLot = this.insuredData.lcBnfs[i].bnfLot * 100
            }
          }
        }
        if (this.insuredData && this.insuredData.orgBnfs && this.insuredData.orgBnfs.length) {
          for (var c = 0; c < this.insuredData.orgBnfs.length; c++) {
            if (this.insuredData.orgBnfs[c].bnfLot) {
              this.insuredData.orgBnfs[c].bnfLot = this.insuredData.orgBnfs[c].bnfLot * 100
            }
          }
        }
        this.changeInsuredIdType()
      },
      /**
       *  选中被保人列表中的单选按钮时，显示对应被保人的信息
       * @param index
       */
      canAddInsured(index) {
        this.insuredBtnController[index].addBtnShowFlag = true
        this.insuredBtnController[index].modifyBtnShowFlag = false
        this.insuredSaveBtn.addBtnShowFlag = true
        this.insuredSaveBtn.modifyBtnShowFlag = false
        this.setDefaultInsured()
        this.$refs['insuredData'].resetFields()
        // this.modifyInsured()
      },
      /**
       *  添加一行机构受益人信息
       */
      addOrgBnfRow() {
        let name = ''
        if (this.contData.saleChnl === '04' && this.contData.sellType === '02' || this.contData.saleChnl === '03' && this.contData.sellType === '02') {
          name = this.ydagent.agentComName
        }
        const risk = this.insuredData.lcpols.find(function(item) {
          return item.riskCode === '15110'
        })
        if (risk) {
          name = risk.loanOrg
        }
        this.insuredData.orgBnfs.push({
          bnfGrade: '', // 受益顺位
          bnfLot: '', // 受益比例
          bnfNo: '', // 序号
          bnfType: '', // 受益人类别
          name: name, // 金融机构名称
          remark: '' // 前面投保没有记录受益人形态，这里暂时用remark记录
        })
      },
      /**
       *  添加一行受益人信息
       */
      addLcBnfRow() {
        this.insuredData.lcBnfs.push({
          bnfNo: '', // 受益人序号
          bnfType: '', // 受益人类型
          name: '', // 受益人姓名
          sex: '', // 受益人性别
          birthday: '', // 受益人出生日期
          idtype: '', // 受益人证件类型
          idno: '', // 受益人证件号码
          relationToInsured: '', // 受益人与被保人关系
          bnfGrade: '', // 受益人受益顺序
          bnfLot: '', // 受益人受益份额
          idexpDate: '', // 受益人证件有效期
          customerType: '', // 受益人客户类型[投保人 or 被保人]
          nativePlace: '', // 受益人国籍
          grpName: '', // 受益人工作单位
          contactAddress: '', // 受益人联系地址
          contactPhone: '', // 受益人联系电话
          occupationCode: '', // 职业编码
          occupationName: '', // 职业名称
          occupationType: '', // 职业类别
          occupationLevel: '' // 职业等级
        })
        this.iLIdTypeNativePlace.push({
          nativeplace: this.nativeplace
        })
      },
      orgBnfIdNo(index) {
        console.log(this.insuredData.lcBnfs[index], 'orgBnfIdNo')
        if (this.insuredData.lcBnfs[index].idtype === '') {
          this.$alert('请先选择证件类型!', '', {}).catch(() => {
          })
          return false
        } else {
          if (this.insuredData.lcBnfs[index].idno === '') {
            this.$alert('请填写证件号码!', '', {}).catch(() => {
            })
            return false
          } else {
            // // 如果证件类型是身份证，判断身份证是否填写正确
            // if (this.insuredData.lcBnfs[index].idtype === '0') {
            //   const value = this.insuredData.lcBnfs[index].idno
            //   const vlist1 = [
            //     {
            //       method: 'isIdCard',
            //       params: [value],
            //       errorMsg: '身份证填写错误'
            //     }
            //   ]
            //   const result = execCheck(vlist1)
            //   if (result !== 'true') {
            //     this.$alert(result, '', {}).catch(() => {
            //     })
            //     return false
            //   }
            //   const idno = this.insuredData.lcBnfs[index].idno
            //   const birthday = getBirthdatByIdNo(idno)
            //   const birthday2 = this.insuredData.lcBnfs[index].birthday
            //   const vlist2 = [
            //     {
            //       method: 'compareTimeIsEqual',
            //       params: [birthday, birthday2],
            //       errorMsg: '身份证号码与出生日期不符'
            //     }
            //   ]
            //   const resultBirth = execCheck(vlist2)
            //   if (resultBirth !== 'true') {
            //     if (this.insuredData.lcBnfs[index].birthday === '' || this.insuredData.lcBnfs[index].sex === '') {
            //       this.insuredData.lcBnfs[index].birthday = birthday
            //       const sex = getSexByIDNo(idno)
            //       this.insuredData.lcBnfs[index].sex = sex
            //     } else {
            //       this.$confirm('身份证号码与出生日期不符，是否自动更改出生日期?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //       }).then(() => {
            //         this.insuredData.lcBnfs[index].birthday = birthday
            //         const sex = getSexByIDNo(idno)
            //         if (sex !== this.insuredData.lcBnfs[index].sex) {
            //           this.$confirm('身份证号码与性别不符，是否自动更改性别?', '提示', {
            //             confirmButtonText: '确定',
            //             cancelButtonText: '取消',
            //             type: 'warning'
            //           }).then(() => {
            //             this.insuredData.lcBnfs[index].sex = sex
            //           }).catch(() => {
            //             this.insuredData.lcBnfs[index].idno = ''
            //           })
            //         }
            //       }).catch(() => {
            //         this.insuredData.lcBnfs[index].idno = ''
            //       })
            //     }
            //   }
            // }
            // 如果证件类型是身份证和户口本，判断身份证是否填写正确
            if (this.insuredData.lcBnfs[index].idtype === '0' || this.insuredData.lcBnfs[index].idtype === '4' || this.insuredData.lcBnfs[index].idtype === 'C') {
              let idTypeName = ''
              if (this.insuredData.lcBnfs[index].idtype === '0') {
                idTypeName = '身份证需为15/18位数字或字母!'
              }
              if (this.insuredData.lcBnfs[index].idtype === '4') {
                idTypeName = '户口本需为15/18位数字或字母!'
              }
              if (this.insuredData.lcBnfs[index].idtype === 'C') {
                idTypeName = '临时身份证需为15/18位数字或字母!'
              }
              const value = this.insuredData.lcBnfs[index].idno
              const vlist1 = [
                {
                  method: 'isIdCard',
                  params: [value],
                  errorMsg: idTypeName
                }
              ]
              const result = execCheck(vlist1)
              if (result !== 'true') {
                this.$alert(result, '', {}).catch(() => {})
                return false
              }
              const idno = this.insuredData.lcBnfs[index].idno
              const birthday = getBirthdatByIdNo(idno)
              const birthday2 = this.insuredData.lcBnfs[index].birthday
              const vlist2 = [
                {
                  method: 'compareTimeIsEqual',
                  params: [birthday, birthday2],
                  errorMsg: idTypeName + '号码与出生日期不符'
                }
              ]
              const resultBirth = execCheck(vlist2)
              if (resultBirth !== 'true') {
                if (this.insuredData.lcBnfs[index].birthday === '' || this.insuredData.lcBnfs[index].age === '' || this.insuredData.lcBnfs[index].sex === '') {
                  this.insuredData.lcBnfs[index].birthday = birthday
                  const age = calAge(birthday)
                  this.insuredData.lcBnfs[index].age = age
                  const sex = getSexByIDNo(idno)
                  this.insuredData.lcBnfs[index].sex = sex
                } else {
                  this.$confirm(idTypeName + '号码与出生日期不符，是否自动更改受益人出生日期?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.insuredData.lcBnfs[index].birthday = birthday
                    const age = calAge(birthday)
                    this.insuredData.lcBnfs[index].age = age
                    const sex = getSexByIDNo(idno)
                    if (sex !== this.insuredData.lcBnfs[index].sex) {
                      this.$confirm(idTypeName + '号码与性别不符，是否自动更改受益人性别?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        this.insuredData.lcBnfs[index].sex = sex
                      }).catch(() => {
                        this.insuredData.lcBnfs[index].idno = ''
                      })
                    }
                  }).catch(() => {
                    this.insuredData.lcBnfs[index].idno = ''
                  })
                }
              }
            } else if ((this.insuredData.lcBnfs[index].idtype === '2') && (this.insuredData.lcBnfs[index].idno.length < 8 || this.insuredData.lcBnfs[index].idno.length > 18)) {
              this.$alert('军人证号码需为8到18位字符', '', {}).catch(() => {})
              return false
            } else if ((this.insuredData.lcBnfs[index].idtype === 'A') && (this.insuredData.lcBnfs[index].idno.length < 8 || this.insuredData.lcBnfs[index].idno.length > 18)) {
              this.$alert('士兵证号码需为8到18位字符', '', {}).catch(() => {})
              return false
            } else if ((this.insuredData.lcBnfs[index].idtype === 'D') && (this.insuredData.lcBnfs[index].idno.length < 6 || this.insuredData.lcBnfs[index].idno.length > 18)) {
              this.$alert('警官证号码需为6到18位字符', '', {}).catch(() => {})
              return false
            } else if (this.insuredData.lcBnfs[index].idtype === '7' && (!this.insuredData.lcBnfs[index].idno.match(/^[A-Z]{1}\d{9}$/))) {
              this.$alert('出生证号码有误', '', {}).catch(() => {})
              return false
            } else if (this.insuredData.lcBnfs[index].idtype === '1') {
              if (this.insuredData.lcBnfs[index].idno.length < 8 || this.insuredData.lcBnfs[index].idno.length > 18) {
                this.$alert('护照号码需为8-18位字符!', '', {}).catch(() => {})
                return false
              }
              // if (!(this.appntData.idno.match(/^(14|15)\d{7}$/) || this.appntData.idno.match(/^[S|D|G|E]\d{8}$/) || this.appntData.idno.match(/^(P\.|S\.)\d{7}$/))) {
              //   return callback(new Error('护照号码填写有误!'))
              // }
            } else if (this.insuredData.lcBnfs[index].idtype === 'F' && (!/^[C]\d{8}$/.test(this.insuredData.lcBnfs[index].idno))) {
              this.$alert('中国居民来往港澳台通行证号码需为C+8位数字!', '', {}).catch(() => {})
              return false
            } else if (this.insuredData.lcBnfs[index].idtype === 'B' && (this.insuredData.lcBnfs[index].idno.length < 8)) {
              this.$alert('港澳居民来往大陆通行证号码位数有误', '', {}).catch(() => {})
              return false
            } else if (this.insuredData.lcBnfs[index].idtype === 'E' && (this.insuredData.lcBnfs[index].idno.length !== 8)) {
              this.$alert('台湾居民来往大陆通行证位数有误', '', {}).catch(() => {})
              return false
            }
          }
        }
      },
      /**
       *  客户内部编号下拉框
       */
      getSequenceNo() {
        const jsonData = {
          codeType: 'quenceNo'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              this.sequenceNo = data.body
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       *  受益人类型下拉框
       */
      getBnfType() {
        const jsonData = {
          codeType: 'bnftype'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              this.bnfType = data.body
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       *  受益人顺位下拉框
       */
      getBnfGrade() {
        const jsonData = {
          codeType: 'bnforder'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              this.bnfGrade = data.body
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       *  受益人速填下拉框
       */
      getCustomerType() {
        const jsonData = {
          codeType: 'customertype'
        }
        new Promise((resolve, reject) => {
          getCode(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              console.log(data.body)
              this.customerType = data.body
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      /**
       *  受益人选择投保人或者被保险人，带出投保人或者被保险人的证件号等相关信息
       */
      customerSelect(row) {
        console.log(this.customerType)
        if (row.customerType === 'A') {
          row.name = this.appntData.appntName
          row.sex = this.appntData.appntSex
          row.birthday = this.appntData.appntBirthday
          row.idtype = this.appntData.idtype
          row.idno = this.appntData.idno
          row.idexpDate = this.appntData.idexpDate
          row.nativePlace = this.appntData.nativePlace
          row.grpName = this.appntData.lcaddressPojo.grpName
          row.contactAddress = this.appntData.lcaddressPojo.postalAddress
          row.ContactPhone = this.appntData.lcaddressPojo.preferredPhoneNum
          row.occupationCode = this.appntData.occupationType
          row.occupationName = this.appntData.occupationCode
        } else if (row.customerType === 'I') {
          row.name = this.insuredData.name
          row.sex = this.insuredData.sex
          row.birthday = this.insuredData.birthday
          row.idtype = this.insuredData.idtype
          row.idno = this.insuredData.idno
          row.idexpDate = this.insuredData.idexpDate
          row.nativePlace = this.insuredData.nativePlace
          row.grpName = this.insuredData.lcaddres.grpName
          row.contactAddress = this.insuredData.lcaddres.postalAddress
          row.ContactPhone = this.insuredData.lcaddres.preferredPhoneNum
          row.occupationCode = this.insuredData.occupationType
          row.occupationName = this.insuredData.occupationCode
        } else {
          console.log('未选择')
        }
      },
      /**
       *  机构受益人选择受益形态时，设置受益顺位和比例
       */
      selectBnfType(row) {
        row.bnfLot = '100'
        row.bnfGrade = '1'
      },
      /**
       *  被保人职业查询
       */
      showJobQueryDialogForInsured() {
        this.occupationQuery.showFlag = true
        this.occupationQuery.queryFrom = 'insured'
        if (this.insuredData.occupationCode !== '' && this.insuredData.occupationCode !== undefined) {
          this.occupationInitParam.occupationCode = this.insuredData.occupationCode
          this.occupationInitParam.occupationName = this.insuredData.occupationCodeName
          this.occupationInitParam.occupationType = this.insuredData.occupationType
          this.occupationInitParam.occupationLevel = this.insuredData.occupationLevel
        }
      },
      /**
       *  s受益人职业查询
       */
      showJobQueryDialogForBnf(index) {
        this.occupationQuery.showFlag = true
        this.occupationQuery.queryFrom = 'bnf'
        this.occupationQuery.bnfNo = index
        if (this.insuredData.lcBnfs[index].occupationCode !== '') {
          this.occupationInitParam.occupationCode = this.this.insuredData.lcBnfs[index].occupationCode
          this.occupationInitParam.occupationName = this.this.insuredData.lcBnfs[index].occupationName
          this.occupationInitParam.occupationType = this.this.insuredData.lcBnfs[index].occupationType
          this.occupationInitParam.occupationLevel = this.this.insuredData.lcBnfs[index].occupationLevel
        }
      },
      /**
       *  被保人信息清空
       */
      setDefaultInsured() {
        // insuredDefault 必须与insuredData内初始属性一直，否则会报错。 不一个个赋值，是为了减少浏览器对对象的深watch
        const insuredDefault = {
          sequenceNo: '',
          relationToAppnt: '',
          insuredNo: '',
          name: '',
          sex: '',
          birthday: '',
          age: '',
          idtype: '',
          idno: '',
          idExpDates: '',
          idexpDate: '',
          stature: '',
          avoirdupois: '',
          nativePlace: '',
          occupationType: '', // 职业类别
          occupationLevel: '', // 职业级别
          occupationCode: '', // 职业编码
          occupationCodeName: '', // 职业名称
          yearIncome: '',
          incomeSource: '',
          specialPopFlag: '',
          socialInsuFlag: '',
          currency: '', // 币种
          lcaddres: {
            postalAddress: '',
            zipCode: '',
            phone: '',
            mobile: '',
            grpName: '',
            preferredPhoneNum: '',
            email: ''
          },
          orgBnfs: [],
          lcBnfs: [],
          lcpols: []
        }
        this.insuredData = insuredDefault
      },
      /**
       *  当被保人与投保人关系选择为本人时，被保人信息自动带出
       */
      setInsuredByAppnt(value) {
        if (value === '00') {
          this.insuredData.insuredNo = this.appntData.appntNo
          this.insuredData.name = this.appntData.appntName
          this.insuredData.sex = this.appntData.appntSex
          this.insuredData.birthday = this.appntData.appntBirthday
          const age = calAge(this.insuredData.birthday)
          this.insuredData.age = age === 0 ? '' : age
          this.insuredData.idno = this.appntData.idno
          this.insuredData.idtype = this.appntData.idtype
          this.insuredData.idExpDates = this.appntData.idExpDates
          this.insuredData.idexpDate = this.appntData.idexpDate
          this.insuredData.stature = this.appntData.stature === 0 ? '' : this.appntData.stature
          this.insuredData.avoirdupois = this.appntData.avoirdupois === 0 ? '' : this.appntData.avoirdupois
          this.insuredData.socialInsuFlag = this.appntData.socialInsuFlag
          this.insuredData.nativePlace = this.appntData.nativePlace
          this.insuredData.yearIncome = this.appntData.yearIncome === 0 ? '' : this.appntData.yearIncome
          this.insuredData.incomeSource = this.appntData.incomeSource
          this.insuredData.occupationCode = this.appntData.occupationCode
          this.insuredData.occupationCodeName = this.appntData.occupationName
          this.insuredData.occupationLevel = this.appntData.occupationLevel
          this.insuredData.occupationType = this.appntData.occupationType
          this.insuredData.lcaddres.postalAddress = this.appntData.lcaddressPojo.postalAddress
          this.insuredData.lcaddres.zipCode = this.appntData.lcaddressPojo.zipCode
          this.insuredData.lcaddres.phone = this.appntData.lcaddressPojo.phone
          this.insuredData.lcaddres.mobile = this.appntData.lcaddressPojo.mobile
          this.insuredData.lcaddres.grpName = this.appntData.lcaddressPojo.grpName
          this.insuredData.lcaddres.preferredPhoneNum = this.appntData.lcaddressPojo.preferredPhoneNum
          this.insuredData.lcaddres.email = this.appntData.lcaddressPojo.email
          this.insuredData.denType = this.appntData.denType
        }
      },
      /**
       * 同投保人按钮，自动带出联系地址
       */
      setAddressInfoByAppnt() {
        this.insuredData.lcaddres.postalAddress = this.appntData.lcaddressPojo.postalAddress
        this.insuredData.lcaddres.zipCode = this.appntData.lcaddressPojo.zipCode
        /* this.insuredData.lcaddres.phone = this.appntData.lcaddressPojo.phone
        this.insuredData.lcaddres.mobile = this.appntData.lcaddressPojo.mobile
        this.insuredData.lcaddres.grpName = this.appntData.lcaddressPojo.grpName
        this.insuredData.lcaddres.preferredPhoneNum = this.appntData.lcaddressPojo.preferredPhoneNum
        this.insuredData.lcaddres.email = this.appntData.lcaddressPojo.email */
      },
      /**
       *  保存险种信息
       */
      async saveProduct() {
      /*        if (this.$refs.proposalInput.$refs.risk.formData.amnt && !/^\d+\.\d\d$/.test(this.$refs.proposalInput.$refs.risk.formData.amnt)) {
          this.$message.error('保额输入格式错误！')
          return false
        }*/
        this.loading = true
        const riskCode = this.$refs.proposalInput.proposalData.riskCode
        // 通用校验，会根据子险种组件中的校验规则，对所选择的险种做校验
        if (!this.proposalCheckBeforeSave(riskCode)) {
          this.loading = false
          return
        }
        if (riskCode === '16110' || riskCode === '12060' || riskCode === '16180') {
          if (this.$refs.proposalInput.$refs.risk.formData.payEndYear > 900) {
            this.$message.error('不允许购买该附加险！', 'error')
            this.loading = false
            return false
          }
        }
        // 准备后台参数
        this.proposalPojo.lcInsuredPojo = this.insuredData
        this.proposalPojo.lcContPojo = this.applyPojo.lcCont
        this.proposalPojo.lcAppntPojo = this.applyPojo.lcAppnt
        const lcpol = this.$refs.proposalInput.$refs.risk.formData
        if (this.lcpolSelectNo !== '') {
          lcpol.polNo = this.polNo
        }
        if (riskCode === '15210' || riskCode === '17090') {
          const insuPlanList = this.$refs.proposalInput.$refs.risk.insuPlanList || this.$refs.proposalInput.$refs.risk.salesList
          const lcdutys = []
          console.log(this.$refs.proposalInput.$refs.risk.formData.insuYear)
          const insuYear = this.$refs.proposalInput.$refs.risk.formData.insuYear
          const insuYearFlag = this.$refs.proposalInput.$refs.risk.formData.insuYearFlag
          const payEndYear = this.$refs.proposalInput.$refs.risk.formData.payEndYear
          const payEndYearFlag = this.$refs.proposalInput.$refs.risk.formData.payEndYearFlag
          let amntSum = 0
          insuPlanList.forEach(function(item) {
            if (item.readonly === false) {
              lcdutys.push({ dutyCode: item.dutyCode, amnt: item.bonus, insuYear, insuYearFlag, payEndYear, payEndYearFlag, standbyFlag3: item.dutyType
              })
              amntSum += parseInt(item.bonus)
            }
          })
          lcpol.lcdutys = lcdutys
          lcpol.amnt = amntSum
        }
        if (riskCode === '16220') {
          const dutyCode = this.$refs.proposalInput.$refs.risk.formData.dutyCode
          const lcdutys = []
          console.log(this.$refs.proposalInput.$refs.risk.formData.insuYear)
          const insuYear = this.$refs.proposalInput.$refs.risk.formData.insuYear
          const insuYearFlag = this.$refs.proposalInput.$refs.risk.formData.insuYear === '70' ? 'A' : 'Y'
          const payEndYear = this.$refs.proposalInput.$refs.risk.formData.payEndYear
          const payEndYearFlag = this.$refs.proposalInput.$refs.risk.formData.payEndYearFlag
          lcdutys.push({ dutyCode: dutyCode, insuYear, insuYearFlag, payEndYear, payEndYearFlag })
          lcpol.lcdutys = lcdutys
        }
        if (riskCode === '16230') {
          const insuPlanList = this.$refs.proposalInput.$refs.risk.insuPlanList || this.$refs.proposalInput.$refs.risk.salesList
          const lcdutys = []
          const insuYear = this.$refs.proposalInput.$refs.risk.formData.insuYear
          const insuYearFlag = this.$refs.proposalInput.$refs.risk.formData.insuYear === '70' ? 'A' : 'Y'
          const payEndYearFlag = this.$refs.proposalInput.$refs.risk.formData.payEndYearFlag
          let amSum = 0
          insuPlanList.forEach(function(item) {
            if (item.readonly === false) {
              lcdutys.push({ dutyCode: item.dutyCode, amnt: item.amnt, insuYear, insuYearFlag, payEndYear: item.payEndYear, payEndYearFlag, standbyFlag3: item.dutyType
              })
              amSum += parseFloat(item.amnt)
            }
          })
          lcpol.lcdutys = lcdutys
          lcpol.amnt = amSum
        }
        if (riskCode === '15110') {
          lcpol.loanContNo = this.contData.prtNo
          // 姚俊需要
          if (this.contData.saleChnl === '03') {
            lcpol.agemcom = this.ydagent.agentCom
          }
        }
        lcpol.currency = this.applyPojo.lcCont.currency
        // if (lcpol.lcdutys) {
        //   lcpol.lcdutys.push({ currency: this.applyPojo.lcCont.currency })
        // }
        if (lcpol.lcdutys) {
          for (let i = 0; i < lcpol.lcdutys.length; i++) {
            lcpol.lcdutys[i].currency = this.applyPojo.lcCont.currency
          }
        }
        this.proposalPojo.lcPolPojo = lcpol
        // 请求后台服务
        if (this.mainRiskCode !== '') {
          lcpol.mainRiskCode = this.mainRiskCode
        }
        const res = await saveProposal(this.proposalPojo)
        const data = res.data
        console.log('保存险种', data)
        if (data.code === 0) {
          // 根据是否有被选择的险种行数，判断是新增还是修改
          const lcpols = Object.assign([], this.insuredData.lcpols)
          if (this.lcpolSelectNo === '' && this.mainRiskCode === '') {
            console.log('添加主险')
            lcpols.push(data.body)
          } else if (this.lcpolSelectNo === '' && this.mainRiskCode !== '') {
            console.log('添加附加险')
            let len = 0
            for (let i = 0; i < lcpols.length; i++) {
              if (lcpols[i].mainRiskCode === this.mainRiskCode) {
                len = i
              }
            }
            lcpols.splice(len + 1, 0, data.body)
          } else {
            lcpols[this.lcpolSelectNo] = data.body
            console.log('编辑')
            console.log(this.mainRiskCode, this.lcpolSelectNo)
            const riskCode = lcpols[this.lcpolSelectNo].riskCode
            let immunity = {}
            let i
            for (i = 0; i < lcpols.length; i++) {
              if (lcpols[i].riskCode === '12060' && lcpols[i].mainRiskCode === riskCode) {
                immunity = lcpols[i]
                immunity.payEndYear = immunity.insuYear = lcpols[this.lcpolSelectNo].payEndYear - 1
                console.log(lcpols[this.lcpolSelectNo].prem)
                immunity.amnt = lcpols[this.lcpolSelectNo].prem
                delete immunity.lcGetPojos
                delete immunity.lcPremPojos
                delete immunity.lcdutys
                break
              }
            }
            console.log(this.mainRiskCode)
            if (this.mainRiskCode === immunity.mainRiskCode && immunity.riskCode) {
              console.log('laile')
              this.proposalPojo.lcPolPojo = immunity
              const res = await saveProposal(this.proposalPojo)
              const data = res.data
              if (data.code === 0) {
                lcpols[i] = data.body
              }
            }
          }
          this.insuredData.lcpols = lcpols
          await this.saveTheInsured()
          this.$message({ message: '险种保存成功', type: 'success' })
          this.proposalInput.showFlag = false
          this.loading = false
        } else {
          this.loading = false
          this.$message.error(data.message)
        }

        console.log('保存产品')
      },
      /**
       * 初始化主险个数
       **/
      async initMainRiskNum(riskCode) {
        const res = await getSub(riskCode)
        const data = res.data
        if (data.code === 0) {
          this.riskMap['risk_' + riskCode] = data.body
          const riskMapString = JSON.stringify(this.riskMap)
          setRiskMap(riskMapString)
        }
      },
      /**
       * 根据险种编码，去调不同险种组件的校验方法
       **/
      proposalCheckBeforeSave(riskCode) {
        if (!this.$refs.proposalInput.proposalCheck()) {
          return false
        } else {
          if (!this.$refs.proposalInput.$refs.risk.riskCheck()) {
            return false
          }
        }
        return true
      },
      addPolRow(type) {
        this.lcpolSelectNo = ''
        this.proposalInput.showFlag = true
        if (this.insuredData.lcpols === null) {
          this.insuredData.lcpols = []
        }
        const insuredData = Object.assign({}, this.insuredData)
        this.proposalInputInitParams.lcinsured = insuredData
        this.proposalInputInitParams.lcpol = {}
        this.proposalInputInitParams.riskCode = ''
        this.proposalInputInitParams.riskName = ''
        this.proposalInputInitParams.mainRiskCode = type
        this.mainRiskCode = type
        this.proposalInputInitParams.insuredData = this.insuredData
        this.proposalInputInitParams.appntData = this.appntData
        this.proposalInputInitParams.lcCont = this.applyPojo.lcCont
        if (type !== '') {
          for (let i = 0; i < this.insuredData.lcpols.length; i++) {
            if (this.insuredData.lcpols[i].riskCode === type) {
              const insuredDataLcpol = Object.assign({}, this.insuredData.lcpols[i])
              insuredDataLcpol.addInsured = this.appntData.appntName
              this.proposalInputInitParams.mainRiskLcpol = insuredDataLcpol
            }
          }
        }
        this.proposalInputInitParams.disabled = false
      },
      isFullBucket(riskCode, mainRiskCode) {
        return riskCode === mainRiskCode
      /*        if (riskCode !== mainRiskCode) {
          return false
        } else {
          let len = 0
          for (const risk of this.insuredData.lcpols) {
            if (risk.riskCode !== risk.mainRiskCode && riskCode === risk.mainRiskCode) {
              len++
            }
          }
          let riskMap = getRiskMap()
          riskMap = JSON.parse(riskMap)
          if (!riskMap || !riskMap['risk_' + riskCode]) {
            await this.initMainRiskNum(riskCode)
          }
          riskMap = getRiskMap()
          riskMap = JSON.parse(riskMap)
          console.log(riskCode, mainRiskCode, '2')
          console.log(mainRiskCode === riskCode && riskMap && riskMap['risk_' + riskCode] &&
            riskMap['risk_' + riskCode].length > 0 && len !== riskMap['risk_' + riskCode].length)
          return mainRiskCode === riskCode && riskMap && riskMap['risk_' + riskCode] &&
            riskMap['risk_' + riskCode].length > 0 && len !== riskMap['risk_' + riskCode].length
        }*/
      },
      modifyPol(index) {
        this.proposalInput.showFlag = true
        this.lcpolSelectNo = index
        const insuredData = Object.assign({}, this.insuredData)
        this.proposalInputInitParams.lcinsured = insuredData
        this.proposalInputInitParams.insuredData = this.insuredData
        this.proposalInputInitParams.appntData = this.appntData
        this.proposalInputInitParams.riskCode = insuredData.lcpols[index].riskCode
        this.proposalInputInitParams.riskName = insuredData.lcpols[index].riskName
        this.proposalInputInitParams.lcpol = insuredData.lcpols[index]
        this.proposalInputInitParams.activityID = this.applyPojo.activityID
        this.polNo = insuredData.lcpols[index].polNo
        this.proposalInputInitParams.disabled = true
        if (insuredData.lcpols[index].mainRiskCode) {
          const mainRiskCode = insuredData.lcpols[index].mainRiskCode
          this.mainRiskCode = mainRiskCode
          this.proposalInputInitParams.mainRiskCode = mainRiskCode
          for (let i = 0; i < this.insuredData.lcpols.length; i++) {
            if (this.insuredData.lcpols[i].riskCode === mainRiskCode) {
              const insuredDataLcpol = Object.assign({}, this.insuredData.lcpols[i])
              insuredDataLcpol.addInsured = this.appntData.appntName
              this.proposalInputInitParams.mainRiskLcpol = insuredDataLcpol
            }
          }
        }
      },
      /**
       * 删除一行
       * @param index 下表
       * @param rows
       * */
      async deletePol(index, rows) {
        console.log('第几个：' + rows[index].riskCode)
        const mainRiskcode = rows[index].riskCode
        rows.splice(index, 1)
        /*        for (const i in rows) {
          const row = rows[i]
          if (row.mainRiskCode === mainRiskcode && row.riskCode !== mainRiskcode) {
            rows.splice(rows.indexOf(row), 1)
          }
        }*/
        const rowsCopy = rows.filter((row) => {
          return !(row.mainRiskCode === mainRiskcode && row.riskCode !== mainRiskcode)
        })
        console.log(rowsCopy)
        if (this.insuredDatas.length !== 0) {
          this.insuredDatas[this.insuredSelectNo].lcpols = rowsCopy
        }
        this.insuredData.lcpols = rowsCopy
        await this.saveTheInsured()
        const insuredData = Object.assign({}, this.insuredData)
        this.proposalInputInitParams.lcinsured = insuredData
        this.proposalInputInitParams.lcpol = {}
        this.proposalInputInitParams.riskCode = ''
        this.proposalInputInitParams.riskName = ''
        this.$message('删除成功')
      },
      /**
       * 删除主险提示框
       * @param index 下表
       * @param rows
       * */
      delConfirm(index, rows) {
        const mainRiskcode = rows[index].mainRiskCode
        const riskcode = rows[index].riskCode
        const addRisk = this.insuredData.lcpols.some(function(item) {
          return item.mainRiskCode === riskcode && item.riskCode !== item.mainRiskCode
        })
        console.log(addRisk)
        if (riskcode === mainRiskcode && addRisk) {
          this.$confirm('若删除主险，附加险将一并删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deletePol(index, rows)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          this.deletePol(index, rows)
        }
      },
      formatterPayEndYearColumn(cellValue) {
        if (cellValue.payEndYear === 1000) {
          if (cellValue.riskCode === '16220' || cellValue.riskCode === '16230') {
            return '一次性交清'
          }
          return '趸交'
        } else if (cellValue.riskCode === '15210' || cellValue.riskCode === '17070' || cellValue.riskCode === '15190' || cellValue.riskCode === '15200' || cellValue.riskCode === '17090' || cellValue.riskCode === '15180') {
          if (cellValue.payEndYearFlag === 'Y') {
            return '年交'
          } else {
            return '一次交清'
          }
        } else if (cellValue.payIntv === '0' && cellValue.riskCode !== '15180') {
          return '趸交'
        } else {
          return cellValue.payEndYear + cellValue.payEndYearFlag
        }
      },
      formatterInsuYearYearColumn(cellValue) {
        if (cellValue.insuYear === 1000) {
          return '终身'
        } else {
          return cellValue.insuYear + cellValue.insuYearFlag
        }
      },
      formatterOccupationalPlusFeeColumn(cellValue) {
        if (cellValue.occupationalPlusFee === '' || cellValue.occupationalPlusFee === null || cellValue.occupationalPlusFee === undefined) {
          return '-'
        } else {
          return cellValue.occupationalPlusFee
        }
      },
      formatterCurrencyColumn(cellValue) {
        if (cellValue.currency === '' || cellValue.currency === null || cellValue.currency === undefined) {
          return '01-人民币'
        } else {
          return cellValue.currency === '01' ? '01-人民币' : cellValue.currency === '13' ? '13-港币' : cellValue.currency === '14' ? '14-美元' : cellValue.currency === '81' ? '81-澳门元' : cellValue.currency
        }
      },
      isShow(val) {
        this[val] = !this[val]
      },
      photoQuery() { // 影像件查询
        console.log('影像件查询')
        const { href } = this.$router.resolve({
          name: 'videoInformation',
          query: {
            contNo: this.applyPojo.contNo,
            loadFlag: this.loadFlag
          }
        })
        console.log(href, '影像件查询地址')
        window.open(href, '_blank')
      },
      noteQuery() { // 记事本查看
        const { href } = this.$router.resolve({
          name: 'noteQuery',
          query: {
            prtNo: this.contData.prtNo,
            activityID: this.activityID,
            missionId: this.applyPojo.missionID,
            subMissionId: this.applyPojo.subMissionID,
            otherNoType: '1',
            loadFlag: this.loadFlag
          }
        })
        window.open(href, '_blank')
      },
      problemEntry() { // 问题件录入
        const { href } = this.$router.resolve({
          name: 'problemEntry',
          query: {
            contNo: this.applyPojo.contNo,
            prtNo: this.contData.prtNo,
            missionId: this.applyPojo.missionID,
            subMissionId: this.applyPojo.subMissionID,
            activityID: this.activityID,
            loadFlag: this.loadFlag
          }
        })
        window.open(href, '_blank')
      },
      problemQuery() { // 问题件查询
        const { href } = this.$router.resolve({
          name: 'problemQuerys',
          query: {
            contNo: this.applyPojo.contNo,
            loadFlag: this.loadFlag
          }
        })
        window.open(href, '_blank')
      },
      signQuery() {
        // this.$alert('签名不存在', '', {
        //   confirmButtonText: '确定'
        // })
        this.showSignFlag = !this.showSignFlag
        this.coordinate.isCrop = false
        this.changeSignFlag = true
      },
      queryCustomerInfoByFive() {
        if (this.appntData.appntName !== '' && this.appntData.appntSex !== '' && this.appntData.appntBirthday !== '' && this.appntData.idtype !== '' && this.appntData.idno !== '') {
          console.log('五项要素')
          const jsonData = {
            name: this.appntData.appntName,
            sex: this.appntData.appntSex,
            birthday: this.appntData.appntBirthday,
            idType: this.appntData.idtype,
            idNo: this.appntData.idno
          }
          new Promise((resolve, reject) => {
            queryCustomerInfoByFive(jsonData).then(response => {
              const data = response.data
              if (data.code === 0) {
                console.log(data)
                if (data.body !== null) {
                  console.log(data.body)
                  this.appntData.idexpDate = data.body.idexpDate
                  this.appntData.stature = data.body.stature === 0 ? '' : data.body.stature
                  this.appntData.avoirdupois = data.body.avoirdupois === 0 ? '' : data.body.avoirdupois
                  this.appntData.socialInsuFlag = data.body.socialInsuFlag
                  this.appntData.nativePlace = data.body.nativePlace
                  this.appntData.lcaddressPojo.grpName = data.body.grpName
                  this.appntData.yearIncome = data.body.yearIncome === 0 ? '' : data.body.yearIncome
                  this.appntData.incomeSource = data.body.incomeSource
                  this.appntData.specialPopFlag = data.body.specialPopFlag
                  /* this.appntData.occupationType = data.body.occupationType
                  this.appntData.occupationLevel = data.body.occupationLevel
                  this.appntData.occupationCode = data.body.occupationCode
                  this.appntData.occupationName = data.body.occupationName*/
                }
              } else {
                this.$message.error(data.message)
              }
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        }
      },
      queryBank(type) {
        let jsonData
        if (type === 1) {
          jsonData = {
            customerNo: this.appntData.appntNo,
            bankAccNo: this.accountData.newBankAccNo
          }
        } else {
          jsonData = {
            customerNo: this.appntData.appntNo,
            bankAccNo: this.accountData.bankAccNo
          }
        }
        setTimeout(function() {
          new Promise((resolve, reject) => {
            getDetail(jsonData).then(response => {
              const data = response.data
              if (data.code === 0) {
                console.log(data)
                if (data.body !== null) {
                  console.log(data.body)
                  if (type === 1) {
                    this.accountData.newAccName = data.body.AccName
                    this.accountData.newBankCode = data.body.BankCode
                    // this.theSameToFirstAccount()
                  } else {
                    this.accountData.accName = data.body.AccName
                    this.accountData.bankCode = data.body.BankCode
                  }
                }
              } else {
                this.$message.error(data.message)
              }
              resolve(data)
            }).catch(error => {
              reject(error)
            })
          })
        }, 1000)
      },
      getHomeAddressByAppntZip() {
        const jsonData = {
          postCode: this.appntData.lcaddressPojo.zipCode
        }
        new Promise((resolve, reject) => {
          getHomeAddressByZip(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              console.log(data)
              if (data.body !== '') {
                console.log(data.body)
                this.appntData.lcaddressPojo.postalAddress = data.body
              }
            } else {
              this.$message.error(data.message)
            }
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      getHomeAddressByInsuredZip() {
        const jsonData = {
          postCode: this.insuredData.lcaddres.zipCode
        }
        new Promise((resolve, reject) => {
          getHomeAddressByZip(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) {
              console.log(data)
              if (data.body !== '') {
                console.log(data.body)
                this.insuredData.lcaddres.postalAddress = data.body
              }
            } else {
              this.$message.error(data.message)
            }
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      resetForm() {
        this.appntData = {
          appntNo: '', // 投保人客户号
          appntName: '', // 投保人姓名
          appntSex: '', // 投保人性别
          appntBirthday: '', // 投保人出生日期
          age: '', // 投保人年龄
          idtype: '', // 投保人证件类型
          idno: '', // 投保人证件号码
          idExpDates: '',
          idexpDate: '', // 投保人证件有效期
          stature: '', // 身高
          avoirdupois: '', // 体重
          specialPopFlag: '0', // 特殊人群标识
          nativePlace: '', // 投保人国籍
          lcaddressPojo: {
            postalAddress: '', // 投保人联系地址
            zipCode: '', // 投保人邮政编码
            phone: '', // 投保人固定电话
            mobile: '', // 投保人手机
            grpName: '', // 工作单位
            email: '', // 投保人邮件地址
            preferredPhoneNum: '' // 投保人首选联系电话
          },
          occupationCode: '', // 投保人职业编码
          occupationType: '', // 投保人职业级别编码
          occupationLevel: '', // 投保人职业级别名称
          occupationName: '', // 投保人职业名称
          yearIncome: '', // 年收入
          incomeSource: '', // 投保人收入来源
          // relationToInsured: '', // 投保人与被保人关系：是被保人**
          socialInsuFlag: '', // 投保人社保信息
          affirmInputFlag: '' // 确认栏是否录入
        }
      },
      followImage(objCode) {
        if (this.points.hasOwnProperty(objCode)) {
          // 这里将所有坐标点重置为0，是为了防止同一个点获取焦点无法随动的问题
          this.coordinate.x1 = 0
          this.coordinate.y1 = 0
          this.coordinate.x2 = 0
          this.coordinate.y2 = 0
          const point = this.points[objCode]
          const picIndex = parseInt(point.picIndex)
          if (picIndex <= this.imagesList.length) {
            this.coordinate.picIndex = picIndex
            this.coordinate.isCrop = true
            this.coordinate.x1 = point.x1
            this.coordinate.y1 = point.y1
            this.coordinate.x2 = point.x2
            this.coordinate.y2 = point.y2
          } else {
            this.coordinate.isCrop = false
          }
        } else {
          this.coordinate.isCrop = false
        }
      },
      querySalesList(val1) { // 查询业务员
        returnResult(val1).then(response => {
          const resData = response.data
          if (resData && resData.code === 0) {
            if (resData.body) {
              const agent = {
                agentQueryResult: resData.body
              }
              this.setAgentinfo(agent)
              // this.agent.agentName = resData.body.agentName
              // this.agent.agentGroup = resData.body.agentGroup
              // this.agent.groupName = resData.body.groupName
              // this.agent.manageCom = resData.body.manageCom
            } else {
              this.$message('没有返回结果')
            }
          } else {
            if (resData.message) {
              this.$message.error(resData.message)
            } else {
              this.$message.error('没有返回结果')
            }
          }
        })
      },
      agentCodeChange(val1) {
        // console.log(val1, 'agentCodeChange')
        this.querySalesList(val1)
      },
      setIsCrop(crop) {
        this.coordinate.isCrop = crop
      },
      makeTypeChange() {
        if (this.contData.makeType === '3') {
          this.issueShowFlag = false
        } else {
          this.issueShowFlag = true
        }
      },
      queryCustomerTaxation(customerNo) {
        const jsonData = {
          customerNo: customerNo
        }
        new Promise((resolve, reject) => {
          queryCustomerTaxation(jsonData).then(response => {
            const data = response.data
            if (data.code === 0) { // 通过客户查询客户信息直接带出到投保人信息录入界面如果当时老客户没有输入纳税身份时带出来的信息会报错，纳税身份下拉选择不能选择，所以三元表达式来处理的。
              this.individualTaxationData = data.body === null ? {} : data.body
              if (this.individualTaxationData.taxpayerType !== '01') {
                this.individualTaxation1.showFlag = true
              }
            } else {
              this.$message.error(data.message)
            }
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
      },
      agentImpartUpdate() {
        if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
          return false
        }
        this.cont.showFlag = true
        this.appnt.showFlag = false
        this.insured.showFlag = false
        this.insured.changeFlag = false
        this.appnt.changeFlag = false
      },
      appntImpartUpdate() {
        console.log('执行了投保人告知信息')
        if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
          return false
        }
        this.cont.showFlag = false
        this.appnt.showFlag = true
        this.insured.showFlag = false
        this.insured.changeFlag = false
        this.appnt.changeFlag = true
      },
      changeRelationNoCheck() {
        for (let j = 0; j < this.contRules.relationNo.length; j++) {
          const rule = this.contRules.relationNo[j]
          if (rule.hasOwnProperty('required')) {
            rule.required = this.contData.appLinkedOrNot === '01'
          }
        }
      },
      changeInsuredIdType() {
        if ((this.contData.saleChnl === '04' && this.contData.sellType === '02') || (this.contData.saleChnl === '03' && this.contData.sellType === '02')) {
          for (let i = 0; i < this.insuredDataRules.idExpDates.length; i++) {
            const rule = this.insuredDataRules.idExpDates[i]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let j = 0; j < this.insuredDataRules.idexpDate.length; j++) {
            const rule = this.insuredDataRules.idexpDate[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
        } else {
          for (let i = 0; i < this.insuredDataRules.idExpDates.length; i++) {
            const rule = this.insuredDataRules.idExpDates[i]
            if (rule.hasOwnProperty('required')) {
              if (this.insuredData.idtype === '0') {
                rule.required = true
              } else {
                rule.required = true
              }
            }
          }
          for (let j = 0; j < this.insuredDataRules.idexpDate.length; j++) {
            const rule = this.insuredDataRules.idexpDate[j]
            if (rule.hasOwnProperty('required')) {
              if (this.insuredData.idtype === '0') {
                rule.required = true
              } else {
                rule.required = true
              }
            }
          }
        }
        if (this.insuredData.idtype) {
          this.insuredNativePlace = this.changeNativePlaceByIdType(this.insuredData.idtype)
          if (this.insuredNativePlace.length === 1) {
            this.insuredData.nativePlace = this.insuredNativePlace[0].code
          } else {
            const nativePlace = this.insuredNativePlace.find((item, index, arr) => {
              return item.code === this.insuredData.nativePlace
            })
            if (!nativePlace) {
              this.insuredData.nativePlace = ''
            }
          }
        }
        this.addInsured()
      },
      insuredChangeCheck() {
        // 0302/0402渠道，<证件有效期><联系地址>加上必录校验
        if ((this.contData.saleChnl === '04' && this.contData.sellType === '02') || (this.contData.saleChnl === '03' && this.contData.sellType === '02')) {
          for (let i = 0; i < this.insuredDataRules.idExpDates.length; i++) {
            const rule = this.insuredDataRules.idExpDates[i]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let j = 0; j < this.insuredDataRules.idexpDate.length; j++) {
            const rule = this.insuredDataRules.idexpDate[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let k = 0; k < this.insuredDataRules.stature.length; k++) {
            const rule = this.insuredDataRules.stature[k]
            if (rule.hasOwnProperty('required')) {
              if (this.subType === '211141') {
                rule.required = false
              } else {
                rule.required = true
              }
            }
          }
          for (let n = 0; n < this.insuredDataRules.avoirdupois.length; n++) {
            const rule = this.insuredDataRules.avoirdupois[n]
            if (rule.hasOwnProperty('required')) {
              if (this.subType === '211141') {
                rule.required = false
              } else {
                rule.required = true
              }
            }
          }
          for (let m = 0; m < this.insuredDataRules.denType.length; m++) {
            const rule = this.insuredDataRules.denType[m]
            if (rule.hasOwnProperty('required')) {
              if (this.subType === '211141') {
                rule.required = false
              } else {
                rule.required = true
              }
            }
          }
          for (let j = 0; j < this.insuredDataRules.occupationType.length; j++) {
            const rule = this.insuredDataRules.occupationType[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
          for (let j = 0; j < this.insuredDataRules.occupationCode.length; j++) {
            const rule = this.insuredDataRules.occupationCode[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
        } else {
          for (let i = 0; i < this.insuredDataRules.idExpDates.length; i++) {
            const rule = this.insuredDataRules.idExpDates[i]
            if (rule.hasOwnProperty('required')) {
              if (this.insuredData.idtype === '0') {
                rule.required = true
              } else {
                rule.required = true
              }
            }
          }
          for (let j = 0; j < this.insuredDataRules.idexpDate.length; j++) {
            const rule = this.insuredDataRules.idexpDate[j]
            if (rule.hasOwnProperty('required')) {
              if (this.insuredData.idtype === '0') {
                rule.required = true
              } else {
                rule.required = true
              }
            }
          }
          for (let k = 0; k < this.insuredDataRules.stature.length; k++) {
            const rule = this.insuredDataRules.stature[k]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let n = 0; n < this.insuredDataRules.avoirdupois.length; n++) {
            const rule = this.insuredDataRules.avoirdupois[n]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let m = 0; m < this.insuredDataRules.denType.length; m++) {
            const rule = this.insuredDataRules.denType[m]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let j = 0; j < this.insuredDataRules.occupationType.length; j++) {
            const rule = this.insuredDataRules.occupationType[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let j = 0; j < this.insuredDataRules.occupationCode.length; j++) {
            const rule = this.insuredDataRules.occupationCode[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
        }
      },
      // 用户选择出生证时证件有效期计算
      defaultDate() {
        const birthday = this.insuredData.birthday
        const birthdayTiem = getAfterNYear(birthday, 3)
        const totalTime = dataFormat(birthdayTiem)
        if (this.insuredData.age >= 0 && this.insuredData.age <= 2) {
          this.insuredData.idexpDate = totalTime
          this.insuredData.idExpDates = '短期'
          this.disabledDate = true
        } else {
          this.insuredData.idExpDates = '短期'
          this.disabledDate = false
        }
      },
      // 用户选择户口本时证件有效期计算
      houReBook() {
        const birthday = this.insuredData.birthday
        const birthdayTiem = getAfterNYear(birthday, 17)
        const totalTime = dataFormat(birthdayTiem)
        if (this.insuredData.age >= 0 && this.insuredData.age < 17) {
          this.insuredData.idexpDate = totalTime
          this.insuredData.idExpDates = '短期'
          this.disabledDate = true
        } else {
          this.insuredData.idExpDates = '短期'
          this.disabledDate = false
        }
      },
      // 受益人信息
      beneficiary() {
        this.insuredData.lcBnfs.forEach(item => {
          if (item.idtype === '7' && item.birthday !== '') {
            const birthday = item.birthday
            const birthdayTiem = getAfterNYear(birthday, 3)
            const totalTime = dataFormat(birthdayTiem)
            const age = calAge(birthday)
            console.log(age)
            if (age <= 2) {
              item.idexpDate = totalTime
              this.disabledDate = true
            } else {
              this.disabledDate = false
            }
            return false
          }
          if (item.idtype === '4' && item.birthday !== '') {
            const birthday = item.birthday
            const birthdayTiem = getAfterNYear(birthday, 17)
            const totalTime = dataFormat(birthdayTiem)
            const age = calAge(birthday)
            if (age < 17) {
              item.idexpDate = totalTime
              this.disabledDate = true
            } else {
              this.disabledDate = false
            }
            return false
          }
        })
      },
      // 投保人信息页面的出生证校验
      appntBirthdayQuery() {
        const birthday = this.appntData.appntBirthday
        const birthdayTiem = getAfterNYear(birthday, 3)
        const totalTime = dataFormat(birthdayTiem)
        if (this.appntData.age >= 0 && this.appntData.age <= 2) {
          this.appntData.idexpDate = totalTime
          this.appntData.idExpDates = '短期'
          this.disabledDate = true
        } else {
          this.appntData.idExpDates = '短期'
          this.disabledDate = false
        }
      },
      // 投保用户选择户口本时证件有效期计算
      appntHouReBook() {
        const birthday = this.appntData.appntBirthday
        const birthdayTiem = getAfterNYear(birthday, 17)
        const totalTime = dataFormat(birthdayTiem)
        if (this.appntData.age >= 0 && this.appntData.age < 17) {
          this.appntData.idexpDate = totalTime
          this.appntData.idExpDates = '短期'
          this.disabledDate = true
        } else {
          this.appntData.idExpDates = '短期'
          this.disabledDate = false
        }
      },
      otherChangeCheck() {
        if ((this.contData.saleChnl === '04' && this.contData.sellType === '02') || (this.contData.saleChnl === '03' && this.contData.sellType === '02')) {
          for (let n = 0; n < this.ydagents.ydAgentCode.length; n++) {
            const rule = this.ydagents.ydAgentCode[n]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let m = 0; m < this.ydagents.ydAgentName.length; m++) {
            const rule = this.ydagents.ydAgentName[m]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
        } else {
          for (let n = 0; n < this.ydagents.ydAgentCode.length; n++) {
            const rule = this.ydagents.ydAgentCode[n]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
          for (let m = 0; m < this.ydagents.ydAgentName.length; m++) {
            const rule = this.ydagents.ydAgentName[m]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
        }
        if (this.ydzjShowFlag && this.issueShowFlag) {
          for (let m = 0; m < this.ydagents.zjAgentCom.length; m++) {
            const rule = this.ydagents.zjAgentCom[m]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
        } else {
          for (let m = 0; m < this.ydagents.zjAgentCom.length; m++) {
            const rule = this.ydagents.zjAgentCom[m]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
        }
      },
      changeAppIdType() {
        if ((this.contData.saleChnl === '04' && this.contData.sellType === '02') || (this.contData.saleChnl === '03' && this.contData.sellType === '02')) {
          for (let i = 0; i < this.appntDataRules.idExpDates.length; i++) {
            const rule = this.appntDataRules.idExpDates[i]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let j = 0; j < this.appntDataRules.idexpDate.length; j++) {
            const rule = this.appntDataRules.idexpDate[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
        } else {
          for (let i = 0; i < this.appntDataRules.idExpDates.length; i++) {
            const rule = this.appntDataRules.idExpDates[i]
            if (rule.hasOwnProperty('required')) {
              if (this.appntData.idtype === '0') {
                rule.required = true
              } else {
                rule.required = true
              }
            }
          }
          for (let j = 0; j < this.appntDataRules.idexpDate.length; j++) {
            const rule = this.appntDataRules.idexpDate[j]
            if (rule.hasOwnProperty('required')) {
              if (this.appntData.idtype === '0') {
                rule.required = true
              } else {
                rule.required = true
              }
            }
          }
        }
        if (this.appntData.idtype) {
          this.appntNativePlace = this.changeNativePlaceByIdType(this.appntData.idtype)
          if (this.appntNativePlace.length === 1) {
            this.appntData.nativePlace = this.appntNativePlace[0].code
          } else {
            const nativePlace = this.appntNativePlace.find((item, index, arr) => {
              return item.code === this.appntData.nativePlace
            })
            if (!nativePlace) {
              this.appntData.nativePlace = ''
            }
          }
        }
      },
      changeNativePlaceByIdType(idType) { // 根据证件类型带出国籍
        const nativePlace = this.nativeplace.filter(function(item) {
          if (idType === 'B' || idType === 'G') {
            return (item.code === 'HKG' || item.code === 'MAC')
          }
          if (idType === 'E' || idType === 'H') {
            return item.code === 'TWN'
          }
          if (idType === '1' || idType === 'I') {
            return (item.code !== 'HKG' && item.code !== 'MAC' && item.code !== 'TWN' && item.code !== 'CHN')
          }
          if (idType === '0' || idType === '2' || idType === '4' || idType === '7' || idType === 'C' || idType === 'D' || idType === 'F') {
            return item.code === 'CHN'
          }
        })
        return nativePlace
      },
      // 投保人必录与非必录的控制，详细请看需求
      appntChangeCheck() {
        if ((this.contData.saleChnl === '04' && this.contData.sellType === '02') || (this.contData.saleChnl === '03' && this.contData.sellType === '02')) {
          for (let i = 0; i < this.appntDataRules.idExpDates.length; i++) {
            const rule = this.appntDataRules.idExpDates[i]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let j = 0; j < this.appntDataRules.idexpDate.length; j++) {
            const rule = this.appntDataRules.idexpDate[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let k = 0; k < this.appntDataRules.stature.length; k++) {
            const rule = this.appntDataRules.stature[k]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
          for (let n = 0; n < this.appntDataRules.avoirdupois.length; n++) {
            const rule = this.appntDataRules.avoirdupois[n]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
          for (let m = 0; m < this.appntDataRules.denType.length; m++) {
            const rule = this.appntDataRules.denType[m]
            if (rule.hasOwnProperty('required')) {
              if (this.subType === '211141') {
                rule.required = false
              } else {
                rule.required = true
              }
            }
          }
          for (let h = 0; h < this.appntDataRules.yearIncome.length; h++) {
            const rule = this.appntDataRules.yearIncome[h]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
          for (let j = 0; j < this.appntDataRules.occupationType.length; j++) {
            const rule = this.appntDataRules.occupationType[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
          for (let j = 0; j < this.appntDataRules.occupationCode.length; j++) {
            const rule = this.appntDataRules.occupationCode[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
        } else {
          for (let i = 0; i < this.appntDataRules.idExpDates.length; i++) {
            const rule = this.appntDataRules.idExpDates[i]
            if (rule.hasOwnProperty('required')) {
              if (this.appntData.idtype === '0') {
                rule.required = true
              } else {
                rule.required = true
              }
            }
          }
          for (let j = 0; j < this.appntDataRules.idexpDate.length; j++) {
            const rule = this.appntDataRules.idexpDate[j]
            if (rule.hasOwnProperty('required')) {
              if (this.appntData.idtype === '0') {
                rule.required = true
              } else {
                rule.required = true
              }
            }
          }
          for (let k = 0; k < this.appntDataRules.stature.length; k++) {
            const rule = this.appntDataRules.stature[k]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let n = 0; n < this.appntDataRules.avoirdupois.length; n++) {
            const rule = this.appntDataRules.avoirdupois[n]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let m = 0; m < this.appntDataRules.denType.length; m++) {
            const rule = this.appntDataRules.denType[m]
            if (rule.hasOwnProperty('required')) {
              rule.required = false
            }
          }
          for (let h = 0; h < this.appntDataRules.yearIncome.length; h++) {
            const rule = this.appntDataRules.yearIncome[h]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let j = 0; j < this.appntDataRules.occupationType.length; j++) {
            const rule = this.appntDataRules.occupationType[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
          for (let j = 0; j < this.appntDataRules.occupationCode.length; j++) {
            const rule = this.appntDataRules.occupationCode[j]
            if (rule.hasOwnProperty('required')) {
              rule.required = true
            }
          }
        }
      },
      changePhoneNum() {
        const phoneRules = this.appntDataRules['lcaddressPojo.phone']
        for (let h = 0; h < phoneRules.length; h++) {
          const rule = phoneRules[h]
          if (rule.hasOwnProperty('required')) {
            if (this.appntData.lcaddressPojo.preferredPhoneNum === '2') {
              rule.required = true
            } else {
              rule.required = false
            }
          }
        }
        const mobileRules = this.appntDataRules['lcaddressPojo.mobile']
        for (let j = 0; j < mobileRules.length; j++) {
          const rule = mobileRules[j]
          if (rule.hasOwnProperty('required')) {
            if (this.appntData.lcaddressPojo.preferredPhoneNum === '3') {
              rule.required = true
            } else {
              rule.required = false
            }
          }
        }
      },
      // 问题件回复
      problemReply() {
        this.$router.push({
          name: 'problemPiecesReply',
          query: {
            contNo: this.applyPojo.contNo,
            prtNo: this.contData.prtNo,
            missionID: this.missionID,
            subMissionID: this.subMissionID,
            activityID: this.activityID,
            loadFlag: '3'
          }
        })
      },
      // 问题件修改完毕
      modify() {
        this.getInformation()
      },
      modifys() {
        var applyPojo = {}
        Object.assign(applyPojo, this.applyPojo)
        // 设置初始化时，显示的具体步骤
        applyPojo.applyStep = this.contInputStepInsured
        new Promise((resolve, reject) => {
          modified(applyPojo).then(response => {
            const data = response.data
            console.log(data, '返回什么参数')
            if (data.code === 0) {
              this.$message('修改完成')
              this.$router.push({ name: 'modifyProblem' })
            } else {
              this.$message.error(data.message)
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      querySubType() {
        return new Promise((resolve, reject) => {
          getSubtype(this.contData.prtNo).then(response => {
            const data = response.data
            if (data.code === 0) {
              if (data.body && data.body.length > 0) {
                this.subType = data.body[0]
              }
            }
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      operatPolApplyDate(filedName, callbackFuntion) {
        if (filedName) {
          const nameArray = filedName.split('.')
          let value = nameArray.reduce((obj, key) => {
            return obj && key in obj ? obj[key] : null
          }, this)
          if (value) {
            value = getFormatDate(value)
            let filed = this
            for (let i = 0; i < nameArray.length; i++) {
              if (i < (nameArray.length - 1)) {
                const name = nameArray[i]
                filed = filed[name]
              }
            }
            const lastName = nameArray[nameArray.length - 1]
            filed[lastName] = value
            // 此判断的目的是为了，兼容出生日期算年龄
            if (callbackFuntion) {
              console.log(1111)
              this[callbackFuntion](value)
            }
          }
        }
      },
      checkOccupationCodeAndAge(age, occupationCode) {
        if (isNaN(age)) {
          return '年龄不正确'
        }
        if (!occupationCode) {
          return '职业编码不正确'
        }
        if (age < 7) {
          if (occupationCode !== '2099908') {
            return '职业信息与年龄不匹配，请重新确认！'
          }
        }
        if (age > 6 && age < 17) {
          if (!(occupationCode === '2099907' || occupationCode === '3020109' || occupationCode === '8000101' || occupationCode === '8000102')) {
            return '职业信息与年龄不匹配，请重新确认！'
          }
        }
        if (age > 16) {
          if (occupationCode === '2099908') {
            return '职业信息与年龄不匹配，请重新确认！'
          }
        }
        return true
      },
      checkOccupationCodeAndSex(sex, occupationCode) {
        if (!sex) {
          return '性别不正确'
        }
        if (!occupationCode) {
          return '职业编码不正确'
        }
        if (sex === '0' && occupationCode === '4071203') { // 当性别为男时
          return '职业信息与性别不匹配，请重新确认！'
        }
        return true
      }
    },
    watch: {
      // 监听二级销售渠道信息，当其发生变化时，显示不同的代理人框
      sellType() {
        if (this.contData.saleChnl === '04') {
          this.realTimeShowFlag = false
          if (this.contData.sellType === '05') {
            this.ztagentFrame.showFlag = true
            this.agentFrame.showFlag = false
            this.zjagentFrame.showFlag = false
            this.managerFrame.showFlag = false
            // this.otherAgentFrame.showFlag = false
            this.ydzjShowFlag = false
            this.ydagentFrame.showFlag = false
          } else if (this.contData.sellType === '02') {
            this.ztagentFrame.showFlag = false
            this.agentFrame.showFlag = false
            this.zjagentFrame.showFlag = false
            this.managerFrame.showFlag = false
            // this.otherAgentFrame.showFlag = false
            this.ydzjShowFlag = true
            this.ydagentFrame.showFlag = true
          } else {
            this.ydzjShowFlag = false
            this.ztagentFrame.showFlag = false
            this.agentFrame.showFlag = false
            this.zjagentFrame.showFlag = true
            this.managerFrame.showFlag = true
            // this.otherAgentFrame.showFlag = false
            this.ydagentFrame.showFlag = false
          }
        } else if (this.contData.saleChnl === '03') {
          if (this.contData.sellType === '02') {
            this.ydzjShowFlag = false
            this.ztagentFrame.showFlag = false
            this.agentFrame.showFlag = false
            this.zjagentFrame.showFlag = false
            this.managerFrame.showFlag = false
            // this.otherAgentFrame.showFlag = false
            this.ydagentFrame.showFlag = true
            this.realTimeShowFlag = true
          }
        } else {
          this.ydzjShowFlag = false
          this.ztagentFrame.showFlag = false
          this.agentFrame.showFlag = true
          this.zjagentFrame.showFlag = false
          this.managerFrame.showFlag = false
          // this.otherAgentFrame.showFlag = true
          this.ydagentFrame.showFlag = false
          this.realTimeShowFlag = false
        }
        this.otherChangeCheck()
        this.appntChangeCheck()
        this.insuredChangeCheck()
      },
      isSequenceN(val, oldVal) {
        if (this.sequenceNo && this.sequenceNo.length > 0) {
          this.insuredData.sequenceNo = this.sequenceNo[0].code
        }
        if (val === 0) {
          this.isSequenceNo = true
        } else {
          this.isSequenceNo = false
        }
      },
      insuredData: { // 监听被保人要素
        handler(newValue) {
          if (newValue.idtype === '7' && newValue.birthday !== '' && newValue.age !== '') {
            this.defaultDate()
          }
          if (newValue.idtype === '4' && newValue.birthday !== '' && newValue.age !== '') {
            this.houReBook()
          }
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          this.cont.showFlag = false
          this.appnt.showFlag = false
          this.insured.showFlag = true
          this.insured.changeFlag = true
          this.appnt.changeFlag = true
        },
        deep: true
      },
      // 受益人信息计算
      'insuredData.lcBnfs': {
        handler(newValue) {
          this.beneficiary()
        },
        deep: true
      },
      appntData: {
        handler(newValue, oldValue) {
          if (newValue.idtype === '7' && newValue.appntBirthday !== '' && newValue.age !== '') {
            this.appntBirthdayQuery()
          }
          if (newValue.idtype === '4' && newValue.appntBirthday !== '' && newValue.age !== '') {
            this.appntHouReBook()
          }
          this.accountData.newAccName = newValue.appntName
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          if (newValue) {
            this.cont.showFlag = false
            this.appnt.showFlag = true
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.appnt.changeFlag = true
          }
        },
        deep: true
      },
      contData: {
        handler(val, oldVal) {
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          if (val) {
            this.cont.showFlag = true
            this.appnt.showFlag = false
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.appnt.changeFlag = false
            // this.product.showFlag = false
          }
        },
        deep: true
      },
      agent: {
        handler(val, oldVal) {
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          if (val) {
            this.cont.showFlag = true
            this.appnt.showFlag = false
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.appnt.changeFlag = false
            // this.product.showFlag = false
          }
        },
        deep: true
      },
      ztagent: {
        handler(val, oldVal) {
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          if (val) {
            this.cont.showFlag = true
            this.appnt.showFlag = false
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.appnt.changeFlag = false
            // this.product.showFlag = false
          }
        },
        deep: true
      },
      zjagent: {
        handler(val, oldVal) {
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          if (val) {
            this.cont.showFlag = true
            this.appnt.showFlag = false
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.appnt.changeFlag = false
            // this.product.showFlag = false
          }
        },
        deep: true
      },
      ydagent: {
        handler(val, oldVal) {
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          if (val) {
            this.cont.showFlag = true
            this.appnt.showFlag = false
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.appnt.changeFlag = false
            // this.product.showFlag = false
          }
        },
        deep: true
      },
      individualTaxationData: {
        handler(val, oldVal) {
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          if (val) {
            this.cont.showFlag = false
            this.appnt.showFlag = true
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.appnt.changeFlag = true
            // this.product.showFlag = false
          }
        },
        deep: true
      },
      accountData: {
        handler(val, oldVal) {
          if (this.isInit) { // 如果是保单初始化，则返回false，避免在初始化时，执行下面的置灰逻辑
            return false
          }
          if (val) {
            this.cont.showFlag = false
            this.appnt.showFlag = true
            this.insured.showFlag = false
            this.insured.changeFlag = false
            this.appnt.changeFlag = true
            // this.product.showFlag = false
          }
        },
        deep: true
      }
    },
    // 缓存信息
    computed: {
      ...mapState([
        'common', 'app'
      ]),
      sellType() {
        return this.contData.sellType
      },
      saleChnl() {
        return this.contData.saleChnl
      },
      /* appntDataZipCode() {
        return this.appntData.lcaddressPojo.zipCode
      },
      insuredDataZipCode() {
        if (this.insuredData.lcaddres && this.insuredData.lcaddres.zipCode) {
          return this.insuredData.lcaddres.zipCode
        }
      },*/
      isSequenceN() {
        return this.insuredDatas.length
      },
      isHide() {
        if (this.contData.saleChnl === '04' && this.contData.sellType === '02' || this.contData.saleChnl === '03' && this.contData.sellType === '02') {
          return false
        } else {
          return true
        }
      },
      /**
       * @return {string}
       */
      policyOfficer() {
        if (this.contData.saleChnl === '01' && this.contData.sellType === '02' || this.contData.saleChnl === '02' && this.contData.sellType === '01') {
          console.log('hehehhe')
          return this.agent.agentCode + '-' + this.agent.agentName
        } else if (this.contData.saleChnl === '03' && this.contData.sellType === '02' || this.contData.saleChnl === '04' && this.contData.sellType === '02' && this.contData.makeType === '3') {
          return this.ydagent.agentCode + '-' + this.ydagent.agentName
        } else if (this.contData.saleChnl === '04' && this.contData.sellType === '01' || this.contData.saleChnl === '04' && this.contData.sellType === '03' || this.contData.saleChnl === '04' && this.contData.sellType === '04') {
          if (this.manager.managerInfos && this.manager.managerInfos.length > 0) {
            console.log('hahaha')
            return this.manager.managerInfos[0].agentCode + '-' + this.manager.managerInfos[0].agentName
          } else {
            return this.itemManagerName
          }
        } else if (this.contData.saleChnl === '04' && this.contData.sellType === '05') {
          return this.ztagent.agentCode + '-' + this.ztagent.agentName
        } else if (this.contData.saleChnl === '04' && this.contData.sellType === '02' && this.contData.makeType === '1') {
          return this.ydagent.agentCode + '-' + this.ydagent.agentName
        } else {
          return ''
        }
      },
      /**
       * 投保类型-211141
       */
      A211required() {
        return this.subType === '211141'
      },
      transformation: { // 投保人证件号码输入英文字符自动转换大写
        get() {
          return this.appntData.idno
        },
        set(val) {
          this.appntData.idno = val.toUpperCase()
        }
      },
      insuredTransformation: { // 被保人证件号码输入英文字符自动转换大写
        get() {
          return this.insuredData.idno
        },
        set(val) {
          this.insuredData.idno = val.toUpperCase()
        }
      }
      // denTypeShow() {
      //   if (this.contData.saleChnl === '04' && this.contData.sellType === '02' || this.contData.saleChnl === '03' && this.contData.sellType === '02') {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../../../styles/variables";
.entry-main {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.containter {
  overflow: hidden;
  padding: 10px 20px 0;
  position: relative;
}
// 影像全屏显示时
.containter-full-screen {
  padding: 10px 10px 0;
}
// 影像左右显示时
.content-containter {
  float: right;
  width: 50%;
}
.guide-top {
  font-size: 14px;
  overflow: hidden;

  span:first-child {
    &:after {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }

  span:last-child {
    &:after {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  span {
    float: left;
    width: 33%;
    position: relative;
    height: 80px;

    &:after {
      position: absolute;
      content: " ";
      width: 100%;
      height: 8px;
      background: $primary-color;
      left: 0;
      top: 20px;
      z-index: 1;
    }

    b {
      position: absolute;
      color: #fff;
      width: 40px;
      height: 40px;
      background: -webkit-linear-gradient(
        #3ea1ff 50%,
        $primary-color
      ); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(
        #3ea1ff 50%,
        $primary-color
      ); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(
        #3ea1ff 50%,
        $primary-color
      ); /* Firefox 3.6 - 15 */
      background: linear-gradient(#3ea1ff 50%, $primary-color); /* 标准的语法 */
      line-height: 40px;
      text-align: center;
      border-radius: 50%;
      left: calc(50% - 20px);
      top: 0;
      z-index: 2;
    }

    em {
      color: #333;
      display: block;
      text-align: center;
      padding-top: 50px;
    }
  }

  span.hs {
    &:after {
      background: #cecece;
    }

    b {
      background: #cecece;
    }

    em {
      color: #cecece;
    }
  }
}

.guide-bottom {
  font-size: 14px;
  overflow: hidden;
  // margin-top: 25px;
  span {
    float: left;
    width: 33.3%;
    height: 30px;
    background: $primary-color;
    color: #fff;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
  }

  span.hs {
    border: 1px solid #dedede;
    border-left: none;
    color: #dedede;
    background: none;
  }

  span.kd {
    border: 1px solid $primary-color;
    border-left: none;
    color: $primary-color;
    background: none;
  }

  span.kd:first-child {
    border-left: 1px solid $primary-color;
  }
}

.el-form-item__label {
  text-align: right;
}

.common-double-input {
  .first-input {
    width: 40%;
  }

  .second-input {
    width: 59%;
    float: right;
  }
}
.content {
  padding: 10px 0px;
}
.content-yx {
  overflow-y: auto;
  overflow-x: hidden;
  height: calc(50vh - 60px);
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
}
.content-yx-full {
  height: calc(50vh - 30px);
}
.content-left-right {
  height: calc(100vh - 200px);
  overflow-x: auto;
}
.content-full-left-right {
  height: calc(100vh - 140px);
  overflow-x: auto;
}
.content-sj-left-right {
  min-width: 1000px;
}
.hide {
  display: none;
}
.next-btn {
  margin: 10px 0px;
}
.address-card {
  .el-card__body {
    padding: 0 !important;
  }
}
.modifylist {
  float: right;
}
.el-popper[x-placement^="bottom"] {
  margin-top: 150px !important;
}
.agent-code {
  border: 1px solid #dcdfe6;
  height: 32px;
  line-height: 32px;
  border-radius: 3px;
  font-size: 13px;
  color: #606266;
  padding: 0 15px;
}
</style>

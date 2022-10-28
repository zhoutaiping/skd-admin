<template>
  <div>
    <div
      v-loading="packageList.length === 0"
      element-loading-text="无数据"
      element-loading-spinner="el-icon-remove-outline"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <Toolbar v-if="packageList.length > 0" @change="init" />
      <!-- Index -->
      <el-row v-if="false" :gutter="12" class="margin-top">
        <el-col v-if="itemShow.OnlineTime" :span="8">
          <DmCard>
            <BlockItemNumber ref="onlineTimeOption" :height="120" :options="onlineTimeOption" />
          </DmCard>
        </el-col>
        <el-col v-if="itemShow.VisitorTrend" :span="8">
          <DmCard>
            <BlockItemNumber ref="VisitorTrendOption" :height="120" :options="VisitorTrendOption" />
          </DmCard>
        </el-col>
        <el-col v-if="itemShow.PlayerNumber" :span="8">
          <DmCard>
            <BlockItemNumber ref="playerNumberOption" :height="120" :options="playerNumberOption" />
          </DmCard>
        </el-col>
      </el-row>
      <!-- Chart -->
      <el-row v-if="false" :gutter="12" class="margin-top">
        <el-col v-if="itemShow.TimeDistributed" :span="8">
          <DmCard v-loading="gameAvgTime" border title="玩家平均游戏时长分布">
            <ve-ring
              :data-empty="!gameAvgTime && gameAvgTimeReport.data.rows.length === 0"
              :data="gameAvgTimeReport.data"
              :extend="chartSettingVe"
              :settings="chartSettingRing"
              height="380px"
            />
          </DmCard>
        </el-col>
        <el-col v-if="itemShow.SystemDistribution" :span="8">
          <DmCard v-loading="Platform" border title="操作系统分布">
            <ve-ring
              :data-empty="!Platform && PlatformReport.data.rows.length === 0"
              :data="PlatformReport.data"
              :extend="chartSettingVe"
              :settings="chartSettingRing"
              height="380px"
            />
          </DmCard>
        </el-col>
        <el-col v-if="itemShow.OperatorDistribution" :span="8">
          <DmCard v-loading="ispTop" border title="网络运营商分布">
            <ve-ring
              ref="OperatorDistribution"
              :data-empty="!ispTop && ispTopReport.data.rows.length === 0"
              :data="ispTopReport.data"
              :extend="chartSettingVe"
              :settings="chartSettingRing"
              height="380px"
            />
          </DmCard>
        </el-col>
      </el-row>
      <!-- <CardLine
        v-loading="AppStartTimes"
        v-if="itemShow.AppStartTimes"
        ref="AppStartTime"
        title="APP启动次数"
        class="margin-top"
      />
      <CardLine
        v-loading="StartNumber"
        v-if="itemShow.StartNumber"
        ref="StartNumber"
        title="APP平均启动次数"
        class="margin-top"
      />
      -->
      <CardLine
        v-loading="VisitorTrend"
        v-if="itemShow.VisitorTrend"
        ref="VisitorTrend"
        title="独立访客趋势"
        class="margin-top"
      />
      <!-- TCP会话趋势 -->
      <ChartQps
        v-if="itemShow.ConversationTrend"
        ref="ChartQps"
        :bind-params="params"
        class="margin-top"
      />
      <!-- 流量转发趋势 -->
      <CardFlowLine
        v-if="itemShow.ForwardTrend"
        ref="ForwardTrend"
        :bind-params="params"
        class="margin-top"
      />
      <!--  <CardBar
        v-loading="NodeDistribution"
        v-if="itemShow.NodeDistribution"
        ref="NodeDistribution"
        title="节点请求分布"
        class="margin-top"
      />-->
      <!-- 访问分布 -->
      <!-- <CardVisitMap
        v-if="itemShowInit"
        ref="CardVisitMap"
        :bind-params="params"
        class="margin-top"
      />-->
      <!-- 节点回源统计 -->
      <!-- <CardBackSourceLine
        v-if="itemShow.BackSourceStatistics"
        ref="CardBackSourceLine"
        :port-list="portList"
        :bind-params="params"
        class="margin-top"
      />
      <CardChannelIpStatus
        v-if="itemShow.BackSourceStatistics"
        ref="CardChannelIpStatus"
        :bind-params="params"
        class="margin-top"
      />
      <PlayerNumber
        v-loading="PlayerNumber"
        v-if="itemShow.PlayerNumber && playProtList.length > 0"
        ref="PlayerNumber"
        :play-prot-list="playProtList"
        :play-prot="playProt"
        title="单个游戏玩家数量"
        class="margin-top"
        @chengeGameVisitLine="chengeGameVisitLine"
      />-->
      <!-- 平均游戏时长 -->
      <!-- <GameSessionTimeLine
        v-loading="GameTime"
        v-if="itemShow.GameTime && gameProtList.length > 0"
        ref="GameTime"
        :game-prot-list="gameProtList"
        :game-prot="gameProt"
        class="margin-top"
        @changeGameTime="changeGameTime"
      />
      <CardLine
        v-loading="RiskConnectLine"
        v-if="itemShow.BUSINESS_SECURITY"
        ref="RiskConnectLine"
        title="阻断风险连接次数"
        class="margin-top"
      />
      <CardLine
        v-loading="RiskDeviceLine"
        v-if="itemShow.BUSINESS_SECURITY"
        ref="RiskDeviceLine"
        title="风险设备个数"
        class="margin-top"
      />-->
    </div>
  </div>
</template>

<script>
import { deepClone } from '@/utils/index';
import { tooltipParent } from '@/utils/chart';
import ChartMap from '@/components/Chart/ChartMap';
import ColumnRatio from '@/components/Column/ColumnRatio';
import packageMixins from '../../../mixins/packages';
import * as Form from './form';
import Toolbar from '../components/Toolbar';
import BlockItemNumber from './components/BlockItemNumber';
import CardLine from './components/CardLine';
import CardBar from './components/CardBar';
import CardFlowLine from './components/CardFlowLine';
import CardBackSourceLine from './components/CardBackSourceLine';
import GameSessionTimeLine from './components/GameSessionTimeLine';
import PlayerNumber from './components/PlayerNumber';
import CarcRiskControlLine from './components/CarcRiskControlLine';
import CardVisitMap from './components/CardVisitMap';
import CardChannelIpStatus from './components/CardChannelIpStatus';
import ChartQps from './components/ChartQps';

export default {
  components: {
    CardVisitMap,
    Toolbar,
    BlockItemNumber,
    CardBar,
    CardLine,
    CardFlowLine,
    CardBackSourceLine,
    GameSessionTimeLine,
    PlayerNumber,
    ColumnRatio,
    ChartMap,
    CarcRiskControlLine,
    CardChannelIpStatus,
    ChartQps
  },

  mixins: [packageMixins],

  data() {
    return {
      itemShow: {
        BUSINESS_SECURITY: 1,
        TimeDistributed: 1,
        AppStartTimes: 1,
        OnlineTime: 1,
        VisitorTrend: 1,
        GameTime: 1,
        StartNumber: 1,
        ConversationTrend: 1,
        ForwardTrend: 1,
        BackSourceStatistics: 1,
        NodeDistribution: 1,
        SystemDistribution: 1,
        RequestDistribution: 1,
        OperatorDistribution: 1,
        PlayerNumber: 1
      },
      itemShowInit: false,
      onlineTimeOption: {},
      VisitorTrendOption: {},
      params: {},
      AppStartTimes: false,
      VisitorTrend: false,
      StartNumber: false,
      NodeDistribution: false,
      ConversationTrend: false,
      RiskConnectLine: false,
      RiskDeviceLine: false,
      ForwardTrend: false,
      chartSettingVe: Form.ring_chartSettingVe,
      chartSettingRing: {
        label: {
          normal: {
            show: false
          }
        }
      },
      gameAvgTime: false,
      gameAvgTimeReport: Form.getRingDefaultData(),
      ispTop: false,
      ispTopReport: Form.getRingDefaultData(),
      Platform: false,
      PlatformReport: Form.getRingDefaultData(),
      // 回源统计
      BackSourceStatistics: false,
      ipStatusLineIp: '全部ip',
      ipList: [],
      ipStatusLinePort: '全部port',
      portList: [],
      // 终端风险控制曲线图
      RiskControlStatus: false,
      riskStatusLineIp: '全部ip',
      riskStatusLinePort: '全部port',
      //
      GameTime: false,
      gameProtList: [],
      gameProt: '',
      //
      PlayerNumber: false,
      playerNumberOption: {},
      playProtList: [],
      playProt: '',
      //
      RequestDistribution: false,
      visitProvinceTop: {
        tooltip: {},
        data: {
          columns: [],
          rows: []
        },
        settings: {}
      }
    };
  },

  methods: {
    init(params) {
      this.params = params;

      this.$nextTick(() => {
        this.fetchSettings(params);
      });
    },

    async fetchSettings(params) {
      console.log('V4/tjkd.app.api.get.report.getSetting---', { ...params });
      // const data = await this.Fetch.get(
      //   'V4/tjkd.app.api.get.report.getSetting',
      //   params
      // );
      // this.itemShow = data;
      this.itemShowInit = true;

      this.$nextTick(() => {
        // this.$refs.CardVisitMap.init();
        this.getReport(params);
      });
    },

    async getReport(params = this.params) {
      if (params.package_id) {
        // 清空 默认 ip,port
        this.ipStatusLineIp = '全部IP';
        this.riskStatusLineIp = '全部IP';

        this.ipStatusLinePort = '全部端口';
        this.riskStatusLinePort = '全部端口';
        this.gameProt = '';
        this.playProt = '';
        // const ip = this.getIpList(params.package_id);
        // const port = this.getPortList(params.package_id);
        // await ip;
        // await port;
      }

      const itemShow = this.itemShow;

      if (!params.package_id) return;

      // if (itemShow.TimeDistributed)
      //   setTimeout(() => {
      //     this.getGameAvgTime(params);
      //   }, 50);
      // if (itemShow.OperatorDistribution)
      //   setTimeout(() => {
      //     this.getIspTop(params);
      //   }, 60);
      // if (itemShow.SystemDistribution)
      //   setTimeout(() => {
      //     this.getVisitPlatform(params);
      //   }, 70);
      // if (itemShow.OnlineTime)
      //   setTimeout(() => {
      //     this.getOnlineTime(params);
      //   }, 80);
      // if (itemShow.AppStartTimes)
      //   setTimeout(() => {
      //     this.getAppStartTime(params);
      //   }, 90);
      // if (itemShow.StartNumber)
      //   setTimeout(() => {
      //     this.getAppStartNumber(params);
      //   }, 100);
      if (itemShow.VisitorTrend)
        setTimeout(() => {
          this.getVisitLine(params);
        }, 110);
      // if (itemShow.NodeDistribution)
      //   setTimeout(() => {
      //     this.getVisitData(params);
      //   }, 120);
      if (itemShow.ConversationTrend)
        setTimeout(() => {
          this.$refs.ChartQps.init(params);
        }, 130);

      // if (itemShow.BUSINESS_SECURITY)
      //   setTimeout(() => {
      //     this.getRiskConnectLine(params);
      //   }, 140);
      // if (itemShow.BUSINESS_SECURITY)
      //   setTimeout(() => {
      //     this.getRiskDeviceLine(params);
      //   }, 150);
      if (itemShow.ForwardTrend) this.$refs.ForwardTrend.init(params);
      // if (itemShow.RequestDistribution)
      //   setTimeout(() => {
      //     this.getVisitProvinceTop(params);
      //   }, 160);
      // if (itemShow.BackSourceStatistics) {
      //   this.$refs.CardBackSourceLine.init(params);
      //   this.$refs.CardChannelIpStatus.init(params);
      // }
    },
    // 回源统计IpList
    async getIpList(package_id) {
      this.ipStatusLineIp = '全部ip';
      try {
        const api = '/V4/tjkd.app.package.ip.list';
        const params = { package_id };
        const data = await this.Fetch.get(api, params);
        const ipList = deepClone(data);
        ipList.unshift('全部ip');
        this.ipList = ipList;
      } catch (error) {
        this.ipList = [];
      }
    },
    // 回源统计PortList
    async getPortList(package_id) {
      this.ipStatusLinePort = '全部port';
      try {
        const data_params = { package_id };
        const data = await this.Fetch.get(
          'V4/tjkd.app.package.port.list',
          data_params
        );

        delete data._status;

        const portList = deepClone(data);
        this.portList = portList;
        // 平均游戏时长
        this.gameProtList = data;
        const changeGameTime = this.changeGameTime(data[0]);
        // 单个游戏玩家数量
        this.playProtList = data;
        const chengeGameVisitLine = this.chengeGameVisitLine(data[0]);

        if (data[0]) {
          await changeGameTime;
          await chengeGameVisitLine;
        }
      } catch (error) {
        this.portList = [];
        this.gameProtList = [];
        this.gameProt = '';
      }
    },

    async getIpStatusLine(params) {
      // 回源统计
      this.BackSourceStatistics = true;
      const data = await this.Fetch.get(
        'V4/statistic.tjkd.app.ip.status.line',
        params
      );
      let reportData = data;
      if (data.trend.x_data.length === 0)
        reportData = Form.getBackSourceDefaultData(params.start_time);
      if (this.$refs.BackSourceStatistics)
        this.$refs.BackSourceStatistics.init(reportData, [
          '时间',
          '200',
          '404',
          '405',
          '502'
        ]);

      this.BackSourceStatistics = false;
    },

    changeRiskStatusLine(ip, port) {
      this.riskStatusLineIp = ip;
      this.riskStatusLinePort = port;
      const params = JSON.parse(JSON.stringify(this.params));
      params.ip = ip === '全部ip' ? '' : ip;
      params.port = port === '全部port' ? '' : port;
      if (params.package_id && this.itemShow.BackSourceStatistics)
        setTimeout(() => {
          this.getIpRiskControlStatusLine(params);
        }, 50);
    },

    async getIpRiskControlStatusLine(params) {
      // 终端风险控制曲线图
      this.RiskControlStatus = true;
      try {
        const api = '/V4/statistic.tjkd.app.ip.risk.control.status.line';
        const data = await this.Fetch.get(api, params);
        let reportData = data;
        if (data.trend.x_data.length === 0)
          reportData = Form.getRiskControlStatusDefaultData(params.start_time);
        if (this.$refs.RiskControlStatus)
          this.$refs.RiskControlStatus.init(reportData, [
            '时间',
            '406',
            '407',
            '408',
            '409',
            '410',
            '411',
            '412',
            '413'
          ]);
      } catch (error) {
        if (this.$refs.RiskControlStatus)
          this.$refs.RiskControlStatus.init(
            Form.getRiskControlStatusDefaultData(params.start_time),
            ['时间', '406', '407', '408', '409', '410', '411', '412', '413']
          );
      }
      setTimeout(() => {
        this.RiskControlStatus = false;
      }, 1000);
    },

    async changeGameTime(port) {
      this.gameProt = port;
      const game_Prams = JSON.parse(JSON.stringify(this.params));
      game_Prams.port = port;
      if (game_Prams.package_id && this.itemShow.GameTime && port)
        setTimeout(() => {
          this.getGameSessionTime(game_Prams);
        }, 50);
    },

    async getGameSessionTime(params) {
      // 玩家平均游戏时长
      this.GameTime = true;
      try {
        const api = '/V4/statistic.tjkd.app.game.session.time';
        const data = await this.Fetch.get(api, params);
        let reportData = data;
        if (data.trend.x_data.length === 0)
          reportData = Form.getLineDefaultData(params.start_time);
        // console.log('玩家平均游戏时长', reportData)
        if (this.$refs.GameTime)
          this.$refs.GameTime.init(reportData, ['时间', '游戏时长']);
      } catch (error) {
        if (this.$refs.GameTime)
          this.$refs.GameTime.init(Form.getLineDefaultData(params.start_time));
      }
      setTimeout(() => {
        this.GameTime = false;
      }, 1000);
    },

    async chengeGameVisitLine(port) {
      this.playProt = port;
      const params = JSON.parse(JSON.stringify(this.params));
      params.port = port;

      if (params.package_id && this.itemShow.PlayerNumber && port)
        setTimeout(() => {
          this.getGameVisitLine(params);
        }, 50);
    },

    async getGameVisitLine(params) {
      this.PlayerNumber = true;
      const playerNumberOption = {
        title: '游戏玩家总数',
        value: 0,
        unit: '个'
      };
      try {
        const data = await this.Fetch.get(
          'V4/statistic.tjkd.app.game.visit.line',
          params
        );
        let reportData = data;
        if (data.trend.x_data.length === 0)
          reportData = Form.getLineDefaultData(params.start_time);
        if (this.$refs.PlayerNumber)
          this.$refs.PlayerNumber.init(reportData, ['时间', '玩家数量']);
        playerNumberOption.value = data.total || 0;
        playerNumberOption.unit =
          (data.trend && data.trend.y_data.unit) || '个';
      } catch (error) {
        if (this.$refs.PlayerNumber)
          this.$refs.PlayerNumber.init(
            Form.getLineDefaultData(params.start_time)
          );
      }
      this.playerNumberOption = playerNumberOption;
      if (this.$refs.playerNumberOption)
        this.$refs.playerNumberOption.updateValue(this.playerNumberOption);
      setTimeout(() => {
        this.PlayerNumber = false;
      }, 50);
    },

    async getGameAvgTime(params) {
      this.gameAvgTime = true;
      try {
        const api = '/V4/statistic.tjkd.app.visit.session.time.pre';
        const data = await this.Fetch.get(api, params);
        const reportData = Form.getRingDefaultData(['name', 'value'], data);
        this.gameAvgTimeReport = reportData;
      } catch (error) {
        this.gameAvgTimeReport = Form.getRingDefaultData();
      }
      setTimeout(() => {
        this.gameAvgTime = false;
      }, 1000);
    },

    async getIspTop(params) {
      this.ispTop = true;
      try {
        const api = '/V4/statistic.tjkd.app.isp.top';
        const data = await this.Fetch.get(api, params);
        const { ringChart } = Form.getRingDefaultData(
          ['name', 'value'],
          data,
          3
        );
        // console.log('网络运营商分布', ringChart, select)
        this.ispTopReport = ringChart;
      } catch (error) {
        this.ispTopReport = Form.getRingDefaultData();
      }
      setTimeout(() => {
        this.ispTop = false;
      }, 1000);
    },

    async getVisitPlatform(params) {
      this.Platform = true;
      try {
        const api = '/V4/statistic.tjkd.app.visit.platform';
        const data = await this.Fetch.get(api, params);
        const reportData = Form.getRingDefaultData(['name', 'value'], data);
        this.PlatformReport = reportData;
      } catch (error) {
        this.PlatformReport = Form.getRingDefaultData();
      }
      setTimeout(() => {
        this.Platform = false;
      }, 1000);
    },

    async getOnlineTime(params) {
      try {
        await this.Fetch.get(
          '/V4/statistic.tjkd.app.visit.avg.session.time',
          params
        ).then(res => {
          this.onlineTimeOption = {
            title: '平均在线时长',
            value: res.avg_time_decorate.data || 0,
            unit: res.avg_time_decorate.unit || '小时'
          };
          this.$refs.onlineTimeOption &&
            this.$refs.onlineTimeOption.updateValue(this.onlineTimeOption);
        });
      } catch (error) {
        this.$refs.onlineTimeOption &&
          this.$refs.onlineTimeOption.updateValue({
            title: '平均在线时长',
            value: 0,
            unit: '小时'
          });
      }
    },

    async getAppStartTime(params) {
      // app启动次数
      this.AppStartTimes = true;
      try {
        const data = await this.Fetch.get(
          '/V4/statistic.tjkd.app.visit.start.app.times',
          params
        );
        // console.log('app启动次数', data)
        let reportData = data;
        if (data.trend.x_data.length === 0)
          reportData = Form.getLineDefaultData(params.start_time);
        if (this.$refs.AppStartTime)
          this.$refs.AppStartTime.init(reportData, ['时间', '启动次数']);
      } catch (error) {
        if (this.$refs.AppStartTime)
          this.$refs.AppStartTime.init(
            Form.getLineDefaultData(params.start_time),
            ['时间', '启动次数']
          );
      }
      setTimeout(() => {
        this.AppStartTimes = false;
      }, 200);
    },

    async getAppStartNumber(params) {
      this.StartNumber = true;
      try {
        const data = await this.Fetch.get(
          '/V4/statistic.tjkd.app.start.times',
          params
        );
        // console.log('app平均启动次数', data)
        let reportData = data;
        if (data.trend.x_data.length === 0)
          reportData = Form.getLineDefaultData(params.start_time);
        if (this.$refs.StartNumber)
          this.$refs.StartNumber.init(reportData, ['时间', '平均启动次数']);
      } catch (error) {
        if (this.$refs.StartNumber)
          this.$refs.StartNumber.init(Form.getLineDefaultData(), [
            '时间',
            '平均启动次数'
          ]);
      }
      setTimeout(() => {
        this.StartNumber = false;
      }, 200);
    },

    async getVisitLine(params) {
      this.VisitorTrend = true;
      try {
        const data = await this.Fetch.post(
          '/statistic/app/tcp_visit_line',
          params
        );
        this.VisitorTrendOption = {
          title: '独立访客总数',
          value: data.total || 0,
          unit: data.trend.y_data.unit || '小时'
        };
        if (this.$refs.VisitorTrendOption)
          this.$refs.VisitorTrendOption.updateValue(this.VisitorTrendOption);
        // console.log('独立访客趋势', data)
        let reportData = data;
        if (data.trend.x_data.length === 0)
          reportData = Form.getLineDefaultData(params.start_time);
        if (this.$refs.VisitorTrend)
          this.$refs.VisitorTrend.init(reportData, ['时间', '访客个数']);
      } catch (error) {
        if (this.$refs.VisitorTrend)
          this.$refs.VisitorTrend.init(Form.getLineDefaultData(), [
            '时间',
            '访客个数'
          ]);
      }
      setTimeout(() => {
        this.VisitorTrend = false;
      }, 200);
    },

    async getVisitData(params) {
      this.NodeDistribution = true;
      try {
        const data = await this.Fetch.get(
          '/V4/statistic.tjkd.app.ip.visit.data',
          params
        );
        let reportData = {
          trend: {
            x_data: data.x_data,
            y_data: data.y_data
          }
        };
        if (reportData.trend.x_data.length === 0)
          reportData = Form.getLineDefaultData(params.start_time);
        // console.log('节点请求分布', reportData)
        if (this.$refs.NodeDistribution)
          this.$refs.NodeDistribution.init(reportData, ['时间', '节点分布']);
      } catch (error) {
        if (this.$refs.NodeDistribution)
          this.$refs.NodeDistribution.init(
            Form.getLineDefaultData(params.start_time),
            ['时间', '节点分布']
          );
      }
      setTimeout(() => {
        this.NodeDistribution = false;
      }, 200);
    },

    // async getTcpConversationLine(params) {
    //   this.ConversationTrend = true
    //   try {
    //     const data = await this.Fetch.get('/V4/statistic.tjkd.app.tcp.conversation.line', params)
    //     console.log('TCP会话趋势', data)
    //     let reportData = data
    //     if (data.trend.x_data.length === 0) reportData = Form.getLineDefaultData(params.start_time)
    //     if (this.$refs.ConversationTrend) this.$refs.ConversationTrend.init(reportData, ['时间', '会话趋势'])
    //   } catch (error) {
    //     if (this.$refs.ConversationTrend) this.$refs.ConversationTrend.init(Form.getLineDefaultData(), ['时间', '会话趋势'])
    //   }
    //   setTimeout(() => { this.ConversationTrend = false }, 200)
    // },

    async getRiskConnectLine(params) {
      this.RiskConnectLine = true;
      try {
        const data = await this.Fetch.get(
          '/V4/statistic.tjkd.app.block.risk.connect.line',
          params
        );
        // console.log('阻断风险连接数', data)
        let reportData = data;
        if (data.trend.x_data.length === 0)
          reportData = Form.getLineDefaultData(params.start_time);
        if (this.$refs.RiskConnectLine)
          this.$refs.RiskConnectLine.init(
            reportData,
            ['时间', '阻断风险连接数'],
            true
          );
      } catch (error) {
        if (this.$refs.RiskConnectLine)
          this.$refs.RiskConnectLine.init(
            Form.getLineDefaultData(),
            ['时间', '阻断风险连接数'],
            true
          );
      }
      setTimeout(() => {
        this.RiskConnectLine = false;
      }, 200);
    },

    async getRiskDeviceLine(params) {
      this.RiskDeviceLine = true;
      try {
        const data = await this.Fetch.get(
          '/V4/statistic.tjkd.app.block.risk.device.line',
          params
        );
        // console.log('风险设备个数', data)
        let reportData = data;
        if (data.trend.x_data.length === 0)
          reportData = Form.getLineDefaultData(params.start_time);
        if (this.$refs.RiskDeviceLine)
          this.$refs.RiskDeviceLine.init(
            reportData,
            ['时间', '风险设备个数'],
            true
          );
      } catch (error) {
        if (this.$refs.RiskDeviceLine)
          this.$refs.RiskDeviceLine.init(
            Form.getLineDefaultData(),
            ['时间', '风险设备个数'],
            true
          );
      }
      setTimeout(() => {
        this.RiskDeviceLine = false;
      }, 200);
    },

    async getVisitProvinceTop(params) {
      // 请求分布
      this.RequestDistribution = true;
      try {
        const api = '/V4/statistic.tjkd.app.visit.Province.top';
        const data = await this.Fetch.get(api, params);
        data.forEach(item => {
          item.country = item.name;
          item.count = item.value;
          item.percent = (item.percent / 100).toFixed(4);
        });
        this.$refs.chartMap.setOptions({
          visualMap: {
            max:
              data.length === 0
                ? 1
                : Math.max(...data.map(_ => parseInt(_.count, 10)))
          }
        });
        this.visitProvinceTop.tooltip = tooltipParent('次');
        this.visitProvinceTop.data = {
          columns: ['country', 'count', 'percent'],
          rows: data
        };

        this.visitProvinceTop.settings = {
          labelMap: {
            name: '省份',
            count: '请求次数',
            percent: '占比'
          },

          position: 'china'
        };
        // console.log('请求分布--data', this.visitProvinceTop)
      } catch (error) {
        // console.log(2)
      }
      setTimeout(() => {
        this.RequestDistribution = false;
      }, 1000);
    }
  }
};
</script>

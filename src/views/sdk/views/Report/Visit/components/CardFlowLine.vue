<template>
  <div>
    <DmCard :loading="loading" title="流量转发趋势">
      <ChartLine :data="chartData" :options="settings" />
    </DmCard>
    <DmCard :loading="loading" class="margin-top" title="边缘节点业务带宽">
      <ChartLine :data="chartDataFlow" :options="settingsFlow" />
    </DmCard>
    <!-- <DmCard :loading="loadingBindWidth" class="margin-top" title="中心节点业务带宽">
      <ChartLine :data="chartDataBindWidth" :options="settingsBindWidth" />
    </DmCard>-->
  </div>
</template>

<script>
import moment from 'moment';
import ChartLine from '@/components/Chart/ChartLine.vue';

function formatDataM(data, columns, dateformat = 'M月D日 H:mm') {
  const x_data = data[0];
  let max = 0;
  const [columnDate, ...columnsList] = columns;
  const rows = x_data.map((time, index) => {
    const item = {
      [columnDate]: moment(time, 'YYYY-MM-DD HH:mm:ss').format(dateformat)
    };

    columnsList.forEach((column, cIndex) => {
      item[column] = data[cIndex + 1][index].toFixed(2);
    });

    return item;
  });

  data.forEach((item, index) => {
    if (index > 0 && item.length) {
      if (Math.max(...item) > max) max = Math.max(...item);
    }
  });

  return {
    columns,
    rows,
    max
  };
}

export default {
  components: { ChartLine },
  props: {
    bindParams: Object,
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loadingBindWidth: true,
      loading: true,
      chartData: {},
      settings: {
        yAxisType: ['byte', ''],
        max: 1,
        grid: {
          top: 50
        }
      },
      settingsFlow: {
        yAxisType: ['bits', ''],
        max: 1,
        grid: {
          top: 50
        }
      },
      chartDataFlow: {},
      settingsBindWidth: {
        yAxisType: ['bits', ''],
        max: 1,
        grid: {
          top: 50
        }
      },
      chartDataBindWidth: {}
    };
  },

  methods: {
    async fetchBindWidth(params) {
      this.loadingBindWidth = true;
      const data = await this.Fetch.get(
        'V4/statistic.tjkd.app.channel.bandwidth.line',
        params
      );
      // this.settingsBindWidth.baseUnit = data.trend.band_width_data.unit
      // this.settingsBindWidth.yAxisName = [`单位（${data.trend.band_width_data.unit}）`]

      const chartData = formatDataM(
        [data.trend.x_data, data.trend.band_width_data.value],
        ['时间', '业务带宽']
      );
      this.settingsBindWidth.max = chartData.max;
      this.chartDataBindWidth = chartData;
      this.loadingBindWidth = false;
    },

    async init(params = {}) {
      params = {
        ...params,
        ...this.bindParams
      };
      const _params = {
        package_id: '111',
        start_time: '2022-10-24 00:00:00',
        end_time: '2022-10-24 23:59:59',
        key: '4d6355f224b14f12d7d61c370849af4b'
      };
      console.log('----tcp_bandwidth', _params);
      this.loading = true;
      const data = await this.Fetch.post(
        '/statistic/app/tcp_bandwidth',
        params
      );

      console.log('----tcp_bandwidth', data);
      // this.fetchBindWidth(params)
      const chartData = formatDataM(
        [
          data.trend.x_data,
          data.trend.received_data.value,
          data.trend.send_data.value
        ],
        ['时间', '接收', '发送']
      );
      this.settings.max = chartData.max;
      this.chartData = chartData;
      //
      const chartDataFlow = formatDataM(
        [data.trend.x_data, data.trend.band_width_data.value],
        ['时间', '业务带宽']
      );
      this.settingsFlow.max = chartDataFlow.max;

      // this.settingsFlow.baseUnit = data.trend.band_width_data.unit
      // this.settingsFlow.yAxisName = [`单位（${data.trend.band_width_data.unit}）`]
      this.chartDataFlow = chartDataFlow;
      this.loading = false;
    }
  }
};
</script>

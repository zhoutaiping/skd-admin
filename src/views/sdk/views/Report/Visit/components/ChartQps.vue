<template>
  <div>
    <DmCard :loading="loading" title="TCP会话趋势">
      <ChartLine :data="chartDataTCP" :options="settingsTCP" />
    </DmCard>
    <!-- <DmCard :loading="loading" class="margin-top" title="请求数趋势">
      <ChartLine :data="chartDataQPS" :options="settingsQPS" />
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
      item[column] = data[cIndex + 1][index];
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
      loading: true,
      chartDataTCP: {},
      settingsTCP: {
        baseUnit: '次',
        max: 1,
        grid: {
          top: 50
        }
      },
      chartDataQPS: {},
      settingsQPS: {
        baseUnit: 'QPS',
        max: 1,
        grid: {
          top: 50
        }
      }
    };
  },

  methods: {
    async init(params = {}) {
      params = {
        ...params,
        ...this.bindParams
      };
      console.log({ ...params });
      const _params = {
        package_id: '1122',
        start_time: '2022-10-23 00:00:00',
        end_time: '2022-10-23 23:59:59',
        key: '4d6355f224b14f12d7d61c370849af4b'
      };
      this.loading = true;
      const data = await this.Fetch.post(
        '/statistic/app/tcp_conversation_line',
        params
      );
      const chartDataTCP = formatDataM(
        [data.trend.x_data, data.trend.y_data.data],
        ['时间', '会话趋势']
      );

      console.log(chartDataTCP);
      this.settingsTCP.max = chartDataTCP.max;
      this.chartDataTCP = chartDataTCP;
      //
      // const chartDataQPS = formatDataM(
      //   [data.trend.x_data, data.trend.qps_data],
      //   ['时间', 'QPS']
      // );
      // this.settingsQPS.max = chartDataQPS.max;
      // this.chartDataQPS = chartDataQPS;
      this.loading = false;
    }
  }
};
</script>

import Vue from "vue";
import echarts from "echarts/lib/echarts";
import VCharts from "v-charts";
import THEME from "@/config/echarts-theme";
import CardChart from "@/components/Card/CardChart";
import ChartBase from "@/components/Chart/Chart";
import Chart from "@/components/Chart";

echarts.registerTheme("andao", THEME);

Vue.component(CardChart.name, CardChart);
Vue.component(ChartBase.name, ChartBase);
Vue.use(VCharts);
Vue.use(Chart);

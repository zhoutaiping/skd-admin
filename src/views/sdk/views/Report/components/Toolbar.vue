<template>
  <DmToolbar>
    <yd-form-select
      :selects="selectPackages"
      v-model="params.package_id"
      style="width: 220px"
      @change="handleUpdate"
    />
    <InputSearch
      v-if="showRuleId"
      v-model="params.rule_id"
      style="width: 240px"
      placeholder="规则ID"
      @submit="handleUpdate"
    />
    <template slot="right">
      <DateSelection @change="handleTimeChange" />
    </template>
  </DmToolbar>
</template>

<script>
import DateSelection from '@/components/DateSelect/DateSelection';
import packageMixins from '../../../mixins/packages';

export default {
  components: { DateSelection },

  mixins: [packageMixins],

  props: {
    showRuleId: Boolean
  },

  data() {
    return {
      params: {
        key: '',
        package_id: '',
        start_time: '',
        end_time: ''
      },
      selectPackages: []
    };
  },

  created() {
    // this.params.rule_id = this.$route.query.rule_id;
    this.init();
  },

  methods: {
    handleTimeChange(startTime, endTime) {
      this.params.start_time = startTime;
      this.params.end_time = endTime;
      this.handleUpdate();
    },

    handleUpdate() {
      const { package_id } = this.params;
      if (package_id) {
        let key = '';
        const item = this.selectPackages.find(
          i => Number(i.value) === Number(package_id)
        );
        key = (item && item.key) || '';
        this.params.key = key;
      }

      this.$emit('change', this.params);
    },

    init() {
      this.selectPackages = this.packageList.map(_ => {
        return {
          label: _.app_name,
          value: _.sdk_id + '',
          key: _.access_key
        };
      });
      this.params.package_id = this.selectPackages[0].value;
      this.params.key = this.selectPackages[0].key;
    }
  }
};
</script>

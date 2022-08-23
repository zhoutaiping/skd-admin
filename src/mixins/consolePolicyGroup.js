export default {
  data() {
    return {
      policyGroupStatus: '',
      policyGroupType: '',
      policyGroupData: {},
      policyGroupOptions: [
        {
          value: 'stop',
          label: 'OFF'
        },
        {
          value: 'open',
          label: 'ON'
        }
      ]
    }
  },

  methods: {
    // 切换开关
    async handleChangePolicyGroupStatus() {
      const status = this.policyGroupStatus
      const policyGroupData = this.policyGroupData

      try {
        if (policyGroupData.id) {
          await this.Fetch.post(`V4/firewall.policyGroup.${status}`, {
            ids: [policyGroupData.id]
          })
        } else {
          // 新增规则组
          await this.Fetch.post('V4/firewall.policyGroup.save', {
            from: this.policyGroupType,
            name: this.policyGroupType,
            domain_id: this.domainId
          })
          await this.fetchPolicyGroup()
        }
      } catch (e) {
        return
      }
      this.Message('ACTION_SUCCESS')
    },

    async fetchPolicyGroup() {
      const params = {
        domainid: this.domainId
      }
      const data = await this.Fetch.get(`V4/firewall.policyGroup.get_domainid`, params)
      const { list = [] } = data
      this.WAF_SET_GROUP_LIST(list)
      const item = list.find(_ => _.from === this.policyGroupType)

      if (item) this.policyGroupData = item
      if (item && Number(item.status) === 1) {
        this.policyGroupStatus = 'open'
      } else {
        this.policyGroupStatus = 'stop'
      }
    }
  }
}

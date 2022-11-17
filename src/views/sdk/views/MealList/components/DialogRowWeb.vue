<template>
  <DmDialog
    ref="Dialog"
    :fetch-submit="fetchSubmit"
    :mode="options.mode"
    width="700px"
    title-label="规则"
    @submit="handleSubmit"
  >
    <DmAlert v-if="options.listView && options.listView.length">
      已选择：
      <ColumnListMore v-model="options.listView" />
    </DmAlert>
    <el-form ref="Form" :model="form" :rules="rules" label-position="right" label-width="150px">
      <el-form-item
        v-if="form.protocol === 1 && (options.batch === false || (options.batch === true && options.mode==='Create'))"
        prop="domain"
        label="域名"
      >
        <el-input
          v-model="form.domain"
          :placeholder="options.batch ? 'www.demo.com，多个域名以“，”隔开' : 'www.demo.com'"
          style="width: 280px"
          type="textarea"
        />
      </el-form-item>
      <el-form-item prop="port" label="转发端口">
        <el-input
          v-if="options.batch"
          v-model="form.port"
          :disabled="options.mode === 'Edit'"
          type="textarea"
          placeholder="多个端口以“，”隔开（支持端口范围 eg: 1000-1020，单次最多添加50条）"
          style="width: 280px"
        />
        <el-input
          v-else
          v-model="form.port"
          type="textarea"
          placeholder="多个端口以“，”隔开（支持端口范围 eg: 1000-1020，单次最多添加100条）"
          style="width: 280px"
        />
      </el-form-item>
      <el-form-item label="负载均衡模式">
        <yd-form-radio v-model="form.load_balance_type" :radios="Label.loading" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" placeholder="备注" type="textarea" style="width: 280px" />
      </el-form-item>
      <el-form-item label="源类型">
        <yd-form-radio-button v-model="form.source_type" :radios="Label.sourceType" />
      </el-form-item>

      <el-form-item label="源配置">
        <TableSourceIP ref="TableSourceIP" :source-type="form.source_type" :showPort="false" />
      </el-form-item>
      <el-form-item prop="source_port_type" label="源端口">
        <el-radio-group v-model="form.source_port_type" @change="changeSourcePortType">
          <el-radio :label="0">跟随监听端口</el-radio>
          <el-radio :label="1">指定端口</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="Number(form.source_port_type) === 1" prop="source_port" label="指定源端口">
        <el-input v-model="form.source_port" placeholder="例：80" style="width: 280px" />
      </el-form-item>
      <el-form-item v-if="is_using_center_pool" label="启用中心节点" prop="is_using_center_pool">
        <el-checkbox v-model="form.is_using_center_pool" :true-label="1" :false-label="0"></el-checkbox>
      </el-form-item>
      <!-- 加速通道 -->
      <template v-if="packageChannelList.length > 0">
        <el-form-item>
          <el-checkbox v-model="form.channel_status" :true-label="1" :false-label="0">启用加速通道</el-checkbox>
        </el-form-item>
        <template v-if="form.channel_status === 1">
          <el-form-item label="加速通道负载均衡模式">
            <yd-form-radio v-model="form.channel_loading" :radios="Label.loading" />
          </el-form-item>
          <el-form-item label="加速通道">
            <TableChannel ref="TableChannel" />
          </el-form-item>
        </template>
      </template>
    </el-form>
  </DmDialog>
</template>

<script>
import createDialog from '@/utils/createDialog';
import ColumnListMore from '@/components/Column/ColumnListMore';
import TableSourceIP from './components/TableSourceIP';
import TableChannel from './components/TableChannel';
import packagesMixins from '../../../mixins/packages';
import RULE from '@/utils/verify';
import { deepClone } from '../../../../../utils';
const Label = {
  protocol: [
    {
      label: 'TCP',
      value: 1
    },
    {
      label: 'UDP',
      value: 2
    }
  ],
  loading: [
    {
      label: '轮询',
      value: 1
    },
    {
      label: 'IP哈希',
      value: 2
    }
  ],
  sourceType: [
    {
      label: 'IP',
      value: 1
    },
    {
      label: '域名',
      value: 2
    }
  ]
};

function portsValidator(rule, value, callback) {
  // if (typeof value === 'string') {
  //   value = [value];
  // } else {
  //   if (!value[0]) callback(new Error('请填写'));
  // }
  value = value.toString().replace('，', ',');
  value = value.toString().split(',');
  if (value.length > 50) callback(new Error('最多同时添加50个端口'));
  const _value = [...new Set(value)];

  if (_value.length !== value.length) {
    callback(new Error('端口不正确, 不能重复'));
  }

  value.forEach(item => {
    const port = item.split('-');
    if (port.length === 1) {
      if (!RULE.port.test(item)) callback(new Error('端口不正确 范围:1-65535'));
    } else if (port.length === 2) {
      if (!RULE.portRangeReg.test(item)) {
        callback(new Error('端口不正确 范围:1-65535'));
      } else if (RULE.portRangeReg.test(item)) {
        if (Number(port[0]) >= Number(port[1])) {
          callback(new Error('端口段不正确, 第二个端口要大于第一个'));
        }
      }
    } else {
      callback(new Error('端口不正确 范围:1-65535'));
    }
  });
  callback();
}

function portValidator(rule, value, callback) {
  value = value.trim();
  if (!value) {
    callback(new Error('请填写'));
  }
  if (!RULE.port.test(value)) {
    callback(new Error('端口不正确 1-65535'));
  }
  callback();
}

export default createDialog({
  components: { ColumnListMore, TableSourceIP, TableChannel },

  mixins: [packagesMixins],

  data() {
    return {
      loading: true,
      Label,
      optionsDefault: {
        batch: false,
        mode: 'Create',
        listView: []
      },
      formDefault: {
        protocol: 1,
        domain: '',
        port: '',
        load_balance_type: 1,
        channel_loading: 1,
        remark: '',
        channel_status: 0,
        source_type: 1,
        roule_id: '',
        source: [
          {
            ip: '',
            port: '',
            backup: 1
          }
        ],
        is_using_center_pool: 0, // 启用中心节点
        source_port_type: 0, //0 跟随 1 自定义
        source_port: '',
        package_id: this.$route.params.id
      },
      rules: {
        port: [
          { required: true, message: '请输入端口' },
          { validator: portsValidator, trigger: ['blur', 'change'] }
        ],
        domain: [{}],
        is_using_center_pool: [],
        source_port_type: [
          { required: true, message: '请选择', trigger: ['blur', 'change'] }
        ],
        source_port: [
          { required: true, message: '请输入端口' },
          { validator: portValidator, trigger: ['blur', 'change'] }
        ]
      },
      is_using_center_pool: false
    };
  },
  computed: {
    user_id() {
      return (
        (JSON.parse(localStorage.getItem('user')) &&
          JSON.parse(localStorage.getItem('user')).id) ||
        0
      );
    }
  },
  methods: {
    afterOpen(form) {
      if (this.options.mode === 'Create') {
        this.is_using_center_pool = this.$route.query.is_using_center_pool > 0;
      } else {
        this.is_using_center_pool = form.is_using_center_pool > 0;
      }

      this.$nextTick(async () => {
        this.$refs.Form.clearValidate();
        const data = deepClone({ ...form });
        let source_list = [].concat(data.source_list || []);
        const sourceType = data.source_type;
        source_list = source_list.map(i => {
          const ip = JSON.parse(JSON.stringify(i.ip));
          return {
            ...i,
            ip: sourceType === 1 ? ip : '',
            domain: sourceType === 2 ? ip : ''
          };
        });
        if (this.$refs.TableSourceIP) {
          this.$refs.TableSourceIP.setList(source_list || []);
        }
        if (this.options.batch && this.options.mode === 'Edit') {
          source_list.forEach(_ => {
            _.port = '';
          });
        }
        if (data.channel_status)
          this.$refs.TableChannel.setList(
            JSON.parse(data.channel_source_list) || []
          );

        this.loading = false;
      });
    },
    changeSourcePortType(val) {
      this.form.source_port = '';
    },
    async fetchSubmit(form) {
      this.$refs.Form.validate(valid => {
        if (!valid) throw new Error();
      });

      const source_list = await this.$refs.TableSourceIP.getList();
      form = {
        ...this.form,
        sdk_id: Number(this.$route.params.id),
        user_id: this.user_id,
        token: localStorage.getItem('token'),
        source_list: JSON.stringify(source_list),
        channel_source_list: form.channel_status
          ? JSON.stringify(source_list)
          : '[]'
      };

      try {
        // if (this.options.batch) {
        //   if (this.options.mode === 'Create') {
        //     await this.Fetch.post('V4/tjkd.app.domain.batch.add', form)
        //   } else {
        //     await this.Fetch.post('V4/tjkd.app.domain.batch.edit', form)
        //   }
        // } else {
        if (this.options.mode === 'Create') {
          await this.FetchAccount.post('/sdk_rule/add', form);
        } else {
          await this.FetchAccount.post('/sdk_rule/modify', form);
        }
        // }
      } catch (e) {
        throw new Error();
      }
    },

    async handleSubmit() {
      this.Message('ACTION_SUCCESS');
      this.$emit('init');
      this.handleClose();
    }
  }
});
</script>

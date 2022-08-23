module.exports = [
  {
    url: '/api/V4/tjkd.app.package.list',
    type: 'get',
    response: config => {
      return { 'status': { 'code': 1, 'message': '操作成功', 'create_at': '2022-08-08 20:35:09', 'api_time_consuming': '66.137075424194ms', 'function_time_consuming': '6.1650276184082ms', 'dispatch_before_time_consuming': '36.941051483154ms' }, 'data': { 'list': [{ 'id': '401639', 'member_email': 'tian5985@yeah.net', 'member_id': '168163', 'package_name': '无忧版', 'expire_time': '2022-08-29 16:00:17', 'access_key': '54e1973404cc1c369e126e317d4a3a4a', 'status': '1', 'created_at': '2022-07-15 16:00:17', 'updated_at': '2022-07-27 13:51:04', 'admin_user_id': '0', 'admin_info': '', 'ip_group_choose': '1', 'flush_type': '1', 'flush_rate': '0', 'disp_ip_init_limit': '4', 'log_level': 'info', 'block_vm': '0', 'rule_num': '1000', 'remark': '', 'disp_ip_init_limit_gaofang': '3', 'disp_ip_init_limit_personal': '3', 'disp_ip_init_limit_good': '3', 'proxy_timeout': '1200', 'proxy_connect_timeout': '5', 'auto_listen': '1', 'back_source': '0', 'is_appstore': '0', 'cname': null, 'meal_flag': 'YD-SDK-001', 'plan_name': '无忧版', 'fake_request': '0', 'bypass_client_ip': '0', 'risk_control': '0', 'need_real_ip': '0', 'package_is_renew': '3', 'speed_up_channel': '', 'dns_domains': null, 'static_level': '1', 'preset_ips': null, 'proxy_realip': '1', 'block_root': '0', 'block_debug': '0', 'block_multiinst': '0', 'block_groupctrl': '0', 'block_hook': '0', 'block_vpn': '0', 'block_proxy': '0', 'block_simulator': '0', 'default_port': null, 'check_rls': '0', 'pool_uuid': '499bce00b98df98e35bc159da4bff5ab', 'mudp_percent': '0', 'dis_province_auto': '0', 'dis_province_list': '[]', 'domain_pool_uuid': '12912d0502c55088cf1d96013527600b', 'udp_node': '', 'console_dis_config': null, 'expire_status': '0' }], 'total': '1' }}
    }
  },
  {
    url: '/api/V4/tjkd.app.domain.list',
    type: 'get',
    response: config => {
      return {
        'status': {
          'code': 1,
          'message': '操作成功',
          'create_at': '2022-08-08 20:35:12',
          'api_time_consuming': '74.170112609863ms',
          'function_time_consuming': '8.3599090576172ms',
          'dispatch_before_time_consuming': '40.466070175171ms'
        },
        'data': {
          'list': [
            {
              'id': 153283,
              'package_id': 401639,
              'member_id': 168163,
              'domain': 'proxy.gf.com',
              'port': 20002,
              'loading': 1,
              'source_list': [
                {
                  'ip': '121.196.166.78',
                  'backup': 1,
                  'port': 10899
                },
                {
                  'ip': '47.97.66.87',
                  'backup': 1,
                  'port': 10899
                }
              ],
              'status': 1,
              'remark': '',
              'created_at': '2022-08-08 20:32:35',
              'updated_at': '2022-08-08 20:32:35',
              'channel_loading': 1,
              'channel_source_list': [],
              'channel_status': 0,
              'source_type': 1,
              'protocol': 1,
              'rule_type': 0
            },
            {
              'id': 153281,
              'package_id': 401639,
              'member_id': 168163,
              'domain': 'tea.gf.com',
              'port': 20003,
              'loading': 1,
              'source_list': [
                {
                  'ip': '114.55.0.51',
                  'backup': 1,
                  'port': 9101
                },
                {
                  'ip': '114.55.0.51',
                  'backup': 1,
                  'port': 9102
                },
                {
                  'ip': '114.55.0.51',
                  'backup': 1,
                  'port': 9103
                },
                {
                  'ip': '114.55.0.51',
                  'backup': 1,
                  'port': 9104
                }
              ],
              'status': 1,
              'remark': '',
              'created_at': '2022-07-18 17:20:17',
              'updated_at': '2022-07-18 17:20:17',
              'channel_loading': 1,
              'channel_source_list': [],
              'channel_status': 0,
              'source_type': 1,
              'protocol': 1,
              'rule_type': 0
            },
            {
              'id': 153279,
              'package_id': 401639,
              'member_id': 168163,
              'domain': 'api.gf.com',
              'port': 20005,
              'loading': 1,
              'source_list': [
                {
                  'ip': '47.97.197.67',
                  'backup': 1,
                  'port': 20001
                },
                {
                  'ip': '47.97.197.67',
                  'backup': 1,
                  'port': 20002
                }
              ],
              'status': 1,
              'remark': '',
              'created_at': '2022-07-18 17:19:15',
              'updated_at': '2022-07-18 17:19:15',
              'channel_loading': 1,
              'channel_source_list': [],
              'channel_status': 0,
              'source_type': 1,
              'protocol': 1,
              'rule_type': 0
            },
            {
              'id': 153277,
              'package_id': 401639,
              'member_id': 168163,
              'domain': 'res.gf.com',
              'port': 20004,
              'loading': 1,
              'source_list': [
                {
                  'ip': '121.196.239.155',
                  'backup': 1,
                  'port': 8082
                }
              ],
              'status': 1,
              'remark': '',
              'created_at': '2022-07-18 17:18:16',
              'updated_at': '2022-07-18 17:18:16',
              'channel_loading': 1,
              'channel_source_list': [],
              'channel_status': 0,
              'source_type': 1,
              'protocol': 1,
              'rule_type': 0
            },
            {
              'id': 153269,
              'package_id': 401639,
              'member_id': 168163,
              'domain': 'proxy.dt.com',
              'port': 10002,
              'loading': 1,
              'source_list': [
                {
                  'ip': '47.106.213.172',
                  'backup': 1,
                  'port': 10899
                },
                {
                  'ip': '120.77.180.129',
                  'backup': 1,
                  'port': 10899
                }
              ],
              'status': 1,
              'remark': 'proxy',
              'created_at': '2022-07-15 16:53:34',
              'updated_at': '2022-07-18 13:12:59',
              'channel_loading': 0,
              'channel_source_list': [],
              'channel_status': 0,
              'source_type': 1,
              'protocol': 1,
              'rule_type': 0
            },
            {
              'id': 153267,
              'package_id': 401639,
              'member_id': 168163,
              'domain': 'tea.dt.com',
              'port': 10003,
              'loading': 1,
              'source_list': [
                {
                  'ip': '120.78.195.98',
                  'backup': 1,
                  'port': 9102
                },
                {
                  'ip': '120.78.195.98',
                  'backup': 1,
                  'port': 9103
                },
                {
                  'ip': '120.78.195.98',
                  'backup': 1,
                  'port': 9104
                },
                {
                  'ip': '120.24.46.194',
                  'backup': 1,
                  'port': 9101
                },
                {
                  'ip': '120.24.46.194',
                  'backup': 1,
                  'port': 9102
                },
                {
                  'ip': '119.23.231.211',
                  'backup': 1,
                  'port': 9101
                },
                {
                  'ip': '119.23.231.211',
                  'backup': 1,
                  'port': 9102
                },
                {
                  'ip': '119.23.231.211',
                  'backup': 1,
                  'port': 9103
                },
                {
                  'ip': '119.23.231.211',
                  'backup': 1,
                  'port': 9104
                }
              ],
              'status': 1,
              'remark': 'socket',
              'created_at': '2022-08-08 14:13:49',
              'updated_at': '2022-08-08 14:13:49',
              'channel_loading': 0,
              'channel_source_list': [],
              'channel_status': 0,
              'source_type': 1,
              'protocol': 1,
              'rule_type': 0
            },
            {
              'id': 153265,
              'package_id': 401639,
              'member_id': 168163,
              'domain': 'res.dt.com',
              'port': 10004,
              'loading': 1,
              'source_list': [
                {
                  'ip': '120.79.146.3',
                  'backup': 1,
                  'port': 8082
                }
              ],
              'status': 1,
              'remark': 'res',
              'created_at': '2022-07-15 16:52:54',
              'updated_at': '2022-07-18 13:12:59',
              'channel_loading': 0,
              'channel_source_list': [],
              'channel_status': 0,
              'source_type': 1,
              'protocol': 1,
              'rule_type': 0
            },
            {
              'id': 153263,
              'package_id': 401639,
              'member_id': 168163,
              'domain': 'api.dt.com',
              'port': 10005,
              'loading': 1,
              'source_list': [
                {
                  'ip': '39.108.102.14',
                  'backup': 1,
                  'port': 20001
                },
                {
                  'ip': '39.108.102.14',
                  'backup': 1,
                  'port': 20002
                }
              ],
              'status': 1,
              'remark': 'api',
              'created_at': '2022-07-15 16:53:10',
              'updated_at': '2022-07-18 13:12:59',
              'channel_loading': 0,
              'channel_source_list': [],
              'channel_status': 0,
              'source_type': 1,
              'protocol': 1,
              'rule_type': 0
            }
          ],
          'total': '8'
        }
      }
    }
  },
  {
    url: '/api/V4/member.set.info.console',
    type: 'get',
    response: config => {
      return { 'status': { 'code': 1, 'message': '操作成功', 'create_at': '2022-08-11 22:39:35', 'api_time_consuming': '74.524879455566ms', 'function_time_consuming': '1.8720626831055ms', 'dispatch_before_time_consuming': '46.901941299438ms' }, 'data': { 'back_source_lan_ip': { 'ips': '', 'status': 'off' }, 'dashboard_title': { 'dashboard_title': '安全态势感知大屏' }, 'domain': { 'domain_num': '0' }, 'domain_config_switch': { 'free_user_use_waf_block': 'on' }, 'gateway': { 'status': 'off' }, 'ip_white_list': { 'content': '', 'status': '0' }, 'limit_cache_preheat': { 'status': 'on', 'url_max': '2000' }, 'limit_speed_clean_cache': { 'dir_max': '550', 'site_max': '500', 'status': 'on', 'url_max': '2100' }, 'loginSecondVerify': { 'status': '0' }, 'loginSecondVerify_pass_pro_qs': { 'status': '0' }, 'login_only_allow_single_client': { 'status': '0' }, 'member_info': { 'bind_wx_number': '{"nickname":"\\u90a3\\u5e74\\u6625\\uff0c\\u6211\\u628a\\u6843\\u82b1\\u5207\\u4e00\\u65a4","openID":"okE5-wpmzNRVBjcEBa4CkyJIMtTo"}' }, 'mirr': { 'max_count': '8698', 'scan_depth': '9' }, 'nonstandard_port': { 'status': 'off' }, 'oem_domain_check': { 'label': '', 'status': 'on' }, 'oplog': { 'user_see_admin_oplog': 'on' }, 'replace_mirror_notice': { 'abnormal_rate': 50, 'status': 0 }, 'security_qs': { 'father_name': '45cb1682ab0c6b6fe890b18f5adb8a7f', 'mother_name': '1b4d4e25e7f8963d4b14c60294e6c688', 'wife_name': '45cb1682ab0c6b6fe890b18f5adb8a7f' }, 'security_qs_token': { 'token': 'z638ttJSYZxmYnA' }, 'session_active_time': { 'second': '86400', 'status': '1', 'time': '24', 'unit': 'h' }, 'soc_log_download': { 'status': 'on' }, 'sslApply': { 'status': 'off' }, 'subacl': { 'status': 'on' }, 'zero_trust': { 'domain_type': '1', 'ownable': '1', 'own_copyright': '111', 'own_domain': '0426test.lvluoyun.com', 'own_police_record': '2222', 'prefix': 'testlvluoyun', 'status': 'on', 'suffix': 'yundun-access.com' }, 'zone_white_list': { 'content': '', 'status': '0' }}}
    }
  }, // /api/V4/tjkd.app.package.pool.ip.lis
  {
    url: '/api/V4/tjkd.app.package.pool.ip.list',
    type: 'get',
    response: config => {
      return { 'status': { 'code': 1, 'message': '操作成功', 'create_at': '2022-08-11 22:49:07', 'api_time_consuming': '1167.0010089874ms', 'function_time_consuming': '1103.4400463104ms', 'dispatch_before_time_consuming': '38.79189491272ms' },
        'data': { 'total': '57', 'list': [{ 'ip_string': '121.199.*.190', 'isp': 'BGP', 'location': '浙江-杭州', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '39.108.*.22', 'isp': 'BGP', 'location': '广东-深圳', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '120.77.*.153', 'isp': 'BGP', 'location': '广东-深圳', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '120.24.*.144', 'isp': 'BGP', 'location': '广东-深圳', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '132.232.*.241', 'isp': 'BGP', 'location': '四川-成都', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '212.64.*.166', 'isp': 'BGP', 'location': '上海', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '47.100.*.117', 'isp': 'BGP', 'location': '上海', 'type': '优质', 'monitor_status': '异常', 'monitor_status_color': 'danger', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '148.70.*.126', 'isp': 'BGP', 'location': '四川-成都', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '118.25.*.27', 'isp': 'BGP', 'location': '上海', 'type': '优质', 'monitor_status': '异常', 'monitor_status_color': 'danger', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '120.78.*.94', 'isp': 'BGP', 'location': '广东-深圳', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }] }}
    }
  },
  {
    url: '/api/V4/tjkd.app.package.pool.change.log',
    type: 'get',
    response: config => {
      return { 'status': { 'code': 1, 'message': '操作成功', 'create_at': '2022-08-11 23:08:53', 'api_time_consuming': '77.100992202759ms', 'function_time_consuming': '9.2599391937256ms', 'dispatch_before_time_consuming': '43.259143829346ms' }, 'data': { 'total': '1', 'list': [{ 'created_at': '2022-08-03 08:44:44', 'before_change_ips': [], 'after_change_ips': ['121.199.*.190', '39.108.*.22', '120.77.*.153', '120.24.*.144', '132.232.*.241', '212.64.*.166', '47.100.*.117', '148.70.*.126', '118.25.*.27', '120.78.*.94', '106.52.*.89', '111.231.*.107', '118.24.*.62', '148.70.*.63', '148.70.*.60', '111.231.*.17', '47.106.*.61', '120.79.*.160', '129.28.*.20', '111.231.*.3', '148.70.*.253', '172.81.*.107', '148.70.*.153', '159.138.*.249', '106.52.*.13', '120.79.*.179', '132.232.*.142', '148.70.*.172', '47.52.*.7', '47.56.*.79', '47.52.*.12', '47.106.*.228', '49.235.*.60', '118.25.*.231', '47.56.*.200', '129.28.*.232', '148.70.*.118', '132.232.*.200', '47.115.*.109', '132.232.*.151', '119.27.*.59', '118.24.*.174', '150.109.*.245', '121.199.*.19', '120.24.*.142', '123.56.*.32', '106.52.*.173', '49.234.*.154', '111.231.*.188', '49.234.*.28', '118.24.*.91', '62.234.*.15', '122.51.*.94', '62.234.*.93', '115.28.*.174', '47.74.*.185', '47.56.*.130'] }] }}
    }
  }
]


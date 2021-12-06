export default {
  failed: '操作失败',
  success: '操作成功',

  notify: {
    newNotices: '条新通知',
    clearAll: '清除全部',
    viewMore: '查看更多'
  },

  role: {
    id: '角色编号',
    name: '角色',
    quantity: '数量',
    enableQuantity: '可用数量',
    disableQuantity: '不可用数量',
    comment: '备注',
    editRole: '编辑角色',
    permission: '权限'
  },

  gateway: {
    id: '网关编号',
    country: '国家',
    province: '省份',
    belongs: '所属',
    mid: '站号',
    deviceIndex: '设备索引',
    name: '网关名称',
    deviceId: '设备Id',
    devices: '关联设备',
    comment: '备注',
    editGateway: '编辑网关',
    info: '网关信息',
    addDevice: '添加设备',
    isOnline: '是否在线',
    wifi: 'Wifi密码',
    network: '网络',
    address: 'ip地址',
    gateway: '网关地址',
    netmask: '掩码',
    modbusrtu: 'Modbusrtu',
    baudrate: '波特率',
    com: 'Com',
    cycle: '周期',
    dataBits: '数据长度',
    parity: '校验',
    stopBits: '停止位长度',
    date: '日期'
  },

  device: {
    did: '设备id',
    id: '设备',
    name: '设备名称',
    label: '字段标签',
    dataType: '字段类型',
    oxygen: '氧气',
    carbonDioxide: '二氧化碳',
    temperature: '温度',
    editDevice: '编辑设备',
    addDevice: '添加设备',
    fields: '字段',
    addField: '添加字段',
    code: '设备编号',
    comment: '备注',
    info: '设备信息',
    address: '地址位',
    a: 'A系数',
    b: 'B系数'
  },

  event: {
    id: '事件编号',
    deviceId: '设备编号',
    deviceType: '设备类型',
    createdAt: '事件时间',
    state: '处理状态',
    handle: '处理',
    reason: '事件原因',
    handleEvent: '处理事件',
    handleContent: '处理内容',
    batchHandleEvent: '批量处理内容',
    timeRange: '时间范围',
    startTime: '开始时间',
    endTime: '结束时间',
    edit: '编辑',
    action: '操作',
    operator: '处理人',
    operatorDate: '处理日期',
    type: '事件类型',
    untreated: '未处理',
    normal: '一般',
    warning: '警告',
    negative: '严重'
  },

  deviceManage: {
    deviceInfo: '设备信息'
  },

  user: {
    profile: '个人信息',
    editProfile: '编辑个人资料',
    username: '用户名',
    emailAddress: '邮箱地址',
    phoneNumber: '手机号',
    about: '简述',
    updateUserInfo: '更新用户信息',
    changePassword: '更改密码',
    currentPassword: '当前密码',
    newPassword: '新的密码',
    confirmNewPassword: '确认信的密码',
    logout: '退出登录'

  },

  nav: {
    modelTrain: '模型训练',
    collection: '采集页面',
    control: '控制中心',
    model: '车型',
    featureDisplay: '特征显示',
    qualityJudgment: '质量判断',
    realTimeData: '实时数据',
    signalCollector: '信号采集器',
    signal: '信号',
    station: '工位',
    viewRCollector: 'ViewR采集器',
    welder: '焊机',
    solderJoint: '焊点',

    system: '系统管理',
    account: '账号管理',
    department: '部门管理',
    customer: '客户管理',
    // deviceClassify: '设备分类',
    gatewayManage: '网关管理',
    deviceManage: '设备管理',
    event: '事件管理',
    eventInquire: '事件查询',
    eventHandle: '事件处理',
    profile: '个人信息',
    index: '首页',
    roleManage: '角色管理',
    monitor: '数据监控',
    gatewayMonitor: '网关监控',
    display: '大屏展示',
    display1: '展示一',
    display2: '展示二'
  },

  yup: {
    mixed: {
      required: '必须'
    },
    string: {
      min: '至少{min}个字符'
    }
  },

  index: {
    totalNumberOfDevice: '总设备数量',
    numberOfNormalOperations: '正常运行数量',
    numberOfAlarmedDevices: '报警的设备数量',
    numberOfOffonlineDevices: '未联网数量',
    event: '事件/预警'
  },

  department: {
    id: '部门Id',
    account: '账号',
    password: '密码',
    name: '部门名称',
    belongs: '上级部门',
    state: '状态',
    comment: '备注',
    customer: '客户',
    proxy: '代理',
    code: '代号',
    addDepartment: '新增部门',
    editDepartment: '编辑部门'
  },

  customer: {
    id: '客户Id',
    account: '客户账号',
    password: '密码',
    changePassword: '修改密码',
    name: '客户名称',
    belongs: '上级',
    role: '角色',
    active: '激活状态',
    email: '邮箱',
    phone: '手机',
    comment: '备注',
    enable: '可用',
    disable: '禁用',
    addCustomer: '新增客户',
    editCustomer: '编辑客户'
  },

  IntelligentCloudMonitoringSystem: '智能云端监控系统',
  enterPhoneNumber: '输入手机号',
  enterVerificationCode: '输入验证码',
  enterPassword: '输入密码',
  enterConfirmPassword: '输入确认密码',
  sendVerificationCode: '发送验证码',
  register: '注册',
  hasAccountGoToLogin: '已有账号 ? 前往登录',
  login: '登录',
  areYouSureToLogout: '确认登出当前账号 ?',
  dontHaveAccountGoToRegister: '没有账号? 前往注册',

  add: '添加',
  edit: '编辑',
  editPassword: '修改密码',
  delete: '删除',
  inquire: '查询',
  cancel: '取消',
  ok: '确认',
  confirm: '确认',
  information: '信息',
  more: '更多',
  checkout: '查看',
  batchEdit: '批量处理',
  action: '操作',
  export: '导出',

  please: '请',

  // pleaseSelectDataToBeDeleted: '请选择要删除的数据',
  pleaseSelectDataToBeDeleted: '请选择要删除的数据',
  pleaseSelectDataToBeEdited: '请选择要修改的数据',

  pleaseSelectSingleDataModification: '请选择单个数据修改',
  areYouSureToDelete: '你确认删除吗',

  year: '年',
  quarter: '季',
  month: '月',
  week: '周',
  exitFullscreen: '退出全屏',
  goFullscreen: '进入全屏'

}

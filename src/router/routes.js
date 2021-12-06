/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the navbar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

const sidebarRoutes = [
  {
    path: '/',
    hidden: true,
    // q-tree 属性
    redirect: '/index',
    name: 'IndexWrapper',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      label: '',
      icon: ''
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        disabled: true,
        component: () => import('pages/Index.vue'),
        meta: {
          label: 'index',
          icon: 'home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/collection',
    redirect: '/index',
    name: 'Collection',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      label: 'collection',
      icon: 'analytics'
    },
    children: [
      {
        path: 'control',
        name: 'CollectionControl',
        disabled: true,
        component: () => import('pages/collection/Control.vue'),
        meta: {
          label: 'control',
          icon: 'settings'
        }
      },
      {
        path: 'model',
        name: 'CollectionModel',
        disabled: true,
        component: () => import('pages/collection/Model.vue'),
        meta: {
          label: 'model',
          icon: 'directions_car_filled'
        }
      },

      {
        path: 'signalCollector',
        name: 'SignalCollector',
        disabled: true,
        component: () => import('pages/collection/SignalCollector.vue'),
        meta: {
          label: 'signalCollector',
          icon: 'directions_car_filled'
        }
      },

      {
        path: 'signal',
        name: 'Signal',
        disabled: true,
        component: () => import('pages/collection/Signal.vue'),
        meta: {
          label: 'signal',
          icon: 'directions_car_filled'
        }
      },

      {
        path: 'station',
        name: 'Station',
        disabled: true,
        component: () => import('pages/collection/Station.vue'),
        meta: {
          label: 'station',
          icon: 'directions_car_filled'
        }
      },

      {
        path: 'viewRCollector',
        name: 'ViewRCollector',
        disabled: true,
        component: () => import('pages/collection/ViewRCollector.vue'),
        meta: {
          label: 'viewRCollector',
          icon: 'directions_car_filled'
        }
      },

      {
        path: 'welder',
        name: 'Welder',
        disabled: true,
        component: () => import('pages/collection/Welder.vue'),
        meta: {
          label: 'welder',
          icon: 'directions_car_filled'
        }
      },

      {
        path: 'solderJoint',
        name: 'SolderJoint',
        disabled: true,
        component: () => import('pages/collection/SolderJoint.vue'),
        meta: {
          label: 'solderJoint',
          icon: 'directions_car_filled'
        }
      }
    ]
  },
  // {
  //   path: '/system',
  //   name: 'System',
  //   redirect: '/system/account',
  //   component: () => import('layouts/MainLayout.vue'),
  //   meta: {
  //     label: 'system',
  //     icon: 'mdi-table-headers-eye'
  //   },
  //   children: [
  //     {
  //       path: 'department',
  //       name: 'SystemDepartment',
  //       component: () => import('src/pages/system/Department.vue'),
  //       roles: ['admin'],
  //       meta: {
  //         label: 'department',
  //         icon: 'business'
  //       }
  //     },
  //     {
  //       path: 'customer',
  //       name: 'SystemCustomer',
  //       component: () => import('pages/system/Customer.vue'),
  //       meta: {
  //         label: 'customer',
  //         icon: 'manage_accounts'
  //       }
  //     },
  //     {
  //       path: 'role',
  //       name: 'SystemRole',
  //       component: () => import('pages/system/Role.vue'),
  //       meta: {
  //         label: 'roleManage',
  //         icon: 'fingerprint'
  //       }
  //     },
  //     {
  //       path: 'gateway/manage',
  //       name: 'SystemGatewayManage',
  //       component: () => import('src/pages/system/GatewayManage.vue'),
  //       meta: {
  //         label: 'gatewayManage',
  //         icon: 'wifi'
  //       }
  //     },
  //     {
  //       path: 'device/manage',
  //       name: 'SystemDeviceManage',
  //       component: () => import('pages/system/DeviceManage.vue'),
  //       meta: {
  //         label: 'deviceManage',
  //         icon: 'devices'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/event',
  //   redirect: '/event/inquire',
  //   name: 'Event',
  //   component: () => import('layouts/MainLayout.vue'),
  //   meta: {
  //     label: 'event',
  //     icon: 'mdi-kettle-alert-outline'
  //   },
  //   children: [
  //     {
  //       name: 'EventInquire',
  //       path: 'inquire',
  //       component: () => import('pages/event/Inquire.vue'),
  //       meta: {
  //         label: 'eventInquire',
  //         icon: 'policy'
  //       }
  //     },
  //     {
  //       name: 'EventHandle',
  //       path: 'handle',
  //       component: () => import('pages/event/Handle.vue'),
  //       meta: {
  //         label: 'eventHandle',
  //         icon: 'assignment_late'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/monitor',
    name: 'Monitor',
    redirect: '/monitor/featureDisplay',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      label: 'monitor',
      icon: 'bar_chart'
    },
    children: [
      {
        name: 'FeatureDisplay',
        path: 'featureDisplay',
        component: () => import('pages/monitor/FeatureDisplay.vue'),
        meta: {
          label: 'featureDisplay',
          icon: ''
        }
      },
      {
        name: 'QualityJudgment',
        path: 'qualityJudgment',
        component: () => import('pages/monitor/QualityJudgment.vue'),
        meta: {
          label: 'qualityJudgment',
          icon: ''
        }
      },
      {
        name: 'RealTimeData',
        path: 'realTimeData',
        component: () => import('pages/monitor/RealTimeData.vue'),
        meta: {
          label: 'realTimeData',
          icon: ''
        }
      }
    ]
  },

  {
    path: '/analysis',
    name: 'Analysis',
    redirect: '/monitor/featureDisplay',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      label: 'monitor',
      icon: 'bar_chart'
    },
    children: [
      {
        name: 'ModelTrain',
        path: 'modelTrain',
        component: () => import('pages/analysis/ModelTrain.vue'),
        meta: {
          label: 'modelTrain',
          icon: ''
        }
      }
    ]
  }
]

const constantRoutes = [
  {
    path: '/user',
    redirect: '/user/profile',
    name: 'User',
    // hidden: true,
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      label: 'settings',
      icon: 'settings'
    },
    children: [
      {
        name: 'UserProfile',
        path: 'profile',
        component: () => import('pages/user/Profile.vue'),
        meta: {
          label: 'profile',
          icon: 'user'
        }
      }
    ]
  },
  {
    name: 'Login',
    path: '/Login',
    component: () => import('pages/Login.vue')
  },
  {
    name: 'Register',
    path: '/Register',
    component: () => import('pages/Register.vue')
  },
  // {
  //   name: 'Display1',
  //   path: '/display1',
  //   component: () => import('pages/Display1.vue')
  // },
  // {
  //   name: 'Display2',
  //   path: '/display2',
  //   component: () => import('pages/Display2.vue')
  // },
  {
    name: 'NotFound',
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

const routes = [
  ...sidebarRoutes,
  ...constantRoutes
]

// console.log(allRoutesRouter)

export { sidebarRoutes, constantRoutes }

export default routes

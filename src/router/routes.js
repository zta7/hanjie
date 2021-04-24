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
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
const sidebarRoutes = [
  {
    path: '/monitor',
    redirect: '/monitor/wireDiagram',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      label: 'monitor',
      icon: ''
    },
    children: [
      {
        name: 'WireDiagram',
        path: 'wireDiagram',
        component: () => import('pages/monitor/WireDiagram.vue'),
        meta: {
          label: 'monitor',
          icon: ''
        }
      },
      {
        name: 'CommDiagram',
        path: 'commDiagram',
        component: () => import('pages/monitor/CommDiagram.vue')
      },
      {
        name: 'Position',
        path: 'position',
        component: () => import('pages/monitor/Position.vue')
      }
    ]
  },
  {
    path: '/event',
    redirect: '/event/abnormal',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Abnormal',
        path: 'abnormal',
        component: () => import('pages/event/Abnormal.vue')
      },
      {
        name: 'OperationLog',
        path: 'operationLog',
        component: () => import('pages/event/OperationLog.vue')
      }
    ]
  },
  {
    path: '/diagram',
    redirect: '/diagram/electricity',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Electricity',
        path: 'electricity',
        component: () => import('pages/diagram/Electricity.vue')
      },
      {
        name: 'Transformer',
        path: 'transformer',
        component: () => import('pages/diagram/Transformer.vue')
      }
    ]
  },
  {
    path: '/report',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Report',
        path: '',
        component: () => import('pages/report/')
      },
      {
        name: 'DemandMonitoring',
        path: 'demandMonitoring',
        component: () => import('pages/report/DemandMonitoring.vue')
      }
    ]
  },
  {
    path: '/dataManagement',
    redirect: '/dataManagement/project',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'project',
        component: () => import('pages/dataManagement/project.vue')
      },
      {
        path: 'plantStation',
        component: () => import('pages/dataManagement/plantStation.vue')
      },
      {
        path: 'device',
        component: () => import('pages/dataManagement/device.vue')
      },
      {
        path: 'parameter',
        component: () => import('pages/dataManagement/parameter.vue')
      }
    ]
  }
]

import path from 'path'
import isArray from 'lodash'

const fn = routes => {
  console.log(routes)
  const r = []
  const fn2 = (prePath, item) => {
    const p = path.resolve(prePath, item.path)
    if (item.children && isArray(item.children) && item.children.length > 0) item.children.forEach(e => fn2(p, e))
    else {
      r.push({
        ...item,
        path: p
      })
    }
  }
  routes.forEach(e => {
    fn2('', e)
  })
  return r
}
const sidebarWhitelist = fn(sidebarRoutes)

const routes = [
  {
    path: '/',
    redirect: '/report'
  },
  ...sidebarRoutes,
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export { sidebarRoutes, sidebarWhitelist }
export default routes

import { api } from 'boot/axios'
import { date } from 'quasar'
import { get } from 'lodash'

export function $monitorGateway(data) {
  function generator(docs) {
    const atree = []
    docs.forEach(obj => {
      const gtree = {
        label: obj.name || obj.id,
        key: obj.id,
        children: []
      }
      obj.cfg.modbusrtu.devicelist.forEach(nobj => {
        const devkey = `${obj.id}_${nobj.mid}`
        const devtree = {
          label: `${nobj.name}`,
          key: devkey,
          children: []
        }
        nobj.pointlist.forEach(vobj => {
          const vtree = {
            label: vobj.name,
            key: `${devkey}_${vobj.name}`
          }
          devtree.children.push(vtree)
        })
        gtree.children.push(devtree)
      })
      atree.push(gtree)
    })
    return atree
  }
  return new Promise((res, rej) => {
    api({
      url: '/gateways',
      method: 'post',
      data
    }).then(r => {
      r.tree = generator(r.rows)
      console.log(r)
      res(r)
    }).catch(err => {
      rej(err)
    })
  })
}

export function $monitorTreeData(data) {
  if (get(data, 'filter.date')) {
    const d = data.filter.date
    const startTime = date.startOfDate(d, 'day')
    const endTime = date.endOfDate(d, 'day')
    data.filter.startTime = Date.parse(startTime)
    data.filter.endTime = Date.parse(endTime)
  }
  return new Promise((res, rej) => {
    api({
      url: '/monitor/gateway',
      method: 'post',
      data
    }).then(r => {
      r.rows = r.rows.map(e => [Date.parse(e._time), e._value])
      res(r)
    })
      .catch(err => {
        rej(err)
      })
  })
}

export function $monitorCurrentData(data) {
  return new Promise((res, rej) => {
    api({
      url: '/currentdata',
      method: 'post',
      data
    }).then(r => {
      for (const [k, v] of Object.entries(r.rows || {})) r.rows[`${data.id}_${k}`] = v

      res(r)
    }).catch(err => {
      rej(err)
    })
  })
}

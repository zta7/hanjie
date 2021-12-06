<template>
  <q-layout container>
    <q-header class='bg-white'>
      <div class='row q-gutter-x-xs q-gutter-y-md q-pa-md'>
        <div class='row no-wrap q-gutter-x-md'>
          <!-- <q-input v-model='filter.workshopNumber' dense square outlined label='车间编号' /> -->
          <q-input v-model='filter.station' dense square outlined label='工位编号' />
          <q-input v-model='filter.robot' dense square outlined label='机器人编号' />
          <!-- <q-input v-model='filter.torchNumber' dense square outlined label='焊枪编号' /> -->
          <q-input v-model='filter.sequenceNumber' dense square outlined label='程序编号' />
          <q-input v-model='filter.date' dense square outlined label='时间' readonly>
            <template #prepend>
              <q-icon name='event' class='cursor-pointer'>
                <q-popup-proxy cover transition-show='scale' transition-hide='scale'>
                  <q-date v-model='filter.date' :mask='dateMask'>
                    <div class='row items-center justify-end'>
                      <q-btn v-close-popup label='Close' color='primary' flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template #append>
              <q-icon name='access_time' class='cursor-pointer'>
                <q-popup-proxy cover transition-show='scale' transition-hide='scale'>
                  <q-time v-model='filter.date' :mask='dateMask' format24h with-seconds>
                    <div class='row items-center justify-end'>
                      <q-btn v-close-popup label='Close' color='primary' flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
            <template #after>
              <q-btn icon='mdi-chevron-left' class='q-mr-xs' @click='onPrevMinute()'>上一分钟</q-btn>
              <q-btn icon-right='mdi-chevron-right' @click='onNextMinute()'>下一分钟</q-btn>
            </template>
          </q-input>
        </div>
      </div>
      <q-separator />
    </q-header>
    <q-page-container class='full-height'>
      <q-page :style-fn='(offset, height) => { return { height: `${height - offset}px` }}' class='row no-wrap q-pa-md'>
        <div class='col-6 column no-wrap'>
          <div id='chart' class='full-width col-grow' />
          <div class='row bg-grey-3'>
            <q-item>
              <q-item-section>
                <q-item-label :lines='1' class='text-bold'>AI计算结果</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label :lines='1' class='text-bold'>{{ airesult }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-for='[k, v] of Object.entries(analyze)' :key='k' dense>
              <q-item-section>
                <q-item-label :lines='1' class='text-bold'>{{ k }}:</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label :lines='1' class='text-bold'>{{ v }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <q-resize-observer @resize='onResize' />
        </div>
        <div class='col-6 relative-position'>
          <q-scroll-area class='absolute-full'>
            <div class='row'>
              <q-item v-for='[k, v] of Object.entries(summary)' :key='k' dense class='col-4'>
                <q-item-section>
                  <q-item-label :lines='1' class='text-bold'>{{ k }}:</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label :lines='1' class='text-bold'>{{ v }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-scroll-area>
        </div>
      </q-page>
    </q-page-container>
    <q-inner-loading
      :showing='innerLoading'
      label='Please wait...'
      label-class='text-teal'
      label-style='font-size: 1.1em' />
  </q-layout>
</template>
<script>
import { defineComponent, reactive, watch, ref, shallowRef } from 'vue'
import { $history } from 'api/featureDisplay.js'
import { useChart, charts } from 'composition/useChart.js'
import { date } from 'quasar'
import { get } from 'lodash'

export default defineComponent({
  setup() {
    const dateMask = 'YYYY/MM/DD HH:mm:ss'
    const now = date.formatDate(Date.now(), dateMask)
    const filter = reactive({
      station: 'RL040',
      robot: 'L2',
      sequenceNumber: '',
      date: '2021/11/19 00:00:00'
    })
    const innerLoading = ref(false)
    const analyze = shallowRef({})
    const airesult = ref('')
    const summary = shallowRef({})

    const { chart } = useChart({
      id: 'chart',
      option: {
        legend: {
          data: ['电阻', '能量', '热量', '电流']
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {
              show: true,
              type: ['line', 'bar']
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        axisPointer: {
          link: [
            {
              xAxisIndex: 'all'
            }
          ]
        },
        grid: {
          left: '5%',
          rigth: '0%',
          top: '8%',
          bottom: '12%'
        },
        xAxis: {
          type: 'category',
          name: '时间(ms)',
          nameLocation: 'middle',
          nameGap: 25,
          data: Array.from({ length: 1000 }, (e, i) => i)
        },
        yAxis: [
          {
            type: 'value',
            name: '值',
            nameLocation: 'end',
            nameGap: 15,
            axisLine: { show: true }
          },
          {
            type: 'value',
            max: 500,
            axisLine: { show: true }
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'none'
          },
          {
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'none'
          }
          // {
          //   type: 'inside',
          //   xAxisIndex: 0,
          //   filterMode: 'none'
          // },
          // {
          //   type: 'inside',
          //   yAxisIndex: 0,
          //   filterMode: 'none'
          // }
        ],
        series: [
          {
            name: '电阻',
            yAxisIndex: 1,
            type: 'line',
            // smooth: 0.6,
            data: []
          },
          {
            name: '能量',
            type: 'line',
            // smooth: 0.6,
            data: []
          },
          {
            name: '热量',
            type: 'line',
            // smooth: 0.6,
            data: []
          },
          {
            name: '电流',
            type: 'line',
            // smooth: 0.6,
            data: []
          }
        ]
      }
    })

    watch(filter, async n => {
      innerLoading.value = true
      $history({
        filter: n
      })
        .then(r => {
          analyze.value = get(r, 'analyze', {})
          airesult.value = get(r, 'airesult', '')
          summary.value = get(r, 'summary', {})
          const len = get(r, 'signal.resistance', []).length

          chart.value.setOption({
            dataZoom: [
              {
                endValue: len
              }
            ],
            series: [
              {
                data: get(r, 'signal.resistance', [])
              },
              {
                data: get(r, 'signal.energy', [])
              },
              {
                data: get(r, 'signal.heat', [])
              },
              {
                data: get(r, 'signal.current', [])
              }
            ]
          })
          innerLoading.value = false
        })
        .catch(() => {
          innerLoading.value = false
        })
    }, {
      immediate: true,
      flush: 'post'
    })

    return {
      filter,
      dateMask,
      innerLoading,
      analyze,
      airesult,
      summary,
      onResize() {
        charts.forEach(e => e.resize())
      },
      onPrevMinute() {
        const newDate = date.subtractFromDate(filter.date, { seconds: 60 })
        filter.date = date.formatDate(newDate, dateMask)
      },
      onNextMinute() {
        const newDate = date.addToDate(filter.date, { seconds: 60 })
        filter.date = date.formatDate(newDate, dateMask)
      }
    }
  }
})
</script>

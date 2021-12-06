<template>
  <div id='display2' class='fullscreen text-white column no-wrap q-px-md q-pb-md' style='background-color: hsla(227,67%,16%,1.00);'>
    <q-resize-observer @resize='onResize' />

    <div id='header' style='height: 90px; flex: 0 0 auto'>
      <img id='img' src='Display/logo.png' alt='Logo' :style='topImageStyle'>
      <div style='position:absolute;left: 80px;top: 20px' class='text-subtitle1'>用户名: 张三</div>
      <div
        style='position:absolute;  position: absolute;top: 22px;left: 50%;transform: translate(-50%, 0%);'
        class='text-h4'>
        设备监控管理平台
      </div>
      <div style='position:absolute;right: 80px;top: 20px' class='row no-wrap items-center text-subtitle1'>
        <span class='q-mr-md'>{{ date }}</span>
        <q-btn
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          :label="$q.fullscreen.isActive ? $t('exitFullscreen') : $t('goFullscreen')"
          color='primary'
          flat
          text-color='white'
          @click='$q.fullscreen.toggle()' />
      </div>
    </div>

    <div :style='{height: rowHeight + "px"}' class='row no-wrap q-col-gutter-x-md'>
      <div class='col-4 column no-wrap q-col-gutter-y-md'>
        <div v-for='e in devicesLeft' :key='e.id' :class='`col-${12/devicesLeft.length}`'>
          <div class='block' style='height: 100%'>
            <div class='inner'>
              <div :id='e.id' style='width: 100%; height: 100%' />
            </div>
          </div>
        </div>
      </div>

      <div class='col-4 column no-wrap q-col-gutter-y-md'>
        <div class='col-7'>
          <div class='block' style='height: 100%'>
            <div class='inner'>
              <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
                <span class='text-h6'>各地区设备数量</span>
              </div>
              <div id='pieProvinceDeivce' style='width: 100%; height: 100%' />
            </div>
          </div>
        </div>
        <div class='col-5'>
          <div class='block monitor' style='height: 100%'>
            <div class='inner overflow-hidden column no-wrap'>
              <div
                class='row q-pa-xs'
                style='background: rgba(255, 255, 255, 0.1); color: #68d8fe;'>
                <span class='col'>故障时间</span>
                <span class='col'>设备地址</span>
                <span class='col'>异常代码</span>
              </div>
              <div class='full-height overflow-hidden'>
                <div class='marquee'>
                  <div
                    v-for='n in 100'
                    :key='n'
                    class=' row'
                    style='color: #61a8ff'>
                    <span class='col'>故障时间</span>
                    <span class='col'>设备地址</span>
                    <span class='col'>异常代码</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class='col-4 column no-wrap q-col-gutter-y-md'>
        <div v-for='e in devicesRight' :key='e.id' :class='`col-${12/devicesRight.length}`'>
          <div class='block' style='height: 100%'>
            <div class='inner'>
              <div :id='e.id' style='width: 100%; height: 100%' />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, shallowRef, computed, ref, onMounted } from 'vue'
import { chunk } from 'lodash'
import { useChart } from 'src/composition/useChart'

export default defineComponent({
  name: 'Error404',
  setup() {
    const date = ref(new Date().toLocaleString())
    setInterval(() => {
      date.value = new Date().toLocaleString()
    }, 1000)

    const eventsRef = ref(null)
    const eventsIndex = ref(0)

    const topImageHeight = 90
    const rowHeight = shallowRef(0)
    const devices = shallowRef([
      { id: 'd1' }, { id: 'd2' }, { id: 'd3' }, { id: 'd4' }, { id: 'd5' }, { id: 'd6' }
    ])
    const events = ref([
      {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
    ])
    const devicesPartition = computed(() => chunk(devices.value, devices.value.length / 2))
    const devicesLeft = computed(() => devicesPartition.value[0])
    const devicesRight = computed(() => devicesPartition.value[1])

    const pieDeivceOption = {
      title: {
        text: 'XXX地区设备数量',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          animationDuration: 1500,
          radius: ['70%', '90%'],
          roseType: 'radius',
          label: {
            normal: {
              position: 'inner',
              show: false
            }
          },
          type: 'pie',
          data: [
            {
              value: 1048,
              name: '上海'
            },
            {
              value: 735,
              name: '广州'
            },
            {
              value: 580,
              name: '北京'
            },
            {
              value: 484,
              name: '深圳'
            },
            {
              value: 300,
              name: '合肥'
            }
          ]
        }
      ]
    }
    const charts = []
    devices.value.forEach(d => {
      const { chart } = useChart({
        id: d.id,
        theme: 'dark',
        option: pieDeivceOption
      })
      charts.push(chart)
    })

    const pieProvinceDeivceOption = {
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '60%',
          data: [
            {
              value: 1048,
              name: '搜索引擎'
            },
            {
              value: 735,
              name: '直接访问'
            },
            {
              value: 580,
              name: '邮件营销'
            },
            {
              value: 484,
              name: '联盟广告'
            },
            {
              value: 300,
              name: '视频广告'
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }

    const { chart: pieProvinceDeivceChart } = useChart({
      id: 'pieProvinceDeivce',
      theme: 'dark',
      option: pieProvinceDeivceOption
    })
    charts.push(pieProvinceDeivceChart)

    return {
      date,
      events,
      eventsRef,
      eventsIndex,
      onResize(size) {
        rowHeight.value = size.height - topImageHeight
        // rowTwoHeight.value = (size.height - 90) * (3 / 10)
        setTimeout(() => {
          charts.forEach(e => {
            e.value.resize()
          })
        })
      },
      rowHeight,
      devicesLeft,
      devicesRight,
      topImageHeight,
      topImageStyle: {
        position: 'absolute',
        top: '-10px',
        width: '100%',
        height: `${topImageHeight}px`
      }
    }
  }
})
</script>

<style scoped>
  #header{
     position: relative;
  }
  .block {
    position: relative;
    border: 2px solid red;
    border-image: url('/Display/border.png') 51 38 21 132;
    border-width: 2.125rem 1.583rem 0.875rem 5.5rem;
  }

  .block > .inner {
    position: absolute;
    top: -2.125rem;
    right: -1.583rem;
    bottom: -0.875rem;
    left: -5.5rem;
    padding: 1rem 1.5rem;
  }
  @keyframes scroll-top {
    0%{}
    100%{
        transform: translateY(-50%);
    }
  }
  .monitor .marquee {
    animation: scroll-top 100s linear infinite;
  }
  .monitor .marquee:hover{
    animation-play-state: paused;
  }

</style>

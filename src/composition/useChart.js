import { onMounted, watch, isRef, shallowRef, onBeforeUnmount } from 'vue'
import * as EChart from 'echarts'
// import 'src/assets/echarts-shine-theme'

const charts = []

export const useChart = props => {
  const chart = shallowRef(null)
  onMounted(() => {
    setTimeout(() => {
      chart.value = EChart.init(document.getElementById(props.id), props.theme, { renderer: props.renderer || 'svg' })
      chart.value.setOption({
        ...props.option,
        backgroundColor: ''
      })

      charts.push(chart.value)

      if (isRef(props.option)) {
        watch(props.option, n => {
          chart.value.setOption(n)
        }, {
          immediate: true
        })
      }
    })
  })

  onBeforeUnmount(() => {
    if (chart.value) {
      chart.value.dispose()
      const index = charts.findIndex(e => e === chart.value)
      if (index !== -1) charts.splice(index, 1)
    }
  })

  return {
    chart
  }
}

export { charts }

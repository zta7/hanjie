<template>
  <div id='display' class='fullscreen text-white column no-wrap q-px-md q-pb-md' style='background-color: hsla(227,67%,16%,1.00);'>
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
    <div class='row no-wrap q-col-gutter-x-md q-pb-md' :style='{height: rowOneHeight + "px"}'>
      <div class='col-3'>
        <div class='block' style='height: 100%'>
          <div class='inner'>
            <!-- <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
              <span class='text-h6'>地区设备数量</span>
            </div> -->
            <div id='pieProvinceDeivce' style='width: 100%; height: 100%' />
          </div>
        </div>
      </div>
      <div class='col-6'>
        <div class='block' style='height: 100%'>
          <!-- <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
            <span class='text-h6'>地区设备数量</span>
          </div> -->
          <div class='inner column no-wrap'>
            <q-list class='row no-wrap'>
              <q-item class='col-3'>
                <q-item-section avatar top>
                  <q-avatar icon='computer' color='primary' text-color='white' />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines='1'>设备总数</q-item-label>
                  <q-item-label class='text-info'>4</q-item-label>
                  <q-linear-progress :value='1' track-color='grey' rounded class='full-width' />
                </q-item-section>
              </q-item>
              <q-item class='col-3'>
                <q-item-section avatar top>
                  <q-avatar icon='circle' color='positive' text-color='positive' />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines='1'>正常运行</q-item-label>
                  <q-item-label class='text-info'>2</q-item-label>
                  <q-linear-progress :value='0.5' track-color='grey' rounded class='full-width' />
                </q-item-section>
              </q-item>
              <q-item class='col-3'>
                <q-item-section avatar top>
                  <q-avatar icon='circle' color='warning' text-color='warning' />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines='1'>报警设备</q-item-label>
                  <q-item-label class='text-info'>2</q-item-label>
                  <q-linear-progress :value='0.5' track-color='grey' rounded class='full-width' />
                </q-item-section>
              </q-item>
              <q-item class='col-3'>
                <q-item-section avatar top>
                  <q-avatar icon='circle' color='negative' text-color='negative' />
                </q-item-section>

                <q-item-section>
                  <q-item-label lines='1'>未联网</q-item-label>
                  <q-item-label class='text-info'>0</q-item-label>
                  <q-linear-progress :value='0' track-color='grey' rounded class='full-width' />
                </q-item-section>
              </q-item>
            </q-list>
            <div id='map' class='col-grow' />
          </div>
        </div>
      </div>
      <div class='col-3 column no-wrap' style='height: 100%'>
        <div class='col-4 q-pb-md'>
          <div class='block' style='height: 100%'>
            <div class='inner column no-wrap justify-between'>
              <div class='row no-wrap items-center text-no-wrap'>
                <div
                  v-for='(e,i) in range'
                  :key='e'>
                  <q-chip
                    clickable
                    size='lg'
                    :text-color='e === data.registeRange ? "white": "primary"'
                    color='transparent'>
                    {{ $t(e) }}
                  </q-chip>
                  <span v-if='i !== range.length - 1' class='text-info'>|</span>
                </div>
              </div>
              <div class='row'>
                <div class='col-6 column'>
                  <span class='text-h4 q-mb-md'>123</span>
                  <span class='text-h6'>
                    <q-icon class='q-mr-md' name='circle' color='red' size='2px' />
                    <span class='text-no-wrap'>新注册网关数量</span>
                  </span>
                </div>
                <div class='col-6 column'>
                  <span class='text-h4 q-mb-md'>456</span>
                  <span class='text-h6'>
                    <q-icon class='q-mr-md' name='circle' color='yellow' size='2px' />
                    <span class='text-no-wrap'>新注册设备数量</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='col-4 q-pb-md'>
          <div class='block' style='height: 100%'>
            <div class='inner column no-wrap'>
              <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
                <span class='text-h6'>新注册网关数量</span>
                <span>|</span>
                <q-chip v-for='e in range' :key='e' color='transparent' :text-color='data.registeGatewayRange === e ? "white" : "primary"' clickable>{{ $t(e) }}</q-chip>
              </div>
              <div id='lineDevice' style='width: 100%; height: 100%' />
            </div>
          </div>
        </div>
        <div class='col-4'>
          <div class='block' style='height: 100%'>
            <div class='inner column no-wrap'>
              <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
                <span class='text-h6'>新注册设备关数量</span>
                <span>|</span>
                <q-chip v-for='e in range' :key='e' color='transparent' :text-color='data.registeDeviceRange === e ? "white" : "primary"' clickable>{{ $t(e) }}</q-chip>
              </div>
              <div id='lineGateway' style='width: 100%; height: 100%' />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='row no-wrap q-col-gutter-x-md' :style='{height: rowTwoHeight + "px"}'>
      <div class='col-3'>
        <div class='block' style='height: 100%'>
          <div class='inner column no-wrap'>
            <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
              <span class='text-h6'>设备行业柱状图</span>
            </div>
            <div id='barIndustryDeivce' style='width: 100%; height: 100%' />
          </div>
        </div>
      </div>

      <div class='col-3'>
        <div class='block' style='height: 100%'>
          <div class='inner column no-wrap'>
            <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
              <span class='text-h6'>设备行业饼图</span>
            </div>
            <div id='pieIndustryDeivce' style='width: 100%; height: 100%' />
          </div>
        </div>
      </div>

      <div class='col-3'>
        <div class='block' style='height: 100%'>
          <div class='inner column no-wrap'>
            <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
              <span class='text-h6'>设备类别柱状图</span>
            </div>
            <div id='barTypeDeivce' style='width: 100%; height: 100%' />
          </div>
        </div>
      </div>

      <div class='col-3'>
        <div class='block col-3' style='height: 100%'>
          <div class='inner column no-wrap'>
            <div class='row no-wrap q-gutter-x-sm items-center text-no-wrap'>
              <span class='text-h6'>设备类别饼图</span>
            </div>
            <div id='pieTypeDeivce' style='width: 100%; height: 100%' />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useChart } from 'src/composition/useChart'

export default defineComponent({
  name: 'Display1',
  setup() {
    const topImageHeight = 90
    const rowOneHeight = ref(0)
    const rowTwoHeight = ref(0)
    const range = ['year', 'quarter', 'month', 'week']
    let rangeIndex = 0
    const rangeLen = range.length - 1
    const date = ref(new Date().toLocaleString())
    const colorList = [
      '#67C23A', '#B5C334', '#ffa41b', '#E87C25', '#27727B',
      '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
      '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
    ]

    setInterval(() => {
      date.value = new Date().toLocaleString()
    }, 1000)

    const data = reactive({
      registeRange: 'year',
      registeGatewayRange: 'year',
      registeDeviceRange: 'year',
      registeGatewayNumber: 123,
      registeDeviceNumber: 456
    })

    // 0
    setInterval(() => {
      rangeIndex >= rangeLen ? rangeIndex = 0 : rangeIndex += 1
      const v = range[rangeIndex]
      data.registeRange = v
      data.registeGatewayRange = v
      data.registeDeviceRange = v
    }, 5000)

    onMounted(() => {
      const map = new AMap.Map('map', {
        zoom: 4,
        zooms: [4, 22],
        center: [103.166417, 38.798078],
        mapStyle: 'amap://styles/91e4b824aa3430eda31048de4dc60b2e'
      })

      var southWest = new AMap.LngLat(44, 2)
      var northEast = new AMap.LngLat(143, 63)
      var bounds = new AMap.Bounds(southWest, northEast)
      map.setLimitBounds(bounds)

      const loca = new Loca.Container({
        map
      })

      // 蓝色普通点
      const geo = new Loca.GeoJSONSource({
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                cityName: '杭州市',
                ratio: 100,
                rank: 1
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  120.213196,
                  30.261488
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '上海市',
                ratio: 79.1,
                rank: 2
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  121.44573,
                  31.218372
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '周口市',
                ratio: 71,
                rank: 3
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  114.672165,
                  33.62077
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '洛阳市',
                ratio: 71,
                rank: 4
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  112.44061,
                  34.657436
                ]
              }
            }
          ]
        }

      })
      const scatter = new Loca.ScatterLayer({
        loca
      })
      scatter.setSource(geo)
      scatter.setStyle({
        color: 'rgba(43,156,75,1)',
        borderWidth: 0,
        unit: 'px',
        size: [10, 10]
      })
      loca.add(scatter)

      // 红色呼吸点
      const geoLevelF = new Loca.GeoJSONSource({
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                cityName: '长沙市',
                ratio: 66.1,
                rank: 5
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  113.00439,
                  28.175934
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '东莞市',
                ratio: 62,
                rank: 6
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  113.90057,
                  22.922369
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '江门市',
                ratio: 60.7,
                rank: 7
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  113.06398,
                  22.605946
                ]
              }
            }
          ]
        }
      })
      const breathRed = new Loca.ScatterLayer({
        loca
      })
      breathRed.setSource(geoLevelF)
      breathRed.setStyle({
        // unit: 'meter',
        unit: 'px',
        size: [40, 40],
        borderWidth: 0,
        texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_red.png',
        duration: 500,
        animate: true
      })

      // 黄色呼吸点
      const geoLevelE = new Loca.GeoJSONSource({
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {
                cityName: '商丘市',
                ratio: 60.2,
                rank: 8
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  115.658104,
                  34.417095
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '上饶市',
                ratio: 58.9,
                rank: 9
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  118.02019,
                  28.43596
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '安阳市',
                ratio: 58.4,
                rank: 10
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  114.36515,
                  36.08619
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '驻马店市',
                ratio: 57.5,
                rank: 11
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  114.02809,
                  32.98889
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '宁波市',
                ratio: 57,
                rank: 12
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  121.61132,
                  29.880798
                ]
              }
            },
            {
              type: 'Feature',
              properties: {
                cityName: '大连市',
                ratio: 55.4,
                rank: 13
              },
              geometry: {
                type: 'Point',
                coordinates: [
                  121.671616,
                  38.98609
                ]
              }
            }
          ]
        }
      })
      const breathYellow = new Loca.ScatterLayer({
        loca
      })
      breathYellow.setSource(geoLevelE)
      breathYellow.setStyle({
        unit: 'px',
        size: [30, 30],
        borderWidth: 0,
        texture: 'https://a.amap.com/Loca/static/loca-v2/demos/images/breath_yellow.png',
        duration: 1000,
        animate: true
      })

      // 启动渲染动画
      loca.animate.start()

      // 创建纯文本标记
      const text = new AMap.Text({
        text: '纯文本标记',
        anchor: 'center', // 设置文本标记锚点
        draggable: true,
        cursor: 'pointer',
        angle: 0,
        visible: false,
        offset: [0, -25],
        style: {
          'border-radius': '.25rem',
          'background-color': 'rgba(0,0,0,0.5)',
          'border-width': 0,
          'box-shadow': '0 2px 6px 0 rgba(255, 255, 255, .3)',
          'text-align': 'center',
          'font-size': '14px',
          color: '#fff'
        }
      })
      text.setMap(map)
      // 拾取
      map.on('mousemove', e => {
        const feat = scatter.queryFeature(e.pixel.toArray()) || breathRed.queryFeature(e.pixel.toArray()) || breathYellow.queryFeature(e.pixel.toArray())
        if (feat) {
          text.show()
          text.setText(`${feat.properties.cityName}: 100台`)
          text.setPosition(e.lnglat)
        }
        else text.hide()
      })
    })

    const pieProvinceDeivceOption = {
      title: {
        text: '各地区设备数量',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
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

    const { chart: pieProvinceDeivceChart } = useChart({
      id: 'pieProvinceDeivce',
      theme: 'dark',
      option: pieProvinceDeivceOption
    })

    const pieIndustryDeivceOption = {
      series: [
        {
          type: 'pie',
          radius: [20, 80],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: [
            {
              value: 40,
              name: '上海'
            },
            {
              value: 38,
              name: '广州'
            },
            {
              value: 32,
              name: '北京'
            },
            {
              value: 30,
              name: '深圳'
            },
            {
              value: 28,
              name: '合肥'
            }
          ]
        }
      ]
    }
    const { chart: pieIndustryDeivceChart } = useChart({
      id: 'pieIndustryDeivce',
      theme: 'dark',
      option: pieIndustryDeivceOption
    })

    const barIndustryDeivceOption = {
      tooltip: {
        trigger: 'item',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        // 距离 上右下左 的距离
        top: '6%',
        right: '3%',
        bottom: '3%',
        left: '0%',
        // 是否包含文本
        containLabel: true,
        // 显示边框
        show: true,
        // 边框颜色
        borderColor: 'rgba(0, 240, 255, 0.3)'
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '上海', '广州', '北京', '深圳', '合肥'
          ],
          axisTick: {
            alignWithLabel: true,
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          // 修改柱子宽度
          barWidth: '35%',
          data: [
            10, 52, 200, 334, 360, 330, 220
          ],
          itemStyle: {
            // 修改柱子圆角
            barBorderRadius: 5,
            // 定义柱子不同颜色
            normal: {
              color(params) {
                return colorList[params.dataIndex]
              },
              // 显示柱子上方数据
              label: {
                show: true,
                position: 'top',
                formatter: '{b}:{c}'
              }
            }
          }
        // 折线图选项
        // smooth: true,折线比较圆滑，平稳过渡
        }
      ]
    }

    const { chart: barIndustryDeivceChart } = useChart({
      id: 'barIndustryDeivce',
      theme: 'dark',
      option: barIndustryDeivceOption
    })

    const barTypeDeivceOption = {
      tooltip: {
        trigger: 'item',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'line' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        // 距离 上右下左 的距离
        top: '6%',
        right: '3%',
        bottom: '3%',
        left: '0%',
        // 是否包含文本
        containLabel: true,
        // 显示边框
        show: true,
        // 边框颜色
        borderColor: 'rgba(0, 240, 255, 0.3)'
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '上海', '广州', '北京', '深圳', '合肥'
          ],
          axisTick: {
            alignWithLabel: true,
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          // 修改柱子宽度
          barWidth: '35%',
          data: [
            10, 52, 200, 334, 360, 330, 220
          ],
          itemStyle: {
            // 修改柱子圆角
            barBorderRadius: 5,
            // 定义柱子不同颜色
            normal: {
              color(params) {
                return colorList[params.dataIndex]
              },
              // 显示柱子上方数据
              label: {
                show: true,
                position: 'top',
                formatter: '{b}:{c}'
              }
            }
          }
        // 折线图选项
        // smooth: true,折线比较圆滑，平稳过渡
        }
      ]
    }

    const { chart: barTypeDeivceChart } = useChart({
      id: 'barTypeDeivce',
      theme: 'dark',
      option: barTypeDeivceOption
    })

    const pieTypeDeivceOption = {
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '90%',
          data: [
            {
              value: 40,
              name: '上海'
            },
            {
              value: 38,
              name: '广州'
            },
            {
              value: 32,
              name: '北京'
            },
            {
              value: 30,
              name: '深圳'
            },
            {
              value: 28,
              name: '合肥'
            }
          ]
        }
      ]
    }
    const { chart: pieTypeDeivceChart } = useChart({
      id: 'pieTypeDeivce',
      theme: 'dark',
      option: pieTypeDeivceOption
    })

    const lineDeviceOptions = {
      xAxis: {
        type: 'category',
        data: [
          '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
        ],
        axisTick: {
          show: false // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' // 文本颜色
        },
        axisLine: {
          show: false // 去除轴线
        },
        boundaryGap: false // 去除轴内间距
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false // 去除刻度
        },
        axisLabel: {
          color: '#4c9bfd' // 文字颜色
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a' // 分割线颜色
          }
        }
      },
      series: [
        {
          name: '网关数量',
          data: [
            24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120
          ],
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#00f2f1' // 线颜色
          }
        }
      ],
      // 设置网格样式
      grid: {
        show: true, // 显示边框
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        borderColor: '#012f4a', // 边框颜色
        containLabel: true // 包含刻度文字在内
      },
      legend: {
        textStyle: {
          color: '#4c9bfd' // 图例文字颜色
          //  fontSize
        },
        right: '10%' // 距离右边10%
      }
    }
    const { chart: lineDeviceChart } = useChart({
      id: 'lineDevice',
      theme: 'dark',
      option: lineDeviceOptions
    })

    const lineGatewayOptions = {
      xAxis: {
        type: 'category',
        data: [
          '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
        ],
        axisTick: {
          show: false // 去除刻度线
        },
        axisLabel: {
          color: '#4c9bfd' // 文本颜色
        },
        axisLine: {
          show: false // 去除轴线
        },
        boundaryGap: false // 去除轴内间距
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false // 去除刻度
        },
        axisLabel: {
          color: '#4c9bfd' // 文字颜色
        },
        splitLine: {
          lineStyle: {
            color: '#012f4a' // 分割线颜色
          }
        }
      },
      series: [
        {
          name: '设备数量',
          data: [
            40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79
          ],
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#ed3f35' // 线颜色
          }
        }
      ],
      // 设置网格样式
      grid: {
        show: true, // 显示边框
        top: '20%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        borderColor: '#012f4a', // 边框颜色
        containLabel: true // 包含刻度文字在内
      },
      legend: {
        textStyle: {
          color: '#4c9bfd' // 图例文字颜色
          //  fontSize
        },
        right: '10%' // 距离右边10%
      }
    }
    const { chart: lineGatewayChart } = useChart({
      id: 'lineGateway',
      theme: 'dark',
      option: lineGatewayOptions
    })

    return {
      date,
      data,
      range,
      onResize(size) {
        rowOneHeight.value = (size.height - 90) * (7 / 10)
        rowTwoHeight.value = (size.height - 90) * (3 / 10)
        setTimeout(() => {
          pieProvinceDeivceChart.value.resize()
          pieIndustryDeivceChart.value.resize()
          barIndustryDeivceChart.value.resize()
          barTypeDeivceChart.value.resize()
          pieTypeDeivceChart.value.resize()
          lineDeviceChart.value.resize()
          lineGatewayChart.value.resize()
        })
      },
      rowOneHeight,
      rowTwoHeight,
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
  #map >>>.amap-marker-label{
    color: white;
    background-color: hsla(227,67%,16%,1.00);
  }
</style>

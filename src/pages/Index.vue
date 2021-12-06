<template>
  <q-page class='column no-scroll no-wrap items-start relative-position' :style-fn='(offset, height) => { return { width: "100%", height: `${height - offset}px` }}'>
    <q-card id='canvasWrapper' class='scroll q-ma-xs no-shadow' bordered tabindex='0' @drop='onDrop'>
      <canvas id='canvas' width='1200' height='900' />
    </q-card>
    <q-card id='platteEl' class='row no-wrap scroll q-ma-xs no-shadow' bordered style='flex: 0 0 auto'>
      <q-icon v-for='(p, i) in platte' :id='p.id' :key='i' :name='p.icon' :size='p.size || `72px`' draggable='true' @dragstart='onDragStart' />
    </q-card>
    <div id='paneEl' class='absolute-top-right' />
  </q-page>
  <q-page-sticky position='bottom-right' :offset='[18, 18]'>
    <q-btn fab icon='save' color='accent' @click='save()' />
  </q-page-sticky>
</template>
<script>
import { defineComponent, onMounted, shallowRef, watch } from 'vue'
import { fabric } from 'fabric'
import { LocalStorage, uid } from 'quasar'
import { Pane } from 'tweakpane'
import key from 'keymaster'
import { get, toPath } from 'lodash'

export default defineComponent({
  setup() {
    const bindOptions = {
      inputs: { '': '' },
      outputs: { '': '' },
      outputEvents: { '': '' }
    }
    const commonProps = [
      {
        key: 'top'
      },
      {
        key: 'left'
      },
      {
        key: 'angle',
        props: {
          min: 0,
          max: 359
        }
      },
      {
        key: 'scaleX'
      },
      {
        key: 'scaleY'
      },
      {
        key: 'skewX'
      },
      {
        key: 'skewY'
      },
      {
        key: 'originX',
        props: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        }
      },
      {
        key: 'originY',
        props: {
          options: {
            top: 'top',
            center: 'center',
            bottom: 'bottom'
          }
        }
      },
      {
        key: 'backgroundColor',
        props: { options: { alpha: true }}
      },
      {
        key: 'index',
        props: {
          min: 1,
          max: 1000,
          step: 1
        }
      },
      {
        key: 'opacity',
        props: {
          min: 0,
          max: 1
        }
      }
      // {
      //   key: 'visible'
      // }

    ]
    const propsMap = {
      activeSelection: [
        {
          key: 'top'
        },
        {
          key: 'left'
        },
        {
          key: 'angle',
          props: {
            min: 0,
            max: 359
          }
        },
        {
          key: 'scaleX'
        },
        {
          key: 'scaleY'
        },
        {
          key: 'skewX'
        },
        {
          key: 'skewY'
        }
      ],
      path: [
        ...commonProps,
        {
          key: 'stroke'
        },
        {
          key: 'strokeWidth',
          props: {
            min: 0,
            max: 100,
            step: 1
          }
        }
      ],
      station: [...commonProps],
      areaMeter: [
        ...commonProps,
        {
          key: 'area'
        },
        {
          key: 'y'
        },
        {
          key: 'g'
        },
        {
          key: 'r'
        }
      ],
      rect: [
        ...commonProps,
        {
          key: 'rx'
        },
        {
          key: 'ry'
        },
        {
          key: 'fill'
          //
        },
        {
          key: 'stroke'
          //
        },
        {
          key: 'strokeWidth',
          props: {
            min: 0,
            max: 100,
            step: 1
          }
        }

      ],
      triangle: [
        ...commonProps,
        {
          key: 'fill'

        },
        {
          key: 'stroke'

        },
        {
          key: 'strokeWidth',
          props: {
            min: 0,
            max: 100,
            step: 1
          }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.fill',
              props: { options: bindOptions.inputs }
            }
          ]
        }
      ],
      circle: [
        ...commonProps,
        {
          key: 'fill'

        },
        {
          key: 'stroke'

        },
        {
          key: 'strokeWidth',
          props: {
            min: 0,
            max: 100,
            step: 1
          }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.fill',
              props: { options: bindOptions.inputs }
            }
          ]
        }
      ],
      text: [
        ...commonProps,
        {
          key: 'text'
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.text',
              props: { options: bindOptions.inputs }
            }
          ]
        }
      ],
      image: [
        ...commonProps,
        {
          key: 'src',
          isImage: true
        }
      ],
      'gauge.linear': [
        ...commonProps,
        {
          key: 'gauge.value'
        },
        {
          key: 'gauge.minValue'
        },
        {
          key: 'gauge.maxValue'
        },
        {
          key: 'gauge.majorStep',
          props: {
            min: 0,
            max: 200
          }

        },
        {
          key: 'gauge.minorTicks',
          props: {
            min: 0,
            max: 5,
            step: 1
          }
        },
        {
          key: 'gauge.units'
        },
        {
          key: 'gauge.title'
        },
        {
          key: 'gauge.colorBarProgress'

        },
        {
          key: 'gauge.barWidth',
          props: {
            min: 0,
            max: 20,
            step: 1
          }

        },
        {
          key: 'gauge.barBeginCircle'

        },
        {
          key: 'gauge.tickSide',
          props: {
            options: {
              left: 'left',
              right: 'right',
              both: 'both'
            }
          }
        },
        {
          key: 'gauge.needleSide',
          props: {
            options: {
              left: 'left',
              right: 'right',
              both: 'both'
            }
          }
        },
        {
          key: 'gauge.numberSide',
          props: {
            options: {
              left: 'left',
              right: 'right',
              both: 'both'
            }
          }
        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              props: { options: bindOptions.inputs }
            }
          ]
        }
      ],
      'gauge.radial': [
        ...commonProps,
        {
          key: 'gauge.value'
        },
        {
          key: 'gauge.minValue'
        },
        {
          key: 'gauge.maxValue'
        },
        {
          key: 'gauge.majorStep',
          props: {
            min: 0,
            max: 200
          }
        },
        {
          key: 'gauge.minorTicks',
          props: {
            min: 0,
            max: 5,
            step: 1
          }
        },
        {
          key: 'gauge.units'
        },
        {
          key: 'gauge.title'
        },
        {
          key: 'gauge.colorBarProgress'

        },
        {
          key: 'gauge.barWidth',
          props: {
            min: 0,
            max: 20,
            step: 1
          }

        },
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.value',
              props: { options: bindOptions.inputs }
            }
          ]
        }
      ],
      'chart.bar': [
        ...commonProps,
        {
          key: 'binds',
          isFolder: true,
          props: []
        }
      ],
      'chart.line': [...commonProps],
      'chart.pie': [...commonProps],
      'chart.bubble': [...commonProps],
      trafficLights: [
        ...commonProps,
        {
          key: 'binds',
          isFolder: true,
          props: [
            {
              key: 'binds.horizontalText',
              props: { options: bindOptions.inputs }
            },
            {
              key: 'binds.veriticalText',
              props: { options: bindOptions.inputs }
            },
            {
              key: 'binds.horizontalRedLight',
              props: { options: bindOptions.inputs }
            },
            {
              key: 'binds.horizontalYellowLight',
              props: { options: bindOptions.inputs }
            },
            {
              key: 'binds.horizontalGreenLight',
              props: { options: bindOptions.inputs }
            },
            {
              key: 'binds.veriticalRedLight',
              props: { options: bindOptions.inputs }
            },
            {
              key: 'binds.veriticalYellowLight',
              props: { options: bindOptions.inputs }
            },
            {
              key: 'binds.veriticalGreenLight',
              props: { options: bindOptions.inputs }
            }
          ]
        }
      ]
    }
    const canvas = shallowRef(false)
    const platte = [
      {
        id: '1',
        icon: 'mdi-rectangle-outline',
        create({ left, top }) {
          return new fabric.Rect({
            width: 100,
            height: 50,
            left,
            top,
            rx: 0,
            ry: 0,
            stroke: 'rgba(1,1,1,0)',
            strokeWidth: 0,
            fill: 'rgba(35, 203, 167, 1)',
            backgroundColor: 'rgba(1,1,1,0)'
          })
        }
      },
      {
        id: '2',
        icon: 'crop',
        create({ left, top }) {
          return new fabric.Station({
            width: 200,
            height: 140,
            backgroundColor: 'rgba(1,1,1,0)',
            left,
            top
          })
        }
      }
    ]
    onMounted(() => {
      const json = LocalStorage.getItem('WireDiagram') || '{}'
      const _clipboard = null
      const pane = new Pane({
        container: document.getElementById('paneEl'),
        title: 'Configs'
      })
      const selectedNodeFolder = pane.addFolder({ title: 'Selected Node' })
      const selectedNode = shallowRef(null)
      const draw = (folder, target, e) => {
        const keyPath = toPath(e.key)
        const toObject = keyPath.length === 1 ? target : get(target, keyPath.slice(0, -1))
        const toKey = keyPath.length === 1 ? keyPath[0] : keyPath[keyPath.length - 1]
        if (e.isImage) {
          const _button = folder.addButton({
            title: 'Upload Image',
            label: e.key
          })
          _button.on('click', () => {
            const input = document.getElementById('img')
            input.addEventListener('change', () => {
              const file = input.files[0]
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = function(evt) {
                target.setSrc(this.result, () => {
                  canvas.value.requestRenderAll()
                })
              }
            })
            input.click()
          })
        }
        else if (e.isFolder) {
          const _folder = folder.addFolder({ title: e.key })
          e.props.forEach(e2 => {
            draw(_folder, target, e2)
          })
        }
        else {
          folder.addInput(toObject, toKey, e.props).on('change', e2 => {
            target.dirty = true
            if (toKey === 'index' && e2.last) target.moveTo(e2.value)
            canvas.value.requestRenderAll()
          })
        }
      }
      const typeFn = (e, type = '') => {
        const _type = type + e.type || ''
        if (e[e.type] && get(e[e.type], 'type')) return typeFn(e[e.type], `${_type}.`)
        return _type
      }
      watch(selectedNode, n => {
        selectedNodeFolder.children.forEach(e => {
          selectedNodeFolder.remove(e)
        })
        if (n) {
          const props = propsMap[typeFn(n)]
          if (props) {
            props.forEach(e => {
              draw(selectedNodeFolder, n, e)
            })
          }
        }
      })

      canvas.value = new fabric.Canvas('canvas')

      const tc = require('tinycolor2')
      // canvas.value.loadFromJSON(json, () => {
      //   setInterval(() => {
      //     const objs = canvas.value.getObjects()
      //     objs.forEach(e => {
      //       if (e.type === 'station') {
      //         e.dirty = true
      //         e.t.forEach(e => {
      //           e.fill = tc.random()
      //           e.background = tc.random()
      //         })
      //         e.b.forEach(e => {
      //           e.fill = tc.random()
      //           e.background = tc.random()
      //         })
      //         e.m.fill = tc.random()
      //         e.m.background = tc.random()
      //       }
      //     })
      //     canvas.value.requestRenderAll()
      //   }, 2000)

      //   canvas.value.on({
      //     'selection:created': e => {
      //       selectedNode.value = e.target
      //     },
      //     'selection:updated': e => {
      //       selectedNode.value = e.target
      //     },
      //     'selection:cleared': () => {
      //       // selectedNode.value = null
      //     },
      //     'object:moving': e => {
      //       const obj = e.target
      //       if (obj.height > obj.canvas.height || obj.width > obj.canvas.width) return

      //       obj.setCoords()
      //       if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
      //         obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top)
      //         obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left)
      //       }
      //       if (obj.getBoundingRect().top + obj.getBoundingRect().height > obj.canvas.height || obj.getBoundingRect().left + obj.getBoundingRect().width > obj.canvas.width) {
      //         obj.top = Math.min(obj.top, obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top)
      //         obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left)
      //       }
      //     },
      //     'object:modified': () => {
      //       pane.refresh()
      //     },
      //     'object:added': e => {
      //       if (!e.target.id) e.target.set('id', uid())
      //       // updateParent()
      //     },
      //     'object:removed': () => {
      //       if (selectedNode.value) console.log(selectedNode.value)
      //       // updateParent()
      //     }
      //   })

      //   key.filter = function(event) {
      //     const target = event.target || event.srcElement
      //     return target.id === 'canvasWrapper'
      //   }

      //   key('del', () => {
      //     const activeObjects = canvas.value.getActiveObjects()
      //     for (let i = activeObjects.length - 1; i >= 0; i -= 1) canvas.value.remove(activeObjects[i])

      //     canvas.value.discardActiveObject().renderAll()
      //   })
      //   key('⌘+c, ctrl+c', () => {
      //     canvas.value.getActiveObject().clone(cloned => {
      //       delete cloned.id
      //       _clipboard = cloned
      //     })
      //   })
      //   key('⌘+v, ctrl+v', () => {
      //     if (_clipboard) {
      //       _clipboard.clone(clonedObj => {
      //         canvas.value.discardActiveObject()
      //         clonedObj.set({
      //           left: clonedObj.left + 10,
      //           top: clonedObj.top + 10,
      //           evented: true
      //         })
      //         if (clonedObj.type === 'activeSelection') {
      //           // active selection needs a reference to the canvas.
      //           clonedObj.canvas = canvas
      //           clonedObj.forEachObject(obj => {
      //             canvas.value.add(obj)
      //           })
      //           // this should solve the unselectability
      //           clonedObj.setCoords()
      //         }
      //         else canvas.value.add(clonedObj)

      //         _clipboard.top += 10
      //         _clipboard.left += 10
      //         canvas.value.setActiveObject(clonedObj)
      //         canvas.value.requestRenderAll()
      //       })
      //     }
      //   })
      // })
    })
    return {
      save() {
        LocalStorage.set('WireDiagram', JSON.stringify(canvas.value.toObject()))
      },
      onResize(size) {
        // canvas.value.setDimensions(size)
      },
      onDragStart(e) {
        e.dataTransfer.setData('id', e.target.id)
      },
      onDrop(e) {
        const e2 = platte.find(e2 => e2.id === e.dataTransfer.getData('id'))
        if (e2 && e2.create && canvas) {
          const obj = e2.create({
            left: e.x,
            top: e.y
          })
          if (obj) canvas.value.add(obj)
        }
      },
      platte,
      canvas
    }
  }
})
</script>

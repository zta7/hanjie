import { fabric } from 'fabric'

// fabric.AreaMeter = fabric.util.createClass(fabric.Object, {
//   type: 'areaMeter',
//   initialize(options) {
//     this.callSuper('initialize', options)
//     this.area = 'lalala'
//     this.y = '1.20'
//     this.g = '1.30'
//     this.r = '1.40'
//   },

//   toObject() {
//     return fabric.util.object.extend(this.callSuper('toObject'), {
//     })
//   },

//   _render(ctx) {
//     // 200 * 120
//     this.callSuper('_render', ctx)
//     ctx.beginPath()
//     ctx.fillStyle = 'orange'
//     ctx.rect(-100, -2, 30, 2)
//     ctx.fill()

//     ctx.beginPath()
//     ctx.rect(-70, -2, 50, 2)
//     ctx.fillStyle = 'red'
//     ctx.fill()

//     ctx.beginPath()
//     ctx.fillStyle = 'orange'
//     ctx.rect(-20, -2, 40, 2)
//     ctx.fill()
//     ctx.moveTo(20, 0)
//     ctx.lineTo(20, -8)
//     ctx.lineTo(40, 0)
//     ctx.lineTo(20, 8)
//     ctx.fill()

//     ctx.beginPath()
//     ctx.rect(-8, -13, 16, 2)
//     ctx.fill()

//     ctx.beginPath()
//     ctx.strokeStyle = 'orange'
//     ctx.arc(0, -12, 4, 0, 2 * Math.PI)
//     ctx.stroke()

//     ctx.beginPath()
//     ctx.arc(0, -1, 4, 0, 2 * Math.PI)
//     ctx.stroke()

//     ctx.beginPath()
//     ctx.rect(-8, 9, 16, 2)
//     ctx.fill()

//     ctx.beginPath()
//     ctx.arc(0, 10, 4, 0, 2 * Math.PI)
//     ctx.stroke()

//     ctx.beginPath()
//     ctx.font = '12px Arial'
//     ctx.fillStyle = 'yellow'
//     ctx.fillText(`${this.y}A`, 50, -20)
//     ctx.fillStyle = 'green'
//     ctx.fillText(`${this.g}A`, 50, 0)
//     ctx.fillStyle = 'red'
//     ctx.fillText(`${this.r}A`, 50, 20)
//     ctx.fillStyle = 'white'
//     ctx.fillText(`${this.area}`, -70, 30)

//     ctx.closePath()
//   }
// })

// fabric.AreaMeter.fromObject = function(object, callback) {
//   return fabric.Object._fromObject('AreaMeter', object, callback)
// }

fabric.Object.prototype.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      id: this.id,
      index: this.index
    })
  }
})(fabric.Object.prototype.toObject)

fabric.Canvas.prototype.getItemById = function(id) {
  let object = null
  const objects = this.getObjects()
  for (let i = 0, len = this.size(); i < len; i += 1) {
    if (objects[i].id && objects[i].id === id) {
      object = objects[i]
      break
    }
  }

  return object
}

fabric.Object.prototype.initialize = function(options) {
  if (options) {
    if (!options.backgroundColor) options.backgroundColor = 'rgba(0,0,0,0)'
    if (!options.index) options.index = 1

    this.setOptions(options)
  }
}

fabric.Station = fabric.util.createClass(fabric.Object, {
  type: 'station',
  initialize(options) {
    this.callSuper('initialize', options)
    this.title = 'RH020'
    this.t = [
      {
        text: 'L001',
        fill: 'white',
        background: '#0d47a1'
      },
      {
        text: 'L002',
        fill: 'white',
        background: '#0d47a1'
      }
    ]
    this.m = {
      text: 'V004',
      fill: 'white',
      background: '#0d47a1'
    }
    this.b = [
      {
        text: 'R001',
        fill: 'white',
        background: '#0d47a1'
      },
      {
        text: 'R002',
        fill: 'white',
        background: '#0d47a1'
      }
    ]
  },

  toObject() {
    return fabric.util.object.extend(this.callSuper('toObject'), {
    })
  },

  _render(ctx) {
    // 200 * 140
    this.callSuper('_render', ctx)

    const sideLineWidth = 4
    const marginX = 10
    const rectWidth = 60
    const rectHeight = 20
    const rectWidth2 = 60
    const rectHeight2 = 20

    this.width = Math.max(this.t.length, this.b.length) * (rectWidth + marginX) + sideLineWidth * 2

    ctx.beginPath()
    ctx.lineWidth = sideLineWidth
    ctx.strokeStyle = '#1976d2'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.moveTo(-this.width / 2, -this.height / 2)
    ctx.lineTo(-this.width / 2, this.height / 2)
    ctx.moveTo(this.width / 2, -this.height / 2)
    ctx.lineTo(this.width / 2, this.height / 2)
    ctx.stroke()

    this.t.forEach((e, i) => {
      const rectX = (-this.width + sideLineWidth * 2) / 2 + (i * rectWidth) + (i * 20)
      const rectY = -25 - rectHeight / 2
      ctx.beginPath()
      ctx.font = 'bold 12pt Courier'
      ctx.fillStyle = e.background
      ctx.rect(rectX, rectY, rectWidth, rectHeight)
      ctx.fill()
      ctx.fillStyle = e.fill
      ctx.fillText(`${e.text}`, rectX + (rectWidth / 2), rectY + (rectHeight / 2))
    })

    this.b.forEach((e, i) => {
      const rectX = (-this.width + sideLineWidth * 2) / 2 + (i * rectWidth) + (i * 20)
      const rectY = 25 + rectHeight / 2
      ctx.beginPath()
      ctx.font = 'bold 12pt Courier'
      ctx.fillStyle = e.background
      ctx.rect(rectX, rectY, rectWidth, rectHeight)
      ctx.fill()
      ctx.fillStyle = e.fill
      ctx.fillText(`${e.text}`, rectX + (rectWidth / 2), rectY + (rectHeight / 2))
    })

    // ctx.beginPath()
    // ctx.fillStyle = '#bdbdbd'
    // ctx.strokeStyle = '#bdbdbd'

    // ctx.lineWidth = 0
    // ctx.rect(-this.width / 2, 0, this.width, rectHeight2)
    // ctx.stroke()
    // ctx.fill()

    ctx.beginPath()
    ctx.font = 'bold 12pt Courier'
    ctx.fillStyle = this.m.background
    ctx.rect(-rectWidth2 / 2, 0, rectWidth2, rectHeight2)
    ctx.fill()
    ctx.fillStyle = this.m.fill
    ctx.fillText(`${this.m.text}`, -rectWidth2 / 2 + (rectWidth2 / 2), 0 + (rectHeight2 / 2))

    ctx.beginPath()
    ctx.font = 'bold 16pt Courier'
    ctx.fillStyle = '#0d47a1'
    ctx.fillText(`${this.title}A`, 0, -58)

    // ctx.beginPath()
    // ctx.rect(-70, -2, 50, 2)
    // ctx.fillStyle = 'red'
    // ctx.fill()

    // ctx.beginPath()
    // ctx.fillStyle = 'orange'
    // ctx.rect(-20, -2, 40, 2)
    // ctx.fill()
    // ctx.moveTo(20, 0)
    // ctx.lineTo(20, -8)
    // ctx.lineTo(40, 0)
    // ctx.lineTo(20, 8)
    // ctx.fill()

    // ctx.beginPath()
    // ctx.rect(-8, -13, 16, 2)
    // ctx.fill()

    // ctx.beginPath()
    // ctx.strokeStyle = 'orange'
    // ctx.arc(0, -12, 4, 0, 2 * Math.PI)
    // ctx.stroke()

    // ctx.beginPath()
    // ctx.arc(0, -1, 4, 0, 2 * Math.PI)
    // ctx.stroke()

    // ctx.beginPath()
    // ctx.rect(-8, 9, 16, 2)
    // ctx.fill()

    // ctx.beginPath()
    // ctx.arc(0, 10, 4, 0, 2 * Math.PI)
    // ctx.stroke()

    // ctx.beginPath()
    // ctx.font = '12px Arial'
    // ctx.fillStyle = 'yellow'
    // ctx.fillText(`${this.y}A`, 50, -20)
    // ctx.fillStyle = 'green'
    // ctx.fillText(`${this.g}A`, 50, 0)
    // ctx.fillStyle = 'red'
    // ctx.fillText(`${this.r}A`, 50, 20)
    // ctx.fillStyle = 'white'
    // ctx.fillText(`${this.area}`, -70, 30)

    // ctx.closePath()
  }
})

fabric.Station.fromObject = function(object, callback) {
  return fabric.Object._fromObject('Station', object, callback)
}

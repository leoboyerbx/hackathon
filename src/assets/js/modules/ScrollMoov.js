import CssDimension from 'parse-css-dimension'
import _throttle from 'lodash.throttle'

function documentHeight () {
  const body = document.body
  const html = document.documentElement

  return Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight)
}

export default class ScrollMoov {
  constructor (element, from = {}, to = {}, options = {}) {
    this.element = element
    this.parent = options.parent ? options.parent : window
    const viewportHeight = Math.max(document.documentElement.clientHeight, this.parent.innerHeight || 0)
    this.startPoint = Math.max(options.startPoint ? options.startPoint : this.getPosition().y - viewportHeight, 0)

    if (options.considerEndScroll === false) {
      this.endPoint = options.endPoint ? options.endPoint : this.getPosition().y + this.element.offsetHeight
    } else {
      this.endPoint = Math.min(options.endPoint ? options.endPoint : this.getPosition().y + this.element.offsetHeight, this.parent === window ? documentHeight() : this.parent.scrollHeight - viewportHeight)
      // console.log(this.endPoint)
    }
    if (options.deltaEndPoint) {
      this.endPoint -= options.deltaEndPoint
    }
    if (options.throttle) {
      const handler = _throttle(() => { this.updateProgression() }, 100)
      this.parent.addEventListener('scroll', () => { handler() })
    } else {
      this.parent.addEventListener('scroll', () => { this.updateProgression() })
    }

    this.animatedProperties = []
    this.initAnimatedProperties(from, to)
  }

  updateProgression () {
    const progress = this.getProgress()
    this.applyTransform(progress)
  }

  initUnidimensionnalProperty (from, to, CssName) {
    this.animatedProperties.push({
      CssName,
      dimensions: [{
        from: CssDimension(from[CssName].toString()),
        to: CssDimension(to[CssName].toString())
      }],
      toCssString: function (dimensions) {
        return `${this.CssName}(${dimensions[0].toString()})`
      }
    })
  }

  initBidimensionnalProperty (from, to, CssName) {
    const propToInit = {
      CssName,
      dimensions: [],
      toCssString: function (dimensions) {
        return `${this.CssName}(${dimensions[0].toString()}, ${dimensions[1].toString()})`
      }
    }
    for (let i = 0; i < 2; i++) {
      propToInit.dimensions.push({
        from: CssDimension(from[CssName][i].toString()),
        to: CssDimension(to[CssName][i].toString())
      })
    }
    this.animatedProperties.push(propToInit)
  }

  initAnimatedProperties (from, to) {
    for (const CssProperty in from) {
      if (to[CssProperty] !== undefined) {
        if (['rotate', 'scaleX', 'scaleY', 'translateX', 'translateY', 'opacity'].includes(CssProperty)) {
          this.initUnidimensionnalProperty(from, to, CssProperty)
        } else if (['translate', 'scale'].includes(CssProperty)) {
          this.initBidimensionnalProperty(from, to, CssProperty)
        }
      }
    }
    this.applyTransform(this.getProgress())
  }

  calcValue (from, to, progress) {
    return (to - from) * progress + from
  }

  calcDimensionValue (from, to, progress) {
    const output = Object.assign(Object.create(Object.getPrototypeOf(from)), from)
    const delta = to.value - from.value
    output.value += delta * progress
    return output
  }

  applyTransform (progress) {
    let trf = ''
    console.log(this.animatedProperties)
    for (const property of this.animatedProperties) {
      const currentDimensions = []
      for (const dimension of property.dimensions) {
        currentDimensions.push(this.calcDimensionValue(dimension.from, dimension.to, progress))
      }
      trf = trf + ' ' + property.toCssString(currentDimensions)
    }
    this.element.style.transform = trf
  }

  getProgress () {
    const absScroll = this.parent === window ? window.scrollY : this.parent.scrollTop
    const relativeScroll = absScroll - this.startPoint
    const deltaScroll = this.endPoint - this.startPoint
    let progress = (relativeScroll / deltaScroll)
    if (progress < 0) progress = 0
    if (progress > 1) progress = 1
    return progress
  }

  getPosition (element = this.element) {
    let xPosition = 0
    let yPosition = 0

    while (element) {
      xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft)
      yPosition += (element.offsetTop - element.scrollTop + element.clientTop)
      element = element.offsetParent
    }

    return { x: xPosition, y: yPosition }
  }
}

window.ScrollMoov = ScrollMoov

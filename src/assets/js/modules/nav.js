import $ from 'jquery'

export default class Nav {
    constructor (slides, updateDelay = 0) {
        this.slides = $(slides)
        this.numSlides = this.slides.length
        this.currentSlide = 0
        this.updateDelay = updateDelay
    }
    next () {
        this.goTo(this.currentSlide + 1)
    }
    prev () {
        this.goTo(this.currentSlide - 1)
    }
    goTo(index) {
        if (index >= 0 && index < this.numSlides) {
            this.slides.css('transform', `translate3D(-${index * 100}%, 0, 0)`)
            this.slides.removeClass('current')
            this.slides.get(index).classList.add('current')
            setTimeout(() => this.currentSlide = index, this.updateDelay)
        }
    }
}
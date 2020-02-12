import $ from 'jquery'

export default class Nav {
    constructor (slides) {
        this.slides = $(slides)
        this.numSlides = slides.length
        this.currentSlide = 0
    }
    next () {
        this.goTo(this.currentSlide + 1)
    }
    prev () {
        this.goTo(this.currentSlide - 1)
    }
    goTo(index) {
        console.log(index)
        if (index < this.numSlides && index > 0) {
            this.slides.css('transform', `translate3D(-${index * 100}%, 0, 0)`)
            this.slides.removeClass('current')
            this.slides.get(index).classList.add('current')
            this.currentSlide = index
        }
    }
}
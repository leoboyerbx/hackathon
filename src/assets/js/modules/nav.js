import $ from 'jquery'

export default class Nav {
    constructor (slides, parent, updateDelay = 0) {
        this.slides = $(slides)
        this.numSlides = this.slides.length
        this.currentSlide = 0
        this.parent = parent
        this.updateDelay = updateDelay
        this.animating = false
        this.scrollHandler = this.scrollHandler.bind(this)


        this.incite = {
            $: $('#incite-wrapper'),
            show: () => this.incite.$.addClass('visible'),
            showFirstTime: () => setTimeout(() => this.incite.$.addClass('delayVisible'), 10),
            hide: () => this.incite.$.removeClass('visible', 'delayVisible')
        }
        this.incite.showFirstTime()
    }
    next () {
        this.incite.hide()
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
    scrollHandler (ev) {
        if (
            ev.target.classList.contains('section-container')
         || ev.target.classList.contains('section-container-wrapper')
         || this.parent.scrollTop() > 0
         ) {
        } else {
            const direction = ev.originalEvent.deltaY
            ev.preventDefault()
            if (!this.animating) {
                this.animating = true
                if (direction > 0) {
                    this.next()
                } else {
                    this.prev()
                }
    
                setTimeout(() => this.animating = false, this.slidingDuration)
            }
        }

    }
}
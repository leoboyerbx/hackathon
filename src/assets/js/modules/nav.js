import $ from 'jquery'

export default class Nav {
    constructor (slides, sections, parent, updateDelay = 0) {
        this.slides = $(slides)
        this.sections = $(sections)
        this.parent = $(parent)
        this.numSlides = this.slides.length
        this.currentSlide = 0
        this.updateDelay = updateDelay
        this.animating = false
        this.scrollHandler = this.scrollHandler.bind(this)

        this.setUpSectionsHover()

        this.incite = {
            $: $('#incite-wrapper'),
            show: function () { this.$.addClass('visible') },
            showFirstTime: function () { setTimeout(() => this.$.addClass('delayVisible'), 10) },
            hide: function () { this.$.removeClass('visible delayVisible') }
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

    pullUpSection (section) {
        section.style.transform = 'translate3d(0, -100px, 0)'
    }

    releaseSection (section) {
        console.log('hey')
        section.style.transform = 'translate3d(0, 0, 0)'
    }

    setUpSectionsHover () {
        this.sections.mouseover(ev => {
            if (this.parent.scrollTop() === 0) {
                this.pullUpSection(ev.currentTarget.querySelector('.section-container'))
            }
        })
        this.sections.mouseout(ev => {
            if (this.parent.scrollTop() === 0) {
                this.releaseSection(ev.currentTarget.querySelector('.section-container'))
            }
        })
    }
}
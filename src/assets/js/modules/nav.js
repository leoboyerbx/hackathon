import $ from 'jquery'

export default class Nav {
    constructor (slides, sections, backgrounds, parent) {
        this.slides = $(slides)
        this.sections = $(sections)
        this.backgrounds = $(backgrounds)
        this.parent = $(parent)
        this.numSlides = this.slides.length
        this.currentSlide = 0
        this.animating = false
        
        this.deltaHandler = this.deltaHandler.bind(this)
        this.scrollHandler = this.scrollHandler.bind(this)
        this.pulledUpSection = null
        this.slidingDuration = parseFloat(this.slides.css('transition-duration')) * 1000

        this.setUpSectionsHover()
        this.initSlides()

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
    deltaHandler (ev) {
        const direction = ev.originalEvent.deltaY
        if (
            ev.target.classList.contains('section-container')
            || ev.target.classList.contains('section-container-wrapper')
            || $(ev.target).parents('.section-container').length > 0
            || this.parent.scrollTop() > 0
         ) {
            //normal scroll
        } else {
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

    scrollHandler (ev) {
        if (this.parent.scrollTop() === 0 && this.pulledUpSection) {
            this.releaseSection()
        }
    }

    pullUpSection (section) {
        this.pulledUpSection = section
        section.style.transform = 'translate3d(0, -50px, 0)'
    }

    releaseSection (section = this.pulledUpSection) {
        this.pulledUpSection = null
        section.style.transform = 'translate3d(0, 0, 0)'
    }

    initSlides () {
        let i = 0;
        this.slides.each(function () {
            $(this).css('left', i * 100 + '%')
            i++
        })
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
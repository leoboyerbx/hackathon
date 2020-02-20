import $ from 'jquery'

export default class Nav {
    constructor (slides, sections, backgrounds, navButtons, parent) {
        this.slides = $(slides)
        this.sections = $(sections)
        this.backgrounds = $(backgrounds)
        this.navButtons = $(navButtons)
        this.parent = $(parent)
        this.numSlides = this.slides.length
        this.currentSlide = 0
        this.animating = false

        this.wheelHandler = this.wheelHandler.bind(this)
        this.scrollHandler = this.scrollHandler.bind(this)
        this.touchHandler = this.touchHandler.bind(this)
        this.pulledUpSection = null
        this.slidingDuration = parseFloat(this.slides.css('transition-duration')) * 1000

        this.setUpSectionsHover()
        this.setUpNavButtons()
        this.initSlides()

        this.incite = {
            $: $('#incite-wrapper'),
            show: function () { this.$.addClass('visible') },
            showFirstTime: function () { setTimeout(() => this.$.addClass('delayVisible'), 10) },
            hide: function () { this.$.removeClass('visible delayVisible') }
        }

        this.goTo(0)
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
            this.backgrounds.removeClass('current')

            this.slides.get(index).classList.add('current')
            if (this.slides.get(index).dataset.relatedBackground) {
                $(this.slides.get(index).dataset.relatedBackground).addClass('current')
            }
            setTimeout(() => this.currentSlide = index, this.updateDelay)
        }
    }
    recenter () {
        this.slides.css('transform', `translate3D(-${this.currentSlide * 100}%, 0, 0)`)
    }
    wheelHandler(ev) {
        const deltaX = ev.originalEvent.deltaX
        const deltaY = ev.originalEvent.deltaY
        const direction = Math.abs(deltaX) > Math.abs(deltaY) ? deltaX : deltaY
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

    touchHandler () {
        return {
            start: ev => {
                if (ev.touches.length === 1 && this.parent.scrollTop() === 0) {
                    this.isTouching = true
                    this.startX = ev.touches[0].screenX
                    this.slides.addClass('notransition')
                }
            },
            move: ev => {
                if (this.isTouching && this.parent.scrollTop() === 0) {
                    this.delta = ev.touches[0].screenX - this.startX
                    const transformValue = this.delta - (this.slides.outerWidth() * this.currentSlide)

                    this.slides.css('transform', 'translate3D(' + transformValue + 'px, 0, 0)')
                    this.backgrounds.parent().css('opacity', 1 - Math.abs(this.delta) / this.slides.outerWidth())
                }
            },
            end: ev => {
                this.slides.removeClass('notransition')
                this.slides.addClass('swipetransition')
                setTimeout(() => {this.slides.removeClass('swipetransition')}, 200)
                if (this.isTouching) {
                    const offset = this.parent.width() / 4
                    if (this.delta > offset) {
                        if (this.isOnSlide('first')) {
                            this.recenter()
                        } else {
                            this.prev()
                        }
                    } else if (this.delta < -offset) {
                        if (this.isOnSlide('last')) {
                            this.recenter()
                        } else {
                            this.next()
                        }
                    } else {
                        this.recenter()
                    }
                }
                this.isTouching = false
                this.startX = null
                this.delta = 0
                this.backgrounds.parent().animate({opacity: 1})
            }
        }
    }

    isOnSlide (slide) {
        if (slide === "first") {
            return this.currentSlide === 0
        } else if (slide === "last") {
            return this.currentSlide === this.numSlides - 1
        } else {
            return this.currentSlide === slide
        }
    }

    pullUpSection (section) {
        this.pulledUpSection = section
        section.style.transform = 'translate3d(0, -50px, 0)'
        section.style.marginBottom = '0'
    }

    releaseSection (section = this.pulledUpSection) {
        this.pulledUpSection = null
        section.style.transform = 'translate3d(0, 0, 0)'
        section.style.marginBottom = '50px'
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

    scrollToSectionContent () {
        const container = this.slides.get(this.currentSlide).querySelector('.section-container')
        if (container) {
        //     this.slides.get(this.currentSlide).querySelector('.section-container').scrollIntoView({
        //         behavior: 'smooth'
        //     })

            this.parent.animate({ scrollTop: $(container).offset().top }, 1000, 'easeInOutQuint')
        }
    }

    scrollToTop () {
        return new Promise (resolve => {
            this.parent.animate({ scrollTop: 0 }, 1000, 'easeInOutQuint', resolve)
        })
    }

    navButtonsHandler (ev) {
        const target = ev.target.dataset.navto
        switch (target) {
            case 'section-content':
                this.scrollToSectionContent()
                break;

            case 'next-section':
                this.scrollToTop().then(() => {this.next() })
                break;

            case 'prev-section':
                this.scrollToTop().then(() => {this.prev() })
                break;

            default:
                break;
        }
    }

    setUpNavButtons () {
        this.navButtons.click(ev => this.navButtonsHandler(ev))
    }
}

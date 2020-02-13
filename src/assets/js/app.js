import $ from 'jquery'
import Nav from './modules/nav'

$(document).ready(function() {
    const slidingDuration = parseFloat($('.slide').css('transition-duration')) * 1000
    const $parent = $('#page-wrapper')

    
    let nav = new Nav('.slide', slidingDuration)
    let animating = false;

    function scrollHandler (ev) {
        const direction = ev.originalEvent.deltaY
        if (nav.currentSlide === 0
            || ($parent.scrollTop() === 0 && direction < 0)
            || ($parent.scrollTop() + $parent.height() >= $parent.get(0).scrollHeight && direction > 0)
            ) {
            ev.preventDefault()
            if (!animating) {
                animating = true
                if (direction > 0) {
                    nav.next()
                    $('#incite-wrapper').removeClass('visible')
                } else {
                    nav.prev()
                }
    
                setTimeout(() => animating = false, slidingDuration)
            }

        }
    }


    //incite
    setTimeout(() => $('#incite-wrapper').addClass('visible'), 10)
    $('#incite, #readmore').click(function () {
        nav.next()
        $('#incite-wrapper').removeClass('visible')
    })

    // $('#page-wrapper').get(0).addEventListener('wheel', scrollHandler)
    $('#page-wrapper').on('wheel', scrollHandler)


})


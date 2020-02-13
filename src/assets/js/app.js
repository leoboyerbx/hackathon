import $ from 'jquery'
import Nav from './modules/nav'

let animating = false;
const slidingDuration = parseFloat($('.slide').css('transition-duration')) * 1000

function scrollHandler (ev) {
    if (!animating) {
        animating = true

        const direction = ev.originalEvent.deltaY
        setTimeout(() => animating = false, slidingDuration)
    }
}

$(document).ready(function() {
    let nav = new Nav('.slide')

    //incite
    setTimeout(() => $('#incite').addClass('visible'), 5000)
    $('#incite').click(function () {
        nav.next()
        $(this).removeClass('visible')
    })

    // $('#page-wrapper').get(0).addEventListener('wheel', scrollHandler)
    $('#page-wrapper').on('wheel', scrollHandler)


})


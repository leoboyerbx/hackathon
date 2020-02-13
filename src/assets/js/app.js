import $ from 'jquery'
import Nav from './modules/nav'

$(document).ready(function() {
    const slidingDuration = parseFloat($('.slide').css('transition-duration')) * 1000
    const $parent = $('#page-wrapper')    
    window.nav = new Nav('.slide', '.section-container-wrapper', $parent, slidingDuration)



    //incite
    $('#incite, #readmore').click(function () {
        nav.next()
    })

    // $('#page-wrapper').get(0).addEventListener('wheel', scrollHandler)
    $('#page-wrapper').on('wheel', nav.scrollHandler)


})


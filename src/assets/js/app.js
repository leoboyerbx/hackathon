import $ from 'jquery'
import Nav from './modules/nav'
import scrollDismiss from './partials/scrollDismiss'
import jQueryEasing from './modules/jQueryEasing'
import Hammer from 'hammerjs'

$(document).ready(function() {
    const $parent = $('#page-wrapper')
    window.nav = new Nav('.slide', '.section-container-wrapper', '.section-background', '[data-navto]', $parent)



    //incite
    $('#incite, #readmore').click(function () {
        nav.next()
    })

    // $('#page-wrapper').get(0).addEventListener('wheel', scrollHandler)
    $('#page-wrapper').on('wheel', nav.wheelHandler)
    $('#page-wrapper').on('scroll', nav.scrollHandler)
    const hammer = new Hammer(document.querySelector('#page-content'))
    hammer.on('pan', nav.touchHandler)

    scrollDismiss('.slide-section', $parent.get(0))


})

jQueryEasing($)

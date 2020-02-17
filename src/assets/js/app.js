import $ from 'jquery'
import Nav from './modules/nav'
import scrollDismiss from './partials/scrollDismiss'
import jQueryEasing from './modules/jQueryEasing'
import 'hammerjs'
import ZingTouch from 'zingtouch'

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

    const activeRegion = new ZingTouch.Region($parent.get(0))

    const gesture = new ZingTouch.Pan()
    gesture.start = function () {
        console.log('hey')
    }

    activeRegion.bind($parent.get(0), gesture, nav.touchHandler)
    // mc.bind($parent.get(0, 'panstart', () => { console.log('hey') }))
    // const mc = new Hammer($parent.get(0))
    // mc.on('pan', nav.touchHandler)

    scrollDismiss('.slide-section', $parent.get(0))
})

jQueryEasing($)

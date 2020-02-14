import $ from 'jquery'
import Nav from './modules/nav'
import scrollDismiss from './partials/scrollDismiss'

$(document).ready(function() {
    const $parent = $('#page-wrapper')    
    window.nav = new Nav('.slide', '.section-container-wrapper', $parent)



    //incite
    $('#incite, #readmore').click(function () {
        nav.next()
    })

    // $('#page-wrapper').get(0).addEventListener('wheel', scrollHandler)
    $('#page-wrapper').on('wheel', nav.deltaHandler)
    $('#page-wrapper').on('scroll', nav.scrollHandler)

    scrollDismiss('.slide-section', $parent.get(0))


})

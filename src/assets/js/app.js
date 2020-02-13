import $ from 'jquery'
import Nav from './modules/nav'

$(document).ready(function() {
    const $parent = $('#page-wrapper')    
    window.nav = new Nav('.slide', '.section-container-wrapper', $parent)



    //incite
    $('#incite, #readmore').click(function () {
        nav.next()
    })

    // $('#page-wrapper').get(0).addEventListener('wheel', scrollHandler)
    $('#page-wrapper').on('wheel', nav.scrollHandler)


})


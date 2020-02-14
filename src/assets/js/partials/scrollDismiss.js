import ScrollMoov from "../modules/ScrollMoov"

export default function scrollDismiss (sectionsSelector, parent) {
    document.querySelectorAll(sectionsSelector).forEach(section => {
        const titleWrapper = section.querySelector('.part-title-wrapper')
        if (titleWrapper) {
            new ScrollMoov(titleWrapper, {
                opacity: 1,
                translateY: '0px'
            }, {
                opacity: 0,
                translateY: '200',
            }, {
                considerEndScroll: false,
                startPoint: 0,
                endPoint: 200,
                parent
            })
        }
    })
}

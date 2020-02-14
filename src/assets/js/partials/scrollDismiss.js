import ScrollMoov from "../modules/ScrollMoov"

export default function scrollDismiss (sectionsSelector) {
    document.querySelectorAll(sectionsSelector).forEach(section => {
        const titleWrapper = section.querySelector('.part-title-wrapper')
        if (titleWrapper) {
            new ScrollMoov(titleWrapper, {
                opacity: 1
            }, {
                opacity: 0
            }, {
                considerEndScroll: false,
                startPoint: 0,
                endPoint: 1000
            })
        }
    })
}

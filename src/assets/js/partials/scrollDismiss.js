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
                translateY: '150px',
            }, {
                considerEndScroll: false,
                startPoint: 0,
                endPoint: 200,
                parent
            })
        }

        const backgroundNumber = section.dataset.relatedBackground ? document.querySelector(section.dataset.relatedBackground) : null
        if (backgroundNumber) {
            console.log(backgroundNumber)
            new ScrollMoov(backgroundNumber, {
                opacity: 1,
            }, {
                opacity: 0.5,
            }, {
                considerEndScroll: false,
                startPoint: 0,
                endPoint: 500,
                parent
            })
        }
    })
}

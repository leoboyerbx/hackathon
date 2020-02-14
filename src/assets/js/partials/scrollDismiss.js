import ScrollMoov from "../modules/ScrollMoov"

export default function scrollDismiss (sectionsSelector) {
    document.querySelectorAll(sectionsSelector).map(section => {
        console.log(section)
    })
}

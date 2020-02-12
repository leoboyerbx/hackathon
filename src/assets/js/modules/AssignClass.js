export default class AssignClass {
    constructor (element, prefix) {
        this.element = element
        this.prefix = prefix
    }

    assign (className) {
        this.element.get(0).classList.forEach(className => {
            if (className.startsWith(this.prefix)) {
                this.element.removeClass(className)
            }
        })
        this.element.addClass(this.prefix + className)
    }
}

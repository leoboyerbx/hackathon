export default class ScrollSpy {
    constructor (items, offset = 0.5, root = null) {
       items = Array.from(items)
        const options = {
            root,
            threshold: offset
        }
        this.observer = new  IntersectionObserver((entries, observer) => {
            this.observerCallback(entries, observer)
        }, options)
        items.forEach(item => this.observer.observe(item))

        this.listeners = {}
    }

    observerCallback (entries, observer) {
        let found = false
        let visibleEntry
        entries.forEach(entry => {
            if (!found && entry.isIntersecting) {
                found = true
                visibleEntry = entry
            }
        })
        if (found) {
            this.runListeners('scrollChange', visibleEntry.target, visibleEntry)
        }
    }

    on (event, handler) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(handler)
    }

    runListeners (event, ...args) {
        if (this.listeners[event].length) {
            this.listeners[event].forEach(handler => handler(...args))
        }
    }
}

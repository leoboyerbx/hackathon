/**
 * Fonction chargée de définir la propriété
 * @param {HTMLElement} element Élément sur lequel agir
 * @param {String} property Propriété
 * @param {String|Number} value Valeur
 */
function setPropertyValue (element, property, value) {
  if (value.substr(0, 2) === '+=' || value.substr(0, 2) === '-=') {
    if (!value.includes('px') || !window.getComputedStyle(element).getPropertyValue(property).includes('px')) { // Cas sans px
      console.log('Error in css() module: Unsupported property, or you need to use px values.')
    } else {
      const initialValue = parseFloat(window.getComputedStyle(element).getPropertyValue(property).replace(/px/, ''))
      const valueToAdd = parseFloat(value.substr(2).replace(/px/, ''))
      if (value.substr(0, 2) === '+=') {
        element.style[property] = (initialValue + valueToAdd) + 'px'
      } else {
        element.style[property] = (initialValue - valueToAdd) + 'px'
      }
    }
  } else {
    element.style[property] = value
  }
}

/**
 * Fonction qui reproduit le .css() de jQuery
 * @param {String|Object} property Propriété ou tableau de propriétés
 * @param {String|Number|Function} action Valeur de modification
 */
// eslint-disable-next-line no-undef
export default function css (element, property, action) {
  if (arguments.length === 2) {
    if (typeof property === 'string') { // Cas d'un demande de propriété
      return window.getComputedStyle(element).getPropertyValue(property)
    } else if (typeof property === 'object' && Array.isArray(property)) { // Cas d'un demande de propriétés multiples
      const styleProps = []
      property.forEach((prop) => {
        styleProps.push([prop, window.getComputedStyle(element).getPropertyValue(prop)])
      })
      return styleProps
    } else if (typeof property === 'object' && !Array.isArray(property)) {
      const propsArray = Object.keys(property)
      for (let i = 0; i < propsArray.length; i++) {
        setPropertyValue(element, propsArray[i], property[propsArray[i]])
      }
    } else {
      return null
    }
  } else if (arguments.length === 3) {
    if (typeof action === 'string' || typeof action === 'number') { // Cas de modification d'une seule propriété
      setPropertyValue(element, property, action)
      return action
    } else {
      return null
    }
  } else {
    return null
  }
}

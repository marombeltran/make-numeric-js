window.cacheKeys = []

export function isNumeric(el, e, dollar = false, decimal = null) {
    const specialKeys = [8]

    function countInArray(array, what) {
        return array.filter(item => item === what).length
    }

    function removeItem(array, item) {
        const index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1)
        }
    }

    function IsNumeric(keyCode) {
        if (! el.value.length) {
            window.cacheKeys = []
        }

        let ret = (keyCode >= 48 && keyCode <= 57) || specialKeys.includes(keyCode) || keyCode === 46

        if (ret) {
            window.cacheKeys.push(keyCode)
        }

        if (keyCode === 46 && countInArray(window.cacheKeys, keyCode) > 1) {
            removeItem(window.cacheKeys, keyCode)
            ret = false
        }

        if (ret && dollar && window.cacheKeys.length === 1) {
            el.value.replace('$', '')
            el.value = `$${el.value}`
        }

        return ret
    }

    const keyCode = e.which || e.keyCode

    if (keyCode === 46 && el.value.indexOf('.') === -1 && countInArray(window.cacheKeys, keyCode)) {
        removeItem(window.cacheKeys, keyCode)
    }

    if (el.value.includes('.') && typeof decimal !== "undefined" && decimal !== null) {
        const parts = el.value.split('.')
        const _decimal = parts[1].length

        if (_decimal === decimal) {
            return false
        }
    }

    return IsNumeric(keyCode)
}

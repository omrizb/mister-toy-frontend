export const utilService = {
    loadFromStorage,
    saveToStorage,
    makeId,
    makeLorem,
    getRandomIntInclusive,
    getRandomItems,
    getRandomColor,
    getDayName,
    getMonthName,
    animateCSS,
    rgbToHex,
    deepEqual,
    deepMerge,
    debounce
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color', 'of nature', 'tuned', 'to', 'a live channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)]
        if (size >= 1) txt += ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getRandomItems(items, size = 1, duplicationAllowed = false) {
    if (size > items.length && !duplicationAllowed) return

    const res = []
    const srcArray = (duplicationAllowed) ? items : [...items]
    for (let i = 0; i < size; i++) {
        if (!duplicationAllowed && srcArray.length === 0) break
        const randIdx = Math.floor(Math.random() * srcArray.length)
        res.push(srcArray[randIdx])
        if (!duplicationAllowed) srcArray.splice(randIdx, 1)
    }
    return (size === 1) ? res[0] : res
}

function getRandomColor() {
    const chars = '0123456789abcdef'
    let color = '#'
    for (let i = 0; i < 6; i++) {
        color += chars[Math.floor(Math.random() * chars.length)]
    }
    return color
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}

function getMonthName(date) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return monthNames[date.getMonth()]
}

function animateCSS(el, animation = 'bounce') {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g)
    return `#${((1 << 24) + (+result[0] << 16) + (+result[1] << 8) + +result[2]).toString(16).slice(1).toLowerCase()}`
}

function deepEqual(x, y) {
    if (x === y) {
        return true
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
        if (Object.keys(x).length != Object.keys(y).length)
            return false

        for (var prop in x) {
            if (y.hasOwnProperty(prop)) {
                if (!deepEqual(x[prop], y[prop]))
                    return false
            }
            else
                return false
        }

        return true
    }
    else
        return false
}

function deepMerge(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object'

    if (!isObject(target) || !isObject(source)) {
        return source
    }

    Object.keys(source).forEach(key => {
        const targetValue = target[key]
        const sourceValue = source[key]

        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            sourceValue.forEach(item => {
                if (isObject(item)) {
                    const targetIndex = targetValue.findIndex(t => t.id === item.id)
                    if (targetIndex > -1) {
                        targetValue[targetIndex] = deepMerge(targetValue[targetIndex], item)
                    } else {
                        targetValue.push(item)
                    }
                } else {
                    if (!targetValue.includes(item)) {
                        targetValue.push(item)
                    }
                }
            })
        } else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = deepMerge(Object.assign({}, targetValue), sourceValue)
        } else {
            target[key] = sourceValue
        }
    })

    return target
}

function debounce(callback, wait) {
    let timeoutId = null
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback(...args)
        }, wait)
    }
}
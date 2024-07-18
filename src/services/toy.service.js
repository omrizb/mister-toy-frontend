import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { nameMakerService } from './name-maker.service.js'

const TOY_KEY = 'toyDB'
const LABELS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

_createToys(20)

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultQueryParams,
    getQueryParams,
}

// For Debug (easy access from console):
// window.toyService = toyService

function query(queryParams = getDefaultQueryParams()) {
    return storageService.query(TOY_KEY)
        .then(toys => {
            let filteredToys = toys
            const { txt, labels, sortBy, sortDir } = queryParams

            if (txt) {
                const regExp = new RegExp(txt, 'i')
                filteredToys = filteredToys.filter(toy => (
                    regExp.test(toy.name)
                ))
            }
            if (labels.length > 0) {
                filteredToys = filteredToys.filter(toy => labels.every(label => toy.labels.includes(label)))
            }

            if (sortBy === 'createdAt') {
                filteredToys = filteredToys.sort((toy1, toy2) => (toy1.createdAt - toy2.createdAt) * sortDir)
            }

            return {
                filteredToys,
                queryParams,
                totalNumOfToys: toys.length
            }
        })
}

function get(toyId) {
    return storageService.get(TOY_KEY, toyId)
        .then(toy => {
            toy = _setNextPrevToyId(toy)
            return toy
        })
}

function remove(toyId) {
    return storageService.remove(TOY_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        // TOY - updatable fields
        toy.updatedAt = Date.now()
        return storageService.put(TOY_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()
        return storageService.post(TOY_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: 'New toy',
        price: 0,
        labels: [],
        inStock: true,
    }
}

function getDefaultQueryParams() {
    return {
        txt: '',
        minPrice: '',
        maxPrice: '',
        labels: [],
        inStock: 'all',
        sortBy: '',
        sortDir: 1,
    }
}

function getQueryParams(searchParams) {
    const defaultQueryParams = getDefaultQueryParams()
    const queryParams = {}

    for (const field in defaultQueryParams) {
        const defaultValue = defaultQueryParams[field]
        const searchParamsValue = searchParams.get(field)

        if (typeof (defaultValue) === 'number') {
            queryParams[field] = searchParamsValue ? Number(searchParamsValue) : defaultValue
        } else if (typeof (defaultValue) === 'string') {
            queryParams[field] = searchParamsValue || defaultValue
        } else if (Array.isArray(defaultValue)) {
            queryParams[field] = searchParamsValue ? searchParamsValue.split(',') : defaultValue
        } else {
            queryParams[field] = defaultValue
        }

    }

    return queryParams
}

function _createToys(size) {
    let toys = utilService.loadFromStorage(TOY_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < size; i++) {
            toys.push(_createToy())
        }
        utilService.saveToStorage(TOY_KEY, toys)
    }
}

function _createToy() {
    const toy = getEmptyToy()
    toy._id = utilService.makeId()
    toy.name = nameMakerService.makeName()
    toy.price = utilService.getRandomIntInclusive(10, 200)
    toy.labels = utilService.getRandomItems(LABELS, utilService.getRandomIntInclusive(0, 3))
    toy.inStock = Math.random() > 0.3 ? true : false
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return toy
}

function _setNextPrevToyId(toy) {
    return storageService.query(TOY_KEY).then((toys) => {
        const toyIdx = toys.findIndex((currToy) => currToy._id === toy._id)
        const nextToy = toys[toyIdx + 1] ? toys[toyIdx + 1] : toys[0]
        const prevToy = toys[toyIdx - 1] ? toys[toyIdx - 1] : toys[toys.length - 1]
        toy.nextToyId = nextToy._id
        toy.prevToyId = prevToy._id
        return toy
    })
}

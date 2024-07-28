import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const LABELS = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    get,
    remove,
    save,
    getEmptyToy,
    getDefaultQueryParams,
    getQueryParams,
    getLabels,
}

// For Debug (easy access from console):
// window.toyService = toyService

function query(queryParams = getDefaultQueryParams()) {
    return httpService.get(BASE_URL, queryParams)
}

function get(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    return httpService[method](BASE_URL + (toy._id ? toy._id : ''), toy)
}

function getEmptyToy() {
    return {
        name: 'New toy',
        description: '',
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

function getLabels() {
    return [...LABELS]
}

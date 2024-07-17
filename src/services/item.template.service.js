import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const ITEM_KEY = 'itemDB'

_createItems(20)

export const itemService = {
    query,
    get,
    remove,
    save,
    getEmptyItem,
    getDefaultQueryParams,
    getQueryParams,
}

// For Debug (easy access from console):
// window.itemService = itemService

function query(queryParams = getDefaultQueryParams()) {
    return storageService.query(ITEM_KEY)
        .then(items => {
            let filteredItems = items
            const { txt, labels, sortBy, sortDir } = queryParams

            if (txt) {
                const regExp = new RegExp(txt, 'i')
                filteredItems = filteredItems.filter(item => (
                    regExp.test(item.title)
                ))
            }
            if (labels.length > 0) {
                filteredItems = filteredItems.filter(item => labels.every(label => item.labels.includes(label)))
            }

            if (sortBy === 'createdAt') {
                filteredItems = filteredItems.sort((item1, item2) => (item1.createdAt - item2.createdAt) * sortDir)
            }

            return filteredItems
        })
}

function get(itemId) {
    return storageService.get(ITEM_KEY, itemId)
        .then(item => {
            item = _setNextPrevItemId(item)
            return item
        })
}

function remove(itemId) {
    return storageService.remove(ITEM_KEY, itemId)
}

function save(item) {
    if (item._id) {
        // ITEM - updatable fields
        item.updatedAt = Date.now()
        return storageService.put(ITEM_KEY, item)
    } else {
        item.createdAt = item.updatedAt = Date.now()
        return storageService.post(ITEM_KEY, item)
    }
}

function getEmptyItem() {
    return {
        title: 'New item',
        labels: []
    }
}

function getDefaultQueryParams() {
    return {
        txt: '',
        labels: [],
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

function _createItems(size) {
    let items = utilService.loadFromStorage(ITEM_KEY)
    if (!items || !items.length) {
        items = []
        for (let i = 0; i < size; i++) {
            const txt = utilService.makeLorem(3)
            items.push(_createItem(txt))
        }
        utilService.saveToStorage(ITEM_KEY, items)
    }
}

function _createItem(txt) {
    const item = getEmptyItem()
    item.title = txt
    item._id = utilService.makeId()
    item.createdAt = item.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    return item
}

function _setNextPrevItemId(item) {
    return storageService.query(ITEM_KEY).then((items) => {
        const itemIdx = items.findIndex((currItem) => currItem._id === item._id)
        const nextItem = items[itemIdx + 1] ? items[itemIdx + 1] : items[0]
        const prevItem = items[itemIdx - 1] ? items[itemIdx - 1] : items[items.length - 1]
        item.nextItemId = nextItem._id
        item.prevItemId = prevItem._id
        return item
    })
}

import { itemService } from '../../services/item.template.service.js'
import { store } from '../store.js'
import { ADD_ITEM, REMOVE_ITEM, SET_ITEMS, UNDO_ITEMS, UPDATE_ITEM } from '../reducers/item.reducer.js'

export function loadItems() {
    const queryParams = store.getState().itemModule.queryParams
    return itemService.query(queryParams)
        .then(items => store.dispatch({ type: SET_ITEMS, items }))
}

export function removeItem(itemId) {
    store.dispatch({ type: REMOVE_ITEM, itemId })
    return itemService.remove(itemId)
        .catch(err => {
            store.dispatch({ type: UNDO_ITEMS })
            throw err
        })
}

export function saveItem(item) {
    const type = item._id ? UPDATE_ITEM : ADD_ITEM
    store.dispatch({ type, item })
    return itemService.save(item)
        .catch(err => {
            store.dispatch({ type: UNDO_ITEMS })
            throw err
        })
}
import { toyService } from '../../services/toy.service.js'
import { store } from '../store.js'
import { ADD_TOY, REMOVE_TOY, SET_TOYS, UNDO_TOYS, UPDATE_TOY } from '../reducers/toy.reducer.js'

export function loadToys(queryParams) {
    return toyService.query(queryParams)
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
}

export function removeToy(toyId) {
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyService.remove(toyId)
        .catch(err => {
            store.dispatch({ type: UNDO_TOYS })
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, toy: savedToy })
            return savedToy
        })
        .catch(err => {
            store.dispatch({ type: UNDO_TOYS })
            throw err
        })
}